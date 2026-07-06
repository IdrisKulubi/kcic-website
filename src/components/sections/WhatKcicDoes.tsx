"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bank,
  ChartLineUp,
  Handshake,
  Leaf,
  UsersThree,
} from "@phosphor-icons/react";

const pillars = [
  {
    title: "Incubation and acceleration",
    description:
      "Structured business support for climate-smart enterprises moving from early promise to growth readiness.",
    icon: Leaf,
  },
  {
    title: "Access to finance",
    description:
      "Investment readiness, financing pathways, and links to capital for enterprises with scalable solutions.",
    icon: Bank,
  },
  {
    title: "Market access",
    description:
      "Partnerships, customer connections, and value-chain opportunities that help enterprises reach demand.",
    icon: ChartLineUp,
  },
  {
    title: "Ecosystem building",
    description:
      "Policy engagement, collaboration, and institutional partnerships that strengthen climate entrepreneurship.",
    icon: Handshake,
  },
];

const proofPoints = [
  "Climate-smart enterprise support",
  "Financing and investment readiness",
  "Markets, partners, and policy links",
];

export default function WhatKcicDoes() {
  return (
    <section
      id="what-kcic-does"
      aria-labelledby="what-kcic-does-heading"
      className="relative isolate overflow-hidden bg-[#f7fbf8] text-[#102016]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#cddbc8]"
        aria-hidden
      />
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1.35fr] lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold text-[#4d7822]">
            What KCIC does
          </p>
          <h2
            id="what-kcic-does-heading"
            className="max-w-[680px] text-[2.15rem] font-bold leading-[1.08] text-[#102016] sm:text-[3rem] lg:text-[3.45rem]"
            style={{
              fontFamily:
                "Montserrat, 'Century Gothic', Aptos, Arial, Helvetica, sans-serif",
              letterSpacing: "0",
            }}
          >
            We help climate enterprises become investable and scalable.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#4a5746] sm:text-lg sm:leading-8">
            KCIC works with entrepreneurs, funders, public institutions, and ecosystem partners to move practical climate solutions from idea to market.
          </p>

          <div className="mt-8 border border-[#dce5d7] bg-[#fbf7e8] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center bg-[#80c738] text-[#102016]">
                <UsersThree className="h-5 w-5" weight="bold" aria-hidden />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.04em] text-[#335016]">
                Built for enterprise growth
              </p>
            </div>
            <ul className="space-y-3">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-medium leading-6 text-[#34432f]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#80c738]" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/programmes"
            className="mt-7 inline-flex items-center gap-2 bg-[#102016] px-5 py-3 text-sm font-semibold text-[#fbf7e8] transition hover:bg-[#203929] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738]"
          >
            Explore programmes
            <ArrowRight className="h-4 w-4" weight="bold" aria-hidden />
          </Link>
        </div>

        <div className="grid content-start gap-px border border-[#dce5d7] bg-[#dce5d7] sm:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="group min-h-[250px] bg-[#fcfff8] p-6 transition hover:bg-[#f1f8ea] sm:p-7 lg:p-8"
              >
                <div className="mb-8 flex items-start justify-between gap-5">
                  <div className="grid h-12 w-12 place-items-center bg-[#e8f4dc] text-[#335016] transition group-hover:bg-[#80c738] group-hover:text-[#102016]">
                    <Icon className="h-6 w-6" weight="bold" aria-hidden />
                  </div>
                  <span className="text-sm font-semibold text-[#8b8d90]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="max-w-[14ch] text-xl font-bold leading-snug text-[#102016]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#4a5746]">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
