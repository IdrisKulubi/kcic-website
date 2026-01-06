"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { Lightbulb, RocketLaunch, Shield } from "@phosphor-icons/react";

interface BeliefCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface FoundingBeliefsSectionProps {
  className?: string;
}

const beliefs: BeliefCard[] = [
  {
    title: "Challenges as Opportunities",
    description: "No challenge is too big, not even climate change. We see every obstacle as a chance to innovate and create lasting solutions.",
    icon: Lightbulb,
  },
  {
    title: "Innovation Meets Entrepreneurship",
    description: "Climate action and economic prosperity go hand in hand. We bridge the gap between environmental impact and business success.",
    icon: RocketLaunch,
  },
  {
    title: "SMEs as Warriors",
    description: "Small and medium enterprises are frontline fighters innovating sustainable practices that transform communities and economies.",
    icon: Shield,
  },
];

/**
 * Founding Beliefs Section
 * Connects emotionally with visitors through core values and philosophy
 * Requirements: 1.4, 7.4, 5.5, 9.2, 6.4
 */
export default function FoundingBeliefs({
  className = "",
}: FoundingBeliefsSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);

  // Note: cards are now selected via class name for better reliability with GSAP

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Use class selector for reliability in React
      const cards = sectionRef.current?.querySelectorAll('.belief-card');

      if (cards && cards.length > 0) {
        cards.forEach((card, index) => {
          // First card from left, second from bottom, third from right
          let fromX = 0;
          let fromY = 0;
          let rotation = 0;

          if (index === 0) {
            fromX = -100; // Left
            rotation = -5;
          } else if (index === 1) {
            fromY = 60; // Bottom
            rotation = 0;
          } else {
            fromX = 100; // Right
            rotation = 5;
          }

          // Important: Set initial state immediately to avoid flash or non-animation
          gsap.set(card, {
            opacity: 0,
            x: fromX,
            y: fromY,
            scale: 0.9,
            rotateY: rotation,
          });

          gsap.to(card, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.2, // Staggered start
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%", // Triggers when top of section hits 75% down viewport
              once: true,
              toggleActions: "play none none none",
            },
          });

          // Animate icon with bouncy pop-in
          const icon = card.querySelector('.belief-icon');
          if (icon) {
            gsap.set(icon, { scale: 0, rotation: -180 });

            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              delay: index * 0.2 + 0.3,
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
      className={`relative py-16 sm:py-20 overflow-hidden ${className}`}
    >
      {/* Subtle background gradient shift to climate-blue */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, rgba(0,173,221,0.05) 0%, rgba(0,173,221,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <h2
            id="founding-beliefs-heading"
            className="font-bold text-foreground mb-4"
            style={{
              fontSize: "clamp(1.875rem, 5vw, 3rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              letterSpacing: "-0.02em",
            }}
          >
            What We Believe
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto"
            style={{ background: colors.primary.green.DEFAULT }}
            aria-hidden
          />
        </div>

        {/* Three-column grid (single column on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beliefs.map((belief, index) => (
            <div
              key={index}
              className="belief-card group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              style={{
                borderColor: "hsl(var(--border))",
                borderWidth: "1px",
                borderRadius: "16px",
                background: "hsl(var(--card))",
              }}
            >
              {/* Icon at top (48x48px, climate-green) */}
              <div
                className="belief-icon w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${colors.primary.green.DEFAULT}15`,
                }}
              >
                <belief.icon
                  className="w-6 h-6"
                  style={{ color: colors.primary.green.DEFAULT }}
                  aria-hidden
                />
              </div>

              {/* Card heading */}
              <h3
                className="font-semibold text-foreground mb-4"
                style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                  fontFamily: typography.fonts.heading,
                  lineHeight: typography.lineHeights.snug,
                }}
              >
                {belief.title}
              </h3>

              {/* Card description */}
              <p
                className="text-foreground/80"
                style={{
                  fontSize: "clamp(0.9375rem, 1.2vw, 1rem)",
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                {belief.description}
              </p>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${colors.primary.green.DEFAULT}10, transparent 70%)`,
                  filter: "blur(20px)",
                }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
