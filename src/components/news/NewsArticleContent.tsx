'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  CaretLeft,
  Clock,
  DotsThree,
  DownloadSimple,
  EnvelopeSimple,
  FacebookLogo,
  Link as LinkIcon,
  LinkedinLogo,
  Printer,
  ShareNetwork,
  TwitterLogo,
  X,
} from '@phosphor-icons/react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { RichTextDisplay } from '@/components/admin/rich-text-display';
import { navData } from '@/lib/navigation';
import { homePageData } from '@/data/home';
import type { NewsData } from '@/lib/actions/news';
import { showSuccessToast } from '@/lib/toast';
import {
  gsap,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from '@/lib/gsap-foundation';
import '@/styles/news-article-print.css';

function formatDate(value: Date | string) {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function splitTitleWords(title: string) {
  return title.split(/\s+/).filter(Boolean);
}

type SharePlatform = 'facebook' | 'twitter' | 'linkedin' | 'email' | 'copy';

function ShareMenu({
  onShare,
  onClose,
  onPrint,
  className = '',
}: {
  onShare: (platform: SharePlatform) => void;
  onClose?: () => void;
  onPrint?: () => void;
  className?: string;
}) {
  const items: { platform: SharePlatform; label: string; Icon: typeof FacebookLogo }[] = [
    { platform: 'facebook', label: 'Facebook', Icon: FacebookLogo },
    { platform: 'twitter', label: 'X / Twitter', Icon: TwitterLogo },
    { platform: 'linkedin', label: 'LinkedIn', Icon: LinkedinLogo },
    { platform: 'email', label: 'Email', Icon: EnvelopeSimple },
    { platform: 'copy', label: 'Copy link', Icon: LinkIcon },
  ];

  return (
    <div
      className={`border-[3px] border-[#101010] bg-[#fff7df] py-2 shadow-[8px_8px_0_#101010] ${className}`}
      role="menu"
    >
      {onClose && (
        <div className="flex items-center justify-between border-b-[3px] border-[#101010] px-4 py-2 sm:hidden">
          <span className="text-xs font-black uppercase">More actions</span>
          <button type="button" onClick={onClose} className="p-1" aria-label="Close menu">
            <X className="h-5 w-5" weight="bold" />
          </button>
        </div>
      )}
      {onPrint && (
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onPrint();
            onClose?.();
          }}
          className="flex w-full items-center gap-3 border-b-[3px] border-[#101010] px-4 py-2.5 text-left text-sm font-bold uppercase transition hover:bg-[#80c738] sm:hidden"
        >
          <Printer className="h-5 w-5 shrink-0" weight="bold" />
          Print
        </button>
      )}
      {items.map(({ platform, label, Icon }) => (
        <button
          key={platform}
          type="button"
          role="menuitem"
          onClick={() => onShare(platform)}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold uppercase transition hover:bg-[#80c738]"
        >
          <Icon className="h-5 w-5 shrink-0" weight="bold" />
          {label}
        </button>
      ))}
    </div>
  );
}

function ActionButtons({
  onSavePdf,
  onPrint,
  showShareMenu,
  onToggleShare,
  onShare,
  compact = false,
}: {
  onSavePdf: () => void;
  onPrint: () => void;
  showShareMenu: boolean;
  onToggleShare: () => void;
  onShare: (platform: SharePlatform) => void;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        data-news-action
        onClick={onSavePdf}
        className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-2.5 text-xs font-black uppercase text-[#101010] shadow-[5px_5px_0_#101010] transition hover:-translate-y-0.5 sm:text-sm"
        title="Save as PDF using your browser's print dialog"
      >
        <DownloadSimple className="h-4 w-4 sm:h-5 sm:w-5" weight="bold" />
        Save PDF
      </button>
      {!compact && (
        <button
          type="button"
          data-news-action
          onClick={onPrint}
          className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-3 py-2.5 text-xs font-black uppercase shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5 sm:text-sm"
        >
          <Printer className="h-4 w-4 sm:h-5 sm:w-5" weight="bold" />
          <span className="hidden sm:inline">Print</span>
        </button>
      )}
      <div className="relative">
        <button
          type="button"
          data-news-action
          onClick={onToggleShare}
          className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-3 py-2.5 text-xs font-black uppercase shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5 sm:text-sm"
          aria-expanded={showShareMenu}
          aria-haspopup="menu"
        >
          {compact ? (
            <DotsThree className="h-5 w-5" weight="bold" />
          ) : (
            <>
              <ShareNetwork className="h-4 w-4 sm:h-5 sm:w-5" weight="bold" />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>
        {showShareMenu && !compact && (
          <ShareMenu onShare={onShare} className="absolute right-0 z-50 mt-2 w-52" />
        )}
      </div>
    </div>
  );
}

export function NewsArticleContent({ article }: { article: NewsData }) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const articleBodyRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const titleWords = splitTitleWords(article.title);
  const publishedLabel = formatDate(article.publishedAt);

  const handlePrint = () => {
    window.print();
  };

  const handleSavePdf = () => {
    window.print();
  };

  const handleShare = (platform: SharePlatform) => {
    const url = window.location.href;
    const text = article.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      showSuccessToast('Link copied', 'Article URL copied to clipboard.');
    } else {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }

    setShowShareMenu(false);
    setShowMobileMenu(false);
  };

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-news-word]', { yPercent: 110, rotate: 1.5 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .to('[data-news-word]', { yPercent: 0, rotate: 0, duration: 0.75, stagger: 0.05 })
        .from('[data-news-meta], [data-news-action], [data-news-dek]', { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.05 }, '-=0.3');

      if (articleBodyRef.current && progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: articleBodyRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.3,
          },
        });
      }

      gsap.from('[data-news-panel]', {
        y: 28,
        duration: 0.65,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '[data-news-panel]',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    }, pageRef);

    return () => ctx.revert();
  }, [article.slug]);

  return (
    <div ref={pageRef} className="news-article-page min-h-screen bg-[#fff7df] text-[#101010]">
      <div className="no-print">
        <MinimalNavbar {...navData} />
      </div>

      {/* Offset fixed navbar (pt-3 + shell ~94px); matches contact/impact pages */}
      <div className="no-print pt-28 sm:pt-32">
        {/* Reading progress — sits just under navbar when scrolling */}
        <div
          className="pointer-events-none fixed inset-x-0 top-28 z-40 h-1 origin-left bg-[#d5caa8] sm:top-32"
          aria-hidden="true"
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-[#80c738]"
          />
        </div>

        {/* Desktop sticky action bar */}
        <div className="sticky top-28 z-30 border-b-4 border-[#101010] bg-[#fff7df] shadow-[0_6px_0_#101010] sm:top-32 max-md:hidden">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link
              href="/impact/stories"
              className="inline-flex items-center gap-2 text-sm font-black uppercase transition hover:text-[#4f8618]"
            >
              <CaretLeft className="h-4 w-4" weight="bold" />
              Back to stories
            </Link>
            <div className="flex flex-col items-end gap-1">
              <ActionButtons
                onSavePdf={handleSavePdf}
                onPrint={handlePrint}
                showShareMenu={showShareMenu}
                onToggleShare={() => setShowShareMenu((v) => !v)}
                onShare={handleShare}
              />
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#58523f]">
                Choose &quot;Save as PDF&quot; in the print dialog
              </p>
            </div>
          </div>
        </div>

        {/* Mobile top back link */}
        <div className="border-b-[3px] border-[#101010] bg-[#fff7df] px-4 py-3 md:hidden">
          <Link
            href="/impact/stories"
            className="inline-flex items-center gap-2 text-sm font-black uppercase"
          >
            <CaretLeft className="h-4 w-4" weight="bold" />
            Back to stories
          </Link>
        </div>

        <main className="mx-auto max-w-3xl px-4 pb-28 pt-6 sm:px-6 sm:pb-16 md:pb-16">
        {/* Print header */}
        <div className="print-only mb-8 border-b-2 border-black pb-4">
          <h2 className="text-xl font-bold">Kenya Climate Innovation Center</h2>
          <p className="text-sm">www.kenyacic.org</p>
        </div>

        <article ref={articleBodyRef}>
          <span
            data-news-meta
            className="inline-block border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-xs font-black uppercase shadow-[4px_4px_0_#101010]"
          >
            {article.category}
          </span>

          <h1 className="mt-5 flex flex-wrap gap-x-[0.35em] gap-y-1 text-[clamp(1.75rem,4.5vw,3rem)] font-black uppercase leading-[0.95] tracking-tight">
            {titleWords.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-top">
                <span data-news-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-news-dek
            className="mt-6 text-lg font-medium leading-8 text-[#28261d] sm:text-xl"
          >
            {article.excerpt}
          </p>

          <div data-news-meta className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-3 py-1.5 text-xs font-bold uppercase shadow-[3px_3px_0_#101010]">
              <Calendar className="h-4 w-4" weight="bold" aria-hidden="true" />
              {publishedLabel}
            </span>
            {article.readTime && (
              <span className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-3 py-1.5 text-xs font-bold uppercase shadow-[3px_3px_0_#101010]">
                <Clock className="h-4 w-4" weight="bold" aria-hidden="true" />
                {article.readTime}
              </span>
            )}
          </div>

          {article.thumbnail && (
            <div
              data-news-panel
              className="relative mt-10 aspect-[16/10] w-full overflow-hidden border-[5px] border-[#101010] bg-[#80c738] shadow-[10px_10px_0_#101010]"
            >
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <div
            data-news-panel
            className="news-article-body-panel mt-10 border-[5px] border-[#101010] bg-[#fff7df] p-6 shadow-[10px_10px_0_#101010] sm:p-8"
          >
            {article.content ? (
              <RichTextDisplay content={article.content} variant="article" />
            ) : (
              <p className="text-lg font-medium leading-8 text-[#28261d]">{article.excerpt}</p>
            )}
          </div>
        </article>

        {/* Bottom share strip */}
        <section
          data-news-panel
          className="no-print mt-12 border-[5px] border-[#101010] bg-[#101010] p-6 text-[#fff7df] shadow-[10px_10px_0_#80c738] sm:p-8"
        >
          <h2 className="text-2xl font-black uppercase">Share this article</h2>
          <p className="mt-3 text-base font-medium leading-7 text-[#fff7df]/90">
            Help spread the word about climate innovation across East Africa.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {(
              [
                { platform: 'facebook' as const, Icon: FacebookLogo },
                { platform: 'twitter' as const, Icon: TwitterLogo },
                { platform: 'linkedin' as const, Icon: LinkedinLogo },
                { platform: 'email' as const, Icon: EnvelopeSimple },
                { platform: 'copy' as const, Icon: LinkIcon },
              ] as const
            ).map(({ platform, Icon }) => (
              <button
                key={platform}
                type="button"
                onClick={() => handleShare(platform)}
                className="inline-flex h-11 w-11 items-center justify-center border-[3px] border-[#101010] bg-[#80c738] text-[#101010] shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5"
                title={platform === 'copy' ? 'Copy link' : `Share on ${platform}`}
              >
                <Icon className="h-5 w-5" weight="bold" />
              </button>
            ))}
          </div>
        </section>

        {/* Print footer */}
        <div className="print-only mt-12 border-t-2 border-black pt-6 text-sm">
          <p>This article was downloaded from Kenya Climate Innovation Center.</p>
          <p>Visit us at: www.kenyacic.org</p>
          <p>Published: {publishedLabel}</p>
        </div>
      </main>
      </div>

      <div className="no-print">
        <Footer data={homePageData.footer} />
      </div>

      {/* Mobile bottom action bar */}
      <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t-[4px] border-[#101010] bg-[#fff7df] p-3 shadow-[0_-6px_0_#101010] md:hidden">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSavePdf}
            className="inline-flex flex-1 items-center justify-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-3 text-sm font-black uppercase shadow-[5px_5px_0_#101010]"
          >
            <DownloadSimple className="h-5 w-5" weight="bold" />
            Save PDF
          </button>
          <ActionButtons
            compact
            onSavePdf={handleSavePdf}
            onPrint={handlePrint}
            showShareMenu={showMobileMenu}
            onToggleShare={() => setShowMobileMenu((v) => !v)}
            onShare={handleShare}
          />
        </div>
        {showMobileMenu && (
          <ShareMenu
            onShare={handleShare}
            onPrint={handlePrint}
            onClose={() => setShowMobileMenu(false)}
            className="mt-3 w-full"
          />
        )}
      </div>
    </div>
  );
}
