'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { colors, typography } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatItem {
  value: string;
  description: string;
  suffix?: string;
  subdescription?: string;
}

interface MinimalStatsSectionProps {
  stats: StatItem[];
  targets?: StatItem[];
  showToggle?: boolean;
  variant?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
}

export function MinimalStatsSection({ 
  stats, 
  targets, 
  variant = 'light',
  title,
  subtitle 
}: MinimalStatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    // Simple fade-in without complex animations
    if (sectionRef.current) {
      sectionRef.current.style.opacity = '1';
    }
  }, []);



  const renderStats = (data: StatItem[], isTargets: boolean = false) => {
    const isDark = variant === 'dark';
    
    return (
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        aria-live="polite"
      >
        {data.map((stat, index) => (
          <div 
            key={index}
            className={`relative p-6 rounded-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-transparent border border-white/10 hover:border-white/20 hover:shadow-2xl' 
                : 'bg-white shadow-sm border border-gray-100 hover:shadow-md'
            }`}
          >
            <h3 
              ref={(el) => {
                if (!isTargets) counterRefs.current[index] = el;
              }}
              className="font-bold mb-2"
              style={{
                fontSize: isDark ? '3.5rem' : 'clamp(2rem, 4vw, 2.6rem)',
                fontFamily: typography.fonts.heading,
                lineHeight: typography.lineHeights.tight,
                color: isDark ? '#FFA500' : colors.primary.green.DEFAULT,
                textShadow: isDark ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 0 rgba(0,0,0,0.03)'
              }}
            >
              {stat.value}
            </h3>
            <div 
              className="h-1 w-10 rounded-full mb-3" 
              style={{ 
                background: isDark ? '#FFA500' : colors.primary.green.DEFAULT 
              }} 
            />
            <p 
              className={isDark ? 'text-white font-semibold' : 'text-gray-700'}
              style={{
                fontSize: isDark ? '1.125rem' : 'clamp(0.9rem, 1.5vw, 1rem)',
                fontFamily: typography.fonts.body,
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              {stat.description}
            </p>
            {stat.subdescription && (
              <p 
                className={isDark ? 'text-white/70 mt-2' : 'text-gray-500 mt-2'}
                style={{
                  fontSize: '0.875rem',
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.normal,
                }}
              >
                {stat.subdescription}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const isDark = variant === 'dark';
  const sectionBg = isDark 
    ? 'linear-gradient(135deg, #0B0F0A, #0E1410)' 
    : 'transparent';

  return (
    <section 
      id="impact-section"
      ref={sectionRef}
      className={`py-20 sm:py-32 ${isDark ? 'w-full' : ''}`}
      style={{
        background: sectionBg,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {targets ? (
          <Tabs defaultValue="impact" className="w-full">
            <div className="flex flex-col items-center mb-16">
              <TabsList className={`shadow-sm rounded-full p-1 ${
                isDark ? 'bg-white/10' : 'bg-white'
              }`}>
                <TabsTrigger 
                  value="impact"
                  className={`text-lg font-semibold px-6 py-2 rounded-full transition-all ${
                    isDark 
                      ? 'data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70' 
                      : 'data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm'
                  }`}
                  style={{ fontFamily: typography.fonts.heading }}
                >
                  Impact
                </TabsTrigger>
                <TabsTrigger 
                  value="targets"
                  className={`text-lg font-semibold px-6 py-2 rounded-full transition-all ${
                    isDark 
                      ? 'data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70' 
                      : 'data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm'
                  }`}
                  style={{ fontFamily: typography.fonts.heading }}
                >
                  Our Targets
                </TabsTrigger>
              </TabsList>
              <div 
                className={`mt-4 text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}
                style={{ fontFamily: typography.fonts.body }}
              >
                (2025-2030)
              </div>
            </div>

            <TabsContent value="impact" className="mt-0">
              {renderStats(stats, false)}
            </TabsContent>
            
            <TabsContent value="targets" className="mt-0">
              {renderStats(targets, true)}
            </TabsContent>

            <div className={`mt-16 pt-12 ${
              isDark ? 'border-t border-white/10' : 'border-t border-gray-200'
            }`}>
              <div className="flex justify-center">
                <Button 
                  variant="outline"
                  className={`rounded-full px-8 py-3 transition-all duration-300 ${
                    isDark 
                      ? 'border-white/30 text-white hover:bg-white/10' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: typography.fonts.body }}
                  asChild
                >
                  <Link href="/impact">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Tabs>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 
                className="font-bold mb-4"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontFamily: typography.fonts.heading,
                  color: isDark ? '#FFFFFF' : colors.secondary.gray[900],
                  lineHeight: typography.lineHeights.tight,
                }}
              >
                {title || 'Our Impact'}
              </h2>
              {subtitle && (
                <p 
                  className={`mt-4 ${isDark ? 'text-white/80' : 'text-gray-600'}`}
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  {subtitle}
                </p>
              )}
              <div 
                className="w-24 h-1 mx-auto rounded-full mt-4"
                style={{ background: isDark ? '#FFA500' : colors.primary.green.DEFAULT }}
              />
            </div>
            {renderStats(stats, false)}
          </>
        )}
      </div>
    </section>
  );
}
