"use client";

import { useRef } from "react";
import { colors, typography } from "@/lib/design-system";
import Image from "next/image";

interface ProgramMetric {
  value: string;
  label: string;
}

interface ProgramEnterprise {
  name: string;
  logo: string;
}

interface ProgramCard {
  name: string;
  fundingSource: string;
  fundingAmount: string;
  overview: string;
  metrics: ProgramMetric[];
  enterprises: ProgramEnterprise[];
  accentColor: string;
}

interface ProgramsShowcaseSectionProps {
  className?: string;
}

const programs: ProgramCard[] = [
  {
    name: "GreenBiz Programme",
    fundingSource: "DANIDA",
    fundingAmount: "$10M",
    overview:
      "Supporting green businesses to scale climate solutions across Kenya through innovative financing, capacity building, and market access.",
    metrics: [
      { value: "150", label: "Enterprises Supported" },
      { value: "$20M", label: "Capital Mobilized" },
      { value: "3,000", label: "Jobs Created" },
    ],
    enterprises: [
      { name: "Totosci", logo: "/images/enterprises/totosci.png" },
      { name: "Mister Bee", logo: "/images/enterprises/mister-bee.png" },
      { name: "Gare Holdings", logo: "/images/enterprises/gare.png" },
      { name: "Nawascoal", logo: "/images/enterprises/nawascoal.png" },
    ],
    accentColor: colors.primary.green.DEFAULT,
  },
  {
    name: "AgriBiz Programme",
    fundingSource: "EU & DANIDA",
    fundingAmount: "€18.9M",
    overview:
      "Transforming agriculture through climate-smart innovations, establishing regional hubs, and empowering agri-entrepreneurs across East Africa.",
    metrics: [
      { value: "8", label: "Innovation Hubs" },
      { value: "2,100", label: "Enterprises Supported" },
      { value: "19,000", label: "Jobs Created" },
    ],
    enterprises: [
      { name: "Kimplanter", logo: "/images/enterprises/kimplanter.png" },
      { name: "Apiculture Ventures", logo: "/images/enterprises/apiculture.png" },
      { name: "Irri-Hub", logo: "/images/enterprises/irri-hub.png" },
      { name: "Onion Doctor", logo: "/images/enterprises/onion-doctor.png" },
    ],
    accentColor: colors.primary.blue.DEFAULT,
  },
  {
    name: "PUSE Programme",
    fundingSource: "Mott Foundation",
    fundingAmount: "$350K",
    overview:
      "Promoting urban sustainability through support for SMEs developing innovative solutions for waste management, energy, and water in urban settings.",
    metrics: [
      { value: "30", label: "SMEs Supported" },
      { value: "261", label: "Jobs Created" },
      { value: "18,221", label: "Customers Reached" },
    ],
    enterprises: [
      { name: "Techwin", logo: "/images/enterprises/techwin.png" },
      { name: "Sun Box Solar", logo: "/images/enterprises/sunbox.png" },
      { name: "Aquacom", logo: "/images/enterprises/aquacom.png" },
      { name: "Umami Mushrooms", logo: "/images/enterprises/umami.png" },
    ],
    accentColor: colors.primary.green.DEFAULT,
  },
  {
    name: "SWIFT Programme",
    fundingSource: "IKEA Foundation",
    fundingAmount: "$5.1M",
    overview:
      "Scaling waste innovation for transformation through circular economy solutions, supporting enterprises that turn waste into valuable resources.",
    metrics: [
      { value: "57", label: "Enterprises Supported" },
      { value: "5", label: "Counties with Policy" },
      { value: "2,500+", label: "Tonnes Waste Diverted" },
    ],
    enterprises: [
      { name: "Gjenge Makers", logo: "/images/enterprises/gjenge.png" },
      { name: "Polyafric", logo: "/images/enterprises/polyafric.png" },
      { name: "M-taka", logo: "/images/enterprises/mtaka.png" },
      { name: "Baus Taka", logo: "/images/enterprises/baus-taka.png" },
    ],
    accentColor: colors.primary.blue.DEFAULT,
  },
];

/**
 * Programs Showcase Section
 * Highlights flagship programs with key metrics and success stories
 * Requirements: 1.8, 7.8, 9.4, 6.4
 */
export default function ProgramsShowcase({
  className = "",
}: ProgramsShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="programs-showcase-heading"
      className={`relative py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, rgba(0,173,221,0.04) 0%, rgba(0,173,221,0) 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <h2
            id="programs-showcase-heading"
            className="font-bold text-foreground mb-4"
            style={{
              fontSize: "clamp(1.875rem, 5vw, 3rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              letterSpacing: "-0.02em",
            }}
          >
            Our Programmes
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto mb-6"
            style={{ background: colors.primary.green.DEFAULT }}
            aria-hidden
          />
          <p
            className="text-foreground/80 max-w-3xl mx-auto"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Flagship initiatives driving climate innovation and entrepreneurship
            across East Africa
          </p>
        </div>

        {/* Program Cards - Alternating Layout */}
        <div className="space-y-16 sm:space-y-24">
          {programs.map((program, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                {/* Image Side (50%) */}
                <div className="w-full lg:w-1/2">
                  <div
                    className="relative rounded-2xl overflow-hidden group"
                    style={{
                      aspectRatio: "4/3",
                      background: `linear-gradient(135deg, ${program.accentColor}20, ${program.accentColor}40)`,
                    }}
                  >
                    {/* Placeholder for program image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="text-center p-8"
                        style={{ color: program.accentColor }}
                      >
                        <div
                          className="font-bold mb-2"
                          style={{
                            fontSize: "clamp(1.5rem, 3vw, 2rem)",
                            fontFamily: typography.fonts.heading,
                          }}
                        >
                          {program.name}
                        </div>
                        <div
                          className="opacity-70"
                          style={{
                            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                            fontFamily: typography.fonts.body,
                          }}
                        >
                          Program Visual
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side (50%) */}
                <div className="w-full lg:w-1/2">
                  {/* Glass morphism card */}
                  <div
                    className="relative p-6 sm:p-8 rounded-2xl"
                    style={{
                      background: "hsl(var(--card))",
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${program.accentColor}20`,
                      borderRadius: "16px",
                    }}
                  >
                    {/* Program Name */}
                    <h3
                      className="font-bold mb-2"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        fontFamily: typography.fonts.heading,
                        lineHeight: typography.lineHeights.snug,
                        color: program.accentColor,
                      }}
                    >
                      {program.name}
                    </h3>

                    {/* Funding Info */}
                    <p
                      className="text-foreground/60 mb-4"
                      style={{
                        fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                        fontFamily: typography.fonts.body,
                        fontWeight: 500,
                      }}
                    >
                      Funded by {program.fundingSource} • {program.fundingAmount}
                    </p>

                    {/* Overview */}
                    <p
                      className="text-foreground/80 mb-6"
                      style={{
                        fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
                        fontFamily: typography.fonts.body,
                        lineHeight: typography.lineHeights.relaxed,
                      }}
                    >
                      {program.overview}
                    </p>

                    {/* Metrics Grid (3 columns) */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {program.metrics.map((metric, metricIndex) => (
                        <div
                          key={metricIndex}
                          className="text-center p-3 rounded-xl"
                          style={{
                            background: `${program.accentColor}10`,
                            border: `1px solid ${program.accentColor}20`,
                          }}
                        >
                          <div
                            className="font-bold mb-1"
                            style={{
                              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                              fontFamily: typography.fonts.heading,
                              lineHeight: typography.lineHeights.tight,
                              color: program.accentColor,
                            }}
                          >
                            {metric.value}
                          </div>
                          <div
                            className="text-foreground/70"
                            style={{
                              fontSize: "clamp(0.6875rem, 1.2vw, 0.875rem)",
                              fontFamily: typography.fonts.body,
                              fontWeight: 500,
                              lineHeight: typography.lineHeights.snug,
                            }}
                          >
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Enterprise Logos Row */}
                    <div className="pt-6 border-t border-border">
                      <p
                        className="text-foreground/60 text-sm mb-3"
                        style={{
                          fontFamily: typography.fonts.body,
                          fontWeight: 500,
                        }}
                      >
                        Featured Enterprises
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {program.enterprises.map((enterprise, entIndex) => (
                          <div
                            key={entIndex}
                            className="group/logo relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 hover:scale-110"
                            style={{
                              background: `${program.accentColor}10`,
                              border: `1px solid ${program.accentColor}20`,
                            }}
                            title={enterprise.name}
                          >
                            {/* Placeholder for enterprise logo */}
                            <div className="absolute inset-0 flex items-center justify-center grayscale group-hover/logo:grayscale-0 transition-all duration-300">
                              <span
                                className="text-xs font-semibold text-center px-1"
                                style={{
                                  color: program.accentColor,
                                  fontFamily: typography.fonts.body,
                                }}
                              >
                                {enterprise.name.substring(0, 4)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Accent glow effect on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                      style={{
                        background: `radial-gradient(circle at center, ${program.accentColor}15, transparent 70%)`,
                        filter: "blur(20px)",
                      }}
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
