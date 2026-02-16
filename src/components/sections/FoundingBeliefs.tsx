"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { typography } from "@/lib/design-system";

interface BeliefCard {
  title: string;
  description: string;
  accent: string;
  imageSrc: string;
  imageAlt: string;
  focus: string;
  evidence: string;
}

interface FoundingBeliefsSectionProps {
  className?: string;
}

const beliefs: BeliefCard[] = [
  {
    title: "Vision",
    description:
      "A climate-resilient and prosperous Africa powered by practical, scalable green enterprise solutions.",
    accent: "#80c738",
    imageSrc: "/images/sectors/agriculture.webp",
    imageAlt: "Farm landscape representing regenerative and climate-smart enterprise solutions",
    focus: "Resilient livelihoods",
    evidence: "Climate-smart agriculture and nature-based adaptation",
  },
  {
    title: "Mission",
    description:
      "We enable innovators, SMEs, and partners to build market-ready climate solutions for communities and cities.",
    accent: "#00addd",
    imageSrc: "/images/sectors/mobility.jpg",
    imageAlt: "Sustainable transport corridor representing scalable climate innovation",
    focus: "Market transformation",
    evidence: "Enterprise acceleration, finance readiness, and ecosystem partnerships",
  },
  {
    title: "Values",
    description:
      "Integrity, collaboration, innovation, and measurable impact guide how we design, support, and scale solutions.",
    accent: "#E97451",
    imageSrc: "/images/sectors/crosscutting.jpg",
    imageAlt: "Community-centered sustainability work showing inclusion and collaboration",
    focus: "People-centered impact",
    evidence: "Inclusive growth, accountability, and long-term climate outcomes",
  },
];

/**
 * Founding Beliefs Section
 * Connects emotionally with visitors through core values and philosophy
 */
export default function FoundingBeliefs({
  className = "",
}: FoundingBeliefsSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const badge = headerRef.current.querySelector('.belief-badge');
        const heading = headerRef.current.querySelector('h2');
        const subtitle = headerRef.current.querySelector('p');

        const headerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        if (badge) {
          headerTimeline.fromTo(badge,
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)', force3D: true }
          );
        }
        if (heading) {
          headerTimeline.fromTo(heading,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', force3D: true },
            '-=0.3'
          );
        }
        if (subtitle) {
          headerTimeline.fromTo(subtitle,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', force3D: true },
            '-=0.3'
          );
        }
      }

      const cards = sectionRef.current?.querySelectorAll(".belief-card");

      if (cards && cards.length > 0) {
        gsap.set(cards, {
          y: 36,
          rotateX: -6,
          transformPerspective: 900,
        });

        gsap.to(cards, {
          y: 0,
          rotateX: 0,
          duration: 0.95,
          ease: "power3.out",
          force3D: true,
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        cards.forEach((card, index) => {
          const image = card.querySelector(".belief-image");
          if (!image) return;

          gsap.set(image, { scale: 1.08 });
          gsap.to(image, {
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            force3D: true,
            delay: index * 0.14 + 0.18,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.to(image, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="founding-beliefs-heading"
      className={`relative py-20 sm:py-28 overflow-hidden bg-[#d8f1fb] ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,173,221,0.16) 0%, rgba(0,173,221,0.08) 55%, rgba(0,173,221,0.12) 100%)," +
            "radial-gradient(60% 55% at 50% 0%, rgba(0,173,221,0.26) 0%, rgba(0,173,221,0) 72%)," +
            "radial-gradient(40% 45% at 80% 85%, rgba(0,173,221,0.18) 0%, rgba(0,173,221,0) 75%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.25) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-14 sm:mb-18">
          <div className="belief-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-100 shadow-sm mb-6">
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Our Philosophy
            </span>
          </div>

          <h2
            id="founding-beliefs-heading"
            className="font-bold text-gray-900 mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            What We Believe
          </h2>

          <p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            style={{
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            The core principles that drive everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {beliefs.map((belief, index) => (
            <article key={index} className="belief-card group relative">
              <div
                className="relative rounded-3xl overflow-hidden shadow-xl transition-all duration-600 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                style={{ height: "520px" }}
              >
                {/* ── FULL-BLEED IMAGE ── fills entire card ── */}
                <Image
                  src={belief.imageSrc}
                  alt={belief.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="belief-image object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Cinematic gradient — darker at bottom for text legibility */}
                <div
                  className="absolute inset-0 z-1"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.82) 100%)",
                  }}
                  aria-hidden
                />

                {/* Subtle brand color wash */}
                <div
                  className="absolute inset-0 z-1 opacity-40 mix-blend-multiply"
                  style={{
                    background: `linear-gradient(160deg, ${belief.accent}45 0%, transparent 55%)`,
                  }}
                  aria-hidden
                />

                {/* ── TOP: Sequence number + Focus tag ── */}
                <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
                  {/* Large sequence number */}
                  <span
                    className="font-black leading-none select-none"
                    style={{
                      fontSize: "54px",
                      color: "rgba(255,255,255,0.15)",
                      fontFamily: typography.fonts.heading,
                      WebkitTextStroke: `1.5px ${belief.accent}80`,
                    }}
                  >
                    {`0${index + 1}`}
                  </span>

                  {/* Focus pill */}
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-bold uppercase text-white backdrop-blur-md"
                    style={{
                      background: `${belief.accent}CC`,
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      lineHeight: 1.1,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-white/80"
                      aria-hidden
                    />
                    {belief.focus}
                  </span>
                </div>

                {/* ── BOTTOM: Frosted glass content panel ── */}
                <div className="absolute bottom-0 left-0 right-0 z-10" style={{ maxHeight: "58%", overflow: "hidden" }}>
                  {/* Brand accent bar */}
                  <div
                    className="h-[3px] w-full"
                    style={{
                      background: `linear-gradient(90deg, ${belief.accent} 0%, ${belief.accent}60 60%, transparent 100%)`,
                    }}
                    aria-hidden
                  />

                  <div
                    className="px-6 pt-5 pb-6 backdrop-blur-xl transition-all duration-500 group-hover:backdrop-blur-2xl"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                    }}
                  >
                    {/* Title */}
                    <h3
                      className="font-extrabold mb-2.5 tracking-tight"
                      style={{
                        color: "#ffffff",
                        fontSize: "34px",
                        fontFamily: typography.fonts.heading,
                        lineHeight: 1.15,
                        textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      {belief.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="mb-3"
                      style={{
                        color: "rgba(255,255,255,0.92)",
                        fontSize: "15px",
                        fontFamily: typography.fonts.body,
                        lineHeight: 1.55,
                        textShadow: "0 1px 4px rgba(0,0,0,0.2)",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {belief.description}
                    </p>

                    {/* Evidence line with brand dot */}
                    <div className="flex items-start gap-2 pt-2.5 border-t border-white/15">
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                        style={{ background: belief.accent }}
                        aria-hidden
                      />
                      <p
                        className=""
                        style={{
                          color: "rgba(255,255,255,0.78)",
                          fontSize: "13px",
                          fontFamily: typography.fonts.body,
                          lineHeight: 1.45,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {belief.evidence}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Inner highlight ring on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-2"
                  style={{
                    boxShadow: `inset 0 0 0 2px ${belief.accent}50, inset 0 0 30px ${belief.accent}15`,
                  }}
                  aria-hidden
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
