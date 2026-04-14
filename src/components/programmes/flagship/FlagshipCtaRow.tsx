"use client";

import Link from "next/link";
import type { FlagshipCtaSpec } from "@/data/flagship-programmes";
import type { ProgrammeData } from "@/lib/actions/programmes";

function resolveHref(cta: FlagshipCtaSpec, programme: ProgrammeData): string | null {
  if (cta.key === "apply") {
    return programme.applicationLink ?? cta.fallbackHref ?? null;
  }
  return cta.href ?? null;
}

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function FlagshipCtaRow({
  ctas,
  programme,
}: {
  ctas: FlagshipCtaSpec[];
  programme: ProgrammeData;
}) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
      {ctas.map((cta) => {
        const href = resolveHref(cta, programme);
        if (!href) return null;
        const external = cta.external ?? isExternal(href);
        const base =
          "inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900";
        const primary = `${base} bg-white text-gray-900 hover:bg-gray-100`;
        const secondary = `${base} bg-white/10 text-white border border-white/25 hover:bg-white/15`;

        const className = cta.key === "apply" ? primary : secondary;

        const label = (
          <>
            {cta.label}
            {external ? <span className="sr-only"> (opens in new tab)</span> : null}
          </>
        );

        if (external) {
          return (
            <a key={cta.key} href={href} target="_blank" rel="noopener noreferrer" className={className}>
              {label}
            </a>
          );
        }

        return (
          <Link key={cta.key} href={href} className={className}>
            {label}
          </Link>
        );
      })}
    </div>
  );
}
