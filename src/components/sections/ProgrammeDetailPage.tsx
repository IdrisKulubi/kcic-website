'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgrammeWithSponsors } from '@/lib/actions/programmes';
import { getFlagshipContent } from '@/data/flagship-programmes';
import { FlagshipHero } from '@/components/programmes/flagship/FlagshipHero';
import { FlagshipProgrammeSections } from '@/components/programmes/flagship/FlagshipProgrammeSections';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import type { FooterData } from '@/data/home';
import { navData } from '@/lib/navigation';
import { CaretDown as CaretDownIcon, CaretUp as CaretUpIcon } from '@phosphor-icons/react';

interface Props {
    programme: ProgrammeWithSponsors;
    footerData: FooterData;
}

const sectionConfig = {
    introduction: {
        label: 'About This Programme',
        description: 'Learn about the programme objectives and scope',
    },
    applicationProcess: {
        label: 'How to Apply',
        description: 'Step-by-step application guide',
    },
    criteria: {
        label: 'Requirements',
        description: 'What we look for in applicants',
    },
    eligibility: {
        label: 'Who Can Apply',
        description: 'Eligibility requirements',
    },
    applicationSelection: {
        label: 'Selection Process',
        description: 'How applications are evaluated',
    },
    technicalSupport: {
        label: 'Support Provided',
        description: 'Resources and assistance available',
    },
    definitions: {
        label: 'Key Terms',
        description: 'Important definitions',
    },
    terms: {
        label: 'Terms & Conditions',
        description: 'Legal terms and agreements',
    },
    scoringSystem: {
        label: 'Evaluation Criteria',
        description: 'How applications are scored',
    },
    fraudPolicy: {
        label: 'Integrity Policy',
        description: 'Anti-fraud guidelines',
    },
} as const;

type SectionKey = keyof typeof sectionConfig;

function CollapsibleSection({
    id,
    title,
    description,
    content,
    isOpen,
    onToggle,
    accentColor,
}: {
    id: string;
    title: string;
    description: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
    accentColor: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors hover:border-gray-300"
        >
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-gray-50/80"
                aria-expanded={isOpen}
                aria-controls={`section-${id}`}
            >
                <span
                    className="mt-1.5 h-8 w-0.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden
                />
                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                    <p className="mt-0.5 truncate text-xs text-gray-500">{description}</p>
                </div>
                <span className="shrink-0 text-gray-400" aria-hidden>
                    {isOpen ? <CaretUpIcon className="h-5 w-5" /> : <CaretDownIcon className="h-5 w-5" />}
                </span>
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={`section-${id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                            <div
                                className="max-w-none text-gray-600 text-sm leading-relaxed
                                    [&_p]:mb-3 [&_p]:text-sm [&_p]:leading-relaxed
                                    [&_ul]:my-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:text-sm
                                    [&_ol]:my-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:text-sm
                                    [&_li]:mb-1.5 [&_li]:leading-relaxed [&_li]:text-sm
                                    [&_strong]:text-gray-800 [&_strong]:font-semibold
                                    [&_a]:text-green-600 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-green-700
                                    [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-4 [&_h3]:mb-2
                                    [&_h4]:text-xs [&_h4]:font-semibold [&_h4]:text-gray-700 [&_h4]:mt-3 [&_h4]:mb-1
                                    [&_table]:w-full [&_table]:my-4 [&_table]:text-xs
                                    [&_th]:text-left [&_th]:py-1.5 [&_th]:px-2 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_th]:text-xs
                                    [&_td]:py-1.5 [&_td]:px-2 [&_td]:border-b [&_td]:border-gray-100 [&_td]:text-xs"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function BenefitCard({
    title,
    description,
    color,
}: {
    title: string;
    description: string;
    color: string;
}) {
    return (
        <div className="border-t-2 border-gray-100 bg-white p-4 pt-5 transition-colors hover:border-gray-200" style={{ borderTopColor: color }}>
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">{description}</p>
        </div>
    );
}

export default function ProgrammeDetailPage({ programme, footerData }: Props) {
    const [openSections, setOpenSections] = useState<Set<string>>(new Set(['introduction']));
    const heroRef = useRef<HTMLDivElement>(null);

    // Get available sections (only those with content)
    const availableSections = useMemo(() => {
        return (Object.keys(sectionConfig) as SectionKey[]).filter(
            key => programme[key] && typeof programme[key] === 'string' && (programme[key] as string).trim() !== ''
        );
    }, [programme]);

    const flagshipContent = useMemo(() => getFlagshipContent(programme.slug), [programme.slug]);

    const viewProgramme = useMemo((): ProgrammeWithSponsors => {
        if (!flagshipContent?.shell) return programme;
        const s = flagshipContent.shell;
        return {
            ...programme,
            title: s.title,
            description: s.description,
            image: s.image,
            headerImage: s.headerImage ?? s.image,
            color: s.color,
        };
    }, [programme, flagshipContent]);

    const primaryApplyHref = useMemo(() => {
        if (!flagshipContent) return programme.applicationLink ?? null;
        const spec = flagshipContent.ctas.find((c) => c.key === 'apply');
        return programme.applicationLink ?? spec?.fallbackHref ?? null;
    }, [flagshipContent, programme.applicationLink]);

    // Parse introduction for key highlights
    const getHighlights = () => [
        { title: 'Accelerator support', description: 'Business development and growth assistance.' },
        { title: 'Funding access', description: 'Connections to investors and financing options.' },
        { title: 'Skills training', description: 'Capacity building and mentorship.' },
        { title: 'Network access', description: 'Introductions to industry partners and peers.' },
    ];

    const toggleSection = (sectionId: string) => {
        setOpenSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

    const expandAll = () => {
        setOpenSections(new Set(availableSections));
    };

    const collapseAll = () => {
        setOpenSections(new Set());
    };

    if (flagshipContent) {
        return (
            <div className="min-h-screen bg-[#f4f2ee]">
                <MinimalNavbar {...navData} />
                <FlagshipHero programme={viewProgramme} flagship={flagshipContent} heroRef={heroRef} />
                <FlagshipProgrammeSections programme={viewProgramme} flagship={flagshipContent} />

                {viewProgramme.isActive && primaryApplyHref && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                        <section aria-label="Apply call to action">
                            <div
                                className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
                                style={{ backgroundColor: viewProgramme.color }}
                            >
                                <div className="absolute inset-0 opacity-10">
                                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <defs>
                                            <pattern id="flagship-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#flagship-grid)" />
                                    </svg>
                                </div>
                                <div className="relative z-10 text-center">
                                    <p className="text-xs font-medium uppercase tracking-wide text-white/80 mb-3">
                                        Applications open
                                    </p>
                                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">Ready to apply?</h3>
                                    <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto mb-6">
                                        Join {viewProgramme.title} and take the next step in your climate innovation journey.
                                    </p>
                                    <a
                                        href={primaryApplyHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                                    >
                                        Apply now
                                        <span className="sr-only"> (opens in new tab)</span>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                <div className="border-t border-stone-200/80 bg-[#faf9f7] py-14">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 mb-3">More</p>
                        <h3 className="text-xl font-semibold tracking-tight text-stone-900 mb-3">Explore other programmes</h3>
                        <p className="text-stone-600 text-sm leading-relaxed mb-8">
                            See flagship and special initiatives across climate innovation and enterprise support.
                        </p>
                        <Link
                            href="/programmes"
                            className="inline-flex rounded-full border border-stone-900/90 bg-stone-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
                        >
                            View all programmes
                        </Link>
                    </div>
                </div>

                <Footer data={footerData} />

                {viewProgramme.isActive && primaryApplyHref && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1, type: 'spring' }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <a
                            href={primaryApplyHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                        >
                            Apply
                            <span className="sr-only"> (opens in new tab)</span>
                        </a>
                    </motion.div>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <MinimalNavbar {...navData} />

            {/* Hero Section */}
            <div ref={heroRef} className="relative bg-gray-900 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <Image
                        src={programme.headerImage || programme.image}
                        alt={programme.title}
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
                </div>

                {/* Hero content: spacer clears fixed MinimalNavbar (h-16 sm:h-20) */}
                <div className="relative z-10 flex flex-col">
                    <div className="h-16 shrink-0 sm:h-20" aria-hidden />
                    <div className="relative max-w-7xl mx-auto w-full px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
                    {/* Breadcrumb */}
                    <Link href="/programmes" className="mb-8 inline-block text-sm text-white/70 transition-colors hover:text-white">
                        ← Back to programmes
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text Content */}
                        <div>
                            {/* Status Badge */}
                            {programme.isActive ? (
                                <span className="mb-6 inline-block border border-emerald-400/40 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-emerald-200">
                                    Applications open
                                </span>
                            ) : (
                                <span className="mb-6 inline-block border border-white/20 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white/60">
                                    Programme overview
                                </span>
                            )}

                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                                {programme.title}
                            </h1>

                            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 max-w-xl">
                                {programme.description}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-3">
                                {programme.isActive && programme.applicationLink && (
                                    <a
                                        href={programme.applicationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                                    >
                                        Apply
                                        <span className="sr-only"> (opens in new tab)</span>
                                    </a>
                                )}
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('programme-details')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="rounded-md border border-white/25 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10"
                                >
                                    Learn more
                                </button>
                            </div>
                        </div>

                        {/* Right: Featured Image Card */}
                        <div className="hidden lg:block">
                            <div className="relative overflow-hidden rounded-lg border border-white/10 shadow-lg">
                                <div className="aspect-[4/3] relative">
                                    <Image
                                        src={programme.image}
                                        alt={programme.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {/* Accent border */}
                                <div 
                                    className="absolute bottom-0 left-0 right-0 h-1.5"
                                    style={{ backgroundColor: programme.color }}
                                />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* Sponsor Logos */}
            {programme.sponsors.length > 0 && (
                <div className="bg-white border-b border-gray-100 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="mb-6 text-center text-xs font-medium uppercase tracking-wide text-gray-500">Funded by</p>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                            {programme.sponsors.map((sponsor) => (
                                <div key={sponsor.id} className="relative h-12 w-32 opacity-90 transition-opacity hover:opacity-100">
                                    <Image
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div id="programme-details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                <section className="mb-16 border-t border-gray-200 pt-12">
                    <h2 className="text-lg font-semibold tracking-tight text-gray-900">What this programme offers</h2>
                    <p className="mt-1 text-sm text-gray-600">Typical support areas — details vary by intake.</p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {getHighlights().map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <BenefitCard title={benefit.title} description={benefit.description} color={programme.color} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Programme Details Accordion */}
                {availableSections.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Programme Details</h2>
                                <p className="text-gray-500 text-xs mt-1">
                                    Click each section to expand and learn more
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={expandAll}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Expand All
                                </button>
                                <button
                                    onClick={collapseAll}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Collapse All
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {availableSections.map((sectionKey) => {
                                const config = sectionConfig[sectionKey];
                                const content = programme[sectionKey];
                                
                                if (!content || typeof content !== 'string') return null;

                                return (
                                    <CollapsibleSection
                                        key={sectionKey}
                                        id={sectionKey}
                                        title={config.label}
                                        description={config.description}
                                        content={content}
                                        isOpen={openSections.has(sectionKey)}
                                        onToggle={() => toggleSection(sectionKey)}
                                        accentColor={programme.color}
                                    />
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Call to Action Section - Only when active */}
                {programme.isActive && programme.applicationLink && (
                    <section className="mt-16">
                        <div 
                            className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
                            style={{ backgroundColor: programme.color }}
                        >
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>

                            <div className="relative z-10 text-center">
                                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/80">Applications open</p>
                                <h3 className="mb-3 text-xl font-semibold text-white md:text-2xl">Ready to apply?</h3>
                                <p className="mx-auto mb-6 max-w-2xl text-sm text-white/90 md:text-base">
                                    Join {programme.title} and take the next step in your climate innovation journey.
                                </p>
                                <a
                                    href={programme.applicationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                                >
                                    Apply now
                                    <span className="sr-only"> (opens in new tab)</span>
                                </a>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Explore More Programmes */}
            <div className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                        Explore More Programmes
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                        Discover other initiatives supporting climate innovation across Africa.
                    </p>
                    <Link
                        href="/programmes"
                        className="inline-flex rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                    >
                        View all programmes
                    </Link>
                </div>
            </div>

            <Footer data={footerData} />

            {/* Floating Apply Button - Always visible when active */}
            {programme.isActive && programme.applicationLink && (
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, type: 'spring' }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    <a
                        href={programme.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                        Apply
                        <span className="sr-only"> (opens in new tab)</span>
                    </a>
                </motion.div>
            )}
        </div>
    );
}
