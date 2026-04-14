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
    <div ref={heroRef} className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={programme.headerImage || programme.image}
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <Link
          href="/programmes"
          className="inline-block text-white/70 hover:text-white text-sm mb-8 transition-colors"
        >
          ← Back to programmes
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {flagship.heroEyebrow ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white/90 rounded-full text-xs font-medium mb-4 border border-white/10">
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

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{programme.title}</h1>

            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 max-w-xl">{lead}</p>

            <FlagshipCtaRow ctas={flagship.ctas} programme={programme} />
          </div>

          <div className="hidden lg:block">
            <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-lg">
              <div className="aspect-[4/3] relative">
                <Image src={programme.image} alt={programme.title} fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ backgroundColor: programme.color }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
