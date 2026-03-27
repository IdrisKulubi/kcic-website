'use client';

import { useLayoutEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { colors, typography } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { ArrowRight } from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

/** Parse a stat value string like "$63M", "57,517", "67%", "3,500+" into numeric parts */
function parseStatValue(raw: string): { prefix: string; number: number; suffix: string; decimals: number; hasComma: boolean } {
  const match = raw.match(/^([^0-9]*?)([\d,.]+)(.*)$/);
  if (!match) return { prefix: '', number: 0, suffix: raw, decimals: 0, hasComma: false };
  const prefix = match[1]; // e.g. "$"
  const numStr = match[2].replace(/,/g, ''); // strip commas
  const suffix = match[3]; // e.g. "M", "%", "+"
  const hasComma = match[2].includes(',');
  const dotIdx = numStr.indexOf('.');
  const decimals = dotIdx >= 0 ? numStr.length - dotIdx - 1 : 0;
  return { prefix, number: parseFloat(numStr), suffix, decimals, hasComma };
}

function formatStatNumber(n: number, decimals: number, addComma: boolean): string {
  const fixed = n.toFixed(decimals);
  if (!addComma) return fixed;
  const [intPart, decPart] = fixed.split('.');
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decPart ? `${withCommas}.${decPart}` : withCommas;
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
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Counter-up animation
  const animateCounters = useCallback((statData: StatItem[]) => {
    counterRefs.current.forEach((el, index) => {
      if (!el || !statData[index]) return;
      const parsed = parseStatValue(statData[index].value);
      if (parsed.number === 0) return;

      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: parsed.number,
        duration: 1.8,
        delay: index * 0.1,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${parsed.prefix}${formatStatNumber(proxy.val, parsed.decimals, parsed.hasComma)}${parsed.suffix}`;
        },
      });
    });
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Image parallax
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, scale: 0.92, y: 40 },
          {
            opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Stat cards stagger + counter trigger
      const statCards = sectionRef.current?.querySelectorAll('.stat-card-item');
      if (statCards && statCards.length > 0) {
        gsap.fromTo(statCards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: statCards[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
              onEnter: () => {
                if (!hasAnimated.current) {
                  hasAnimated.current = true;
                  animateCounters(stats);
                }
              },
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [stats, animateCounters]);



  const renderStats = (data: StatItem[], isTargets: boolean = false) => {
    const isDark = variant === 'dark';

    // Modern minimal layout for "dark" variant (KCIC 13 Years On)
    // NOTE: This layout is used on a light background on the homepage,
    // so we use dark text colors in light mode and switch to light text
    // only when the overall page is in dark mode.
    if (isDark) {
      return (
        <div
          className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-7 sm:gap-y-10 lg:gap-x-8 lg:gap-y-10"
          aria-live="polite"
        >
          {data.map((stat, index) => (
            <div key={index} className="stat-card-item space-y-3">
              <div className="flex items-baseline gap-2">
                <span
                  ref={(el) => {
                    if (!isTargets) counterRefs.current[index] = el;
                  }}
                  className="font-bold block"
                  style={{
                    fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                    fontFamily: typography.fonts.heading,
                    lineHeight: 1.1,
                    color: '#80c738',
                    textShadow: '0 1px 4px rgba(0,0,0,0.25)',
                  }}
                >
                  {stat.value}
                </span>
              </div>
              <p
                className="font-medium"
                style={{
                    fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)',
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.snug,
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                {stat.description}
              </p>
              {stat.subdescription && (
                <p
                  style={{
                    fontSize: 'clamp(0.75rem, 0.95vw, 0.8125rem)',
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.relaxed,
                    color: 'rgba(255,255,255,0.55)',
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
            className="stat-card-item relative border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
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
                fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)',
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
      className={`relative py-8 sm:py-10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-10 text-center">
          <h2
            className="font-bold mb-4"
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.45rem)',
              fontFamily: typography.fonts.heading,
              color: isDark ? '#ffffff' : colors.secondary.gray[900],
              lineHeight: typography.lineHeights.tight,
            }}
          >
            {title || 'Our Impact'}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.05vw, 0.98rem)',
                fontFamily: typography.fonts.body,
                lineHeight: typography.lineHeights.relaxed,
                color: isDark ? 'rgba(255,255,255,0.75)' : '#4b5563',
                marginTop: '0.75rem',
              }}
            >
              {subtitle}
            </p>
          )}
          <div
            className="w-24 h-1 mx-auto rounded-full mt-4"
            style={{ background: isDark ? '#80c738' : colors.primary.green.DEFAULT }}
          />
        </div>

        {targets ? (
          <Tabs defaultValue="impact" className="w-full">
            <div className="mb-10 flex flex-col items-center">
              <TabsList className="relative h-auto border border-white/15 p-2 backdrop-blur-md" style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)' }}>
                <TabsTrigger
                  value="impact"
                  className={`relative z-10 min-w-[160px] sm:min-w-[200px] py-3 sm:py-4 transition-all duration-300
                    data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]
                    ${isDark
                      ? 'data-[state=active]:bg-climate-green data-[state=active]:text-white text-white/60 hover:text-white/90'
                      : 'data-[state=active]:bg-white data-[state=active]:text-climate-green data-[state=active]:ring-1 data-[state=active]:ring-black/5 text-gray-500 hover:text-gray-900'
                    }`}
                >
                  <span className="flex flex-col items-center gap-1">
                    <span className="text-lg sm:text-xl font-bold tracking-tight" style={{ fontFamily: typography.fonts.heading }}>2010 - Today</span>
                    <span className="text-xs sm:text-sm font-medium opacity-80 whitespace-nowrap">13 Years of Impact</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="targets"
                  className={`relative z-10 min-w-[160px] sm:min-w-[200px] py-3 sm:py-4 transition-all duration-300
                    data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]
                    ${isDark
                      ? 'data-[state=active]:bg-[#FFA500] data-[state=active]:text-gray-900 text-white/60 hover:text-white/90'
                      : 'data-[state=active]:bg-white data-[state=active]:text-[#FFA500] data-[state=active]:ring-1 data-[state=active]:ring-black/5 text-gray-500 hover:text-gray-900'
                    }`}
                >
                  <span className="flex flex-col items-center gap-1">
                    <span className="text-lg sm:text-xl font-bold tracking-tight" style={{ fontFamily: typography.fonts.heading }}>2025 - 2030</span>
                    <span className="text-xs sm:text-sm font-medium opacity-80 whitespace-nowrap">Our Targets</span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {imageSrc ? (
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] items-center">
                {/* Image side - stays the same */}
                <div className={imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'}>
                  <div ref={imageRef} className="relative mx-auto max-w-xl w-full aspect-4/5 overflow-hidden border border-white/10 shadow-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <Image
                      src={imageSrc}
                      alt={imageAlt || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-contain object-center mix-blend-luminosity"
                      style={{ filter: isDark ? 'invert(1) hue-rotate(180deg) brightness(1.1)' : 'none' }}
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

            <div className={`mt-12 pt-8 ${isDark ? 'border-t border-white/10' : 'border-t border-gray-200'}`} style={{ marginBottom: 0 }}>

            </div>
          </Tabs>
        ) : (
          <>
            {imageSrc ? (
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] items-center">
                {/* Image side */}
                <div className={imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'}>
                  <div className="relative mx-auto max-w-xl w-full aspect-4/5 overflow-hidden border border-white/10 bg-black/20 shadow-lg">
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
                        fontSize: 'clamp(1.6rem, 3vw, 2.35rem)',
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
                          fontSize: 'clamp(0.9rem, 1.05vw, 0.98rem)',
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
                      fontSize: 'clamp(1.6rem, 3.2vw, 2.45rem)',
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
                        fontSize: 'clamp(0.9rem, 1.05vw, 0.98rem)',
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
