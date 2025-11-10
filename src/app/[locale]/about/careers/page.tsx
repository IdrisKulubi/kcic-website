'use client';

import React from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { FaBriefcase, FaBell } from 'react-icons/fa';

export default function CareersPage() {
  return (
    <PageLayout
      title="Careers"
      subtitle="Join our mission to accelerate climate innovation"
      description="We’re not hiring right now. New roles will be posted here as they open."
      breadcrumb={[
        { label: 'About Us', href: '/about' },
        { label: 'Careers' }
      ]}
    >
      <section className="relative py-20 sm:py-32">
        {/* Ambient soft glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
'radial-gradient(34rem 20rem at 20% 25%, rgba(127,209,52,0.12) 0%, rgba(127,209,52,0) 70%),' +
              'radial-gradient(34rem 20rem at 80% 75%, rgba(0,174,239,0.10) 0%, rgba(0,174,239,0) 70%)',
            filter: 'blur(28px)'
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-md shadow-xl p-10 text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
              <FaBriefcase className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">No open roles at the moment</h2>
            <p className="text-gray-600 mb-6">
              We don’t have any vacancies right now. Roles will be posted here as soon as they open.
              Follow us to stay updated.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="https://www.linkedin.com/company/kenyaclimateinnovationcenter/"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700"
              >
                <FaBell className="mr-2 h-4 w-4" />
                Follow on LinkedIn
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-gray-100 px-6 py-3 text-gray-800 font-semibold hover:bg-gray-200"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
