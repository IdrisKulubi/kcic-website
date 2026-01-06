"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { Warning, Drop, Plant, Wind } from "@phosphor-icons/react";

interface ClimateChallengeSectionProps {
  className?: string;
}

/**
 * Climate Challenge Section
 * Establishes problem context and urgency using data and emotional appeal
 * Requirements: 1.2, 7.2, 9.4, 6.4
 */
export default function ClimateChallenge({
  className = "",
}: ClimateChallengeSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const textContentRef = useRef<HTMLDivElement | null>(null);
  const visualContentRef = useRef<HTMLDivElement | null>(null);
  const statNumberRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current || !textContentRef.current || !visualContentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade-in-left animation for text content
      gsap.fromTo(
        textContentRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 60%",
            once: true,
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );

      // Fade-in-right animation for visual content
      gsap.fromTo(
        visualContentRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 60%",
            once: true,
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );

      // Counter-up animation for statistics
      if (statNumberRef.current) {
        const target = 2.6;
        const obj = { value: 0 };

        gsap.to(obj, {
          value: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statNumberRef.current,
            start: "top 85%",
            once: true,
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            if (statNumberRef.current) {
              statNumberRef.current.textContent = obj.value.toFixed(1);
            }
          },
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="climate-challenge-heading"
      className={`relative min-h-screen flex items-center py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Subtle background gradient shift */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, rgba(245,158,11,0.05) 0%, rgba(245,158,11,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div ref={textContentRef} className="space-y-8">
            <h2
              id="climate-challenge-heading"
              className="font-bold text-foreground"
              style={{
                fontSize: "clamp(1.875rem, 5vw, 3rem)",
                fontFamily: typography.fonts.heading,
                lineHeight: typography.lineHeights.tight,
                letterSpacing: "-0.02em",
              }}
            >
              The Climate Challenge
            </h2>

            <div
              className="w-16 h-1 rounded-full"
              style={{ background: colors.primary.green.DEFAULT }}
              aria-hidden
            />

            <p
              className="text-foreground/90"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                fontFamily: typography.fonts.body,
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              Climate Change remains one of the world's greatest existential
              threats, with Africa bearing a disproportionate burden despite
              contributing the least to global emissions. Rising temperatures,
              unpredictable weather patterns, and environmental degradation
              threaten livelihoods, economies, and the very fabric of our
              communities.
            </p>

            {/* Key Statistic Callout */}
            <div
              className="relative p-6 rounded-2xl border"
              style={{
                background: "rgba(245, 158, 11, 0.05)",
                borderColor: "rgba(245, 158, 11, 0.2)",
              }}
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  ref={statNumberRef}
                  className="font-bold"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 2.5rem)",
                    fontFamily: typography.fonts.heading,
                    color: colors.semantic.warning,
                    lineHeight: 1,
                  }}
                  aria-label="2.6 percent"
                >
                  2.6
                </span>
                <span
                  className="font-bold"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontFamily: typography.fonts.heading,
                    color: colors.semantic.warning,
                  }}
                >
                  %
                </span>
              </div>
              <p
                className="text-foreground/80"
                style={{
                  fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.normal,
                }}
              >
                of Kenya's GDP loss annually by 2030 due to climate impacts
              </p>
            </div>

            {/* Impact Areas */}
            <div className="space-y-4">
              <h3
                className="font-semibold text-foreground"
                style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                  fontFamily: typography.fonts.heading,
                }}
              >
                Key Impact Areas:
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Environmental Degradation", icon: Warning },
                  { label: "Biodiversity Loss", icon: Plant },
                  { label: "Water & Air Pollution", icon: Drop },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-foreground/80"
                    style={{
                      fontSize: "clamp(0.9375rem, 1.2vw, 1rem)",
                      fontFamily: typography.fonts.body,
                    }}
                  >
                    <div
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: `${colors.primary.green.DEFAULT}15`,
                      }}
                    >
                      <item.icon
                        className="w-4 h-4"
                        style={{ color: colors.primary.green.DEFAULT }}
                        aria-hidden
                      />
                    </div>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Visual Content - Icon Grid */}
          <div ref={visualContentRef} className="relative">
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Wind,
                  label: "Climate Action",
                  color: colors.primary.blue.DEFAULT,
                },
                {
                  icon: Plant,
                  label: "Ecosystem Restoration",
                  color: colors.primary.green.DEFAULT,
                },
                {
                  icon: Drop,
                  label: "Water Security",
                  color: colors.primary.blue.DEFAULT,
                },
                {
                  icon: Warning,
                  label: "Risk Mitigation",
                  color: colors.semantic.warning,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                    style={{
                      background: `${item.color}15`,
                    }}
                  >
                    <item.icon
                      className="w-8 h-8"
                      style={{ color: item.color }}
                      aria-hidden
                    />
                  </div>
                  <p
                    className="text-center text-foreground/80 font-medium"
                    style={{
                      fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
                      fontFamily: typography.fonts.body,
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${colors.semantic.warning}, transparent)`,
              }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
