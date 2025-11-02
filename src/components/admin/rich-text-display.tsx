"use client";

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

export const RichTextDisplay = ({ content, className = "" }: RichTextDisplayProps) => {
  return (
    <>
      <div
        className={`rich-text-content prose prose-lg max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style jsx global>{`
        .rich-text-content {
          line-height: 1.8;
          color: hsl(var(--foreground));
        }

        .rich-text-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .rich-text-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 1.75rem;
          margin-bottom: 0.875rem;
          line-height: 1.3;
        }

        .rich-text-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .rich-text-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.625rem;
        }

        .rich-text-content h5 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        .rich-text-content h6 {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        .rich-text-content p {
          margin-bottom: 1rem;
        }

        .rich-text-content strong {
          font-weight: 700;
        }

        .rich-text-content em {
          font-style: italic;
        }

        .rich-text-content u {
          text-decoration: underline;
        }

        .rich-text-content s {
          text-decoration: line-through;
        }

        .rich-text-content a {
          color: hsl(var(--primary));
          text-decoration: underline;
          transition: opacity 0.2s;
        }

        .rich-text-content a:hover {
          opacity: 0.8;
        }

        .rich-text-content ul,
        .rich-text-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .rich-text-content ul {
          list-style-type: disc;
        }

        .rich-text-content ol {
          list-style-type: decimal;
        }

        .rich-text-content li {
          margin-bottom: 0.5rem;
        }

        .rich-text-content blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: hsl(var(--muted-foreground));
        }

        .rich-text-content pre {
          background: hsl(var(--muted));
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .rich-text-content code {
          background: hsl(var(--muted));
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.875em;
        }

        .rich-text-content pre code {
          background: transparent;
          padding: 0;
        }

        .rich-text-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }

        .rich-text-content video {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }

        .rich-text-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .rich-text-content th,
        .rich-text-content td {
          border: 1px solid hsl(var(--border));
          padding: 0.75rem;
          text-align: left;
        }

        .rich-text-content th {
          background: hsl(var(--muted));
          font-weight: 600;
        }

        .rich-text-content .ql-align-center {
          text-align: center;
        }

        .rich-text-content .ql-align-right {
          text-align: right;
        }

        .rich-text-content .ql-align-justify {
          text-align: justify;
        }

        .rich-text-content .ql-indent-1 {
          padding-left: 3rem;
        }

        .rich-text-content .ql-indent-2 {
          padding-left: 6rem;
        }

        .rich-text-content .ql-indent-3 {
          padding-left: 9rem;
        }
      `}</style>
    </>
  );
};
