"use client";

import { motion } from "framer-motion";
import { FlagshipSectionHeading } from "./FlagshipSectionHeading";

export function FlagshipOutcomes({
  title,
  items,
  accentColor,
}: {
  title: string;
  items: string[];
  accentColor: string;
}) {
  return (
    <section className="mb-16 sm:mb-20" aria-labelledby="flagship-outcomes-heading">
      <FlagshipSectionHeading id="flagship-outcomes-heading">{title}</FlagshipSectionHeading>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.03, 0.15) }}
            className="flex gap-4 border-[3px] border-[#101010] bg-[#fff7df] px-4 py-3.5 shadow-[4px_4px_0_#101010] sm:px-5 sm:py-4"
          >
            <span
              className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[#101010] text-xs font-black"
              style={{ backgroundColor: accentColor, color: "#101010" }}
              aria-hidden
            >
              {i + 1}
            </span>
            <span className="text-sm font-medium leading-6 text-[#28261d] sm:text-base sm:leading-7">{item}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
