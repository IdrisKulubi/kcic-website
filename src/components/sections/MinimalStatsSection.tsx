'use client';

import React from 'react';
import { colors, typography } from '@/lib/design-system';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

interface MinimalStatsSectionProps {
  stats: StatItem[];
}

export function MinimalStatsSection({ stats }: MinimalStatsSectionProps) {
  const { getMotionSafeClasses } = useAccessibilityClasses();

  return (
    <section 
      id="impact-section"
      className="py-20 sm:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            className={`font-bold mb-4 ${getMotionSafeClasses('animate-in fade-in slide-in-from-bottom-6 duration-800')}`}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
              lineHeight: typography.lineHeights.tight,
            }}
          >
            Our Impact
          </h2>
          <div 
            className={`w-24 h-1 mx-auto ${getMotionSafeClasses('animate-in fade-in slide-in-from-bottom-6 duration-800 delay-200')}`}
            style={{
              background: colors.gradients.primary,
            }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center ${getMotionSafeClasses(`animate-in fade-in slide-in-from-bottom-6 duration-800 delay-${(index + 1) * 200}`)}`}
            >
              {/* Stat Value */}
              <div className="mb-3">
                <span
                  className="font-bold"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontFamily: typography.fonts.heading,
                    background: colors.primary.green.DEFAULT,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: typography.lineHeights.tight,
                  }}
                >
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span
                    className="font-bold ml-1"
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontFamily: typography.fonts.heading,
                      color: colors.primary.green.DEFAULT,
                    }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Stat Label */}
              <p
                className="font-medium"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                  fontFamily: typography.fonts.body,
                  color: colors.secondary.gray[600],
                  letterSpacing: typography.letterSpacing.wide,
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}