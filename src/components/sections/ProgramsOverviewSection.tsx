"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { colors, typography } from "@/lib/design-system";

type ProgramCard = {
  id: string;
  title: string;
  image: string;
  funders?: string[];
  overview: string[]; // 1-3 lines
  outcomes: string[]; // bullets
  indicators?: string[]; // bullets
  extraList?: string[]; // for "Other Programmes"
  accent?: string; // tailwind color token or hex
};

const PROGRAMS: ProgramCard[] = [
  {
    id: "greenbiz",
    title: "GreenBiz Programme",
    image: "/images/programmes/greenbiz.jpg",
    funders: ["DANIDA"],
    overview: [
      "Targets commercialization, innovation and scale-up of climate solutions.",
    ],
    outcomes: [
      "Enhanced commercialization and scale-up.",
      "Increased access to finance.",
      "Improved enabling environment.",
    ],
    indicators: [
      "USD 20M mobilized for green businesses.",
      "150 enterprises supported.",
      "3,000 jobs created.",
    ],
    accent: colors.primary.green.DEFAULT,
  },
  {
    id: "agribiz",
    title: "AgriBiz Programme",
    image: "/images/programmes/biz.jpg",
    funders: ["EU", "DANIDA"],
    overview: [
      "Creates sustainable job opportunities in agriculture value chains for youth and women in Kenya.",
    ],
    outcomes: [
      "Sustainable agribusiness opportunities for youth & women.",
      "Increased access to finance for women & youth.",
      "Enabling environment for agribusiness.",
    ],
    indicators: [
      "8 incubation hubs established.",
      "2,100+ enterprises supported.",
      "19,000+ jobs created.",
    ],
    accent: "#00aeef",
  },
  {
    id: "puse",
    title: "PUSE Programme",
    image: "/images/programmes/puse.jpg",
    funders: ["Mott Foundation"],
    overview: [
      "Supports SMEs leveraging solar energy in key agricultural value chains across East Africa.",
    ],
    outcomes: [
      "Scaling productive use of solar energy.",
      "Increased access to finance.",
      "Improved enabling environment.",
    ],
    indicators: [
      "30 SMEs supported in Kenya, Uganda & Tanzania.",
      "261 jobs created.",
      "18,000+ new customers served.",
    ],
    accent: colors.primary.green[600],
  },
  {
    id: "other",
    title: "Other Programmes",
    image: "/images/programmes/others.jpg",
    overview: ["Key ecosystem initiatives coordinated by KCIC."],
    outcomes: [],
    extraList: [
      "Climate Launchpad Competition – turning green ideas into startups.",
      "Cleantech Competition – incentivizing student involvement in climate action.",
      "What Design Can Do – leveraging design for an inclusive, sustainable transition.",
      "DREEM Hub Kenya – capacity building for 1000+ agrisolar entrepreneurs.",
    ],
    accent: "#00aeef",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i },
  }),
};

function Card({ data, index }: { data: ProgramCard; index: number }) {
  const accent = data.accent || colors.primary.green.DEFAULT;
  return (
    <motion.article
      className="relative rounded-2xl bg-white/75 dark:bg-white/5 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col"
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
        />
        {/* Gradient overlay for style */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent"
          aria-hidden
        />
        {/* Top accent glow */}
        <div
          className="absolute inset-x-0 top-0 h-32 opacity-50"
          style={{
            background: `radial-gradient(ellipse at top, ${accent}25, transparent 70%)`,
          }}
          aria-hidden
        />
      </div>

      {/* content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3
          className="text-base sm:text-lg font-bold mb-2"
          style={{ fontFamily: typography.fonts.heading }}
        >
          {data.title}
        </h3>

        {data.funders && data.funders.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {data.funders.map((f) => (
              <span
                key={f}
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* overview */}
        <ul className="mb-3 space-y-1.5">
          {data.overview.map((line, i) => (
            <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
              {line}
            </li>
          ))}
        </ul>

        {/* outcomes / indicators */}
        {data.outcomes.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
              Expected outcomes
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc pl-4 space-y-1.5">
              {data.outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {data.indicators && data.indicators.length > 0 && (
          <div className="mb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
              Progress indicators
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc pl-4 space-y-1.5">
              {data.indicators.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {data.extraList && (
          <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc pl-4 space-y-1.5 mb-2">
            {data.extraList.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        )}

        {/* subtle bottom accent */}
        <div
          className="mt-auto h-px w-full rounded bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(90deg, ${accent}, transparent)`,
            opacity: 0.6,
          }}
        />
      </div>
    </motion.article>
  );
}

export default function ProgramsOverviewSection() {
  return (
    <section className="relative py-20 sm:py-28">
      {/* ambient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(36rem 20rem at 12% 20%, rgba(127,209,52,0.12) 0%, rgba(127,209,52,0) 60%)," +
            "radial-gradient(36rem 20rem at 88% 80%, rgba(0,174,239,0.10) 0%, rgba(0,174,239,0) 60%)",
          filter: "blur(28px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="uppercase tracking-widest text-xs sm:text-sm text-gray-500 mb-2">
            KCIC Programmes
          </p>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontFamily: typography.fonts.heading,
              lineHeight: 1.2,
            }}
          >
            Our Programmes
          </h2>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
            A snapshot of our flagship initiatives supporting climate innovation
            and sustainable enterprise growth across Kenya and East Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
          {PROGRAMS.map((p, idx) => (
            <Card key={p.id} data={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}