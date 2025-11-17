"use client";

import { useRef } from "react";
import Image from "next/image";
import { colors, typography } from "@/lib/design-system";

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
  image: string;
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
    image: "/images/programmes/greenbiz.jpg",
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
    image: "/images/programmes/biz.jpg",
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
    image: "/images/programmes/puse.jpg",
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
    image: "/images/programmes/swift.jpg",
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

        {/* Program Cards - Simple vertical layout (image on top) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.name}
              className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md"
              style={{ borderColor: `${program.accentColor}33` }}
            >
              {/* Program image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                <h3
                  className="text-base sm:text-lg font-semibold text-foreground"
                  style={{
                    fontFamily: typography.fonts.heading,
                    lineHeight: typography.lineHeights.snug,
                  }}
                >
                  {program.name}
                </h3>
                <p
                  className="text-xs sm:text-sm text-foreground/60"
                  style={{
                    fontFamily: typography.fonts.body,
                    fontWeight: 500,
                  }}
                >
                  Funded by {program.fundingSource} - {program.fundingAmount}
                </p>
                <p
                  className="mt-1 text-sm text-foreground/80 line-clamp-4"
                  style={{
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  {program.overview}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
