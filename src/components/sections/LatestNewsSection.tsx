"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NewsData } from "@/data/home";

interface LatestNewsSectionProps {
  news: NewsData[];
}

export function LatestNewsSection({ news }: LatestNewsSectionProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient-climate">
              Latest Updates
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Stay informed about our latest initiatives, partnerships, and impact in climate innovation
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal scrolling news container */}
        <ScrollReveal delay={0.2}>
          <div className="relative">
            {/* News articles container with horizontal scroll */}
            <div 
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 custom-scrollbar px-4 sm:px-0 -mx-4 sm:mx-0"
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {news.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="flex-none w-72 sm:w-80 md:w-96 first:ml-4 sm:first:ml-0 last:mr-4 sm:last:mr-0"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50">
                    <CardContent className="p-0">
                      {/* Article thumbnail */}
                      <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={article.thumbnail}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>

                      {/* Article content */}
                      <div className="p-4 sm:p-6">
                        {/* Publication date */}
                        <div className="text-sm text-muted-foreground mb-3">
                          {formatDate(article.publishedAt)}
                        </div>

                        {/* Article title */}
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-climate-green transition-colors duration-300">
                          {article.title}
                        </h3>

                        {/* Article excerpt */}
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>

                        {/* Read more button */}
                        <Link href={article.href}>
                          <Button 
                            variant="outline" 
                            className="w-full group-hover:bg-climate-green group-hover:text-white group-hover:border-climate-green transition-all duration-300 min-h-[44px] text-sm sm:text-base"
                          >
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Scroll indicators for mobile */}
            <div className="flex justify-center mt-6 md:hidden">
              <div className="flex gap-2">
                {news.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-muted-foreground/30"
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* View all news button */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-8 sm:mt-12">
            <Link href="/news">
              <Button 
                size="lg" 
                className="bg-climate-green hover:bg-climate-green-dark text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 min-h-[44px] w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                View All News
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default LatestNewsSection;