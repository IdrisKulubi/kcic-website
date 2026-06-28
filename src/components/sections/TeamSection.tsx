"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, Twitter } from "lucide-react";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import {
  drawSvgPaths,
  gsap,
  marqueeLoop,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from "@/lib/gsap-foundation";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category?: string;
  bio?: string;
  photo: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
}

interface TeamSectionProps {
  members: TeamMember[];
  title?: string;
  subtitle?: string;
  preferredOrder?: string[];
  showViewAll?: boolean;
  viewAllHref?: string;
}

const tickerItems = ["Board", "Management", "Enterprise support", "Finance readiness", "Market links", "Climate delivery"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TeamPhoto({ member, priority = false }: { member: TeamMember; priority?: boolean }) {
  if (!member.photo) {
    return (
      <div className="grid h-full w-full place-items-center bg-[#80c738] text-4xl font-black text-[#101010]">
        {getInitials(member.name)}
      </div>
    );
  }

  return (
    <Image
      src={member.photo}
      alt={member.name}
      fill
      priority={priority}
      unoptimized
      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 90vw"
      className="object-cover object-top transition duration-700 ease-out group-hover:scale-105"
    />
  );
}

function ContactLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="grid h-10 w-10 place-items-center border-2 border-[#101010] bg-[#fff7df] text-[#101010] shadow-[3px_3px_0_#80c738] transition hover:-translate-y-0.5 hover:bg-[#80c738]"
    >
      {children}
    </Link>
  );
}

export function TeamSection({
  members,
  title = "Meet Our Team",
  subtitle = "Connect with our team to learn more about the work that we do",
  preferredOrder = ["Management", "Board"],
  showViewAll = false,
  viewAllHref = "/about/staff",
}: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { categories, groupedMembers, orderedMembers } = useMemo(() => {
    const sortedMembers = [...members].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const groups = sortedMembers.reduce<Record<string, TeamMember[]>>((acc, member) => {
      const key = (member.category || "Team").trim() || "Team";
      if (!acc[key]) acc[key] = [];
      acc[key].push(member);
      return acc;
    }, {});

    const sortedCategories = [
      ...preferredOrder.filter((category) => groups[category]),
      ...Object.keys(groups)
        .filter((category) => !preferredOrder.includes(category))
        .sort((a, b) => a.localeCompare(b)),
    ];

    return { categories: sortedCategories, groupedMembers: groups, orderedMembers: sortedMembers };
  }, [members, preferredOrder]);

  const selectedMember = orderedMembers.find((member) => member.id === selectedId) ?? null;

  useLayoutEffect(() => {
    if (!sectionRef.current || orderedMembers.length === 0) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-team-word]", { yPercent: 110, rotate: 2 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        defaults: { ease: "power4.out" },
      });

      intro
        .add(drawSvgPaths("[data-team-line]", { dash: 620, duration: 0.9, stagger: 0.05 }))
        .to("[data-team-word]", { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.08 }, "-=0.35")
        .from("[data-team-copy]", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.35");

      marqueeLoop("[data-team-marquee]", { duration: 42 });

      gsap.utils.toArray<HTMLElement>("[data-team-category]").forEach((category) => {
        gsap.from(category, {
          y: 24,
          rotate: -0.5,
          duration: 0.72,
          ease: "power4.out",
          scrollTrigger: {
            trigger: category,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-team-card]").forEach((card, index) => {
        gsap.from(card, {
          y: 34,
          rotate: index % 2 === 0 ? -1.1 : 1.1,
          duration: 0.74,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.to("[data-team-photo]", {
        y: (index) => (index % 2 === 0 ? -16 : 14),
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

    return () => ctx.revert();
  }, [orderedMembers.length, categories.length]);

  useLayoutEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [selectedId]);

  if (members.length === 0) {
    return (
      <section className="border-y-[5px] border-[#101010] bg-[#fff7df] py-16 text-[#101010]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-[5px] border-[#101010] bg-[#fff7df] p-7 shadow-[10px_10px_0_#101010]">
            <p className="inline-block bg-[#80c738] px-3 py-1 text-sm font-black uppercase">Team directory</p>
            <h2 className="mt-6 font-black uppercase leading-tight" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}>
              Team profiles are loading.
            </h2>
          </div>
        </div>
      </section>
    );
  }

  let globalIndex = 0;

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden border-y-[5px] border-[#101010] bg-[#fff7df] py-14 text-[#101010] sm:py-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-16 border-b-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />
      <svg className="absolute right-[-5rem] top-20 -z-10 hidden h-[360px] w-[560px] text-[#101010]/45 lg:block" viewBox="0 0 560 360" fill="none" aria-hidden="true">
        <path data-team-line d="M28 286C112 126 228 190 310 96C392 1 464 80 536 28" stroke="currentColor" strokeWidth="3" strokeDasharray="10 12" />
        <path data-team-line d="M37 328C149 274 213 342 310 269C416 190 475 285 540 214" stroke="currentColor" strokeWidth="2" strokeDasharray="8 10" />
        <path data-team-line d="M84 62H480V318H84V62Z" stroke="currentColor" strokeWidth="2" />
        <path data-team-line d="M84 190H480" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
        <path data-team-line d="M282 62V318" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-2 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010]">
              <Sparkle className="h-4 w-4" weight="fill" aria-hidden="true" />
              Our team
            </p>
            <h2
              aria-label={title}
              className="mt-7 max-w-4xl overflow-hidden font-black uppercase leading-[0.9] tracking-normal text-[#101010]"
              style={{ fontSize: "clamp(2.65rem, 6vw, 4.75rem)" }}
            >
              <span className="block overflow-hidden pb-1">
                <span data-team-word className="block">
                  People behind
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-team-word className="inline-block bg-[#80c738] px-3 text-[#0b110d]">
                  the work.
                </span>
              </span>
            </h2>
          </div>
          <div data-team-copy className="border-[3px] border-[#101010] bg-[#fff7df] p-5 shadow-[8px_8px_0_#101010]">
            <p className="text-base font-medium leading-8 text-[#28261d]">{subtitle}</p>
            <p className="mt-4 inline-block bg-[#101010] px-3 py-1.5 text-sm font-black uppercase text-[#fff7df]">
              {orderedMembers.length} team members
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 border-y-[5px] border-[#101010] bg-[#80c738] py-4">
        <div className="flex w-max gap-3 whitespace-nowrap" data-team-marquee>
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex -rotate-1 items-center border-[3px] border-[#101010] bg-[#fff7df] px-5 py-2 text-lg font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        {selectedMember && (
          <section data-team-category className="mb-10 grid gap-7 border-[5px] border-[#101010] bg-[#101010] p-6 text-[#fff7df] shadow-[10px_10px_0_#80c738] sm:p-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="inline-block -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#fff7df]">
                Selected profile
              </p>
              <h3 className="mt-6 font-black uppercase leading-tight" style={{ fontSize: "clamp(2.25rem, 5vw, 3.8rem)" }}>
                {selectedMember.name}
              </h3>
              <p className="mt-4 text-base font-black uppercase text-[#80c738]">{selectedMember.role}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-[220px_1fr]">
              <div className="relative min-h-[260px] overflow-hidden border-[3px] border-[#fff7df] bg-[#fff7df] shadow-[6px_6px_0_#80c738]">
                <TeamPhoto member={selectedMember} priority />
              </div>
              <div className="flex flex-col justify-end">
                {selectedMember.bio ? (
                  <p className="text-base font-medium leading-8 text-[#fff7df]/80">{selectedMember.bio}</p>
                ) : (
                  <p className="text-base font-medium leading-8 text-[#fff7df]/80">
                    This profile is part of KCIC&apos;s team directory, bringing specialist leadership and delivery support to climate enterprises.
                  </p>
                )}
                {(selectedMember.email || selectedMember.linkedin || selectedMember.twitter) && (
                  <div className="mt-6 flex gap-3">
                    {selectedMember.email && (
                      <ContactLink href={`mailto:${selectedMember.email}`} label={`Email ${selectedMember.name}`}>
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </ContactLink>
                    )}
                    {selectedMember.linkedin && (
                      <ContactLink href={selectedMember.linkedin} label={`${selectedMember.name} on LinkedIn`}>
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                      </ContactLink>
                    )}
                    {selectedMember.twitter && (
                      <ContactLink href={selectedMember.twitter} label={`${selectedMember.name} on Twitter`}>
                        <Twitter className="h-4 w-4" aria-hidden="true" />
                      </ContactLink>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {categories.map((category) => {
          const categoryMembers = groupedMembers[category] ?? [];

          return (
            <section key={category} data-team-category className="mb-14 last:mb-0">
              <div className="mb-8 flex flex-col gap-4 border-t-[5px] border-[#101010] pt-7 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="inline-block -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
                    {category}
                  </p>
                  <h3 className="mt-5 max-w-3xl font-black uppercase leading-tight tracking-normal text-[#101010]" style={{ fontSize: "clamp(2rem, 4vw, 2.7rem)" }}>
                    {categoryMembers.length} profile{categoryMembers.length === 1 ? "" : "s"} in this section.
                  </h3>
                </div>
                <p className="max-w-md border-[3px] border-[#101010] bg-[#fff7df] p-4 text-sm font-medium leading-relaxed text-[#28261d] shadow-[5px_5px_0_#101010]">
                  Select a profile to read more. Select it again to close the expanded view.
                </p>
              </div>

              <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryMembers.map((member) => {
                  const index = globalIndex++;
                  const isSelected = selectedMember?.id === member.id;

                  return (
                    <article
                      key={member.id}
                      data-team-card
                      className={`group relative self-start overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[9px_9px_0_#101010] transition duration-500 ease-out hover:-translate-y-1 hover:rotate-[-0.35deg] hover:shadow-[13px_13px_0_#80c738] ${
                        isSelected ? "bg-[#f4ffd9] shadow-[13px_13px_0_#80c738]" : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(isSelected ? null : member.id)}
                        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#335016] focus-visible:ring-offset-4"
                        aria-expanded={isSelected}
                      >
                        <div data-team-photo className="relative h-[310px] overflow-hidden border-b-[3px] border-[#101010] bg-[#80c738]">
                          <TeamPhoto member={member} priority={index < 2} />
                          <div className="absolute left-0 top-0 border-b-[3px] border-r-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-xs font-black uppercase text-[#101010]">
                            {category}
                          </div>
                          <div className="absolute bottom-4 left-4 bg-[#101010] px-3 py-1.5 text-xs font-black text-[#fff7df]">
                            0{(index % 9) + 1}
                          </div>
                        </div>

                        <div className="p-5">
                          <h4 className="text-2xl font-black uppercase leading-tight text-[#101010]">{member.name}</h4>
                          <p className="mt-3 min-h-[44px] text-sm font-black uppercase leading-snug text-[#4d7822]">{member.role}</p>
                          <div className="mt-5 flex items-center justify-between gap-4 border-t-[3px] border-[#101010] pt-4">
                            <span className="text-sm font-black uppercase text-[#101010]">{isSelected ? "Close profile" : "Open profile"}</span>
                            <span className="grid h-10 w-10 place-items-center border-2 border-[#101010] bg-[#80c738] text-[#101010] shadow-[3px_3px_0_#101010] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                              <ArrowRight className={`h-4 w-4 transition duration-300 ${isSelected ? "rotate-90" : ""}`} weight="bold" aria-hidden="true" />
                            </span>
                          </div>
                        </div>
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              href={viewAllHref}
              className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1 hover:shadow-[9px_9px_0_#101010]"
            >
              View full team
              <ArrowRight className="h-4 w-4" weight="bold" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamSection;
