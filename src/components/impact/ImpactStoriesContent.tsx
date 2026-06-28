'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from '@phosphor-icons/react';
import { ImpactPageShell } from '@/components/impact/ImpactPageShell';
import { ImpactSectionNav } from '@/components/impact/ImpactSectionNav';
import type { NewsData } from '@/lib/actions/news';

function formatDate(value: Date | string) {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function ImpactStoriesContent({ articles }: { articles: NewsData[] }) {
  return (
    <ImpactPageShell
      ariaLabel="Impact stories. Real change."
      badge="Impact stories"
      line1="Impact stories."
      line2="Real change."
      body="Discover inspiring stories of entrepreneurs transforming Kenya's climate landscape through innovation, determination, and KCIC support."
      floatStamp="Story desk"
      floatCard1Label="Stories"
      floatCard1Value={String(articles.length)}
      floatCard2Label="Live feed"
      floatCard2Value="News"
    >
      <div data-impact-nav className="mb-10">
        <ImpactSectionNav activeHref="/impact/stories" />
      </div>

      {articles.length === 0 ? (
        <div
          data-impact-panel
          className="grid gap-8 border-[5px] border-[#101010] bg-[#fff7df] p-8 shadow-[10px_10px_0_#101010] lg:grid-cols-[0.75fr_1.25fr]"
        >
          <div className="relative min-h-[200px] border-[4px] border-[#101010] bg-[#80c738]" />
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-black uppercase leading-[0.95]">No stories yet.</h2>
            <p className="mt-5 text-lg font-medium leading-8 text-[#28261d]">
              Check back soon for inspiring climate innovation stories from our community.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, index) => (
            <article
              key={article.id}
              data-impact-panel
              className={`flex h-full flex-col border-[5px] border-[#101010] bg-[#fff7df] shadow-[10px_10px_0_#101010] ${index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : ''}`}
            >
              <div className="relative h-48 shrink-0 overflow-hidden border-b-[4px] border-[#101010] bg-[#80c738]">
                {article.thumbnail ? (
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : null}
                <span className="absolute right-3 top-3 z-10 border-[3px] border-[#101010] bg-[#fff7df] px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#101010]">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="line-clamp-2 text-xl font-black uppercase leading-tight">{article.title}</h2>
                <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase text-[#58523f]">
                  <Calendar className="h-4 w-4" weight="bold" aria-hidden="true" />
                  <span>{formatDate(article.publishedAt)}</span>
                  {article.readTime && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                </div>
                <p className="mt-4 line-clamp-3 flex-1 text-sm font-medium leading-7 text-[#28261d]">
                  {article.excerpt}
                </p>
                <Link
                  href={`/news/${article.slug}`}
                  className="mt-6 inline-flex items-center justify-between gap-3 border-[3px] border-[#101010] bg-[#80c738] px-4 py-3 text-sm font-black uppercase shadow-[5px_5px_0_#101010] transition hover:-translate-y-1"
                >
                  Read full story
                  <ArrowRight className="h-5 w-5" weight="bold" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <section
        data-impact-panel
        className="mt-16 border-[5px] border-[#101010] bg-[#101010] p-8 text-center text-[#fff7df] shadow-[10px_10px_0_#80c738] sm:p-10"
      >
        <h2 className="text-3xl font-black uppercase sm:text-4xl">Ready to write your success story?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-8 text-[#fff7df]/90">
          Join our community of climate innovators and let us help you transform your idea into impact.
        </p>
        <Link
          href="/programmes"
          className="mt-8 inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-6 py-3 text-sm font-black uppercase text-[#101010] shadow-[6px_6px_0_#101010] transition hover:-translate-y-1"
        >
          Explore our programmes
          <ArrowRight className="h-5 w-5" weight="bold" />
        </Link>
      </section>
    </ImpactPageShell>
  );
}
