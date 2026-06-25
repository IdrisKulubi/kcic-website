"use client";

import { useLayoutEffect, useRef, type ComponentType } from "react";
import { Eye, Heart, Rocket } from "@phosphor-icons/react";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { cn } from "@/lib/utils";
import {
  gsap,
  prefersReducedMotion,
  registerGsapFoundation,
} from "@/lib/gsap-foundation";

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
    description: "Sustainable Enterprises and Climate Resilient Communities",
    supportingText:
      "We envision thriving enterprises driving inclusive growth while strengthening the resilience of communities.",
  },
  {
    title: "Mission",
    description: "Catalyzing Climate Entrepreneurship in Africa",
    supportingText:
      "We back entrepreneurs, partners, and market actors building practical climate solutions with long-term impact.",
  },
  {
    title: "Core Values",
    description: "The principles that shape how we serve, partner, and deliver impact.",
    supportingText:
      "People-centric, inclusivity, professionalism, integrity, innovation, and collaboration guide our decisions and relationships.",
  },
];

const beliefIcons: ComponentType<{ className?: string; weight?: "bold" }>[] = [
  Eye,
  Rocket,
  Heart,
];

export default function FoundingBeliefs({ className = "" }: FoundingBeliefsSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations() || !sectionRef.current || prefersReducedMotion()) return;

    registerGsapFoundation();

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        });
      }

      const cards = sectionRef.current?.querySelectorAll(".belief-card");
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          y: 28,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="founding-beliefs-heading"
      className={cn("relative isolate overflow-hidden border-y-[5px] border-[#101010]", className)}
      style={{ backgroundColor: "#00addd" }}
    >
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full text-[#101010]/24"
        viewBox="0 0 1440 640"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
       
        <path
          d="M-30 448C175 372 327 393 481 476C637 560 805 565 982 474C1158 384 1304 378 1488 431"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path d="M109 88V550M1330 62V578" stroke="currentColor" strokeWidth="2" strokeDasharray="12 16" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div
          ref={headerRef}
          className="mb-7 grid items-end gap-5 border-b-[3px] border-[#101010] pb-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <p className="mb-3 inline-flex border-2 border-[#101010] bg-[#80c738] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#101010] shadow-[3px_3px_0_#101010]">
              KCIC charter
            </p>
            <h2
              id="founding-beliefs-heading"
              className="max-w-[9ch] text-5xl font-black leading-[0.92] text-[#fff7df] sm:text-6xl lg:text-7xl"
              style={{
                textShadow: "5px 5px 0 #101010",
                WebkitTextStroke: "1.5px #101010",
              }}
            >
              Our Foundation
            </h2>
          </div>
          <p className="max-w-3xl text-lg font-black leading-8 text-[#101010] sm:text-xl">
            The purpose and principles that shape how KCIC supports enterprises, ecosystems, and climate-resilient
            communities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {beliefs.map((belief, index) => {
            const Icon = beliefIcons[index];

            return (
              <article
                key={belief.title}
                className={cn(
                  "belief-card group relative flex min-h-[310px] flex-col overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[7px_7px_0_#101010] transition duration-200 hover:-translate-y-1 hover:shadow-[9px_9px_0_#101010]",
                  index === 1 ? "md:mt-8" : "",
                  index === 2 ? "md:mt-3" : ""
                )}
              >
                <div className="flex items-center justify-between border-b-[3px] border-[#101010] bg-[#101010] p-3 text-[#fff7df]">
                  <span className="text-xs font-black uppercase tracking-[0.24em]">Foundation {String(index + 1).padStart(2, "0")}</span>
                  <div className="grid h-11 w-11 shrink-0 place-items-center border-2 border-[#101010] bg-[#80c738] text-[#101010] shadow-[3px_3px_0_#fff7df] transition group-hover:-translate-y-0.5">
                    <Icon className="h-5 w-5 text-[#101010]" weight="bold" aria-hidden />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <h3 className="text-3xl font-black uppercase leading-[0.95] text-[#101010] sm:text-4xl">
                      {belief.title}
                    </h3>
                    <span className="h-16 w-16 shrink-0 border-2 border-[#101010] bg-[#80c738]" aria-hidden />
                  </div>

                  <div className="mb-5 h-[3px] w-full bg-[#101010]" aria-hidden />

                  <p className="text-base font-black leading-7 text-[#101010]">
                    {belief.description}
                  </p>

                  {belief.supportingText ? (
                    <p className="mt-auto pt-6 text-sm font-semibold leading-6 text-[#4d4a3d]">
                      {belief.supportingText}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
