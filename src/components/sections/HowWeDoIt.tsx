"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { DollarSign, GraduationCap, Database, Building2 } from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  services: string[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  gradientColor: string;
}

interface HowWeDoItSectionProps {
  className?: string;
}

const services: ServiceCard[] = [
  {
    title: "Innovative Financing",
    description: "Providing diverse financial solutions to support climate entrepreneurs at every stage",
    services: [
      "Risk capital for early-stage ventures",
      "Proof of concept funding",
      "Early-stage financing",
      "Revenue-based financing (RBF)",
      "Investment syndication",
    ],
    icon: DollarSign,
    gradientColor: colors.primary.green.DEFAULT,
  },
  {
    title: "Capacity Building",
    description: "Empowering entrepreneurs with knowledge and skills for sustainable growth",
    services: [
      "Business development training",
      "Technical skills training",
      "Advisory services",
      "Mentorship programs",
      "Leadership development",
    ],
    icon: GraduationCap,
    gradientColor: colors.primary.blue.DEFAULT,
  },
  {
    title: "Access to Information",
    description: "Connecting entrepreneurs with critical data and market intelligence",
    services: [
      "Technology data and trends",
      "Market intelligence",
      "Finance information",
      "Industry insights",
      "Best practices sharing",
    ],
    icon: Database,
    gradientColor: colors.primary.green.DEFAULT,
  },
  {
    title: "Enabling Environment",
    description: "Creating supportive ecosystems for climate innovation to thrive",
    services: [
      "Policy advocacy and support",
      "Facilities and infrastructure access",
      "Regional outreach programs",
      "Partnership facilitation",
      "Ecosystem development",
    ],
    icon: Building2,
    gradientColor: colors.primary.blue.DEFAULT,
  },
];

/**
 * How We Do It Section
 * Showcases service offerings and support mechanisms
 * Requirements: 1.6, 7.6, 5.4, 9.2, 6.4
 */
export default function HowWeDoIt({
  className = "",
}: HowWeDoItSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade-in for intro text
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
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

      // Scroll-triggered fade-in-scale for cards with staggered delays (0ms, 100ms, 200ms, 300ms)
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.95, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
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
      aria-labelledby="how-we-do-it-heading"
      className={`relative min-h-screen flex items-center py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Subtle background gradient shift to climate-green */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, rgba(127,209,52,0.06) 0%, rgba(127,209,52,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="how-we-do-it-heading"
            className="font-bold text-foreground mb-4"
            style={{
              fontSize: "clamp(1.875rem, 5vw, 3rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              letterSpacing: "-0.02em",
            }}
          >
            How We Do It
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto mb-6"
            style={{ background: colors.primary.green.DEFAULT }}
            aria-hidden
          />
          <p
            ref={introRef}
            className="text-foreground/80 max-w-3xl mx-auto"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Holistic, country-driven support to accelerate climate technologies
          </p>
        </div>

        {/* 2x2 grid layout (single column on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
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
              {/* Gradient background circle (64x64px) with icon */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${service.gradientColor}20, ${service.gradientColor}40)`,
                }}
              >
                <service.icon
                  className="w-8 h-8"
                  style={{ color: service.gradientColor }}
                  aria-hidden
                />
              </div>

              {/* Service heading (1.5rem, climate-green) */}
              <h3
                className="font-semibold mb-3"
                style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                  fontFamily: typography.fonts.heading,
                  lineHeight: typography.lineHeights.snug,
                  color: colors.primary.green.DEFAULT,
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-foreground/70 mb-4"
                style={{
                  fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                {service.description}
              </p>

              {/* Bullet list with custom climate-green bullets */}
              <ul className="space-y-2">
                {service.services.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start text-foreground/80"
                    style={{
                      fontSize: "clamp(0.8125rem, 1.1vw, 0.9375rem)",
                      fontFamily: typography.fonts.body,
                      lineHeight: typography.lineHeights.relaxed,
                    }}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mt-2 mr-3 shrink-0"
                      style={{ background: colors.primary.green.DEFAULT }}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${service.gradientColor}15, transparent 70%)`,
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
