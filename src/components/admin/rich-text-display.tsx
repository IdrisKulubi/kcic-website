"use client";

import { useEffect, useRef } from "react";

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

export const RichTextDisplay = ({ content, className = "" }: RichTextDisplayProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force remove any inline color styles after render
    if (contentRef.current) {
      const allElements = contentRef.current.querySelectorAll("*");
      allElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.removeProperty("color");
          element.style.color = "#111827";
        }
      });
    }
  }, [content]);

  return (
    <>
      <div
        ref={contentRef}
        className={`article-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style jsx global>{`
        .article-content,
        .article-content *,
        .article-content p,
        .article-content span,
        .article-content div {
          color: #111827 !important;
          font-size: 1.125rem;
          line-height: 1.75;
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
          color: #059669 !important;
          text-decoration: underline;
          transition: opacity 0.2s;
          font-weight: 500;
        }

        .article-content a:hover {
          opacity: 0.8;
          color: #047857 !important;
        }

        .article-content ul,
        .article-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          color: #111827 !important;
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
          color: #111827 !important;
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

        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          .article-content,
          .article-content *,
          .article-content p,
          .article-content span,
          .article-content div {
            color: #f9fafb !important;
          }

          .article-content h1,
          .article-content h2,
          .article-content h3,
          .article-content h4,
          .article-content h5,
          .article-content h6 {
            color: #ffffff !important;
          }

          .article-content p {
            color: #e5e7eb !important;
          }

          .article-content strong,
          .article-content b {
            color: #ffffff !important;
          }

          .article-content a {
            color: #34d399 !important;
          }

          .article-content a:hover {
            color: #6ee7b7 !important;
          }

          .article-content ul,
          .article-content ol,
          .article-content li {
            color: #e5e7eb !important;
          }

          .article-content blockquote {
            color: #d1d5db !important;
            background: #1f2937;
            border-left-color: #34d399;
          }

          .article-content pre {
            background: #1f2937;
            border-color: #374151;
          }

          .article-content code {
            background: #1f2937;
            color: #fca5a5 !important;
          }

          .article-content pre code {
            color: #f9fafb !important;
          }

          .article-content th,
          .article-content td {
            border-color: #374151;
            color: #e5e7eb !important;
          }

          .article-content th {
            background: #1f2937;
            color: #ffffff !important;
          }
        }
      `}</style>
    </>
  );
};
