"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { Calendar, Globe, Rocket, TrendingUp } from "lucide-react";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface HistoryTimelineSectionProps {
  className?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 2010,
    title: "Concept Development",
    description: "Concept developed by infoDev, UNIDO, and DFID to support climate innovation in Kenya",
    icon: Calendar,
  },
  {
    year: 2012,
    title: "First CIC Established",
    description: "First Climate Innovation Centre established by World Bank InfoDev program",
    icon: Rocket,
  },
  {
    year: 2015,
    title: "Independent Operation",
    description: "KCIC begins independent operation, expanding services and impact",
    icon: TrendingUp,
  },
  {
    year: 2024,
    title: "Regional Presence",
    description: "Established regional presence across Kenya, Uganda, and Tanzania",
    icon: Globe,
  },
];

/**
 * History Timeline Section
 * Builds credibility through organizational background and milestones
 * Requirements: 1.3, 7.3, 5.4, 9.2, 6.4
 */
export default function HistoryTimeline({
  className = "",
}: HistoryTimelineSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineLineRef = useRef<SVGLineElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animated line drawing from left to right
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 50%",
              once: true,
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Staggered fade-in animations for cards (100ms delay each)
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.1, // 100ms stagger
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "top 55%",
                once: true,
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="history-timeline-heading"
      className={`relative min-h-screen flex items-center py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Subtle background gradient shift */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, rgba(128,199,56,0.05) 0%, rgba(128,199,56,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <h2
            id="history-timeline-heading"
            className="font-bold text-foreground mb-4"
            style={{
              fontSize: "clamp(1.875rem, 5vw, 3rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              letterSpacing: "-0.02em",
            }}
          >
            Our Story
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto"
            style={{ background: colors.primary.green.DEFAULT }}
            aria-hidden
          />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            {/* Connecting Line (SVG for animation) */}
            <svg
              className="absolute top-24 left-0 w-full h-1"
              style={{ zIndex: 0 }}
              aria-hidden
            >
              <line
                ref={timelineLineRef}
                x1="10%"
                y1="50%"
                x2="90%"
                y2="50%"
                stroke={colors.primary.green.DEFAULT}
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </svg>

            {/* Timeline Cards */}
            <div className="grid grid-cols-4 gap-8 relative">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="relative pt-32"
                >
                  {/* Year Marker */}
                  <div
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: colors.primary.green.DEFAULT,
                      boxShadow: `0 0 0 4px rgba(128, 199, 56, 0.2)`,
                    }}
                    aria-hidden
                  />

                  {/* Card */}
                  <div
                    className="relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(12px)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${colors.primary.green.DEFAULT}15`,
                      }}
                    >
                      <event.icon
                        className="w-6 h-6"
                        style={{ color: colors.primary.green.DEFAULT }}
                        aria-hidden
                      />
                    </div>

                    {/* Year */}
                    <div
                      className="font-bold text-center mb-2"
                      style={{
                        fontSize: "1.5rem",
                        fontFamily: typography.fonts.heading,
                        color: colors.primary.green.DEFAULT,
                        lineHeight: 1,
                      }}
                    >
                      {event.year}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-semibold text-foreground text-center mb-2"
                      style={{
                        fontSize: "1.125rem",
                        fontFamily: typography.fonts.heading,
                        lineHeight: typography.lineHeights.snug,
                      }}
                    >
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-foreground/80 text-center"
                      style={{
                        fontSize: "0.9375rem",
                        fontFamily: typography.fonts.body,
                        lineHeight: typography.lineHeights.relaxed,
                      }}
                    >
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet: Horizontal Scroll with Scroll Snap */}
          <div className="lg:hidden">
            <div
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="shrink-0 w-[280px] snap-center"
                >
                  {/* Card */}
                  <div
                    className="relative p-6 rounded-2xl border h-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(12px)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto"
                      style={{
                        background: `${colors.primary.green.DEFAULT}15`,
                      }}
                    >
                      <event.icon
                        className="w-6 h-6"
                        style={{ color: colors.primary.green.DEFAULT }}
                        aria-hidden
                      />
                    </div>

                    {/* Year */}
                    <div
                      className="font-bold text-center mb-2"
                      style={{
                        fontSize: "1.5rem",
                        fontFamily: typography.fonts.heading,
                        color: colors.primary.green.DEFAULT,
                        lineHeight: 1,
                      }}
                    >
                      {event.year}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-semibold text-foreground text-center mb-2"
                      style={{
                        fontSize: "1.125rem",
                        fontFamily: typography.fonts.heading,
                        lineHeight: typography.lineHeights.snug,
                      }}
                    >
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-foreground/80 text-center"
                      style={{
                        fontSize: "0.9375rem",
                        fontFamily: typography.fonts.body,
                        lineHeight: typography.lineHeights.relaxed,
                      }}
                    >
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background:
                      index === 0
                        ? colors.primary.green.DEFAULT
                        : "rgba(128, 199, 56, 0.3)",
                  }}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar for mobile */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
