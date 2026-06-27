'use client';

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { ImpactPageShell } from '@/components/impact/ImpactPageShell';
import { ImpactSectionNav } from '@/components/impact/ImpactSectionNav';
import { nearTermTargets, vision2030Targets } from '@/data/impact';

export function ImpactTargetsContent() {
  return (
    <ImpactPageShell
      ariaLabel="Vision 2030. Where we're headed."
      badge="Our targets"
      line1="Vision 2030."
      line2="Where we're headed."
      body="Ambitious goals for enterprise support, climate finance, green jobs, and emissions reduction across Kenya and East Africa."
      floatStamp="2030 goals"
      floatCard1Label="Enterprises"
      floatCard1Value="12K+"
      floatCard2Label="Green jobs"
      floatCard2Value="100K"
    >
      <div data-impact-nav className="mb-10">
        <ImpactSectionNav activeHref="/impact/targets" />
      </div>

      <section aria-label="Vision 2030 targets">
        <p className="w-fit -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase shadow-[4px_4px_0_#101010]">
          Vision 2030
        </p>
        <h2 className="mt-6 text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
          Long-range performance targets.
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {vision2030Targets.map((target, index) => (
            <div
              key={target.label}
              data-impact-panel
              className={`border-[5px] border-[#101010] bg-[#fff7df] p-5 shadow-[8px_8px_0_#101010] ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
            >
              <p className="text-3xl font-black uppercase leading-none text-[#4f8618]">{target.value}</p>
              <p className="mt-4 text-sm font-black uppercase">{target.label}</p>
              {target.subdescription && (
                <p className="mt-2 text-sm font-medium text-[#58523f]">{target.subdescription}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-label="Near-term goals">
        <p className="w-fit rotate-1 border-[3px] border-[#101010] bg-[#101010] px-3 py-1 text-sm font-black uppercase text-[#fff7df] shadow-[4px_4px_0_#80c738]">
          Near-term goals
        </p>
        <h2 className="mt-6 text-3xl font-black uppercase leading-[0.95] sm:text-4xl">
          Next phase milestones.
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {nearTermTargets.map((target, index) => (
            <div
              key={target.label}
              data-impact-panel
              className={`border-[5px] border-[#101010] bg-[#fff7df] p-5 shadow-[8px_8px_0_#101010] ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            >
              <p className="text-3xl font-black uppercase leading-none">{target.value}</p>
              <p className="mt-4 text-sm font-black uppercase text-[#58523f]">{target.label}</p>
              <p className="mt-2 text-sm font-medium leading-6 text-[#28261d]">{target.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        data-impact-panel
        className="mt-12 border-[5px] border-[#101010] bg-[#fff7df] p-8 shadow-[10px_10px_0_#101010] sm:flex sm:items-center sm:justify-between sm:gap-8"
      >
        <div>
          <h2 className="text-3xl font-black uppercase leading-none">Read the reports.</h2>
          <p className="mt-4 max-w-xl text-base font-medium leading-7 text-[#28261d]">
            Download annual and research reports documenting KCIC&apos;s progress and outcomes.
          </p>
        </div>
        <Link
          href="/impact/reports"
          className="mt-6 inline-flex shrink-0 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-5 py-3 text-sm font-black uppercase shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 sm:mt-0"
        >
          Impact reports
          <ArrowRight className="h-5 w-5" weight="bold" />
        </Link>
      </section>
    </ImpactPageShell>
  );
}
