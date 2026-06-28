"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { typography } from "@/lib/design-system";

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
      className="relative h-screen min-h-[720px] w-full overflow-hidden border-b-[5px] border-[#101010]"
      aria-label="Hero section"
    >
      <style jsx>{`
        .hero-frame {
          display: grid;
          min-height: 100%;
          align-items: end;
          padding: clamp(7rem, 13vh, 10rem) clamp(1rem, 5vw, 5rem) clamp(2rem, 7vh, 4.5rem);
        }

        .hero-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1.25rem;
          align-items: end;
        }

        @media (min-width: 1024px) {
          .hero-layout {
            grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.42fr);
          }
        }
      `}</style>

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

        <div className="absolute inset-0 bg-[#101010]/34" style={{ zIndex: 2 }} aria-hidden />
        <div className="absolute inset-y-0 left-0 w-full bg-[#101010]/28 lg:w-[58%]" style={{ zIndex: 3 }} aria-hidden />
        <div className="absolute bottom-0 right-0 h-[28vh] w-[52vw] bg-[#00addd]/88" style={{ zIndex: 4 }} aria-hidden />
        <div className="absolute bottom-[8vh] right-[8vw] h-24 w-24 border-[3px] border-[#101010] bg-[#80c738]" style={{ zIndex: 5 }} aria-hidden />
      </div>

      <div className="hero-frame relative" style={{ zIndex: 10 }}>
        <div
          className="hero-layout"
          style={{
            transform: isLoaded ? "translateY(0)" : "translateY(30px)",
            opacity: isLoaded ? 1 : 0,
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-5xl">
            <p className="mb-4 inline-flex border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#101010] shadow-[4px_4px_0_#101010]">
              Kenya Climate Innovation Center
            </p>

            <h1
              className="max-w-[12ch] text-[#fff7df]"
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: "clamp(3.5rem, 8vw, 8rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "0",
                textShadow: "6px 6px 0 #101010",
                WebkitTextStroke: "1.5px #101010",
              }}
            >
              {data.title}
            </h1>

            {data.description ? (
              <p className="mt-5 max-w-3xl text-lg font-black leading-8 text-[#fff7df] sm:text-xl">
                {data.description}
              </p>
            ) : null}

            {data.ctaButtons?.length ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {data.ctaButtons.map((button) => (
                  <Link
                    key={`${button.text}-${button.href}`}
                    href={button.href}
                    className={
                      button.variant === "primary"
                        ? "inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-3 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#101010]"
                        : "inline-flex items-center gap-2 border-[3px] border-[#fff7df] bg-[#101010] px-4 py-3 text-sm font-black uppercase text-[#fff7df] shadow-[4px_4px_0_#80c738] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#80c738]"
                    }
                  >
                    {button.text}
                    <ArrowUpRight className="h-4 w-4" weight="bold" />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="hidden justify-self-end border-[3px] border-[#101010] bg-[#fff7df] p-4 shadow-[7px_7px_0_#101010] lg:block">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#101010]">
              Live focus
            </p>
            <div className="grid gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`flex items-center justify-between gap-5 border-2 border-[#101010] px-3 py-2 text-left text-xs font-black uppercase transition ${
                    index === currentSlide ? "bg-[#00addd] text-[#101010]" : "bg-[#fff7df] text-[#101010] hover:bg-[#e5f7c9]"
                  }`}
                  aria-label={`Show hero image ${index + 1}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-3 w-3 border-2 border-[#101010] bg-[#80c738]" aria-hidden />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
