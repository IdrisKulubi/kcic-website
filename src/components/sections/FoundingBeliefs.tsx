"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { typography } from "@/lib/design-system";

interface BeliefCard {
  title: string;
  description: string;
  iconBg: string;
}

interface FoundingBeliefsSectionProps {
  className?: string;
}

const beliefs: BeliefCard[] = [
  {
    title: "Challenges as Opportunities",
    description:
      "No challenge is too big, not even climate change. We see every obstacle as a chance to innovate and create lasting solutions that matter.",
    iconBg: "#10B981",
  },
  {
    title: "Innovation Meets Entrepreneurship",
    description:
      "Climate action and economic prosperity go hand in hand. We bridge the gap between environmental impact and business success.",
    iconBg: "#3B82F6",
  },
  {
    title: "SMEs as Climate Warriors",
    description:
      "Small and medium enterprises are frontline fighters innovating sustainable practices that transform communities and economies.",
    iconBg: "#8B5CF6",
  },
];

/**
 * Founding Beliefs Section
 * Connects emotionally with visitors through core values and philosophy
 */
export default function FoundingBeliefs({
  className = "",
}: FoundingBeliefsSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".belief-card");

      if (cards && cards.length > 0) {
        cards.forEach((card, index) => {
          gsap.set(card, {
            opacity: 0,
            y: 40,
            scale: 0.98,
          });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
              toggleActions: "play none none none",
            },
          });

          const icon = card.querySelector(".belief-icon");
          if (icon) {
            gsap.set(icon, { scale: 0.6, rotation: -8, opacity: 0 });
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.6)",
              delay: index * 0.12 + 0.15,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                once: true,
              },
            });
          }
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="founding-beliefs-heading"
      className={`relative py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Soft background + techy pattern */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0) 70%)," +
            "radial-gradient(40% 40% at 80% 80%, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0) 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.25) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-100 shadow-sm mb-6">
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Our Philosophy
            </span>
          </div>

          <h2
            id="founding-beliefs-heading"
            className="font-bold text-gray-900 mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            What We Believe
          </h2>

          <p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            style={{
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            The core principles that drive everything we do
          </p>
        </div>

        {/* Beliefs Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {beliefs.map((belief, index) => (
            <div key={index} className="belief-card group relative">
              <div className="relative h-full p-8 rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: belief.iconBg }}
                />

                {/* Content */}
                <h3
                  className="font-bold text-gray-900 mb-3"
                  style={{
                    fontSize: "clamp(1.2rem, 2.3vw, 1.5rem)",
                    fontFamily: typography.fonts.heading,
                    lineHeight: typography.lineHeights.snug,
                  }}
                >
                  {belief.title}
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontSize: "1rem",
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  {belief.description}
                </p>

                {/* Bottom meta */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-0.5 rounded-full"
                      style={{ background: belief.iconBg }}
                    />
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: belief.iconBg }}
                    >
                      Core Value
                    </span>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(60% 60% at 50% 0%, ${belief.iconBg}12, transparent 70%)`,
                  }}
                  aria-hidden
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
