"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import {
  FaSolarPanel,
  FaRecycle,
  FaCar,
  FaTree,
  FaDroplet,
  FaSeedling,
  FaNetworkWired,
} from "react-icons/fa6";

interface SectorCard {
  title: string;
  description: string;
  items: string[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
}

interface KeySectorsSectionProps {
  className?: string;
}

const sectors: SectorCard[] = [
  {
    title: "Renewable Energy",
    description: "Clean energy solutions for sustainable power generation",
    items: ["Solar", "Mini-grids", "Clean cooking", "Bioenergy"],
    icon: FaSolarPanel,
    accentColor: "#FFA500", // climate-yellow
  },
  {
    title: "Circular Economy",
    description: "Waste reduction and resource optimization",
    items: ["Waste management", "Recycling", "Green manufacturing"],
    icon: FaRecycle,
    accentColor: colors.primary.green.DEFAULT,
  },
  {
    title: "Mobility",
    description: "Sustainable transportation solutions",
    items: ["E-mobility", "Sustainable transport", "MaaS"],
    icon: FaCar,
    accentColor: colors.primary.blue.DEFAULT,
  },
  {
    title: "Nature Based Solutions",
    description: "Ecosystem restoration and conservation",
    items: ["Ecosystem restoration", "Agroforestry", "Carbon credits"],
    icon: FaTree,
    accentColor: "#2D5016", // climate-forest (darker green)
  },
  {
    title: "Water",
    description: "Water resource management and conservation",
    items: ["Harvesting", "Recycling", "WASH", "Smart irrigation"],
    icon: FaDroplet,
    accentColor: "#006885", // climate-ocean (darker blue)
  },
  {
    title: "Agriculture",
    description: "Climate-smart agricultural practices",
    items: ["Climate-smart agriculture", "Agribusiness", "Agri-tech"],
    icon: FaSeedling,
    accentColor: "#66A02D", // climate-earth (earthy green)
  },
  {
    title: "Cross-Cutting",
    description: "Enabling ecosystem development",
    items: ["Policy", "Finance", "Innovation ecosystem"],
    icon: FaNetworkWired,
    accentColor: colors.primary.blue.DEFAULT,
  },
];

/**
 * Key Sectors Section
 * Demonstrates breadth of impact across seven climate sectors
 * Requirements: 1.7, 7.7, 5.2, 6.1, 6.3, 9.2
 */
export default function KeySectors({
  className = "",
}: KeySectorsSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll-triggered fade-in-up for visible cards
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 65%",
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
      aria-labelledby="key-sectors-heading"
      className={`relative min-h-screen flex items-center py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Neutral background with subtle pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, rgba(139,141,144,0.03) 0%, rgba(139,141,144,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="key-sectors-heading"
            className="font-bold text-foreground mb-4"
            style={{
              fontSize: "clamp(1.875rem, 5vw, 3rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              letterSpacing: "-0.02em",
            }}
          >
            Key Sectors & Themes
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto"
            style={{ background: colors.primary.green.DEFAULT }}
            aria-hidden
          />
        </div>

        {/* Responsive layout: horizontal scroll on mobile, grid on tablet/desktop */}
        {/* Mobile: horizontal scroll with scroll-snap */}
        <div className="md:hidden">
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {sectors.map((sector, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="group relative shrink-0 snap-center rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  width: "280px",
                  borderColor: "hsl(var(--border))",
                  borderWidth: "1px",
                  borderRadius: "12px",
                  background: "hsl(var(--card))",
                  padding: "1.5rem",
                }}
              >
                {/* Icon with colored background (48x48px) */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${sector.accentColor}20`,
                  }}
                >
                  <sector.icon
                    className="w-6 h-6"
                    style={{ color: sector.accentColor }}
                    aria-hidden
                  />
                </div>

                {/* Sector title */}
                <h3
                  className="font-semibold text-foreground mb-2"
                  style={{
                    fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                    fontFamily: typography.fonts.heading,
                    lineHeight: typography.lineHeights.snug,
                  }}
                >
                  {sector.title}
                </h3>

                {/* Sector description */}
                <p
                  className="text-foreground/60 mb-3"
                  style={{
                    fontSize: "clamp(0.8125rem, 1.1vw, 0.875rem)",
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.normal,
                  }}
                >
                  {sector.description}
                </p>

                {/* Items list */}
                <ul className="space-y-1.5">
                  {sector.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start text-foreground/70"
                      style={{
                        fontSize: "clamp(0.75rem, 1vw, 0.8125rem)",
                        fontFamily: typography.fonts.body,
                        lineHeight: typography.lineHeights.normal,
                      }}
                    >
                      <span
                        className="inline-block w-1 h-1 rounded-full mt-1.5 mr-2 shrink-0"
                        style={{ background: sector.accentColor }}
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover glow effect with accent color */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(circle at center, ${sector.accentColor}20, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tablet: 3-column grid */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <div
              key={index}
              ref={(el) => {
                if (!cardRefs.current[index]) {
                  cardRefs.current[index] = el;
                }
              }}
              className="group relative rounded-xl border transition-all duration-300 hover:scale-105"
              style={{
                borderColor: "hsl(var(--border))",
                borderWidth: "1px",
                borderRadius: "12px",
                background: "hsl(var(--card))",
                padding: "1.5rem",
              }}
            >
              {/* Icon with colored background (48x48px) */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${sector.accentColor}20`,
                }}
              >
                <sector.icon
                  className="w-6 h-6"
                  style={{ color: sector.accentColor }}
                  aria-hidden
                />
              </div>

              {/* Sector title */}
              <h3
                className="font-semibold text-foreground mb-2"
                style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                  fontFamily: typography.fonts.heading,
                  lineHeight: typography.lineHeights.snug,
                }}
              >
                {sector.title}
              </h3>

              {/* Sector description */}
              <p
                className="text-foreground/60 mb-3"
                style={{
                  fontSize: "clamp(0.8125rem, 1.1vw, 0.875rem)",
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.normal,
                }}
              >
                {sector.description}
              </p>

              {/* Items list */}
              <ul className="space-y-1.5">
                {sector.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start text-foreground/70"
                    style={{
                      fontSize: "clamp(0.75rem, 1vw, 0.8125rem)",
                      fontFamily: typography.fonts.body,
                      lineHeight: typography.lineHeights.normal,
                    }}
                  >
                    <span
                      className="inline-block w-1 h-1 rounded-full mt-1.5 mr-2 shrink-0"
                      style={{ background: sector.accentColor }}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Hover glow effect with accent color */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${sector.accentColor}20, transparent 70%)`,
                  filter: "blur(20px)",
                }}
                aria-hidden
              />
            </div>
          ))}
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <div
              key={index}
              ref={(el) => {
                if (!cardRefs.current[index]) {
                  cardRefs.current[index] = el;
                }
              }}
              className="group relative rounded-xl border transition-all duration-300 hover:scale-105"
              style={{
                borderColor: "hsl(var(--border))",
                borderWidth: "1px",
                borderRadius: "12px",
                background: "hsl(var(--card))",
                padding: "1.5rem",
              }}
            >
              {/* Icon with colored background (48x48px) */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${sector.accentColor}20`,
                }}
              >
                <sector.icon
                  className="w-6 h-6"
                  style={{ color: sector.accentColor }}
                  aria-hidden
                />
              </div>

              {/* Sector title */}
              <h3
                className="font-semibold text-foreground mb-2"
                style={{
                  fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                  fontFamily: typography.fonts.heading,
                  lineHeight: typography.lineHeights.snug,
                }}
              >
                {sector.title}
              </h3>

              {/* Sector description */}
              <p
                className="text-foreground/60 mb-3"
                style={{
                  fontSize: "clamp(0.8125rem, 1.1vw, 0.875rem)",
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.normal,
                }}
              >
                {sector.description}
              </p>

              {/* Items list */}
              <ul className="space-y-1.5">
                {sector.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start text-foreground/70"
                    style={{
                      fontSize: "clamp(0.75rem, 1vw, 0.8125rem)",
                      fontFamily: typography.fonts.body,
                      lineHeight: typography.lineHeights.normal,
                    }}
                  >
                    <span
                      className="inline-block w-1 h-1 rounded-full mt-1.5 mr-2 shrink-0"
                      style={{ background: sector.accentColor }}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Hover glow effect with accent color */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${sector.accentColor}20, transparent 70%)`,
                  filter: "blur(20px)",
                }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar globally for this section */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
