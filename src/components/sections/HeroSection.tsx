'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HeroData } from '@/data/home';
import { 
  touchTargetUtils, 
  colorUtils, 
  motionUtils
} from '@/lib/accessibility';

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  // Staggered animation for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Animation for CTA buttons
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  // Animation for visual elements
  const visualVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: 0.3
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-climate-green/20 to-transparent rounded-full"
          animate={motionUtils.prefersReducedMotion() ? {} : {
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={motionUtils.prefersReducedMotion() ? {} : {
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-climate-blue/20 to-transparent rounded-full"
          animate={motionUtils.prefersReducedMotion() ? {} : {
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={motionUtils.prefersReducedMotion() ? {} : {
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-16 sm:py-20">
          {/* Left side - Text content */}
          <motion.div
            className="space-y-6 sm:space-y-8 text-white text-center lg:text-left"
            variants={motionUtils.prefersReducedMotion() ? {} : containerVariants}
            initial={motionUtils.prefersReducedMotion() ? {} : "hidden"}
            animate={motionUtils.prefersReducedMotion() ? {} : "visible"}
          >
            {/* Headline */}
            <motion.h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              variants={motionUtils.prefersReducedMotion() ? {} : textVariants}
            >
              {data.headline}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 max-w-2xl mx-auto lg:mx-0"
              variants={motionUtils.prefersReducedMotion() ? {} : textVariants}
            >
              {data.subtext}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
              variants={motionUtils.prefersReducedMotion() ? {} : textVariants}
              role="group"
              aria-label="Call to action buttons"
            >
              {data.ctaButtons.map((button) => (
                <motion.div
                  key={button.text}
                  variants={motionUtils.prefersReducedMotion() ? {} : buttonVariants}
                  whileHover={motionUtils.prefersReducedMotion() ? {} : { scale: 1.05 }}
                  whileTap={motionUtils.prefersReducedMotion() ? {} : { scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant={button.variant === 'primary' ? 'default' : 'outline'}
                    className={
                      button.variant === 'primary'
                        ? `bg-white text-climate-green hover:bg-gray-100 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto ${touchTargetUtils.getTouchClasses()} ${colorUtils.getFocusRingClasses()}`
                        : `border-2 border-white text-white hover:bg-white hover:text-climate-green px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold bg-transparent backdrop-blur-sm transition-all duration-300 w-full sm:w-auto ${touchTargetUtils.getTouchClasses()} ${colorUtils.getFocusRingClasses()}`
                    }
                    asChild
                  >
                    <a 
                      href={button.href}
                      aria-label={button.variant === 'primary' 
                        ? `${button.text} - Apply to join KCIC programmes` 
                        : `${button.text} - Learn more about KCIC`
                      }
                    >
                      {button.text}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Animated visuals */}
          <motion.div
            className="relative flex items-center justify-center order-first lg:order-last"
            variants={motionUtils.prefersReducedMotion() ? {} : visualVariants}
            initial={motionUtils.prefersReducedMotion() ? {} : "hidden"}
            animate={motionUtils.prefersReducedMotion() ? {} : "visible"}
            aria-hidden="true"
          >
            {/* Main visual container */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              {/* Floating geometric shapes */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={motionUtils.prefersReducedMotion() ? {} : {
                  rotate: 360,
                }}
                transition={motionUtils.prefersReducedMotion() ? {} : {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Outer ring */}
                <div className="w-64 h-64 sm:w-80 sm:h-80 border-2 border-white/20 rounded-full" />
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={motionUtils.prefersReducedMotion() ? {} : {
                  rotate: -360,
                }}
                transition={motionUtils.prefersReducedMotion() ? {} : {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Middle ring */}
                <div className="w-48 h-48 sm:w-60 sm:h-60 border border-white/30 rounded-full" />
              </motion.div>

              {/* Central content */}
              <motion.div
                className="relative z-10 flex items-center justify-center h-64 sm:h-80"
                animate={motionUtils.prefersReducedMotion() ? {} : {
                  y: [-10, 10, -10],
                }}
                transition={motionUtils.prefersReducedMotion() ? {} : {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Climate innovation icon/symbol */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <motion.div
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-climate-green to-climate-blue rounded-full"
                    animate={motionUtils.prefersReducedMotion() ? {} : {
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={motionUtils.prefersReducedMotion() ? {} : {
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                  />
                </div>
              </motion.div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/40 rounded-full"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${30 + (i * 10)}%`,
                  }}
                  animate={motionUtils.prefersReducedMotion() ? {} : {
                    y: [-20, 20, -20],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={motionUtils.prefersReducedMotion() ? {} : {
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
        initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, y: 20 }}
        animate={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
        transition={motionUtils.prefersReducedMotion() ? {} : { delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="flex flex-col items-center space-y-2"
          animate={motionUtils.prefersReducedMotion() ? {} : { y: [0, 10, 0] }}
          transition={motionUtils.prefersReducedMotion() ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={motionUtils.prefersReducedMotion() ? {} : { y: [0, 12, 0] }}
              transition={motionUtils.prefersReducedMotion() ? {} : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}