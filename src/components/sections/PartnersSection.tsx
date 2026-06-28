"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import {
  drawSvgPaths,
  gsap,
  marqueeLoop,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from "@/lib/gsap-foundation";

export interface PartnerData {
  id: string;
  name: string;
  logo: string;
  category?: "donor" | "partner" | "supporter" | "collaborator";
  description?: string;
  website?: string;
  featured?: boolean;
}

interface PartnersSectionProps {
  partners: PartnerData[];
  title?: string;
  subtitle?: string;
}

function PartnerLogoTile({ partner, index }: { partner: PartnerData; index: number }) {
  const content = (
    <div className="group relative flex h-full min-h-[150px] flex-col justify-between overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] p-4 shadow-[7px_7px_0_#101010] transition duration-500 ease-out hover:-translate-y-1 hover:rotate-[-0.35deg] hover:shadow-[10px_10px_0_#80c738]">
      <div className="flex items-start justify-between gap-3">
        <span className="bg-[#101010] px-2 py-1 text-xs font-black text-[#fff7df]">0{(index % 9) + 1}</span>
        {partner.website ? (
          <span className="grid h-8 w-8 place-items-center border-2 border-[#101010] bg-[#80c738] text-[#101010] shadow-[3px_3px_0_#101010] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight className="h-4 w-4" weight="bold" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <div className="relative mx-auto my-5 h-16 w-full max-w-[170px]">
        <Image
          src={partner.logo || "/images/placeholder-logo.png"}
          alt={partner.name}
          fill
          unoptimized
          sizes="(min-width: 1024px) 170px, (min-width: 640px) 150px, 45vw"
          className="object-contain transition duration-500 group-hover:scale-105"
        />
      </div>

      <p className="line-clamp-2 border-t-[3px] border-[#101010] pt-3 text-sm font-black uppercase leading-tight text-[#101010]">
        {partner.name}
      </p>
    </div>
  );

  if (!partner.website) {
    return (
      <article data-partner-card className="h-full">
        {content}
      </article>
    );
  }

  return (
    <Link
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      data-partner-card
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#335016] focus-visible:ring-offset-4"
    >
      {content}
    </Link>
  );
}

function PartnerTickerLogo({ partner }: { partner: PartnerData }) {
  return (
    <div className="mx-3 flex h-24 w-44 shrink-0 items-center justify-center border-[3px] border-[#101010] bg-[#fff7df] px-5 shadow-[5px_5px_0_#101010]">
      <div className="relative h-14 w-full">
        <Image
          src={partner.logo || "/images/placeholder-logo.png"}
          alt={partner.name}
          fill
          unoptimized
          sizes="176px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function PartnersSection({
  partners,
  title = "Our Partners",
  subtitle = "A delivery network behind climate enterprises, funders, public institutions, and ecosystem builders.",
}: PartnersSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { topRow, bottomRow, repeatedPartners } = useMemo(() => {
    const safePartners = partners.filter((partner) => partner.id && partner.logo);
    const midpoint = Math.ceil(safePartners.length / 2);
    const first = safePartners.slice(0, midpoint);
    const second = safePartners.slice(midpoint);
    const fallbackSecond = second.length > 0 ? second : first;

    return {
      topRow: [...first, ...first, ...first, ...first],
      bottomRow: [...fallbackSecond, ...fallbackSecond, ...fallbackSecond, ...fallbackSecond],
      repeatedPartners: safePartners,
    };
  }, [partners]);

  useLayoutEffect(() => {
    if (!sectionRef.current || repeatedPartners.length === 0) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    let cleanupHoverPause: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set("[data-partner-word]", { yPercent: 110, rotate: 2 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        defaults: { ease: "power4.out" },
      });

      intro
        .add(drawSvgPaths("[data-partner-line]", { dash: 560, duration: 0.9, stagger: 0.05 }))
        .to("[data-partner-word]", { yPercent: 0, rotate: 0, duration: 0.78, stagger: 0.08 }, "-=0.35")
        .from("[data-partner-copy]", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.35");

      const leftMarquee = marqueeLoop("[data-partner-marquee-left]", { duration: 100 });
      const rightMarquee = gsap.to("[data-partner-marquee-right]", {
        xPercent: 50,
        duration: 100,
        repeat: -1,
        ease: "none",
      });

      const pauseMarquees = () => {
        leftMarquee.pause();
        rightMarquee.pause();
      };
      const resumeMarquees = () => {
        leftMarquee.resume();
        rightMarquee.resume();
      };
      const rails = gsap.utils.toArray<HTMLElement>("[data-partner-rail]");
      rails.forEach((rail) => {
        rail.addEventListener("pointerenter", pauseMarquees);
        rail.addEventListener("pointerleave", resumeMarquees);
        rail.addEventListener("focusin", pauseMarquees);
        rail.addEventListener("focusout", resumeMarquees);
      });
      cleanupHoverPause = () => {
        rails.forEach((rail) => {
          rail.removeEventListener("pointerenter", pauseMarquees);
          rail.removeEventListener("pointerleave", resumeMarquees);
          rail.removeEventListener("focusin", pauseMarquees);
          rail.removeEventListener("focusout", resumeMarquees);
        });
      };

      gsap.utils.toArray<HTMLElement>("[data-partner-card]").forEach((card, index) => {
        gsap.from(card, {
          y: 32,
          rotate: index % 2 === 0 ? -1.1 : 1.1,
          duration: 0.72,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.to("[data-partner-rail]", {
        x: (index) => (index % 2 === 0 ? -12 : 12),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    }, sectionRef);

    return () => {
      cleanupHoverPause?.();
      ctx.revert();
    };
  }, [repeatedPartners.length]);

  if (repeatedPartners.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden border-y-[5px] border-[#101010] bg-[#fff7df] py-14 text-[#101010] sm:py-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-16 border-b-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />
      <svg className="absolute right-[-5rem] top-20 -z-10 hidden h-[360px] w-[560px] text-[#101010]/45 lg:block" viewBox="0 0 560 360" fill="none" aria-hidden="true">
        <path data-partner-line d="M28 286C112 126 228 190 310 96C392 1 464 80 536 28" stroke="currentColor" strokeWidth="3" strokeDasharray="10 12" />
        <path data-partner-line d="M37 328C149 274 213 342 310 269C416 190 475 285 540 214" stroke="currentColor" strokeWidth="2" strokeDasharray="8 10" />
        <path data-partner-line d="M84 62H480V318H84V62Z" stroke="currentColor" strokeWidth="2" />
        <path data-partner-line d="M84 190H480" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
        <path data-partner-line d="M282 62V318" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-2 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010]">
              Partner network
            </p>
            <h2
              aria-label={title}
              className="mt-7 max-w-4xl overflow-hidden font-black uppercase leading-[0.9] tracking-normal text-[#101010]"
              style={{ fontSize: "clamp(2.65rem, 6vw, 4.75rem)" }}
            >
              <span className="block overflow-hidden pb-1">
                <span data-partner-word className="block">
                  Partners
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-partner-word className="inline-block bg-[#80c738] px-3 text-[#0b110d]">
                  in motion.
                </span>
              </span>
            </h2>
          </div>
          <div data-partner-copy className="border-[3px] border-[#101010] bg-[#fff7df] p-5 shadow-[8px_8px_0_#101010]">
            <p className="text-base font-medium leading-8 text-[#28261d]">{subtitle}</p>
            <p className="mt-4 inline-block bg-[#101010] px-3 py-1.5 text-sm font-black uppercase text-[#fff7df]">
              {repeatedPartners.length} organizations
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4 border-y-[5px] border-[#101010] bg-[#80c738] py-5">
        <div data-partner-rail className="overflow-hidden">
          <div data-partner-marquee-left className="flex w-max">
            {topRow.map((partner, index) => (
              <PartnerTickerLogo key={`top-${partner.id}-${index}`} partner={partner} />
            ))}
          </div>
        </div>
        <div data-partner-rail className="overflow-hidden">
          <div data-partner-marquee-right className="flex w-max -translate-x-1/2">
            {bottomRow.map((partner, index) => (
              <PartnerTickerLogo key={`bottom-${partner.id}-${index}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 border-t-[5px] border-[#101010] pt-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-block -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
              Logo wall
            </p>
            <h3
              className="mt-5 max-w-3xl font-black uppercase leading-tight tracking-normal text-[#101010]"
              style={{ fontSize: "clamp(2rem, 4vw, 2.7rem)" }}
            >
              A visible network of funders, institutions, and ecosystem allies.
            </h3>
          </div>
          <p className="max-w-md border-[3px] border-[#101010] bg-[#fff7df] p-4 text-sm font-medium leading-relaxed text-[#28261d] shadow-[5px_5px_0_#101010]">
            The network behind KCIC spans climate finance, public institutions, enterprise support, and implementation partners.
          </p>
        </div>

        <div className="grid grid-cols-2 items-start gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {repeatedPartners.map((partner, index) => (
            <PartnerLogoTile key={partner.id} partner={partner} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
