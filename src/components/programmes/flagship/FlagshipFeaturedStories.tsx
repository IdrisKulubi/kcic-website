"use client";

import Link from "next/link";
import type { FlagshipStoryLink } from "@/data/flagship-programmes";
import { FlagshipSectionHeading } from "./FlagshipSectionHeading";

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
    <section className="mb-16 sm:mb-20" aria-labelledby="flagship-stories-heading">
      <FlagshipSectionHeading id="flagship-stories-heading">{title}</FlagshipSectionHeading>
      <p className="mb-6 max-w-3xl text-base font-medium leading-7 text-[#28261d]">{intro}</p>
      <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {links.map((link) => {
          const external = link.external ?? isExternal(link.href);
          const className =
            "inline-flex border-[3px] border-[#101010] bg-[#fff7df] px-4 py-2.5 text-sm font-medium text-[#101010] shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5 hover:bg-[#f5efd6]";
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
