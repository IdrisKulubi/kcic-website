"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

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
    metrics?: Array<{
      value: string;
      label: string;
    }>;
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
      className="relative min-h-screen w-full overflow-hidden bg-[#102016]"
      aria-label="Hero section"
    >
      <style jsx>{`
        .hero-frame {
          display: grid;
          min-height: 100vh;
          align-items: start;
          padding: 11.5rem 1.25rem 2rem;
        }

        .hero-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 2rem;
          align-items: start;
          max-width: 68rem;
        }

        .hero-title {
          font-size: 2.35rem;
        }

        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1px;
        }

        @media (min-width: 640px) {
          .hero-frame {
            align-items: center;
            padding: 8rem 2rem 2.5rem;
          }

          .hero-title {
            font-size: 3.75rem;
          }

          .hero-metrics {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .hero-frame {
            padding: 8rem 5rem 3rem;
          }

          .hero-layout {
            gap: 2.5rem;
          }

          .hero-title {
            font-size: 4.35rem;
          }
        }

        @media (min-width: 1280px) {
          .hero-title {
            font-size: 4.75rem;
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
                transform: index === currentSlide ? "scale(1.025)" : "scale(1)",
                transition: "transform 8s ease-out",
              }}
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-[#102016]/58" style={{ zIndex: 2 }} aria-hidden />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            background:
              "linear-gradient(90deg, rgba(16,32,22,0.96) 0%, rgba(16,32,22,0.82) 42%, rgba(16,32,22,0.34) 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{
            zIndex: 4,
            background:
              "linear-gradient(180deg, rgba(16,32,22,0) 0%, rgba(16,32,22,0.92) 100%)",
          }}
          aria-hidden
        />
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
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-3 text-sm font-semibold text-[#dbe7d7]">
              <span className="h-px w-10 bg-[#80c738]" aria-hidden />
              Kenya Climate Innovation Centre
            </p>

            <h1
              className="hero-title max-w-[14ch] text-[#f6faf2]"
              style={{
                fontFamily:
                  "Montserrat, 'Century Gothic', Aptos, Arial, Helvetica, sans-serif",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "0",
              }}
            >
              {data.title}
            </h1>

            {data.description ? (
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#dce8db] sm:text-lg sm:leading-8">
                {data.description}
              </p>
            ) : null}

            {data.ctaButtons?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {data.ctaButtons.map((button) => (
                  <Link
                    key={`${button.text}-${button.href}`}
                    href={button.href}
                    className={
                      button.variant === "primary"
                        ? "inline-flex min-h-12 items-center gap-2 rounded-sm bg-[#80c738] px-5 py-3 text-sm font-semibold text-[#102016] transition hover:bg-[#9ddf4b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6faf2]"
                        : "inline-flex min-h-12 items-center gap-2 rounded-sm border border-[#c8d8c4]/70 bg-[#f6faf2]/8 px-5 py-3 text-sm font-semibold text-[#f6faf2] transition hover:border-[#80c738] hover:bg-[#f6faf2]/14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#80c738]"
                    }
                  >
                    {button.text}
                    <ArrowUpRight className="h-4 w-4" weight="bold" aria-hidden />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {data.metrics?.length ? (
            <div className="max-w-5xl border-y border-[#dce8db]/18 bg-[#102016]/48 p-0 backdrop-blur-[2px]">
              <div className="hero-metrics">
                {data.metrics.map((metric) => (
                  <div key={`${metric.value}-${metric.label}`} className="px-4 py-4">
                    <p className="text-2xl font-semibold leading-none text-[#9ddf4b]">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm leading-5 text-[#dce8db]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
