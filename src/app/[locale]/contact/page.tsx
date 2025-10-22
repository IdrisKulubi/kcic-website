import React from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { Metadata } from "next";
import { colors, typography } from "@/lib/design-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { navData } from "@/lib/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getTranslations, LocaleCode } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { locale: LocaleCode } }): Promise<Metadata> {
  const translations = await getTranslations(params.locale, 'pages');
  
  return {
    title: (translations.contact as any)?.meta?.title || 'Contact - KCIC',
    description: (translations.contact as any)?.meta?.description || 'Contact KCIC',
  };
}

export default async function ContactPage({ params }: { params: { locale: LocaleCode } }) {
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

  const contactInfo = [
    {
      icon: MapPin,
      title: t('pages.contact.info.visit.title'),
      details: [
        t('pages.contact.info.visit.line1'),
        t('pages.contact.info.visit.line2'),
        t('pages.contact.info.visit.line3'),
        t('pages.contact.info.visit.line4'),
      ],
      color: colors.primary.green.DEFAULT,
    },
    {
      icon: Phone,
      title: t('pages.contact.info.call.title'),
      details: [
        t('pages.contact.info.call.line1'),
        t('pages.contact.info.call.line2'),
        t('pages.contact.info.call.line3'),
        t('pages.contact.info.call.line4'),
      ],
      color: colors.primary.cyan.DEFAULT,
    },
    {
      icon: Mail,
      title: t('pages.contact.info.email.title'),
      details: [
        t('pages.contact.info.email.line1'),
        t('pages.contact.info.email.line2'),
        t('pages.contact.info.email.line3'),
        t('pages.contact.info.email.line4'),
      ],
      color: colors.primary.green.DEFAULT,
    },
    {
      icon: Clock,
      title: t('pages.contact.info.hours.title'),
      details: [
        t('pages.contact.info.hours.line1'),
        t('pages.contact.info.hours.line2'),
        t('pages.contact.info.hours.line3'),
        t('pages.contact.info.hours.line4'),
      ],
      color: colors.primary.cyan.DEFAULT,
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
            {t('pages.contact.hero.title')}
          </h1>
          <p
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            {t('pages.contact.hero.description')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2
                className="font-bold mb-8"
                style={{
                  fontSize: typography.sizes.heading.h3,
                  fontFamily: typography.fonts.heading,
                  color: colors.secondary.gray[900],
                }}
              >
                {t('pages.contact.form.title')}
              </h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t('pages.contact.form.firstName')}
                    </label>
                    <Input
                      placeholder={t('pages.contact.form.firstName')}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t('pages.contact.form.lastName')}
                    </label>
                    <Input
                      placeholder={t('pages.contact.form.lastName')}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('pages.contact.form.email')}
                  </label>
                  <Input
                    type="email"
                    placeholder={t('pages.contact.form.email')}
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('pages.contact.form.organization')}
                  </label>
                  <Input
                    placeholder={t('pages.contact.form.organizationPlaceholder')}
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('pages.contact.form.subject')}
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>{t('pages.contact.form.subjects.general')}</option>
                    <option>{t('pages.contact.form.subjects.program')}</option>
                    <option>{t('pages.contact.form.subjects.partnership')}</option>
                    <option>{t('pages.contact.form.subjects.media')}</option>
                    <option>{t('pages.contact.form.subjects.support')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('pages.contact.form.message')}
                  </label>
                  <Textarea
                    placeholder={t('pages.contact.form.messagePlaceholder')}
                    rows={6}
                    className="rounded-lg"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 rounded-lg font-semibold"
                  style={{
                    background: colors.gradients.primary,
                    color: "white",
                    fontFamily: typography.fonts.body,
                    border: "none",
                  }}
                >
                  {t('pages.contact.form.submit')}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="shrink-0">
                        <IconComponent
                          className="h-6 w-6"
                          style={{ color: info.color }}
                        />
                      </div>
                      <div>
                        <h3
                          className="font-bold mb-3"
                          style={{
                            fontSize: typography.sizes.heading.h4,
                            fontFamily: typography.fonts.heading,
                            color: colors.secondary.gray[900],
                          }}
                        >
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p
                              key={detailIndex}
                              style={{
                                fontFamily: typography.fonts.body,
                                color: colors.secondary.gray[600],
                                fontSize: typography.sizes.body.sm,
                              }}
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-center font-bold mb-12"
            style={{
              fontSize: typography.sizes.heading.h2,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            {t('pages.contact.map.title')}
          </h2>

          {/* Placeholder for map - you would integrate with Google Maps or similar */}
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin
                className="h-12 w-12 mx-auto mb-4"
                style={{ color: colors.primary.green.DEFAULT }}
              />
              <p
                className="font-semibold"
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[700],
                }}
              >
                {t('pages.contact.map.placeholder')}
              </p>
              <p
                className="text-sm mt-2"
                style={{
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[600],
                }}
              >
                {t('pages.contact.map.location')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
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
            {t('pages.contact.quickActions.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Button
              className="py-4 rounded-lg font-semibold"
              style={{
                background: colors.gradients.primary,
                color: "white",
                fontFamily: typography.fonts.body,
                border: "none",
              }}
              asChild
            >
              <a href={`/${params.locale}/programs`}>{t('pages.contact.quickActions.programs')}</a>
            </Button>

            <Button
              variant="outline"
              className="py-4 rounded-lg font-semibold"
              style={{
                borderColor: colors.primary.green.DEFAULT,
                color: colors.primary.green.DEFAULT,
                fontFamily: typography.fonts.body,
              }}
              asChild
            >
              <a href={`/${params.locale}/apply`}>{t('pages.contact.quickActions.apply')}</a>
            </Button>
          </div>
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
