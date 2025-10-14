'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { colors, typography } from '@/lib/design-system';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';

interface MinimalHeroSectionProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    stats: string;
    ctaButtons: Array<{
      text: string;
      href: string;
      variant: 'primary' | 'secondary';
    }>;
  };
}

export function MinimalHeroSection({ data }: MinimalHeroSectionProps) {
  const { getMotionSafeClasses, shouldDisableAnimations } = useAccessibilityClasses();

  const scrollToNext = () => {
    const nextSection = document.querySelector('#impact-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: shouldDisableAnimations() ? 'auto' : 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <h1 
          className={`font-bold mb-6 ${getMotionSafeClasses('animate-in fade-in slide-in-from-bottom-8 duration-1000')}`}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontFamily: typography.fonts.heading,
            lineHeight: typography.lineHeights.tight,
            letterSpacing: typography.letterSpacing.tight,
            color: colors.secondary.gray[900],
          }}
        >
          {data.title}
        </h1>

        {/* Subtitle */}
        <h2 
          className={`font-medium mb-4 ${getMotionSafeClasses('animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200')}`}
          style={{
            fontSize: 'clamp(1.25rem, 4vw, 2rem)',
            fontFamily: typography.fonts.body,
            color: colors.primary.green.DEFAULT,
            letterSpacing: typography.letterSpacing.wide,
          }}
        >
          {data.subtitle}
        </h2>

        {/* Description */}
        <p 
          className={`text-lg sm:text-xl mb-6 max-w-2xl mx-auto ${getMotionSafeClasses('animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400')}`}
          style={{
            fontFamily: typography.fonts.body,
            lineHeight: typography.lineHeights.relaxed,
            color: colors.secondary.gray[600],
          }}
        >
          {data.description}
        </p>

        {/* Stats */}
        <div 
          className={`mb-12 ${getMotionSafeClasses('animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600')}`}
        >
          <p 
            className="text-sm sm:text-base font-medium tracking-wider"
            style={{
              color: colors.primary.green.DEFAULT,
              fontFamily: typography.fonts.body,
              letterSpacing: typography.letterSpacing.wider,
            }}
          >
            {data.stats}
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${getMotionSafeClasses('animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800')}`}
        >
          {data.ctaButtons.map((button) => (
            <Button
              key={button.text}
              size="lg"
              className={
                button.variant === 'primary'
                  ? `px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 border-none ${getMotionSafeClasses('hover:scale-105 hover:shadow-2xl')}`
                  : `px-8 py-4 text-lg font-semibold rounded-full bg-transparent border-2 transition-all duration-300 ${getMotionSafeClasses('hover:scale-105')}`
              }
              style={
                button.variant === 'primary'
                  ? {
                      background: colors.primary.green.DEFAULT,
                      color: '#FFFFFF',
                      fontFamily: typography.fonts.body,
                    }
                  : {
                      borderColor: colors.primary.cyan.DEFAULT,
                      color: colors.primary.cyan.DEFAULT,
                      fontFamily: typography.fonts.body,
                      backgroundColor: 'transparent',
                    }
              }
              asChild
            >
              <a 
                href={button.href}
                className="flex items-center justify-center space-x-2 min-w-[200px]"
              >
                <span>{button.text}</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      {!shouldDisableAnimations() && (
        <button
          onClick={scrollToNext}
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group ${getMotionSafeClasses('animate-in fade-in duration-1000 delay-1000')}`}
          aria-label="Scroll to discover our impact"
          style={{ color: colors.secondary.gray[600] }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span 
              className={`text-sm font-medium tracking-wide ${getMotionSafeClasses('group-hover:opacity-80 transition-colors duration-300')}`}
              style={{
                fontFamily: typography.fonts.body,
                letterSpacing: typography.letterSpacing.wide,
                color: colors.secondary.gray[600],
              }}
            >
              Discover Our Impact
            </span>
            <ChevronDown 
              className={`h-6 w-6 ${getMotionSafeClasses('group-hover:translate-y-1 transition-transform duration-300 animate-bounce')}`}
              style={{ color: colors.primary.green.DEFAULT }}
            />
          </div>
        </button>
      )}
    </section>
  );
}