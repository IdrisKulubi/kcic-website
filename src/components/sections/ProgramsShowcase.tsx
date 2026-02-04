"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { colors, typography } from "@/lib/design-system";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  slug: string;
  image: string;
  fundingSource: string;
  fundingAmount: string;
  overview: string;
  metrics: ProgramMetric[];
  enterprises: ProgramEnterprise[];
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
}

interface ProgramsShowcaseSectionProps {
  className?: string;
  limit?: number;
  showViewAll?: boolean;
}

const programs: ProgramCard[] = [
  {
    name: "GreenBiz Programme",
    slug: "greenbiz",
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
    gradientFrom: "#80c738",
    gradientTo: "#6ab02e",
  },
  {
    name: "AgriBiz Programme",
    slug: "agribiz",
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
    gradientFrom: "#00aeef",
    gradientTo: "#0095cc",
  },
  {
    name: "PUSE Programme",
    slug: "puse",
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
    gradientFrom: "#f59e0b",
    gradientTo: "#d97706",
  },
  {
    name: "SWIFT Programme",
    slug: "swift",
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
    gradientFrom: "#8b5cf6",
    gradientTo: "#7c3aed",
  },
];

/**
 * Programs Showcase Section
 * Highlights flagship programs with key metrics and success stories
 * Requirements: 1.8, 7.8, 9.4, 6.4
 */
export default function ProgramsShowcase({
  className = "",
  limit = 3,
  showViewAll = true,
}: ProgramsShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);

  // Display limited programs
  const displayedPrograms = programs.slice(0, limit);

  // GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="programs-showcase-heading"
      className={`relative py-20 sm:py-28 overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(128,199,56,0.06) 0%, transparent 70%)," +
            "radial-gradient(40% 40% at 80% 80%, rgba(0,174,239,0.04) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div ref={titleRef} className="text-center mb-16">
          <h2
            id="programs-showcase-heading"
            className="font-bold text-gray-900 mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
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
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            style={{
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Flagship initiatives driving climate innovation and entrepreneurship
            across East Africa
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedPrograms.map((program, index) => (
            <article
              key={program.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image with overlay */}
              <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                <Image
                  src={program.image}
                  alt={program.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  priority={index < 3}
                />
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${program.gradientFrom}, ${program.gradientTo})` 
                  }}
                />
                {/* Dark gradient at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Funding badge */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm"
                    style={{ 
                      background: `linear-gradient(135deg, ${program.gradientFrom}, ${program.gradientTo})` 
                    }}
                  >
                    {program.fundingAmount}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Title and funder */}
                <div className="mb-3">
                  <h3
                    className="text-xl font-bold text-gray-900 mb-1.5 group-hover:text-[#80c738] transition-colors duration-300"
                    style={{
                      fontFamily: typography.fonts.heading,
                      lineHeight: typography.lineHeights.snug,
                    }}
                  >
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Funded by {program.fundingSource}
                  </p>
                </div>

                {/* Overview */}
                <p
                  className="text-gray-600 text-sm line-clamp-2 mb-5 flex-1"
                  style={{
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  {program.overview}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 py-4 border-t border-gray-100">
                  {program.metrics.slice(0, 3).map((metric, idx) => (
                    <div key={idx} className="text-center px-1">
                      <div 
                        className="text-xl font-bold"
                        style={{ color: program.gradientFrom }}
                      >
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <Link
                  href={`/programmes/${program.slug}`}
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:brightness-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${program.gradientFrom}, ${program.gradientTo})` 
                  }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && programs.length > limit && (
          <div className="text-center mt-14">
            <Link
              href="/programmes"
              className="group inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-full hover:border-[#80c738] hover:text-[#80c738] hover:shadow-lg transition-all duration-300"
            >
              View All Programmes
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
