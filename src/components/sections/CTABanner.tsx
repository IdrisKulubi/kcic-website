'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { CTABannerData } from '@/data/home';
import { 
  touchTargetUtils, 
  colorUtils, 
  motionUtils 
} from '@/lib/accessibility';

interface CTABannerProps {
  data: CTABannerData;
}

export function CTABanner({ data }: CTABannerProps) {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 text-background"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Gradient background with animated elements */}
      <div className="absolute inset-0 bg-cta-gradient" aria-hidden="true">
        {/* Animated blob shapes */}
        <div className={`absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full ${!motionUtils.prefersReducedMotion() && 'animate-float'}`} />
        <div className={`absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full ${!motionUtils.prefersReducedMotion() && 'animate-float animate-delay-200'}`} />
        <div className={`absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full ${!motionUtils.prefersReducedMotion() && 'animate-float animate-delay-500'}`} />
        
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <ScrollReveal>
            <motion.h2 
              id="cta-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, y: 30 }}
              whileInView={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
              transition={motionUtils.prefersReducedMotion() ? {} : { duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {data.headline}
            </motion.h2>
          </ScrollReveal>

          {data.subtext && (
            <ScrollReveal delay={0.2}>
              <motion.p 
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-4 sm:px-0"
                initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, y: 30 }}
                whileInView={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                transition={motionUtils.prefersReducedMotion() ? {} : { duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {data.subtext}
              </motion.p>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.4}>
            <motion.div
              initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, y: 30 }}
              whileInView={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
              transition={motionUtils.prefersReducedMotion() ? {} : { duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                size="lg"
                className={`bg-white text-primary hover:bg-white/90 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full shadow-lg hover:shadow-xl w-full sm:w-auto max-w-xs sm:max-w-none ${touchTargetUtils.getTouchClasses()} ${colorUtils.getFocusRingClasses()} ${!motionUtils.prefersReducedMotion() && 'hover:scale-105'}`}
              >
                <motion.a
                  href={data.ctaButton.href}
                  whileHover={motionUtils.prefersReducedMotion() ? {} : { 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                  }}
                  whileTap={motionUtils.prefersReducedMotion() ? {} : { scale: 0.95 }}
                  transition={motionUtils.prefersReducedMotion() ? {} : { type: "spring", stiffness: 300, damping: 20 }}
                  aria-label={`${data.ctaButton.text} - Join KCIC in building a sustainable future`}
                >
                  {data.ctaButton.text}
                </motion.a>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-16 text-background"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}