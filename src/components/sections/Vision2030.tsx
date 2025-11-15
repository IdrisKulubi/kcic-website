"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { Target, Network, Lightbulb, TrendingUp } from "lucide-react";

interface StrategicPillar {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface Vision2030SectionProps {
  className?: string;
}

const strategicPillars: StrategicPillar[] = [
  {
    title: "Proven Track Record",
    description: "10+ years delivering results across Kenya, Uganda, and Tanzania with measurable impact on climate entrepreneurship",
    icon: Target,
  },
  {
    title: "Strong Brand & Network",
    description: "Trailblazer in African climate space with established partnerships across government, private sector, and development organizations",
    icon: Network,
  },
  {
    title: "Integrated ICEE Model",
    description: "Systems approach addressing barriers through Innovation, Capacity, Enabling Environment, and Ecosystem development",
    icon: Lightbulb,
  },
  {
    title: "Scalable Approach",
    description: "Regional expansion pathway with proven methodologies that can be replicated across African markets",
    icon: TrendingUp,
  },
];

/**
 * Vision 2030 Section
 * Inspires visitors with KCIC's strategic direction and ecosystem approach
 * Requirements: 1.10, 7.10, 9.1, 6.4
 */
export default function Vision2030({
  className = "",
}: Vision2030SectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const subheadingRef = useRef<HTMLParagraphElement | null>(null);
  const diagramRef = useRef<HTMLDivElement | null>(null);
  const iceeComponentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade-in for subheading
      if (subheadingRef.current) {
        gsap.fromTo(
          subheadingRef.current,
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

      // Animated ICEE diagram with sequential fade-in for components
      iceeComponentRefs.current.forEach((component, index) => {
        if (component) {
          gsap.fromTo(
            component,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.2)",
              delay: index * 0.2, // Sequential fade-in
              scrollTrigger: {
                trigger: diagramRef.current,
                start: "top 70%",
                end: "top 50%",
                once: true,
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      // Scroll-triggered fade-in-scale for pillar cards
      pillarRefs.current.forEach((pillar, index) => {
        if (pillar) {
          gsap.fromTo(
            pillar,
            { opacity: 0, scale: 0.95, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "top 40%",
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
      aria-labelledby="vision-2030-heading"
      className={`relative min-h-screen flex items-center py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Subtle background gradient shift to climate-blue */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, rgba(0,173,221,0.08) 0%, rgba(0,173,221,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <h2
            id="vision-2030-heading"
            className="font-bold text-foreground mb-4"
            style={{
              fontSize: "clamp(1.875rem, 5vw, 3rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              letterSpacing: "-0.02em",
            }}
          >
            Vision 2030
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto mb-6"
            style={{ background: colors.primary.blue.DEFAULT }}
            aria-hidden
          />
          <p
            ref={subheadingRef}
            className="font-semibold"
            style={{
              fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.snug,
              color: colors.primary.blue.DEFAULT,
            }}
          >
            A Thriving Climate Entrepreneurship Ecosystem in Africa
          </p>
        </div>

        {/* ICEE Model Diagram */}
        <div
          ref={diagramRef}
          className="mb-20 sm:mb-24"
          role="img"
          aria-label="ICEE Model diagram showing Innovation, Capacity, Enabling Environment, and Ecosystem components"
        >
          <div className="max-w-4xl mx-auto">
            {/* Diagram Container */}
            <div className="relative">
              {/* Center Circle - ICEE Model */}
              <div className="flex items-center justify-center mb-12">
                <div
                  className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary.blue.DEFAULT}20, ${colors.primary.green.DEFAULT}20)`,
                    border: `3px solid ${colors.primary.blue.DEFAULT}`,
                  }}
                >
                  <div className="text-center">
                    <p
                      className="font-bold"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        fontFamily: typography.fonts.heading,
                        color: colors.primary.blue.DEFAULT,
                      }}
                    >
                      ICEE
                    </p>
                    <p
                      className="text-foreground/70 mt-1"
                      style={{
                        fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
                        fontFamily: typography.fonts.body,
                      }}
                    >
                      Model
                    </p>
                  </div>
                </div>
              </div>

              {/* Four ICEE Components in 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    title: "Innovation",
                    description: "Fostering breakthrough climate technologies and business models",
                    color: colors.primary.green.DEFAULT,
                  },
                  {
                    title: "Capacity",
                    description: "Building skills and knowledge for sustainable entrepreneurship",
                    color: colors.primary.blue.DEFAULT,
                  },
                  {
                    title: "Enabling Environment",
                    description: "Creating supportive policies and infrastructure",
                    color: colors.primary.green.DEFAULT,
                  },
                  {
                    title: "Ecosystem",
                    description: "Connecting stakeholders for collaborative impact",
                    color: colors.primary.blue.DEFAULT,
                  },
                ].map((component, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      iceeComponentRefs.current[index] = el;
                    }}
                    className="relative p-6 rounded-xl text-center"
                    style={{
                      background: "hsl(var(--card))",
                      border: `2px solid ${component.color}40`,
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-3"
                      style={{ background: component.color }}
                      aria-hidden
                    />
                    <h3
                      className="font-semibold mb-2"
                      style={{
                        fontSize: "clamp(1rem, 2vw, 1.25rem)",
                        fontFamily: typography.fonts.heading,
                        color: component.color,
                      }}
                    >
                      {component.title}
                    </h3>
                    <p
                      className="text-foreground/70"
                      style={{
                        fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)",
                        fontFamily: typography.fonts.body,
                        lineHeight: typography.lineHeights.relaxed,
                      }}
                    >
                      {component.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Pillars Section */}
        <div>
          <h3
            className="text-center font-bold text-foreground mb-12"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.snug,
            }}
          >
            Strategic Pillars
          </h3>

          {/* 2x2 grid for strategic pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {strategicPillars.map((pillar, index) => (
              <div
                key={index}
                ref={(el) => {
                  pillarRefs.current[index] = el;
                }}
                className="group relative rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  padding: "2rem",
                  background: "hsl(var(--card))",
                  backdropFilter: "blur(12px)",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "16px",
                }}
              >
                {/* Icon with climate-blue accent */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${colors.primary.blue.DEFAULT}15`,
                  }}
                >
                  <pillar.icon
                    className="w-7 h-7"
                    style={{ color: colors.primary.blue.DEFAULT }}
                    aria-hidden
                  />
                </div>

                {/* Pillar heading */}
                <h4
                  className="font-semibold text-foreground mb-3"
                  style={{
                    fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                    fontFamily: typography.fonts.heading,
                    lineHeight: typography.lineHeights.snug,
                  }}
                >
                  {pillar.title}
                </h4>

                {/* Pillar description */}
                <p
                  className="text-foreground/80"
                  style={{
                    fontSize: "clamp(0.9375rem, 1.2vw, 1rem)",
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  {pillar.description}
                </p>

                {/* Hover glow effect with climate-blue */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(circle at center, ${colors.primary.blue.DEFAULT}15, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
