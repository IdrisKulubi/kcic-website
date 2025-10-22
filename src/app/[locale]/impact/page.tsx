import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { MinimalStatsSection } from "@/components/sections/MinimalStatsSection";
import { Metadata } from "next";
import { colors, typography } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { navData } from "@/lib/navigation";
import { ArrowRight, Leaf, Users, DollarSign, Building } from "lucide-react";
import { getTranslations, LocaleCode } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { locale: LocaleCode } }): Promise<Metadata> {
  const translations = await getTranslations(params.locale, 'pages');
  
  return {
    title: (translations.impact as any)?.meta?.title || 'Impact - KCIC',
    description: (translations.impact as any)?.meta?.description || 'KCIC Impact',
  };
}

export default async function ImpactPage({ params }: { params: { locale: LocaleCode } }) {
  const commonTranslations = await getTranslations(params.locale, 'common');
  const pagesTranslations = await getTranslations(params.locale, 'pages');
  const translations = { ...commonTranslations, pages: pagesTranslations };
  
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const mainStats = [
    {
      value: "450+",
      description: t('pages.impact.mainStats.smes'),
    },
    {
      value: "$25M+",
      description: t('pages.impact.mainStats.investment'),
    },
    {
      value: "2,500+",
      description: t('pages.impact.mainStats.jobs'),
    },
    {
      value: "15+",
      description: t('pages.impact.mainStats.solutions'),
    },
  ];

  const targetStats = [
    {
      value: "1,000+",
      description: t('pages.impact.targetStats.smes'),
    },
    {
      value: "$50M+",
      description: t('pages.impact.targetStats.investment'),
    },
    {
      value: "5,000+",
      description: t('pages.impact.targetStats.jobs'),
    },
    {
      value: "30+",
      description: t('pages.impact.targetStats.solutions'),
    },
  ];

  const impactAreas = [
    {
      icon: Leaf,
      title: t('pages.impact.areas.environmental.title'),
      stats: [
        { value: "2.5M", label: t('pages.impact.areas.environmental.co2') },
        { value: "500K", label: t('pages.impact.areas.environmental.people') },
        { value: "85%", label: t('pages.impact.areas.environmental.renewable') },
      ],
      color: colors.primary.green.DEFAULT,
    },
    {
      icon: Users,
      title: t('pages.impact.areas.social.title'),
      stats: [
        { value: "2,500+", label: t('pages.impact.areas.social.jobs') },
        { value: "60%", label: t('pages.impact.areas.social.women') },
        { value: "25", label: t('pages.impact.areas.social.counties') },
      ],
      color: colors.primary.cyan.DEFAULT,
    },
    {
      icon: DollarSign,
      title: t('pages.impact.areas.economic.title'),
      stats: [
        { value: "$25M+", label: t('pages.impact.areas.economic.investment') },
        { value: "$50M+", label: t('pages.impact.areas.economic.revenue') },
        { value: "3.2x", label: t('pages.impact.areas.economic.roi') },
      ],
      color: colors.primary.green.DEFAULT,
    },
    {
      icon: Building,
      title: t('pages.impact.areas.innovation.title'),
      stats: [
        { value: "450+", label: t('pages.impact.areas.innovation.smes') },
        { value: "15+", label: t('pages.impact.areas.innovation.sectors') },
        { value: "95%", label: t('pages.impact.areas.innovation.success') },
      ],
      color: colors.primary.cyan.DEFAULT,
    },
  ];

  const successStories = [
    {
      company: t('pages.impact.stories.solartech.company'),
      sector: t('pages.impact.stories.solartech.sector'),
      impact: t('pages.impact.stories.solartech.impact'),
      funding: t('pages.impact.stories.solartech.funding'),
      jobs: t('pages.impact.stories.solartech.jobs'),
    },
    {
      company: t('pages.impact.stories.agroclimate.company'),
      sector: t('pages.impact.stories.agroclimate.sector'),
      impact: t('pages.impact.stories.agroclimate.impact'),
      funding: t('pages.impact.stories.agroclimate.funding'),
      jobs: t('pages.impact.stories.agroclimate.jobs'),
    },
    {
      company: t('pages.impact.stories.watertech.company'),
      sector: t('pages.impact.stories.watertech.sector'),
      impact: t('pages.impact.stories.watertech.impact'),
      funding: t('pages.impact.stories.watertech.funding'),
      jobs: t('pages.impact.stories.watertech.jobs'),
    },
  ];
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
            {t('pages.impact.hero.title')}
          </h1>
          <p
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            {t('pages.impact.hero.description')}
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
            {t('pages.impact.areas.title')}
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
            {t('pages.impact.stories.title')}
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
                    <span className="text-sm text-gray-600">{t('pages.impact.stories.fundingLabel')}</span>
                    <span className="text-sm font-semibold">
                      {story.funding}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{t('pages.impact.stories.jobsLabel')}</span>
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
            {t('pages.impact.cta.title')}
          </h2>
          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            {t('pages.impact.cta.description')}
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
            <a href={`/${params.locale}/programs`} className="flex items-center space-x-2">
              <span>{t('pages.impact.cta.button')}</span>
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
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
