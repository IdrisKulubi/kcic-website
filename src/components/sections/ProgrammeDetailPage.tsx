'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgrammeWithSponsors } from '@/lib/actions/programmes';
import { getFlagshipContentForProgramme } from '@/data/flagship-programmes';
import { FlagshipHero } from '@/components/programmes/flagship/FlagshipHero';
import { FlagshipProgrammeSections } from '@/components/programmes/flagship/FlagshipProgrammeSections';
import { FlagshipSectionHeading } from '@/components/programmes/flagship/FlagshipSectionHeading';
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
    introduction: { label: 'About This Programme', description: 'Objectives and scope' },
    applicationProcess: { label: 'How to Apply', description: 'Application steps' },
    criteria: { label: 'Requirements', description: 'What we look for' },
    eligibility: { label: 'Who Can Apply', description: 'Eligibility' },
    applicationSelection: { label: 'Selection Process', description: 'How we evaluate' },
    technicalSupport: { label: 'Support Provided', description: 'Resources available' },
    definitions: { label: 'Key Terms', description: 'Definitions' },
    terms: { label: 'Terms & Conditions', description: 'Legal terms' },
    scoringSystem: { label: 'Evaluation Criteria', description: 'Scoring' },
    fraudPolicy: { label: 'Integrity Policy', description: 'Anti-fraud guidelines' },
} as const;

type SectionKey = keyof typeof sectionConfig;

function CollapsibleSection({
    id,
    title,
    content,
    isOpen,
    onToggle,
    accentColor,
}: {
    id: string;
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
    accentColor: string;
}) {
    return (
        <div className="overflow-hidden border-[3px] border-[#101010] bg-[#fff7df] shadow-[5px_5px_0_#101010]">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-[#f5efd6] sm:px-5"
                aria-expanded={isOpen}
                aria-controls={`section-${id}`}
            >
                <span className="h-6 w-1 shrink-0" style={{ backgroundColor: accentColor }} aria-hidden />
                <span className="min-w-0 flex-1 text-sm font-black uppercase text-[#101010]">{title}</span>
                <span className="shrink-0 text-[#101010]" aria-hidden>
                    {isOpen ? <CaretUpIcon className="h-4 w-4" /> : <CaretDownIcon className="h-4 w-4" />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={`section-${id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t-2 border-[#101010] px-4 pb-5 pt-3 sm:px-5">
                            <div
                                className="max-w-none text-sm font-medium leading-7 text-[#28261d]
                                    [&_p]:mb-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5
                                    [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5
                                    [&_li]:mb-1.5 [&_strong]:font-black [&_strong]:text-[#101010]
                                    [&_a]:text-[#3d6b12] [&_a]:underline [&_a]:underline-offset-2
                                    [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-black [&_h3]:uppercase"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ExploreMoreProgrammes() {
    return (
        <div className="border-t-[5px] border-[#101010] bg-[#80c738] py-14">
            <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
                <p className="mb-2 text-xs font-black uppercase tracking-wider text-[#101010]/70">More</p>
                <h3 className="mb-3 text-xl font-black uppercase text-[#101010]">Explore other programmes</h3>
                <p className="mb-8 text-sm font-medium leading-6 text-[#28261d]">
                    See flagship and special initiatives across climate innovation and enterprise support.
                </p>
                <Link
                    href="/programmes"
                    className="inline-flex border-[3px] border-[#101010] bg-[#fff7df] px-6 py-2.5 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-0.5"
                >
                    View all programmes
                </Link>
            </div>
        </div>
    );
}

function FloatingApplyButton({ href }: { href: string }) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="fixed bottom-6 right-6 z-50"
        >
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border-[3px] border-[#101010] bg-[#80c738] px-5 py-2.5 text-sm font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-0.5"
            >
                Apply
                <span className="sr-only"> (opens in new tab)</span>
            </a>
        </motion.div>
    );
}

export default function ProgrammeDetailPage({ programme, footerData }: Props) {
    const [openSections, setOpenSections] = useState<Set<string>>(new Set(['introduction']));
    const heroRef = useRef<HTMLDivElement>(null);

    const availableSections = useMemo(() => {
        return (Object.keys(sectionConfig) as SectionKey[]).filter(
            key => programme[key] && typeof programme[key] === 'string' && (programme[key] as string).trim() !== ''
        );
    }, [programme]);

    const flagshipContent = useMemo(() => getFlagshipContentForProgramme(programme), [programme]);

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

    const toggleSection = (sectionId: string) => {
        setOpenSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) newSet.delete(sectionId);
            else newSet.add(sectionId);
            return newSet;
        });
    };

    if (flagshipContent) {
        return (
            <div className="min-h-screen bg-[#fff7df] text-[#101010]">
                <MinimalNavbar {...navData} />
                <FlagshipHero programme={viewProgramme} flagship={flagshipContent} heroRef={heroRef} />
                <FlagshipProgrammeSections programme={viewProgramme} flagship={flagshipContent} />

                <ExploreMoreProgrammes />
                <Footer data={footerData} />
                {viewProgramme.isActive && primaryApplyHref && <FloatingApplyButton href={primaryApplyHref} />}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff7df] text-[#101010]">
            <MinimalNavbar {...navData} />
            <FlagshipHero programme={programme} heroRef={heroRef} />

            <div id="programme-details" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                {availableSections.length > 0 && (
                    <section>
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                            <FlagshipSectionHeading id="programme-details-heading">Programme details</FlagshipSectionHeading>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setOpenSections(new Set(availableSections))}
                                    className="border-2 border-[#101010] px-3 py-1.5 text-xs font-medium hover:bg-[#f5efd6]"
                                >
                                    Expand all
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpenSections(new Set())}
                                    className="border-2 border-[#101010] px-3 py-1.5 text-xs font-medium hover:bg-[#f5efd6]"
                                >
                                    Collapse all
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {availableSections.map((sectionKey) => {
                                const config = sectionConfig[sectionKey];
                                const content = programme[sectionKey];
                                if (!content || typeof content !== 'string') return null;

                                return (
                                    <CollapsibleSection
                                        key={sectionKey}
                                        id={sectionKey}
                                        title={config.label}
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
            </div>

            <ExploreMoreProgrammes />
            <Footer data={footerData} />
            {programme.isActive && programme.applicationLink && (
                <FloatingApplyButton href={programme.applicationLink} />
            )}
        </div>
    );
}
