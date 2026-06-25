'use client';

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { ImpactPageShell } from '@/components/impact/ImpactPageShell';
import { ImpactSectionNav } from '@/components/impact/ImpactSectionNav';
import { theoryOfChangeSteps } from '@/data/impact';

export function ImpactTheoryContent() {
  return (
    <ImpactPageShell
      ariaLabel="How change happens. Our theory."
      badge="Theory of change"
      line1="How change happens."
      line2="Our theory."
      body="KCIC's approach connects enterprise support, finance, and market access into a repeatable pathway for climate impact across East Africa."
      floatStamp="Change map"
      floatCard1Label="Stages"
      floatCard1Value="5"
      floatCard2Label="Focus"
      floatCard2Value="Climate SMEs"
    >
      <div data-impact-nav className="mb-10">
        <ImpactSectionNav activeHref="/impact/theory-of-change" />
      </div>

      <div className="space-y-8">
        {theoryOfChangeSteps.map((step, index) => (
          <article
            key={step.step}
            data-impact-panel
            className={`border-[5px] border-[#101010] bg-[#fff7df] p-6 shadow-[10px_10px_0_#101010] sm:p-8 ${index % 2 === 0 ? '-rotate-[0.35deg]' : 'rotate-[0.35deg]'}`}
          >
            <div className="flex flex-wrap items-start gap-5">
              <span className="grid h-16 w-16 place-items-center border-[4px] border-[#101010] bg-[#80c738] text-2xl font-black shadow-[5px_5px_0_#101010]">
                {step.step}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="w-fit border-[3px] border-[#101010] bg-[#101010] px-3 py-1 text-sm font-black uppercase text-[#fff7df] shadow-[4px_4px_0_#80c738]">
                  {step.title}
                </h2>
                <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[#28261d]">{step.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section
        data-impact-panel
        className="mt-12 border-[5px] border-[#101010] bg-[#fff7df] p-8 shadow-[10px_10px_0_#101010] sm:flex sm:items-center sm:justify-between sm:gap-8"
      >
        <div>
          <h2 className="text-3xl font-black uppercase leading-none">See our targets.</h2>
          <p className="mt-4 max-w-xl text-base font-medium leading-7 text-[#28261d]">
            Explore the metrics and goals that guide KCIC&apos;s next phase of climate enterprise support.
          </p>
        </div>
        <Link
          href="/impact/targets"
          className="mt-6 inline-flex shrink-0 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-5 py-3 text-sm font-black uppercase shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 sm:mt-0"
        >
          Our targets
          <ArrowRight className="h-5 w-5" weight="bold" />
        </Link>
      </section>
    </ImpactPageShell>
  );
}
