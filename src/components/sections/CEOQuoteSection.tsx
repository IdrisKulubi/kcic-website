"use client";

import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import Image from "next/image";
import { colors, typography } from "@/lib/design-system";

interface CEOQuoteSectionProps {
  imageSrc?: string;
  name?: string;
  title?: string;
  quote?: string;
}

/**
 * A premium testimonial/quote section with GSAP-powered parallax + reveal.
 * Designed to sit just below the video section.
 */
export default function CEOQuoteSection({
  imageSrc = "/images/ceo.jpg", // fallback placeholder
  name = "Joseph Murabula",
  title = "CEO, KCIC",
  quote = "True climate resilience will come when we align innovation, investment and policy into a single collaborative system. Our task now is to turn opportunity into coordinated action, to ensure that Africa’s climate solutions move from idea to impact.",
}: CEOQuoteSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const [currentImage, setCurrentImage] = useState(imageSrc);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const decorRef = useRef<HTMLDivElement | null>(null);

  // Split quote into words for a subtle stagger
  const words = useMemo(() => quote.split(" "), [quote]);

  useEffect(() => {
    setCurrentImage(imageSrc);
    setIsImageLoading(true);
  }, [imageSrc]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current || !imgWrapRef.current || !quoteRef.current || !decorRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro reveal timeline
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        imgWrapRef.current,
        { autoAlpha: 0, scale: 0.96, y: 20, filter: "blur(6px)" },
        { autoAlpha: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out", immediateRender: false }
      )
        .fromTo(
          decorRef.current,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 0.5, y: 0, duration: 0.6, ease: "sine.out", immediateRender: false },
          "<0.1"
        )
        .fromTo(
          quoteRef.current!.querySelectorAll("span[data-word]"),
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out", stagger: { amount: 0.5, from: "edges" }, immediateRender: false },
          "<0.05"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 60%",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.reverse(),
        onLeaveBack: () => tl.reverse(),
        invalidateOnRefresh: true,
      });

      // Parallax effects
      gsap.to(imgWrapRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(quoteRef.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ceo-quote-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Ambient gradient decor */}
      <div
        ref={decorRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(36rem 20rem at 15% 30%, rgba(127,209,52,0.15) 0%, rgba(127,209,52,0) 70%)," +
            "radial-gradient(36rem 20rem at 85% 70%, rgba(0,255,255,0.12) 0%, rgba(0,255,255,0) 70%)",
          filter: "blur(28px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div ref={imgWrapRef} className="relative w-full h-full flex md:justify-start">
            <div
              className="relative w-full h-full max-w-2xl md:max-w-none md:w-full mx-auto md:mx-0 overflow-hidden rounded-3xl shadow-xl"
              style={{ aspectRatio: "4/3" }}
            >
              {isImageLoading && (
                <div className="absolute inset-0 bg-linear-to-br from-green-100 via-white to-green-50 animate-pulse" aria-hidden />
              )}
              <Image
                src={currentImage}
                alt={`${name} portrait`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  if (currentImage !== "/images/placeholder-logo.svg") {
                    setCurrentImage("/images/placeholder-logo.svg");
                  }
                }}
              />

              {/* Subtle top line glow */}
              <div
                className="pointer-events-none absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colors.primary.green.DEFAULT}, transparent)`,
                  opacity: 0.5,
                }}
                aria-hidden
              />
            </div>
          </div>

          {/* Quote */}
          <div ref={quoteRef} className="relative md:pl-6">
            {/* Big decorative open quote */}
            <div
              className="absolute -top-8 -left-4 select-none text-[5rem] sm:text-[7rem] leading-none opacity-20"
              aria-hidden
              style={{ color: colors.primary.green.DEFAULT, fontFamily: typography.fonts.heading }}
            >
              “
            </div>

            <blockquote className="relative">
              <h3 id="ceo-quote-heading" className="sr-only">
                CEO quote
              </h3>

              <p
                className="text-balance font-medium tracking-tight text-foreground"
                style={{
                  fontFamily: typography.fonts.heading,
                  fontSize: "clamp(1.25rem, 2.6vw, 1.75rem)",
                  lineHeight: 1.4,
                }}
              >
                {words.map((w, i) => (
                  <span key={i} data-word className="inline-block mr-1 align-baseline">
                    {w}
                  </span>
                ))}
              </p>

              {/* Closing quote */}
              <div
                className="mt-6 text-[2.5rem] leading-none opacity-30"
                aria-hidden
                style={{ color: colors.primary.green.DEFAULT }}
              >
                ”
              </div>

              {/* Attribution */}
              <footer className="mt-4">
                <cite className="not-italic block text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground" style={{ fontFamily: typography.fonts.heading }}>
                    {name}
                  </span>
                  <span className="mx-2">·</span>
                  <span>{title}</span>
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}