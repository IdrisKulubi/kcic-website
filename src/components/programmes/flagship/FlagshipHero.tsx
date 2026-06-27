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
  flagship?: FlagshipProgrammeContent | null;
  heroRef: RefObject<HTMLDivElement | null>;
}) {
  const lead = flagship?.heroLead ?? programme.description;
  const eyebrow =
    flagship?.heroEyebrow ??
    (programme.isActive ? "Applications open" : "Programme overview");

  const imageSrc = programme.headerImage || programme.image;

  return (
    <section
      ref={heroRef}
      className="relative isolate overflow-hidden border-b-[5px] border-[#101010] bg-[#fff7df] pt-28 text-[#101010] sm:pt-32"
    >
      <div
        className="absolute inset-x-0 top-20 -z-10 h-[44px] border-y-[5px] border-[#101010] bg-[#80c738]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
        <Link
          href="/programmes"
          className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-[#58523f] transition hover:text-[#101010]"
        >
          ← All programmes
        </Link>

        <div className="border-[3px] border-[#101010] bg-[#fff7df] p-5 shadow-[8px_8px_0_#101010] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 lg:gap-10">
            <div data-hero-copy className="min-w-0 flex-1">
              <p className="mb-4 inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1.5 text-xs font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: programme.color }}
                  aria-hidden
                />
                {eyebrow}
              </p>

              <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black uppercase leading-[0.95] tracking-tight text-[#101010]">
                {programme.title}
              </h1>

              <p className="mt-4 text-sm font-medium leading-6 text-[#28261d] sm:text-base sm:leading-7">
                {lead}
              </p>

              <FlagshipCtaRow ctas={flagship?.ctas} programme={programme} />
            </div>

            <div
              data-hero-image
              className="mx-auto w-full max-w-[200px] shrink-0 sm:mx-0 sm:w-40 md:w-48 lg:w-56 xl:w-64"
            >
              <div className="rotate-2 transition hover:-translate-y-0.5 hover:rotate-1">
                <ProgrammeHeroImage
                  src={imageSrc}
                  alt={programme.title}
                  color={programme.color}
                />
              </div>

              {programme.sponsors.length > 0 && !flagship?.fundedBy?.length && !flagship?.strategicPartners ? (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 border-2 border-[#101010] bg-[#fff7df] px-3 py-2 shadow-[3px_3px_0_#101010] md:justify-start">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#58523f]">Funded by</span>
                  <div className="flex flex-wrap items-center gap-3">
                    {programme.sponsors.slice(0, 3).map((sponsor) => (
                      <div key={sponsor.id} className="relative h-6 w-14">
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          fill
                          className="object-contain object-left"
                          sizes="56px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgrammeHeroImage({
  src,
  alt,
  color,
}: {
  src: string;
  alt: string;
  color: string;
}) {
  return (
    <div className="overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[6px_6px_0_#101010]">
      <Image
        src={src}
        alt={alt}
        width={320}
        height={400}
        priority
        className="aspect-[4/5] h-auto w-full object-cover"
        sizes="(min-width: 1280px) 256px, (min-width: 768px) 192px, 220px"
      />
      <div className="h-1.5 border-t-2 border-[#101010]" style={{ backgroundColor: color }} />
    </div>
  );
}
