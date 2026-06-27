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
import { typography } from "@/lib/design-system";
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
        title: "Climate Innovation Conversations - Episode 01",
        excerpt: "A deep-dive on financing climate-smart enterprises in Africa.",
        publishedAt: today,
        category: "Podcast",
        slug: "podcast-episode-1",
        type: "podcast",
        youtubeUrl: "https://youtu.be/wA7P2Y3ZOao?si=RSomYM59Wx2vioyb",
      },
      {
        id: "fallback-podcast-2",
        title: "Green Growth Dialogues - Episode 02",
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
    const podcasts = sortedNews.filter(
      (item) => isPodcastItem(item) && Boolean(resolvePodcastEmbed(item))
    );
    const ensured = [...podcasts];

    if (ensured.length < 2) {
      ensured.push(...fallbackPodcasts.slice(0, 2 - ensured.length));
    }

    return ensured.slice(0, 2);
  }, [sortedNews, fallbackPodcasts]);

  const latestArticles = useMemo(() => {
    const nonPodcasts = sortedNews.filter((item) => !isPodcastItem(item));
    return nonPodcasts.slice(0, 3);
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

  const currentPodcast =
    featuredPodcasts[activePodcastIndex] ?? featuredPodcasts[0] ?? null;
  const currentPodcastThumbnail = currentPodcast
    ? resolvePodcastThumbnail(currentPodcast)
    : null;

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
          }
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
          }
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
          }
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
          }
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
    if (normalized.includes("feature")) {
      return "text-[#1f7a3f]";
    }
    if (normalized.includes("event")) {
      return "text-[#c35b3f]";
    }
    return "text-[#3c7f1c]";
  };

  return (
    <section
      ref={sectionRef}
      className={cn("relative isolate overflow-hidden border-y-[5px] border-[#101010] bg-[#fff7df] py-12 sm:py-14", className)}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mb-8 grid items-end gap-5 border-b-[3px] border-[#101010] pb-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <p className="mb-3 inline-flex border-2 border-[#101010] bg-[#80c738] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#101010] shadow-[3px_3px_0_#101010]">
              KCIC newsroom
            </p>
            <h2
              className="max-w-[10ch] font-black leading-[0.92] text-[#101010]"
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontFamily: typography.fonts.heading,
              }}
            >
              News & Insights
            </h2>
          </div>
            <p
              className="max-w-3xl font-black leading-8 text-[#101010]"
              style={{
                fontSize: "clamp(1rem, 1.55vw, 1.25rem)",
                fontFamily: typography.fonts.body,
              }}
            >
              A featured podcast preview on one side, with our latest stories
              stacked alongside it.
            </p>
        </div>

        <div
          ref={panelRef}
          className="border-[3px] border-[#101010] bg-[#fff7df] p-0 shadow-[8px_8px_0_#101010]"
        >
          <div className="grid lg:grid-cols-[1.18fr_0.82fr] lg:divide-x-[3px] lg:divide-[#101010]">
            <div ref={leftRef} className="p-5 sm:p-6 lg:p-7">
              <div className="mb-5 flex items-center justify-between gap-4 border-b-[3px] border-[#101010] pb-4">
                <div
                  className="font-black uppercase leading-tight text-[#101010]"
                  style={{
                    fontSize: "clamp(1.05rem, 1.55vw, 1.3rem)",
                    fontFamily: typography.fonts.heading,
                  }}
                >
                  Podcasts
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPreviousPodcast}
                    className="h-10 w-10 border-2 border-[#101010] bg-[#fff7df] text-[#101010] shadow-[3px_3px_0_#101010] transition hover:-translate-y-0.5 hover:bg-[#80c738]"
                    aria-label="Previous podcast"
                  >
                    <CaretLeft className="mx-auto h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextPodcast}
                    className="h-10 w-10 border-2 border-[#101010] bg-[#fff7df] text-[#101010] shadow-[3px_3px_0_#101010] transition hover:-translate-y-0.5 hover:bg-[#80c738]"
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
                aria-label={`Play podcast: ${
                  currentPodcast?.title || "Featured podcast"
                }`}
              >
                <div className="relative aspect-[16/11] overflow-hidden border-[3px] border-[#101010] bg-[#00addd] p-4 shadow-[6px_6px_0_#101010] sm:p-5">
                  <div className="relative h-full w-full overflow-hidden border-2 border-[#101010] bg-[#101010]">
                    {currentPodcastThumbnail ? (
                      currentPodcastThumbnail.startsWith("http") ? (
                        <img
                          src={currentPodcastThumbnail}
                          alt={currentPodcast?.title || "Podcast preview"}
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={currentPodcastThumbnail}
                          alt={currentPodcast?.title || "Podcast preview"}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      )
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/95">
                        <Headphones className="h-14 w-14" weight="duotone" />
                        <span className="text-sm font-semibold tracking-wide uppercase">
                          Podcast Episode
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-4 bg-linear-to-t from-black/65 via-black/15 to-transparent sm:inset-5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center border-[3px] border-[#101010] bg-[#80c738] text-[#101010] shadow-[4px_4px_0_#101010] transition-transform duration-300 group-hover:scale-105">
                      <PlayCircle className="h-9 w-9" weight="fill" />
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8 sm:right-8">
                    <span
                      className="mb-1 block uppercase tracking-wider text-white/80"
                      style={{ fontSize: "11px", lineHeight: "14px" }}
                    >
                      Podcast
                    </span>
                    <div
                      className="line-clamp-2 font-semibold leading-tight"
                      style={{
                        fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                        lineHeight: "1.2",
                        margin: 0,
                      }}
                    >
                      {currentPodcast?.title || "Podcast Episode"}
                    </div>
                  </div>
                </div>
              </button>

              <div className="mt-5 space-y-2 border-t-[3px] border-[#101010] pt-4">
                {featuredPodcasts.slice(0, 2).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePodcastOpen(item)}
                    className="flex w-full items-start justify-between gap-3 border-2 border-[#101010] bg-[#fff7df] px-4 py-3 text-left transition hover:-translate-y-0.5 hover:bg-[#e5f7c9]"
                  >
                    <span className="min-w-0">
                      <span className="block line-clamp-2 text-sm font-black leading-5 text-[#101010]">
                        {item.title}
                      </span>
                      {item.publishedAt ? (
                        <span className="mt-1 block text-xs font-semibold leading-5 text-[#4d4a3d]">
                          {formatDate(item.publishedAt)}
                        </span>
                      ) : null}
                    </span>
                    <PlayCircle
                      className="mt-1 h-5 w-5 shrink-0 text-[#80c738]"
                      weight="fill"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={rightRef}
              className="border-t-[3px] border-[#101010] p-5 sm:p-6 lg:border-t-0 lg:p-7"
            >
              <div
                className="mb-5 border-b-[3px] border-[#101010] pb-4 font-black uppercase leading-tight text-[#101010]"
                style={{
                  fontSize: "clamp(1.05rem, 1.55vw, 1.3rem)",
                  fontFamily: typography.fonts.heading,
                }}
              >
                Latest Stories
              </div>

              <div className="space-y-0 border-y-[3px] border-[#101010]">
                {latestArticles.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    ref={(el) => {
                      rowsRef.current[index] = el;
                    }}
                    className="group block border-b-2 border-[#101010] py-4 transition hover:bg-[#e5f7c9] last:border-b-0 sm:px-3"
                  >
                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <div
                          className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1"
                          style={{ fontSize: "11px", lineHeight: "14px" }}
                        >
                          <span
                            className={cn(
                              "font-black uppercase tracking-wider",
                              resolveCategoryTone(item.category || "News")
                            )}
                          >
                            {item.category || "News"}
                          </span>
                          <span className="text-gray-400">&middot;</span>
                          <span className="font-semibold text-[#4d4a3d]">
                            {formatDate(item.publishedAt)}
                          </span>
                        </div>
                        <div
                          className="font-black leading-snug text-[#101010] group-hover:underline decoration-[#80c738] underline-offset-4"
                          style={{
                            fontSize: "clamp(0.98rem, 1.1vw, 1.08rem)",
                          }}
                        >
                          {item.title}
                        </div>
                        {item.excerpt ? (
                          <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-[#4d4a3d]">
                            {item.excerpt}
                          </p>
                        ) : null}
                      </div>

                      {item.imageUrl ? (
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden border-2 border-[#101010] bg-[#fff7df] shadow-[3px_3px_0_#101010] sm:h-28 sm:w-28">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            sizes="112px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center border-2 border-[#101010] bg-[#80c738] text-[#101010] transition group-hover:-translate-y-0.5">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </Link>
                ))}

                {latestArticles.length === 0 && (
                  <p className="border-2 border-dashed border-[#101010] bg-[#fff7df] p-5 text-sm font-semibold text-[#4d4a3d]">
                    No latest updates available yet.
                  </p>
                )}
              </div>

              <Link href="/newsroom">
                <Button className="mt-5 h-auto bg-transparent py-2 pl-0 pr-0 text-sm font-black uppercase text-[#101010] hover:bg-transparent">
                  <span className="mr-3 inline-flex h-10 w-10 items-center justify-center border-2 border-[#101010] bg-[#80c738] text-[#101010] shadow-[3px_3px_0_#101010]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  Explore newsroom
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={Boolean(activePodcast)}
        onOpenChange={(open) => !open && closePodcastModal()}
      >
        <DialogContent
          className="sm:max-w-4xl p-0 overflow-hidden"
          showCloseButton
        >
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
          <div className="bg-[#fff7df] px-4 pb-4 pt-3">
            <p className="line-clamp-2 text-sm font-black text-[#101010]">
              {activePodcast?.title}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
