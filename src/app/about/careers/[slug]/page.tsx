import { redirect } from 'next/navigation';

export default async function OpportunityRedirect({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    redirect(`/en/about/careers/${slug}`);
}
