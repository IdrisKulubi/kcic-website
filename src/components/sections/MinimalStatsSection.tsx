'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { colors, typography } from '@/lib/design-system';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Section intro
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          end: 'top 70%',
          once: true,
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      }
    );

    // Animate each stat card on scroll in/out
    const items = gsap.utils.toArray<HTMLElement>(sectionRef.current.querySelectorAll('[data-stat-item]'));
    items.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 30, scale: 0.96 });
      const tl = gsap.timeline({ paused: true })
        .to(el, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        end: 'top 60%',
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => gsap.to(el, { opacity: 0, y: 20, scale: 0.98, duration: 0.3, ease: 'power1.out' }),
        // small stagger via scrub delay
        scrub: false,
        invalidateOnRefresh: true,
      });
    });

    ScrollTrigger.refresh();
  }, []);

  const renderStats = (data: StatItem[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {data.map((stat, index) => (
        <div 
          key={index}
          data-stat-item
          className="relative p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <h3 
            className="font-bold mb-2"
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.6rem)',
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              color: colors.primary.green.DEFAULT,
              textShadow: '0 1px 0 rgba(0,0,0,0.03)'
            }}
          >
            {stat.value}
          </h3>
          <div className="h-1 w-10 rounded-full mb-3" style={{ background: colors.primary.green.DEFAULT }} />
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
        </div>
      ))}
    </div>
  );

  return (
    <section 
      id="impact-section"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-transparent"
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
                  color: colors.secondary.gray[900],
                  lineHeight: typography.lineHeights.tight,
                }}
              >
                Our Impact
              </h2>
              <div 
                className="w-24 h-1 mx-auto rounded-full"
                style={{ background: colors.primary.green.DEFAULT }}
              />
            </div>
            {renderStats(stats)}
          </>
        )}
      </div>
    </section>
  );
}
