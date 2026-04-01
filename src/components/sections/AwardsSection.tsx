"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { colors, typography, effects } from "@/lib/design-system";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image-utils";

interface AwardItem {
  title: string;
  subtitle?: string;
  image: string; // public path
}

// Default data — replace image paths with your real award images in /public/images/awards
const DEFAULT_AWARDS: AwardItem[] = [
  {
    title: "SME Enabler of the Year 2024/2025",
    subtitle: "KEPSA",
    image: "/images/awards/kepsa.jpg",
  },
  {
    title: "Circular Economy Financier of the Year",
    subtitle: "2024 CE Conference",
    image: "/images/awards/financier.jpg",
  },
  {
    title: "Green Economy Champion of the Year",
    subtitle: "2025",
    image: "/images/awards/assekk.jpg",
  },
];

export default function AwardsSection({ awards = DEFAULT_AWARDS }: { awards?: AwardItem[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title reveal
      const title = sectionRef.current!.querySelector("[data-awards-title]");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Cards stagger
      const cards = gsap.utils.toArray<HTMLElement>("[data-award-card]");
      gsap.set(cards, { opacity: 0, y: 34, rotateX: -6 });
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }),
        onEnterBack: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 }),
        onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 24, rotateX: -4, duration: 0.3, ease: "power1.out" }),
      });

      // Subtle parallax on grid
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="awards-heading" className="relative isolate py-12 sm:py-14">
      {/* Atmospheric gradient base */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            `radial-gradient(60% 50% at 20% 40%, ${colors.primary.green["50"]} 0%, transparent 60%),` +
            `radial-gradient(60% 50% at 80% 60%, ${colors.primary.blue["50"]} 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12" data-awards-title>
          <h2
            id="awards-heading"
            className="font-bold tracking-tight inline-block"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
              background: colors.gradients.primary,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Awards & Recognition
          </h2>
          <div
            className="mt-3 text-gray-300"
            style={{
              fontFamily: typography.fonts.body,
              fontSize: "clamp(0.95rem, 1.2vw, 1rem)",
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Celebrating milestones from our ecosystem partners and industry bodies
          </div>
        </div>

        {/* Awards grid */}
        <div ref={gridRef} className="relative grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {awards.map((award, i) => (
            <article
              key={i}
              data-award-card
              className="group relative overflow-hidden rounded-2xl border border-white/22 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.45),0_4px_12px_-4px_rgba(0,0,0,0.25)] ring-1 ring-white/30 transition-[box-shadow,border-color] duration-300 hover:border-white/35 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_10px_24px_-8px_rgba(0,0,0,0.3)] hover:ring-white/40"
              style={{ backdropFilter: `blur(6px)` }}
            >
              {/* Glow border on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{ boxShadow: effects.shadows.glow.mixed }}
              />

              <div className="relative h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3
                  className="font-bold text-slate-900"
                  style={{
                    fontFamily: typography.fonts.heading,
                    fontSize: "clamp(1.05rem, 1.35vw, 1.2rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {award.title}
                </h3>
                {award.subtitle && (
                  <p
                    className="mt-2 text-slate-600"
                    style={{
                      fontFamily: typography.fonts.body,
                      fontSize: "0.875rem",
                      lineHeight: typography.lineHeights.normal,
                    }}
                  >
                    {award.subtitle}
                  </p>
                )}
              </div>

              {/* Tilt effect on hover via CSS vars updated by pointer */}
              <div
                className="absolute inset-0"
                onMouseMove={(e) => {
                  const el = e.currentTarget.parentElement as HTMLElement;
                  const r = el.getBoundingClientRect();
                  const rx = ((e.clientY - r.top) / r.height - 0.5) * -6; // rotateX
                  const ry = ((e.clientX - r.left) / r.width - 0.5) * 8; // rotateY
                  el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget.parentElement as HTMLElement;
                  el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
