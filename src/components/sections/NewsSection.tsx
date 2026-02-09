"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { CalendarBlank as Calendar, ArrowUpRight, TrendUp as TrendingUp } from "@phosphor-icons/react";
import { colors, typography } from "@/lib/design-system";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  publishedAt: string;
  category: string;
  imageUrl?: string;
  slug: string;
  readTime?: string;
  featured?: boolean;
  type?: "article" | "video" | "podcast" | "report";
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
  const { getMotionSafeClasses, shouldDisableAnimations } = useAccessibilityClasses();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Sort newest first and take the top few articles for the homepage snapshot.
  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Limit to a small number of stories to keep the layout clean.
  const topNews = sortedNews.slice(0, 4);

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
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out", force3D: true,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards stagger with clip-path image reveal
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            ease: "power3.out",
            force3D: true,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Image clip-path reveal
        const img = card.querySelector(".news-image-wrapper");
        if (img) {
          gsap.fromTo(img,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.9,
              ease: "power3.inOut",
              delay: index * 0.1 + 0.15,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Newsletter CTA reveal
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", force3D: true,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section ref={sectionRef} className={cn("py-12 sm:py-16 bg-transparent", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
              Discover the latest stories, research, and updates from our
              climate innovation ecosystem.
            </p>
          </div>
        </div>

        {/* News cards grid */}
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {topNews.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              <div className="mb-4">
                <h3
                  className="text-sm font-semibold tracking-wide uppercase text-foreground/70"
                  style={{
                    fontFamily: typography.fonts.body,
                  }}
                >
                  {item.category || "News"}
                </h3>
                <div className="mt-1 h-0.5 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" />
              </div>

              <Link href={`/news/${item.slug}`} className="block group">
                <Card className="overflow-hidden border border-gray-100 bg-white/95 dark:bg-white/5 shadow-sm hover:shadow-md transition-all duration-300">
                  {item.imageUrl && (
                    <div className="news-image-wrapper relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <CardContent className="flex flex-col gap-2 p-4 sm:p-5">
                    <p className="flex items-center gap-2 text-xs text-foreground/60">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(item.publishedAt)}</span>
                      {item.readTime && (
                        <>
                          <span>•</span>
                          <span>{item.readTime}</span>
                        </>
                      )}
                    </p>

                    <h4
                      className="text-sm sm:text-base font-semibold text-foreground line-clamp-2 group-hover:text-emerald-700 transition-colors"
                      style={{
                        fontFamily: typography.fonts.heading,
                      }}
                    >
                      {item.title}
                    </h4>



                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                      Read more
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}

          {topNews.length === 0 && (
            <p className="col-span-full text-center text-sm text-foreground/60">
              No news updates yet. Check back soon.
            </p>
          )}
        </div>

       
      </div>
    </section>
  );
}
