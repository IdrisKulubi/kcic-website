'use client';

import { Button } from '@/components/ui/button';
import { HeroData } from '@/data/home';
import { 
  touchTargetUtils, 
  colorUtils
} from '@/lib/accessibility';
import { 
  AccessibleHeading,
  AccessibleText,
  AccessibleContainer,
} from '@/components/accessibility';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface AccessibleHeroSectionProps {
  data: HeroData;
}

export function AccessibleHeroSection({ data }: AccessibleHeroSectionProps) {
  const [, setIsVideoLoaded] = useState(false);
  const { 
    getInteractiveClasses, 
    getImageClasses, 
    getMotionSafeClasses,
    shouldDisableAnimations,
    settings 
  } = useAccessibilityClasses();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video - Respects accessibility settings */}
      <div className="absolute inset-0 z-0">
        {!settings.hideImages && (
          <video
            autoPlay={!settings.pauseAnimations}
            muted
            loop={!settings.pauseAnimations}
            playsInline
            controls={false}
            preload="auto"
            disablePictureInPicture
            className={getImageClasses("w-full h-full object-cover")}
            onLoadedData={() => setIsVideoLoaded(true)}
            onEnded={(e) => {
              if (!settings.pauseAnimations) {
                const video = e.currentTarget;
                video.currentTime = 0;
                video.play();
              }
            }}
            aria-hidden="true"
          >
            <source src="/video/herovideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Dark overlay for better text readability */}
        <div className={`absolute inset-0 ${settings.highContrast ? 'bg-black/80' : 'bg-black/40'}`} />
        
        {/* Gradient overlay for better text readability on left side */}
        <div className={`absolute inset-0 ${settings.highContrast ? 'bg-gradient-to-r from-black via-black/80 to-black/60' : 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'}`} />
      </div>

      {/* Text Content Overlay */}
      <AccessibleContainer className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -ml-4 sm:-ml-6 lg:-ml-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen py-12">
          {/* Left side - Text Content */}
          <AccessibleContainer className="text-white space-y-6 sm:space-y-8 text-center lg:text-left max-w-4xl lg:max-w-none mx-auto lg:mx-0">
            {/* Main Headline */}
            <AccessibleHeading 
              level={1}
              id="hero-heading"
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight ${settings.highContrast ? 'text-white' : 'text-white'}`}
            >
              <span className="block text-white mb-2">
                Empowering
              </span>
              <span className="block text-white mb-2">
                Climate Innovation
              </span>
              <span className="block text-white">
                in africa
              </span>
            </AccessibleHeading>

            {/* Subtext */}
            <AccessibleText 
              className={`text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl font-light ${settings.highContrast ? 'text-white' : 'text-white/90'}`}
            >
              Accelerating green growth through innovative climate solutions, supporting SMEs, and building a sustainable future for africa.
            </AccessibleText>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              {data.ctaButtons.map((button) => (
                <Button
                  key={button.text}
                  size="lg"
                  className={getInteractiveClasses(
                    button.variant === 'primary'
                      ? `bg-climate-green hover:bg-climate-green-dark text-white px-8 py-4 text-lg font-semibold transition-all duration-300 ${getMotionSafeClasses('hover:scale-105')} ${touchTargetUtils.getTouchClasses()} ${colorUtils.getFocusRingClasses()}`
                      : `border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 ${getMotionSafeClasses('hover:scale-105')} ${touchTargetUtils.getTouchClasses()} ${colorUtils.getFocusRingClasses()}`
                  )}
                  asChild
                >
                  <a 
                    href={button.href}
                    className="flex items-center justify-center space-x-2"
                    aria-label={`${button.text} - ${button.variant === 'primary' ? 'Primary action' : 'Secondary action'}`}
                  >
                    <span>{button.text}</span>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </div>
          </AccessibleContainer>

          {/* Right side - Video space (intentionally empty to let video show through) */}
          <div className="hidden lg:block relative">
            <div className="h-96 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className={`w-64 h-64 border-2 border-white/30 rounded-full ${getMotionSafeClasses('animate-pulse')}`} />
              </div>
            </div>
          </div>
        </div>
      </AccessibleContainer>

      {/* Scroll indicator - Respects motion preferences */}
      {!shouldDisableAnimations() && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: settings.reducedMotion ? 'auto' : 'smooth' })}
          role="button"
          tabIndex={0}
          aria-label="Scroll to discover our impact"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.scrollTo({ top: window.innerHeight, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
            }
          }}
        >
          <div className={getInteractiveClasses("flex flex-col items-center space-y-2 group")}>
            <AccessibleText 
              as="span" 
              className={`text-sm font-medium tracking-wide ${getMotionSafeClasses('group-hover:text-white transition-colors duration-300')}`}
            >
              Discover Our Impact
            </AccessibleText>
            <ChevronDown 
              className={`h-6 w-6 ${getMotionSafeClasses('group-hover:translate-y-1 transition-transform duration-300 animate-bounce')}`} 
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* Alternative scroll indicator for reduced motion */}
      {shouldDisableAnimations() && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'auto' })}
          role="button"
          tabIndex={0}
          aria-label="Scroll to discover our impact"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.scrollTo({ top: window.innerHeight, behavior: 'auto' });
            }
          }}
        >
          <div className={getInteractiveClasses("flex flex-col items-center space-y-2")}>
            <AccessibleText 
              as="span" 
              className="text-sm font-medium tracking-wide"
            >
              Discover Our Impact
            </AccessibleText>
            <ChevronDown className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
      )}
    </section>
  );
}