'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgrammeWithSponsors } from '@/lib/actions/programmes';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';
import { 
    ArrowLeft as ArrowLeftIcon, 
    ArrowSquareOut as ArrowSquareOutIcon,
    CheckCircle as CheckCircleIcon,
    Info as InfoIcon,
    FileText as FileTextIcon,
    Users as UsersIcon,
    Target as TargetIcon,
    Gear as GearIcon,
    BookOpen as BookOpenIcon,
    ShieldCheck as ShieldCheckIcon,
    ChartBar as ChartBarIcon,
    Warning as WarningIcon,
    CaretDown as CaretDownIcon,
    CaretUp as CaretUpIcon,
    ArrowRight as ArrowRightIcon,
    Clock as ClockIcon,
    CurrencyDollar as CurrencyDollarIcon,
    GraduationCap as GraduationCapIcon,
    RocketLaunch as RocketLaunchIcon,
    Lightbulb as LightbulbIcon,
    Handshake as HandshakeIcon,
    IconProps,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';

interface Props {
    programme: ProgrammeWithSponsors;
}

// Section configuration with icons
const sectionConfig = {
    introduction: { 
        label: 'About This Programme', 
        icon: InfoIcon,
        description: 'Learn about the programme objectives and scope'
    },
    applicationProcess: { 
        label: 'How to Apply', 
        icon: FileTextIcon,
        description: 'Step-by-step application guide'
    },
    criteria: { 
        label: 'Requirements', 
        icon: CheckCircleIcon,
        description: 'What we look for in applicants'
    },
    eligibility: { 
        label: 'Who Can Apply', 
        icon: UsersIcon,
        description: 'Eligibility requirements'
    },
    applicationSelection: { 
        label: 'Selection Process', 
        icon: TargetIcon,
        description: 'How applications are evaluated'
    },
    technicalSupport: { 
        label: 'Support Provided', 
        icon: GearIcon,
        description: 'Resources and assistance available'
    },
    definitions: { 
        label: 'Key Terms', 
        icon: BookOpenIcon,
        description: 'Important definitions'
    },
    terms: { 
        label: 'Terms & Conditions', 
        icon: ShieldCheckIcon,
        description: 'Legal terms and agreements'
    },
    scoringSystem: { 
        label: 'Evaluation Criteria', 
        icon: ChartBarIcon,
        description: 'How applications are scored'
    },
    fraudPolicy: { 
        label: 'Integrity Policy', 
        icon: WarningIcon,
        description: 'Anti-fraud guidelines'
    },
} as const;

type SectionKey = keyof typeof sectionConfig;

// Collapsible Section Component
function CollapsibleSection({ 
    id,
    title, 
    icon: IconComponent, 
    description,
    content, 
    isOpen, 
    onToggle,
    accentColor 
}: { 
    id: string;
    title: string;
    icon: Icon;
    description: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
    accentColor: string;
}) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50/50 transition-colors"
                aria-expanded={isOpen}
                aria-controls={`section-${id}`}
            >
                <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accentColor}15` }}
                >
                    <IconComponent className="w-5 h-5" color={accentColor} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                    <p className="text-xs text-gray-500 truncate">{description}</p>
                </div>
                <div className="shrink-0">
                    {isOpen ? (
                        <CaretUpIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                        <CaretDownIcon className="w-5 h-5 text-gray-400" />
                    )}
                </div>
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

// What You Get Card
function BenefitCard({ 
    icon: IconComponent, 
    title, 
    description,
    color 
}: { 
    icon: Icon;
    title: string;
    description: string;
    color: string;
}) {
    return (
        <div className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${color}15` }}
            >
                <IconComponent className="w-5 h-5" color={color} weight="duotone" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
        </div>
    );
}

export default function ProgrammeDetailPage({ programme }: Props) {
    const [openSections, setOpenSections] = useState<Set<string>>(new Set(['introduction']));
    const heroRef = useRef<HTMLDivElement>(null);

    // Get available sections (only those with content)
    const availableSections = useMemo(() => {
        return (Object.keys(sectionConfig) as SectionKey[]).filter(
            key => programme[key] && typeof programme[key] === 'string' && (programme[key] as string).trim() !== ''
        );
    }, [programme]);

    // Parse introduction for key highlights
    const getHighlights = () => {
        // Default highlights - can be enhanced with actual parsing
        const highlights = [
            { icon: RocketLaunchIcon, title: 'Accelerator Support', description: 'Business development and growth assistance' },
            { icon: CurrencyDollarIcon, title: 'Funding Access', description: 'Connect with investors and financing options' },
            { icon: GraduationCapIcon, title: 'Skills Training', description: 'Capacity building and mentorship' },
            { icon: HandshakeIcon, title: 'Network Access', description: 'Connect with industry partners and peers' },
        ];
        return highlights;
    };

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

                {/* Hero Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                    {/* Breadcrumb */}
                    <Link
                        href="/programmes"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors group"
                    >
                        <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Programmes
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text Content */}
                        <div>
                            {/* Status Badge */}
                            {programme.isActive ? (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-6">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    Applications Open
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 text-gray-400 rounded-full text-sm font-medium mb-6">
                                    <ClockIcon className="w-4 h-4" />
                                    Programme Overview
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
                                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-sm text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-green-600/30"
                                    >
                                        Apply Now
                                        <ArrowSquareOutIcon className="w-4 h-4" />
                                    </a>
                                )}
                                <button
                                    onClick={() => document.getElementById('programme-details')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-sm text-white font-semibold rounded-full transition-all backdrop-blur-sm"
                                >
                                    Learn More
                                    <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Right: Featured Image Card */}
                        <div className="hidden lg:block">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
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

            {/* Sponsor Logos */}
            {programme.sponsors.length > 0 && (
                <div className="bg-white border-b border-gray-100 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-xs text-gray-400 uppercase tracking-wider text-center mb-6">
                            Supported By
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                            {programme.sponsors.map((sponsor) => (
                                <div key={sponsor.id} className="relative h-12 w-32 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
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
                
                {/* What You Get Section */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3">
                            <LightbulbIcon className="w-3 h-3" />
                            Programme Benefits
                        </span>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900">
                            What This Programme Offers
                        </h2>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {getHighlights().map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <BenefitCard
                                    icon={benefit.icon}
                                    title={benefit.title}
                                    description={benefit.description}
                                    color={programme.color}
                                />
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
                                        icon={config.icon}
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
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white rounded-full text-xs font-semibold mb-4">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                    Applications Now Open
                                </span>
                                
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                    Ready to Make an Impact?
                                </h3>
                                
                                <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto mb-6">
                                    Join {programme.title} and take the next step in your climate innovation journey.
                                </p>

                                <a
                                    href={programme.applicationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
                                >
                                    Apply Now
                                    <ArrowSquareOutIcon className="w-4 h-4" />
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        View All Programmes
                    </Link>
                </div>
            </div>

            <Footer data={{
                quickLinks: [{ label: 'Home', href: '/' }],
                socialMedia: [],
                contact: { address: '', phone: '', email: '' },
                newsletter: { title: '', description: '', placeholder: '' },
                copyright: '© 2024 KCIC'
            }} />

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
                        className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-sm text-white font-semibold rounded-full shadow-lg shadow-green-600/30 transition-all hover:scale-105"
                    >
                        Apply Here
                        <ArrowSquareOutIcon className="w-4 h-4" />
                    </a>
                </motion.div>
            )}
        </div>
    );
}
