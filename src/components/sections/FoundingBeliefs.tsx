"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { typography } from "@/lib/design-system";
import { FocusCards } from "@/components/ui/focus-cards";

interface BeliefCard {
  title: string;
  description: string;
  supportingText?: string;
}

interface FoundingBeliefsSectionProps {
  className?: string;
}

const beliefs: BeliefCard[] = [
  {
    title: "Vision",
    description:
      "Sustainable Enterprises and Climate Resilient Communities",
    supportingText:
      "We envision thriving enterprises driving inclusive growth while strengthening the resilience of communities.",
  },
  {
    title: "Mission",
    description:
      "Catalyzing Climate Entrepreneurship in Africa",
    supportingText:
      "We back entrepreneurs, partners, and market actors building practical climate solutions with long-term impact.",
  },
  {
    title: "Core Values",
    description:
      "The principles that shape how we serve, partner, and deliver impact.",
    supportingText:
      "People-centric, inclusivity, professionalism, integrity, innovation, and collaboration guide our decisions and relationships.",
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
      className={`relative overflow-hidden bg-[#eef8fb] py-10 sm:py-12 ${className}`}
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
        <div ref={headerRef} className="text-center mb-8 sm:mb-10">
          <div className="belief-badge inline-flex items-center gap-2 rounded-full border border-[#b9dfe8] bg-white/85 px-4 py-2 shadow-sm mb-5">
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Our Foundation
            </span>
          </div>

          <h2
            id="founding-beliefs-heading"
            className="font-bold text-gray-900 mb-4"
            style={{
              fontSize: "clamp(1.55rem, 3vw, 2.3rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            The purpose and principles
          </h2>

          <p
            className="mx-auto max-w-3xl text-gray-600"
            style={{
              fontSize: "clamp(0.9rem, 1.05vw, 0.98rem)",
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            The purpose and principles that shape how KCIC supports enterprises, ecosystems, and climate-resilient communities.
          </p>
        </div>

        <FocusCards
          items={beliefs.map((belief, index) => ({
            key: belief.title,
            content: (
              <article className="belief-card group relative h-full">
                <div
                  className="relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-teal-200/45 p-7 sm:p-8 shadow-[0_1px_0_rgba(22,101,90,0.05),0_22px_44px_-18px_rgba(15,60,55,0.09)] ring-1 ring-teal-900/5 transition-[box-shadow,border-color] duration-300 hover:border-teal-300/55 hover:shadow-[0_1px_0_rgba(22,101,90,0.06),0_28px_56px_-20px_rgba(15,60,55,0.11)]"
                  style={{
                    background:
                      "linear-gradient(165deg, #f3f9f6 0%, #eef6f7 42%, #ecf5f2 100%)",
                  }}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-6 border-b border-teal-200/35 pb-5">
                      <span
                        className="mb-3 block tabular-nums text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-teal-700/45"
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className="font-bold text-slate-900"
                        style={{
                          fontSize: "clamp(1.12rem, 1.55vw, 1.35rem)",
                          fontFamily: typography.fonts.heading,
                          lineHeight: 1.12,
                          letterSpacing: "-0.025em",
                        }}
                      >
                        {belief.title}
                      </h3>
                    </div>

                    <p
                      className="text-slate-800"
                      style={{
                        fontSize: "clamp(0.95rem, 1.02vw, 1.02rem)",
                        fontFamily: typography.fonts.body,
                        lineHeight: 1.52,
                        fontWeight: 600,
                      }}
                    >
                      {belief.description}
                    </p>

                    {belief.supportingText ? (
                      <p
                        className="mt-auto pt-6 text-slate-600"
                        style={{
                          fontSize: "0.9375rem",
                          fontFamily: typography.fonts.body,
                          lineHeight: typography.lineHeights.relaxed,
                        }}
                      >
                        {belief.supportingText}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            ),
          }))}
        />
      </div>
    </section>
  );
}
