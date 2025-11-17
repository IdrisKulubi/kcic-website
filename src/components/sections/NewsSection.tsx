"use client";

import Link from "next/link";
import { Calendar, ArrowUpRight, TrendingUp } from "lucide-react";
import { colors, typography } from "@/lib/design-system";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  const { getMotionSafeClasses } = useAccessibilityClasses();

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

  return (
    <section className={cn("py-20 sm:py-32 bg-transparent", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className={getMotionSafeClasses(
              "animate-in fade-in slide-in-from-bottom-8 duration-700"
            )}
          >
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
              className={getMotionSafeClasses(
                `animate-in fade-in slide-in-from-bottom duration-700 delay-${(index + 1) * 75}`
              )}
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
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
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

        {/* Newsletter CTA */}
        <div className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white via-green-50/70 to-white shadow-lg border border-green-100">
            <div
              className="absolute -top-12 -left-6 h-48 w-48 rounded-full bg-green-500/10 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl"
              aria-hidden
            />
            <div className="relative z-10 flex flex-col gap-8 p-8 md:p-12 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl text-center md:text-left">
                <h3
                  className="font-bold text-2xl md:text-3xl"
                  style={{
                    fontFamily: typography.fonts.heading,
                    color: colors.secondary.gray[900],
                  }}
                >
                  Never miss an update
                </h3>
                <p
                  className="mt-3 text-sm md:text-base text-gray-600"
                  style={{
                    fontFamily: typography.fonts.body,
                  }}
                >
                  Subscribe to our newsletter and get the latest climate
                  innovation news delivered straight to your inbox.
                </p>
              </div>
              <form
                className="w-full max-w-lg md:flex md:items-center md:justify-end"
                aria-label="Newsletter subscription"
              >
                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-full border border-green-200 bg-white px-5 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
                  />
                  <Button
                    type="submit"
                    className="sm:w-auto rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-200"
                    style={{ backgroundColor: colors.primary.green.DEFAULT }}
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
