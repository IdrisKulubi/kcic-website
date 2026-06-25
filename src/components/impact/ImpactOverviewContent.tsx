'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Buildings,
  CurrencyDollar,
  Leaf,
  UsersThree,
} from '@phosphor-icons/react';
import { ImpactPageShell } from '@/components/impact/ImpactPageShell';
import { ImpactSectionNav } from '@/components/impact/ImpactSectionNav';
import { impactAreas, mainStats, successStories } from '@/data/impact';

const areaIcons = [Leaf, UsersThree, CurrencyDollar, Buildings];

export function ImpactOverviewContent() {
  return (
    <ImpactPageShell
      ariaLabel="Measurable impact. Real results."
      badge="Impact"
      line1="Measurable impact."
      line2="Real results."
      body="Real results from our climate innovation programmes across Kenya and Africa. See how we drive sustainable change through entrepreneurship."
      floatStamp="Impact desk"
      floatCard1Label="SMEs supported"
      floatCard1Value="450+"
      floatCard2Label="Green jobs"
      floatCard2Value="2,500+"
    >
      <div data-impact-nav className="mb-10">
        <ImpactSectionNav activeHref="/impact" />
      </div>

      <section aria-label="Key impact metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mainStats.map((stat, index) => (
          <div
            key={stat.label}
            data-impact-panel
            className={`border-[5px] border-[#101010] bg-[#fff7df] p-5 shadow-[8px_8px_0_#101010] ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
          >
            <p className="text-4xl font-black uppercase leading-none">{stat.value}</p>
            <p className="mt-4 text-sm font-black uppercase text-[#58523f]">{stat.label}</p>
            <p className="mt-2 text-sm font-medium leading-6 text-[#28261d]">{stat.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-16" aria-label="Impact dimensions">
        <p className="w-fit -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase shadow-[4px_4px_0_#101010]">
          All dimensions
        </p>
        <h2 className="mt-6 text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
          Impact across every dimension.
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {impactAreas.map((area, index) => {
            const Icon = areaIcons[index] ?? Leaf;
            return (
              <article
                key={area.title}
                data-impact-panel
                className={`border-[5px] border-[#101010] bg-[#fff7df] p-6 shadow-[10px_10px_0_#101010] sm:p-7 ${index % 2 === 0 ? '-rotate-[0.35deg]' : 'rotate-[0.35deg]'}`}
              >
                <div className="flex items-center gap-4 border-b-[4px] border-[#101010] pb-5">
                  <div className="grid h-14 w-14 place-items-center border-[4px] border-[#101010] bg-[#80c738] shadow-[4px_4px_0_#101010]">
                    <Icon className="h-7 w-7" weight="bold" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-black uppercase">{area.title}</h3>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {area.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-black uppercase leading-none text-[#4f8618]">{stat.value}</p>
                      <p className="mt-2 text-xs font-bold uppercase text-[#58523f]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-16" aria-label="Success stories">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-black uppercase leading-[0.95]">Success stories.</h2>
          <Link
            href="/impact/stories"
            className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
          >
            All stories
            <ArrowRight className="h-4 w-4" weight="bold" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {successStories.map((story, index) => (
            <article
              key={story.company}
              data-impact-panel
              className={`relative border-[5px] border-[#101010] bg-[#fff7df] p-5 shadow-[10px_10px_0_#101010] ${index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : ''}`}
            >
              <span className="absolute -right-2 top-6 rotate-6 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#101010]">
                Story
              </span>
              <p className="text-xs font-black uppercase text-[#58523f]">{story.sector}</p>
              <h3 className="mt-3 text-2xl font-black uppercase leading-tight">{story.company}</h3>
              <p className="mt-4 text-base font-medium leading-7 text-[#28261d]">{story.impact}</p>
              <div className="mt-6 space-y-2 border-t-[4px] border-[#101010] pt-4 text-sm font-bold">
                <div className="flex justify-between gap-4">
                  <span className="text-[#58523f]">Funding</span>
                  <span>{story.funding}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#58523f]">Jobs</span>
                  <span>{story.jobs}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        data-impact-panel
        className="mt-16 border-[5px] border-[#101010] bg-[#101010] p-8 text-center text-[#fff7df] shadow-[10px_10px_0_#80c738] sm:p-10"
      >
        <h2 className="text-3xl font-black uppercase sm:text-4xl">Be part of our impact story.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-8 text-[#fff7df]/90">
          Join hundreds of climate entrepreneurs creating measurable environmental and social impact across Africa.
        </p>
        <Link
          href="/programmes"
          className="mt-8 inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1"
        >
          Join our programmes
          <ArrowRight className="h-5 w-5" weight="bold" />
        </Link>
      </section>
    </ImpactPageShell>
  );
}
