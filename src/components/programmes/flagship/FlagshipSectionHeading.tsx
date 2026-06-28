import type { ReactNode } from 'react';

export function FlagshipSectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="programme-section-heading mb-8 inline-block border-[3px] border-[#101010] bg-[#101010] px-4 py-2 text-sm font-black uppercase tracking-wide text-[#fff7df] shadow-[4px_4px_0_#80c738]"
    >
      {children}
    </h2>
  );
}
