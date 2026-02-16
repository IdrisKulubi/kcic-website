"use client";

import { useRef, useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarBlank as Calendar,
  ArrowUpRight,
  TrendUp as TrendingUp,
  PlayCircle,
  CaretLeft,
  CaretRight,
  Headphones,
} from "@phosphor-icons/react";
import { colors, typography } from "@/lib/design-system";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  category: string;
  imageUrl?: string;
  slug: string;
  readTime?: string;
  featured?: boolean;
  type?: "article" | "video" | "podcast" | "report";
  youtubeUrl?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

interface NewsSectionProps {
  news: NewsItem[];
  className?: string;
}

export function NewsSection({ news, className = "" }: NewsSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activePodcast, setActivePodcast] = useState<NewsItem | null>(null);
  const [podcastEmbedUrl, setPodcastEmbedUrl] = useState<string>("");
  const [activePodcastIndex, setActivePodcastIndex] = useState(0);

  const isPodcastItem = (item: NewsItem) =>
    item.type === "podcast" || item.category.toLowerCase().includes("podcast");

  const resolvePodcastEmbed = (item: NewsItem) => {
    const parsedFromYoutubeField = toEmbedUrl(item.youtubeUrl);
    const parsedFromContent = toEmbedUrl(extractYouTubeUrl(item.content));
    const parsedFromExcerpt = toEmbedUrl(extractYouTubeUrl(item.excerpt));
    return parsedFromYoutubeField || parsedFromContent || parsedFromExcerpt;
  };

  const extractYouTubeUrl = (rawText?: string) => {
    if (!rawText) return null;

    const matched = rawText.match(
      /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)[\w-]{11}[^\s]*|youtu\.be\/[\w-]{11}[^\s]*))/i
    );

    return matched?.[1] ?? null;
  };

  const toEmbedUrl = (rawUrl?: string | null) => {
    if (!rawUrl) return null;

    try {
      const url = new URL(rawUrl.trim());

      if (url.hostname.includes("youtu.be")) {
        const videoId = url.pathname.replace("/", "").slice(0, 11);
        return videoId
          ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
          : null;
      }

      if (url.hostname.includes("youtube.com")) {
        if (url.pathname.startsWith("/embed/")) {
          const videoId = url.pathname.split("/embed/")[1]?.slice(0, 11);
          return videoId
            ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
            : null;
        }

        const videoId = url.searchParams.get("v")?.slice(0, 11);
        return videoId
          ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
          : null;
      }

      return null;
    } catch {
      return null;
    }
  };

  const sortedNews = useMemo(
    () =>
      [...news].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    [news]
  );

  const fallbackPodcasts = useMemo<NewsItem[]>(() => {
    const today = new Date().toISOString().split("T")[0];

    return [
      {
        id: "fallback-podcast-1",
        title: "Climate Innovation Conversations — Episode 01",
        excerpt: "A deep-dive on financing climate-smart enterprises in Africa.",
        publishedAt: today,
        category: "Podcast",
        slug: "podcast-episode-1",
        type: "podcast",
        youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      },
      {
        id: "fallback-podcast-2",
        title: "Green Growth Dialogues — Episode 02",
        excerpt: "How founders scale clean technology from pilot to market.",
        publishedAt: today,
        category: "Podcast",
        slug: "podcast-episode-2",
        type: "podcast",
        youtubeUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      },
    ];
  }, []);

  const featuredPodcasts = useMemo(() => {
    const podcasts = sortedNews.filter((item) => isPodcastItem(item) && Boolean(resolvePodcastEmbed(item)));
    const ensured = [...podcasts];

    if (ensured.length < 2) {
      ensured.push(...fallbackPodcasts.slice(0, 2 - ensured.length));
    }

    return ensured.slice(0, 2);
  }, [sortedNews, fallbackPodcasts]);

  const latestArticles = useMemo(() => {
    const nonPodcasts = sortedNews.filter((item) => !isPodcastItem(item));
    return nonPodcasts.slice(0, 2);
  }, [sortedNews]);

  const podcastEmbedMap = useMemo(() => {
    const map = new Map<string, string>();

    featuredPodcasts.forEach((item) => {
      if (!isPodcastItem(item)) return;

      const embed = resolvePodcastEmbed(item);
      if (embed) {
        map.set(item.id, embed);
      }
    });

    return map;
  }, [featuredPodcasts]);

  const currentPodcast = featuredPodcasts[activePodcastIndex] ?? featuredPodcasts[0] ?? null;

  const handlePodcastOpen = (item?: NewsItem | null) => {
    if (!item) return;
    const embed = podcastEmbedMap.get(item.id);
    if (!embed) return;
    setActivePodcast(item);
    setPodcastEmbedUrl(embed);
  };

  const closePodcastModal = () => {
    setActivePodcast(null);
    setPodcastEmbedUrl("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // GSAP scroll-triggered animations
  useLayoutEffect(() => {
    if (shouldDisableAnimations?.() || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      rowsRef.current.forEach((row, index) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  const showPreviousPodcast = () => {
    if (featuredPodcasts.length <= 1) return;
    setActivePodcastIndex((current) =>
      current === 0 ? featuredPodcasts.length - 1 : current - 1
    );
  };

  const showNextPodcast = () => {
    if (featuredPodcasts.length <= 1) return;
    setActivePodcastIndex((current) =>
      current === featuredPodcasts.length - 1 ? 0 : current + 1
    );
  };

  const resolveCategoryTone = (category: string) => {
    const normalized = category.toLowerCase();
    if (normalized.includes("blog")) {
      return "text-[#0b6f8b]";
    }
    if (normalized.includes("event")) {
      return "text-[#c35b3f]";
    }
    return "text-[#3c7f1c]";
  };

  return (
    <section ref={sectionRef} className={cn("py-12 sm:py-16 bg-[#faf6f0]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <div>
            <Badge
              className="mb-4 inline-flex items-center gap-1 px-4 py-1.5 border rounded-full"
              style={{
                backgroundColor: colors.primary.green[50],
                borderColor: colors.primary.green[200],
                color: colors.primary.green[700],
              }}
            >
              <TrendingUp className="h-3 w-3" />
              Latest updates
            </Badge>
            <h2
              className="font-bold mb-4"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
                lineHeight: typography.lineHeights.tight,
              }}
            >
              News & Insights
            </h2>
            <p
              className="text-base sm:text-lg max-w-3xl mx-auto"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[600],
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              Latest from our newsroom with featured podcast episodes and top stories.
            </p>
          </div>
        </div>

        <div
          ref={panelRef}
          className="rounded-4xl border border-[#e7e1d8] bg-white/70 p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(26,31,46,0.12)]"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div ref={leftRef} className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div
                  className="font-bold leading-tight"
                  style={{
                    fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                    fontFamily: typography.fonts.heading,
                    color: colors.secondary.gray[900],
                  }}
                >
                  Featured Podcast
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPreviousPodcast}
                    className="h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:text-black hover:border-gray-400 transition"
                    aria-label="Previous podcast"
                  >
                    <CaretLeft className="mx-auto h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextPodcast}
                    className="h-10 w-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:text-black hover:border-gray-400 transition"
                    aria-label="Next podcast"
                  >
                    <CaretRight className="mx-auto h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handlePodcastOpen(currentPodcast)}
                className="group block w-full text-left"
                aria-label={`Play podcast: ${currentPodcast?.title || "Featured podcast"}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-[#0f2f3a] via-[#175f74] to-[#00addd] shadow-md">
                  {currentPodcast?.imageUrl ? (
                    <Image
                      src={currentPodcast.imageUrl}
                      alt={currentPodcast.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/95">
                      <Headphones className="h-14 w-14" weight="duotone" />
                      <span className="text-sm font-semibold tracking-wide uppercase">Podcast Episode</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <PlayCircle className="h-9 w-9" weight="fill" />
                    </span>
                  </div>
                  <div className="absolute left-4 right-4 bottom-4 text-white">
                    <span className="block uppercase tracking-wider text-white/80 mb-1" style={{ fontSize: "11px", lineHeight: "14px" }}>Podcast</span>
                    <div className="font-semibold leading-tight line-clamp-2" style={{ fontSize: "16px", lineHeight: "20px", margin: 0 }}>
                      {currentPodcast?.title || "Podcast Episode"}
                    </div>
                  </div>
                </div>
              </button>

              <Link href="/newsroom">
                <Button
                  className="rounded-full pl-2 pr-5 py-2 h-auto text-sm font-semibold text-gray-900 bg-transparent hover:bg-transparent"
                >
                  <span className="mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-b from-[#f8a23d] to-[#e97451] text-white shadow-sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  View all news
                </Button>
              </Link>
            </div>

            <div ref={rightRef} className="lg:pl-2">
              <div
                className="font-bold mb-5"
                style={{
                  fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                  fontFamily: typography.fonts.heading,
                  color: colors.secondary.gray[900],
                }}
              >
                Latest Updates
              </div>

              <div className="space-y-0">
                {latestArticles.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    ref={(el) => { rowsRef.current[index] = el; }}
                    className="group block border-b border-[#d9e2c7] py-4 first:pt-1 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 uppercase tracking-wider text-gray-500" style={{ fontSize: "11px", lineHeight: "14px", margin: 0 }}>
                          <span className={cn("font-semibold", resolveCategoryTone(item.category || "News"))}>
                            {item.category || "News"}
                          </span>
                          <span>•</span>
                          <span>{formatDate(item.publishedAt)}</span>
                          {item.readTime && (
                            <>
                              <span>•</span>
                              <span>{item.readTime}</span>
                            </>
                          )}
                        </div>
                        <div
                          className="font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:underline decoration-[#80c738] underline-offset-4"
                          style={{ fontSize: "clamp(1rem, 1.45vw, 1.45rem)", margin: 0 }}
                        >
                          {item.title}
                        </div>

                        {item.excerpt && (
                          <div className="mt-2 text-gray-700 line-clamp-2" style={{ fontSize: "14px", lineHeight: "22px", margin: 0 }}>
                            {item.excerpt}
                          </div>
                        )}
                      </div>

                      <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 group-hover:border-[#80c738] group-hover:text-[#80c738] transition">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}

                {latestArticles.length === 0 && (
                  <p className="rounded-xl border border-dashed border-gray-300 bg-[#f6f6f6] p-5 text-sm text-gray-600">
                    No latest updates available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={Boolean(activePodcast)} onOpenChange={(open) => !open && closePodcastModal()}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden" showCloseButton>
          <DialogTitle className="sr-only">Podcast Player</DialogTitle>
          <div className="bg-black">
            {podcastEmbedUrl && (
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  title={activePodcast?.title || "Podcast"}
                  src={podcastEmbedUrl}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </div>
          <div className="px-4 pb-4 pt-3 bg-white">
            <p className="text-sm font-medium text-gray-900 line-clamp-2">
              {activePodcast?.title}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
