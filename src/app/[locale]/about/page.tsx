import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { Metadata } from "next";
import { colors, typography } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { navData } from "@/lib/navigation";
import { ArrowRight, Target, Users, Globe } from "lucide-react";
import { getTranslations, LocaleCode } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleCode };
}): Promise<Metadata> {
  const translations = await getTranslations(params.locale, 'pages');

  return {
    title: (translations.about as any)?.meta?.title || 'About KCIC',
    description: (translations.about as any)?.meta?.description || 'Learn about KCIC',
  };
}

export default async function AboutPage({
  params,
}: {
  params: { locale: LocaleCode };
}) {
  const commonTranslations = await getTranslations(params.locale, 'common');
  const pagesTranslations = await getTranslations(params.locale, 'pages');
  const translations = { ...commonTranslations, pages: pagesTranslations };
  
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
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
            {t("pages.about.hero.title")}
          </h1>
          <p
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            {t("pages.about.hero.description")}
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
                {t("pages.about.mission.title")}
              </h3>
              <p
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[600],
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                {t("pages.about.mission.description")}
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
                {t("pages.about.approach.title")}
              </h3>
              <p
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[600],
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                {t("pages.about.approach.description")}
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
                {t("pages.about.impact.title")}
              </h3>
              <p
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[600],
                  lineHeight: typography.lineHeights.relaxed,
                }}
              >
                {t("pages.about.impact.description")}
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
            {t("pages.about.story.title")}
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
              {t("pages.about.story.paragraph1")}
            </p>
            <p
              className="text-lg"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[700],
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              {t("pages.about.story.paragraph2")}
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
              <a
                href={`/${params.locale}/programs`}
                className="flex items-center space-x-2"
              >
                <span>{t("pages.about.cta")}</span>
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
            <p className="text-gray-600 text-sm">{t("copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
