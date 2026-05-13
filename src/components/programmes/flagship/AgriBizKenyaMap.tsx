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
    <section
      className="mt-12 rounded-lg border border-gray-200 bg-gray-50/50 p-6 sm:p-8"
      aria-labelledby="agribiz-hub-counties-heading"
    >
      <h3 id="agribiz-hub-counties-heading" className="text-sm font-medium text-gray-900 mb-5">
        Hub counties
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Business Incubation Hub counties">
        {HUBS.map((hub) => (
          <li key={hub} className="flex items-center gap-3 rounded-md border border-gray-100 bg-white px-4 py-3">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: accentColor }} aria-hidden />
            <span className="text-sm font-medium text-gray-800">{hub}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
