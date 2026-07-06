"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  ChartLineUp,
  GlobeHemisphereEast,
  Leaf,
  MapPinArea,
  Target,
  UsersThree,
} from "@phosphor-icons/react";
import {
  gsap,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from "@/lib/gsap-foundation";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";

interface StatItem {
  value: string;
  description: string;
  suffix?: string;
  subdescription?: string;
}

interface MinimalStatsSectionProps {
  stats: StatItem[];
  targets?: StatItem[];
  showToggle?: boolean;
  variant?: "light" | "dark";
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
}

const metricIcons = [
  Briefcase,
  ChartLineUp,
  UsersThree,
  Leaf,
  Target,
  GlobeHemisphereEast,
  MapPinArea,
  ChartLineUp,
];

const contextPoints = [
  {
    title: "Regional reach",
    description: "Active across Kenya, Uganda, and Tanzania.",
    icon: MapPinArea,
  },
  {
    title: "Ecosystem partnerships",
    description: "Working with public, private, and development partners.",
    icon: UsersThree,
  },
  {
    title: "Sustainable growth",
    description: "Enterprises solving real climate and community challenges.",
    icon: Leaf,
  },
];

export function MinimalStatsSection({
  stats,
  targets,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imageSide = "left",
}: MinimalStatsSectionProps) {
  const [activeView, setActiveView] = useState<"impact" | "targets">("impact");
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const activeStats = activeView === "targets" && targets ? targets : stats;
  const featuredStats = activeStats.slice(0, 4);
  const supportingStats = activeStats.slice(4, 8);

  const activeLabel = activeView === "targets" ? "2030 Targets" : "13 Years On";
  const activeNarrative = useMemo(() => {
    if (activeView === "targets") {
      return "Looking ahead, KCIC is scaling what works, deepening impact, and preparing thousands more enterprises to build a climate-resilient Africa.";
    }

    return "Data reflects cumulative KCIC progress to date, showing how enterprise support translates into jobs, finance, emissions mitigation, and stronger markets.";
  }, [activeView]);

  useLayoutEffect(() => {
    if (shouldDisableAnimations() || prefersReducedMotion() || !sectionRef.current) return;

    registerGsapFoundation();

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 24,
          autoAlpha: 0,
          immediateRender: false,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.from("[data-impact-reveal]", {
        y: 26,
        autoAlpha: 0,
        immediateRender: false,
        duration: 0.72,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  const renderMetric = (stat: StatItem, index: number, compact = false) => {
    const Icon = metricIcons[index % metricIcons.length];

    return (
      <article
        key={`${activeView}-${stat.description}-${index}`}
        data-impact-reveal
        className={`border border-[#2d4633] bg-[#14251a] ${
          compact ? "p-5" : "p-6 sm:p-7"
        }`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="grid h-11 w-11 place-items-center border border-[#80c738]/50 text-[#80c738]">
            <Icon className="h-5 w-5" weight="bold" aria-hidden />
          </div>
          <span className="text-xs font-semibold text-[#7f9278]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p
          className={`font-bold leading-none text-[#80c738] ${
            compact ? "text-3xl" : "text-[3rem] sm:text-[4rem]"
          }`}
        >
          {stat.value}
        </p>
        <h3 className="mt-3 text-lg font-bold leading-snug text-[#fbf7e8]">
          {stat.description}
        </h3>
        {stat.subdescription ? (
          <p className="mt-3 text-sm leading-6 text-[#c7d5c2]">
            {stat.subdescription}
          </p>
        ) : null}
      </article>
    );
  };

  return (
    <section
      id="impact-section"
      ref={sectionRef}
      aria-labelledby="impact-section-heading"
      className="relative isolate overflow-hidden bg-[#071a12] py-16 text-[#fbf7e8] sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,199,56,0.14) 0%, rgba(7,26,18,0) 32%), radial-gradient(circle at 84% 22%, rgba(0,173,221,0.12) 0%, rgba(0,173,221,0) 26%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div
          ref={headerRef}
          className="mb-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end"
        >
          <div>
            <p className="mb-4 text-sm font-semibold text-[#80c738]">
              Impact snapshot
            </p>
            <h2
              id="impact-section-heading"
              className="max-w-[760px] text-[2.25rem] font-bold leading-[1.08] text-[#fbf7e8] sm:text-[3.2rem] lg:text-[4rem]"
              style={{
                fontFamily:
                  "Montserrat, 'Century Gothic', Aptos, Arial, Helvetica, sans-serif",
                letterSpacing: "0",
              }}
            >
              {title || "Our Impact Journey"}
            </h2>
            {subtitle ? (
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#d8e4d3] sm:text-lg sm:leading-8">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center lg:justify-self-end">
            {targets ? (
              <div
                className="inline-grid grid-cols-2 border border-[#d8e4d3]/70 p-1"
                role="tablist"
                aria-label="Impact data view"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeView === "impact"}
                  onClick={() => setActiveView("impact")}
                  className={`px-5 py-3 text-sm font-semibold transition sm:min-w-[150px] ${
                    activeView === "impact"
                      ? "bg-[#80c738] text-[#102016]"
                      : "text-[#fbf7e8] hover:bg-[#173121]"
                  }`}
                >
                  13 Years On
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeView === "targets"}
                  onClick={() => setActiveView("targets")}
                  className={`px-5 py-3 text-sm font-semibold transition sm:min-w-[150px] ${
                    activeView === "targets"
                      ? "bg-[#80c738] text-[#102016]"
                      : "text-[#fbf7e8] hover:bg-[#173121]"
                  }`}
                >
                  2030 Targets
                </button>
              </div>
            ) : null}

            <p className="max-w-xs border-l border-[#80c738] pl-4 text-sm leading-6 text-[#d8e4d3]">
              {activeLabel} data, reviewed as public homepage proof points.
            </p>
          </div>
        </div>

        <div
          className={`grid gap-5 lg:grid-cols-[0.95fr_1.05fr] ${
            imageSide === "right" ? "lg:[&>.impact-map-panel]:order-last" : ""
          }`}
        >
          <aside
            data-impact-reveal
            className="impact-map-panel grid gap-px border border-[#2d4633] bg-[#2d4633]"
          >
            <div className="grid gap-px bg-[#2d4633] md:grid-cols-[0.95fr_1.05fr] lg:grid-cols-1 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-[#102016] p-6 sm:p-7">
                <h3 className="max-w-md text-2xl font-bold leading-tight text-[#80c738]">
                  Building climate enterprises that transform lives and landscapes.
                </h3>
                <p className="mt-5 text-sm leading-6 text-[#d8e4d3]">
                  KCIC works across the region to incubate, finance, and connect climate-smart SMEs to markets, partners, and policy systems.
                </p>
              </div>
              {imageSrc ? (
                <div className="relative min-h-[260px] bg-[#203929]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt || "KCIC regional impact map"}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 45vw, 100vw"
                    className="object-contain object-center p-4"
                    priority
                  />
                </div>
              ) : null}
            </div>

            <div className="grid gap-5 bg-[#102016] p-6 sm:p-7">
              {contextPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.title} className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center border border-[#80c738]/60 text-[#80c738]">
                      <Icon className="h-5 w-5" weight="bold" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#fbf7e8]">
                        {point.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#c7d5c2]">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="grid gap-px border border-[#2d4633] bg-[#2d4633]">
            <div className="grid gap-px bg-[#2d4633] sm:grid-cols-2">
              {featuredStats.map((stat, index) => renderMetric(stat, index))}
            </div>

            {supportingStats.length > 0 ? (
              <div className="grid gap-px bg-[#2d4633] sm:grid-cols-2 xl:grid-cols-4">
                {supportingStats.map((stat, index) =>
                  renderMetric(stat, index + featuredStats.length, true)
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div
          data-impact-reveal
          className="mt-5 grid gap-4 bg-[#fbf7e8] p-5 text-[#102016] sm:grid-cols-[auto_1fr_auto] sm:items-center"
        >
          <div className="grid h-14 w-14 place-items-center bg-[#80c738] text-[#102016]">
            <ChartLineUp className="h-6 w-6" weight="bold" aria-hidden />
          </div>
          <p className="text-sm leading-6 sm:text-base">
            {activeNarrative}
          </p>
          {targets ? (
            <button
              type="button"
              onClick={() => setActiveView(activeView === "targets" ? "impact" : "targets")}
              className="inline-flex items-center justify-center bg-[#102016] px-5 py-3 text-sm font-semibold text-[#fbf7e8] transition hover:bg-[#203929] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738]"
            >
              {activeView === "targets" ? "View 13 years" : "Explore 2030 targets"}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
