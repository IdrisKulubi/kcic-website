'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import {
  ArrowRight,
  ArrowSquareOut,
  Briefcase,
  Buildings,
  Calendar,
  CaretLeft,
  ClipboardText,
  Clock,
  DownloadSimple,
  EnvelopeSimple,
  FileText,
  Hash,
  MapPin,
  Paperclip,
  Sparkle,
  Users,
} from '@phosphor-icons/react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import Footer from '@/components/layout/Footer';
import { navData } from '@/lib/navigation';
import { homePageData } from '@/data/home';
import { getOpportunityBySlug, OpportunityType, OpportunityWithAttachments } from '@/lib/actions/opportunities';
import {
  drawSvgPaths,
  gsap,
  marqueeLoop,
  prefersReducedMotion,
  registerGsapFoundation,
  ScrollTrigger,
} from '@/lib/gsap-foundation';

type SectionHint = 'careers' | 'procurement';

const typeConfig: Record<
  OpportunityType,
  {
    label: string;
    detailLabel: string;
    stamp: string;
    Icon: typeof Briefcase;
  }
> = {
  job: { label: 'Job opening', detailLabel: 'Job details', stamp: 'ROLE', Icon: Briefcase },
  consulting: { label: 'Consultancy', detailLabel: 'Consultancy details', stamp: 'CONSULT', Icon: Users },
  rfp: { label: 'Request for proposal', detailLabel: 'RFP details', stamp: 'RFP', Icon: ClipboardText },
  tender: { label: 'Tender notice', detailLabel: 'Tender details', stamp: 'TENDER', Icon: FileText },
};

const careersTicker = [
  'Open roles',
  'Apply now',
  'Review requirements',
  'Check deadline',
  'Green jobs',
  'Team KCIC',
];

const procurementTicker = [
  'Review brief',
  'Download files',
  'Check deadline',
  'Submit response',
  'KCIC opportunities',
];

function isProcurementType(type: OpportunityType) {
  return type === 'consulting' || type === 'rfp' || type === 'tender';
}

function formatDate(value: Date | string | null, pattern = 'MMMM d, yyyy') {
  if (!value) return 'Not specified';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not specified';
  return format(date, pattern);
}

function plainTextFromHtml(value: string | null) {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const knownFileExtensions = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip', 'csv']);

function formatAttachmentType(fileName: string | null, fileType: string | null, fileUrl: string) {
  const extensionFromName = fileName?.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
  if (extensionFromName && knownFileExtensions.has(extensionFromName)) {
    return extensionFromName.toUpperCase();
  }

  if (fileType) {
    const mimeTail = (fileType.includes('/') ? fileType.split('/').pop() : fileType)?.toLowerCase() ?? '';
    if (mimeTail === 'pdf') return 'PDF';
    if (mimeTail === 'msword') return 'DOC';
    if (mimeTail.includes('wordprocessingml')) return 'DOCX';
    if (knownFileExtensions.has(mimeTail) && mimeTail.length <= 5) return mimeTail.toUpperCase();
  }

  const urlPath = fileUrl.split('?')[0];
  const extensionFromUrl = urlPath.includes('.') ? urlPath.split('.').pop()?.toLowerCase() : null;
  if (extensionFromUrl && knownFileExtensions.has(extensionFromUrl)) {
    return extensionFromUrl.toUpperCase();
  }

  return null;
}

function ContentSection({ title, content, index }: { title: string; content: string | null; index: number }) {
  if (!content) return null;

  return (
    <section
      data-opportunity-panel
      className={`${index % 2 === 0 ? '-rotate-[0.35deg]' : 'rotate-[0.35deg]'} border-[4px] border-[#101010] bg-[#fff7df] p-5 shadow-[8px_8px_0_#101010] sm:p-7`}
    >
      <h2 className="w-fit border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase text-[#101010] shadow-[4px_4px_0_#101010]">
        {title}
      </h2>
      <div
        className="mt-6 max-w-none text-base font-medium leading-8 text-[#28261d] [&_a]:font-black [&_a]:text-[#4f8618] [&_a]:underline [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-black [&_h3]:uppercase [&_h4]:mt-5 [&_h4]:font-black [&_li]:mb-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_strong]:font-black [&_strong]:text-[#101010] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />
      <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        <div className="border-[5px] border-[#101010] bg-[#fff7df] p-6 shadow-[10px_10px_0_#101010]">
          <div className="h-8 w-40 animate-pulse bg-[#80c738]" />
          <div className="mt-8 h-16 w-4/5 animate-pulse bg-[#101010]" />
          <div className="mt-4 h-16 w-3/5 animate-pulse bg-[#101010]" />
          <div className="mt-10 h-5 w-full animate-pulse bg-[#d5caa8]" />
          <div className="mt-3 h-5 w-2/3 animate-pulse bg-[#d5caa8]" />
        </div>
      </div>
    </div>
  );
}

function NotFoundState({ sectionHint }: { sectionHint: SectionHint }) {
  const href = sectionHint === 'procurement' ? '/about/procurement' : '/about/careers';
  const label = sectionHint === 'procurement' ? 'Back to procurement' : 'Back to careers';

  return (
    <div className="min-h-screen bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />
      <main className="mx-auto max-w-4xl px-4 pt-32 sm:px-6 lg:px-8">
        <div className="border-[5px] border-[#101010] bg-[#fff7df] p-8 text-center shadow-[10px_10px_0_#101010]">
          <FileText className="mx-auto h-16 w-16 text-[#80c738]" weight="bold" />
          <h1 className="mt-6 text-4xl font-black uppercase leading-none">Opportunity not found.</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium leading-8 text-[#28261d]">
            This listing may have expired, moved, or been removed from the opportunities desk.
          </p>
          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-5 py-3 text-sm font-black uppercase shadow-[6px_6px_0_#101010] transition hover:-translate-y-1"
          >
            <CaretLeft className="h-4 w-4" weight="bold" />
            {label}
          </Link>
        </div>
      </main>
    </div>
  );
}

export function OpportunityDetailView({ sectionHint = 'careers' }: { sectionHint?: SectionHint }) {
  const params = useParams();
  const slug = params?.slug as string;
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [opportunity, setOpportunity] = useState<OpportunityWithAttachments | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchOpportunity() {
      if (!slug) return;

      const result = await getOpportunityBySlug(slug);
      if (!mounted) return;

      if (result.success && result.data) {
        setOpportunity(result.data);
      } else {
        setError(result.error || 'Opportunity not found');
      }
      setLoading(false);
    }

    fetchOpportunity();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const contentSections = useMemo(() => {
    if (!opportunity) return [];
    return [
      { title: 'Overview', content: opportunity.description || opportunity.summary },
      { title: 'Responsibilities', content: opportunity.responsibilities },
      { title: 'Requirements', content: opportunity.requirements },
      { title: 'Qualifications', content: opportunity.qualifications },
      { title: 'Application process', content: opportunity.applicationInstructions },
    ].filter((section) => Boolean(section.content));
  }, [opportunity]);

  useLayoutEffect(() => {
    if (!pageRef.current || loading || !opportunity) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-opportunity-word]', { yPercent: 110, rotate: 1.5 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .add(drawSvgPaths('[data-opportunity-line]', { dash: 720, duration: 0.95, stagger: 0.05 }))
        .to('[data-opportunity-word]', { yPercent: 0, rotate: 0, duration: 0.82, stagger: 0.06 }, '-=0.35')
        .from('[data-opportunity-meta], [data-opportunity-action]', { autoAlpha: 0, y: 18, duration: 0.58, stagger: 0.05 }, '-=0.25');

      marqueeLoop('[data-opportunity-marquee]', { duration: 48 });

      gsap.utils.toArray<HTMLElement>('[data-opportunity-panel], [data-opportunity-side]').forEach((panel, index) => {
        gsap.from(panel, {
          y: 34,
          rotate: index % 2 === 0 ? -0.8 : 0.8,
          duration: 0.72,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.to('[data-opportunity-float]', {
        y: -18,
        rotate: -1,
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    }, pageRef);

    return () => ctx.revert();
  }, [loading, opportunity, contentSections.length]);

  if (loading) return <LoadingState />;
  if (error || !opportunity) return <NotFoundState sectionHint={sectionHint} />;

  const config = typeConfig[opportunity.type as OpportunityType] ?? typeConfig.job;
  const isProcurement = isProcurementType(opportunity.type);
  const tickerItems = isProcurement ? procurementTicker : careersTicker;
  const backHref = isProcurement ? '/about/procurement' : '/about/careers';
  const backLabel = isProcurement ? 'Back to procurement' : 'Back to careers';
  const actionLabel = isProcurement ? 'Submit response' : 'Apply for this role';
  const emailLabel = isProcurement ? 'Email submission' : 'Email application';
  const pageLabel = isProcurement ? 'Procurement notice' : 'Talent desk';
  const sidebarBody = isProcurement
    ? 'Review the notice, confirm the deadline, then submit using the published channel.'
    : 'Review the role, confirm you meet the requirements, then apply before the deadline.';
  const featuredLabel = isProcurement ? 'Priority notice' : 'Featured role';
  const applyFallbackCopy = isProcurement
    ? 'Check back for submission details or contact procurement@kenyacic.org.'
    : 'Check back for application details or contact careers@kenyacic.org.';
  const hasApplyChannel = Boolean(opportunity.applicationLink || opportunity.applicationEmail);
  const plainSummary = plainTextFromHtml(opportunity.description) || opportunity.summary;

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden bg-[#fff7df] text-[#101010]">
      <MinimalNavbar {...navData} />

      <section className="relative isolate border-b-[5px] border-[#101010] pt-28 sm:pt-32">
        <div className="absolute inset-x-0 top-20 -z-10 h-[44px] border-y-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <Link
              href={backHref}
              className="inline-flex -rotate-1 items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-4 py-2 text-sm font-black uppercase shadow-[5px_5px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
            >
              <CaretLeft className="h-4 w-4" weight="bold" />
              {backLabel}
            </Link>

            <div data-opportunity-meta className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-3 py-2 text-sm font-black uppercase shadow-[4px_4px_0_#101010]">
                <config.Icon className="h-4 w-4" weight="bold" />
                {config.label}
              </span>
              {opportunity.referenceNumber && (
                <span className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#fff7df] px-3 py-2 text-sm font-black uppercase shadow-[4px_4px_0_#101010]">
                  <Hash className="h-4 w-4" weight="bold" />
                  {opportunity.referenceNumber}
                </span>
              )}
              {opportunity.isFeatured && (
                <span className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#101010] px-3 py-2 text-sm font-black uppercase text-[#fff7df] shadow-[4px_4px_0_#80c738]">
                  <Sparkle className="h-4 w-4 text-[#80c738]" weight="bold" />
                  {featuredLabel}
                </span>
              )}
              {opportunity.isActive && (
                <span className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#101010] px-3 py-2 text-sm font-black uppercase text-[#fff7df] shadow-[4px_4px_0_#80c738]">
                  <span className="h-2.5 w-2.5 bg-[#80c738]" />
                  Active
                </span>
              )}
            </div>

            <h1
              aria-label={opportunity.title}
              className="mt-7 max-w-4xl line-clamp-4 font-black uppercase leading-[0.95] tracking-normal"
              style={{ fontSize: 'clamp(1.75rem, 3.8vw, 3.25rem)' }}
              title={opportunity.title}
            >
              <span className="block overflow-hidden pb-1">
                <span data-opportunity-word className="inline-block">
                  {opportunity.title}
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-[#28261d]">{plainSummary}</p>
          </div>

          <div data-opportunity-float className="relative min-h-[410px]">
            <svg className="absolute inset-0 h-full w-full text-[#101010]" viewBox="0 0 720 500" fill="none" aria-hidden="true">
              <path data-opportunity-line d="M90 76H545V426H90V76Z" stroke="currentColor" strokeWidth="5" />
              <path data-opportunity-line d="M135 140H502" stroke="currentColor" strokeWidth="5" />
              <path data-opportunity-line d="M135 203H462" stroke="currentColor" strokeWidth="5" />
              <path data-opportunity-line d="M135 266H510" stroke="currentColor" strokeWidth="5" />
              <path data-opportunity-line d="M135 329H386" stroke="currentColor" strokeWidth="5" />
              <path data-opportunity-line d="M584 120C633 162 652 220 640 293C630 358 593 405 529 433" stroke="currentColor" strokeWidth="4" />
              <path data-opportunity-line d="M56 397C127 461 226 474 354 435" stroke="currentColor" strokeWidth="4" />
            </svg>
            <div className="absolute left-6 top-8 rotate-[-4deg] border-[4px] border-[#101010] bg-[#80c738] px-5 py-3 text-lg font-black uppercase shadow-[7px_7px_0_#101010]">
              {config.stamp}
            </div>
            <div className="absolute right-4 top-28 max-w-[250px] rotate-3 border-[4px] border-[#101010] bg-[#fff7df] p-5 shadow-[7px_7px_0_#101010]">
              <p className="text-xs font-black uppercase text-[#58523f]">Deadline</p>
              <p className="mt-2 text-3xl font-black uppercase leading-none">{formatDate(opportunity.deadline, 'MMM d, yyyy')}</p>
            </div>
            <div className="absolute bottom-12 left-8 max-w-[260px] -rotate-2 border-[4px] border-[#101010] bg-[#101010] p-5 text-[#fff7df] shadow-[7px_7px_0_#80c738]">
              <p className="text-xs font-black uppercase text-[#80c738]">{pageLabel}</p>
              <p className="mt-2 text-lg font-black uppercase leading-tight">{config.detailLabel}</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-t-[5px] border-[#101010] bg-[#101010] py-4 text-[#fff7df]">
          <div data-opportunity-marquee className="flex w-max gap-7 whitespace-nowrap">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-7 text-xl font-black uppercase sm:text-2xl">
                {item}
                <span className="h-4 w-4 bg-[#80c738]" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="bg-[#fff7df] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div className="space-y-8">
            <section data-opportunity-panel className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {opportunity.location && (
                <div className={`border-[4px] border-[#101010] bg-[#fff7df] p-4 shadow-[6px_6px_0_#101010] ${!isProcurement ? '-rotate-1' : ''}`}>
                  <MapPin className="h-6 w-6 text-[#5a8f1d]" weight="bold" />
                  <p className="mt-4 text-xs font-black uppercase text-[#58523f]">Location</p>
                  <p className="mt-1 text-lg font-black">{opportunity.location}</p>
                </div>
              )}
              {opportunity.department && (
                <div className={`border-[4px] border-[#101010] bg-[#fff7df] p-4 shadow-[6px_6px_0_#101010] ${!isProcurement ? 'rotate-1' : ''}`}>
                  <Buildings className="h-6 w-6 text-[#5a8f1d]" weight="bold" />
                  <p className="mt-4 text-xs font-black uppercase text-[#58523f]">Department</p>
                  <p className="mt-1 text-lg font-black">{opportunity.department}</p>
                </div>
              )}
              {opportunity.employmentType && (
                <div className={`border-[4px] border-[#101010] bg-[#fff7df] p-4 shadow-[6px_6px_0_#101010] ${!isProcurement ? '-rotate-1' : ''}`}>
                  <Briefcase className="h-6 w-6 text-[#5a8f1d]" weight="bold" />
                  <p className="mt-4 text-xs font-black uppercase text-[#58523f]">Type</p>
                  <p className="mt-1 text-lg font-black capitalize">{opportunity.employmentType.replace('-', ' ')}</p>
                </div>
              )}
              {opportunity.issuedDate && (
                <div className={`border-[4px] border-[#101010] bg-[#fff7df] p-4 shadow-[6px_6px_0_#101010] ${!isProcurement ? 'rotate-1' : ''}`}>
                  <Calendar className="h-6 w-6 text-[#5a8f1d]" weight="bold" />
                  <p className="mt-4 text-xs font-black uppercase text-[#58523f]">Posted</p>
                  <p className="mt-1 text-lg font-black">{formatDate(opportunity.issuedDate, 'MMM d, yyyy')}</p>
                </div>
              )}
            </section>

            {contentSections.map((section, index) => (
              <ContentSection key={section.title} title={section.title} content={section.content} index={index} />
            ))}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section data-opportunity-side className="border-[5px] border-[#101010] bg-[#fff7df] p-5 shadow-[10px_10px_0_#101010]">
              <p className="w-fit -rotate-1 border-[3px] border-[#101010] bg-[#80c738] px-3 py-1 text-sm font-black uppercase shadow-[4px_4px_0_#101010]">
                Next step
              </p>
              <h2 className="mt-6 text-3xl font-black uppercase leading-none">{actionLabel}</h2>
              <p className="mt-4 text-base font-medium leading-7 text-[#28261d]">{sidebarBody}</p>

              <div className="mt-6 space-y-3">
                {opportunity.applicationLink && (
                  <a
                    href={opportunity.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-opportunity-action
                    className="flex items-center justify-between gap-3 border-[3px] border-[#101010] bg-[#80c738] px-4 py-3 text-sm font-black uppercase shadow-[5px_5px_0_#101010] transition hover:-translate-y-1"
                  >
                    {actionLabel}
                    <ArrowSquareOut className="h-5 w-5" weight="bold" />
                  </a>
                )}

                {opportunity.applicationEmail && (
                  <a
                    href={`mailto:${opportunity.applicationEmail}`}
                    data-opportunity-action
                    className="flex items-center justify-between gap-3 border-[3px] border-[#101010] bg-[#fff7df] px-4 py-3 text-sm font-black uppercase shadow-[5px_5px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
                  >
                    {emailLabel}
                    <EnvelopeSimple className="h-5 w-5" weight="bold" />
                  </a>
                )}

                {!hasApplyChannel && (
                  <div
                    data-opportunity-action
                    className="border-[3px] border-[#101010] bg-[#fff7df] px-4 py-3 text-sm font-medium leading-7 text-[#28261d] shadow-[5px_5px_0_#101010]"
                  >
                    {applyFallbackCopy}
                  </div>
                )}
              </div>

              <div className="mt-7 border-t-[4px] border-[#101010] pt-5">
                <p className="text-xs font-black uppercase text-[#58523f]">Deadline</p>
                <div className="mt-3 flex items-center gap-3 border-[3px] border-[#101010] bg-[#101010] px-4 py-3 text-[#fff7df]">
                  <Clock className="h-5 w-5 text-[#80c738]" weight="bold" />
                  <span className="text-lg font-black">{formatDate(opportunity.deadline)}</span>
                </div>
              </div>
            </section>

            {opportunity.attachments.length > 0 && (
              <section data-opportunity-side className="border-[5px] border-[#101010] bg-[#fff7df] p-5 shadow-[10px_10px_0_#80c738]">
                <h2 className="flex items-center gap-2 text-2xl font-black uppercase">
                  <DownloadSimple className="h-6 w-6 text-[#5a8f1d]" weight="bold" />
                  Documents
                </h2>
                <div className="mt-5 space-y-3">
                  {opportunity.attachments.map((file) => {
                    const attachmentType = formatAttachmentType(file.fileName, file.fileType, file.fileUrl);

                    return (
                    <a
                      key={file.id}
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="group flex min-w-0 items-center justify-between gap-4 border-[3px] border-[#101010] bg-[#fff7df] p-4 shadow-[5px_5px_0_#101010] transition hover:-translate-y-1 hover:bg-[#80c738]"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-black uppercase" title={file.fileName}>
                          {file.fileName || 'Document'}
                        </span>
                        {attachmentType && (
                          <span className="mt-1 block truncate text-xs font-bold uppercase text-[#58523f]">
                            {attachmentType}
                          </span>
                        )}
                      </span>
                      <Paperclip className="h-5 w-5 shrink-0" weight="bold" />
                    </a>
                    );
                  })}
                </div>
              </section>
            )}

            <Link
              href={backHref}
              className="inline-flex w-full items-center justify-between border-[4px] border-[#101010] bg-[#101010] px-5 py-4 text-sm font-black uppercase text-[#fff7df] shadow-[7px_7px_0_#80c738] transition hover:-translate-y-1"
            >
              {backLabel}
              <ArrowRight className="h-5 w-5" weight="bold" />
            </Link>
          </aside>
        </div>
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
