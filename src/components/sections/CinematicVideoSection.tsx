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

      // Cinematic entrance sequence - inspired "jump in" pop
      tl.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", immediateRender: false }
      )
        // Stage (wrap of the frame) pop-in with slight overshoot
        .fromTo(
          stageRef.current,
          { autoAlpha: 0, y: 100, scale: 0.82, rotateX: -6, transformPerspective: 1200 },
          { autoAlpha: 1, y: 0, scale: 1.06, rotateX: 0, duration: 0.6, ease: "back.out(1.6)", immediateRender: false },
          "<0.05"
        )
        .to(stageRef.current, { scale: 1, duration: 0.25, ease: "power2.out" }, "<")
        // Lights glow in slightly after pop
        .fromTo(
          lightsRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 0.35, duration: 0.6, ease: "sine.out", immediateRender: false },
          "<0.05"
        )
        // Frame clarity (blur -> sharp) for cinematic reveal
        .fromTo(
          frameRef.current,
          { filter: "blur(12px)" },
          { filter: "blur(0px)", duration: 0.5, ease: "power2.out", immediateRender: false },
          "<0.05"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 70%",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.reverse(),
        onLeaveBack: () => tl.reverse(),
        invalidateOnRefresh: true,
      });

      // Pin the section briefly so users can see the jump-in
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "+=60%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // Parallax while scrolling within the pinned window
      gsap.to(frameRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=60%",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(headingRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=60%",
          scrub: 1.3,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(lightsRef.current, {
        scale: 1.12,
        rotation: 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=60%",
          scrub: 1.6,
          invalidateOnRefresh: true,
        },
      });

      // Safety refresh
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section ref={sectionRef} aria-labelledby="cinematic-video-heading" className="relative py-16 sm:py-20 overflow-hidden bg-transparent">
      {/* Ambient lights / gradients */}
      <div
        ref={lightsRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 30%, rgba(127,209,52,0.25) 0%, rgba(127,209,52,0) 60%)," +
            "radial-gradient(50% 50% at 80% 70%, rgba(0,255,255,0.25) 0%, rgba(0,255,255,0) 60%)",
          filter: "saturate(120%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10">
          <p
            className="uppercase tracking-wider text-sm text-gray-500"
            style={{ fontFamily: typography.fonts.body, letterSpacing: typography.letterSpacing.widest }}
          >
            {title}
          </p>
          <h2
            id="cinematic-video-heading"
            className="font-bold mt-2"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontFamily: typography.fonts.heading,
              color: colors.primary.green.DEFAULT,
              lineHeight: typography.lineHeights.tight,
            }}
          >
            {subtitle}
          </h2>
        </div>

        {/* Video frame */}
        <div ref={stageRef} className="will-change-transform">
          <div ref={frameRef} className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            {/* Subtle border glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl"
              style={{
                background: colors.gradients.subtle,
                opacity: 0.7,
                filter: 'blur(6px)',
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