import React from 'react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import { navData } from '@/lib/navigation';
import { Metadata } from 'next';
import { colors, typography } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, TrendingUp, Handshake, Award } from 'lucide-react';
import { getTranslations, LocaleCode } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: { locale: LocaleCode } }): Promise<Metadata> {
  const translations = await getTranslations(params.locale, 'pages');
  
  return {
    title: (translations.programs as any)?.meta?.title || 'Programs - KCIC',
    description: (translations.programs as any)?.meta?.description || 'KCIC Programs',
  };
}

export default async function ProgramsPage({ params }: { params: { locale: LocaleCode } }) {
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

  const programs = [
    {
      icon: Lightbulb,
      title: t('pages.programs.incubation.title'),
      description: t('pages.programs.incubation.description'),
      features: [
        t('pages.programs.incubation.features.funding'),
        t('pages.programs.incubation.features.mentorship'),
        t('pages.programs.incubation.features.validation'),
        t('pages.programs.incubation.features.prototype')
      ],
      duration: t('pages.programs.incubation.duration'),
      color: colors.primary.green.DEFAULT,
    },
    {
      icon: TrendingUp,
      title: t('pages.programs.acceleration.title'),
      description: t('pages.programs.acceleration.description'),
      features: [
        t('pages.programs.acceleration.features.funding'),
        t('pages.programs.acceleration.features.expansion'),
        t('pages.programs.acceleration.features.partnerships'),
        t('pages.programs.acceleration.features.access')
      ],
      duration: t('pages.programs.acceleration.duration'),
      color: colors.primary.cyan.DEFAULT,
    },
    {
      icon: Handshake,
      title: t('pages.programs.partnerships.title'),
      description: t('pages.programs.partnerships.description'),
      features: [
        t('pages.programs.partnerships.features.pilots'),
        t('pages.programs.partnerships.features.procurement'),
        t('pages.programs.partnerships.features.validation'),
        t('pages.programs.partnerships.features.deployment')
      ],
      duration: t('pages.programs.partnerships.duration'),
      color: colors.primary.green.DEFAULT,
    },
    {
      icon: Award,
      title: t('pages.programs.awards.title'),
      description: t('pages.programs.awards.description'),
      features: [
        t('pages.programs.awards.features.prize'),
        t('pages.programs.awards.features.recognition'),
        t('pages.programs.awards.features.exposure'),
        t('pages.programs.awards.features.connections')
      ],
      duration: t('pages.programs.awards.duration'),
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
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
              lineHeight: typography.lineHeights.tight,
            }}
          >
            {t('pages.programs.hero.title')}
          </h1>
          <p 
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            {t('pages.programs.hero.description')}
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mb-6">
                    <IconComponent className="h-12 w-12" style={{ color: program.color }} />
                  </div>
                  
                  <h3 
                    className="font-bold mb-4"
                    style={{
                      fontSize: typography.sizes.heading.h3,
                      fontFamily: typography.fonts.heading,
                      color: colors.secondary.gray[900],
                    }}
                  >
                    {program.title}
                  </h3>
                  
                  <p 
                    className="mb-6"
                    style={{
                      fontFamily: typography.fonts.body,
                      color: colors.secondary.gray[600],
                      lineHeight: typography.lineHeights.relaxed,
                    }}
                  >
                    {program.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-800">{t('pages.programs.featuresLabel')}</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: program.color }}
                          />
                          <span 
                            className="text-sm"
                            style={{
                              fontFamily: typography.fonts.body,
                              color: colors.secondary.gray[700],
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-sm font-semibold"
                      style={{ color: program.color }}
                    >
                      {t('pages.programs.durationLabel')} {program.duration}
                    </span>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      style={{
                        borderColor: program.color,
                        color: program.color,
                      }}
                    >
                      {t('pages.programs.learnMore')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Process */}
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
            {t('pages.programs.application.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary.green.DEFAULT }}
              >
                1
              </div>
              <h3 className="font-semibold mb-2">{t('pages.programs.application.step1.title')}</h3>
              <p className="text-gray-600 text-sm">{t('pages.programs.application.step1.description')}</p>
            </div>
            
            <div>
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary.cyan.DEFAULT }}
              >
                2
              </div>
              <h3 className="font-semibold mb-2">{t('pages.programs.application.step2.title')}</h3>
              <p className="text-gray-600 text-sm">{t('pages.programs.application.step2.description')}</p>
            </div>
            
            <div>
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary.green.DEFAULT }}
              >
                3
              </div>
              <h3 className="font-semibold mb-2">{t('pages.programs.application.step3.title')}</h3>
              <p className="text-gray-600 text-sm">{t('pages.programs.application.step3.description')}</p>
            </div>
          </div>
          
          <Button
            className="px-8 py-4 rounded-full font-semibold"
            style={{
              background: colors.gradients.primary,
              color: 'white',
              fontFamily: typography.fonts.body,
              border: 'none',
            }}
            asChild
          >
            <a href={`/${params.locale}/apply`} className="flex items-center space-x-2">
              <span>{t('pages.programs.application.cta')}</span>
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