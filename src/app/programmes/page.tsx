'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { listProgrammes, ProgrammeData } from '@/lib/actions/programmes';
import { getFooterSection } from '@/lib/actions/footer';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';

type FooterData = {
  quickLinks: { label: string; href: string }[];
  socialMedia: { platform: string; href: string; icon: string }[];
  contact: { address: string; phone: string; email: string };
  newsletter: { title: string; description: string; placeholder: string };
  copyright: string;
};

function ProgrammeCard({
  programme,
  index,
  variant,
}: {
  programme: ProgrammeData;
  index: number;
  variant: 'flagship' | 'special';
}) {
  const titleHover = variant === 'flagship' ? 'group-hover:text-emerald-800' : 'group-hover:text-blue-900';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <Link href={`/programmes/${programme.slug}`} className="group block h-full">
        <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors hover:border-gray-300">
          {programme.isActive ? (
            <div className="absolute right-3 top-3 z-10">
              <span
                className={`rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white ${
                  variant === 'flagship' ? 'bg-emerald-700' : 'bg-blue-800'
                }`}
              >
                Open
              </span>
            </div>
          ) : null}

          <div className="relative h-40 overflow-hidden bg-gray-100">
            <Image
              src={programme.image}
              alt={programme.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: programme.color }}
            />
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className={`text-base font-semibold text-gray-900 transition-colors ${titleHover}`}>
              {programme.title}
            </h3>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{programme.description}</p>
            <span className="mt-4 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 group-hover:decoration-gray-900">
              View programme
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState<ProgrammeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  const flagshipOrder = [
    'agribiz-programme',
    'greenbiz-programme',
    'puse-programme',
    'swift-programme',
    'dreem-hub',
  ];

  const specialOrder = [
    'sheria-ya-vijana',
    'e-mobility-programme',
    'africa-meets-bavaria',
    'in-country-youth-adapt',
    'cleantech-innovation-programme',
    'climatelaunchpad',
    'vijana-na-agribiz',
    'greyap',
    'wusc',
  ];

  const { flagshipProgrammes, specialProgrammes } = useMemo(() => {
    const flagship = programmes
      .filter((p) => p.category === 'flagship' || !p.category)
      .sort((a, b) => {
        const aIndex = flagshipOrder.indexOf(a.slug);
        const bIndex = flagshipOrder.indexOf(b.slug);
        if (aIndex === -1 && bIndex === -1) return a.order - b.order;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

    const special = programmes
      .filter((p) => p.category === 'special')
      .sort((a, b) => {
        const aIndex = specialOrder.indexOf(a.slug);
        const bIndex = specialOrder.indexOf(b.slug);
        if (aIndex === -1 && bIndex === -1) return a.order - b.order;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

    return { flagshipProgrammes: flagship, specialProgrammes: special };
  }, [programmes]);

  useEffect(() => {
    async function fetchData() {
      const programmesResult = await listProgrammes();
      if (programmesResult.success && programmesResult.data) {
        setProgrammes(programmesResult.data);
      }
      setLoading(false);

      const footerResult = await getFooterSection();
      if (footerResult.success && footerResult.data) {
        const { section, links, socialMedia } = footerResult.data;
        setFooterData({
          quickLinks: links.map((l) => ({ label: l.label, href: l.href })),
          socialMedia: socialMedia.map((s) => ({ platform: s.platform, href: s.href, icon: s.icon })),
          contact: {
            address: section.contactAddress || '',
            phone: section.contactPhone || '',
            email: section.contactEmail || '',
          },
          newsletter: {
            title: section.newsletterTitle || 'Stay Updated',
            description: section.newsletterDescription || 'Subscribe to our newsletter',
            placeholder: section.newsletterPlaceholder || 'Enter your email',
          },
          copyright: section.copyright || '© 2024 KCIC',
        });
      }
    }
    fetchData();
  }, []);

  // Scroll to #flagship | #projects | #past when landing with a hash or changing hash on same page
  useEffect(() => {
    function scrollToHash() {
      const id = window.location.hash.replace(/^#/, '');
      if (!id) return;
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [loading, programmes.length]);

  return (
    <div className="min-h-screen bg-white">
      <MinimalNavbar {...navData} />

      <section className="border-b border-gray-100 pt-24 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">Programmes</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Climate innovation across Kenya and East Africa
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Flagship initiatives and targeted projects that connect enterprises to finance, markets, and technical
              support.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="space-y-14">
              <div className="h-6 w-40 animate-pulse rounded bg-gray-100" />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse overflow-hidden rounded-lg border border-gray-100">
                    <div className="h-40 bg-gray-100" />
                    <div className="space-y-3 p-5">
                      <div className="h-5 w-2/3 rounded bg-gray-100" />
                      <div className="h-4 w-full rounded bg-gray-100" />
                      <div className="h-4 w-5/6 rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && flagshipProgrammes.length > 0 && (
            <motion.div
              id="flagship"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 scroll-mt-28 sm:mb-20 sm:scroll-mt-32"
            >
              <div className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-lg font-semibold tracking-tight text-gray-900">Flagship programmes</h2>
                <p className="mt-1 text-sm text-gray-600">Core initiatives with dedicated delivery and reporting.</p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {flagshipProgrammes.map((programme, index) => (
                  <ProgrammeCard key={programme.id} programme={programme} index={index} variant="flagship" />
                ))}
              </div>
            </motion.div>
          )}

          {!loading && specialProgrammes.length > 0 && (
            <motion.div
              id="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="scroll-mt-28 sm:scroll-mt-32"
            >
              <div className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-lg font-semibold tracking-tight text-gray-900">Special projects</h2>
                <p className="mt-1 text-sm text-gray-600">Focused partnerships and time-bound interventions.</p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {specialProgrammes.map((programme, index) => (
                  <ProgrammeCard key={programme.id} programme={programme} index={index} variant="special" />
                ))}
              </div>
            </motion.div>
          )}

          {!loading && programmes.length > 0 && (
            <section
              id="past"
              className="scroll-mt-28 border-t border-gray-100 pt-14 sm:scroll-mt-32 sm:pt-16"
              aria-labelledby="past-projects-heading"
            >
              <h2 id="past-projects-heading" className="text-lg font-semibold tracking-tight text-gray-900">
                Past projects
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
                Stories and outcomes from completed initiatives are captured through our impact work and newsroom. If
                you are looking for a specific closed programme, contact us and we will point you to the right materials.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/impact"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Impact overview
                </Link>
                <Link
                  href="/newsroom/press-release"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  News & updates
                </Link>
              </div>
            </section>
          )}

          {!loading && programmes.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Programmes coming soon</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                We are preparing new initiatives. Check back shortly or contact us for updates.
              </p>
              <Link
                href="/about/contact-us"
                className="mt-6 inline-flex rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Contact us
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {programmes.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-lg font-semibold text-gray-900">Work with KCIC</h2>
            <p className="mt-2 text-sm text-gray-600">
              Questions about eligibility, partnerships, or media — we are happy to help.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/about/contact-us"
                className="rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
              >
                Get in touch
              </Link>
              <Link
                href="/faqs"
                className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                FAQs
              </Link>
            </div>
          </div>
        </section>
      )}

      {footerData && <Footer data={footerData} />}
    </div>
  );
}
