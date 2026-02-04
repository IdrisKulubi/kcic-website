"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectorData {
  title: string;
  description: string;
  items: string[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
}

interface KeySectorsParallaxProps {
  className?: string;
}

const sectors: SectorData[] = [
  {
    title: "Renewable Energy",
    description: "Clean energy solutions for sustainable power generation across Kenya and East Africa",
    items: ["Solar Power Systems", "Mini-grid Solutions", "Clean Cooking Technologies", "Bioenergy Production"],
    icon: FaSolarPanel,
    accentColor: "#F59E0B",
  },
  {
    title: "Circular Economy",
    description: "Waste reduction and resource optimization for a sustainable future",
    items: ["Waste Management", "Industrial Recycling", "Green Manufacturing", "Upcycling Solutions"],
    icon: FaRecycle,
    accentColor: colors.primary.green.DEFAULT,
  },
  {
    title: "Mobility",
    description: "Sustainable transportation solutions transforming urban movement",
    items: ["E-mobility Platforms", "Sustainable Transport", "Mobility as a Service", "EV Infrastructure"],
    icon: FaCar,
    accentColor: colors.primary.blue.DEFAULT,
  },
  {
    title: "Nature Based Solutions",
    description: "Ecosystem restoration and conservation protecting our natural heritage",
    items: ["Ecosystem Restoration", "Agroforestry Programs", "Carbon Credit Projects", "Biodiversity Conservation"],
    icon: FaTree,
    accentColor: "#166534",
  },
  {
    title: "Water",
    description: "Water resource management ensuring access to clean water for all",
    items: ["Water Harvesting", "Water Recycling", "WASH Programs", "Smart Irrigation"],
    icon: FaDroplet,
    accentColor: "#0891B2",
  },
  {
    title: "Agriculture",
    description: "Climate-smart agricultural practices feeding the future sustainably",
    items: ["Climate-smart Agriculture", "Agribusiness Innovation", "Agri-tech Solutions", "Sustainable Farming"],
    icon: FaSeedling,
    accentColor: "#65A30D",
  },
  {
    title: "Cross-Cutting",
    description: "Enabling ecosystem development through policy and innovation",
    items: ["Policy Advocacy", "Impact Finance", "Innovation Ecosystem", "Capacity Building"],
    icon: FaNetworkWired,
    accentColor: "#7C3AED",
  },
];

export default function KeySectorsParallax({
  className = "",
}: KeySectorsParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Compact scroll distance: ~200px per sector
      const scrollDistance = sectors.length * 200;
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: contentRef.current,
        pinSpacing: true,
        scrub: 0.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const sectorIndex = Math.min(
            Math.floor(self.progress * sectors.length),
            sectors.length - 1
          );
          setActiveIndex(sectorIndex);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeSector = sectors[activeIndex];
  const IconComponent = activeSector.icon;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: '100vh' }}
    >
      <div
        ref={contentRef}
        className="h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white"
      >
        {/* Background accent */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${activeSector.accentColor}10 0%, transparent 70%)`,
          }}
        />

        {/* Floating decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -left-32 top-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-700"
            style={{
              background: activeSector.accentColor,
              opacity: 0.15,
            }}
          />
          <div
            className="absolute -right-20 bottom-1/3 w-72 h-72 rounded-full blur-2xl transition-all duration-700"
            style={{
              background: activeSector.accentColor,
              opacity: 0.1,
            }}
          />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-100 shadow-sm mb-4">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Our Focus Areas
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{
                fontFamily: typography.fonts.heading,
                lineHeight: 1.15,
              }}
            >
              Key Sectors We Support
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            {/* Left side - Content */}
            <div className="order-2 lg:order-1">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-sm font-semibold uppercase tracking-wider transition-colors duration-300"
                  style={{ color: activeSector.accentColor }}
                >
                  Focus Sector {activeIndex + 1} of {sectors.length}
                </span>
              </div>

              {/* Sector title - simple CSS transition */}
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 transition-all duration-300"
                style={{
                  fontFamily: typography.fonts.heading,
                  lineHeight: 1.15,
                }}
              >
                {activeSector.title}
              </h3>

              {/* Description */}
              <p
                className="text-base sm:text-lg text-gray-600 mb-6 max-w-lg transition-all duration-300"
                style={{
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                {activeSector.description}
              </p>

              {/* Items list */}
              <ul className="space-y-3 mb-8">
                {activeSector.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 transition-all duration-300"
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300"
                      style={{ background: activeSector.accentColor }}
                    />
                    <span 
                      className="text-gray-700 font-medium text-sm sm:text-base"
                      style={{ fontFamily: typography.fonts.body }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Sector counter */}
              <div className="flex items-center gap-3">
                <span
                  className="text-4xl font-bold transition-colors duration-300"
                  style={{ color: activeSector.accentColor }}
                >
                  0{activeIndex + 1}
                </span>
                <span className="text-gray-300 text-xl">/</span>
                <span className="text-gray-400 text-xl">0{sectors.length}</span>
              </div>
            </div>

            {/* Right side - Icon */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Icon container */}
                <div
                  className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${activeSector.accentColor}20 0%, ${activeSector.accentColor}05 100%)`,
                    border: `2px solid ${activeSector.accentColor}25`,
                  }}
                >
                  <IconComponent
                    className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 transition-colors duration-500"
                    style={{ color: activeSector.accentColor }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator - vertical dots on the right */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20">
          <div className="flex flex-col gap-2">
            {sectors.map((sector, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (containerRef.current) {
                    const containerTop = containerRef.current.offsetTop;
                    const scrollPerSector = window.innerHeight;
                    const targetScroll = containerTop + (scrollPerSector * idx);
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }
                }}
                className="group relative flex items-center justify-end"
                aria-label={`Go to ${sector.title}`}
              >
                <span
                  className="absolute right-full mr-3 whitespace-nowrap text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block"
                  style={{ color: idx === activeIndex ? sector.accentColor : '#9CA3AF' }}
                >
                  {sector.title}
                </span>
                <div
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    background: idx === activeIndex ? sector.accentColor : '#D1D5DB',
                    transform: idx === activeIndex ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Section badge - top center */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-100">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: colors.primary.green.DEFAULT }}
            />
            <span
              className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
              style={{ fontFamily: typography.fonts.heading }}
            >
              Key Sectors & Themes
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-[10px] uppercase tracking-wider">Scroll</span>
            <div className="w-4 h-6 rounded-full border border-gray-300 flex justify-center pt-1">
              <div className="w-0.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
          <div
            className="h-full transition-all duration-200"
            style={{
              width: `${scrollProgress * 100}%`,
              background: activeSector.accentColor,
            }}
          />
        </div>
      </div>
    </div>
  );
}
