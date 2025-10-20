import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { MinimalStatsSection } from "@/components/sections/MinimalStatsSection";
import { Metadata } from "next";
import { colors, typography } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { navData } from "@/lib/navigation";
import { ArrowRight, Leaf, Users, DollarSign, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "Impact - KCIC Climate Innovation Results",
  description:
    "See the measurable impact of KCIC's climate innovation programs: 450+ SMEs supported, $25M+ investment mobilized, 2,500+ jobs created.",
};

const mainStats = [
  {
    value: "450+",
    description:
      "SMEs supported through our incubation and acceleration programs.",
  },
  {
    value: "$25M+",
    description: "Investment mobilized for climate-focused ventures.",
  },
  {
    value: "2,500+",
    description: "Green jobs created and supported in various sectors.",
  },
  {
    value: "15+",
    description: "Innovative climate solutions deployed in the market.",
  },
];

const targetStats = [
  {
    value: "1,000+",
    description: "SMEs to be supported in our next phase of growth.",
  },
  {
    value: "$50M+",
    description: "To be mobilized to scale climate solutions.",
  },
  {
    value: "5,000+",
    description: "New green jobs to be created across the region.",
  },
  {
    value: "30+",
    description: "New climate technologies to be developed and launched.",
  },
];

const impactAreas = [
  {
    icon: Leaf,
    title: "Environmental Impact",
    stats: [
      { value: "2.5M", label: "Tons CO2 Reduced" },
      { value: "500K", label: "People Reached" },
      { value: "85%", label: "Renewable Energy" },
    ],
    color: colors.primary.green.DEFAULT,
  },
  {
    icon: Users,
    title: "Social Impact",
    stats: [
      { value: "2,500+", label: "Jobs Created" },
      { value: "60%", label: "Women Entrepreneurs" },
      { value: "25", label: "Counties Reached" },
    ],
    color: colors.primary.cyan.DEFAULT,
  },
  {
    icon: DollarSign,
    title: "Economic Impact",
    stats: [
      { value: "$25M+", label: "Investment Raised" },
      { value: "$50M+", label: "Revenue Generated" },
      { value: "3.2x", label: "ROI Average" },
    ],
    color: colors.primary.green.DEFAULT,
  },
  {
    icon: Building,
    title: "Innovation Impact",
    stats: [
      { value: "450+", label: "SMEs Supported" },
      { value: "15+", label: "Sectors Covered" },
      { value: "95%", label: "Success Rate" },
    ],
    color: colors.primary.cyan.DEFAULT,
  },
];

const successStories = [
  {
    company: "SolarTech Kenya",
    sector: "Renewable Energy",
    impact: "Providing clean energy to 50,000+ rural households",
    funding: "$2.5M raised",
    jobs: "150 jobs created",
  },
  {
    company: "AgroClimate Solutions",
    sector: "Climate-Smart Agriculture",
    impact: "Supporting 10,000+ smallholder farmers",
    funding: "$1.8M raised",
    jobs: "200 jobs created",
  },
  {
    company: "WaterTech Innovations",
    sector: "Water Technology",
    impact: "Clean water access for 25,000+ people",
    funding: "$3.2M raised",
    jobs: "120 jobs created",
  },
];

export default function ImpactPage() {
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
            Measurable Climate Impact
          </h1>
          <p
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Real results from our climate innovation programs across Kenya and
            Africa. See how we&apos;re driving sustainable change through
            entrepreneurship.
          </p>
        </div>
      </section>

      {/* Main Stats */}
      <MinimalStatsSection stats={mainStats} targets={targetStats} />

      {/* Impact Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="text-center font-bold mb-16"
            style={{
              fontSize: typography.sizes.heading.h2,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            Impact Across All Dimensions
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {impactAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center mb-6">
                    <IconComponent
                      className="h-8 w-8 mr-3"
                      style={{ color: area.color }}
                    />
                    <h3
                      className="font-bold"
                      style={{
                        fontSize: typography.sizes.heading.h3,
                        fontFamily: typography.fonts.heading,
                        color: colors.secondary.gray[900],
                      }}
                    >
                      {area.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {area.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div
                          className="font-bold text-2xl mb-1"
                          style={{
                            fontFamily: typography.fonts.heading,
                            color: area.color,
                          }}
                        >
                          {stat.value}
                        </div>
                        <div
                          className="text-sm"
                          style={{
                            fontFamily: typography.fonts.body,
                            color: colors.secondary.gray[600],
                          }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-center font-bold mb-16"
            style={{
              fontSize: typography.sizes.heading.h2,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            Success Stories
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontSize: typography.sizes.heading.h4,
                    fontFamily: typography.fonts.heading,
                    color: colors.secondary.gray[900],
                  }}
                >
                  {story.company}
                </h3>

                <div
                  className="text-sm font-semibold mb-4"
                  style={{ color: colors.primary.green.DEFAULT }}
                >
                  {story.sector}
                </div>

                <p
                  className="mb-4"
                  style={{
                    fontFamily: typography.fonts.body,
                    color: colors.secondary.gray[700],
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  {story.impact}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Funding:</span>
                    <span className="text-sm font-semibold">
                      {story.funding}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Jobs:</span>
                    <span className="text-sm font-semibold">{story.jobs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="font-bold mb-8"
            style={{
              fontSize: typography.sizes.heading.h2,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            Be Part of Our Impact Story
          </h2>
          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Join hundreds of climate entrepreneurs who are creating measurable
            environmental and social impact across Africa.
          </p>

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
              <span>Join Our Programs</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
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
