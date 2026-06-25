"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { BLUR_DATA_URL } from "@/lib/image-utils";
import {
  gsap,
  prefersReducedMotion,
  registerGsapFoundation,
} from "@/lib/gsap-foundation";

interface AwardItem {
  title: string;
  subtitle?: string;
  image: string;
}

const DEFAULT_AWARDS: AwardItem[] = [
  {
    title: "SME Enabler of the Year 2024/2025",
    subtitle: "KEPSA",
    image: "/images/awards/kepsa.jpg",
  },
  {
    title: "Circular Economy Financier of the Year",
    subtitle: "2024 CE Conference",
    image: "/images/awards/financier.jpg",
  },
  {
    title: "Green Economy Champion of the Year",
    subtitle: "2025",
    image: "/images/awards/assekk.jpg",
  },
];

export default function AwardsSection({ awards = DEFAULT_AWARDS }: { awards?: AwardItem[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { shouldDisableAnimations } = useAccessibilityClasses();

  useLayoutEffect(() => {
    if (!sectionRef.current || prefersReducedMotion() || shouldDisableAnimations?.()) return;

    registerGsapFoundation();

    const ctx = gsap.context(() => {
      gsap.from("[data-awards-title]", {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
        },
      });

      gsap.from("[data-award-card]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="awards-heading"
      className="relative isolate overflow-hidden border-y-[5px] border-[#101010] py-12 sm:py-14"
      style={{ backgroundColor: "#00addd" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12" data-awards-title>
          <h2
            id="awards-heading"
            className="mb-4 inline-block border-[3px] border-[#101010] bg-[#fff7df] px-4 py-2 text-sm font-black uppercase tracking-wide text-[#101010] shadow-[4px_4px_0_#80c738]"
          >
            Awards & Recognition
          </h2>
          <p className="mx-auto max-w-2xl text-base font-black leading-7 text-[#101010] sm:text-lg">
            Celebrating milestones from our ecosystem partners and industry bodies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {awards.map((award, index) => (
            <article
              key={award.title}
              data-award-card
              className="group flex flex-col border-[3px] border-[#101010] bg-[#fff7df] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#101010]"
            >
              <div className="border-b-2 border-[#101010] p-3 sm:p-4">
                <div className="relative aspect-4/3 overflow-hidden border-2 border-[#101010]">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span
                    className="tabular-nums text-[0.6875rem] font-black uppercase tracking-[0.2em] text-[#101010]/40"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {award.subtitle ? (
                    <span className="inline-flex border-2 border-[#101010] bg-[#80c738] px-2.5 py-1 text-[0.6875rem] font-black uppercase tracking-wide text-[#101010] shadow-[2px_2px_0_#101010]">
                      {award.subtitle}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-base font-black leading-snug text-[#101010] sm:text-lg">
                  {award.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
