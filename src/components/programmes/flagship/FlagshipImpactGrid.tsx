"use client";

import { motion } from "framer-motion";
import {
  Buildings,
  Briefcase,
  ChartLineUp,
  CurrencyDollar,
  Factory,
  Leaf,
  Recycle,
  UsersThree,
} from "@phosphor-icons/react";
import type { FlagshipImpactIconKey, FlagshipImpactMetric } from "@/data/flagship-programmes";

function ImpactIcon({ icon, className }: { icon?: FlagshipImpactIconKey; className?: string }) {
  const cls = className ? `text-gray-400 ${className}` : "text-gray-400";
  const common = { className: cls, size: 22 as const, weight: "duotone" as const, "aria-hidden": true as const };
  switch (icon) {
    case "hubs":
      return <Buildings {...common} />;
    case "users":
      return <UsersThree {...common} />;
    case "jobs":
      return <Briefcase {...common} />;
    case "finance":
      return <CurrencyDollar {...common} />;
    case "climate":
      return <Leaf {...common} />;
    case "enterprises":
      return <Factory {...common} />;
    case "waste":
      return <Recycle {...common} />;
    default:
      return <ChartLineUp {...common} />;
  }
}

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
            <div className="flex items-start gap-3 mb-4">
              <div className="mt-0.5 text-gray-400 shrink-0">
                <ImpactIcon icon={m.icon} className="block" />
              </div>
              <div className="h-0.5 w-8 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: accentColor }} aria-hidden />
            </div>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight tabular-nums">{m.value}</p>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{m.label}</p>
          </motion.div>
        ))}
      </div>
      {impactNotes ? (
        <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-3xl">{impactNotes}</p>
      ) : null}
    </section>
  );
}
