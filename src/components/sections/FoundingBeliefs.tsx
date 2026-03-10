"use client";

import { useLayoutEffect, useRef } from "react";
import { Eye, FlagBanner, UsersThree } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { typography } from "@/lib/design-system";

interface BeliefCard {
  title: string;
  description: string;
  accent: string;
  icon: typeof Eye;
  supportingText?: string;
  values?: string[];
}

interface FoundingBeliefsSectionProps {
  className?: string;
}

const beliefs: BeliefCard[] = [
  {
    title: "Vision",
    description:
      "Sustainable Enterprises and Climate Resilient Communities",
    accent: "#80c738",
    icon: Eye,
    supportingText:
      "We envision thriving enterprises driving inclusive growth while strengthening the resilience of communities.",
  },
  {
    title: "Mission",
    description:
      "Catalyzing Climate Entrepreneurship in Africa",
    accent: "#00addd",
    icon: FlagBanner,
    supportingText:
      "We back entrepreneurs, partners, and market actors building practical climate solutions with long-term impact.",
  },
  {
    title: "Core Values",
    description:
      "People-centric, Inclusivity, Professionalism, Integrity, Innovation and Collaboration",
    accent: "#E97451",
    icon: UsersThree,
    values: [
      "People-centric",
      "Inclusivity",
      "Professionalism",
      "Integrity",
      "Innovation",
      "Collaboration",
    ],
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
          opacity: 0,
          y: 28,
        });

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
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
      className={`relative overflow-hidden bg-[#eef8fb] py-14 sm:py-16 ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,173,221,0.07) 0%, rgba(128,199,56,0.05) 100%)," +
            "radial-gradient(55% 55% at 50% 0%, rgba(0,173,221,0.12) 0%, rgba(0,173,221,0) 72%)," +
            "radial-gradient(36% 40% at 80% 85%, rgba(128,199,56,0.12) 0%, rgba(128,199,56,0) 75%)",
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
        <div ref={headerRef} className="text-center mb-10 sm:mb-12">
          <div className="belief-badge inline-flex items-center gap-2 rounded-full border border-[#b9dfe8] bg-white/85 px-4 py-2 shadow-sm mb-5">
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Our Foundation
            </span>
          </div>

          <h2
            id="founding-beliefs-heading"
            className="font-bold text-gray-900 mb-4"
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Vision, Mission & Values
          </h2>

          <p
            className="mx-auto max-w-3xl text-gray-600"
            style={{
              fontSize: "clamp(0.95rem, 1.2vw, 1rem)",
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            The purpose and principles that shape how KCIC serves enterprises, ecosystems, and climate-resilient communities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {beliefs.map((belief, index) => (
            <article key={index} className="belief-card group relative">
              <div
                className="relative flex h-full min-h-[320px] flex-col border border-white/80 bg-white/92 p-6 shadow-[0_16px_40px_rgba(17,24,39,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(17,24,39,0.12)]"
                style={{ borderTop: `4px solid ${belief.accent}` }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.92) 100%)",
                  }}
                  aria-hidden
                />

                <div
                  className="absolute right-0 top-0 h-24 w-24 opacity-10"
                  style={{
                    background: `radial-gradient(circle at top right, ${belief.accent} 0%, transparent 72%)`,
                  }}
                  aria-hidden
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center border"
                    style={{
                      color: belief.accent,
                      borderColor: `${belief.accent}33`,
                      background: `${belief.accent}12`,
                    }}
                  >
                    <belief.icon className="h-7 w-7" weight="duotone" aria-hidden />
                  </div>

                  <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <h3
                      className="font-bold text-slate-900"
                      style={{
                        fontSize: "clamp(1.35rem, 2vw, 1.75rem)",
                        fontFamily: typography.fonts.heading,
                        lineHeight: 1.15,
                      }}
                    >
                      {belief.title}
                    </h3>
                    <span
                      className="font-semibold"
                      style={{
                        fontSize: "0.875rem",
                        color: belief.accent,
                        fontFamily: typography.fonts.body,
                      }}
                    >
                      {`0${index + 1}`}
                    </span>
                  </div>

                  <p
                    className="text-slate-900"
                    style={{
                      fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
                      fontFamily: typography.fonts.body,
                      lineHeight: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    {belief.description}
                  </p>

                  {belief.supportingText ? (
                    <p
                      className="mt-4 text-slate-600"
                      style={{
                        fontSize: "0.95rem",
                        fontFamily: typography.fonts.body,
                        lineHeight: typography.lineHeights.relaxed,
                      }}
                    >
                      {belief.supportingText}
                    </p>
                  ) : null}

                  {belief.values ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {belief.values.map((value) => (
                        <span
                          key={value}
                          className="inline-flex border px-3 py-2 text-sm text-slate-700"
                          style={{
                            borderColor: `${belief.accent}30`,
                            background: `${belief.accent}10`,
                            fontFamily: typography.fonts.body,
                          }}
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div
                    className="mt-auto pt-6"
                    style={{
                      fontSize: "0.875rem",
                      color: "#475569",
                      fontFamily: typography.fonts.body,
                    }}
                  >
                    Grounded in enterprise growth, resilient communities, and accountable partnerships.
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
