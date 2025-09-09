'use client';

import React from 'react';
import { colors, typography } from '@/lib/design-system';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatItem {
  value: string;
  description: string;
  suffix?: string;
}

interface MinimalStatsSectionProps {
  stats: StatItem[];
  targets?: StatItem[];
  showToggle?: boolean;
}

export function MinimalStatsSection({ stats, targets }: MinimalStatsSectionProps) {
  const { getMotionSafeClasses } = useAccessibilityClasses();

  const renderStats = (data: StatItem[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {data.map((stat, index) => (
        <div 
          key={index}
          className={`relative ${getMotionSafeClasses(`animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-${index * 150}`)}`}
        >
          <h3 
            className="font-bold mb-3"
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              background: colors.gradients.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {stat.value}
          </h3>
          <p 
            className="text-gray-600"
            style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <section 
      id="impact-section"
      className="py-20 sm:py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {targets ? (
          <Tabs defaultValue="impact" className="w-full">
            <div className="flex flex-col items-center mb-16">
              <TabsList className="bg-white shadow-sm rounded-full p-1">
                <TabsTrigger 
                  value="impact"
                  className="text-lg font-semibold px-6 py-2 rounded-full data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm transition-all"
                  style={{ fontFamily: typography.fonts.heading }}
                >
                  Impact
                </TabsTrigger>
                <TabsTrigger 
                  value="targets"
                  className="text-lg font-semibold px-6 py-2 rounded-full data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm transition-all"
                  style={{ fontFamily: typography.fonts.heading }}
                >
                  Our Targets
                </TabsTrigger>
              </TabsList>
              <div className="mt-4 text-sm text-gray-500" style={{ fontFamily: typography.fonts.body }}>
                (2025-2030)
              </div>
            </div>

            <TabsContent value="impact" className="mt-0">
              {renderStats(stats)}
            </TabsContent>
            
            <TabsContent value="targets" className="mt-0">
              {renderStats(targets)}
            </TabsContent>

            <div className="mt-16 pt-12 border-t border-gray-200">
              <div className="flex justify-center">
                <Button 
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-3 transition-all duration-300"
                  style={{ fontFamily: typography.fonts.body }}
                  asChild
                >
                  <a href="/impact">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
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
                  color: colors.secondary.gray[900],
                  lineHeight: typography.lineHeights.tight,
                }}
              >
                Our Impact
              </h2>
              <div 
                className="w-24 h-1 mx-auto"
                style={{
                  background: colors.gradients.primary,
                }}
              />
            </div>
            {renderStats(stats)}
          </>
        )}
      </div>
    </section>
  );
}
