import { notFound } from 'next/navigation';
import { getProgrammeBySlug } from '@/lib/actions/programmes';
import ProgrammeDetailPage from '@/components/sections/ProgrammeDetailPage';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProgrammePage({ params }: PageProps) {
    const { slug } = await params;
    const result = await getProgrammeBySlug(slug);

    if (!result.success || !result.data) {
        notFound();
    }

    return <ProgrammeDetailPage programme={result.data} />;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const result = await getProgrammeBySlug(slug);

    if (!result.success || !result.data) {
        return {
            title: 'Programme Not Found',
        };
    }

    return {
        title: `${result.data.title} | KCIC Programmes`,
        description: result.data.description,
    };
}
