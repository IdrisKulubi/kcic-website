import { Metadata } from 'next';
import { ImpactStoriesContent } from '@/components/impact/ImpactStoriesContent';
import { listNews } from '@/lib/actions/news';

export const metadata: Metadata = {
  title: 'Impact Stories - KCIC',
  description: 'Inspiring stories of climate entrepreneurs and innovators supported by Kenya Climate Innovation Centre.',
};

export default async function ImpactStoriesPage() {
  const result = await listNews({ limit: 20 });
  const articles = result.success ? result.data?.articles ?? [] : [];

  return <ImpactStoriesContent articles={articles} />;
}
