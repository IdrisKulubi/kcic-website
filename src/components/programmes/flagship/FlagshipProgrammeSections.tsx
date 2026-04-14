"use client";

import type { FlagshipFunderLogo, FlagshipProgrammeContent } from "@/data/flagship-programmes";
import type { ProgrammeWithSponsors } from "@/lib/actions/programmes";
import Image from "next/image";
import { AgriBizKenyaMap } from "./AgriBizKenyaMap";
import { FlagshipApproach } from "./FlagshipApproach";
import { FlagshipFeaturedStories } from "./FlagshipFeaturedStories";
import { FlagshipImpactGrid } from "./FlagshipImpactGrid";
import { FlagshipOutcomes } from "./FlagshipOutcomes";
import { FlagshipStrategicPartners } from "./FlagshipStrategicPartners";

function FundedByStrip({ items, id }: { items: FlagshipFunderLogo[]; id: string }) {
  return (
    <section className="mb-20 border-t border-gray-200 pt-14" aria-labelledby={id}>
      <h2 id={id} className="text-lg font-semibold tracking-tight text-gray-900 mb-6 text-center">
        Funded by
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-2">
            <div className="relative h-14 w-36">
              <Image src={item.logoSrc} alt={item.name} fill className="object-contain" sizes="144px" />
            </div>
            <span className="text-xs text-gray-500 text-center max-w-40">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FlagshipProgrammeSections({
  programme,
  flagship,
}: {
  programme: ProgrammeWithSponsors;
  flagship: FlagshipProgrammeContent;
}) {
  const configFunders = flagship.fundedBy?.length ? flagship.fundedBy : null;
  const showSponsorFallback =
    !configFunders && programme.sponsors.length > 0 && !flagship.strategicPartners;

  const sponsorStripItems: FlagshipFunderLogo[] = programme.sponsors.map((s) => ({
    name: s.name,
    logoSrc: s.logo,
  }));

  return (
    <div id="programme-details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="rounded-2xl border border-stone-200/90 bg-white px-5 py-10 shadow-sm sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <FlagshipApproach title={flagship.approachTitle} blocks={flagship.approachBlocks} accentColor={programme.color} />

      {flagship.showBihMap ? <AgriBizKenyaMap accentColor={programme.color} /> : null}

      <FlagshipOutcomes title={flagship.outcomesTitle} items={flagship.outcomes} accentColor={programme.color} />

      <FlagshipImpactGrid
        title={flagship.impactTitle}
        metrics={flagship.impactMetrics}
        accentColor={programme.color}
        impactNotes={flagship.impactNotes}
      />

      {flagship.featuredStories ? (
        <FlagshipFeaturedStories
          title={flagship.featuredStories.title}
          intro={flagship.featuredStories.intro}
          links={flagship.featuredStories.links}
        />
      ) : null}

      {configFunders ? <FundedByStrip items={configFunders} id="flagship-funded-heading" /> : null}
      {showSponsorFallback ? <FundedByStrip items={sponsorStripItems} id="flagship-funded-heading" /> : null}

      {flagship.strategicPartners ? (
        <FlagshipStrategicPartners
          title={flagship.strategicPartners.title}
          subtitle={flagship.strategicPartners.subtitle}
          partners={flagship.strategicPartners.partners}
        />
      ) : null}
      </div>
    </div>
  );
}
