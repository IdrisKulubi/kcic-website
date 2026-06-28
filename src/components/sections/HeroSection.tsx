'use client';

import { Button } from '@/components/ui/button';
import { HeroData } from '@/data/home';
import {
  touchTargetUtils,
  colorUtils
} from '@/lib/accessibility';
import { CaretDown, ArrowRight } from '@phosphor-icons/react';
import { useState } from 'react';

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const [, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="auto"
          disablePictureInPicture
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
          onEnded={(e) => {
            // Ensure video loops even if loop attribute fails
            const video = e.currentTarget;
            video.currentTime = 0;
            video.play();
          }}
          aria-hidden="true"
        >
          <source src="/video/herovideo.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlay for better text readability on left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Text Content Overlay */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -ml-4 sm:-ml-6 lg:-ml-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen py-12">
          {/* Left side - Text Content */}
          <div className="text-white space-y-6 sm:space-y-8 text-center lg:text-left max-w-4xl lg:max-w-none mx-auto lg:mx-0">
            {/* Main Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
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
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/90 max-w-2xl font-light">
              Accelerating green growth through innovative climate solutions, supporting SMEs, and building a sustainable future for africa.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              {data.ctaButtons.map((button) => (
                <Button
                  key={button.text}
                  size="lg"
                  className={
                    button.variant === 'primary'
                      ? `bg-climate-green hover:bg-climate-green-dark text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 ${touchTargetUtils.getTouchClasses()} ${colorUtils.getFocusRingClasses()}`
                      : `border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 hover:scale-105 ${touchTargetUtils.getTouchClasses()} ${colorUtils.getFocusRingClasses()}`
                  }
                  asChild
                >
                  <a
                    href={button.href}
                    className="flex items-center justify-center space-x-2"
                  >
                    <span>{button.text}</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Right side - Video space (intentionally empty to let video show through) */}
          <div className="hidden lg:block relative">
            <div className="h-96 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-64 h-64 border-2 border-white/30 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center space-y-2 group">
          <span className="text-sm font-medium tracking-wide group-hover:text-white transition-colors duration-300">
            Discover Our Impact
          </span>
          <CaretDown className="h-6 w-6 group-hover:translate-y-1 transition-transform duration-300 animate-bounce" />
        </div>
      </div>
    </section>
  );
}