'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProgrammeWithSponsors } from '@/lib/actions/programmes';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';
import { ArrowLeftIcon, ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr';

interface Props {
    programme: ProgrammeWithSponsors;
}

// Section configuration
const sections = [
    { id: 'introduction', label: 'Introduction', key: 'introduction' },
    { id: 'application-process', label: 'Application Process', key: 'applicationProcess' },
    { id: 'criteria', label: 'Criteria', key: 'criteria' },
    { id: 'eligibility', label: 'Eligibility', key: 'eligibility' },
    { id: 'selection', label: 'Selection', key: 'applicationSelection' },
    { id: 'technical-support', label: 'Technical Support', key: 'technicalSupport' },
    { id: 'definitions', label: 'Definitions', key: 'definitions' },
    { id: 'terms', label: 'Terms', key: 'terms' },
    { id: 'scoring', label: 'Scoring System', key: 'scoringSystem' },
    { id: 'fraud-policy', label: 'Fraud & Bribery', key: 'fraudPolicy' },
] as const;

export default function ProgrammeDetailPage({ programme }: Props) {
    const [activeSection, setActiveSection] = useState('introduction');
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Filter sections that have content
    const availableSections = sections.filter(
        (section) => programme[section.key as keyof typeof programme]
    );

    // Scroll spy effect
    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = availableSections.map(s =>
                document.getElementById(s.id)
            ).filter(Boolean);

            for (const el of sectionElements) {
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    setActiveSection(el.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [availableSections]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <MinimalNavbar {...navData} />

            {/* Hero Section with Parallax */}
            <div ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0"
                >
                    <Image
                        src={programme.headerImage || programme.image}
                        alt={programme.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                </motion.div>

                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="absolute inset-0 flex flex-col justify-end"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                        {/* Back button */}
                        <Link
                            href="/how-we-work/programmes"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            All Programmes
                        </Link>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {programme.title}
                        </h1>

                        <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                            {programme.description}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Sponsor Logos Bar */}
            {programme.sponsors.length > 0 && (
                <div className="bg-gray-50 border-b border-gray-200 py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                            {programme.sponsors.map((sponsor) => (
                                <div key={sponsor.id} className="relative h-12 w-32">
                                    <Image
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        fill
                                        className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sticky Section Navigation */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <nav className="sticky top-24 space-y-1">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                                On this page
                            </p>
                            {availableSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeSection === section.id
                                            ? 'bg-green-50 text-green-700 border-l-2 border-green-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                  `}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Sections */}
                    <main className="flex-1 min-w-0">
                        <div className="space-y-12">
                            {availableSections.map((section, index) => {
                                const content = programme[section.key as keyof typeof programme];
                                if (!content || typeof content !== 'string') return null;

                                return (
                                    <motion.section
                                        key={section.id}
                                        id={section.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.4, delay: index * 0.03 }}
                                        className="scroll-mt-28"
                                    >
                                        {/* Section Header */}
                                        <div className="mb-4 pb-3 border-b border-gray-100">
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {section.label}
                                            </h2>
                                        </div>

                                        {/* Content */}
                                        <div
                                            className="text-xs leading-relaxed text-gray-600 max-w-none
                                                [&_p]:mb-2.5 [&_p]:text-xs [&_p]:text-gray-600
                                                [&_ul]:my-2.5 [&_ul]:pl-4 [&_ul]:list-disc [&_ul]:text-xs [&_ul]:text-gray-600
                                                [&_ol]:my-2.5 [&_ol]:pl-4 [&_ol]:list-decimal [&_ol]:text-xs [&_ol]:text-gray-600
                                                [&_li]:mb-1 [&_li]:text-xs [&_li]:text-gray-600
                                                [&_strong]:text-gray-800 [&_strong]:font-medium
                                                [&_a]:text-green-600 [&_a]:underline [&_a]:underline-offset-2
                                                [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-4 [&_h3]:mb-1.5
                                                [&_h4]:text-xs [&_h4]:font-medium [&_h4]:text-gray-700 [&_h4]:mt-3 [&_h4]:mb-1
                                                [&_table]:w-full [&_table]:my-2.5 [&_table]:text-xs
                                                [&_th]:text-left [&_th]:py-1 [&_th]:px-2 [&_th]:bg-gray-50 [&_th]:font-medium [&_th]:text-gray-700 [&_th]:text-xs
                                                [&_td]:py-1 [&_td]:px-2 [&_td]:border-b [&_td]:border-gray-100 [&_td]:text-xs"
                                            dangerouslySetInnerHTML={{ __html: content }}
                                        />
                                    </motion.section>
                                );
                            })}
                        </div>
                    </main>
                </div>
            </div>

            {/* Floating Apply Button */}
            {programme.isActive && programme.applicationLink && (
                <div className="fixed bottom-6 right-6 z-50">
                    <a
                        href={programme.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              flex items-center gap-2 px-4 py-2.5 
              bg-green-600 hover:bg-green-700 
              text-white font-medium text-sm
              rounded-full shadow-lg shadow-green-600/20
              transition-all duration-300 hover:scale-105
            "
                    >
                        Apply Here
                        <ArrowSquareOutIcon className="w-4 h-4" />
                    </a>
                </div>
            )}

            {/* Back to Programmes CTA */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Explore More Programmes
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                        Discover other initiatives supporting climate innovation across Africa.
                    </p>
                    <Link
                        href="/how-we-work/programmes"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
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
        </div>
    );
}
