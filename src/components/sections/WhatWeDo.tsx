"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { Target, Eye, Sparkles } from "lucide-react";

interface WhatWeDoSectionProps {
  className?: string;
}

const coreValues = [
  "People-centric",
  "Innovation",
  "Professionalism",
  "Inclusivity",
  "Integrity",
  "Collaboration",
];

/**
 * What We Do Section
 * Clearly communicates mission, vision, and core values
 * Requirements: 1.5, 7.5, 5.2, 9.1, 6.4
 */
export default function WhatWeDo({
  className = "",
}: WhatWeDoSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);
  const valuesRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade-in for mission
      if (missionRef.current) {
        gsap.fromTo(
          missionRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
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

      // Fade-in for vision (100ms delay)
      if (visionRef.current) {
        gsap.fromTo(
          visionRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.1,
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

      // Staggered fade-in for value badges (50ms delay each)
      valuesRefs.current.forEach((badge, index) => {
        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              delay: 0.2 + index * 0.05, // Start after mission/vision, 50ms stagger
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
      aria-labelledby="what-we-do-heading"
      className={`relative py-16 sm:py-20 overflow-hidden ${className}`}
    >
      {/* Subtle ambient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(36rem 20rem at 0% 0%, rgba(128,199,56,0.10) 0%, rgba(128,199,56,0) 60%)," +
            "radial-gradient(36rem 20rem at 100% 100%, rgba(0,173,221,0.08) 0%, rgba(0,173,221,0) 60%)",
          filter: "blur(28px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur-md dark:bg-slate-900/70 dark:border-white/10"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1.5fr] p-6 sm:p-8 lg:p-10">
            {/* Left: heading and short narrative */}
            <div className="flex flex-col justify-between gap-6">
              <div>
                <p
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-climate-green-dark mb-3"
                  style={{ fontFamily: typography.fonts.body }}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  How we create impact
                </p>
                <h2
                  id="what-we-do-heading"
                  className="mb-4 font-bold text-foreground"
                  style={{
                    fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
                    fontFamily: typography.fonts.heading,
                    lineHeight: typography.lineHeights.tight,
                    letterSpacing: "-0.03em",
                  }}
                >
                  From ideas to climate-smart enterprises.
                </h2>
                <p
                  className="text-sm sm:text-base text-foreground/75 max-w-xl"
                  style={{
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  We identify promising entrepreneurs, equip them with tailored business support,
                  and connect them to finance and markets so that climate solutions can scale.
                </p>
              </div>
            </div>

            {/* Right: horizontal cards for Mission, Vision, Values */}
            <div className="grid gap-4 md:grid-cols-3">
              {/* Mission card */}
              <div
                ref={missionRef}
                className="group relative flex flex-col gap-3 rounded-2xl border border-climate-green/20 bg-white/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-slate-900/60 dark:border-climate-green/40"
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-climate-green-dark">
                  <Target className="h-3.5 w-3.5" />
                  Mission
                </div>
                <p
                  className="text-sm font-semibold text-foreground"
                  style={{
                    fontFamily: typography.fonts.heading,
                    lineHeight: typography.lineHeights.snug,
                  }}
                >
                  Catalysing climate entrepreneurship by helping SMEs develop, scale, and
                  commercialise climate solutions.
                </p>
              </div>

              {/* Vision card */}
              <div
                ref={visionRef}
                className="group relative flex flex-col gap-3 rounded-2xl border border-climate-blue/20 bg-white/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-slate-900/60 dark:border-climate-blue/40"
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-climate-blue-dark">
                  <Eye className="h-3.5 w-3.5" />
                  Vision
                </div>
                <p
                  className="text-sm font-semibold text-foreground"
                  style={{
                    fontFamily: typography.fonts.heading,
                    lineHeight: typography.lineHeights.snug,
                  }}
                >
                  A thriving ecosystem of sustainable enterprises powering climate-resilient
                  communities across Kenya and the region.
                </p>
              </div>

              {/* Values card */}
              <div
                className="group relative flex flex-col gap-3 rounded-2xl border border-[rgba(139,141,144,0.35)] bg-[#f7f7f8] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-slate-900/70 dark:border-slate-700"
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-gray)] dark:text-slate-200">
                  Core values
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {coreValues.map((value, index) => (
                    <span
                      key={value}
                      ref={(el) => {
                        valuesRefs.current[index] = el;
                      }}
                      className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-foreground/80 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900/60 dark:ring-slate-700"
                      style={{ fontFamily: typography.fonts.body }}
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
