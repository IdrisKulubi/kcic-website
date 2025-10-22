import React from 'react';
import { MinimalNavbar } from '@/components/layout/MinimalNavbar';
import { navData } from '@/lib/navigation';
import { Metadata } from 'next';
import { colors, typography } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Upload, ArrowRight } from 'lucide-react';
import { getTranslations, LocaleCode } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: { locale: LocaleCode } }): Promise<Metadata> {
  const translations = await getTranslations(params.locale, 'pages');
  
  return {
    title: (translations.apply as any)?.meta?.title || 'Apply - KCIC',
    description: (translations.apply as any)?.meta?.description || 'Apply to KCIC Programs',
  };
}

export default async function ApplyPage({ params }: { params: { locale: LocaleCode } }) {
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

  const applicationSteps = [
    {
      step: 1,
      title: t('pages.apply.steps.step1.title'),
      description: t('pages.apply.steps.step1.description'),
      completed: false,
    },
    {
      step: 2,
      title: t('pages.apply.steps.step2.title'),
      description: t('pages.apply.steps.step2.description'),
      completed: false,
    },
    {
      step: 3,
      title: t('pages.apply.steps.step3.title'),
      description: t('pages.apply.steps.step3.description'),
      completed: false,
    },
    {
      step: 4,
      title: t('pages.apply.steps.step4.title'),
      description: t('pages.apply.steps.step4.description'),
      completed: false,
    },
  ];

  const programOptions = [
    t('pages.apply.form.program.programs.incubation'),
    t('pages.apply.form.program.programs.acceleration'),
    t('pages.apply.form.program.programs.partnerships'),
    t('pages.apply.form.program.programs.awards'),
    t('pages.apply.form.program.programs.guidance'),
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
            {t('pages.apply.hero.title')}
          </h1>
          <p 
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            {t('pages.apply.hero.description')}
          </p>
        </div>
      </section>

      {/* Application Progress */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-4">
            {applicationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div 
                  className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold ${
                    step.completed ? 'bg-green-500' : index === 0 ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  {step.completed ? <CheckCircle className="h-6 w-6" /> : step.step}
                </div>
                <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 
              className="font-bold mb-8"
              style={{
                fontSize: typography.sizes.heading.h2,
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
              }}
            >
              {t('pages.apply.form.title')}
            </h2>
            
            <form className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">{t('pages.apply.form.personal.title')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t('pages.apply.form.personal.firstName')} *
                    </label>
                    <Input 
                      placeholder={t('pages.apply.form.personal.firstName')}
                      className="rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t('pages.apply.form.personal.lastName')} *
                    </label>
                    <Input 
                      placeholder={t('pages.apply.form.personal.lastName')}
                      className="rounded-lg"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t('pages.apply.form.personal.email')} *
                    </label>
                    <Input 
                      type="email"
                      placeholder={t('pages.apply.form.personal.email')}
                      className="rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t('pages.apply.form.personal.phone')} *
                    </label>
                    <Input 
                      type="tel"
                      placeholder={t('pages.apply.form.personal.phonePlaceholder')}
                      className="rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">{t('pages.apply.form.organization.title')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t('pages.apply.form.organization.name')}
                    </label>
                    <Input 
                      placeholder={t('pages.apply.form.organization.namePlaceholder')}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {t('pages.apply.form.organization.role')}
                    </label>
                    <Input 
                      placeholder={t('pages.apply.form.organization.rolePlaceholder')}
                      className="rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('pages.apply.form.organization.stage')}
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>{t('pages.apply.form.organization.stagePlaceholder')}</option>
                    <option>{t('pages.apply.form.organization.stages.idea')}</option>
                    <option>{t('pages.apply.form.organization.stages.prototype')}</option>
                    <option>{t('pages.apply.form.organization.stages.revenue')}</option>
                    <option>{t('pages.apply.form.organization.stages.growth')}</option>
                    <option>{t('pages.apply.form.organization.stages.established')}</option>
                  </select>
                </div>
              </div>

              {/* Program Interest */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">{t('pages.apply.form.program.title')}</h3>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('pages.apply.form.program.interest')} *
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>{t('pages.apply.form.program.interestPlaceholder')}</option>
                    {programOptions.map((program, index) => (
                      <option key={index}>{program}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('pages.apply.form.program.source')}
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>{t('pages.apply.form.program.sourcePlaceholder')}</option>
                    <option>{t('pages.apply.form.program.sources.website')}</option>
                    <option>{t('pages.apply.form.program.sources.social')}</option>
                    <option>{t('pages.apply.form.program.sources.partner')}</option>
                    <option>{t('pages.apply.form.program.sources.event')}</option>
                    <option>{t('pages.apply.form.program.sources.referral')}</option>
                    <option>{t('pages.apply.form.program.sources.media')}</option>
                    <option>{t('pages.apply.form.program.sources.other')}</option>
                  </select>
                </div>
              </div>

              {/* Climate Solution Overview */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">{t('pages.apply.form.solution.title')}</h3>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('pages.apply.form.solution.description')} *
                  </label>
                  <Textarea 
                    placeholder={t('pages.apply.form.solution.descriptionPlaceholder')}
                    rows={4}
                    className="rounded-lg"
                    required
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('pages.apply.form.solution.sector')}
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>{t('pages.apply.form.solution.sectorPlaceholder')}</option>
                    <option>{t('pages.apply.form.solution.sectors.renewable')}</option>
                    <option>{t('pages.apply.form.solution.sectors.efficiency')}</option>
                    <option>{t('pages.apply.form.solution.sectors.agriculture')}</option>
                    <option>{t('pages.apply.form.solution.sectors.water')}</option>
                    <option>{t('pages.apply.form.solution.sectors.waste')}</option>
                    <option>{t('pages.apply.form.solution.sectors.transport')}</option>
                    <option>{t('pages.apply.form.solution.sectors.carbon')}</option>
                    <option>{t('pages.apply.form.solution.sectors.adaptation')}</option>
                    <option>{t('pages.apply.form.solution.sectors.finance')}</option>
                    <option>{t('pages.apply.form.solution.sectors.other')}</option>
                  </select>
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">{t('pages.apply.form.documents.title')}</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">
                    {t('pages.apply.form.documents.description')}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {t('pages.apply.form.documents.fileTypes')}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                  >
                    {t('pages.apply.form.documents.button')}
                  </Button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 py-3 rounded-lg font-semibold"
                  style={{
                    borderColor: colors.secondary.gray[300],
                    color: colors.secondary.gray[700],
                  }}
                >
                  {t('pages.apply.form.actions.draft')}
                </Button>
                
                <Button
                  type="submit"
                  className="flex-1 py-3 rounded-lg font-semibold"
                  style={{
                    background: colors.gradients.primary,
                    color: 'white',
                    fontFamily: typography.fonts.body,
                    border: 'none',
                  }}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>{t('pages.apply.form.actions.continue')}</span>
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 
            className="font-bold mb-6"
            style={{
              fontSize: typography.sizes.heading.h3,
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
            }}
          >
            {t('pages.apply.support.title')}
          </h2>
          <p 
            className="text-lg mb-8"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            {t('pages.apply.support.description')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              variant="outline"
              className="py-3 rounded-lg font-semibold"
              style={{
                borderColor: colors.primary.green.DEFAULT,
                color: colors.primary.green.DEFAULT,
              }}
              asChild
            >
              <a href={`/${params.locale}/contact`}>
                {t('pages.apply.support.contact')}
              </a>
            </Button>
            
            <Button
              variant="outline"
              className="py-3 rounded-lg font-semibold"
              style={{
                borderColor: colors.primary.cyan.DEFAULT,
                color: colors.primary.cyan.DEFAULT,
              }}
              asChild
            >
              <a href={`/${params.locale}/programs`}>
                {t('pages.apply.support.programs')}
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
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}