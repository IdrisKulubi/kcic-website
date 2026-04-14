"use client";

import Image from "next/image";

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
    <section className="mb-20 border-t border-gray-200 pt-14" aria-labelledby="flagship-partners-heading">
      <h2 id="flagship-partners-heading" className="text-lg font-semibold tracking-tight text-gray-900 mb-2">
        {title}
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-2xl">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {partners.map((p) => (
          <article
            key={p.role + p.name}
            className="flex flex-col border border-gray-100 rounded-lg bg-white p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-4">{p.role}</p>
            <div className="relative h-12 w-full max-w-[120px] mb-4">
              <Image src={p.logoSrc} alt={p.name} fill className="object-contain object-left" sizes="120px" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 leading-snug">{p.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
