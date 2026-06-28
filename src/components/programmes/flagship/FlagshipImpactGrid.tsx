"use client";

import { motion } from "framer-motion";
import type { FlagshipImpactMetric } from "@/data/flagship-programmes";
import { FlagshipSectionHeading } from "./FlagshipSectionHeading";

export function FlagshipImpactGrid({
  title,
  metrics,
  accentColor,
  impactNotes,
}: {
  title: string;
  metrics: FlagshipImpactMetric[];
  accentColor: string;
  impactNotes?: string;
}) {
  return (
    <section className="mb-16 sm:mb-20" aria-labelledby="flagship-impact-heading">
      <FlagshipSectionHeading id="flagship-impact-heading">{title}</FlagshipSectionHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.2) }}
            className="border-[3px] border-[#101010] bg-[#fff7df] p-5 shadow-[6px_6px_0_#101010] sm:p-6"
          >
            <div className="mb-3 h-1.5 w-10" style={{ backgroundColor: accentColor }} aria-hidden />
            <p className="text-2xl font-black tabular-nums tracking-tight text-[#101010] sm:text-3xl">{m.value}</p>
            <p className="mt-2 text-sm font-medium leading-6 text-[#28261d]">{m.label}</p>
          </motion.div>
        ))}
      </div>
      {impactNotes ? (
        <p className="mt-5 text-sm font-medium leading-6 text-[#58523f]">{impactNotes}</p>
      ) : null}
    </section>
  );
}
