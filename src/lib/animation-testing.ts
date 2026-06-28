/**
 * Animation testing utilities and performance monitoring
 * Provides tools to test animations across different devices and browsers
 */

// Performance monitoring utilities
export const animationPerformance = {
  /**
   * Monitor frame rate during animations
   */
  monitorFrameRate: (callback: (fps: number) => void) => {
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 0;

    const measureFPS = (currentTime: number) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        callback(fps);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  },

  /**
   * Check if device supports hardware acceleration
   */
  supportsHardwareAcceleration: (): boolean => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  },

  /**
   * Detect device performance tier
   */
  getDevicePerformanceTier: (): 'low' | 'medium' | 'high' => {
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 1;
    const supportsWebGL = animationPerformance.supportsHardwareAcceleration();

    if (hardwareConcurrency >= 8 && memory >= 4 && supportsWebGL) {
      return 'high';
    } else if (hardwareConcurrency >= 4 && memory >= 2 && supportsWebGL) {
      return 'medium';
    } else {
      return 'low';
    }
  },

  /**
   * Get optimal animation settings based on device performance
   */
  getOptimalAnimationSettings: () => {
    const tier = animationPerformance.getDevicePerformanceTier();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return {
        enableAnimations: false,
        duration: 0.1,
        stagger: 0,
        complexity: 'minimal' as const,
      };
    }

    switch (tier) {
      case 'high':
        return {
          enableAnimations: true,
          duration: 0.6,
          stagger: 0.1,
          complexity: 'full' as const,
        };
      case 'medium':
        return {
          enableAnimations: true,
          duration: 0.4,
          stagger: 0.05,
          complexity: 'reduced' as const,
        };
      case 'low':
        return {
          enableAnimations: true,
          duration: 0.2,
          stagger: 0.02,
          complexity: 'minimal' as const,
        };
      default:
        return {
          enableAnimations: false,
          duration: 0.1,
          stagger: 0,
          complexity: 'minimal' as const,
        };
    }
  },
};

// Browser compatibility testing
export const browserCompatibility = {
  /**
   * Check if browser supports CSS transforms
   */
  supportsTransforms: (): boolean => {
    const testElement = document.createElement('div');
    const transforms = [
      'transform',
      'WebkitTransform',
      'MozTransform',
      'msTransform',
      'OTransform'
    ];
    
    return transforms.some(transform => 
      (testElement.style as unknown as Record<string, unknown>)[transform] !== undefined
    );
  },

  /**
   * Check if browser supports CSS animations
   */
  supportsCSSAnimations: (): boolean => {
    const testElement = document.createElement('div');
    const animations = [
      'animation',
      'WebkitAnimation',
      'MozAnimation',
      'msAnimation',
      'OAnimation'
    ];
    
    return animations.some(animation => 
      (testElement.style as unknown as Record<string, unknown>)[animation] !== undefined
    );
  },

  /**
   * Check if browser supports Intersection Observer
   */
  supportsIntersectionObserver: (): boolean => {
    return 'IntersectionObserver' in window;
  },

  /**
   * Check if browser supports requestAnimationFrame
   */
  supportsRequestAnimationFrame: (): boolean => {
    return 'requestAnimationFrame' in window;
  },

  /**
   * Get browser compatibility score
   */
  getCompatibilityScore: (): number => {
    let score = 0;
    
    if (browserCompatibility.supportsTransforms()) score += 25;
    if (browserCompatibility.supportsCSSAnimations()) score += 25;
    if (browserCompatibility.supportsIntersectionObserver()) score += 25;
    if (browserCompatibility.supportsRequestAnimationFrame()) score += 25;
    
    return score;
  },
};

// Animation testing utilities
export const animationTesting = {
  /**
   * Test animation smoothness
   */
  testAnimationSmoothness: (element: HTMLElement, duration: number = 1000): Promise<boolean> => {
    return new Promise((resolve) => {
      // let frameCount = 0;
      const startTime = performance.now();
      let lastFrameTime = startTime;
      let droppedFrames = 0;
      
      const testAnimation = (currentTime: number) => {
        // frameCount++;
        
        // Check for dropped frames (> 16.67ms between frames for 60fps)
        if (currentTime - lastFrameTime > 20) {
          droppedFrames++;
        }
        
        lastFrameTime = currentTime;
        
        if (currentTime - startTime < duration) {
          requestAnimationFrame(testAnimation);
        } else {
          const expectedFrames = Math.floor(duration / 16.67); // 60fps
          const frameDropPercentage = (droppedFrames / expectedFrames) * 100;
          
          // Consider smooth if less than 10% frames dropped
          resolve(frameDropPercentage < 10);
        }
      };
      
      // Start a simple transform animation for testing
      element.style.transform = 'translateX(100px)';
      element.style.transition = `transform ${duration}ms ease-out`;
      
      requestAnimationFrame(testAnimation);
      
      // Reset after test
      setTimeout(() => {
        element.style.transform = '';
        element.style.transition = '';
      }, duration + 100);
    });
  },

  /**
   * Test scroll performance
   */
  testScrollPerformance: (): Promise<number> => {
    return new Promise((resolve) => {
      let frameCount = 0;
      const startTime = performance.now();
      const testDuration = 2000; // 2 seconds
      
      const scrollHandler = () => {
        frameCount++;
      };
      
      const measurePerformance = () => {
        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // Simulate scroll events
        let scrollPosition = 0;
        const scrollInterval = setInterval(() => {
          scrollPosition += 10;
          window.scrollTo(0, scrollPosition);
        }, 16); // ~60fps
        
        setTimeout(() => {
          clearInterval(scrollInterval);
          window.removeEventListener('scroll', scrollHandler);
          
          const endTime = performance.now();
          const actualDuration = endTime - startTime;
          const fps = (frameCount / actualDuration) * 1000;
          
          resolve(fps);
        }, testDuration);
      };
      
      measurePerformance();
    });
  },

  /**
   * Test memory usage during animations
   */
  testMemoryUsage: (): Promise<number> => {
    return new Promise((resolve) => {
      if ('memory' in performance) {
        const initialMemory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0;
        
        // Run some animations and measure memory after
        setTimeout(() => {
          const finalMemory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0;
          const memoryIncrease = finalMemory - initialMemory;
          resolve(memoryIncrease);
        }, 3000);
      } else {
        resolve(0); // Memory API not available
      }
    });
  },
};

// Accessibility testing for animations
export const animationAccessibility = {
  /**
   * Test if reduced motion is respected
   */
  testReducedMotionSupport: (): boolean => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if animations are actually disabled when reduced motion is preferred
    if (prefersReducedMotion) {
      const testElement = document.createElement('div');
      testElement.style.transition = 'transform 1s';
      testElement.style.transform = 'translateX(100px)';
      
      document.body.appendChild(testElement);
      
      // Check computed style after a brief delay
      setTimeout(() => {
        const computedStyle = window.getComputedStyle(testElement);
        const transitionDuration = computedStyle.transitionDuration;
        
        document.body.removeChild(testElement);
        
        // Should have very short or no transition when reduced motion is preferred
        return parseFloat(transitionDuration) < 0.2;
      }, 100);
    }
    
    return true;
  },

  /**
   * Test focus visibility during animations
   */
  testFocusVisibility: (element: HTMLElement): boolean => {
    element.focus();
    const computedStyle = window.getComputedStyle(element, ':focus');
    
    // Check if focus ring is visible
    const outline = computedStyle.outline;
    const boxShadow = computedStyle.boxShadow;
    
    return outline !== 'none' || boxShadow !== 'none';
  },

  /**
   * Test if animations don't interfere with screen readers
   */
  testScreenReaderCompatibility: (element: HTMLElement): boolean => {
    // Check if element has proper ARIA attributes during animation
    const hasAriaLabel = element.hasAttribute('aria-label');
    const hasAriaLive = element.hasAttribute('aria-live');
    const hasAriaHidden = element.hasAttribute('aria-hidden');
    
    // Animated decorative elements should have aria-hidden
    // Interactive elements should have proper labels
    return hasAriaLabel || hasAriaLive || hasAriaHidden;
  },
};

// Comprehensive animation test suite
export const runAnimationTestSuite = async () => {
  const results = {
    performance: {
      deviceTier: animationPerformance.getDevicePerformanceTier(),
      hardwareAcceleration: animationPerformance.supportsHardwareAcceleration(),
      optimalSettings: animationPerformance.getOptimalAnimationSettings(),
    },
    compatibility: {
      score: browserCompatibility.getCompatibilityScore(),
      transforms: browserCompatibility.supportsTransforms(),
      cssAnimations: browserCompatibility.supportsCSSAnimations(),
      intersectionObserver: browserCompatibility.supportsIntersectionObserver(),
      requestAnimationFrame: browserCompatibility.supportsRequestAnimationFrame(),
    },
    accessibility: {
      reducedMotionSupport: animationAccessibility.testReducedMotionSupport(),
    },
    timing: {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    },
  };

  console.log('Animation Test Suite Results:', results);
  return results;
};