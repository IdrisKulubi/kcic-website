import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import { navData } from '@/lib/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Programmes | KCIC',
  description:
    'Explore KCIC flagship programmes and special projects — climate innovation support from incubation to scale.',
};

const FLAGSHIP_LINKS = [
  { slug: 'agribiz-programme', label: 'AgriBiz Programme' },
  { slug: 'greenbiz-programme', label: 'GreenBiz Programme' },
  { slug: 'puse-programme', label: 'PUSE Programme' },
  { slug: 'swift-programme', label: 'SWIFT Programme' },
  { slug: 'dreem-hub', label: 'DREEM Hub Programme' },
] as const;

export default function LocaleProgramsHubPage() {
  return (
    <div className="min-h-screen bg-white">
      <MinimalNavbar {...navData} />

      <main className="mx-auto max-w-2xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500">Programmes</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          How we support climate enterprises
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
          Our flagship programmes and special projects are listed on the main programmes hub, with full descriptions,
          impact, and how to apply or explore supported enterprises.
        </p>

        <div className="mt-10">
          <Link
            href="/programmes"
            className="inline-flex rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            View all programmes
          </Link>
        </div>

        <div className="mt-14 border-t border-gray-100 pt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Flagship programmes</h2>
          <ul className="mt-4 space-y-2">
            {FLAGSHIP_LINKS.map(({ slug, label }) => (
              <li key={slug}>
                <Link href={`/programmes/${slug}`} className="text-sm font-medium text-gray-900 underline decoration-gray-200 underline-offset-4 hover:decoration-gray-900">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
