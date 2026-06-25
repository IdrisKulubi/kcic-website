'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, CarIcon, CheckCircleIcon, DropIcon, PlantIcon, RecycleIcon, SunIcon, TreeIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowUpRight } from 'lucide-react';
import {
  drawSvgPaths,
  gsap,
  marqueeLoop,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from '@/lib/gsap-foundation';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';
import { homePageData } from '@/data/home';

const focusSectors = [
  {
    id: 1,
    name: 'Renewable Energy',
    shortName: 'Energy',
    code: 'RE',
    icon: SunIcon,
    description: 'Powering the future through clean, sustainable energy solutions and efficiency.',
    keyAreas: [
      'Off-grid solar and mini-grids',
      'Productive use of energy',
      'Clean cooking technologies',
      'Bioenergy and waste-to-energy systems',
      'Energy efficiency and demand-side management',
      'Green financing for energy solutions',
    ],
  },
  {
    id: 2,
    name: 'Agriculture',
    shortName: 'Agri',
    code: 'AG',
    icon: PlantIcon,
    description: 'Transforming food systems with climate-smart technologies and agribusiness innovation.',
    keyAreas: [
      'Climate-smart agriculture',
      'Agribusiness development and value addition',
      'Irrigation and water-use efficiency',
      'Post-harvest management and storage',
      'Agri-tech, precision farming, and drone use',
      'Market access and financing',
    ],
  },
  {
    id: 3,
    name: 'Water',
    shortName: 'Water',
    code: 'WA',
    icon: DropIcon,
    description: 'Ensuring water security through innovative harvesting, treatment, and management.',
    keyAreas: [
      'Water harvesting and storage technologies',
      'Wastewater recycling and reuse',
      'WASH innovations',
      'Smart irrigation systems',
      'Water quality monitoring and purification technology',
      'Integrated water resource management',
    ],
  },
  {
    id: 4,
    name: 'Circular Economy',
    shortName: 'Circular',
    code: 'CE',
    icon: RecycleIcon,
    description: 'Redefining waste as a resource through recycling, upcycling, and eco-design.',
    keyAreas: [
      'Solid waste management and recycling',
      'Green manufacturing and product lifecycle extension',
      'Upcycling and eco-design',
      'Plastic alternatives and biodegradable materials',
      'Industrial symbiosis and resource recovery',
    ],
  },
  {
    id: 5,
    name: 'Nature Based Solutions',
    shortName: 'Nature',
    code: 'NB',
    icon: TreeIcon,
    description: 'Harnessing nature to restore ecosystems, conserve biodiversity, and sequester carbon.',
    keyAreas: [
      'Ecosystem restoration and afforestation',
      'Sustainable forestry and agroforestry',
      'Blue economy and ecosystem restoration',
      'Biodiversity conservation and ecotourism',
      'Carbon credit generation',
      'Community-based natural resource management',
    ],
  },
  {
    id: 6,
    name: 'Mobility',
    shortName: 'Mobility',
    code: 'MO',
    icon: CarIcon,
    description: 'Driving the transition to clean, efficient, and sustainable transport systems.',
    keyAreas: [
      'E-mobility, EVs, e-bikes, and e-boda',
      'Sustainable public transport systems',
      'Mobility-as-a-service and digital platforms',
      'Non-motorized transport infrastructure',
      'Logistics and freight optimization',
      'Battery charging and swapping infrastructure',
    ],
  },
];

const sectorTags = ['Energy', 'Agriculture', 'Water', 'Circular economy', 'Nature', 'Mobility'];

export default function FocusSectorsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const selectedSector = focusSectors.find((sector) => sector.id === selectedId) ?? null;

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-sector-word]', { yPercent: 110, rotate: 2 });
      gsap.set('[data-sector-copy] p, [data-sector-copy] a', { autoAlpha: 0, y: 18 });
      gsap.set('[data-sector-node]', { autoAlpha: 1, scale: 1, transformOrigin: '50% 50%' });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .add(drawSvgPaths('[data-sector-line]', { dash: 700, duration: 1, stagger: 0.05 }))
        .to('[data-sector-word]', { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.08 }, '-=0.45')
        .to('[data-sector-copy] p, [data-sector-copy] a', { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06 }, '-=0.35')
        .from('[data-sector-node]', { scale: 0.78, rotate: -2, duration: 0.55, stagger: 0.08, clearProps: 'scale,rotate' }, '-=0.7');

      gsap.to('[data-sector-line]', {
        strokeDashoffset: -56,
        duration: 8,
        repeat: -1,
        ease: 'none',
      });

      marqueeLoop('[data-sector-marquee]', { duration: 18 });

      gsap.utils.toArray<HTMLElement>('[data-sector-node]').forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -16 : 18,
          rotate: index % 2 === 0 ? -1.2 : 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-sector-map]',
            start: 'top 42%',
            end: 'bottom top',
            scrub: 0.75,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-sector-card]').forEach((card, index) => {
        gsap.from(card, {
          y: 28,
          rotate: index % 2 === 0 ? -1.1 : 1.1,
          duration: 0.72,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-sector-panel]').forEach((panel) => {
        gsap.from(panel, {
          y: 22,
          rotate: -0.6,
          duration: 0.75,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [selectedId]);

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />

      <section className="relative isolate border-b-[5px] border-[#101010] pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-20 -z-10 h-[44px] border-y-[5px] border-[#101010] bg-[#80c738]" />
        <div className="absolute bottom-0 left-0 right-0 -z-10 h-24 border-t-[5px] border-[#101010] bg-[#80c738]" />

        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
          <div data-sector-copy className="relative pt-6">
            <p className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-2 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010]">
              Key sectors
            </p>
            <h1
              aria-label="Six climate pillars. One enterprise pipeline."
              className="mt-7 overflow-hidden font-black uppercase leading-[0.88] tracking-normal text-[#101010]"
              style={{ fontSize: 'clamp(2.65rem, 6.2vw, 5rem)' }}
            >
              <span className="block overflow-hidden pb-1">
                <span data-sector-word className="block">
                  Six climate
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-sector-word className="block">
                  pillars.
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-sector-word className="inline-block bg-[#80c738] px-3 text-[#0b110d]">
                  One pipeline.
                </span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#28261d]">
              KCIC backs enterprises across renewable energy, agriculture, water, circular economy, nature-based
              solutions, and mobility, then connects those sectors to finance, markets, and practical delivery support.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#sector-board"
                className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:shadow-[9px_9px_0_#101010]"
              >
                Open the board
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/programmes"
                className="inline-flex rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
              >
                View programmes
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div data-sector-map className="relative min-h-[430px] sm:min-h-[500px]">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 760 560" fill="none" aria-hidden="true">
              <path data-sector-line d="M81 372C166 198 284 274 360 155C453 9 573 130 671 55" stroke="#101010" strokeWidth="3" strokeDasharray="10 12" />
              <path data-sector-line d="M91 431C207 386 232 486 349 397C454 319 515 456 655 356" stroke="#101010" strokeWidth="2" strokeDasharray="8 10" />
              <path data-sector-line d="M147 89H628V492H147V89Z" stroke="#101010" strokeWidth="2" />
              <path data-sector-line d="M147 291H628" stroke="#101010" strokeWidth="1.5" strokeOpacity="0.55" />
              <path data-sector-line d="M389 89V492" stroke="#101010" strokeWidth="1.5" strokeOpacity="0.55" />
            </svg>

            {focusSectors.map((sector, index) => {
              const Icon = sector.icon;
              const isSelected = selectedId === sector.id;
              const positions = [
                'left-[4%] top-[16%] rotate-[-4deg]',
                'left-[39%] top-[5%] rotate-[2deg]',
                'right-[5%] top-[22%] rotate-[4deg]',
                'left-[12%] bottom-[16%] rotate-[3deg]',
                'left-[44%] bottom-[5%] rotate-[-2deg]',
                'right-[8%] bottom-[18%] rotate-[2deg]',
              ];

              return (
                <button
                  key={sector.id}
                  type="button"
                  data-sector-node
                  onClick={() => setSelectedId(isSelected ? null : sector.id)}
                  className={`${positions[index]} absolute z-10 w-[150px] border-[3px] border-[#101010] bg-[#fff7df] p-3 text-left shadow-[8px_8px_0_#101010] transition duration-300 hover:-translate-y-1 hover:bg-[#80c738] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#335016] focus-visible:ring-offset-4 sm:w-[176px] ${
                    isSelected ? 'bg-[#80c738] shadow-[10px_10px_0_#101010]' : ''
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center border-[3px] border-[#101010] bg-[#80c738] text-[#101010] shadow-[4px_4px_0_#101010]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="bg-[#101010] px-2 py-1 text-xs font-black text-[#fff7df]">{sector.code}</span>
                  </div>
                  <span className="mt-4 block text-lg font-black uppercase leading-none text-[#101010]">{sector.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-y-[5px] border-[#101010] bg-[#80c738] py-4">
          <div className="flex w-max gap-3 whitespace-nowrap" data-sector-marquee>
            {[...sectorTags, ...sectorTags, ...sectorTags, ...sectorTags].map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="inline-flex -rotate-1 items-center border-[3px] border-[#101010] bg-[#fff7df] px-5 py-2 text-lg font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main id="sector-board" className="bg-[#fff7df] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section data-sector-panel className="mb-8 grid gap-5 border-[5px] border-[#101010] bg-[#fff7df] p-5 shadow-[10px_10px_0_#101010] sm:mb-10 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="inline-block -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
                Six pillars of impact
              </p>
              <h2
                className="mt-5 max-w-xl font-black uppercase leading-tight tracking-normal text-[#101010]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Pick a sector. The focus areas unfold like a working brief.
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="max-w-2xl text-base font-medium leading-8 text-[#28261d]">
                This board is built for scanning first, then drilling in. Each sector keeps the KCIC delivery language
                tight: what the enterprise does, where support lands, and which market constraints need attention.
              </p>
            </div>
          </section>

          {selectedSector && (
            <section data-sector-panel className="mb-10 grid gap-7 border-[5px] border-[#101010] bg-[#101010] p-6 text-[#fff7df] shadow-[10px_10px_0_#80c738] sm:mb-12 sm:p-9 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="inline-block -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#fff7df]">
                  Active selection
                </p>
                <h2
                  className="mt-6 font-black uppercase leading-tight tracking-normal"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.8rem)' }}
                >
                  {selectedSector.name}
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {selectedSector.keyAreas.map((area, index) => (
                  <div key={area} className="border-[3px] border-[#fff7df] bg-[#fff7df] p-4 text-[#101010] shadow-[5px_5px_0_#80c738]">
                    <p className="mb-3 bg-[#101010] px-2 py-1 text-xs font-black text-[#fff7df]">AREA 0{index + 1}</p>
                    <p className="text-sm font-black uppercase leading-snug">{area}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {focusSectors.map((sector, index) => {
              const Icon = sector.icon;
              const isSelected = selectedId === sector.id;

              return (
                <article
                  key={sector.id}
                  data-sector-card
                  className={`group relative flex min-h-[390px] self-start overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[9px_9px_0_#101010] transition duration-500 ease-out hover:-translate-y-1 hover:rotate-[-0.5deg] hover:shadow-[13px_13px_0_#80c738] ${
                    isSelected ? 'bg-[#f4ffd9] shadow-[13px_13px_0_#80c738]' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(isSelected ? null : sector.id)}
                    className="flex flex-1 flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#335016] focus-visible:ring-offset-4"
                    aria-expanded={isSelected}
                  >
                    <div className="border-b-[3px] border-[#101010] bg-[#80c738] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid h-14 w-14 place-items-center border-[3px] border-[#101010] bg-[#fff7df] text-[#101010] shadow-[4px_4px_0_#101010]">
                          <Icon className="h-7 w-7" aria-hidden="true" />
                        </span>
                        <span className="bg-[#101010] px-3 py-1.5 text-sm font-black text-[#fff7df]">0{index + 1}</span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-2xl font-black uppercase leading-tight tracking-normal text-[#101010]">
                        {sector.name}
                      </h3>
                      <p className="mt-4 text-sm font-medium leading-relaxed text-[#28261d]">{sector.description}</p>

                      <div
                        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                          isSelected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="mt-6 border-t-[3px] border-[#101010] pt-5">
                            <p className="mb-4 text-sm font-black uppercase text-[#101010]">Focus areas</p>
                            <ul className="space-y-3">
                              {sector.keyAreas.map((area) => (
                                <li key={area} className="flex items-start gap-2 text-sm font-medium leading-relaxed text-[#28261d]">
                                  <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-none text-[#4d7822]" aria-hidden="true" />
                                  <span>{area}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-4 border-t-[3px] border-[#101010] pt-5">
                        <span className="text-sm font-black uppercase text-[#101010]">
                          {isSelected ? 'Open brief' : 'View focus areas'}
                        </span>
                        <span className="grid h-10 w-10 place-items-center border-2 border-[#101010] bg-[#80c738] text-[#101010] shadow-[3px_3px_0_#101010] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                          <ArrowRightIcon className={`h-4 w-4 transition duration-300 ${isSelected ? 'rotate-90' : ''}`} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </section>

        </div>
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
