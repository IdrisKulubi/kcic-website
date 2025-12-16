'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { listProgrammes, ProgrammeData } from '@/lib/actions/programmes';
import { getFooterSection } from '@/lib/actions/footer';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';
import { ArrowRightIcon, RocketIcon } from '@phosphor-icons/react/dist/ssr';

type FooterData = {
  quickLinks: { label: string; href: string }[];
  socialMedia: { platform: string; href: string; icon: string }[];
  contact: { address: string; phone: string; email: string };
  newsletter: { title: string; description: string; placeholder: string };
  copyright: string;
};

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState<ProgrammeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [footerData, setFooterData] = useState<FooterData | null>(null);

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 rounded-3xl overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200" />
                  <div className="p-8 space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Programmes Grid */}
          {!loading && programmes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programmes.map((programme, index) => (
                <motion.div
                  key={programme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link href={`/how-we-work/programmes/${programme.slug}`}>
                    <article className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">

                      {/* Active Badge */}
                      {programme.isActive && (
                        <div className="absolute top-3 left-3 z-20">
                          <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            Accepting Applications
                          </span>
                        </div>
                      )}

                      {/* Image Container */}
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={programme.image}
                          alt={programme.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                        {/* Color accent */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: programme.color }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
                          {programme.title}
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                          {programme.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center text-sm text-green-600 font-medium">
                          <span>Learn more</span>
                          <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
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
        <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Climate Idea?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join our community of innovators driving sustainable solutions across Africa.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/about/contact-us"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 transition-colors shadow-lg shadow-green-600/30"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/faqs"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
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