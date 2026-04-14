"use client";

import { motion } from "framer-motion";
import type { FlagshipApproachBlock } from "@/data/flagship-programmes";

export function FlagshipApproach({
  title,
  blocks,
  accentColor,
}: {
  title: string;
  blocks: FlagshipApproachBlock[];
  accentColor: string;
}) {
  return (
    <section className="mb-20" aria-labelledby="flagship-approach-heading">
      <h2 id="flagship-approach-heading" className="text-lg font-semibold tracking-tight text-gray-900 mb-8">
        {title}
      </h2>
      <div className="space-y-10">
        {blocks.map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.2) }}
          >
            {block.kind === "paragraphs" && (
              <div className="space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-3xl">
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            )}
            {block.kind === "list" && (
              <div>
                {block.title ? (
                  <h3 className="text-sm font-medium text-gray-900 mb-3">{block.title}</h3>
                ) : null}
                <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-3xl">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {block.kind === "sectors" && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">{block.title}</h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-sm text-gray-700 border border-gray-100 rounded-md px-4 py-3 bg-gray-50/50"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {block.kind === "pathways" && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">{block.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {block.columns.map((col, j) => (
                    <div key={j} className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
                      <div className="h-0.5 w-10 rounded-full mb-4" style={{ backgroundColor: accentColor }} aria-hidden />
                      <h4 className="text-base font-semibold text-gray-900 mb-2">{col.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{col.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {block.kind === "components" && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">{block.title}</h3>
                <ol className="list-decimal pl-5 space-y-2.5 text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-3xl">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ol>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
