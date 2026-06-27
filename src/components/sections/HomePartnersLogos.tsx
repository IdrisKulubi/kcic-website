"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import {
  gsap,
  marqueeLoop,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from "@/lib/gsap-foundation";
import type { PartnerData } from "./PartnersSection";

function PartnerTickerLogo({ partner }: { partner: PartnerData }) {
  return (
    <div className="mx-3 flex h-20 w-40 shrink-0 items-center justify-center border-[3px] border-[#101010] bg-[#fff7df] px-4 shadow-[4px_4px_0_#101010] sm:h-24 sm:w-44 sm:px-5 sm:shadow-[5px_5px_0_#101010]">
      <div className="relative h-12 w-full sm:h-14">
        <Image
          src={partner.logo || "/images/placeholder-logo.png"}
          alt={partner.name}
          fill
          unoptimized
          sizes="176px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function HomePartnersLogos({ partners }: { partners: PartnerData[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { topRow, bottomRow, safePartners } = useMemo(() => {
    const filtered = partners.filter((partner) => partner.id && partner.logo);
    const midpoint = Math.ceil(filtered.length / 2);
    const first = filtered.slice(0, midpoint);
    const second = filtered.slice(midpoint);
    const fallbackSecond = second.length > 0 ? second : first;

    return {
      topRow: [...first, ...first, ...first, ...first],
      bottomRow: [...fallbackSecond, ...fallbackSecond, ...fallbackSecond, ...fallbackSecond],
      safePartners: filtered,
    };
  }, [partners]);

  useLayoutEffect(() => {
    if (!sectionRef.current || safePartners.length === 0) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    let cleanupHoverPause: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const leftMarquee = marqueeLoop("[data-home-partner-marquee-left]", { duration: 100 });
      const rightMarquee = gsap.to("[data-home-partner-marquee-right]", {
        xPercent: 50,
        duration: 100,
        repeat: -1,
        ease: "none",
      });

      const pauseMarquees = () => {
        leftMarquee.pause();
        rightMarquee.pause();
      };
      const resumeMarquees = () => {
        leftMarquee.resume();
        rightMarquee.resume();
      };

      const rails = gsap.utils.toArray<HTMLElement>("[data-home-partner-rail]");
      rails.forEach((rail) => {
        rail.addEventListener("pointerenter", pauseMarquees);
        rail.addEventListener("pointerleave", resumeMarquees);
        rail.addEventListener("focusin", pauseMarquees);
        rail.addEventListener("focusout", resumeMarquees);
      });

      cleanupHoverPause = () => {
        rails.forEach((rail) => {
          rail.removeEventListener("pointerenter", pauseMarquees);
          rail.removeEventListener("pointerleave", resumeMarquees);
          rail.removeEventListener("focusin", pauseMarquees);
          rail.removeEventListener("focusout", resumeMarquees);
        });
      };

      gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    }, sectionRef);

    return () => {
      cleanupHoverPause?.();
      ctx.revert();
    };
  }, [safePartners.length]);

  if (safePartners.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-label="Partner logos"
      className="relative isolate overflow-hidden border-y-[5px] border-[#101010] bg-[#80c738] py-5 sm:py-6"
    >
      <div className="space-y-3 sm:space-y-4">
        <div data-home-partner-rail className="overflow-hidden">
          <div data-home-partner-marquee-left className="flex w-max">
            {topRow.map((partner, index) => (
              <PartnerTickerLogo key={`top-${partner.id}-${index}`} partner={partner} />
            ))}
          </div>
        </div>
        <div data-home-partner-rail className="overflow-hidden">
          <div data-home-partner-marquee-right className="flex w-max -translate-x-1/2">
            {bottomRow.map((partner, index) => (
              <PartnerTickerLogo key={`bottom-${partner.id}-${index}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center px-4 sm:mt-6">
        <Link
          href="/how-we-work/partners"
          className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-5 py-2.5 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#101010] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738]"
        >
          View all partners
          <ArrowRight className="h-4 w-4" weight="bold" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
