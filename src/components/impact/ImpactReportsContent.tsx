'use client';

import Link from 'next/link';
import { ArrowSquareOut, DownloadSimple } from '@phosphor-icons/react';
import { ImpactPageShell } from '@/components/impact/ImpactPageShell';
import { ImpactSectionNav } from '@/components/impact/ImpactSectionNav';
import { impactReports } from '@/data/impact';

export function ImpactReportsContent() {
  return (
    <ImpactPageShell
      ariaLabel="Impact reports. Read the proof."
      badge="Impact reports"
      line1="Impact reports."
      line2="Read the proof."
      body="Annual and research reports documenting KCIC outcomes, enterprise case studies, and sector insights. More publications are available in the newsroom."
      floatStamp="Report desk"
      floatCard1Label="Reports"
      floatCard1Value={String(impactReports.length)}
      floatCard2Label="Archive"
      floatCard2Value="Live"
    >
      <div data-impact-nav className="mb-10">
        <ImpactSectionNav activeHref="/impact/reports" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {impactReports.map((report, index) => (
          <article
            key={report.title}
            data-impact-panel
            className={`flex h-full flex-col border-[5px] border-[#101010] bg-[#fff7df] p-6 shadow-[10px_10px_0_#101010] sm:p-7 ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#101010]">
                {report.year}
              </span>
              <span className="border-[3px] border-[#101010] bg-[#101010] px-3 py-1 text-xs font-black uppercase text-[#fff7df]">
                {report.type}
              </span>
            </div>
            <h2 className="mt-6 text-2xl font-black uppercase leading-tight">{report.title}</h2>
            <p className="mt-4 flex-1 text-base font-medium leading-7 text-[#28261d]">{report.description}</p>
            <a
              href={report.href}
              className="mt-8 inline-flex items-center justify-between gap-3 border-[3px] border-[#101010] bg-[#80c738] px-4 py-3 text-sm font-black uppercase shadow-[5px_5px_0_#101010] transition hover:-translate-y-1"
            >
              View publications
              <ArrowSquareOut className="h-5 w-5" weight="bold" />
            </a>
          </article>
        ))}
      </div>

      <section
        data-impact-panel
        className="mt-12 grid gap-6 border-[5px] border-[#101010] bg-[#fff7df] p-6 shadow-[10px_10px_0_#101010] lg:grid-cols-[1fr_auto] lg:items-center lg:p-8"
      >
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-black uppercase">
            <DownloadSimple className="h-6 w-6 text-[#5a8f1d]" weight="bold" />
            More publications
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#28261d]">
            Browse the full publications library in the newsroom for research briefs, sector analyses, and policy
            reports.
          </p>
        </div>
        <Link
          href="/newsroom/publications"
          className="inline-flex w-fit items-center gap-2 border-[3px] border-[#101010] bg-[#101010] px-5 py-3 text-sm font-black uppercase text-[#fff7df] shadow-[6px_6px_0_#80c738] transition hover:-translate-y-1"
        >
          Go to publications
          <ArrowSquareOut className="h-5 w-5" weight="bold" />
        </Link>
      </section>
    </ImpactPageShell>
  );
}
