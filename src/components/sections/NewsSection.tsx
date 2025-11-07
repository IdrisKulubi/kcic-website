"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, TrendingUp, Newspaper, BookOpen, Mic, PlayCircle } from "lucide-react";
import { colors, typography } from '@/lib/design-system';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
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
  type?: 'article' | 'video' | 'podcast' | 'report';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Categorize news
  const categories = ['all', ...new Set(news.map(item => item.category))];
  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);
  
  const featuredNews = filteredNews.filter(item => item.featured)[0];
  const latestNews = filteredNews.filter(item => !item.featured).slice(0, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-4 w-4" />;
      case 'podcast': return <Mic className="h-4 w-4" />;
      case 'report': return <BookOpen className="h-4 w-4" />;
      default: return <Newspaper className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Innovation': 'from-blue-500 to-indigo-500',
      'Sustainability': 'from-green-500 to-emerald-500',
      'Technology': 'from-purple-500 to-pink-500',
      'Impact': 'from-orange-500 to-red-500',
      'Events': 'from-cyan-500 to-blue-500',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getTabStyles = (category: string) => {
    const isActive = selectedCategory === category;
    return {
      className: cn(
        "px-6 py-2 rounded-full bg-gray-100 capitalize transition-all duration-200",
        isActive && "text-white shadow-sm"
      ),
      style: isActive
        ? {
            backgroundColor: colors.primary.green[500],
            boxShadow: `0 0 0 2px ${colors.primary.green[200]}`,
          }
        : undefined,
    } as const;
  };

  return (
    <section className={cn("py-20 sm:py-32 bg-white", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={getMotionSafeClasses('animate-in fade-in slide-in-from-bottom-8 duration-1000')}>
            <Badge
              className="mb-4 px-4 py-1.5 border rounded-full"
              style={{
                backgroundColor: colors.primary.green[50],
                borderColor: colors.primary.green[200],
                color: colors.primary.green[700],
              }}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Latest Updates
            </Badge>
            <h2 
              className="font-bold mb-4"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
                lineHeight: typography.lineHeights.tight,
              }}
            >
              News & Insights
            </h2>
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[600],
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              Discover the latest stories, research, and updates from our climate innovation ecosystem
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
          className="w-full mb-12"
        >
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-12">
            {categories.map((category) => (
              <TabsTrigger 
                key={category}
                value={category}
                {...getTabStyles(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Featured Article */}
              {featuredNews && (
                <div className={cn(
                  "lg:col-span-7",
                  getMotionSafeClasses('animate-in fade-in slide-in-from-left duration-1000')
                )}>
                  <Link href={`/news/${featuredNews.slug}`}>
                    <Card className="h-full group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                    {featuredNews.imageUrl && (
                      <div className="relative h-96 overflow-hidden">
                        <Image
                          src={featuredNews.imageUrl}
                          alt={featuredNews.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <Badge className={cn(
                            "mb-3 text-white border-0 bg-linear-to-r",
                            getCategoryColor(featuredNews.category)
                          )}>
                            {featuredNews.category}
                          </Badge>
                          <h3 className="text-white font-bold text-3xl mb-2" style={{ fontFamily: typography.fonts.heading }}>
                            {featuredNews.title}
                          </h3>
                          <p className="text-white/90 line-clamp-2">
                            {featuredNews.excerpt}
                          </p>
                        </div>
                        <Badge className="absolute top-6 right-6 bg-yellow-500 text-white border-0">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          {featuredNews.author && (
                            <div className="flex items-center gap-2">
                              {featuredNews.author.avatar && (
                                <Image
                                  src={featuredNews.author.avatar} 
                                  alt={featuredNews.author.name}
                                  width={24}
                                  height={24}
                                  className="w-6 h-6 rounded-full"
                                />
                              )}
                              <span className="font-medium">{featuredNews.author.name}</span>
                            </div>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(featuredNews.publishedAt)}
                          </span>
                        </div>
                        {featuredNews.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {featuredNews.readTime}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center font-semibold text-green-600 hover:text-green-700 group cursor-pointer">
                        Read Full Story
                        <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </CardContent>
                    </Card>
                  </Link>
                </div>
              )}

              {/* Latest Articles Grid */}
              <div className={cn(
                "lg:col-span-5 space-y-4",
                getMotionSafeClasses('animate-in fade-in slide-in-from-right duration-1000 delay-200')
              )}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg" style={{ fontFamily: typography.fonts.heading }}>
                    Latest Articles
                  </h3>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    View All
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                
                {latestNews.slice(0, 3).map((article, index) => (
                  <Link key={article.id} href={`/news/${article.slug}`}>
                    <Card 
                      className={cn(
                        "group hover:shadow-lg transition-all duration-300 border-gray-100 cursor-pointer",
                        getMotionSafeClasses(`animate-in fade-in slide-in-from-right duration-1000 delay-${(index + 1) * 100}`)
                      )}
                    >
                      <CardContent className="p-4">
                      <div className="flex gap-4">
                        {article.imageUrl && (
                          <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {getTypeIcon(article.type)}
                              <span className="ml-1">{article.category}</span>
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {formatDate(article.publishedAt)}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-green-600 transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Grid - More Articles */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-xl" style={{ fontFamily: typography.fonts.heading }}>
                  More Stories
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestNews.slice(3, 6).map((article, index) => (
                  <Link key={article.id} href={`/news/${article.slug}`}>
                    <Card 
                      className={cn(
                        "group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer",
                        getMotionSafeClasses(`animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-${index * 100}`)
                      )}
                    >
                    {article.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Badge className={cn(
                          "absolute top-3 left-3 text-white border-0 bg-linear-to-r text-xs",
                          getCategoryColor(article.category)
                        )}>
                          {article.category}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>{formatDate(article.publishedAt)}</span>
                        {article.readTime && <span>{article.readTime}</span>}
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2">
                        {article.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <span className="inline-flex items-center text-green-600 group cursor-pointer font-medium">
                        Read More
                        <ArrowUpRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter CTA */}
        <div className="mt-12">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-center text-white">
            <h3 
              className="font-bold text-xl md:text-2xl mb-3"
              style={{
                fontFamily: typography.fonts.heading,
              }}
            >
              Never Miss an Update
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter and get the latest climate innovation news delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:border-white/40"
              />
                <Button 
                className="px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm"
                >
                Subscribe
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
