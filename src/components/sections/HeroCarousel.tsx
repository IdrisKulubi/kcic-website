"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CaretLeft, CaretRight, Pause, Play } from "@phosphor-icons/react";
import { colors, typography } from "@/lib/design-system";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";

export const DEFAULT_HERO_IMAGES: Array<{ src: string; alt: string }> = [
  { src: "/images/news/slide1.jpg", alt: "Entrepreneur presenting a KCIC-supported climate innovation" },
  { src: "/images/news/slide2.jpg", alt: "KCIC team engaging partners at a climate resilience summit" },
  { src: "/images/news/slide4.jpeg", alt: "Green startup celebrating funding milestone with KCIC" },
];

interface HeroCarouselProps {
  data: {
    title: string;
    description: string;
    ctaButtons: Array<{
      text: string;
      href: string;
      variant: "primary" | "secondary";
    }>;
  };
  images?: Array<{ src: string; alt: string }>;
  intervalMs?: number;
}

export function HeroCarousel({ data, images, intervalMs = 6000 }: HeroCarouselProps) {
  const { getMotionSafeClasses, shouldDisableAnimations, settings } = useAccessibilityClasses();
  const slides = useMemo(
    () => (images && images.length > 0 ? images : DEFAULT_HERO_IMAGES),
    [images]
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const stop = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = () => {
    if (shouldDisableAnimations() || paused || slides.length <= 1) return;
    stop();
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, Math.max(3000, intervalMs));
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index, intervalMs, slides.length, settings.reducedMotion, settings.pauseAnimations]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);
    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);
    node.addEventListener("focusin", onEnter);
    node.addEventListener("focusout", onLeave);
    return () => {
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
      node.removeEventListener("focusin", onEnter);
      node.removeEventListener("focusout", onLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background carousel */}
      <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
        {/* Slides */}
        {slides.map((slide, i) => {
          const isActive = i === index;
          // Ken Burns pan/zoom params vary per index for subtle movement
          const panX = i % 2 === 0 ? "translate-x-[-2%]" : "translate-x-[2%]";
          const panY = i % 3 === 0 ? "translate-y-[-2%]" : "translate-y-[2%]";
          return (
            <div
              key={slide.src + i}
              className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
              aria-hidden={!isActive}
            >
              {/* Image with subtle ken burns effect when motion allowed */}
              <div
                className={
                  shouldDisableAnimations()
                    ? "w-full h-full"
                    : `w-full h-full will-change-transform ${getMotionSafeClasses(
                      `overflow-hidden`
                    )}`
                }
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={
                    shouldDisableAnimations()
                      ? "object-cover"
                      : `object-cover scale-105 ${getMotionSafeClasses(
                        `transition-transform ease-out ${panX} ${panY} scale-110`
                      )}`
                  }
                  style={
                    shouldDisableAnimations()
                      ? undefined
                      : { transitionDuration: "6000ms" }
                  }
                />
              </div>

              {/* Overlays for contrast */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl text-center">
          <h1
            className={`font-bold mb-4 ${getMotionSafeClasses("animate-in fade-in slide-in-from-bottom-8 duration-700")}`}
            style={{
              fontSize: typography.sizes.display.xl[0],
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              letterSpacing: typography.letterSpacing.tight,
              color: "#FFFFFF",
              textShadow: "0 2px 20px rgba(0,0,0,0.35)",
            }}
          >
            {data.title}
          </h1>

          <h2
            className={`mx-auto max-w-3xl font-semibold mb-8 ${getMotionSafeClasses("animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300")}`}
            style={{
              fontSize: typography.sizes.heading.h2[0],
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.snug,
              letterSpacing: typography.letterSpacing.tight,
              color: colors.primary.green.DEFAULT,
              textShadow: "0 1px 10px rgba(0,0,0,0.25)",
            }}
          >
            {data.description}
          </h2>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${getMotionSafeClasses("animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500")}`}
          >
            {data.ctaButtons.map((button) => (
              <Button
                key={button.text}
                size="lg"
                className={
                  button.variant === "primary"
                    ? "px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 border-none hover:brightness-110"
                    : `px-8 py-4 text-lg font-semibold rounded-full bg-transparent border-2 transition-all duration-300`
                }
                style={
                  button.variant === "primary"
                    ? {
                      backgroundColor: colors.primary.green.DEFAULT,
                      color: "#FFFFFF",
                      fontFamily: typography.fonts.body,
                    }
                    : {
                      borderColor: colors.primary.blue.DEFAULT,
                      color: colors.primary.blue.DEFAULT,
                      fontFamily: typography.fonts.body,
                      backgroundColor: "transparent",
                    }
                }
                asChild
              >
                <a href={button.href} className="flex items-center justify-center space-x-2 min-w-[200px]">
                  <span>{button.text}</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          {/* Prev/Next */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 sm:px-6">
            <button
              aria-label="Previous slide"
              onClick={() => {
                prev();
                setPaused(true);
              }}
              className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur px-3 py-3 transition-colors"
            >
              <CaretLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next slide"
              onClick={() => {
                next();
                setPaused(true);
              }}
              className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur px-3 py-3 transition-colors"
            >
              <CaretRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots + Pause */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/30 backdrop-blur px-1 py-1 rounded-full">
            <button
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setPaused((p) => !p)}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white/90 hover:text-white transition-colors"
            >
              {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            </button>
            <div className="flex gap-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    setIndex(i);
                    setPaused(true);
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${i === index ? "w-3 bg-white" : "bg-white/60 hover:bg-white"
                    }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}