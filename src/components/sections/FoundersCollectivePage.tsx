"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Copy, Check, ArrowUpRight } from "@phosphor-icons/react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import Footer from "@/components/layout/Footer";
import { navData } from "@/lib/navigation";
import { homePageData } from "@/data/home";
import { colors, typography } from "@/lib/design-system";
import {
  FOUNDERS_COLLECTIVE_FORM_URL,
  foundersCollectiveMeta,
  membershipFee,
  memberPillars,
  whoCanJoin,
  eligibilityNote,
  memberActivities,
  joinSteps,
  paymentAccounts,
  mobileMoney,
  foundersFaqs,
} from "@/data/founders-collective";

const heroGreen = "#1e2921";

function CopyValue({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group inline-flex items-center gap-2 rounded-md px-1 py-0.5 text-left transition-colors hover:bg-[#80c738]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738]"
      aria-label={`Copy ${label}`}
    >
      <span className="font-mono text-sm font-semibold text-[#1b3a1a]">
        {value}
      </span>
      {copied ? (
        <Check className="h-4 w-4 text-[#80c738]" aria-hidden />
      ) : (
        <Copy
          className="h-4 w-4 text-gray-400 group-hover:text-[#80c738]"
          aria-hidden
        />
      )}
    </button>
  );
}

function ApplyButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={FOUNDERS_COLLECTIVE_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-[#80c738] px-6 py-3 text-sm font-semibold text-[#1e2921] shadow-sm transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e2921] ${className}`}
      style={{ fontFamily: typography.fonts.body }}
    >
      Apply to join
      <ArrowUpRight className="h-4 w-4" weight="bold" aria-hidden />
    </a>
  );
}

export default function FoundersCollectivePage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white">
      <div style={{ background: heroGreen }}>
        <MinimalNavbar {...navData} />

        <header className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-12 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <p
              className="text-xs font-medium uppercase tracking-[0.2em] text-white/70"
              style={{ fontFamily: typography.fonts.body }}
            >
              KCIC Founders Collective
            </p>
            <h1
              className="mt-4 max-w-3xl font-bold text-white"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                fontFamily: typography.fonts.heading,
                lineHeight: typography.lineHeights.tight,
                letterSpacing: "-0.02em",
              }}
            >
              Founders Collective
            </h1>
            <p
              className="mt-4 max-w-xl text-lg text-white/85 sm:text-xl"
              style={{
                fontFamily: typography.fonts.body,
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              {foundersCollectiveMeta.tagline}
            </p>
            <div className="mt-8">
              <ApplyButton />
            </div>
          </div>
        </header>
      </div>

      <main>
        {/* What / Why */}
        <section className="border-b border-gray-100 bg-[#fafafa] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
            <div>
              <h2
                className="font-bold text-[#1e2921]"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  fontFamily: typography.fonts.heading,
                }}
              >
                What is the Founders Collective?
              </h2>
              <p
                className="mt-5 text-[15px] leading-relaxed text-gray-700"
                style={{ fontFamily: typography.fonts.body }}
              >
                The KCIC Founders Collective is a professionally curated,
                founder-first community connecting climate entrepreneurs to the
                relationships, capabilities, markets, capital, intelligence, and
                influence they need to build resilient and impactful enterprises.
              </p>
              <p
                className="mt-4 text-[15px] leading-relaxed text-gray-600"
                style={{ fontFamily: typography.fonts.body }}
              >
                Anchored by KCIC, the Collective brings together KCIC alumni and
                founders from the wider climate ecosystem, providing a platform to
                connect, collaborate, and access opportunities as their businesses
                grow and evolve.
              </p>
            </div>
            <div>
              <h2
                className="font-bold text-[#1e2921]"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  fontFamily: typography.fonts.heading,
                }}
              >
                Why the Founders Collective?
              </h2>
              <p
                className="mt-5 text-[15px] leading-relaxed text-gray-700"
                style={{ fontFamily: typography.fonts.body }}
              >
                Building a climate enterprise does not stop when programme support
                ends. As businesses grow, founders encounter new opportunities,
                markets, financing needs, partnerships, and strategic questions.
              </p>
              <p
                className="mt-4 text-[15px] leading-relaxed text-gray-700"
                style={{ fontFamily: typography.fonts.body }}
              >
                The Founders Collective provides a continuing connection to the KCIC
                ecosystem, helping founders navigate these evolving needs and
                opportunities throughout their growth journey.
              </p>
            </div>
          </div>
        </section>

        {/* What members get — numbered list */}
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <h2
              className="font-bold text-[#1e2921]"
              style={{
                fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
                fontFamily: typography.fonts.heading,
              }}
            >
              What members get
            </h2>
            <ul className="mt-10 divide-y divide-gray-200 border-t border-gray-200">
              {memberPillars.map((pillar, index) => {
                const num = String(index + 1).padStart(2, "0");
                return (
                  <li
                    key={pillar.id}
                    className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-10"
                  >
                    <span
                      className="text-4xl font-light tabular-nums sm:text-5xl"
                      style={{
                        color: `${colors.primary.green.DEFAULT}55`,
                        fontFamily: typography.fonts.heading,
                      }}
                      aria-hidden
                    >
                      {num}
                    </span>
                    <div>
                      <h3
                        className="font-bold text-[#1e2921]"
                        style={{
                          fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                          fontFamily: typography.fonts.heading,
                        }}
                      >
                        {pillar.title}
                      </h3>
                      <p
                        className="mt-2 max-w-2xl text-[15px] leading-relaxed text-gray-600"
                        style={{ fontFamily: typography.fonts.body }}
                      >
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Who + expect */}
        <section className="border-t border-gray-100 bg-[#fafafa] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-12">
            <div>
              <h2
                className="font-bold text-[#1e2921]"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  fontFamily: typography.fonts.heading,
                }}
              >
                Who can join?
              </h2>
              <ul className="mt-6 space-y-3">
                {whoCanJoin.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-gray-700"
                    style={{ fontFamily: typography.fonts.body }}
                  >
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#80c738]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p
                className="mt-6 text-sm leading-relaxed text-gray-600"
                style={{ fontFamily: typography.fonts.body }}
              >
                {eligibilityNote}
              </p>
            </div>
            <div>
              <h2
                className="font-bold text-[#1e2921]"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  fontFamily: typography.fonts.heading,
                }}
              >
                What can members expect?
              </h2>
              <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200">
                {memberActivities.map((activity) => (
                  <li
                    key={activity}
                    className="py-3 text-gray-700"
                    style={{ fontFamily: typography.fonts.body }}
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Membership fee */}
        <section
          className="py-14 text-white sm:py-16"
          style={{ background: heroGreen }}
        >
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-12">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#b5e778]">
              Membership
            </p>
            <p
              className="mt-4 font-bold"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontFamily: typography.fonts.heading,
              }}
            >
              {membershipFee.amount}
            </p>
            <p className="mt-1 text-white/80">{membershipFee.period}</p>
            <p
              className="mx-auto mt-6 max-w-xl text-white/75"
              style={{
                fontFamily: typography.fonts.body,
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              {membershipFee.summary}
            </p>
          </div>
        </section>

        {/* How to join */}
        <section
          id="how-to-join"
          className="scroll-mt-24 py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <h2
              className="font-bold text-[#1e2921]"
              style={{
                fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
                fontFamily: typography.fonts.heading,
              }}
            >
              How to join
            </h2>
            <ol className="mt-10 divide-y divide-gray-200 border-t border-gray-200">
              {joinSteps.map((item) => (
                <li
                  key={item.step}
                  className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-8"
                >
                  <span
                    className="text-3xl font-light tabular-nums text-[#80c738]/50"
                    style={{ fontFamily: typography.fonts.heading }}
                  >
                    {String(item.step).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="font-bold text-[#1e2921]"
                      style={{ fontFamily: typography.fonts.heading }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-2 text-[15px] leading-relaxed text-gray-600"
                      style={{ fontFamily: typography.fonts.body }}
                    >
                      {item.description}
                    </p>
                    {"cta" in item && item.cta && (
                      <Link
                        href={item.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#66a02d] hover:underline"
                      >
                        {item.cta.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 border border-gray-200 bg-[#fafafa] p-6 sm:p-8">
              <h3
                className="font-bold text-[#1e2921]"
                style={{ fontFamily: typography.fonts.heading }}
              >
                Payment details
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Pay the annual membership fee to your preferred KCIC account.
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {paymentAccounts.map((account) => (
                  <div
                    key={account.label}
                    className="border border-gray-200 bg-white p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#66a02d]">
                      {account.label}
                    </p>
                    <dl className="mt-4 space-y-2">
                      {account.fields.map((field) => (
                        <div
                          key={field.label}
                          className="flex flex-col sm:flex-row sm:gap-4"
                        >
                          <dt className="w-32 shrink-0 text-xs font-medium uppercase text-gray-500">
                            {field.label}
                          </dt>
                          <dd className="text-sm text-gray-800">
                            {"copyable" in field && field.copyable ? (
                              <CopyValue
                                value={field.value}
                                label={field.label}
                              />
                            ) : (
                              field.value
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <div className="mt-6 border border-gray-200 bg-white p-5">
                <p className="text-sm font-semibold text-[#1e2921]">
                  Mobile money (if applicable)
                </p>
                <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-medium uppercase text-gray-500">
                      Paybill
                    </dt>
                    <dd className="mt-1">
                      <CopyValue value={mobileMoney.paybill} label="Paybill" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase text-gray-500">
                      Account
                    </dt>
                    <dd className="mt-1">
                      <CopyValue
                        value={mobileMoney.accountNumber}
                        label="Account number"
                      />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase text-gray-500">
                      Reference
                    </dt>
                    <dd className="mt-1 text-sm text-gray-800">
                      {mobileMoney.reference}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-100 bg-[#fafafa] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-12">
            <h2
              className="font-bold text-[#1e2921]"
              style={{
                fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
                fontFamily: typography.fonts.heading,
              }}
            >
              Frequently asked questions
            </h2>
            <div className="mt-10 space-y-0 divide-y divide-gray-200 border-t border-gray-200">
              {foundersFaqs.map((faq, index) => {
                const id = `fc-faq-${index}`;
                const isOpen = openFaq === id;
                return (
                  <div key={id} className="bg-white">
                    <button
                      type="button"
                      onClick={() => toggleFaq(id)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#80c738]"
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
                        <Plus
                          className={`h-5 w-5 shrink-0 ${isOpen ? "text-[#80c738]" : "text-gray-400"}`}
                          weight="bold"
                          aria-hidden
                        />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="pb-5 text-sm leading-relaxed text-gray-600">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-12">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#66a02d]">
              Applications are ongoing
            </p>
            <h2
              className="mt-4 font-bold text-[#1e2921]"
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                fontFamily: typography.fonts.heading,
                lineHeight: typography.lineHeights.tight,
              }}
            >
              Join a growing community of founders committed to stronger
              enterprises and climate impact.
            </h2>
            <div className="mt-8 flex justify-center">
              <ApplyButton />
            </div>
          </div>
        </section>
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
