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
  ctas?: FlagshipCtaSpec[];
  programme: ProgrammeData;
}) {
  const resolvedCtas: FlagshipCtaSpec[] =
    ctas && ctas.length > 0
      ? ctas
      : programme.applicationLink
        ? [{ key: "apply", label: "Apply", fallbackHref: programme.applicationLink, external: true }]
        : [];

  if (resolvedCtas.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
      {resolvedCtas.map((cta) => {
        const href = resolveHref(cta, programme);
        if (!href) return null;
        const external = cta.external ?? isExternal(href);
        const isPrimary = cta.key === "apply";
        const className = isPrimary
          ? "inline-flex items-center justify-center border-[3px] border-[#101010] bg-[#80c738] px-5 py-2.5 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#101010] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738]"
          : "inline-flex items-center justify-center border-[3px] border-[#101010] bg-[#fff7df] px-5 py-2.5 text-sm font-medium text-[#101010] shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5 hover:bg-[#f5efd6] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738]";

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
