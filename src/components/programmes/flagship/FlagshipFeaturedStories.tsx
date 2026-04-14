"use client";

import Link from "next/link";
import type { FlagshipStoryLink } from "@/data/flagship-programmes";

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function FlagshipFeaturedStories({
  title,
  intro,
  links,
}: {
  title: string;
  intro: string;
  links: FlagshipStoryLink[];
}) {
  return (
    <section className="mb-20 border-t border-gray-200 pt-14" aria-labelledby="flagship-stories-heading">
      <h2 id="flagship-stories-heading" className="text-lg font-semibold tracking-tight text-gray-900 mb-3">
        {title}
      </h2>
      <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-6 max-w-3xl">{intro}</p>
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
        {links.map((link) => {
          const external = link.external ?? isExternal(link.href);
          const className =
            "text-sm font-medium text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 decoration-1 transition-colors";
          if (external) {
            return (
              <li key={link.href + link.title}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {link.title}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            );
          }
          return (
            <li key={link.href + link.title}>
              <Link href={link.href} className={className}>
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
