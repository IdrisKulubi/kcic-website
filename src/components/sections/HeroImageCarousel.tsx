"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { colors, typography } from "@/lib/design-system";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface HeroSlide {
  src: string;
  alt: string;
}

interface HeroImageCarouselProps {
  data: {
    title: string;
    description: string;
    ctaButtons: Array<{
      text: string;
      href: string;
      variant: "primary" | "secondary";
    }>;
  };
  slides?: HeroSlide[];
  interval?: number;
}

/* -------------------------------------------------------------------------- */
/*  Default slides                                                             */
/* -------------------------------------------------------------------------- */

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    src: "/images/news/slide1.jpg",
    alt: "Climate innovators working on green energy solutions in Kenya",
  },
  {
    src: "/images/news/slide2.jpg",
    alt: "Community members benefiting from KCIC-supported clean technology",
  },

];

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function HeroImageCarousel({
  data,
  slides = DEFAULT_SLIDES,
  interval = 5000,
}: HeroImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  // Trigger entrance animation after mount
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      aria-label="Hero section"
    >
      {/* ===== Background Image Slides with CSS Crossfade ===== */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 1 : 0,
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              style={{
                transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
                transition: "transform 6s ease-out",
              }}
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}

        {/* Overlay: Dark gradient for text contrast */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background: `linear-gradient(
              to bottom,
              rgba(10, 15, 25, 0.5) 0%,
              rgba(10, 15, 25, 0.4) 40%,
              rgba(10, 15, 25, 0.6) 100%
            )`,
          }}
        />
      </div>

      {/* ===== Content Container ===== */}
      <div
        className="relative h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20"
        style={{ zIndex: 10 }}
      >
        {/* Centered Content Block */}
        <div
          className="max-w-4xl text-center"
          style={{
            transform: isLoaded ? "translateY(0)" : "translateY(30px)",
            opacity: isLoaded ? 1 : 0,
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
     

          {/* Main Headline */}
          <h1
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              textShadow: `
                0 2px 10px rgba(0, 0, 0, 0.3),
                0 4px 30px rgba(0, 0, 0, 0.2)
              `,
              marginBottom: "1.5rem",
            }}
          >
            {data.title}
          </h1>

         
        </div>

       
      </div>

     
    </section>
  );
}
