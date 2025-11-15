"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { Lightbulb, Rocket, Shield } from "lucide-react";

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
    icon: Rocket,
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered fade-in-up animations for cards (0ms, 150ms, 300ms delays)
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
              delay: index * 0.15, // 150ms stagger
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
      aria-labelledby="founding-beliefs-heading"
      className={`relative min-h-screen flex items-center py-20 sm:py-28 overflow-hidden ${className}`}
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
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              style={{
                borderColor: "hsl(var(--border))",
                borderWidth: "1px",
                borderRadius: "16px",
                background: "hsl(var(--card))",
              }}
            >
              {/* Icon at top (48x48px, climate-green) */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
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
