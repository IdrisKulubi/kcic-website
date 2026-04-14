"use client";

import { motion } from "framer-motion";
import type { FlagshipImpactMetric } from "@/data/flagship-programmes";

export function FlagshipImpactGrid({
  title,
  metrics,
  accentColor,
}: {
  title: string;
  metrics: FlagshipImpactMetric[];
  accentColor: string;
}) {
  return (
    <section className="mb-20 border-t border-gray-200 pt-14" aria-labelledby="flagship-impact-heading">
      <h2 id="flagship-impact-heading" className="text-lg font-semibold tracking-tight text-gray-900 mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.2) }}
            className="bg-white p-6 sm:p-7"
          >
            <div className="h-0.5 w-8 rounded-full mb-5" style={{ backgroundColor: accentColor }} aria-hidden />
            <p className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight tabular-nums">{m.value}</p>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
