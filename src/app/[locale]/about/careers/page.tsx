'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  FileText,
  MapPin,
  Clock,
  ArrowRight,
  LinkedinLogo,
  EnvelopeSimple,
  CaretRight
} from '@phosphor-icons/react';
import { listOpportunities, OpportunityWithAttachments, OpportunityType } from '@/lib/actions/opportunities';
import { format } from 'date-fns';

const typeConfig: Record<OpportunityType, { label: string; icon: typeof Briefcase; color: string; bgColor: string }> = {
  job: { label: 'Job', icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  consulting: { label: 'Consulting', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  rfp: { label: 'RFP', icon: FileText, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  tender: { label: 'Tender', icon: FileText, color: 'text-amber-600', bgColor: 'bg-amber-100' },
};

function OpportunityCard({ opportunity }: { opportunity: OpportunityWithAttachments }) {
  const config = typeConfig[opportunity.type as OpportunityType];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/about/careers/${opportunity.slug}`}>
        <div className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:border-green-300 hover:shadow-lg transition-all duration-300">
          {/* Type badge */}
          <div className="flex items-center justify-between mb-3">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
              <Icon className="w-3.5 h-3.5" weight="bold" />
              {config.label}
            </div>
            {opportunity.isFeatured && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
            {opportunity.title}
          </h3>

          {/* Reference number for RFPs */}
          {opportunity.referenceNumber && (
            <p className="text-xs text-gray-500 mb-2 font-mono">{opportunity.referenceNumber}</p>
          )}

          {/* Summary */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{opportunity.summary}</p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {opportunity.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {opportunity.location}
              </span>
            )}
            {opportunity.deadline && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Deadline: {format(new Date(opportunity.deadline), 'MMM d, yyyy')}
              </span>
            )}
            {opportunity.employmentType && (
              <span className="capitalize">{opportunity.employmentType.replace('-', ' ')}</span>
            )}
          </div>

          {/* Arrow indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
            <CaretRight className="w-5 h-5 text-green-600" weight="bold" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function NoOpportunities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-100/80 shadow-lg p-10 sm:p-14 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-blue-50/30 opacity-60" />

        <div className="relative z-10">
          <motion.div
            className="mx-auto mb-8 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <Briefcase className="h-9 w-9 text-white" weight="fill" />
            </div>
            <div className="absolute inset-0 -m-2 rounded-3xl border-2 border-green-200/50" />
          </motion.div>

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

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              href="https://www.linkedin.com/company/kenyaclimateinnovationcenter/"
              target="_blank"
              className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-5 py-2.5 text-sm text-white font-medium shadow-md shadow-green-500/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <LinkedinLogo className="h-4 w-4" weight="fill" />
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
    </motion.div>
  );
}

export default function CareersPage() {
  const [opportunities, setOpportunities] = useState<OpportunityWithAttachments[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<OpportunityType | 'all'>('all');

  useEffect(() => {
    async function fetchOpportunities() {
      const result = await listOpportunities({ isActive: true });
      if (result.success && result.data) {
        setOpportunities(result.data);
      }
      setLoading(false);
    }
    fetchOpportunities();
  }, []);

  const filteredOpportunities = activeFilter === 'all'
    ? opportunities
    : opportunities.filter(o => o.type === activeFilter);

  const getCount = (type: OpportunityType | 'all') => {
    if (type === 'all') return opportunities.length;
    return opportunities.filter(o => o.type === type).length;
  };

  return (
    <PageLayout
      title="Careers & Opportunities"
      subtitle="Join our mission to accelerate climate innovation"
      description="Explore current job openings, consulting opportunities, and RFPs at KCIC."
      breadcrumb={[
        { label: 'About Us', href: '/about' },
        { label: 'Careers' }
      ]}
    >
      <section className="relative py-12 sm:py-16 overflow-hidden">
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

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : opportunities.length === 0 ? (
            <NoOpportunities />
          ) : (
            <>
              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === 'all'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
                    }`}
                >
                  All ({getCount('all')})
                </button>
                {(Object.keys(typeConfig) as OpportunityType[]).map((type) => {
                  const count = getCount(type);
                  if (count === 0) return null;
                  const config = typeConfig[type];
                  return (
                    <button
                      key={type}
                      onClick={() => setActiveFilter(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === type
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
                        }`}
                    >
                      {config.label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Opportunities grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <OpportunityCard opportunity={opportunity} />
                  </motion.div>
                ))}
              </div>

              {filteredOpportunities.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No {typeConfig[activeFilter as OpportunityType]?.label.toLowerCase() || ''} opportunities available.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
