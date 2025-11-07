"use client";

import React, { useLayoutEffect, useRef } from "react";
import { colors, typography } from "@/lib/design-system";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CinematicVideoSectionProps {
  embedUrl: string; // e.g. https://www.youtube.com/embed/<id>?start=3&...
  title?: string;
  subtitle?: string;
}

export function CinematicVideoSection({
  embedUrl,
  title = "Featured Video",
  subtitle = "A glimpse into our climate innovation story",
}: CinematicVideoSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const lightsRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return; // Respect reduced motion
    if (!sectionRef.current || !frameRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // Smooth fade + scale entrance
      tl.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "cubic.out", immediateRender: false }
      )
        // Smooth video frame entrance - scale + blur fade
        .fromTo(
          stageRef.current,
          { autoAlpha: 0, scale: 0.92, filter: "blur(8px)" },
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out", immediateRender: false },
          "<0.15"
        )
        // Ambient glow fade in
        .fromTo(
          lightsRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 0.4, duration: 0.7, ease: "sine.out", immediateRender: false },
          "<0.1"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 65%",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.reverse(),
        onLeaveBack: () => tl.reverse(),
        invalidateOnRefresh: true,
      });

      // Smooth parallax on scroll (no pin - feels more natural)
      gsap.to(frameRef.current, {
        yPercent: -8,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(headingRef.current, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Subtle glow breathing effect
      gsap.to(lightsRef.current, {
        scale: 1.08,
        opacity: 0.5,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Safety refresh
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section ref={sectionRef} aria-labelledby="cinematic-video-heading" className="relative py-20 sm:py-28 overflow-hidden bg-transparent">
      {/* Ambient lights / gradients - smoother */}
      <div
        ref={lightsRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 25% 35%, rgba(127,209,52,0.15) 0%, rgba(127,209,52,0) 50%)," +
            "radial-gradient(circle at 75% 65%, rgba(0,255,255,0.12) 0%, rgba(0,255,255,0) 50%)",
          filter: "blur(30px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 sm:mb-16">
          <p
            className="uppercase tracking-widest text-xs sm:text-sm text-gray-400 mb-3"
            style={{ fontFamily: typography.fonts.body, letterSpacing: typography.letterSpacing.widest }}
          >
            {title}
          </p>
          <h2
            id="cinematic-video-heading"
            className="font-bold"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3.2rem)',
              fontFamily: typography.fonts.heading,
              color: colors.primary.green.DEFAULT,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {subtitle}
          </h2>
        </div>

        {/* Video frame - cleaner design */}
        <div ref={stageRef} className="will-change-transform">
          <div ref={frameRef} className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500" style={{ background: "#000" }}>
            {/* Subtle top glow */}
            <div
              className="pointer-events-none absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.primary.green.DEFAULT}, transparent)`,
                opacity: 0.4,
              }}
              aria-hidden
            />

            {/* Iframe */}
            <iframe
              className="relative z-10 w-full h-full"
              src={embedUrl}
              title="KCIC video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}