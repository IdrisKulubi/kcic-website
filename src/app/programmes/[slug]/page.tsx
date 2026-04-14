import { notFound } from 'next/navigation';
import { getProgrammeBySlugWithFlagshipFallback } from '@/lib/actions/programmes';
import { getFlagshipContent } from '@/data/flagship-programmes';
import { getFooterSection } from '@/lib/actions/footer';
import ProgrammeDetailPage from '@/components/sections/ProgrammeDetailPage';
import type { FooterData } from '@/data/home';
import { homePageData } from '@/data/home';

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getProgrammePageFooter(): Promise<FooterData> {
    const footerResult = await getFooterSection();
    if (!footerResult.success || !footerResult.data) {
        return homePageData.footer;
    }
    const { section, links, socialMedia } = footerResult.data;
    return {
        quickLinks: links.map((l) => ({ label: l.label, href: l.href })),
        socialMedia: socialMedia.map((s) => ({ platform: s.platform, href: s.href, icon: s.icon })),
        contact: {
            address: section.contactAddress || '',
            phone: section.contactPhone || '',
            email: section.contactEmail || '',
        },
        newsletter: {
            title: section.newsletterTitle || 'Stay Updated',
            description:
                section.newsletterDescription || 'Subscribe to our newsletter for climate innovation updates.',
            placeholder: section.newsletterPlaceholder || 'Enter your email',
        },
        copyright: section.copyright || '© Kenya Climate Innovation Centre',
    };
}

export default async function ProgrammePage({ params }: PageProps) {
    const { slug } = await params;
    const result = await getProgrammeBySlugWithFlagshipFallback(slug);

    if (!result.success || !result.data) {
        notFound();
    }

    const footerData = await getProgrammePageFooter();

    return <ProgrammeDetailPage programme={result.data} footerData={footerData} />;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const result = await getProgrammeBySlugWithFlagshipFallback(slug);

    if (!result.success || !result.data) {
        return {
            title: 'Programme Not Found',
        };
    }

    const flagship = getFlagshipContent(slug) ?? getFlagshipContent(result.data.slug);
    const displayTitle = flagship?.shell?.title ?? result.data.title;
    const displayDescription = flagship?.shell?.description ?? result.data.description;

    return {
        title: `${displayTitle} | KCIC Programmes`,
        description: displayDescription,
    };
}
