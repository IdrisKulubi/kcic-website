"use client";

import type { FlagshipFunderLogo, FlagshipProgrammeContent } from "@/data/flagship-programmes";
import type { ProgrammeWithSponsors } from "@/lib/actions/programmes";
import Image from "next/image";
import { AgriBizKenyaMap } from "./AgriBizKenyaMap";
import { FlagshipApproach } from "./FlagshipApproach";
import { FlagshipFeaturedStories } from "./FlagshipFeaturedStories";
import { FlagshipImpactGrid } from "./FlagshipImpactGrid";
import { FlagshipOutcomes } from "./FlagshipOutcomes";
import { FlagshipSectionHeading } from "./FlagshipSectionHeading";
import { FlagshipStrategicPartners } from "./FlagshipStrategicPartners";

function FundedByStrip({ items, id }: { items: FlagshipFunderLogo[]; id: string }) {
  return (
    <section className="mb-16 sm:mb-20" aria-labelledby={id}>
      <FlagshipSectionHeading id={id}>Funded by</FlagshipSectionHeading>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center gap-3 border-[3px] border-[#101010] bg-[#fff7df] px-6 py-5 shadow-[5px_5px_0_#101010]"
          >
            <div className="relative h-12 w-32">
              <Image src={item.logoSrc} alt={item.name} fill className="object-contain" sizes="128px" />
            </div>
            <span className="max-w-40 text-center text-xs font-medium text-[#58523f]">{item.name}</span>
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
    <div id="programme-details" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
  );
}
