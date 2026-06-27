'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, ChevronRight, CircleDot, Mail, MapPin } from 'lucide-react';
import {
  drawSvgPaths,
  gsap,
  marqueeLoop,
  posterReveal,
  prefersReducedMotion,
  registerGsapFoundation,
  scrollPosterReveal,
  scrollScrubObjects,
} from '@/lib/gsap-foundation';
import { listProgrammes, ProgrammeData } from '@/lib/actions/programmes';
import { getFooterSection } from '@/lib/actions/footer';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';

type FooterData = {
  quickLinks: { label: string; href: string }[];
  socialMedia: { platform: string; href: string; icon: string }[];
  contact: { address: string; phone: string; email: string };
  newsletter: { title: string; description: string; placeholder: string };
  copyright: string;
};

type ProgrammeCardProps = {
  programme: ProgrammeData;
  index: number;
  variant: 'flagship' | 'special';
};

const flagshipOrder = ['agribiz-programme', 'greenbiz-programme', 'puse-programme', 'swift-programme', 'dreem-hub'];

const specialOrder = [
  'sheria-ya-vijana',
  'e-mobility-programme',
  'africa-meets-bavaria',
  'in-country-youth-adapt',
  'cleantech-innovation-programme',
  'climatelaunchpad',
  'vijana-na-agribiz',
  'greyap',
  'wusc',
];

const supportTags = ['Finance readiness', 'Technical assistance', 'Market links', 'Policy support', 'Climate ventures'];

function ProgrammeCard({ programme, index, variant }: ProgrammeCardProps) {
  const isFlagship = variant === 'flagship';

  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className="programme-card group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#335016] focus-visible:ring-offset-4"
      data-programme-card
    >
      <article className="relative flex h-full min-h-[430px] flex-col overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[9px_9px_0_#101010] transition duration-500 ease-out hover:-translate-y-1 hover:rotate-[-0.5deg] hover:shadow-[13px_13px_0_#80c738]">
        <div className="relative h-56 overflow-hidden border-b-[3px] border-[#101010] bg-[#80c738]">
          <Image
            src={programme.image}
            alt={programme.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#101010]/25 transition duration-500 group-hover:bg-[#101010]/8" />
          <div className="absolute left-4 top-4 flex -rotate-2 items-center gap-2 border-2 border-[#101010] bg-[#fff7df] px-3 py-1.5 text-xs font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: programme.color }} />
            {isFlagship ? 'Flagship' : 'Project'}
          </div>
          {programme.isActive ? (
            <div className="absolute right-4 top-4 rotate-2 border-2 border-[#101010] bg-[#80c738] px-3 py-1.5 text-xs font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
              Open
            </div>
          ) : null}
          <div className="absolute bottom-4 left-4 bg-[#101010] px-3 py-1.5 text-xs font-black text-[#fff7df]">
            0{index + 1}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-2xl font-black uppercase leading-tight tracking-normal text-[#101010]">
            {programme.title}
          </h3>
          <p className="mt-4 line-clamp-4 flex-1 text-sm font-medium leading-relaxed text-[#28261d]">{programme.description}</p>
          <div className="mt-7 flex items-center justify-between gap-4 border-t-[3px] border-[#101010] pt-5">
            <span className="text-sm font-black uppercase text-[#101010]">View programme</span>
            <span className="grid h-10 w-10 place-items-center border-2 border-[#101010] bg-[#80c738] text-[#101010] shadow-[3px_3px_0_#101010] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ProgrammeSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="min-h-[430px] animate-pulse overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[6px_6px_0_#101010]">
          <div className="h-56 border-b-[3px] border-[#101010] bg-[#dff1d2]" />
          <div className="space-y-4 p-6">
            <div className="h-5 w-2/3 bg-[#80c738]" />
            <div className="h-4 w-full bg-[#d8e3d1]" />
            <div className="h-4 w-5/6 bg-[#d8e3d1]" />
            <div className="h-10 w-32 border-[3px] border-[#101010] bg-[#fff7df]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="programme-section-heading mb-9 flex flex-col gap-4 border-t-[5px] border-[#101010] pt-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="inline-block -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
          {kicker}
        </p>
        <h2
          className="mt-5 max-w-3xl font-black uppercase leading-tight tracking-normal text-[#101010]"
          style={{ fontSize: 'clamp(2rem, 4vw, 2.55rem)' }}
        >
          {title}
        </h2>
      </div>
      <p className="max-w-md border-l-[5px] border-[#101010] pl-5 text-sm font-medium leading-relaxed text-[#28261d]">
        {description}
      </p>
    </div>
  );
}

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState<ProgrammeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);

  const { flagshipProgrammes, specialProgrammes } = useMemo(() => {
    const flagship = programmes
      .filter((p) => p.category === 'flagship' || !p.category)
      .sort((a, b) => {
        const aIndex = flagshipOrder.indexOf(a.slug);
        const bIndex = flagshipOrder.indexOf(b.slug);
        if (aIndex === -1 && bIndex === -1) return a.order - b.order;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

    const special = programmes
      .filter((p) => p.category === 'special')
      .sort((a, b) => {
        const aIndex = specialOrder.indexOf(a.slug);
        const bIndex = specialOrder.indexOf(b.slug);
        if (aIndex === -1 && bIndex === -1) return a.order - b.order;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

    return { flagshipProgrammes: flagship, specialProgrammes: special };
  }, [programmes]);

  const heroProgrammes = flagshipProgrammes.slice(0, 4);

  useEffect(() => {
    async function fetchData() {
      const programmesResult = await listProgrammes();
      if (programmesResult.success && programmesResult.data) {
        setProgrammes(programmesResult.data);
      }
      setLoading(false);

      const footerResult = await getFooterSection();
      if (footerResult.success && footerResult.data) {
        const { section, links, socialMedia } = footerResult.data;
        setFooterData({
          quickLinks: links.map((l) => ({ label: l.label, href: l.href })),
          socialMedia: socialMedia.map((s) => ({ platform: s.platform, href: s.href, icon: s.icon })),
          contact: {
            address: section.contactAddress || '',
            phone: section.contactPhone || '',
            email: section.contactEmail || '',
          },
          newsletter: {
            title: section.newsletterTitle || 'Stay Updated',
            description: section.newsletterDescription || 'Subscribe to our newsletter',
            placeholder: section.newsletterPlaceholder || 'Enter your email',
          },
          copyright: section.copyright || '(c) 2024 KCIC',
        });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    function scrollToHash() {
      const id = window.location.hash.replace(/^#/, '');
      if (!id) return;
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [loading, programmes.length]);

  useEffect(() => {
    if (loading || !pageRef.current) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;
    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;

    const ctx = gsap.context(() => {
      if (!isSmallScreen) {
        gsap.set('[data-hero-word]', { yPercent: 110, rotate: 2 });
      }

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if (isSmallScreen) {
        intro
          .from('[data-hero-copy]', { autoAlpha: 0, y: 18, duration: 0.5 })
          .add(drawSvgPaths('[data-board-line]', { dash: 520, duration: 0.65, stagger: 0.03 }), '-=0.18')
          .from('[data-hero-image]', { autoAlpha: 0, y: 26, rotate: -1, duration: 0.55, stagger: 0.05 }, '-=0.15');
      } else {
        intro
          .add(drawSvgPaths('[data-board-line]', { dash: 620, duration: 1.05, stagger: 0.07 }))
          .to('[data-hero-word]', { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.09 }, '-=0.35')
          .from('[data-hero-copy] p, [data-hero-copy] a', { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.06 }, '-=0.35')
          .add(posterReveal('[data-hero-image]', { y: 52, rotate: -4, duration: 0.9, stagger: 0.08 }), '-=0.55');
      }

      gsap.to('[data-board-line]', {
        strokeDashoffset: -42,
        duration: 7,
        repeat: -1,
        ease: 'none',
      });

      marqueeLoop('[data-marquee-track]', { duration: 16 });
      scrollScrubObjects('[data-hero-image]', '[data-hero-stage]');

      gsap.utils.toArray<HTMLElement>('.programme-section-heading').forEach((heading) => {
        gsap.from(heading, {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 84%',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-programme-card]').forEach((card) => {
        scrollPosterReveal(card, { trigger: card, y: 36, rotate: -2 });
      });

      gsap.utils.toArray<HTMLElement>('[data-poster-panel]').forEach((panel) => {
        scrollPosterReveal(panel, { trigger: panel, y: 24, rotate: -1 });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [loading, programmes.length]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />

      <section className="relative isolate overflow-hidden border-b-[5px] border-[#101010] bg-[#fff7df] pt-28 text-[#101010] sm:pt-32">
        <div className="absolute inset-x-0 top-20 -z-10 h-[44px] border-y-[5px] border-[#101010] bg-[#80c738]" />
        <div className="absolute right-[9vw] top-28 -z-10 hidden h-[520px] w-[5px] bg-[#101010] lg:block" />

        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div data-hero-copy className="relative max-w-3xl pt-6 lg:pt-8">
            <p className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-2 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010]">
              KCIC Programmes
            </p>
            <h1
              aria-label="Climate ventures need more than a grant."
              className="mt-7 max-w-4xl overflow-hidden font-black uppercase leading-[0.9] tracking-normal text-[#101010]"
              style={{ fontSize: 'clamp(2.7rem, 6.3vw, 4.6rem)' }}
            >
              <span className="block overflow-hidden pb-1">
                <span data-hero-word className="block">
                  Climate ventures
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-hero-word className="block">
                  need more than
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-hero-word className="inline-block bg-[#80c738] px-3 text-[#0b110d]">
                  a grant.
                </span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#28261d]">
              KCIC programmes combine finance, technical assistance, markets, policy support, and deep sector networks
              so climate-smart enterprises can move from promising ideas to resilient businesses.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#flagship"
                className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:shadow-[9px_9px_0_#101010]"
              >
                Explore programmes
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about/contact-us"
                className="inline-flex rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
              >
                Partner with KCIC
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div data-hero-stage className="relative min-h-[500px] lg:min-h-[520px]">
            <svg
              className="absolute inset-0 h-full w-full text-[#101010]/45"
              viewBox="0 0 720 640"
              fill="none"
              aria-hidden="true"
            >
              <path data-board-line d="M84 496C190 355 286 438 364 287C432 154 542 178 637 75" stroke="currentColor" strokeWidth="2" strokeDasharray="8 10" />
              <path data-board-line d="M121 122H583V538H121V122Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
              <path data-board-line d="M121 332H583" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
              <path data-board-line d="M346 122V538" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
            </svg>
            {heroProgrammes.length > 0 ? (
              heroProgrammes.map((programme, index) => {
                const positions = [
                  'left-0 top-[9%] h-[235px] w-[62%] -rotate-2 z-20 md:left-[5%] md:top-[12%] md:h-[275px] md:w-[52%]',
                  'right-0 top-[3%] h-[205px] w-[44%] rotate-3 z-10 md:right-[2%] md:top-[6%] md:h-[225px] md:w-[38%]',
                  'right-0 bottom-[19%] h-[205px] w-[44%] -rotate-1 z-30 md:right-[7%] md:bottom-[15%] md:h-[225px] md:w-[38%]',
                  'left-[8%] bottom-[9%] h-[150px] w-[54%] rotate-2 z-40 md:left-[16%] md:bottom-[5%] md:h-[165px] md:w-[43%]',
                ];

                return (
                  <Link
                    key={programme.id}
                    href={`/programmes/${programme.slug}`}
                    data-hero-image
                    className={`${positions[index] ?? 'left-0 top-0 h-60 w-80'} group absolute overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[10px_10px_0_#101010]`}
                  >
                   
                    <Image
                      src={programme.image}
                      alt={programme.title}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#101010]/24 transition duration-500 group-hover:bg-[#101010]/5" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="inline-block bg-[#80c738] px-2 py-1 text-xs font-black uppercase text-[#101010]">
                        {programme.isActive ? 'Open now' : 'KCIC programme'}
                      </p>
                      <h2 className="mt-2 line-clamp-2 bg-[#101010] px-2 py-1 text-base font-black uppercase leading-tight text-[#fff7df]">
                        {programme.title}
                      </h2>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="absolute inset-12 border-[3px] border-[#101010] bg-[#fff7df]" />
            )}
          </div>
        </div>

        <div className="border-y-[5px] border-[#101010] bg-[#80c738] py-4">
          <div className="flex w-max gap-3 whitespace-nowrap" data-marquee-track>
            {[...supportTags, ...supportTags, ...supportTags, ...supportTags].map((tag, index) => (
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

      <main>
        <section className="bg-[#fff7df] py-8">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              ['Flagship delivery', 'Long-running programmes with dedicated reporting and partner coordination.'],
              ['Enterprise support', 'Finance readiness, technical assistance, market links, and business advisory.'],
              ['Regional reach', 'Work rooted in Kenya with East African implementation and ecosystem partners.'],
            ].map(([title, body]) => (
              <div key={title} data-poster-panel className="border-[3px] border-[#101010] bg-[#fff7df] p-5 shadow-[6px_6px_0_#101010]">
                <CheckCircle2 className="h-5 w-5 text-[#4d7822]" aria-hidden="true" />
                <h2 className="mt-4 text-base font-black uppercase tracking-normal text-[#101010]">{title}</h2>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#28261d]">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {loading && <ProgrammeSkeleton />}

            {!loading && flagshipProgrammes.length > 0 && (
              <section id="flagship" className="scroll-mt-28 sm:scroll-mt-32">
                <SectionHeading
                  kicker="Flagship programmes"
                  title="Structured support for climate enterprises that are ready to grow."
                  description="These initiatives bring together funders, counties, hubs, and private-sector partners around clear delivery goals."
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {flagshipProgrammes.map((programme, index) => (
                    <ProgrammeCard key={programme.id} programme={programme} index={index} variant="flagship" />
                  ))}
                </div>
              </section>
            )}

            {!loading && specialProgrammes.length > 0 && (
              <section id="projects" className="mt-20 scroll-mt-28 sm:mt-24 sm:scroll-mt-32">
                <SectionHeading
                  kicker="Special projects"
                  title="Focused interventions for new markets, youth pathways, and emerging sectors."
                  description="Time-bound projects let KCIC test models, deepen partnerships, and respond to the needs of specific enterprise groups."
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {specialProgrammes.map((programme, index) => (
                    <ProgrammeCard key={programme.id} programme={programme} index={index} variant="special" />
                  ))}
                </div>
              </section>
            )}

            {!loading && programmes.length > 0 && (
              <section
                id="past"
                className="programme-section-heading mt-20 scroll-mt-28 border-[5px] border-[#101010] bg-[#fff7df] p-7 shadow-[10px_10px_0_#101010] sm:mt-24 sm:scroll-mt-32 sm:p-10"
                aria-labelledby="past-projects-heading"
              >
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                  <div>
                    <p className="inline-block -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
                      Past projects
                    </p>
                    <h2
                      id="past-projects-heading"
                      className="mt-5 font-black uppercase leading-tight tracking-normal text-[#101010]"
                      style={{ fontSize: 'clamp(2rem, 4vw, 2.55rem)' }}
                    >
                      Outcomes keep moving after a project closes.
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-relaxed text-[#28261d]">
                      Completed initiatives live through enterprise stories, impact reporting, and newsroom updates. For a
                      specific closed programme, KCIC can point you to the right materials.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href="/impact"
                        className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-5 py-3 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-1"
                      >
                        Impact overview
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link
                        href="/newsroom/press-release"
                        className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-5 py-3 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
                      >
                        News and updates
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {!loading && programmes.length === 0 && (
              <section className="border-[5px] border-[#101010] bg-[#fff7df] px-6 py-16 text-center shadow-[10px_10px_0_#101010]">
                <CircleDot className="mx-auto h-8 w-8 text-[#4d7822]" aria-hidden="true" />
                <h2
                  className="mt-5 font-black uppercase leading-tight tracking-normal text-[#101010]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.55rem)' }}
                >
                  Programmes coming soon
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-relaxed text-[#28261d]">
                  We are preparing new initiatives. Check back shortly or contact us for updates.
                </p>
                <Link
                  href="/about/contact-us"
                  className="mt-7 inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-1"
                >
                  Contact us
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </section>
            )}
          </div>
        </section>

        {programmes.length > 0 && (
          <section className="relative overflow-hidden bg-[#dff1d2] py-16 sm:py-20">
            <div className="absolute right-8 top-8 hidden h-40 w-40 border-[5px] border-[#101010] lg:block" />
            <div className="absolute bottom-8 right-28 hidden h-20 w-56 border-[5px] border-[#101010] bg-[#80c738] lg:block" />
            <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-8">
              <div>
                <p className="inline-block -rotate-1 border-[3px] border-[#101010] bg-[#fff7df] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
                  Work with KCIC
                </p>
                <h2
                  className="mt-5 max-w-2xl font-black uppercase leading-tight tracking-normal text-[#101010]"
                  style={{ fontSize: 'clamp(2.35rem, 5vw, 3.35rem)' }}
                >
                  Bring the right programme, partner, or story into view.
                </h2>
              </div>
              <div data-poster-panel className="border-[5px] border-[#101010] bg-[#fff7df] p-6 shadow-[10px_10px_0_#101010]">
                <div className="space-y-4 text-sm font-medium text-[#28261d]">
                  <p className="flex gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#101010]" aria-hidden="true" />
                    Questions about eligibility, partnership, or media can start with the KCIC team.
                  </p>
                  <p className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#101010]" aria-hidden="true" />
                    Programme pathways are matched to sector, stage, location, and support need.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/about/contact-us"
                    className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-5 py-3 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-1"
                  >
                    Get in touch
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/faqs"
                    className="inline-flex items-center border-[3px] border-[#101010] bg-[#fff7df] px-5 py-3 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
                  >
                    FAQs
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {footerData && <Footer data={footerData} />}
    </div>
  );
}
