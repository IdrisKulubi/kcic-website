"use client";

const HUBS = [
  "Kiambu",
  "Bungoma",
  "Kilifi",
  "Uasin Gishu",
  "Meru",
  "Isiolo",
  "Machakos",
  "Kisii",
] as const;

export function AgriBizKenyaMap({ accentColor }: { accentColor: string }) {
  return (
    <section className="mb-16 sm:mb-20" aria-labelledby="agribiz-hub-counties-heading">
      <h3
        id="agribiz-hub-counties-heading"
        className="mb-5 inline-block border-[3px] border-[#101010] bg-[#101010] px-3 py-1.5 text-xs font-black uppercase text-[#fff7df] shadow-[3px_3px_0_#80c738]"
      >
        Hub counties
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Business Incubation Hub counties">
        {HUBS.map((hub) => (
          <li
            key={hub}
            className="flex items-center gap-3 border-2 border-[#101010] bg-[#fff7df] px-4 py-3 shadow-[3px_3px_0_#101010]"
          >
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: accentColor }} aria-hidden />
            <span className="text-sm font-medium text-[#101010]">{hub}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
