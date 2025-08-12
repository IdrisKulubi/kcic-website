/**
 * Animation configuration and utility functions for KCIC Landing Page
 * Provides consistent animation settings and reusable animation variants
 */

import { Variants } from "framer-motion";

// Animation configuration constants
export const ANIMATION_CONFIG = {
  // Duration settings
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
  },
  
  // Easing curves
  easing: {
    smooth: [0.25, 0.1, 0.25, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    ease: [0.4, 0, 0.2, 1],
  },
  
  // Stagger delays
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
  
  // Intersection observer thresholds
  threshold: {
    low: 0.1,
    medium: 0.3,
    high: 0.6,
  },
} as const;

// Common animation variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

export const slideInUp: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

// Stagger container variants
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

export const staggerFastContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.fast,
      delayChildren: 0.05,
    },
  },
};

// Hover and tap animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: ANIMATION_CONFIG.duration.fast,
    ease: ANIMATION_CONFIG.easing.ease,
  },
};

export const tapScale = {
  scale: 0.95,
  transition: {
    duration: ANIMATION_CONFIG.duration.fast,
    ease: ANIMATION_CONFIG.easing.ease,
  },
};

// Utility function to create custom fade variants
export const createFadeVariant = (
  direction: "up" | "down" | "left" | "right" = "up",
  distance: number = 60,
  duration: number = ANIMATION_CONFIG.duration.normal
): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: -distance };
      case "right":
        return { x: distance };
      default:
        return { y: distance };
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: ANIMATION_CONFIG.easing.smooth,
      },
    },
  };
};

// Enhanced animation configuration based on device performance and user preferences
export const adaptiveAnimationConfig = {
  /**
   * Get device performance tier
   */
  getPerformanceTier: (): 'low' | 'medium' | 'high' => {
    if (typeof window === 'undefined') return 'medium';
    
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 1;
    const connection = (navigator as unknown as { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    
    // Check for slow connection
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g' ||
      connection.saveData
    );
    
    if (isSlowConnection) return 'low';
    
    if (hardwareConcurrency >= 8 && memory >= 4) {
      return 'high';
    } else if (hardwareConcurrency >= 4 && memory >= 2) {
      return 'medium';
    } else {
      return 'low';
    }
  },

  /**
   * Get optimal animation settings based on performance and preferences
   */
  getOptimalSettings: () => {
    if (typeof window === 'undefined') {
      return ANIMATION_CONFIG;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tier = adaptiveAnimationConfig.getPerformanceTier();
    
    if (prefersReducedMotion) {
      return {
        ...ANIMATION_CONFIG,
        duration: {
          fast: 0.1,
          normal: 0.1,
          slow: 0.1,
        },
        stagger: {
          fast: 0,
          normal: 0,
          slow: 0,
        },
      };
    }

    switch (tier) {
      case 'high':
        return ANIMATION_CONFIG;
      case 'medium':
        return {
          ...ANIMATION_CONFIG,
          duration: {
            fast: 0.2,
            normal: 0.4,
            slow: 0.6,
          },
          stagger: {
            fast: 0.03,
            normal: 0.05,
            slow: 0.1,
          },
        };
      case 'low':
        return {
          ...ANIMATION_CONFIG,
          duration: {
            fast: 0.1,
            normal: 0.2,
            slow: 0.3,
          },
          stagger: {
            fast: 0.01,
            normal: 0.02,
            slow: 0.05,
          },
        };
      default:
        return ANIMATION_CONFIG;
    }
  },
};

// Utility function for reduced motion support with performance adaptation
export const getReducedMotionVariant = (variant: Variants): Variants => {
  if (typeof window === 'undefined') return variant;
  
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const performanceTier = adaptiveAnimationConfig.getPerformanceTier();
  
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.1 } },
    };
  }
  
  // Simplify animations for low-performance devices
  if (performanceTier === 'low') {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { 
          duration: 0.2,
          ease: ANIMATION_CONFIG.easing.ease 
        } 
      },
    };
  }
  
  return variant;
};

// Enhanced motion utilities
export const motionUtils = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Check if device has low performance
   */
  isLowPerformanceDevice: (): boolean => {
    return adaptiveAnimationConfig.getPerformanceTier() === 'low';
  },

  /**
   * Get animation duration based on preferences and performance
   */
  getAnimationDuration: (baselineMs: number): number => {
    if (motionUtils.prefersReducedMotion()) return 100;
    
    const tier = adaptiveAnimationConfig.getPerformanceTier();
    switch (tier) {
      case 'high': return baselineMs;
      case 'medium': return baselineMs * 0.7;
      case 'low': return baselineMs * 0.3;
      default: return baselineMs;
    }
  },

  /**
   * Get stagger delay based on performance
   */
  getStaggerDelay: (baselineMs: number): number => {
    if (motionUtils.prefersReducedMotion()) return 0;
    
    const tier = adaptiveAnimationConfig.getPerformanceTier();
    switch (tier) {
      case 'high': return baselineMs;
      case 'medium': return baselineMs * 0.5;
      case 'low': return baselineMs * 0.2;
      default: return baselineMs;
    }
  },

  /**
   * Should enable complex animations
   */
  shouldEnableComplexAnimations: (): boolean => {
    if (motionUtils.prefersReducedMotion()) return false;
    return adaptiveAnimationConfig.getPerformanceTier() !== 'low';
  },

  /**
   * Get optimal easing based on performance
   */
  getOptimalEasing: () => {
    const tier = adaptiveAnimationConfig.getPerformanceTier();
    return tier === 'low' ? ANIMATION_CONFIG.easing.ease : ANIMATION_CONFIG.easing.smooth;
  },
};