/**
 * Accessibility utilities and constants
 * Provides reusable functions and configurations for accessibility features
 */

// ARIA roles and labels
export const ARIA_ROLES = {
  navigation: 'navigation',
  main: 'main',
  banner: 'banner',
  contentinfo: 'contentinfo',
  complementary: 'complementary',
  region: 'region',
  button: 'button',
  link: 'link',
  heading: 'heading',
  list: 'list',
  listitem: 'listitem',
  article: 'article',
  section: 'section',
  form: 'form',
  textbox: 'textbox',
  tab: 'tab',
  tabpanel: 'tabpanel',
  tablist: 'tablist',
  dialog: 'dialog',
  alertdialog: 'alertdialog',
  status: 'status',
  alert: 'alert',
  progressbar: 'progressbar',
  slider: 'slider',
  spinbutton: 'spinbutton',
  checkbox: 'checkbox',
  radio: 'radio',
  menubar: 'menubar',
  menu: 'menu',
  menuitem: 'menuitem',
  tooltip: 'tooltip',
  img: 'img',
  presentation: 'presentation',
} as const;

// Common ARIA labels
export const ARIA_LABELS = {
  openMenu: 'Open navigation menu',
  closeMenu: 'Close navigation menu',
  skipToContent: 'Skip to main content',
  backToTop: 'Back to top',
  readMore: 'Read more about',
  learnMore: 'Learn more about',
  viewAll: 'View all',
  previous: 'Previous',
  next: 'Next',
  play: 'Play',
  pause: 'Pause',
  mute: 'Mute',
  unmute: 'Unmute',
  search: 'Search',
  submit: 'Submit',
  close: 'Close',
  expand: 'Expand',
  collapse: 'Collapse',
  loading: 'Loading',
  error: 'Error',
  success: 'Success',
  warning: 'Warning',
  info: 'Information',
} as const;

// Keyboard navigation constants
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

// Focus management utilities
export const focusUtils = {
  /**
   * Get all focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
  },

  /**
   * Trap focus within a container (useful for modals, menus)
   */
  trapFocus: (container: HTMLElement, event: React.KeyboardEvent | KeyboardEvent) => {
    const focusableElements = focusUtils.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === KEYBOARD_KEYS.TAB) {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }
  },

  /**
   * Set focus to the first focusable element in a container
   */
  focusFirst: (container: HTMLElement) => {
    const focusableElements = focusUtils.getFocusableElements(container);
    focusableElements[0]?.focus();
  },

  /**
   * Restore focus to a previously focused element
   */
  restoreFocus: (element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },
};

// Screen reader utilities
export const screenReaderUtils = {
  /**
   * Announce content to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  /**
   * Create visually hidden text for screen readers
   */
  createScreenReaderText: (text: string): string => {
    return text;
  },
};

// Touch target utilities
export const touchTargetUtils = {
  /**
   * Minimum touch target size (44px x 44px as per WCAG guidelines)
   */
  MIN_TOUCH_SIZE: 44,

  /**
   * Get touch-friendly classes for interactive elements
   */
  getTouchClasses: () => 'min-h-[44px] min-w-[44px]',

  /**
   * Validate if an element meets minimum touch target requirements
   */
  validateTouchTarget: (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return rect.width >= touchTargetUtils.MIN_TOUCH_SIZE && 
           rect.height >= touchTargetUtils.MIN_TOUCH_SIZE;
  },
};

// Color contrast utilities
export const colorUtils = {
  /**
   * Focus ring classes that meet accessibility standards
   */
  getFocusRingClasses: () => 'focus:outline-none focus:ring-2 focus:ring-climate-green focus:ring-offset-2',

  /**
   * High contrast focus classes for better visibility
   */
  getHighContrastFocusClasses: () => 'focus:outline-none focus:ring-2 focus:ring-climate-green focus:ring-offset-2 focus:ring-offset-background',
};

// Enhanced reduced motion utilities with performance considerations
export const motionUtils = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Check if device has low performance capabilities
   */
  isLowPerformanceDevice: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 1;
    const connection = (navigator as unknown as { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    
    // Check for slow connection
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g' ||
      connection.saveData
    );
    
    return hardwareConcurrency < 4 || memory < 2 || Boolean(isSlowConnection);
  },

  /**
   * Should disable animations based on user preference or device performance
   */
  shouldDisableAnimations: (): boolean => {
    return motionUtils.prefersReducedMotion() || motionUtils.isLowPerformanceDevice();
  },

  /**
   * Get animation classes that respect reduced motion preference and performance
   */
  getAnimationClasses: (normalClasses: string, reducedClasses: string = '') => {
    return motionUtils.shouldDisableAnimations() ? reducedClasses : normalClasses;
  },

  /**
   * Get safe animation duration (respects reduced motion and performance)
   */
  getSafeAnimationDuration: (normalDuration: number): number => {
    if (motionUtils.prefersReducedMotion()) return 0.1;
    if (motionUtils.isLowPerformanceDevice()) return normalDuration * 0.3;
    return normalDuration;
  },

  /**
   * Get safe stagger delay (respects reduced motion and performance)
   */
  getSafeStaggerDelay: (normalDelay: number): number => {
    if (motionUtils.prefersReducedMotion()) return 0;
    if (motionUtils.isLowPerformanceDevice()) return normalDelay * 0.2;
    return normalDelay;
  },

  /**
   * Create animation config that respects accessibility preferences
   */
  createAccessibleAnimationConfig: (config: {
    duration: number;
    delay?: number;
    stagger?: number;
    easing?: string;
  }) => {
    return {
      duration: motionUtils.getSafeAnimationDuration(config.duration),
      delay: config.delay ? motionUtils.getSafeAnimationDuration(config.delay) : 0,
      stagger: config.stagger ? motionUtils.getSafeStaggerDelay(config.stagger) : 0,
      easing: config.easing || 'ease-out',
    };
  },
};

// Form accessibility utilities
export const formUtils = {
  /**
   * Generate unique IDs for form elements
   */
  generateId: (prefix: string = 'field'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Create accessible form field props
   */
  getFieldProps: (id: string, label: string, required: boolean = false, describedBy?: string) => ({
    id,
    'aria-label': label,
    'aria-required': required,
    'aria-describedby': describedBy,
  }),

  /**
   * Create accessible error message props
   */
  getErrorProps: (fieldId: string, errorId: string) => ({
    id: errorId,
    role: 'alert' as const,
    'aria-live': 'polite' as const,
    'aria-describedby': fieldId,
  }),
};

// Skip link utility
export const skipLinkUtils = {
  /**
   * Create skip link component props
   */
  getSkipLinkProps: (targetId: string) => ({
    href: `#${targetId}`,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-climate-green focus:text-white focus:rounded-md focus:shadow-lg',
    children: ARIA_LABELS.skipToContent,
  }),
};

// Landmark utilities
export const landmarkUtils = {
  /**
   * Get semantic HTML element props for landmarks
   */
  getMainProps: () => ({
    role: ARIA_ROLES.main,
    id: 'main-content',
  }),

  getBannerProps: () => ({
    role: ARIA_ROLES.banner,
  }),

  getNavigationProps: (label?: string) => ({
    role: ARIA_ROLES.navigation,
    'aria-label': label || 'Main navigation',
  }),

  getContentInfoProps: () => ({
    role: ARIA_ROLES.contentinfo,
  }),

  getComplementaryProps: (label?: string) => ({
    role: ARIA_ROLES.complementary,
    'aria-label': label,
  }),

  getRegionProps: (label: string) => ({
    role: ARIA_ROLES.region,
    'aria-label': label,
  }),
};

const accessibilityUtils = {
  ARIA_ROLES,
  ARIA_LABELS,
  KEYBOARD_KEYS,
  focusUtils,
  screenReaderUtils,
  touchTargetUtils,
  colorUtils,
  motionUtils,
  formUtils,
  skipLinkUtils,
  landmarkUtils,
};

export default accessibilityUtils;