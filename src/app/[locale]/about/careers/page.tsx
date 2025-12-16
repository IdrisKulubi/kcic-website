'use client';

import React from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { FaBriefcase, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';

export default function CareersPage() {
  return (
    <PageLayout
      title="Careers"
      subtitle="Join our mission to accelerate climate innovation"
      description="We're not hiring right now. New roles will be posted here as they open."
      breadcrumb={[
        { label: 'About Us', href: '/about' },
        { label: 'Careers' }
      ]}
    >
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(128,199,56,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(0,173,221,0.12) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            {/* Card with refined styling */}
            <div className="relative rounded-[2rem] bg-white/80 backdrop-blur-xl border border-gray-100/80 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] p-10 sm:p-14 text-center overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-blue-50/30 opacity-60" />

              {/* Content */}
              <div className="relative z-10">
                {/* Premium icon container */}
                <motion.div
                  className="mx-auto mb-8 relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                    <FaBriefcase className="h-9 w-9 text-white" />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute inset-0 -m-2 rounded-3xl border-2 border-green-200/50" />
                </motion.div>

                {/* Typography */}
                <motion.h2
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  No open roles at the moment
                </motion.h2>

                <motion.p
                  className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  We don&apos;t have any vacancies right now. Roles will be posted here as soon as they open. Follow us to stay updated.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link
                    href="https://www.linkedin.com/company/kenyaclimateinnovationcenter/"
                    target="_blank"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-5 py-2.5 text-sm text-white font-medium shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    <FaLinkedinIn className="h-4 w-4" />
                    <span>Follow on LinkedIn</span>
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200/80 px-5 py-2.5 text-sm text-gray-700 font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-gray-200/50"
                  >
                    Back to Home
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Subtle glow effect on hover */}
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-r from-green-400/20 via-blue-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
