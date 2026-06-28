"use client";

import Image from "next/image";
import { FlagshipSectionHeading } from "./FlagshipSectionHeading";

export function FlagshipStrategicPartners({
  title,
  subtitle,
  partners,
}: {
  title: string;
  subtitle: string;
  partners: { role: string; name: string; logoSrc: string }[];
}) {
  return (
    <section className="mb-16 sm:mb-20" aria-labelledby="flagship-partners-heading">
      <FlagshipSectionHeading id="flagship-partners-heading">{title}</FlagshipSectionHeading>
      <p className="mb-8 max-w-2xl text-base font-medium leading-7 text-[#28261d]">{subtitle}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((p) => (
          <article
            key={p.role + p.name}
            className="flex flex-col border-[3px] border-[#101010] bg-[#fff7df] p-4 shadow-[5px_5px_0_#101010] sm:p-5"
          >
            <p className="mb-3 text-[10px] font-black uppercase tracking-wider text-[#58523f]">{p.role}</p>
            <div className="relative mb-4 h-12 w-full max-w-[120px]">
              <Image src={p.logoSrc} alt={p.name} fill className="object-contain object-left" sizes="120px" />
            </div>
            <h3 className="text-sm font-black uppercase leading-snug text-[#101010]">{p.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
