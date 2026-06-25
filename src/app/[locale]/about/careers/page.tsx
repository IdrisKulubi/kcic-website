'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  LinkedinLogo,
  MapPin,
  Paperclip,
} from '@phosphor-icons/react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';
import { homePageData } from '@/data/home';
import { listOpportunities, OpportunityWithAttachments } from '@/lib/actions/opportunities';
import {
  drawSvgPaths,
  gsap,
  marqueeLoop,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from '@/lib/gsap-foundation';

const careersTicker = [
  'Open roles',
  'Apply now',
  'Climate careers',
  'Green jobs',
  'Team KCIC',
  'Mission-driven work',
];

function formatDate(value: Date | string | null) {
  if (!value) return 'Open deadline';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Open deadline';
  return format(date, 'MMM d, yyyy');
}

function trimWords(value: string, maxWords = 8) {
  const words = value.trim().split(/\s+/);
  if (words.length <= maxWords) return value;
  return `${words.slice(0, maxWords).join(' ')}...`;
}

function getNearestDeadline(opportunities: OpportunityWithAttachments[]) {
  const dated = opportunities
    .map((opportunity) => (opportunity.deadline ? new Date(opportunity.deadline) : null))
    .filter((date): date is Date => date !== null && !Number.isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  return dated[0] ? format(dated[0], 'MMM d') : 'Rolling';
}

function OpportunityCard({
  opportunity,
  index,
}: {
  opportunity: OpportunityWithAttachments;
  index: number;
}) {
  const rotate = index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : '';
  const displayTitle = trimWords(opportunity.title, 8);

  return (
    <Link
      href={`/about/careers/${opportunity.slug}`}
      data-careers-card
      className={`group block h-full ${rotate} transition duration-300 hover:-translate-y-2 hover:rotate-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738]`}
    >
      <article className="relative flex h-full min-h-[520px] flex-col border-[5px] border-[#101010] bg-[#fff7df] p-5 shadow-[10px_10px_0_#101010] transition duration-300 group-hover:shadow-[14px_14px_0_#80c738] sm:p-6">
        <div className="absolute -right-3 top-8 rotate-6 border-[3px] border-[#101010] bg-[#80c738] px-4 py-1 text-xs font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
          ROLE
        </div>

        <div className="flex items-start justify-between gap-4 border-b-[4px] border-[#101010] pb-5">
          <div className="grid h-16 w-16 shrink-0 place-items-center border-[4px] border-[#101010] bg-[#80c738] shadow-[5px_5px_0_#101010]">
            <Briefcase className="h-8 w-8" weight="bold" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <p className="text-sm font-black uppercase tracking-normal text-[#101010]">Job opening</p>
            {opportunity.referenceNumber && (
              <p className="mt-1 break-words text-xs font-bold uppercase text-[#58523f]">{opportunity.referenceNumber}</p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col py-7">
          {opportunity.isFeatured && (
            <span className="mb-5 w-fit -rotate-1 border-[3px] border-[#101010] bg-[#101010] px-3 py-1 text-xs font-black uppercase text-[#fff7df]">
              Featured role
            </span>
          )}
          <h2
            title={opportunity.title}
            className="line-clamp-3 min-h-[5.9rem] max-w-[16ch] text-3xl font-black uppercase leading-[0.98] text-[#101010] sm:min-h-[7.05rem] sm:text-4xl"
          >
            {displayTitle}
          </h2>
          <p className="mt-5 line-clamp-4 text-base font-medium leading-7 text-[#28261d]">{opportunity.summary}</p>
        </div>

        <div className="space-y-3 border-t-[4px] border-[#101010] pt-5 text-sm font-bold text-[#101010]">
          {opportunity.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#5a8f1d]" weight="bold" aria-hidden="true" />
              <span>{opportunity.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#5a8f1d]" weight="bold" aria-hidden="true" />
            <span>Deadline: {formatDate(opportunity.deadline)}</span>
          </div>
          {opportunity.employmentType && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-[#5a8f1d]" weight="bold" aria-hidden="true" />
              <span className="capitalize">{opportunity.employmentType.replace('-', ' ')}</span>
            </div>
          )}
          {opportunity.attachments.length > 0 && (
            <div className="flex items-center gap-2">
              <Paperclip className="h-4 w-4 text-[#5a8f1d]" weight="bold" aria-hidden="true" />
              <span>
                {opportunity.attachments.length} file{opportunity.attachments.length === 1 ? '' : 's'} attached
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-sm font-black uppercase text-[#101010]">View role</span>
          <span className="grid h-12 w-12 place-items-center border-[4px] border-[#101010] bg-[#80c738] shadow-[4px_4px_0_#101010] transition duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" weight="bold" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  );
}

function LoadingBoard() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="min-h-[390px] animate-pulse border-[5px] border-[#101010] bg-[#fff7df] p-5 shadow-[10px_10px_0_#101010]"
        >
          <div className="h-16 w-16 border-[4px] border-[#101010] bg-[#80c738]" />
          <div className="mt-10 h-10 w-4/5 bg-[#101010]" />
          <div className="mt-4 h-10 w-2/3 bg-[#101010]" />
          <div className="mt-10 h-4 w-full bg-[#d5caa8]" />
          <div className="mt-3 h-4 w-5/6 bg-[#d5caa8]" />
          <div className="mt-20 h-14 border-[4px] border-[#101010] bg-[#80c738]" />
        </div>
      ))}
    </div>
  );
}

function EmptyBoard() {
  return (
    <div data-careers-panel className="grid gap-8 border-[5px] border-[#101010] bg-[#fff7df] p-6 shadow-[10px_10px_0_#101010] lg:grid-cols-[0.75fr_1.25fr] lg:p-8">
      <div className="relative min-h-[240px] border-[4px] border-[#101010] bg-[#80c738]">
        <svg className="absolute inset-0 h-full w-full text-[#101010]" viewBox="0 0 420 280" fill="none" aria-hidden="true">
          <path data-careers-line d="M60 73H330V224H60V73Z" stroke="currentColor" strokeWidth="5" />
          <path data-careers-line d="M92 112H298" stroke="currentColor" strokeWidth="5" />
          <path data-careers-line d="M92 150H246" stroke="currentColor" strokeWidth="5" />
          <path data-careers-line d="M92 188H276" stroke="currentColor" strokeWidth="5" />
          <path data-careers-line d="M314 48C345 66 364 89 371 117" stroke="currentColor" strokeWidth="4" />
          <path data-careers-line d="M45 236C86 262 132 264 185 242" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <p className="w-fit -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase shadow-[4px_4px_0_#101010]">
          Talent desk
        </p>
        <h2 className="mt-6 max-w-3xl text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
          No open roles at the moment.
        </h2>
        <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#28261d]">
          We don&apos;t have any vacancies right now. New roles will appear here as soon as they open. Follow us to stay updated.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="https://www.linkedin.com/company/kenyaclimateinnovationcenter/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-5 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:shadow-[9px_9px_0_#101010]"
          >
            <LinkedinLogo className="h-4 w-4" weight="bold" aria-hidden="true" />
            Follow on LinkedIn
          </Link>
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-5 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [opportunities, setOpportunities] = useState<OpportunityWithAttachments[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchOpportunities() {
      const result = await listOpportunities({ isActive: true, type: 'job' });
      if (mounted && result.success && result.data) {
        setOpportunities(result.data);
      }
      if (mounted) setLoading(false);
    }

    fetchOpportunities();

    return () => {
      mounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!pageRef.current || loading) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-careers-word]', { yPercent: 110, rotate: 2 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .add(drawSvgPaths('[data-careers-line]', { dash: 760, duration: 0.95, stagger: 0.05 }))
        .to('[data-careers-word]', { yPercent: 0, rotate: 0, duration: 0.82, stagger: 0.07 }, '-=0.35')
        .from('[data-careers-copy]', { autoAlpha: 0, y: 20, duration: 0.58, stagger: 0.06 }, '-=0.25');

      marqueeLoop('[data-careers-marquee]', { duration: 46 });

      gsap.to('[data-careers-line]', {
        strokeDashoffset: -42,
        duration: 9,
        repeat: -1,
        ease: 'none',
      });

      gsap.utils.toArray<HTMLElement>('[data-careers-card], [data-careers-panel]').forEach((item, index) => {
        gsap.from(item, {
          y: 36,
          rotate: index % 2 === 0 ? -1.2 : 1.2,
          duration: 0.74,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.to('[data-careers-float]', {
        y: (index) => (index % 2 === 0 ? -20 : 18),
        rotate: (index) => (index % 2 === 0 ? -1.2 : 1.2),
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    }, pageRef);

    return () => ctx.revert();
  }, [loading, opportunities.length]);

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />

      <section className="relative isolate border-b-[5px] border-[#101010] pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-20 -z-10 h-[44px] border-y-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 -z-10 h-20 border-t-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
          <div data-careers-copy className="relative pt-6">
            <p className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-2 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010]">
              Careers
            </p>
            <h1
              aria-label="Open roles. Join the mission."
              className="mt-7 overflow-hidden font-black uppercase leading-[0.88] tracking-normal text-[#101010]"
              style={{ fontSize: 'clamp(2.7rem, 7vw, 6rem)' }}
            >
              <span className="block overflow-hidden pb-1">
                <span data-careers-word className="block">
                  Open roles.
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-careers-word className="inline-block bg-[#80c738] px-3 text-[#0b110d]">
                  Join the mission.
                </span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#28261d]">
              Current job openings at KCIC — help accelerate climate innovation and green enterprise across Kenya and East Africa.
            </p>
          </div>

          <div data-careers-float className="relative min-h-[470px]">
            <svg className="absolute inset-0 h-full w-full text-[#101010]" viewBox="0 0 760 520" fill="none" aria-hidden="true">
              <path data-careers-line d="M95 87H574V442H95V87Z" stroke="currentColor" strokeWidth="5" />
              <path data-careers-line d="M133 145H520" stroke="currentColor" strokeWidth="5" />
              <path data-careers-line d="M133 209H480" stroke="currentColor" strokeWidth="5" />
              <path data-careers-line d="M133 273H528" stroke="currentColor" strokeWidth="5" />
              <path data-careers-line d="M133 337H402" stroke="currentColor" strokeWidth="5" />
              <path data-careers-line d="M612 123C660 149 689 194 699 257C710 325 689 381 637 424" stroke="currentColor" strokeWidth="4" />
              <path data-careers-line d="M58 404C115 475 207 491 336 453" stroke="currentColor" strokeWidth="4" />
              <path data-careers-line d="M594 74L674 54L693 129L613 149L594 74Z" stroke="currentColor" strokeWidth="5" />
              <path data-careers-line d="M614 102L674 87" stroke="currentColor" strokeWidth="4" />
            </svg>

            <div className="absolute left-4 top-10 rotate-[-4deg] border-[4px] border-[#101010] bg-[#80c738] px-5 py-3 text-lg font-black uppercase shadow-[7px_7px_0_#101010] sm:left-14">
              Talent desk
            </div>
            <div className="absolute right-4 top-28 rotate-3 border-[4px] border-[#101010] bg-[#fff7df] px-5 py-4 shadow-[7px_7px_0_#101010] sm:right-12">
              <p className="text-xs font-black uppercase text-[#58523f]">Live roles</p>
              <p className="text-4xl font-black">{loading ? '...' : opportunities.length}</p>
            </div>
            <div className="absolute bottom-14 left-8 max-w-[260px] -rotate-2 border-[4px] border-[#101010] bg-[#101010] px-5 py-4 text-[#fff7df] shadow-[7px_7px_0_#80c738] sm:left-20">
              <p className="text-xs font-black uppercase text-[#80c738]">Closing soon</p>
              <p className="mt-1 text-3xl font-black uppercase leading-none">{loading ? '...' : getNearestDeadline(opportunities)}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden border-t-[5px] border-[#101010] bg-[#101010] py-4 text-[#fff7df]">
          <div data-careers-marquee className="flex w-max gap-7 whitespace-nowrap">
            {[...careersTicker, ...careersTicker, ...careersTicker].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-7 text-xl font-black uppercase sm:text-2xl">
                {item}
                <span className="h-4 w-4 bg-[#80c738]" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="bg-[#fff7df] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section aria-label="Open job opportunities">
            {loading ? (
              <LoadingBoard />
            ) : opportunities.length === 0 ? (
              <EmptyBoard />
            ) : (
              <div className="grid auto-rows-fr gap-8 md:grid-cols-2 xl:grid-cols-3">
                {opportunities.map((opportunity, index) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} index={index} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
