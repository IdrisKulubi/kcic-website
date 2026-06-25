'use client';

import { useRef, type ReactNode } from 'react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';
import { homePageData } from '@/data/home';
import { impactTicker } from '@/data/impact';
import { ImpactHeroFloat } from '@/components/impact/ImpactHeroFloat';
import { useImpactGsap } from '@/components/impact/useImpactGsap';

type ImpactPageShellProps = {
  ariaLabel: string;
  badge: string;
  line1: string;
  line2: string;
  body: string;
  floatStamp: string;
  floatCard1Label: string;
  floatCard1Value: string;
  floatCard2Label: string;
  floatCard2Value: string;
  ticker?: string[];
  children: ReactNode;
};

export function ImpactPageShell({
  ariaLabel,
  badge,
  line1,
  line2,
  body,
  floatStamp,
  floatCard1Label,
  floatCard1Value,
  floatCard2Label,
  floatCard2Value,
  ticker = impactTicker,
  children,
}: ImpactPageShellProps) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  useImpactGsap(pageRef);

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />

      <section className="relative isolate border-b-[5px] border-[#101010] pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-20 -z-10 h-[44px] border-y-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 -z-10 h-20 border-t-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
          <div data-impact-copy className="relative pt-6">
            <p className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-2 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010]">
              {badge}
            </p>
            <h1
              aria-label={ariaLabel}
              className="mt-7 overflow-hidden font-black uppercase leading-[0.88] tracking-normal text-[#101010]"
              style={{ fontSize: 'clamp(2.7rem, 7vw, 6rem)' }}
            >
              <span className="block overflow-hidden pb-1">
                <span data-impact-word className="block">
                  {line1}
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-impact-word className="inline-block bg-[#80c738] px-3 text-[#0b110d]">
                  {line2}
                </span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#28261d]">{body}</p>
          </div>

          <ImpactHeroFloat
            stamp={floatStamp}
            card1Label={floatCard1Label}
            card1Value={floatCard1Value}
            card2Label={floatCard2Label}
            card2Value={floatCard2Value}
          />
        </div>

        <div className="relative overflow-hidden border-t-[5px] border-[#101010] bg-[#101010] py-4 text-[#fff7df]">
          <div data-impact-marquee className="flex w-max gap-7 whitespace-nowrap">
            {[...ticker, ...ticker, ...ticker].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-7 text-xl font-black uppercase sm:text-2xl">
                {item}
                <span className="h-4 w-4 bg-[#80c738]" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="bg-[#fff7df] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
