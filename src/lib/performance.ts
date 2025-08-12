// Performance monitoring utilities

export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

// Web Vitals measurement
export function measureWebVitals() {
  if (typeof window === 'undefined') return;

  const metrics: PerformanceMetrics = {};

  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        metrics.lcp = lastEntry.startTime;
        console.log('LCP:', metrics.lcp);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP measurement failed:', e);
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEntry & { processingStart: number; startTime: number };
          metrics.fid = fidEntry.processingStart - fidEntry.startTime;
          console.log('FID:', metrics.fid);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID measurement failed:', e);
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        });
        metrics.cls = clsValue;
        console.log('CLS:', metrics.cls);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS measurement failed:', e);
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fcpEntry = entry as PerformanceEntry & { name: string; startTime: number };
          if (fcpEntry.name === 'first-contentful-paint') {
            metrics.fcp = fcpEntry.startTime;
            console.log('FCP:', metrics.fcp);
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('FCP measurement failed:', e);
    }
  }

  // Time to First Byte (TTFB)
  if ('performance' in window && 'getEntriesByType' in performance) {
    try {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0];
        metrics.ttfb = entry.responseStart - entry.requestStart;
        console.log('TTFB:', metrics.ttfb);
      }
    } catch (e) {
      console.warn('TTFB measurement failed:', e);
    }
  }

  return metrics;
}

// Resource loading performance
export function measureResourcePerformance() {
  if (typeof window === 'undefined') return;

  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const imageResources = resources.filter(resource => 
      resource.initiatorType === 'img' || 
      resource.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)
    );

    const scriptResources = resources.filter(resource => 
      resource.initiatorType === 'script'
    );

    const styleResources = resources.filter(resource => 
      resource.initiatorType === 'link' && resource.name.includes('.css')
    );

    console.group('Resource Performance');
    console.log('Images:', imageResources.length, 'Total size:', 
      imageResources.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024, 'KB');
    console.log('Scripts:', scriptResources.length, 'Total size:', 
      scriptResources.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024, 'KB');
    console.log('Styles:', styleResources.length, 'Total size:', 
      styleResources.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024, 'KB');
    console.groupEnd();

    return {
      images: imageResources,
      scripts: scriptResources,
      styles: styleResources
    };
  }
}

// Memory usage monitoring
export function measureMemoryUsage() {
  if (typeof window === 'undefined') return;

  interface PerformanceMemory {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  }

  if ('performance' in window && 'memory' in (performance as Performance & { memory: PerformanceMemory })) {
    const memory = (performance as Performance & { memory: PerformanceMemory }).memory;
    console.group('Memory Usage');
    console.log('Used:', Math.round(memory.usedJSHeapSize / 1048576), 'MB');
    console.log('Total:', Math.round(memory.totalJSHeapSize / 1048576), 'MB');
    console.log('Limit:', Math.round(memory.jsHeapSizeLimit / 1048576), 'MB');
    console.groupEnd();

    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit
    };
  }
}

// Animation performance monitoring
export function measureAnimationPerformance() {
  if (typeof window === 'undefined') return;

  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 0;

  function measureFPS() {
    const currentTime = performance.now();
    frameCount++;

    if (currentTime - lastTime >= 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      console.log('FPS:', fps);
      frameCount = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(measureFPS);
  }

  requestAnimationFrame(measureFPS);

  return { getFPS: () => fps };
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Only run in development or when explicitly enabled
  if (process.env.NODE_ENV === 'development' || 
      localStorage.getItem('enablePerformanceMonitoring') === 'true') {
    
    console.log('🚀 Performance monitoring enabled');
    
    // Measure Web Vitals
    measureWebVitals();
    
    // Measure resources after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        measureResourcePerformance();
        measureMemoryUsage();
      }, 1000);
    });

    // Start FPS monitoring
    measureAnimationPerformance();
  }
}

// Utility to check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Utility to check connection quality
export function getConnectionQuality(): 'slow' | 'fast' | 'unknown' {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }

  interface NetworkInformation {
    effectiveType: string;
    downlink: number;
  }

  const connection = (navigator as Navigator & { connection: NetworkInformation }).connection;
  
  if (connection.effectiveType === '4g' && connection.downlink > 10) {
    return 'fast';
  } else if (connection.effectiveType === '3g' || connection.downlink < 1.5) {
    return 'slow';
  }
  
  return 'unknown';
}