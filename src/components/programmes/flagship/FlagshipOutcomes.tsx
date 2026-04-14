"use client";

import { motion } from "framer-motion";

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
    <section className="mb-20 border-t border-gray-200 pt-14" aria-labelledby="flagship-outcomes-heading">
      <h2 id="flagship-outcomes-heading" className="text-lg font-semibold tracking-tight text-gray-900 mb-6">
        {title}
      </h2>
      <ul className="space-y-0 divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden bg-white">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.03, 0.15) }}
            className="flex gap-4 px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <span
              className="mt-1.5 w-1 shrink-0 rounded-full self-start"
              style={{ backgroundColor: accentColor, minHeight: "0.65rem" }}
              aria-hidden
            />
            <span className="text-sm sm:text-[15px] text-gray-700 leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
