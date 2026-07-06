"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  Drop,
  Leaf,
  Plant,
  Warning,
} from "@phosphor-icons/react";
import {
  gsap,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from "@/lib/gsap-foundation";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";

interface ClimateChallengeSectionProps {
  className?: string;
}

const impactAreas = [
  {
    title: "Environmental degradation",
    description: "Climate stress is weakening ecosystems that communities and enterprises depend on.",
    icon: Plant,
  },
  {
    title: "Water and air pollution",
    description: "Resource pressure increases health, productivity, and infrastructure risks.",
    icon: Drop,
  },
  {
    title: "Biodiversity loss",
    description: "Nature-based assets need stronger protection, restoration, and enterprise-led solutions.",
    icon: Leaf,
  },
];

const responsePoints = [
  "Enterprise incubation for practical climate solutions",
  "Finance readiness for businesses with growth potential",
  "Partnerships that connect markets, policy, and communities",
];

export default function ClimateChallenge({
  className = "",
}: ClimateChallengeSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations() || prefersReducedMotion() || !sectionRef.current) return;

    registerGsapFoundation();

    const ctx = gsap.context(() => {
      gsap.from("[data-climate-reveal]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          invalidateOnRefresh: true,
        },
      });

      gsap.from("[data-climate-image]", {
        scale: 1.04,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
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
      aria-labelledby="climate-challenge-heading"
      className={`relative isolate overflow-hidden bg-[#102016] text-[#fbf7e8] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,199,56,0.12) 0%, rgba(16,32,22,0) 36%), radial-gradient(circle at 86% 18%, rgba(0,173,221,0.14) 0%, rgba(0,173,221,0) 28%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-10">
          <div data-climate-reveal>
            <p className="mb-4 text-sm font-semibold text-[#9ddf4b]">
              Climate context
            </p>
            <h2
              id="climate-challenge-heading"
              className="max-w-[760px] text-[2.25rem] font-bold leading-[1.08] text-[#fbf7e8] sm:text-[3.1rem] lg:text-[3.75rem]"
              style={{
                fontFamily:
                  "Montserrat, 'Century Gothic', Aptos, Arial, Helvetica, sans-serif",
                letterSpacing: "0",
              }}
            >
              The challenge is urgent. The response must reach the market.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#d8e4d3] sm:text-lg sm:leading-8">
              Africa bears a disproportionate climate burden despite contributing the least to global emissions. KCIC responds by helping climate-smart enterprises build practical solutions that can scale through finance, markets, and partnerships.
            </p>
          </div>

          <div
            data-climate-reveal
            className="grid gap-px border border-[#2d4633] bg-[#2d4633] sm:grid-cols-3"
          >
            <div className="bg-[#17291d] p-5 sm:p-6">
              <p className="text-4xl font-bold leading-none text-[#80c738] sm:text-5xl">
                2.6%
              </p>
              <p className="mt-3 text-sm leading-6 text-[#d8e4d3]">
                projected annual GDP loss for Kenya by 2030 due to climate impacts.
              </p>
            </div>
            <div className="bg-[#17291d] p-5 sm:p-6">
              <p className="text-4xl font-bold leading-none text-[#80c738] sm:text-5xl">
                3
              </p>
              <p className="mt-3 text-sm leading-6 text-[#d8e4d3]">
                priority risk areas shown here: ecosystems, pollution, and biodiversity.
              </p>
            </div>
            <div className="bg-[#17291d] p-5 sm:p-6">
              <p className="text-4xl font-bold leading-none text-[#80c738] sm:text-5xl">
                1
              </p>
              <p className="mt-3 text-sm leading-6 text-[#d8e4d3]">
                market-led response: support enterprises that can deliver climate solutions.
              </p>
            </div>
          </div>

          <div data-climate-reveal className="grid gap-4 md:grid-cols-3">
            {impactAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article key={area.title} className="border border-[#2d4633] bg-[#14251a] p-5">
                  <div className="mb-5 grid h-11 w-11 place-items-center bg-[#243b2a] text-[#80c738]">
                    <Icon className="h-5 w-5" weight="bold" aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-[#fbf7e8]">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#c7d5c2]">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <aside data-climate-reveal className="grid content-start gap-5">
          <div data-climate-image className="relative min-h-[360px] overflow-hidden bg-[#203929] sm:min-h-[480px]">
            <Image
              src="/images/sectors/nature.jpg"
              alt="Green landscape representing the natural systems affected by climate change"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#102016]/24" aria-hidden />
            <div className="absolute bottom-0 left-0 right-0 border-t border-[#fbf7e8]/18 bg-[#102016]/86 p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Warning className="mt-1 h-5 w-5 shrink-0 text-[#80c738]" weight="bold" aria-hidden />
                <p className="text-sm leading-6 text-[#eef7e8]">
                  Climate pressure becomes an enterprise challenge when supply chains, customers, infrastructure, and livelihoods are disrupted.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-[#2d4633] bg-[#fbf7e8] p-6 text-[#102016]">
            <p className="text-sm font-semibold text-[#4d7822]">
              KCIC response
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight">
              From risk context to enterprise action.
            </h3>
            <ul className="mt-5 space-y-3">
              {responsePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-medium leading-6 text-[#34432f]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#80c738]" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/impact"
              className="mt-6 inline-flex items-center gap-2 bg-[#80c738] px-5 py-3 text-sm font-semibold text-[#102016] transition hover:bg-[#9ddf4b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738]"
            >
              See KCIC impact
              <ArrowRight className="h-4 w-4" weight="bold" aria-hidden />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
