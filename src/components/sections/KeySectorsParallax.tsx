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
  bgGradient: string;
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
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    title: "Circular Economy",
    description: "Waste reduction and resource optimization for a sustainable future",
    items: ["Waste Management", "Industrial Recycling", "Green Manufacturing", "Upcycling Solutions"],
    icon: FaRecycle,
    accentColor: colors.primary.green.DEFAULT,
    bgGradient: "from-green-500/10 via-emerald-500/5 to-transparent",
  },
  {
    title: "Mobility",
    description: "Sustainable transportation solutions transforming urban movement",
    items: ["E-mobility Platforms", "Sustainable Transport", "Mobility as a Service", "EV Infrastructure"],
    icon: FaCar,
    accentColor: colors.primary.blue.DEFAULT,
    bgGradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
  },
  {
    title: "Nature Based Solutions",
    description: "Ecosystem restoration and conservation protecting our natural heritage",
    items: ["Ecosystem Restoration", "Agroforestry Programs", "Carbon Credit Projects", "Biodiversity Conservation"],
    icon: FaTree,
    accentColor: "#166534",
    bgGradient: "from-emerald-600/10 via-green-600/5 to-transparent",
  },
  {
    title: "Water",
    description: "Water resource management ensuring access to clean water for all",
    items: ["Water Harvesting", "Water Recycling", "WASH Programs", "Smart Irrigation"],
    icon: FaDroplet,
    accentColor: "#0891B2",
    bgGradient: "from-cyan-500/10 via-sky-500/5 to-transparent",
  },
  {
    title: "Agriculture",
    description: "Climate-smart agricultural practices feeding the future sustainably",
    items: ["Climate-smart Agriculture", "Agribusiness Innovation", "Agri-tech Solutions", "Sustainable Farming"],
    icon: FaSeedling,
    accentColor: "#65A30D",
    bgGradient: "from-lime-500/10 via-green-500/5 to-transparent",
  },
  {
    title: "Cross-Cutting",
    description: "Enabling ecosystem development through policy and innovation",
    items: ["Policy Advocacy", "Impact Finance", "Innovation Ecosystem", "Capacity Building"],
    icon: FaNetworkWired,
    accentColor: "#7C3AED",
    bgGradient: "from-violet-500/10 via-purple-500/5 to-transparent",
  },
];

export default function KeySectorsParallax({
  className = "",
}: KeySectorsParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      // Main scroll trigger for the entire section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          
          // Calculate which sector we're on
          const sectorIndex = Math.min(
            Math.floor(progress * sectors.length),
            sectors.length - 1
          );
          setActiveIndex(sectorIndex);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeSector = sectors[activeIndex];

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${sectors.length * 100}vh` }}
    >
      {/* Sticky container that stays in view */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${activeSector.accentColor}15 0%, transparent 70%)`,
          }}
        />

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating circle - left */}
          <div
            className="absolute -left-20 top-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-1000"
            style={{
              background: activeSector.accentColor,
              transform: `translateY(${scrollProgress * 100}px) scale(${1 + scrollProgress * 0.2})`,
            }}
          />
          {/* Medium floating circle - right */}
          <div
            className="absolute -right-10 bottom-1/4 w-64 h-64 rounded-full opacity-15 blur-2xl transition-all duration-1000"
            style={{
              background: activeSector.accentColor,
              transform: `translateY(${-scrollProgress * 80}px)`,
            }}
          />
          {/* Small accent dots */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full transition-all duration-500"
              style={{
                background: activeSector.accentColor,
                opacity: 0.3 + (i * 0.1),
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                transform: `translateY(${scrollProgress * (30 + i * 20)}px)`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            {/* Left side - Content */}
            <div className="order-2 lg:order-1">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: activeSector.accentColor }}
                >
                  Focus Sector
                </span>
                <div 
                  className="h-px flex-1 max-w-24"
                  style={{ background: `${activeSector.accentColor}40` }}
                />
              </div>

              {/* Sector title with animation */}
              <h2
                key={activeSector.title}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{
                  fontFamily: typography.fonts.heading,
                  lineHeight: 1.1,
                }}
              >
                {activeSector.title}
              </h2>

              {/* Description */}
              <p
                key={`desc-${activeIndex}`}
                className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100"
                style={{
                  fontFamily: typography.fonts.body,
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                {activeSector.description}
              </p>

              {/* Items list with staggered animation */}
              <ul className="space-y-4">
                {activeSector.items.map((item, idx) => (
                  <li
                    key={`${activeIndex}-${idx}`}
                    className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-500"
                    style={{
                      animationDelay: `${150 + idx * 75}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: activeSector.accentColor }}
                    />
                    <span 
                      className="text-gray-700 font-medium"
                      style={{ fontFamily: typography.fonts.body }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Sector counter */}
              <div className="mt-10 flex items-center gap-4">
                <span
                  className="text-5xl font-bold"
                  style={{ color: activeSector.accentColor }}
                >
                  0{activeIndex + 1}
                </span>
                <span className="text-gray-400 text-2xl">/</span>
                <span className="text-gray-400 text-2xl">0{sectors.length}</span>
              </div>
            </div>

            {/* Right side - Large Icon with animation */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div
                key={`icon-${activeIndex}`}
                className="relative animate-in fade-in zoom-in-95 duration-700"
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{
                    background: activeSector.accentColor,
                    transform: 'scale(1.2)',
                  }}
                />
                {/* Icon container */}
                <div
                  className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${activeSector.accentColor}20 0%, ${activeSector.accentColor}05 100%)`,
                    border: `2px solid ${activeSector.accentColor}30`,
                  }}
                >
                  <activeSector.icon
                    className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 transition-all duration-500"
                    style={{ color: activeSector.accentColor }}
                  />
                </div>
                {/* Orbiting dot */}
                <div
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    background: activeSector.accentColor,
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${scrollProgress * 360}deg) translateX(160px) translateY(-50%)`,
                    boxShadow: `0 0 20px ${activeSector.accentColor}`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator - vertical on the right */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20">
          <div className="flex flex-col gap-3">
            {sectors.map((sector, idx) => (
              <button
                key={idx}
                onClick={() => {
                  // Scroll to the corresponding section
                  if (containerRef.current) {
                    const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
                    const targetScroll = containerRef.current.offsetTop + (scrollHeight / sectors.length) * idx;
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }
                }}
                className="group relative flex items-center justify-end gap-3"
                aria-label={`Go to ${sector.title}`}
              >
                {/* Label on hover */}
                <span
                  className="absolute right-full mr-4 whitespace-nowrap text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ color: idx === activeIndex ? sector.accentColor : '#9CA3AF' }}
                >
                  {sector.title}
                </span>
                {/* Dot indicator */}
                <div
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    background: idx === activeIndex ? sector.accentColor : '#D1D5DB',
                    transform: idx === activeIndex ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: idx === activeIndex ? `0 0 12px ${sector.accentColor}60` : 'none',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Section title badge - top center */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.primary.green.DEFAULT }}
            />
            <span
              className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
              style={{ fontFamily: typography.fonts.heading }}
            >
              Key Sectors & Themes
            </span>
          </div>
        </div>

        {/* Scroll hint - bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border-2 border-gray-300 flex justify-center pt-1.5">
              <div
                className="w-1 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDuration: '1.5s' }}
              />
            </div>
          </div>
        </div>

        {/* Progress bar - bottom */}
        <div ref={progressRef} className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${scrollProgress * 100}%`,
              background: `linear-gradient(90deg, ${colors.primary.green.DEFAULT}, ${activeSector.accentColor})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
