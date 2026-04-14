"use client";

import type { RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FlagshipProgrammeContent } from "@/data/flagship-programmes";
import type { ProgrammeWithSponsors } from "@/lib/actions/programmes";
import { FlagshipCtaRow } from "./FlagshipCtaRow";

export function FlagshipHero({
  programme,
  flagship,
  heroRef,
}: {
  programme: ProgrammeWithSponsors;
  flagship: FlagshipProgrammeContent;
  heroRef: RefObject<HTMLDivElement | null>;
}) {
  const lead = flagship.heroLead ?? programme.description;

  return (
    <div ref={heroRef} className="relative min-h-[min(70vh,520px)] bg-gray-950 overflow-hidden lg:min-h-[min(78vh,640px)]">
      {/* Background: slight scale + blur so edges stay covered; scrims for legible type */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src={programme.headerImage || programme.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.12] blur-[2px] sm:blur-[3px] motion-reduce:blur-none motion-reduce:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/92 via-gray-950/82 to-gray-900/78" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Clear fixed MinimalNavbar (h-16 sm:h-20) + safe area so copy is not covered */}
      <div className="relative z-10 flex flex-col">
        <div className="h-16 shrink-0 sm:h-20" aria-hidden />
        <div className="max-w-7xl mx-auto w-full px-4 pb-20 pt-6 sm:px-6 sm:pb-24 sm:pt-8 lg:px-8">
        <Link
          href="/programmes"
          className="inline-block text-white/80 hover:text-white text-sm font-medium tracking-wide mb-10 transition-colors drop-shadow-sm"
        >
          ← Programmes
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {flagship.heroEyebrow ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/35 text-white rounded-full text-[11px] font-semibold uppercase tracking-wider mb-5 border border-white/15 backdrop-blur-sm">
                {flagship.heroEyebrow}
              </span>
            ) : programme.isActive ? (
              <span className="inline-block px-2.5 py-1 text-xs font-medium tracking-wide uppercase text-emerald-200/90 border border-emerald-400/30 rounded mb-6">
                Applications open
              </span>
            ) : (
              <span className="inline-block px-2.5 py-1 text-xs font-medium tracking-wide uppercase text-white/60 border border-white/15 rounded mb-6">
                Programme overview
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-[2.65rem] font-semibold text-white mb-5 leading-[1.12] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              {programme.title}
            </h1>

            <p className="text-base md:text-lg text-white/95 leading-relaxed mb-8 max-w-xl [text-shadow:0_1px_18px_rgba(0,0,0,0.5)]">
              {lead}
            </p>

            <FlagshipCtaRow ctas={flagship.ctas} programme={programme} />
          </div>

          <div className="hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50 ring-1 ring-black/20">
              <div className="aspect-4/3 relative">
                <Image
                  src={programme.image}
                  alt={programme.title}
                  fill
                  className="object-cover object-[center_30%]"
                  sizes="(min-width: 1024px) 40vw, 0px"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: programme.color }} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
