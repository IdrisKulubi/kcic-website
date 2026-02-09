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
import { ArrowRightIcon, RocketIcon, StarIcon, LightbulbIcon } from '@phosphor-icons/react/dist/ssr';

type FooterData = {
  quickLinks: { label: string; href: string }[];
  socialMedia: { platform: string; href: string; icon: string }[];
  contact: { address: string; phone: string; email: string };
  newsletter: { title: string; description: string; placeholder: string };
  copyright: string;
};

// Programme Card Component
function ProgrammeCard({ 
  programme, 
  index, 
  variant 
}: { 
  programme: ProgrammeData; 
  index: number; 
  variant: 'flagship' | 'special';
}) {
  const accentColor = variant === 'flagship' ? 'green' : 'blue';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link href={`/programmes/${programme.slug}`}>
        <article className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 h-full">
          
          {/* Active Badge */}
          {programme.isActive && (
            <div className="absolute top-3 left-3 z-20">
              <span className={`px-2.5 py-1 text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-1.5 ${
                variant === 'flagship' ? 'bg-emerald-500' : 'bg-blue-500'
              }`}>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Accepting Applications
              </span>
            </div>
          )}

          {/* Image Container */}
          <div className="relative h-44 overflow-hidden">
            <Image
              src={programme.image}
              alt={programme.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Color accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ backgroundColor: programme.color }}
            />
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className={`text-lg font-bold text-gray-900 mb-2 group-hover:text-${accentColor}-600 transition-colors line-clamp-1`}>
              {programme.title}
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
              {programme.description}
            </p>

            {/* CTA */}
            <div className={`flex items-center text-sm font-medium ${
              variant === 'flagship' ? 'text-emerald-600' : 'text-blue-600'
            }`}>
              <span>Learn more</span>
              <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
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

  // Define the preferred order for each category
  const flagshipOrder = [
    'agribiz-programme',
    'greenbiz-programme', 
    'puse-programme',
    'swift-programme',
    'dreem-hub'
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
    'wusc'
  ];

  // Sort programmes by category and preferred order
  const { flagshipProgrammes, specialProgrammes } = useMemo(() => {
    const flagship = programmes
      .filter(p => p.category === 'flagship' || !p.category)
      .sort((a, b) => {
        const aIndex = flagshipOrder.indexOf(a.slug);
        const bIndex = flagshipOrder.indexOf(b.slug);
        if (aIndex === -1 && bIndex === -1) return a.order - b.order;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

    const special = programmes
      .filter(p => p.category === 'special')
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
      // Fetch programmes
      const programmesResult = await listProgrammes();
      if (programmesResult.success && programmesResult.data) {
        setProgrammes(programmesResult.data);
      }
      setLoading(false);

      // Fetch footer data
      const footerResult = await getFooterSection();
      if (footerResult.success && footerResult.data) {
        const { section, links, socialMedia } = footerResult.data;
        setFooterData({
          quickLinks: links.map(l => ({ label: l.label, href: l.href })),
          socialMedia: socialMedia.map(s => ({ platform: s.platform, href: s.href, icon: s.icon })),
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

  return (
    <div className="min-h-screen bg-white">
      <MinimalNavbar {...navData} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-100/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium mb-4">
              <RocketIcon className="w-3.5 h-3.5" />
              Our Programmes
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Accelerating
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Climate Innovation
              </span>
            </h1>

            <p className="text-base text-gray-600 leading-relaxed max-w-xl">
              From early-stage incubation to scaling, our programmes provide
              comprehensive support for climate entrepreneurs across Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programmes Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Loading State */}
          {loading && (
            <div className="space-y-16">
              <div>
                <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden animate-pulse">
                      <div className="h-40 bg-gray-200" />
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Flagship Programmes Section */}
          {!loading && flagshipProgrammes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg shadow-emerald-500/20">
                  <StarIcon className="w-5 h-5 text-white" weight="fill" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Flagship Programmes</h2>
                  <p className="text-sm text-gray-500">Our core programmes driving climate innovation</p>
                </div>
              </div>

              {/* Flagship Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flagshipProgrammes.map((programme, index) => (
                  <ProgrammeCard key={programme.id} programme={programme} index={index} variant="flagship" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Special Projects Section */}
          {!loading && specialProgrammes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
                  <LightbulbIcon className="w-5 h-5 text-white" weight="fill" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Special Projects & Initiatives</h2>
                  <p className="text-sm text-gray-500">Targeted programmes addressing specific challenges</p>
                </div>
              </div>

              {/* Special Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialProgrammes.map((programme, index) => (
                  <ProgrammeCard key={programme.id} programme={programme} index={index} variant="special" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && programmes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <RocketIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Programmes Coming Soon
              </h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                We&apos;re preparing exciting new initiatives to support climate innovation.
                Check back soon for updates.
              </p>
              <Link
                href="/about/contact-us"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Get Notified
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      {programmes.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Ready to Transform Your Climate Idea?
              </h2>
              <p className="text-gray-400 text-sm mb-6 max-w-xl mx-auto">
                Join our community of innovators driving sustainable solutions across Africa.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/about/contact-us"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-green-600 text-white font-medium rounded-full hover:bg-green-500 transition-colors shadow-md shadow-green-600/20"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/faqs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {footerData && <Footer data={footerData} />}
    </div>
  );
}