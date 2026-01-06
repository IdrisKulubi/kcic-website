'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { colors, typography } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { ArrowRight } from "@phosphor-icons/react";
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
  /** Optional side image for layouts like KCIC 13 Years On */
  imageSrc?: string;
  imageAlt?: string;
  imageSide?: 'left' | 'right';
}

export function MinimalStatsSection({
  stats,
  targets,
  variant = 'light',
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imageSide = 'left',
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

    // Modern minimal layout for "dark" variant (KCIC 13 Years On)
    // NOTE: This layout is used on a light background on the homepage,
    // so we use dark text colors in light mode and switch to light text
    // only when the overall page is in dark mode.
    if (isDark) {
      return (
        <div
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10 lg:gap-y-14"
          aria-live="polite"
        >
          {data.map((stat, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span
                  ref={(el) => {
                    if (!isTargets) counterRefs.current[index] = el;
                  }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-climate-green dark:text-[#FFC94A] block"
                  style={{
                    fontFamily: typography.fonts.heading,
                    lineHeight: 1.1,
                    textShadow: '0 1px 2px rgba(0,0,0,0.18)',
                  }}
                >
                  {stat.value}
                </span>
              </div>
              <p
                className="text-sm sm:text-base font-medium text-gray-800 dark:text-white/90"
                style={{
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.snug,
                }}
              >
                {stat.description}
              </p>
              {stat.subdescription && (
                <p
                  className="text-xs sm:text-sm text-gray-600 dark:text-white/60"
                  style={{
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  {stat.subdescription}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Original card layout for light variant (impact page etc.)
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        aria-live="polite"
      >
        {data.map((stat, index) => (
          <div
            key={index}
            className="relative p-6 rounded-2xl transition-all duration-300 bg-white shadow-sm border border-gray-100 hover:shadow-md"
          >
            <h3
              ref={(el) => {
                if (!isTargets) counterRefs.current[index] = el;
              }}
              className="font-bold mb-2"
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                fontFamily: typography.fonts.heading,
                lineHeight: typography.lineHeights.tight,
                color: colors.primary.green.DEFAULT,
                textShadow: '0 1px 0 rgba(0,0,0,0.03)',
              }}
            >
              {stat.value}
            </h3>
            <div
              className="h-1 w-10 rounded-full mb-3"
              style={{ background: colors.primary.green.DEFAULT }}
            />
            <p
              className="text-gray-700"
              style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                fontFamily: typography.fonts.body,
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              {stat.description}
            </p>
            {stat.subdescription && (
              <p
                className="text-gray-500 mt-2"
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

  return (
    <section
      id="impact-section"
      ref={sectionRef}
      className={`py-20 sm:py-32 relative`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            {title || 'Our Impact'}
          </h2>
          {subtitle && (
            <p
              className="mt-4 text-gray-600"
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
            style={{ background: colors.primary.green.DEFAULT }}
          />
        </div>

        {targets ? (
          <Tabs defaultValue="impact" className="w-full">
            <div className="flex flex-col items-center mb-12">
              <TabsList className="shadow-sm rounded-full p-1.5 bg-white/90 dark:bg-white/10 backdrop-blur">
                <TabsTrigger
                  value="impact"
                  className={`text-base sm:text-lg font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all ${isDark
                    ? 'data-[state=active]:bg-[#FFA500] data-[state=active]:text-gray-900 text-gray-700 hover:text-gray-900 dark:text-white/70 dark:hover:text-white'
                    : 'data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm'
                    }`}
                  style={{ fontFamily: typography.fonts.heading }}
                >
                  <span className="flex flex-col items-center">
                    <span>2010 - Today</span>
                    <span className="text-xs font-normal opacity-75">13 Years of Impact</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="targets"
                  className={`text-base sm:text-lg font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all ${isDark
                    ? 'data-[state=active]:bg-[#FFA500] data-[state=active]:text-gray-900 text-gray-700 hover:text-gray-900 dark:text-white/70 dark:hover:text-white'
                    : 'data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm'
                    }`}
                  style={{ fontFamily: typography.fonts.heading }}
                >
                  <span className="flex flex-col items-center">
                    <span>2025 - 2030</span>
                    <span className="text-xs font-normal opacity-75">Our Targets</span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {imageSrc ? (
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] items-center">
                {/* Image side - stays the same */}
                <div className={imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'}>
                  <div className="relative mx-auto max-w-xl w-full aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-lg">
                    <Image
                      src={imageSrc}
                      alt={imageAlt || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-contain object-center"
                      priority={variant === 'dark'}
                    />
                  </div>
                </div>

                {/* Stats side - switches between impact and targets */}
                <div className={imageSide === 'right' ? 'lg:order-1' : 'lg:order-2'}>
                  <TabsContent value="impact" className="mt-0">
                    {renderStats(stats, false)}
                  </TabsContent>

                  <TabsContent value="targets" className="mt-0">
                    {renderStats(targets, true)}
                  </TabsContent>
                </div>
              </div>
            ) : (
              <>
                <TabsContent value="impact" className="mt-0">
                  {renderStats(stats, false)}
                </TabsContent>

                <TabsContent value="targets" className="mt-0">
                  {renderStats(targets, true)}
                </TabsContent>
              </>
            )}

            <div className={`mt-16 pt-12 ${isDark ? 'border-t border-white/10' : 'border-t border-gray-200'
              }`}>

            </div>
          </Tabs>
        ) : (
          <>
            {imageSrc ? (
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] items-center">
                {/* Image side */}
                <div className={imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'}>
                  <div className="relative mx-auto max-w-xl w-full aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-lg">
                    <Image
                      src={imageSrc}
                      alt={imageAlt || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-contain object-center"
                      priority={variant === 'dark'}
                    />
                  </div>
                </div>

                {/* Stats side */}
                <div className={imageSide === 'right' ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="mb-10 text-center lg:text-left">
                    <h2
                      className="font-bold mb-4"
                      style={{
                        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
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
                          fontSize: '1.1rem',
                          fontFamily: typography.fonts.body,
                          lineHeight: typography.lineHeights.relaxed,
                        }}
                      >
                        {subtitle}
                      </p>
                    )}
                    <div
                      className={`w-24 h-1 mt-5 rounded-full ${isDark ? '' : ''} ${imageSide === 'right' ? 'lg:ml-0 mx-auto' : 'lg:ml-0 mx-auto'}`}
                      style={{ background: isDark ? '#FFA500' : colors.primary.green.DEFAULT }}
                    />
                  </div>

                  {renderStats(stats, false)}
                </div>
              </div>
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
          </>
        )}
      </div>
    </section>
  );
}
