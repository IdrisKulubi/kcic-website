import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NewsArticleContent } from '@/components/news/NewsArticleContent';
import { getNewsArticleBySlug } from '@/lib/actions/news';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getNewsArticleBySlug(slug);

  if (!result.success || !result.data) {
    return { title: 'Article not found - KCIC' };
  }

  const article = result.data;

  return {
    title: `${article.title} - KCIC`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.thumbnail ? [{ url: article.thumbnail }] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getNewsArticleBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  return <NewsArticleContent article={result.data} />;
}
