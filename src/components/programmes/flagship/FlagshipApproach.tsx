"use client";

import { motion } from "framer-motion";
import type { FlagshipApproachBlock } from "@/data/flagship-programmes";
import { FlagshipSectionHeading } from "./FlagshipSectionHeading";

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
    <section className="mb-16 sm:mb-20" aria-labelledby="flagship-approach-heading">
      <FlagshipSectionHeading id="flagship-approach-heading">{title}</FlagshipSectionHeading>
      <div className="space-y-8">
        {blocks.map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.2) }}
            className="border-[3px] border-[#101010] bg-[#fff7df] p-5 shadow-[6px_6px_0_#101010] sm:p-6"
          >
            {block.kind === "paragraphs" && (
              <div className="space-y-4 text-base font-medium leading-7 text-[#28261d]">
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            )}
            {block.kind === "list" && (
              <div>
                {block.title ? (
                  <h3 className="mb-3 text-sm font-black uppercase text-[#101010]">{block.title}</h3>
                ) : null}
                <ul className="list-disc space-y-2 pl-5 text-base font-medium leading-7 text-[#28261d]">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {block.kind === "sectors" && (
              <div>
                <h3 className="mb-4 text-sm font-black uppercase text-[#101010]">{block.title}</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="border-2 border-[#101010] bg-[#f5efd6] px-3 py-2.5 text-sm font-medium text-[#101010]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {block.kind === "pathways" && (
              <div>
                <h3 className="mb-4 text-sm font-black uppercase text-[#101010]">{block.title}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {block.columns.map((col, j) => (
                    <div key={j} className="border-2 border-[#101010] bg-[#f5efd6] p-4 sm:p-5">
                      <div className="mb-3 h-1 w-10" style={{ backgroundColor: accentColor }} aria-hidden />
                      <h4 className="text-sm font-black uppercase text-[#101010]">{col.title}</h4>
                      <p className="mt-2 text-sm font-medium leading-6 text-[#28261d]">{col.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {block.kind === "components" && (
              <div>
                <h3 className="mb-3 text-sm font-black uppercase text-[#101010]">{block.title}</h3>
                <ol className="list-decimal space-y-2 pl-5 text-base font-medium leading-7 text-[#28261d]">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ol>
              </div>
            )}
            {block.kind === "detailCards" && (
              <div>
                <h3 className="mb-2 text-sm font-black uppercase text-[#101010]">{block.title}</h3>
                {block.lead ? (
                  <p className="mb-6 text-base font-medium leading-7 text-[#28261d]">{block.lead}</p>
                ) : null}
                <ul className="grid gap-4 sm:grid-cols-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="border-2 border-[#101010] bg-[#f5efd6] p-4">
                      <div className="mb-2 h-1 w-8" style={{ backgroundColor: accentColor }} aria-hidden />
                      <h4 className="text-sm font-black uppercase leading-snug text-[#101010]">{item.title}</h4>
                      <p className="mt-2 text-sm font-medium leading-6 text-[#28261d]">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
