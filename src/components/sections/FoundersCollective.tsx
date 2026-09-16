"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TrendUp,
  UsersThree,
  Rocket,
  BookOpen,
  Megaphone,
  Gift,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { colors, typography } from "@/lib/design-system";
import { FOUNDERS_COLLECTIVE_PATH } from "@/data/founders-collective";

const benefits = [
  {
    title: "Grow your business",
    description:
      "Expert support, strategic guidance, and connections to finance, markets, and opportunities.",
    icon: TrendUp,
    color: colors.primary.green.DEFAULT,
  },
  {
    title: "Expand your network",
    description:
      "Connect with fellow founders, industry leaders, investors, and development partners.",
    icon: UsersThree,
    color: colors.primary.blue.DEFAULT,
  },
  {
    title: "Scale with confidence",
    description:
      "Exclusive opportunities that accelerate enterprise growth and unlock new markets.",
    icon: Rocket,
    color: colors.primary.green.DEFAULT,
  },
  {
    title: "Learn continuously",
    description:
      "Industry insights, expert-led sessions, practical resources, and emerging trends.",
    icon: BookOpen,
    color: colors.primary.blue.DEFAULT,
  },
  {
    title: "Increase your visibility",
    description:
      "Showcase your enterprise through KCIC platforms, events, media, and networking.",
    icon: Megaphone,
    color: colors.primary.green.DEFAULT,
  },
  {
    title: "Exclusive member benefits",
    description:
      "Preferential pricing, partner discounts, and value-added services for your business.",
    icon: Gift,
    color: colors.primary.blue.DEFAULT,
  },
];

interface FoundersCollectiveSectionProps {
  className?: string;
}

export default function FoundersCollective({
  className = "",
}: FoundersCollectiveSectionProps) {
  const { shouldDisableAnimations } = useAccessibilityClasses();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations()) return;
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cards = gridRef.current?.querySelectorAll(".benefit-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="founders-collective-heading"
      className={`relative overflow-hidden py-12 sm:py-14 lg:py-16 ${className}`}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <h2
            id="founders-collective-heading"
            className="font-bold text-[#1b3a1a]"
            style={{
              fontSize: "clamp(1.55rem, 3vw, 2.25rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: typography.lineHeights.tight,
              letterSpacing: "-0.02em",
            }}
          >
            Join the Founders Collective
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full"
            style={{ background: colors.primary.green.DEFAULT }}
            aria-hidden
          />
          <p
            className="mt-6 text-gray-700"
            style={{
              fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            The Founders Collective is an exclusive alumni community bringing
            together climate entrepreneurs committed to building resilient
            businesses, creating impact, and driving Africa&apos;s green
            transition. Designed for enterprises ready for their next stage of
            growth, the network provides continued access to opportunities,
            partnerships, knowledge, and a vibrant community of innovators.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <h3
            className="mb-6 text-center font-semibold text-[#1b3a1a]"
            style={{
              fontSize: "clamp(1.1rem, 1.4vw, 1.25rem)",
              fontFamily: typography.fonts.heading,
            }}
          >
            Why Join?
          </h3>
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5"
          >
            {benefits.map((item) => (
              <div
                key={item.title}
                className="benefit-card rounded-xl border border-[#80c738]/25 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg border"
                  style={{
                    background: `${item.color}12`,
                    borderColor: `${item.color}30`,
                  }}
                >
                  <item.icon
                    className="h-6 w-6"
                    style={{ color: item.color }}
                    aria-hidden
                  />
                </div>
                <h4
                  className="mb-2 font-semibold text-gray-900"
                  style={{
                    fontSize: "clamp(0.95rem, 1vw, 1rem)",
                    fontFamily: typography.fonts.heading,
                  }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-gray-600"
                  style={{
                    fontSize: "clamp(0.8125rem, 0.95vw, 0.9rem)",
                    fontFamily: typography.fonts.body,
                    lineHeight: typography.lineHeights.normal,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center text-center sm:mt-12">
          <p
            className="mb-6 max-w-2xl text-gray-700"
            style={{
              fontSize: "clamp(0.9rem, 1.05vw, 1rem)",
              fontFamily: typography.fonts.body,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            The Founders Collective is more than an alumni network—it&apos;s a
            community that empowers climate entrepreneurs to continue innovating,
            growing, and creating lasting impact. Become part of a network
            that&apos;s shaping the future of climate innovation.
          </p>
          <Button
            className="rounded-full px-8 py-3 font-semibold shadow-md transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: colors.primary.green.DEFAULT,
              color: "white",
              fontFamily: typography.fonts.body,
            }}
            asChild
          >
            <Link
              href={FOUNDERS_COLLECTIVE_PATH}
              aria-label="View more about the Founders Collective"
            >
              View more
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
