"use client";

import { ArrowUpRight, ChartLineUp, GraduationCap, UsersThree } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { colors, typography } from "@/lib/design-system";
import {
  FOUNDERS_COLLECTIVE_EXTERNAL_LINK,
  FOUNDERS_COLLECTIVE_REGISTRATION_URL,
} from "@/lib/founders-collective";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: ChartLineUp,
    title: "Grow your business",
    description:
      "Expert support, strategic guidance, and connections to finance and markets.",
  },
  {
    icon: UsersThree,
    title: "Expand your network",
    description:
      "Connect with founders, investors, development partners, and collaborators.",
  },
  {
    icon: ArrowUpRight,
    title: "Scale with confidence",
    description:
      "Exclusive opportunities that accelerate growth and unlock new markets.",
  },
  {
    icon: GraduationCap,
    title: "Learn continuously",
    description:
      "Industry insights, expert-led sessions, and resources to stay future-ready.",
  },
] as const;

export function FoundersCollectiveSection() {
  const { getMotionSafeClasses } = useAccessibilityClasses();

  return (
    <section
      id="founders-collective"
      aria-labelledby="founders-collective-heading"
      className="relative overflow-hidden py-12 sm:py-16"
    >
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(135deg, rgba(128, 199, 56, 0.08) 0%, rgba(0, 173, 221, 0.06) 50%, rgba(255, 255, 255, 1) 100%)",
        }}
      />
      <div
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
        aria-hidden
        style={{ background: colors.primary.green[200] }}
      />
      <div
        className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
        aria-hidden
        style={{ background: colors.primary.blue[200] }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: colors.primary.green[700], fontFamily: typography.fonts.body }}
            >
              Alumni Community
            </p>
            <h2
              id="founders-collective-heading"
              className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              style={{ fontFamily: typography.fonts.heading }}
            >
              Join the Founders Collective
            </h2>
            <p
              className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg"
              style={{ fontFamily: typography.fonts.body }}
            >
              An exclusive alumni community for climate entrepreneurs building resilient
              businesses and driving Africa&apos;s green transition. For enterprises ready
              for their next stage of growth, the network provides continued access to
              opportunities, partnerships, knowledge, and a vibrant community of innovators.
            </p>
          </motion.div>

          <div className="mb-10 grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  className="flex gap-4 rounded-2xl border border-white/80 bg-white/70 p-5 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: colors.gradients.subtle }}
                  >
                    <Icon
                      className="h-5 w-5"
                      weight="duotone"
                      style={{ color: colors.primary.green[700] }}
                      aria-hidden
                    />
                  </div>
                  <div>
                    <h3
                      className="mb-1 text-base font-semibold text-gray-900"
                      style={{ fontFamily: typography.fonts.heading }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-gray-600"
                      style={{ fontFamily: typography.fonts.body }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p
              className="mx-auto mb-6 max-w-2xl text-sm text-gray-600 sm:text-base"
              style={{ fontFamily: typography.fonts.body }}
            >
              More than an alumni network — a community empowering climate entrepreneurs to
              keep innovating, growing, and creating lasting impact long after incubation.
            </p>
            <Button
              asChild
              size="lg"
              className={`rounded-full px-8 py-6 text-base font-semibold shadow-md ${getMotionSafeClasses("hover:scale-105")}`}
              style={{
                background: colors.primary.green.DEFAULT,
                color: colors.white,
                border: "none",
                fontFamily: typography.fonts.body,
              }}
            >
              <a
                href={FOUNDERS_COLLECTIVE_REGISTRATION_URL}
                {...FOUNDERS_COLLECTIVE_EXTERNAL_LINK}
              >
                Register today
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
