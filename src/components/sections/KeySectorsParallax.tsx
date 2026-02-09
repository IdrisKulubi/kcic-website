"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { colors, typography } from "@/lib/design-system";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectorData {
  title: string;
  description: string;
  items: string[];
  image: string;
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
    image: "/images/sectors/energyr.jpg",
    accentColor: "#F59E0B",
  },
  {
    title: "Circular Economy",
    description: "Waste reduction and resource optimization for a sustainable future",
    items: ["Waste Management", "Industrial Recycling", "Green Manufacturing", "Upcycling Solutions"],
    image: "/images/sectors/circular.png",
    accentColor: colors.primary.green.DEFAULT,
  },
  {
    title: "Mobility",
    description: "Sustainable transportation solutions transforming urban movement",
    items: ["E-mobility Platforms", "Sustainable Transport", "Mobility as a Service", "EV Infrastructure"],
    image: "/images/sectors/mobility.jpg",
    accentColor: colors.primary.blue.DEFAULT,
  },
  {
    title: "Nature Based Solutions",
    description: "Ecosystem restoration and conservation protecting our natural heritage",
    items: ["Ecosystem Restoration", "Agroforestry Programs", "Carbon Credit Projects", "Biodiversity Conservation"],
    image: "/images/sectors/nature.jpg",
    accentColor: "#166534",
  },
  {
    title: "Water",
    description: "Water resource management ensuring access to clean water for all",
    items: ["Water Harvesting", "Water Recycling", "WASH Programs", "Smart Irrigation"],
    image: "/images/sectors/water.jpeg",
    accentColor: "#0891B2",
  },
  {
    title: "Agriculture",
    description: "Climate-smart agricultural practices feeding the future sustainably",
    items: ["Climate-smart Agriculture", "Agribusiness Innovation", "Agri-tech Solutions", "Sustainable Farming"],
    image: "/images/sectors/agriculture.webp",
    accentColor: "#65A30D",
  },
  {
    title: "Cross-Cutting",
    description: "Enabling ecosystem development through policy and innovation",
    items: ["Policy Advocacy", "Impact Finance", "Innovation Ecosystem", "Capacity Building"],
    image: "/images/sectors/crosscutting.jpg",
    accentColor: "#7C3AED",
  },
];

export default function KeySectorsParallax({
  className = "",
}: KeySectorsParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animate image transition when sector changes
  useEffect(() => {
    if (activeIndex !== prevIndex && imageContainerRef.current) {
      setIsTransitioning(true);
      
      const ctx = gsap.context(() => {
        // Animate out old content, animate in new
        const tl = gsap.timeline({
          onComplete: () => {
            setPrevIndex(activeIndex);
            setIsTransitioning(false);
          }
        });

        // Scale and fade animation
        tl.to(imageContainerRef.current, {
          scale: 0.95,
          opacity: 0.5,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(imageContainerRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }, imageContainerRef);

      return () => ctx.revert();
    }
  }, [activeIndex, prevIndex]);

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

            {/* Right side - Large Artistic Image Display */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              {/* Animated background shapes */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Rotating outer ring */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border-2 border-dashed opacity-20 transition-all duration-700"
                  style={{ 
                    borderColor: activeSector.accentColor,
                    animation: 'spin 30s linear infinite',
                  }}
                />
                {/* Pulsing glow */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full blur-3xl transition-all duration-700"
                  style={{ 
                    background: activeSector.accentColor,
                    opacity: 0.15,
                    animation: 'pulse 4s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Main image container */}
              <div 
                ref={imageContainerRef}
                className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-[3/4]"
              >
                {/* Stacked frame effect - back */}
                <div 
                  className="absolute inset-4 -rotate-6 rounded-3xl transition-all duration-700 -z-10"
                  style={{ 
                    background: `linear-gradient(135deg, ${activeSector.accentColor}30 0%, ${activeSector.accentColor}10 100%)`,
                  }}
                />
                
                {/* Stacked frame effect - middle */}
                <div 
                  className="absolute inset-2 rotate-3 rounded-3xl transition-all duration-700 -z-10"
                  style={{ 
                    background: `linear-gradient(135deg, ${activeSector.accentColor}20 0%, ${activeSector.accentColor}05 100%)`,
                    border: `2px solid ${activeSector.accentColor}20`,
                  }}
                />

                {/* Primary image frame */}
                <div 
                  className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
                  style={{
                    boxShadow: `0 30px 80px -20px ${activeSector.accentColor}50, 0 0 0 1px ${activeSector.accentColor}20`,
                  }}
                >
                  {/* Diagonal split overlay */}
                  <div 
                    className="absolute inset-0 z-20 pointer-events-none transition-all duration-700"
                    style={{
                      background: `linear-gradient(135deg, ${activeSector.accentColor}15 0%, transparent 40%, transparent 60%, ${activeSector.accentColor}10 100%)`,
                    }}
                  />
                  
                  {/* Animated corner accents */}
                  <div 
                    className="absolute top-0 left-0 w-24 h-24 z-20 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${activeSector.accentColor}40 0%, transparent 70%)`,
                    }}
                  />
                  <div 
                    className="absolute bottom-0 right-0 w-32 h-32 z-20 pointer-events-none"
                    style={{
                      background: `linear-gradient(-45deg, ${activeSector.accentColor}30 0%, transparent 70%)`,
                    }}
                  />

                  {/* Main Image with parallax effect */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={activeSector.image}
                      alt={activeSector.title}
                      fill
                      className="object-cover transition-all duration-700 scale-105 hover:scale-110"
                      style={{
                        transform: `scale(1.05) translateY(${scrollProgress * 20 - 10}px)`,
                      }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      priority
                    />
                  </div>

                  {/* Sector title overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-30 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                    <div 
                      className="text-white/90 text-sm font-semibold uppercase tracking-wider mb-1"
                      style={{ fontFamily: typography.fonts.body }}
                    >
                      Sector {activeIndex + 1}
                    </div>
                    <div 
                      className="text-white text-xl sm:text-2xl font-bold"
                      style={{ fontFamily: typography.fonts.heading }}
                    >
                      {activeSector.title}
                    </div>
                  </div>

                  {/* Animated border */}
                  <div 
                    className="absolute inset-0 rounded-3xl pointer-events-none z-20 transition-all duration-500"
                    style={{
                      border: `3px solid ${activeSector.accentColor}40`,
                    }}
                  />
                </div>

                {/* Floating accent elements */}
                <div
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl transition-all duration-700 -z-20"
                  style={{
                    background: activeSector.accentColor,
                    opacity: 0.25,
                    animation: 'float 6s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute -top-4 -left-4 w-16 h-16 rounded-xl transition-all duration-700 -z-20"
                  style={{
                    background: activeSector.accentColor,
                    opacity: 0.2,
                    animation: 'float 5s ease-in-out infinite reverse',
                  }}
                />
                <div
                  className="absolute top-1/4 -right-8 w-12 h-12 rounded-full transition-all duration-700 -z-20"
                  style={{
                    background: activeSector.accentColor,
                    opacity: 0.3,
                    animation: 'float 4s ease-in-out infinite 1s',
                  }}
                />

                {/* Number indicator */}
                <div 
                  className="absolute -top-8 -right-4 text-8xl font-black opacity-10 transition-all duration-500 select-none pointer-events-none"
                  style={{ 
                    color: activeSector.accentColor,
                    fontFamily: typography.fonts.heading,
                  }}
                >
                  0{activeIndex + 1}
                </div>
              </div>

              {/* CSS Keyframes */}
              <style jsx>{`
                @keyframes spin {
                  from { transform: translate(-50%, -50%) rotate(0deg); }
                  to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes pulse {
                  0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
                  50% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.05); }
                }
                @keyframes float {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(-15px) rotate(3deg); }
                }
              `}</style>
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
