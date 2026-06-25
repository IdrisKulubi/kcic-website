'use client';

import { useLayoutEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import {
  gsap,
  prefersReducedMotion,
  registerGsapFoundation,
} from '@/lib/gsap-foundation';

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
  imageSrc?: string;
  imageAlt?: string;
  imageSide?: 'left' | 'right';
}

function parseStatValue(raw: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
  hasComma: boolean;
} {
  const match = raw.match(/^([^0-9]*?)([\d,.]+)(.*)$/);
  if (!match) return { prefix: '', number: 0, suffix: raw, decimals: 0, hasComma: false };
  const prefix = match[1];
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3];
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

const impactTabClass =
  'min-w-[150px] sm:min-w-[190px] rounded-none border-2 border-transparent px-4 py-3 transition-colors data-[state=active]:border-[#101010] data-[state=active]:bg-[#101010] data-[state=active]:text-[#fff7df] text-[#101010] hover:bg-[#dff6bd]';

const targetsTabClass =
  'min-w-[150px] sm:min-w-[190px] rounded-none border-2 border-transparent px-4 py-3 transition-colors data-[state=active]:border-[#101010] data-[state=active]:bg-[#00addd] data-[state=active]:text-[#101010] text-[#101010] hover:bg-[#dff6bd]';

export function MinimalStatsSection({
  stats,
  targets,
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
  const { shouldDisableAnimations } = useAccessibilityClasses();

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
    if (!sectionRef.current || prefersReducedMotion() || shouldDisableAnimations?.()) return;

    registerGsapFoundation();

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        });
      }

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          y: 28,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          },
        });
      }

      const statCards = sectionRef.current?.querySelectorAll('.stat-card-item');
      if (statCards && statCards.length > 0) {
        gsap.from(statCards, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statCards[0],
            start: 'top 88%',
            onEnter: () => {
              if (!hasAnimated.current) {
                hasAnimated.current = true;
                animateCounters(stats);
              }
            },
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [stats, animateCounters, shouldDisableAnimations]);

  const renderStats = (data: StatItem[], isTargets = false) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4" aria-live="polite">
      {data.map((stat, index) => (
        <div
          key={`${stat.description}-${index}`}
          className="stat-card-item group relative overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] p-4 shadow-[5px_5px_0_#101010] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#101010] sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between border-b-[3px] border-[#101010] pb-3">
            <span className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#4f8618]">
              {isTargets ? 'Target' : 'Impact'} {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="grid h-7 w-7 place-items-center border-2 border-[#101010] bg-[#80c738] text-xs font-black text-[#101010] shadow-[2px_2px_0_#101010]"
              aria-hidden
            >
              +
            </span>
          </div>
          <p
            ref={(el) => {
              if (!isTargets) counterRefs.current[index] = el;
            }}
            className="text-4xl font-black leading-none text-[#101010] sm:text-5xl"
          >
            {stat.value}
          </p>
          <p className="mt-3 text-sm font-black uppercase leading-5 text-[#101010]">{stat.description}</p>
          {stat.subdescription ? (
            <p className="mt-2 text-sm font-semibold leading-6 text-[#4d4a3d]">{stat.subdescription}</p>
          ) : null}
        </div>
      ))}
    </div>
  );

  const renderMapPanel = () => {
    if (!imageSrc) return null;

    return (
      <div className={imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'}>
        <div
          ref={imageRef}
          className="mx-auto w-full max-w-xl border-[3px] border-[#101010] bg-[#fff7df] p-3 shadow-[8px_8px_0_#101010]"
        >
          <div className="mb-3 flex items-center justify-between border-b-[3px] border-[#101010] pb-3">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#101010]">Regional footprint</span>
            <span className="border-2 border-[#101010] bg-[#00addd] px-2 py-1 text-xs font-black text-[#101010]">
              KCIC map
            </span>
          </div>
          <div className="relative aspect-4/5 w-full overflow-hidden border-2 border-[#101010] bg-[#fff7df]">
            <Image
              src={imageSrc}
              alt={imageAlt || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => (
    <div
      ref={headerRef}
      className="mb-8 grid items-end gap-5 border-b-[3px] border-[#101010] pb-6 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div>
        <p className="mb-3 inline-flex border-2 border-[#101010] bg-[#fff7df] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#101010] shadow-[3px_3px_0_#101010]">
          KCIC progress route
        </p>
        <h2
          id="impact-section-heading"
          className="max-w-[10ch] text-5xl font-black leading-[0.92] text-[#fff7df] sm:text-6xl lg:text-7xl"
          style={{
            textShadow: '5px 5px 0 #101010',
            WebkitTextStroke: '1.5px #101010',
          }}
        >
          {title || 'Our Impact'}
        </h2>
      </div>
      {subtitle ? (
        <p className="max-w-3xl text-lg font-black leading-8 text-[#101010] sm:text-xl">{subtitle}</p>
      ) : null}
    </div>
  );

  const renderTabs = () => (
    <div className="mb-8 flex flex-col items-start">
      <TabsList className="h-auto gap-1 rounded-none border-[3px] border-[#101010] bg-[#fff7df] p-1 shadow-[5px_5px_0_#101010]">
        <TabsTrigger value="impact" className={impactTabClass}>
          <span className="flex flex-col items-center gap-0.5">
            <span className="text-base font-black tracking-tight sm:text-lg">2010 - Today</span>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wide sm:text-xs">13 Years of Impact</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="targets" className={targetsTabClass}>
          <span className="flex flex-col items-center gap-0.5">
            <span className="text-base font-black tracking-tight sm:text-lg">2025 - 2030</span>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wide sm:text-xs">Our Targets</span>
          </span>
        </TabsTrigger>
      </TabsList>
    </div>
  );

  return (
    <section
      id="impact-section"
      ref={sectionRef}
      aria-labelledby="impact-section-heading"
      className="relative isolate overflow-hidden border-y-[5px] border-[#101010] py-12 sm:py-14"
      style={{ backgroundColor: '#80c738' }}
    >
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full text-[#101010]/24"
        viewBox="0 0 1440 720"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M-55 161C165 86 340 91 507 174C677 259 789 278 961 191C1152 96 1278 79 1493 132"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M-43 546C152 468 341 480 501 557C675 640 826 650 1002 551C1167 458 1312 445 1498 502"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path d="M141 91V650M1298 70V662" stroke="currentColor" strokeWidth="2" strokeDasharray="12 16" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {renderHeader()}

        {targets ? (
          <Tabs defaultValue="impact" className="w-full">
            {renderTabs()}

            {imageSrc ? (
              <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.35fr] lg:gap-10">
                {renderMapPanel()}
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
          </Tabs>
        ) : imageSrc ? (
          <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.35fr] lg:gap-10">
            {renderMapPanel()}
            <div className={imageSide === 'right' ? 'lg:order-1' : 'lg:order-2'}>
              {renderStats(stats, false)}
            </div>
          </div>
        ) : (
          renderStats(stats, false)
        )}
      </div>
    </section>
  );
}
