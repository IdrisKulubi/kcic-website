'use client';

import Link from 'next/link';
import { impactNavItems, type ImpactNavHref } from '@/data/impact';

export function ImpactSectionNav({ activeHref }: { activeHref: ImpactNavHref }) {
  return (
    <nav aria-label="Impact section" className="flex flex-wrap gap-3">
      {impactNavItems.map((item) => {
        const isActive = item.href === activeHref;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex border-[3px] border-[#101010] px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5 ${
              isActive
                ? 'bg-[#80c738] text-[#101010]'
                : 'bg-[#fff7df] text-[#101010] hover:bg-[#80c738]'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
