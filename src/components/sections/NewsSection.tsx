"use client";

import { useRef, useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  PlayCircle,
  CaretLeft,
  CaretRight,
  Headphones,
} from "@phosphor-icons/react";
import { colors, typography } from "@/lib/design-system";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
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

  const extractYouTubeVideoId = (rawUrl?: string | null) => {
    if (!rawUrl) return null;

    try {
      const normalized = rawUrl.trim().replace(/[),.;]+$/, "");
      const url = new URL(normalized);
      const host = url.hostname.replace("www.", "").toLowerCase();

      if (host === "youtu.be") {
        const id = url.pathname.split("/").filter(Boolean)[0];
        return id?.slice(0, 11) || null;
      }

      if (host === "youtube.com" || host === "m.youtube.com") {
        if (url.pathname.startsWith("/watch")) {
          const id = url.searchParams.get("v");
          return id?.slice(0, 11) || null;
        }

        if (url.pathname.startsWith("/embed/")) {
          const id = url.pathname.split("/embed/")[1]?.split("/")[0];
          return id?.slice(0, 11) || null;
        }

        if (url.pathname.startsWith("/shorts/")) {
          const id = url.pathname.split("/shorts/")[1]?.split("/")[0];
          return id?.slice(0, 11) || null;
        }
      }

      return null;
    } catch {
      return null;
    }
  };

  const resolvePodcastEmbed = (item: NewsItem) => {
    const parsedFromYoutubeField = toEmbedUrl(item.youtubeUrl);
    const parsedFromContent = toEmbedUrl(extractYouTubeUrl(item.content));
    const parsedFromExcerpt = toEmbedUrl(extractYouTubeUrl(item.excerpt));
    return parsedFromYoutubeField || parsedFromContent || parsedFromExcerpt;
  };

  const resolvePodcastThumbnail = (item: NewsItem) => {
    if (item.imageUrl) return item.imageUrl;

    const fromYoutubeField = extractYouTubeVideoId(item.youtubeUrl);
    const fromContent = extractYouTubeVideoId(extractYouTubeUrl(item.content));
    const fromExcerpt = extractYouTubeVideoId(extractYouTubeUrl(item.excerpt));
    const videoId = fromYoutubeField || fromContent || fromExcerpt;

    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  const extractYouTubeUrl = (rawText?: string) => {
    if (!rawText) return null;

    const matched = rawText.match(
      /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)[\w-]{11}[^\s]*|youtu\.be\/[\w-]{11}[^\s]*))/i
    );

    return matched?.[1] ?? null;
  };

  const toEmbedUrl = (rawUrl?: string | null) => {
    const videoId = extractYouTubeVideoId(rawUrl);
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : null;
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
        youtubeUrl: "https://youtu.be/wA7P2Y3ZOao?si=RSomYM59Wx2vioyb",
      },
      {
        id: "fallback-podcast-2",
        title: "Green Growth Dialogues — Episode 02",
        excerpt: "How founders scale clean technology from pilot to market.",
        publishedAt: today,
        category: "Podcast",
        slug: "podcast-episode-2",
        type: "podcast",
        youtubeUrl: "https://youtu.be/yeBGRz16lkM?si=L4CUlwZ2SGctZU6u",
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
  const currentPodcastThumbnail = currentPodcast
    ? resolvePodcastThumbnail(currentPodcast)
    : null;
  const newsroomLinks = [
    {
      title: "Press Releases",
      description: "Official KCIC announcements, partner updates, and organization news.",
      href: "/newsroom/press-release",
    },
    {
      title: "Events",
      description: "Forums, showcases, and upcoming opportunities to engage with the ecosystem.",
      href: "/newsroom/events",
    },
    {
      title: "Publications",
      description: "Reports, insights, and knowledge products from our work across the region.",
      href: "/newsroom/publications",
    },
  ] as const;

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
    <section ref={sectionRef} className={cn("bg-[#f7fbf8] py-10 sm:py-12", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-10 text-center sm:mb-12">
          <div>
            <h2
              className="font-bold mb-4"
              style={{
                fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
                lineHeight: typography.lineHeights.tight,
              }}
            >
              News & Insights
            </h2>
            <p
              className="mx-auto max-w-3xl"
              style={{
                fontSize: "clamp(0.95rem, 1.2vw, 1rem)",
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
          className="border border-[#d4e1d8] bg-white/92 p-0 shadow-[0_20px_50px_rgba(26,31,46,0.08)]"
        >
          <div className="grid lg:grid-cols-3 lg:divide-x-2 lg:divide-[#c7d5cb]">
            <div ref={leftRef} className="p-6 sm:p-8">
              <div
                className="mb-5 font-bold leading-tight"
                style={{
                  fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                  fontFamily: typography.fonts.heading,
                  color: colors.secondary.gray[900],
                }}
              >
                News
              </div>

              <div className="space-y-0 border-y-2 border-[#d6e1d8]">
                {latestArticles.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    ref={(el) => { rowsRef.current[index] = el; }}
                    className="group block border-b border-[#d6e1d8] py-4 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 uppercase tracking-wider text-gray-500" style={{ fontSize: "11px", lineHeight: "14px", margin: 0 }}>
                          <span className={cn("font-semibold", resolveCategoryTone(item.category || "News"))}>
                            {item.category || "News"}
                          </span>
                          <span>•</span>
                          <span>{formatDate(item.publishedAt)}</span>
                        </div>
                        <div
                          className="line-clamp-3 font-semibold leading-snug text-gray-900 group-hover:underline decoration-[#80c738] underline-offset-4"
                          style={{ fontSize: "clamp(1rem, 1.25vw, 1.15rem)", margin: 0 }}
                        >
                          {item.title}
                        </div>

                        {item.excerpt && (
                          <div className="mt-2 line-clamp-2 text-gray-700" style={{ fontSize: "14px", lineHeight: "22px", margin: 0 }}>
                            {item.excerpt}
                          </div>
                        )}
                      </div>

                      <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center border border-gray-300 text-gray-500 transition group-hover:border-[#80c738] group-hover:text-[#80c738]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}

                {latestArticles.length === 0 && (
                  <p className="border border-dashed border-gray-300 bg-[#f6f6f6] p-5 text-sm text-gray-600">
                    No latest updates available yet.
                  </p>
                )}
              </div>
            </div>

            <div ref={rightRef} className="border-t-2 border-[#c7d5cb] p-6 sm:p-8 lg:border-t-0">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div
                  className="font-bold leading-tight"
                  style={{
                    fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                    fontFamily: typography.fonts.heading,
                    color: colors.secondary.gray[900],
                  }}
                >
                  Podcasts
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPreviousPodcast}
                    className="h-10 w-10 border border-gray-300 bg-white text-gray-700 transition hover:border-gray-400 hover:text-black"
                    aria-label="Previous podcast"
                  >
                    <CaretLeft className="mx-auto h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextPodcast}
                    className="h-10 w-10 border border-gray-300 bg-white text-gray-700 transition hover:border-gray-400 hover:text-black"
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
                <div className="relative aspect-4/5 overflow-hidden border border-[#d6e1d8] bg-linear-to-br from-[#0f2f3a] via-[#175f74] to-[#00addd] p-4 sm:p-5 shadow-md">
                  <div className="relative h-full w-full overflow-hidden bg-black/35">
                    {currentPodcastThumbnail ? (
                      currentPodcastThumbnail.startsWith("http") ? (
                        <img
                          src={currentPodcastThumbnail}
                          alt={currentPodcast?.title || "Podcast preview"}
                          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={currentPodcastThumbnail}
                          alt={currentPodcast?.title || "Podcast preview"}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      )
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/95">
                        <Headphones className="h-14 w-14" weight="duotone" />
                        <span className="text-sm font-semibold tracking-wide uppercase">Podcast Episode</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-4 bg-linear-to-t from-black/65 via-black/15 to-transparent sm:inset-5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                      <PlayCircle className="h-9 w-9" weight="fill" />
                    </span>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="mb-1 block uppercase tracking-wider text-white/80" style={{ fontSize: "11px", lineHeight: "14px" }}>Podcast</span>
                    <div className="line-clamp-2 font-semibold leading-tight" style={{ fontSize: "16px", lineHeight: "20px", margin: 0 }}>
                      {currentPodcast?.title || "Podcast Episode"}
                    </div>
                  </div>
                </div>
              </button>

              <div className="mt-4 space-y-2 border-t-2 border-[#d6e1d8] pt-4">
                {featuredPodcasts.slice(0, 2).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePodcastOpen(item)}
                    className="flex w-full items-start justify-between gap-3 border border-[#d6e1d8] px-4 py-3 text-left transition hover:border-[#80c738]"
                  >
                    <span className="min-w-0">
                      <span className="block line-clamp-2 text-sm font-medium leading-5 text-slate-900">
                        {item.title}
                      </span>
                      {item.publishedAt ? (
                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {formatDate(item.publishedAt)}
                        </span>
                      ) : null}
                    </span>
                    <PlayCircle className="mt-1 h-5 w-5 shrink-0 text-[#80c738]" weight="fill" />
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-[#c7d5cb] p-6 sm:p-8 lg:border-t-0">
              <div
                className="mb-5 font-bold leading-tight"
                style={{
                  fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                  fontFamily: typography.fonts.heading,
                  color: colors.secondary.gray[900],
                }}
              >
                Newsroom Categories
              </div>

              <div className="space-y-0 border-y-2 border-[#d6e1d8]">
                {newsroomLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group block border-b border-[#d6e1d8] py-4 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-semibold leading-snug text-slate-900 group-hover:underline decoration-[#80c738] underline-offset-4"
                          style={{ fontSize: "clamp(1rem, 1.2vw, 1.1rem)" }}
                        >
                          {item.title}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>

                      <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center border border-gray-300 text-gray-500 transition group-hover:border-[#80c738] group-hover:text-[#80c738]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <Link href="/newsroom">
                <Button
                  className="mt-5 h-auto bg-transparent py-2 pl-0 pr-0 text-sm font-semibold text-gray-900 hover:bg-transparent"
                >
                  <span className="mr-3 inline-flex h-10 w-10 items-center justify-center bg-linear-to-b from-[#f8a23d] to-[#e97451] text-white shadow-sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  Explore newsroom
                </Button>
              </Link>
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
