/**
 * Animation refinement utilities for optimal user experience
 * Provides fine-tuned animation settings based on device capabilities and user preferences
 */

import { Variants } from "framer-motion";
import { ANIMATION_CONFIG } from "./animations";

// Animation quality levels
export type AnimationQuality = 'minimal' | 'reduced' | 'standard' | 'enhanced';

// Device performance metrics
interface DeviceMetrics {
  hardwareConcurrency: number;
  deviceMemory: number;
  connectionType: string;
  isLowPowerMode: boolean;
  supportsHardwareAcceleration: boolean;
}

// Animation preferences
interface AnimationPreferences {
  prefersReducedMotion: boolean;
  quality: AnimationQuality;
  enableParallax: boolean;
  enableComplexAnimations: boolean;
  maxAnimationDuration: number;
}

/**
 * Detect device capabilities and performance metrics
 */
export const detectDeviceMetrics = (): DeviceMetrics => {
  if (typeof window === 'undefined') {
    return {
      hardwareConcurrency: 4,
      deviceMemory: 4,
      connectionType: '4g',
      isLowPowerMode: false,
      supportsHardwareAcceleration: true,
    };
  }

  const connection = (navigator as unknown as { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
  
  // Test hardware acceleration support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const supportsHardwareAcceleration = !!gl;

  // Detect low power mode (iOS Safari)
  const isLowPowerMode = connection?.saveData || false;

  return {
    hardwareConcurrency,
    deviceMemory,
    connectionType: connection?.effectiveType || '4g',
    isLowPowerMode,
    supportsHardwareAcceleration,
  };
};

/**
 * Determine optimal animation quality based on device metrics and user preferences
 */
export const determineAnimationQuality = (metrics: DeviceMetrics): AnimationQuality => {
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return 'minimal';

  // Check for low-end devices
  if (metrics.hardwareConcurrency < 4 || 
      metrics.deviceMemory < 2 || 
      metrics.connectionType === 'slow-2g' || 
      metrics.connectionType === '2g' ||
      metrics.isLowPowerMode ||
      !metrics.supportsHardwareAcceleration) {
    return 'reduced';
  }

  // Check for mid-range devices
  if (metrics.hardwareConcurrency < 8 || metrics.deviceMemory < 4) {
    return 'standard';
  }

  // High-end devices
  return 'enhanced';
};

/**
 * Get animation preferences based on quality level
 */
export const getAnimationPreferences = (quality: AnimationQuality): AnimationPreferences => {
  const basePreferences = {
    prefersReducedMotion: quality === 'minimal',
    quality,
    enableParallax: false,
    enableComplexAnimations: false,
    maxAnimationDuration: 300,
  };

  switch (quality) {
    case 'minimal':
      return {
        ...basePreferences,
        enableParallax: false,
        enableComplexAnimations: false,
        maxAnimationDuration: 100,
      };

    case 'reduced':
      return {
        ...basePreferences,
        enableParallax: false,
        enableComplexAnimations: false,
        maxAnimationDuration: 200,
      };

    case 'standard':
      return {
        ...basePreferences,
        enableParallax: true,
        enableComplexAnimations: false,
        maxAnimationDuration: 400,
      };

    case 'enhanced':
      return {
        ...basePreferences,
        enableParallax: true,
        enableComplexAnimations: true,
        maxAnimationDuration: 600,
      };

    default:
      return basePreferences;
  }
};

/**
 * Create optimized animation variants based on preferences
 */
export const createOptimizedVariants = (
  baseVariants: Variants,
  preferences: AnimationPreferences
): Variants => {
  if (preferences.prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { duration: 0.1 } 
      },
    };
  }

  const optimizedVariants: Variants = {};

  Object.keys(baseVariants).forEach(key => {
    const variant = baseVariants[key];
    
    if (typeof variant === 'object' && variant !== null) {
      optimizedVariants[key] = {
        ...variant,
        transition: {
          ...variant.transition,
          duration: Math.min(
            variant.transition?.duration || ANIMATION_CONFIG.duration.normal,
            preferences.maxAnimationDuration / 1000
          ),
          ease: preferences.quality === 'reduced' ? 
            ANIMATION_CONFIG.easing.ease : 
            ANIMATION_CONFIG.easing.smooth,
        },
      };
    } else {
      optimizedVariants[key] = variant;
    }
  });

  return optimizedVariants;
};

/**
 * Animation timing utilities
 */
export const animationTiming = {
  /**
   * Get optimal duration based on animation type and preferences
   */
  getDuration: (
    animationType: 'micro' | 'entrance' | 'exit' | 'complex',
    preferences: AnimationPreferences
  ): number => {
    if (preferences.prefersReducedMotion) return 0.1;

    const baseDurations = {
      micro: 0.15,
      entrance: 0.3,
      exit: 0.2,
      complex: 0.6,
    };

    const duration = baseDurations[animationType];
    
    switch (preferences.quality) {
      case 'minimal':
        return 0.1;
      case 'reduced':
        return duration * 0.5;
      case 'standard':
        return duration * 0.8;
      case 'enhanced':
        return duration;
      default:
        return duration;
    }
  },

  /**
   * Get optimal stagger delay
   */
  getStaggerDelay: (preferences: AnimationPreferences): number => {
    if (preferences.prefersReducedMotion) return 0;

    switch (preferences.quality) {
      case 'minimal':
        return 0;
      case 'reduced':
        return 0.02;
      case 'standard':
        return 0.05;
      case 'enhanced':
        return 0.1;
      default:
        return 0.05;
    }
  },

  /**
   * Get optimal easing function
   */
  getEasing: (preferences: AnimationPreferences): readonly number[] => {
    switch (preferences.quality) {
      case 'minimal':
      case 'reduced':
        return ANIMATION_CONFIG.easing.ease;
      case 'standard':
      case 'enhanced':
        return ANIMATION_CONFIG.easing.smooth;
      default:
        return ANIMATION_CONFIG.easing.smooth;
    }
  },
};

/**
 * Performance monitoring for animations
 */
export const animationPerformanceMonitor = {
  frameDropThreshold: 5, // Allow up to 5 dropped frames per second
  
  /**
   * Monitor animation performance and adjust quality if needed
   */
  monitorAndAdjust: (callback: (newQuality: AnimationQuality) => void) => {
    let frameCount = 0;
    let droppedFrames = 0;
    let lastFrameTime = performance.now();
    let currentQuality: AnimationQuality = 'enhanced';

    const checkPerformance = (currentTime: number) => {
      frameCount++;
      
      // Check for dropped frames (> 20ms between frames for 50fps minimum)
      if (currentTime - lastFrameTime > 20) {
        droppedFrames++;
      }
      
      lastFrameTime = currentTime;
      
      // Check performance every second
      if (frameCount >= 60) {
        if (droppedFrames > animationPerformanceMonitor.frameDropThreshold) {
          // Reduce quality if too many dropped frames
          switch (currentQuality) {
            case 'enhanced':
              currentQuality = 'standard';
              break;
            case 'standard':
              currentQuality = 'reduced';
              break;
            case 'reduced':
              currentQuality = 'minimal';
              break;
          }
          callback(currentQuality);
        }
        
        // Reset counters
        frameCount = 0;
        droppedFrames = 0;
      }
      
      requestAnimationFrame(checkPerformance);
    };

    requestAnimationFrame(checkPerformance);
  },
};

/**
 * Main animation refinement class
 */
export class AnimationRefinement {
  private metrics: DeviceMetrics;
  private quality: AnimationQuality;
  private preferences: AnimationPreferences;

  constructor() {
    this.metrics = detectDeviceMetrics();
    this.quality = determineAnimationQuality(this.metrics);
    this.preferences = getAnimationPreferences(this.quality);
  }

  /**
   * Get current animation preferences
   */
  getPreferences(): AnimationPreferences {
    return this.preferences;
  }

  /**
   * Update animation quality (useful for runtime adjustments)
   */
  updateQuality(newQuality: AnimationQuality): void {
    this.quality = newQuality;
    this.preferences = getAnimationPreferences(newQuality);
  }

  /**
   * Create optimized variants for Framer Motion
   */
  optimizeVariants(baseVariants: Variants): Variants {
    return createOptimizedVariants(baseVariants, this.preferences);
  }

  /**
   * Get timing configuration
   */
  getTiming() {
    return {
      micro: animationTiming.getDuration('micro', this.preferences),
      entrance: animationTiming.getDuration('entrance', this.preferences),
      exit: animationTiming.getDuration('exit', this.preferences),
      complex: animationTiming.getDuration('complex', this.preferences),
      stagger: animationTiming.getStaggerDelay(this.preferences),
      easing: animationTiming.getEasing(this.preferences),
    };
  }

  /**
   * Check if specific animation types should be enabled
   */
  shouldEnable(animationType: 'parallax' | 'complex' | 'stagger' | 'hover'): boolean {
    switch (animationType) {
      case 'parallax':
        return this.preferences.enableParallax;
      case 'complex':
        return this.preferences.enableComplexAnimations;
      case 'stagger':
        return this.quality !== 'minimal';
      case 'hover':
        return this.quality !== 'minimal' && this.quality !== 'reduced';
      default:
        return true;
    }
  }
}

// Global animation refinement instance
export const animationRefinement = new AnimationRefinement();