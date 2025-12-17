'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import {
    Briefcase,
    Users,
    FileText,
    MapPin,
    Clock,
    Calendar,
    Buildings,
    EnvelopeSimple,
    ArrowSquareOut,
    DownloadSimple,
    CaretLeft,
    ShareNetwork,
    Hash
} from '@phosphor-icons/react';
import { getOpportunityBySlug, OpportunityWithAttachments, OpportunityType } from '@/lib/actions/opportunities';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Dynamic configuration based on opportunity type
const typeConfig: Record<OpportunityType, {
    label: string;
    icon: typeof Briefcase;
    color: string;
    bgColor: string;
    borderColor: string;
    accentColor: string;
}> = {
    job: {
        label: 'Job Opening',
        icon: Briefcase,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        accentColor: 'blue'
    },
    consulting: {
        label: 'Consultancy',
        icon: Users,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-100',
        accentColor: 'purple'
    },
    rfp: {
        label: 'Request for Proposal',
        icon: FileText,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-100',
        accentColor: 'orange'
    },
    tender: {
        label: 'Tender Notice',
        icon: FileText,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-100',
        accentColor: 'emerald'
    },
};

function ContentSection({ title, content }: { title: string; content: string }) {
    if (!content) return null;
    return (
        <div className="mb-10 last:mb-0">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {title}
            </h3>
            <div
                className="prose prose-lg max-w-none text-gray-600 prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:list-disc prose-ul:pl-4"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}

export default function OpportunityDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [opportunity, setOpportunity] = useState<OpportunityWithAttachments | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOpportunity() {
            if (!slug) return;

            const result = await getOpportunityBySlug(slug);
            if (result.success && result.data) {
                setOpportunity(result.data);
            } else {
                setError(result.error || 'Opportunity not found');
            }
            setLoading(false);
        }
        fetchOpportunity();
    }, [slug]);

    if (loading) {
        return (
            <PageLayout title="Careers" breadcrumb={[{ label: 'About Us', href: '/about' }, { label: 'Careers', href: '/about/careers' }, { label: 'Loading...' }]}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center">
                    <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </PageLayout>
        );
    }

    if (error || !opportunity) {
        return (
            <PageLayout title="Careers" breadcrumb={[{ label: 'About Us', href: '/about' }, { label: 'Careers', href: '/about/careers' }, { label: 'Not Found' }]}>
                <div className="max-w-md mx-auto py-20 text-center">
                    <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Opportunity Not Found</h2>
                    <p className="text-gray-500 mb-6">This listing may have expired or been removed.</p>
                    <Link href="/about/careers">
                        <Button>Back to Careers</Button>
                    </Link>
                </div>
            </PageLayout>
        );
    }

    const config = typeConfig[opportunity.type as OpportunityType];
    const Icon = config.icon;
    const isRfpOrTender = opportunity.type === 'rfp' || opportunity.type === 'tender';

    return (
        <PageLayout
            title="Careers"
            subtitle="Join our team and help drive sustainable innovation in Africa."
            breadcrumb={[
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/about/careers' },
                { label: opportunity.type === 'rfp' ? 'RFP Details' : opportunity.type === 'tender' ? 'Tender Details' : 'Job Details' }
            ]}
        >
            <div className="bg-white min-h-screen pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">

                    {/* Back Link */}
                    <Link
                        href="/about/careers"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 mb-8 transition-colors"
                    >
                        <CaretLeft className="w-4 h-4" />
                        Back to Opportunities
                    </Link>

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Main Column */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Custom Hero Header */}
                                <div className="mb-10">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                                            config.bgColor,
                                            config.color,
                                            config.borderColor
                                        )}>
                                            <Icon weight="fill" className="w-3.5 h-3.5" />
                                            {config.label}
                                        </span>
                                        {opportunity.referenceNumber && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                <Hash className="w-3.5 h-3.5" />
                                                Ref: {opportunity.referenceNumber}
                                            </span>
                                        )}
                                        {opportunity.isActive && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                Active
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                                        {opportunity.title}
                                    </h1>

                                    <div className="flex flex-wrap gap-y-4 gap-x-8 text-sm text-gray-600 border-y border-gray-100 py-6">
                                        {opportunity.location && (
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 rounded-md bg-gray-50 text-gray-400">
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                                <span className="font-medium">{opportunity.location}</span>
                                            </div>
                                        )}
                                        {opportunity.department && (
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 rounded-md bg-gray-50 text-gray-400">
                                                    <Buildings className="w-4 h-4" />
                                                </div>
                                                <span className="font-medium">{opportunity.department}</span>
                                            </div>
                                        )}
                                        {opportunity.employmentType && (
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 rounded-md bg-gray-50 text-gray-400">
                                                    <Briefcase className="w-4 h-4" />
                                                </div>
                                                <span className="font-medium capitalize">{opportunity.employmentType.replace('-', ' ')}</span>
                                            </div>
                                        )}
                                        {opportunity.issuedDate && (
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 rounded-md bg-gray-50 text-gray-400">
                                                    <Calendar className="w-4 h-4" />
                                                </div>
                                                <span>Posted on {format(new Date(opportunity.issuedDate), 'MMM d, yyyy')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Rich Content */}
                                <div className="space-y-12">
                                    <ContentSection title="Overview" content={opportunity.description || ''} />
                                    <ContentSection title="Key Responsibilities" content={opportunity.responsibilities || ''} />
                                    <ContentSection title="Requirements & Skills" content={opportunity.requirements || ''} />
                                    <ContentSection title="Qualifications" content={opportunity.qualifications || ''} />
                                    <ContentSection title="Application Process" content={opportunity.applicationInstructions || ''} />
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <motion.div
                                className="sticky top-24 space-y-6"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {/* Application Box */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {isRfpOrTender ? 'Submit Proposal' : 'Apply for this Role'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Please review the requirements carefully before submitting your application.
                                    </p>

                                    <div className="space-y-3">
                                        {opportunity.applicationLink && (
                                            <Button className="w-full h-12 text-base" asChild>
                                                <a href={opportunity.applicationLink} target="_blank" rel="noopener noreferrer">
                                                    {isRfpOrTender ? 'Submit Proposal' : 'Apply Now'}
                                                    <ArrowSquareOut className="w-4 h-4 ml-2" />
                                                </a>
                                            </Button>
                                        )}

                                        {opportunity.applicationEmail && (
                                            <Button variant="outline" className="w-full h-12 text-base" asChild>
                                                <a href={`mailto:${opportunity.applicationEmail}`}>
                                                    Email Application
                                                    <EnvelopeSimple className="w-4 h-4 ml-2" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>

                                    {opportunity.deadline && (
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Application Deadline</p>
                                            <div className="flex items-center gap-3 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                                                <Clock className="w-5 h-5" />
                                                <span className="font-bold">
                                                    {format(new Date(opportunity.deadline), 'MMMM d, yyyy')}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Attachments Box */}
                                {opportunity.attachments.length > 0 && (
                                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                                        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <DownloadSimple className="w-5 h-5 text-gray-500" />
                                            Downloads
                                        </h3>
                                        <div className="space-y-3">
                                            {opportunity.attachments.map((file) => (
                                                <a
                                                    key={file.id}
                                                    href={file.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-sm transition-all group"
                                                >
                                                    <div className="p-2 bg-gray-50 rounded-md group-hover:bg-green-50 transition-colors">
                                                        <FileText className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-green-700 transition-colors">
                                                            {file.fileName || 'Document'}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-gray-500 uppercase">{(file.fileType || 'file').split('/').pop()}</span>
                                                            <span className="text-gray-300">•</span>
                                                            <span className="text-xs text-green-600 font-medium group-hover:underline">Download</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Share Box */}
                                <div className="p-6">
                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors mx-auto">
                                        <ShareNetwork className="w-4 h-4" />
                                        Share this opportunity
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
