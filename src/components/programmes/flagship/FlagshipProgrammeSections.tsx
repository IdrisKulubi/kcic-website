"use client";

import type { FlagshipProgrammeContent } from "@/data/flagship-programmes";
import type { ProgrammeWithSponsors } from "@/lib/actions/programmes";
import Image from "next/image";
import { AgriBizKenyaMap } from "./AgriBizKenyaMap";
import { FlagshipApproach } from "./FlagshipApproach";
import { FlagshipFeaturedStories } from "./FlagshipFeaturedStories";
import { FlagshipImpactGrid } from "./FlagshipImpactGrid";
import { FlagshipOutcomes } from "./FlagshipOutcomes";
import { FlagshipStrategicPartners } from "./FlagshipStrategicPartners";

export function FlagshipProgrammeSections({
  programme,
  flagship,
}: {
  programme: ProgrammeWithSponsors;
  flagship: FlagshipProgrammeContent;
}) {
  return (
    <div id="programme-details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <FlagshipApproach title={flagship.approachTitle} blocks={flagship.approachBlocks} accentColor={programme.color} />

      {flagship.showBihMap ? <AgriBizKenyaMap accentColor={programme.color} /> : null}

      <FlagshipOutcomes title={flagship.outcomesTitle} items={flagship.outcomes} accentColor={programme.color} />

      <FlagshipImpactGrid title={flagship.impactTitle} metrics={flagship.impactMetrics} accentColor={programme.color} />

      {flagship.featuredStories ? (
        <FlagshipFeaturedStories
          title={flagship.featuredStories.title}
          intro={flagship.featuredStories.intro}
          links={flagship.featuredStories.links}
        />
      ) : null}

      {programme.sponsors.length > 0 && !flagship.strategicPartners ? (
        <section className="mb-20 border-t border-gray-200 pt-14" aria-labelledby="flagship-funded-heading">
          <h2 id="flagship-funded-heading" className="text-lg font-semibold tracking-tight text-gray-900 mb-6 text-center">
            Funded by
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {programme.sponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex flex-col items-center gap-2">
                <div className="relative h-14 w-36">
                  <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" sizes="144px" />
                </div>
                <span className="text-xs text-gray-500 text-center max-w-[10rem]">{sponsor.name}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

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
