"use client";

import { useMemo, useRef } from "react";

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

function sanitizeHtml(html: string): string {
  try {
    if (typeof window === "undefined" || !("DOMParser" in window)) return html;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove inline styles and color/opacity-related classes
    doc.body.querySelectorAll("*").forEach((el) => {
      // Drop inline styles entirely to avoid color/background overrides
      if ((el as HTMLElement).hasAttribute("style")) {
        (el as HTMLElement).removeAttribute("style");
      }

      // Remove classes that typically affect visibility/colors from CMS exports
      if ((el as HTMLElement).classList && (el as HTMLElement).classList.length) {
        const toRemove: string[] = [];
        (el as HTMLElement).classList.forEach((cls) => {
          if (/^(text|bg|fill|stroke|opacity)-/i.test(cls)) toRemove.push(cls);
          if (/has-.*-color/i.test(cls)) toRemove.push(cls);
          if (/has-text-color|has-background/i.test(cls)) toRemove.push(cls);
        });
        toRemove.forEach((c) => (el as HTMLElement).classList.remove(c));
      }
    });

    // Normalize anchors for safety and readability
    doc.body.querySelectorAll("a").forEach((a) => {
      (a as HTMLAnchorElement).setAttribute("target", "_blank");
      (a as HTMLAnchorElement).setAttribute("rel", "noopener noreferrer");
    });

    return doc.body.innerHTML;
  } catch {
    return html;
  }
}

export const RichTextDisplay = ({ content, className = "" }: RichTextDisplayProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const sanitized = useMemo(() => sanitizeHtml(content), [content]);

  return (
    <>
      <div
        ref={contentRef}
        className={`article-content ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
      <style jsx global>{`
        .article-content {
          background: white !important;
        }

        /* Make text readable regardless of imported CMS styles */
        .article-content,
        .article-content :where(*, *::before, *::after) {
          color: #111827 !important; /* gray-900 for better contrast */
          font-size: 1.125rem;
          line-height: 1.75;
          background: transparent !important;
          opacity: 1 !important;
        }

        .article-content h1 {
          font-size: 2.25rem !important;
          font-weight: 700 !important;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.2;
          color: #000000 !important;
        }

        .article-content h2 {
          font-size: 1.875rem !important;
          font-weight: 700 !important;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
          line-height: 1.3;
          color: #000000 !important;
        }

        .article-content h3 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
          color: #000000 !important;
        }

        .article-content h4 {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          margin-top: 1.25rem;
          margin-bottom: 0.625rem;
          color: #000000 !important;
        }

        .article-content h5 {
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #000000 !important;
        }

        .article-content h6 {
          font-size: 1rem !important;
          font-weight: 600 !important;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #000000 !important;
        }

        .article-content p {
          margin-bottom: 1rem !important;
          color: #111827 !important;
          font-size: 1.125rem !important;
          line-height: 1.75 !important;
          background: transparent !important;
          opacity: 1 !important;
        }

        .article-content strong,
        .article-content b {
          font-weight: 700 !important;
          color: #000000 !important;
        }

        .article-content em,
        .article-content i {
          font-style: italic;
        }

        .article-content u {
          text-decoration: underline;
        }

        .article-content s {
          text-decoration: line-through;
        }

        .article-content a {
          color: #0891b2 !important;
          text-decoration: underline;
          transition: opacity 0.2s;
          font-weight: 600;
          background: transparent !important;
          opacity: 1 !important;
        }

        .article-content a:hover {
          opacity: 1;
          color: #0e7490 !important;
        }

        .article-content ul,
        .article-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          color: #000000 !important;
          opacity: 1 !important;
        }

        .article-content ul {
          list-style-type: disc;
        }

        .article-content ol {
          list-style-type: decimal;
        }

        .article-content li {
          margin-bottom: 0.5rem !important;
          line-height: 1.75;
          color: #000000 !important;
          opacity: 1 !important;
        }

        .article-content blockquote {
          border-left: 4px solid #059669;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #1f2937 !important;
          background: #f0fdf4;
          padding: 1rem;
          border-radius: 0.5rem;
        }

        .article-content pre {
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
          border: 1px solid #e5e7eb;
        }

        .article-content code {
          background: #f3f4f6;
          color: #dc2626 !important;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.875em;
        }

        .article-content pre code {
          background: transparent;
          padding: 0;
          color: #111827 !important;
        }

        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }

        .article-content video {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }

        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .article-content th,
        .article-content td {
          border: 1px solid #d1d5db;
          padding: 0.75rem;
          text-align: left;
          color: #111827 !important;
        }

        .article-content th {
          background: #f3f4f6;
          font-weight: 600;
          color: #000000 !important;
        }

        /* Keep article text readable in dark mode as well (black text on white background) */
        @media (prefers-color-scheme: dark) {
          .article-content,
          .article-content :where(*, *::before, *::after) {
            color: #111827 !important;
            background: transparent !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </>
  );
};
