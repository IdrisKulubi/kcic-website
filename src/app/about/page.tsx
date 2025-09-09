import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { Metadata } from "next";
import { colors, typography } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About KCIC - Leading Climate Innovation in Kenya",
  description:
    "Learn about Kenya Climate Innovation Centre's mission to accelerate green growth and support climate entrepreneurs across Africa.",
};

const navData = {
  logo: {
    src: "/images/kcic-logo.png",
    alt: "KCIC Logo",
  },
  navigation: [
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Impact", href: "/impact" },
    { label: "Contact", href: "/contact" },
  ],
  ctaButton: {
    text: "Apply Now",
    href: "/apply",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <MinimalNavbar {...navData} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="font-bold mb-8"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
              lineHeight: typography.lineHeights.tight,
            }}
          >
            Accelerating Climate Innovation
          </h1>
          <p
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            We are Kenya&apos;s leading climate innovation center, empowering
            entrepreneurs to build sustainable solutions that drive green growth
            across Africa.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-6">
                <Target
                  className="h-16 w-16 mx-auto"
                  style={{ color: colors.primary.green.DEFAULT }}
                />
              </div>
              <h3
                className="font-bold mb-4"
                style={{
                  fontSize: typography.sizes.heading.h3,
                  fontFamily: typography.fonts.heading,
                  color: colors.secondary.gray[900],
                }}
              >
                Our Mission
              </h3>
              <p
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[600],
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                To accelerate green growth by supporting climate entrepreneurs
                and innovative solutions that create lasting environmental
                impact.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <Users
                  className="h-16 w-16 mx-auto"
                  style={{ color: colors.primary.cyan.DEFAULT }}
                />
              </div>
              <h3
                className="font-bold mb-4"
                style={{
                  fontSize: typography.sizes.heading.h3,
                  fontFamily: typography.fonts.heading,
                  color: colors.secondary.gray[900],
                }}
              >
                Our Approach
              </h3>
              <p
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[600],
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                We provide comprehensive support including funding, mentorship,
                and market access to help climate innovations scale
                successfully.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <Globe
                  className="h-16 w-16 mx-auto"
                  style={{ color: colors.primary.green.DEFAULT }}
                />
              </div>
              <h3
                className="font-bold mb-4"
                style={{
                  fontSize: typography.sizes.heading.h3,
                  fontFamily: typography.fonts.heading,
                  color: colors.secondary.gray[900],
                }}
              >
                Our Impact
              </h3>
              <p
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[600],
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                Supporting 450+ SMEs, mobilizing $25M+ in investment, and
                creating 2,500+ jobs across the climate sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="font-bold mb-12"
            style={{
              fontSize: typography.sizes.heading.h2,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            Building Africa&apos;s Climate Future
          </h2>
          <div className="space-y-8 text-left">
            <p
              className="text-lg"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[700],
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              Founded as Kenya&apos;s premier climate innovation hub, KCIC has
              become the catalyst for transformative environmental solutions
              across East Africa. We believe that innovation is the key to
              addressing climate challenges while creating economic
              opportunities.
            </p>
            <p
              className="text-lg"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[700],
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              Our comprehensive ecosystem supports entrepreneurs at every stage,
              from early-stage ideation to market-ready solutions. Through
              strategic partnerships and targeted investments, we&apos;re
              building a sustainable future for Africa.
            </p>
          </div>

          <div className="mt-12">
            <Button
              className="px-8 py-4 rounded-full font-semibold"
              style={{
                background: colors.gradients.primary,
                color: "white",
                fontFamily: typography.fonts.body,
                border: "none",
              }}
              asChild
            >
              <a href="/programs" className="flex items-center space-x-2">
                <span>Explore Our Programs</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 Kenya Climate Innovation Centre. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
