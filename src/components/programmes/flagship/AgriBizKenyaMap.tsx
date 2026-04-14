"use client";

const HUBS = [
  { name: "Kiambu", left: "52%", top: "38%" },
  { name: "Bungoma", left: "22%", top: "32%" },
  { name: "Kilifi", left: "68%", top: "58%" },
  { name: "Uasin Gishu", left: "38%", top: "28%" },
  { name: "Meru", left: "62%", top: "22%" },
  { name: "Isiolo", left: "55%", top: "18%" },
  { name: "Machakos", left: "58%", top: "48%" },
  { name: "Kisii", left: "28%", top: "52%" },
] as const;

export function AgriBizKenyaMap({ accentColor }: { accentColor: string }) {
  return (
    <figure
      className="mt-12 rounded-lg border border-gray-200 bg-gray-50/50 p-6 sm:p-8"
      aria-label="Schematic map of Kenya showing eight Business Incubation Hub counties"
    >
      <figcaption className="text-sm font-medium text-gray-900 mb-4">Hub counties</figcaption>
      <div className="relative mx-auto aspect-[4/5] max-w-sm w-full rounded bg-white border border-gray-100">
        <svg className="absolute inset-2 text-gray-200" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path
            d="M95 20c18 2 32 12 40 28 8-4 18-6 28-4 10 22 8 48-4 68 12 14 18 34 14 54-6 26-24 48-48 58-20 8-42 10-62 4-18-6-32-20-38-38-4-12-2-26 6-36-10-18-8-40 4-56 8-10 20-16 32-18 4-20 16-36 28-40z"
            fill="currentColor"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        </svg>
        <div className="absolute inset-0">
          {HUBS.map((hub) => (
            <div
              key={hub.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: hub.left, top: hub.top }}
            >
              <span
                className="block h-2 w-2 rounded-full ring-2 ring-white shadow-sm"
                style={{ backgroundColor: accentColor }}
                title={hub.name}
              />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-500 leading-relaxed max-w-xl">
        Kiambu, Bungoma, Kilifi, Uasin Gishu, Meru, Isiolo, Machakos, and Kisii — schematic positions for illustration.
      </p>
    </figure>
  );
}
