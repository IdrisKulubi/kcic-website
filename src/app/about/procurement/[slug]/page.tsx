import { redirect } from 'next/navigation';

export default async function ProcurementDetailRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/en/about/procurement/${slug}`);
}
