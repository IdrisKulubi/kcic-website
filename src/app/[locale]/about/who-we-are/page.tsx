'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Handshake,
  LightbulbFilament,
  Leaf,
  ShieldCheck,
  Sparkle,
  Target,
  UsersThree,
} from '@phosphor-icons/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
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

const stats = [
  { target: 450, prefix: '', suffix: '+', label: 'SMEs supported' },
  { target: 25, prefix: '$', suffix: 'M+', label: 'Investment mobilized' },
  { target: 2500, prefix: '', suffix: '+', label: 'Green jobs created' },
  { target: 12, prefix: '', suffix: '+', label: 'Years of impact' },
];

const values = [
  { title: 'People-centric', description: 'We prioritize the well-being of employees and stakeholders.', Icon: UsersThree },
  { title: 'Inclusivity', description: 'We leave no one behind.', Icon: Handshake },
  { title: 'Professionalism', description: 'We are committed to excellence.', Icon: ShieldCheck },
  { title: 'Integrity', description: 'We walk the talk and keep our word.', Icon: Compass },
  { title: 'Innovation', description: 'We foster creativity and forward-thinking.', Icon: LightbulbFilament },
  { title: 'Collaboration', description: 'We believe we are stronger together.', Icon: Sparkle },
];

const timeline = [
  {
    year: '2012',
    label: 'Founded',
    description:
      'Launched as the first World Bank infoDev Climate Innovation Centre globally, setting the blueprint for locally-led climate entrepreneurship.',
  },
  {
    year: '2015',
    label: 'Institutionalized',
    description: 'Registered as a company limited by guarantee, cementing long-term governance and independent growth.',
  },
  {
    year: '2016',
    label: 'Scaled',
    description: 'New DANIDA funding phase enabled rapid expansion of incubation, acceleration, and finance programmes across Kenya.',
  },
  {
    year: 'Today',
    label: 'Leading',
    description: "A fully independent hub and East Africa's foremost climate innovation centre, supporting 450+ ventures and counting.",
  },
];

const tickerItems = ['Climate entrepreneurship', 'Clean technology', 'Enterprise support', 'Market links', 'Climate finance', 'Policy action'];

function formatCounterValue(value: number, prefix: string, suffix: string) {
  return `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
}

export default function WhoWeArePage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-who-word]', { yPercent: 110, rotate: 2 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .add(drawSvgPaths('[data-who-line]', { dash: 620, duration: 0.9, stagger: 0.05 }))
        .to('[data-who-word]', { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.08 }, '-=0.35')
        .from('[data-who-copy] p, [data-who-copy] a', { autoAlpha: 0, y: 18, duration: 0.55, stagger: 0.06 }, '-=0.35')
        .from('[data-who-photo]', { y: 42, rotate: -3, duration: 0.75, stagger: 0.08 }, '-=0.55');

      gsap.to('[data-who-line]', {
        strokeDashoffset: -44,
        duration: 8,
        repeat: -1,
        ease: 'none',
      });

      marqueeLoop('[data-who-marquee]', { duration: 36 });

      gsap.utils.toArray<HTMLElement>('[data-who-panel]').forEach((panel, index) => {
        gsap.from(panel, {
          y: 32,
          rotate: index % 2 === 0 ? -0.8 : 0.8,
          duration: 0.75,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-who-stat]').forEach((card, index) => {
        const counter = card.querySelector<HTMLElement>('[data-who-counter]');
        if (!counter) return;
        const target = Number(counter.dataset.target ?? '0');
        const prefix = counter.dataset.prefix ?? '';
        const suffix = counter.dataset.suffix ?? '';
        const count = { value: 0 };

        gsap.from(card, {
          y: 28,
          rotate: index % 2 === 0 ? -1.2 : 1.2,
          duration: 0.65,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        });

        gsap.to(count, {
          value: target,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => {
            counter.textContent = formatCounterValue(count.value, prefix, suffix);
          },
          onComplete: () => {
            counter.textContent = formatCounterValue(target, prefix, suffix);
          },
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-who-timeline]').forEach((item, index) => {
        gsap.from(item, {
          x: index % 2 === 0 ? -34 : 34,
          y: 14,
          rotate: index % 2 === 0 ? -0.8 : 0.8,
          duration: 0.7,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-who-value]').forEach((card, index) => {
        gsap.from(card, {
          y: 32,
          rotate: index % 2 === 0 ? -1 : 1,
          duration: 0.68,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.to('[data-who-parallax]', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-values-section]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      });

      gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />

      <section className="relative isolate border-b-[5px] border-[#101010] pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-20 -z-10 h-[44px] border-y-[5px] border-[#101010] bg-[#80c738]" />
        <div className="absolute bottom-0 left-0 right-0 -z-10 h-20 border-t-[5px] border-[#101010] bg-[#80c738]" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
          <div data-who-copy className="relative pt-6">
            <p className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-2 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010]">
              About KCIC
            </p>
            <h1
              aria-label="Who we are. Climate ventures need a home."
              className="mt-7 overflow-hidden font-black uppercase leading-[0.88] tracking-normal text-[#101010]"
              style={{ fontSize: 'clamp(2.7rem, 6.4vw, 5.1rem)' }}
            >
              <span className="block overflow-hidden pb-1">
                <span data-who-word className="block">
                  Who we are.
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-who-word className="inline-block bg-[#80c738] px-3 text-[#0b110d]">
                  Climate ventures need a home.
                </span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#28261d]">
              Kenya Climate Innovation Centre is a climate entrepreneurship hub that helps enterprises turn practical
              ideas into resilient businesses, stronger communities, and measurable climate impact.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/programmes"
                className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:shadow-[9px_9px_0_#101010]"
              >
                Explore programmes
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/how-we-work/partners"
                className="inline-flex rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
              >
                Our partners
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[500px]">
            <svg className="absolute inset-0 h-full w-full text-[#101010]/45" viewBox="0 0 760 560" fill="none" aria-hidden="true">
              <path data-who-line d="M84 466C184 326 288 396 367 245C438 110 550 146 659 65" stroke="currentColor" strokeWidth="3" strokeDasharray="10 12" />
              <path data-who-line d="M109 104H620V496H109V104Z" stroke="currentColor" strokeWidth="2" />
              <path data-who-line d="M109 300H620" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
              <path data-who-line d="M362 104V496" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
            </svg>

            <div data-who-photo className="absolute left-[3%] top-[8%] h-[260px] w-[64%] -rotate-2 overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[10px_10px_0_#101010]">
              <Image src="/images/africa.jpg" alt="African landscape representing KCIC's regional climate innovation work" fill priority sizes="(min-width: 1024px) 44vw, 90vw" className="object-cover" />
              <div className="absolute left-0 top-0 border-b-[3px] border-r-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-xs font-black uppercase text-[#101010]">
                Origin map
              </div>
            </div>
            <div data-who-photo className="absolute bottom-[8%] right-[2%] h-[250px] w-[54%] rotate-2 overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[10px_10px_0_#101010]">
              <Image src="/images/sectors/nature.jpg" alt="Nature-based climate solution landscape" fill sizes="(min-width: 1024px) 36vw, 80vw" className="object-cover" />
              <div className="absolute bottom-0 left-0 bg-[#101010] px-3 py-1.5 text-xs font-black uppercase text-[#fff7df]">
                Climate resilience
              </div>
            </div>
          </div>
        </div>

        <div className="border-y-[5px] border-[#101010] bg-[#80c738] py-4">
          <div className="flex w-max gap-3 whitespace-nowrap" data-who-marquee>
            {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex -rotate-1 items-center border-[3px] border-[#101010] bg-[#fff7df] px-5 py-2 text-lg font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main>
        <section className="bg-[#fff7df] py-10 sm:py-14">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {stats.map((stat, index) => (
              <article key={stat.label} data-who-stat className="min-h-[210px] border-[3px] border-[#101010] bg-[#fff7df] p-6 shadow-[8px_8px_0_#101010]">
                <p className="mb-8 bg-[#101010] px-2 py-1 text-xs font-black uppercase text-[#fff7df]">Metric 0{index + 1}</p>
                <p className="font-black uppercase leading-none text-[#101010]" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}>
                  <span data-who-counter data-target={stat.target} data-prefix={stat.prefix} data-suffix={stat.suffix}>
                    {formatCounterValue(0, stat.prefix, stat.suffix)}
                  </span>
                </p>
                <p className="mt-4 border-t-[3px] border-[#101010] pt-4 text-sm font-black uppercase leading-tight text-[#28261d]">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y-[5px] border-[#101010] bg-[#101010] py-14 text-[#fff7df] sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <article data-who-panel className="border-[3px] border-[#fff7df] bg-[#80c738] p-7 text-[#101010] shadow-[10px_10px_0_#fff7df] sm:p-9">
              <Target className="h-10 w-10" weight="fill" aria-hidden="true" />
              <p className="mt-7 inline-block bg-[#101010] px-3 py-1.5 text-sm font-black uppercase text-[#fff7df]">Our mission</p>
              <h2 className="mt-6 font-black uppercase leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                We catalyze climate entrepreneurship.
              </h2>
              <p className="mt-5 max-w-xl text-base font-medium leading-8">
                By nurturing bold ideas into market-ready ventures, we deliver measurable environmental and economic impact across Kenya and East Africa.
              </p>
            </article>

            <article data-who-panel className="border-[3px] border-[#fff7df] bg-[#fff7df] p-7 text-[#101010] shadow-[10px_10px_0_#80c738] sm:p-9">
              <Compass className="h-10 w-10" weight="fill" aria-hidden="true" />
              <p className="mt-7 inline-block bg-[#80c738] px-3 py-1.5 text-sm font-black uppercase text-[#101010]">Our vision</p>
              <h2 className="mt-6 font-black uppercase leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Sustainable enterprises. Climate-resilient communities.
              </h2>
              <p className="mt-5 max-w-xl text-base font-medium leading-8 text-[#28261d]">
                A future where every Kenyan community thrives through innovation, clean technology, and climate-smart economic growth.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-[#fff7df] py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
            <aside data-who-panel className="self-start border-[5px] border-[#101010] bg-[#101010] p-7 text-[#fff7df] shadow-[10px_10px_0_#80c738] sm:p-9">
              <Leaf className="h-10 w-10 text-[#80c738]" weight="fill" aria-hidden="true" />
              <p className="mt-7 inline-block border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#fff7df]">
                Our story
              </p>
              <h2 className="mt-6 font-black uppercase leading-tight" style={{ fontSize: 'clamp(2.2rem, 4.8vw, 4rem)' }}>
                Twelve years of climate impact.
              </h2>
              <p className="mt-6 text-base font-medium leading-8 text-[#fff7df]/75">
                From a World Bank pilot to Kenya's most recognised climate innovation hub, our journey is one of bold bets, deep partnerships, and lasting change.
              </p>
            </aside>

            <div className="space-y-5">
              {timeline.map((item, index) => (
                <article key={item.year} data-who-timeline className="grid gap-4 border-[3px] border-[#101010] bg-[#fff7df] p-5 shadow-[7px_7px_0_#101010] sm:grid-cols-[150px_1fr] sm:p-6">
                  <div>
                    <p className="inline-block bg-[#80c738] px-3 py-1 text-2xl font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
                      {item.year}
                    </p>
                    <p className="mt-4 text-xs font-black uppercase text-[#28261d]">Step 0{index + 1}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase leading-tight text-[#101010]">{item.label}</h3>
                    <p className="mt-3 text-base font-medium leading-8 text-[#28261d]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-who-panel className="border-y-[5px] border-[#101010] bg-[#80c738] px-4 py-14 text-center sm:py-20">
          <p className="mx-auto max-w-5xl font-black uppercase leading-tight text-[#101010]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            We combine entrepreneurship, technology, and strategic partnerships to turn climate challenges into lasting opportunity.
          </p>
        </section>

        <section data-values-section className="relative isolate overflow-hidden py-16 sm:py-24">
          <div data-who-parallax className="absolute inset-0 -z-20 scale-110">
            <Image src="/images/sectors/nature.jpg" alt="Nature landscape behind KCIC values" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-[#101010]/78" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div data-who-panel className="mb-10 grid gap-6 border-[5px] border-[#fff7df] bg-[#101010] p-6 text-[#fff7df] shadow-[10px_10px_0_#80c738] sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="inline-block -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#fff7df]">
                  What drives us
                </p>
                <h2 className="mt-6 font-black uppercase leading-tight" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.8rem)' }}>
                  Our values stay visible in the work.
                </h2>
              </div>
              <p className="max-w-2xl self-end text-base font-medium leading-8 text-[#fff7df]/75">
                Six principles guide every decision, every partnership, and every innovation we champion.
              </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map(({ title, description, Icon }, index) => (
                <article key={title} data-who-value className="min-h-[230px] border-[3px] border-[#101010] bg-[#fff7df] p-6 text-[#101010] shadow-[8px_8px_0_#80c738] transition duration-300 hover:-translate-y-1 hover:shadow-[11px_11px_0_#80c738]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center border-[3px] border-[#101010] bg-[#80c738] shadow-[4px_4px_0_#101010]">
                      <Icon className="h-6 w-6" weight="fill" aria-hidden="true" />
                    </span>
                    <span className="bg-[#101010] px-2 py-1 text-xs font-black text-[#fff7df]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-2xl font-black uppercase leading-tight">{title}</h3>
                  <p className="mt-3 border-t-[3px] border-[#101010] pt-4 text-sm font-medium leading-relaxed text-[#28261d]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
