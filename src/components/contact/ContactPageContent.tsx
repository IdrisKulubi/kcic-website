'use client';

import { useLayoutEffect, useRef } from 'react';
import {
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
} from '@phosphor-icons/react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';
import { homePageData } from '@/data/home';
import {
  drawSvgPaths,
  gsap,
  marqueeLoop,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from '@/lib/gsap-foundation';

const contactTicker = [
  'Get in touch',
  'Visit our hub',
  'Partnerships',
  'Programmes',
  'Nairobi HQ',
  'Climate innovation',
];

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7752656026228!2d36.81002607569015!3d-1.3101592356541791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10f7bbc30573%3A0xb822a84e63d8c610!2sKenya%20Climate%20Innovation%20Center!5e0!3m2!1sen!2ske!4v1762525310440!5m2!1sen!2ske';

const contactCards = [
  {
    title: 'Visit us',
    Icon: MapPin,
    lines: [
      'Kenya Climate Innovation Centre',
      'Strathmore University Campus',
      'Ole Sangale Road, Madaraka',
      'Nairobi, Kenya',
    ],
  },
  {
    title: 'Call us',
    Icon: Phone,
    lines: ['+254 703 034 701', 'Mon - Fri: 8:00 AM - 5:00 PM', 'EAT (UTC+3)'],
    href: 'tel:+254703034701',
    linkLabel: '+254 703 034 701',
  },
  {
    title: 'Email us',
    Icon: EnvelopeSimple,
    lines: ['info@kenyacic.org'],
    href: 'mailto:info@kenyacic.org',
    linkLabel: 'info@kenyacic.org',
  },
  {
    title: 'Office hours',
    Icon: Clock,
    lines: ['Monday - Friday', '8:00 AM - 5:00 PM', 'East Africa Time (EAT)', 'UTC+3'],
  },
];

function ContactCard({
  title,
  Icon,
  lines,
  href,
  linkLabel,
  index,
}: {
  title: string;
  Icon: typeof MapPin;
  lines: string[];
  href?: string;
  linkLabel?: string;
  index: number;
}) {
  const rotate = index % 2 === 0 ? '-rotate-1' : 'rotate-1';

  return (
    <article
      data-contact-card
      className={`${rotate} border-[5px] border-[#101010] bg-[#fff7df] p-6 shadow-[10px_10px_0_#101010] transition duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0_#80c738] sm:p-7`}
    >
      <div className="flex items-start gap-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center border-[4px] border-[#101010] bg-[#80c738] shadow-[5px_5px_0_#101010]">
          <Icon className="h-8 w-8" weight="bold" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="w-fit border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
            {title}
          </h2>
          <ul className="mt-5 space-y-2 text-base font-medium leading-7 text-[#28261d]">
            {lines.map((line) => (
              <li key={line}>
                {href && linkLabel === line ? (
                  <a href={href} className="font-black text-[#4f8618] underline">
                    {line}
                  </a>
                ) : (
                  line
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function ContactPageContent() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-contact-word]', { yPercent: 110, rotate: 2 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .add(drawSvgPaths('[data-contact-line]', { dash: 760, duration: 0.95, stagger: 0.05 }))
        .to('[data-contact-word]', { yPercent: 0, rotate: 0, duration: 0.82, stagger: 0.07 }, '-=0.35')
        .from('[data-contact-copy]', { autoAlpha: 0, y: 20, duration: 0.58, stagger: 0.06 }, '-=0.25');

      marqueeLoop('[data-contact-marquee]', { duration: 46 });

      gsap.to('[data-contact-line]', {
        strokeDashoffset: -42,
        duration: 9,
        repeat: -1,
        ease: 'none',
      });

      gsap.utils.toArray<HTMLElement>('[data-contact-card], [data-contact-map]').forEach((item, index) => {
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

      gsap.to('[data-contact-float]', {
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
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />

      <section className="relative isolate border-b-[5px] border-[#101010] pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-20 -z-10 h-[44px] border-y-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 -z-10 h-20 border-t-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
          <div data-contact-copy className="relative pt-6">
            <p className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-2 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010]">
              Contact
            </p>
            <h1
              aria-label="Get in touch. Build together."
              className="mt-7 overflow-hidden font-black uppercase leading-[0.88] tracking-normal text-[#101010]"
              style={{ fontSize: 'clamp(2.7rem, 7vw, 6rem)' }}
            >
              <span className="block overflow-hidden pb-1">
                <span data-contact-word className="block">
                  Get in touch.
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-contact-word className="inline-block bg-[#80c738] px-3 text-[#0b110d]">
                  Build together.
                </span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#28261d]">
              Have a question about our programmes, investment opportunities, or collaboration? Reach out and our team
              will connect you with the right people.
            </p>
          </div>

          <div data-contact-float className="relative min-h-[470px]">
            <svg className="absolute inset-0 h-full w-full text-[#101010]" viewBox="0 0 760 520" fill="none" aria-hidden="true">
              <path data-contact-line d="M95 87H574V442H95V87Z" stroke="currentColor" strokeWidth="5" />
              <path data-contact-line d="M133 145H520" stroke="currentColor" strokeWidth="5" />
              <path data-contact-line d="M133 209H480" stroke="currentColor" strokeWidth="5" />
              <path data-contact-line d="M133 273H528" stroke="currentColor" strokeWidth="5" />
              <path data-contact-line d="M133 337H402" stroke="currentColor" strokeWidth="5" />
              <path data-contact-line d="M612 123C660 149 689 194 699 257C710 325 689 381 637 424" stroke="currentColor" strokeWidth="4" />
              <path data-contact-line d="M58 404C115 475 207 491 336 453" stroke="currentColor" strokeWidth="4" />
              <path data-contact-line d="M594 74L674 54L693 129L613 149L594 74Z" stroke="currentColor" strokeWidth="5" />
              <path data-contact-line d="M614 102L674 87" stroke="currentColor" strokeWidth="4" />
            </svg>

            <div className="absolute left-4 top-10 rotate-[-4deg] border-[4px] border-[#101010] bg-[#80c738] px-5 py-3 text-lg font-black uppercase shadow-[7px_7px_0_#101010] sm:left-14">
              HQ desk
            </div>
            <div className="absolute right-4 top-28 rotate-3 border-[4px] border-[#101010] bg-[#fff7df] px-5 py-4 shadow-[7px_7px_0_#101010] sm:right-12">
              <p className="text-xs font-black uppercase text-[#58523f]">Location</p>
              <p className="text-3xl font-black uppercase leading-none">Nairobi</p>
            </div>
            <div className="absolute bottom-14 left-8 max-w-[260px] -rotate-2 border-[4px] border-[#101010] bg-[#101010] px-5 py-4 text-[#fff7df] shadow-[7px_7px_0_#80c738] sm:left-20">
              <p className="text-xs font-black uppercase text-[#80c738]">Office hours</p>
              <p className="mt-2 text-lg font-black uppercase leading-tight">Open weekdays</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden border-t-[5px] border-[#101010] bg-[#101010] py-4 text-[#fff7df]">
          <div data-contact-marquee className="flex w-max gap-7 whitespace-nowrap">
            {[...contactTicker, ...contactTicker, ...contactTicker].map((item, index) => (
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
          <section aria-label="Contact information" className="grid gap-8 md:grid-cols-2">
            {contactCards.map((card, index) => (
              <ContactCard key={card.title} {...card} index={index} />
            ))}
          </section>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:info@kenyacic.org"
              className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-5 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:shadow-[9px_9px_0_#101010]"
            >
              <EnvelopeSimple className="h-4 w-4" weight="bold" aria-hidden="true" />
              Email us
            </a>
            <a
              href="tel:+254703034701"
              className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-5 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
            >
              <Phone className="h-4 w-4" weight="bold" aria-hidden="true" />
              Call us
            </a>
          </div>

          <section data-contact-map className="mt-16 border-t-[5px] border-[#101010] pt-12">
            <p className="w-fit -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase shadow-[4px_4px_0_#101010]">
              Find us
            </p>
            <h2 className="mt-6 max-w-3xl text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
              Visit our innovation hub in Nairobi.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#28261d]">
              We&apos;re located within Strathmore University&apos;s campus — easily accessible and surrounded by a
              community of innovators, investors, and sustainability leaders.
            </p>

            <div className="mt-10 overflow-hidden border-[5px] border-[#101010] bg-[#fff7df] shadow-[10px_10px_0_#101010]">
              <div className="aspect-video">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kenya Climate Innovation Centre location"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
