"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";

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
  const valuesRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      className={`relative min-h-screen flex items-center py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Clean background with no gradients for clarity */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered content with max-width: 900px */}
        <div className="max-w-[900px] mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-16 sm:mb-20">
            <h2
              id="what-we-do-heading"
              className="font-bold text-foreground mb-4"
              style={{
                fontSize: "clamp(1.875rem, 5vw, 3rem)",
                fontFamily: typography.fonts.heading,
                lineHeight: typography.lineHeights.tight,
                letterSpacing: "-0.02em",
              }}
            >
              What We Do
            </h2>
            <div
              className="w-16 h-1 rounded-full mx-auto"
              style={{ background: colors.primary.green.DEFAULT }}
              aria-hidden
            />
          </div>

          {/* Mission */}
          <div ref={missionRef} className="mb-12 text-center">
            <p
              className="text-xs uppercase tracking-wider mb-3"
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Mission
            </p>
            <p
              className="font-semibold"
              style={{
                fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                fontFamily: typography.fonts.heading,
                lineHeight: typography.lineHeights.snug,
                color: colors.primary.green.DEFAULT,
              }}
            >
              Catalysing Climate Entrepreneurship
            </p>
          </div>

          {/* Vision */}
          <div ref={visionRef} className="mb-16 text-center">
            <p
              className="text-xs uppercase tracking-wider mb-3"
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Vision
            </p>
            <p
              className="font-semibold"
              style={{
                fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                fontFamily: typography.fonts.heading,
                lineHeight: typography.lineHeights.snug,
                color: colors.primary.green.DEFAULT,
              }}
            >
              Sustainable Enterprises and Climate Resilient Communities
            </p>
          </div>

          {/* Core Values - 2x3 grid */}
          <div className="mb-8 text-center">
            <p
              className="text-xs uppercase tracking-wider mb-6"
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Core Values
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    valuesRefs.current[index] = el;
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 transition-all duration-300 hover:scale-105"
                  style={{
                    background: `${colors.primary.green.DEFAULT}10`,
                    border: `1px solid ${colors.primary.green.DEFAULT}20`,
                    borderRadius: "9999px",
                  }}
                >
                  <span
                    className="font-medium text-foreground"
                    style={{
                      fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
                      fontFamily: typography.fonts.body,
                      lineHeight: typography.lineHeights.normal,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
