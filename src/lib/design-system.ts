/**
 * KCIC Design System
 * ===================
 * Core design tokens and brand guidelines for KCIC website
 * Based on monolithic brand architecture with strong single master brand
 */

// ============================================================================
// COLOR SYSTEM
// ============================================================================

/**
 * Official KCIC Brand Colors
 * Blue: #00addd | Green: #80c738 | Gray: #8b8d90 | White: #ffffff
 */
export const colors = {
  primary: {
    // Brand Green - #80c738
    green: {
      DEFAULT: '#80c738',
      50: '#f3fbe9',
      100: '#e6f7d2',
      200: '#ceefa5',
      300: '#b5e778',
      400: '#9ddf4b',
      500: '#80c738',
      600: '#66a02d',
      700: '#4d7822',
      800: '#335016',
      900: '#1a280b',
    },
    
    // Brand Blue - #00addd
    blue: {
      DEFAULT: '#00addd',
      50: '#e6f8fd',
      100: '#ccf1fb',
      200: '#99e3f7',
      300: '#66d5f3',
      400: '#33c7ef',
      500: '#00addd',
      600: '#008ab1',
      700: '#006885',
      800: '#004558',
      900: '#00232c',
    },
  },
  
  secondary: {
    // Brand Gray - #8b8d90
    gray: {
      DEFAULT: '#8b8d90',
      50: '#f7f7f8',
      100: '#efefef',
      200: '#dfe0e1',
      300: '#cfd0d2',
      400: '#bfc1c3',
      500: '#8b8d90',
      600: '#6f7173',
      700: '#535556',
      800: '#383839',
      900: '#1c1c1d',
    },
  },
  
  // White
  white: '#ffffff',
  
  // Gradient combinations for visual interest
  gradients: {
    primary: 'linear-gradient(135deg, #80c738 0%, #00addd 100%)',
    secondary: 'linear-gradient(135deg, #00addd 0%, #8b8d90 100%)',
    vibrant: 'linear-gradient(135deg, #80c738 0%, #00addd 50%, #80c738 100%)',
    subtle: 'linear-gradient(135deg, rgba(128, 199, 56, 0.1) 0%, rgba(0, 173, 221, 0.1) 100%)',
    glow: 'radial-gradient(circle, rgba(128, 199, 56, 0.3) 0%, transparent 70%)',
  },
  
  // Glassmorphism backgrounds
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    dark: 'rgba(0, 0, 0, 0.1)',
    blur: '12px',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  
  // Semantic colors
  semantic: {
    success: '#80c738',
    info: '#00addd',
    warning: '#FFA500',
    error: '#FF4444',
  },
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

/**
 * Typography configuration based on Geist font family (Next.js optimized)
 * Provides consistent, accessible typography across all sections
 * 
 * Requirements addressed:
 * - 4.1: Maximum 2 font families (Geist Sans for headings, Geist for body)
 * - 4.2: 6 heading levels + 3 body text sizes
 * - 4.3: Consistent line heights (1.2 headings, 1.6 body)
 * - 4.6: Responsive font sizes with mobile scaling (30-40% reduction)
 * - 4.7: Letter spacing for display headings
 */
export const typography = {
  // Font families - Using Geist (loaded via next/font)
  fonts: {
    primary: 'var(--font-geist-sans)',
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  
  // Font weights - Consistent across all sections
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Font sizes with responsive scaling
  // Mobile: 60-70% of desktop (30-40% reduction as per requirements)
  sizes: {
    // Display sizes for hero sections (Requirements 4.2, 4.6)
    display: {
      '2xl': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],      // 40px → 96px
      'xl': ['clamp(2.25rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],    // 36px → 72px
      'lg': ['clamp(1.875rem, 5vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],   // 30px → 56px
      'md': ['clamp(1.5rem, 4vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],    // 24px → 36px
      'sm': ['clamp(1.25rem, 3vw, 1.875rem)', { lineHeight: '1.3', letterSpacing: '-0.02em' }],  // 20px → 30px
    },
    
    // Heading sizes (Requirements 4.2, 4.3, 4.6)
    heading: {
      h1: ['clamp(1.875rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],       // 30px → 48px
      h2: ['clamp(1.5rem, 3.5vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],     // 24px → 40px
      h3: ['clamp(1.25rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '0' }],              // 20px → 32px
      h4: ['clamp(1.125rem, 2.5vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '0' }],        // 18px → 28px
      h5: ['clamp(1rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '0' }],               // 16px → 24px
      h6: ['clamp(0.9375rem, 1.5vw, 1.25rem)', { lineHeight: '1.3', letterSpacing: '0' }],       // 15px → 20px
    },
    
    // Body text sizes (Requirements 4.2, 4.3, 4.6)
    body: {
      xl: ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.6', letterSpacing: '0' }],          // 18px → 20px
      lg: ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.6', letterSpacing: '0' }],           // 16px → 18px
      base: ['clamp(0.9375rem, 1.2vw, 1rem)', { lineHeight: '1.6', letterSpacing: '0' }],        // 15px → 16px
      sm: ['clamp(0.8125rem, 1vw, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0' }],        // 13px → 14px
      xs: ['clamp(0.6875rem, 0.8vw, 0.75rem)', { lineHeight: '1.5', letterSpacing: '0' }],       // 11px → 12px
    },
    
    // Special sizes for stats and metrics (Requirements 4.2, 4.6)
    stats: {
      value: ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],      // 32px → 56px
      label: ['clamp(0.875rem, 1.5vw, 1.125rem)', { lineHeight: '1.4', letterSpacing: '0' }],    // 14px → 18px
      suffix: ['clamp(1.25rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],    // 20px → 32px
    },
  },
  
  // Line heights (Requirement 4.3)
  lineHeights: {
    tight: 1.1,      // For display text and large numbers
    snug: 1.2,       // For headings
    normal: 1.5,     // For UI elements
    relaxed: 1.6,    // For body text (primary)
    loose: 1.7,      // For long-form content
  },
  
  // Letter spacing (Requirement 4.7)
  letterSpacing: {
    tighter: '-0.02em',  // Display headings
    tight: '-0.01em',    // Large headings (h1, h2)
    normal: '0',         // Body text and smaller headings
    wide: '0.025em',     // Uppercase labels
    wider: '0.05em',     // Tracking for small caps
    widest: '0.1em',     // Wide tracking for emphasis
  },
  
  // Utility functions for consistent typography application
  utils: {
    // Get font size with line height and letter spacing
    getTextStyle: (size: string, weight: number = 400) => ({
      fontSize: size,
      fontWeight: weight,
      lineHeight: 'inherit',
      letterSpacing: 'inherit',
    }),
    
    // Get responsive heading styles
    getHeadingStyle: (level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
      const [fontSize, config] = typography.sizes.heading[level];
      return {
        fontSize,
        lineHeight: config.lineHeight,
        letterSpacing: config.letterSpacing,
        fontWeight: 700,
      };
    },
    
    // Get responsive body text styles
    getBodyStyle: (size: 'xl' | 'lg' | 'base' | 'sm' | 'xs' = 'base') => {
      const [fontSize, config] = typography.sizes.body[size];
      return {
        fontSize,
        lineHeight: config.lineHeight,
        letterSpacing: config.letterSpacing,
        fontWeight: 400,
      };
    },
  },
} as const;

// ============================================================================
// SPACING SYSTEM
// ============================================================================

export const spacing = {
  // Base spacing scale
  base: {
    px: '1px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '40': '10rem',
    '48': '12rem',
    '56': '14rem',
    '64': '16rem',
  },
  
  // Container padding
  container: {
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '6rem',
  },
  
  // Section spacing
  section: {
    sm: '3rem',
    md: '5rem',
    lg: '7rem',
    xl: '10rem',
  },
} as const;

// ============================================================================
// ANIMATION SYSTEM
// ============================================================================

export const animations = {
  // Timing functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  
  // Duration presets
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
    
    // Special durations for stats
    counter: '2000ms',
    morph: '1500ms',
    reveal: '800ms',
  },
  
  // Stagger delays for sequential animations
  stagger: {
    fast: 50,
    normal: 100,
    slow: 150,
    slower: 200,
  },
  
  // Spring animations for physics-based motion
  spring: {
    bounce: {
      type: 'spring',
      damping: 15,
      stiffness: 300,
    },
    smooth: {
      type: 'spring',
      damping: 30,
      stiffness: 200,
    },
    slow: {
      type: 'spring',
      damping: 40,
      stiffness: 100,
    },
  },
} as const;

// ============================================================================
// EFFECTS
// ============================================================================

export const effects = {
  // Box shadows
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    
    // Colored shadows
    glow: {
      green: '0 0 40px rgba(128, 199, 56, 0.3)',
      blue: '0 0 40px rgba(0, 173, 221, 0.3)',
      mixed: '0 0 40px rgba(128, 199, 56, 0.2), 0 0 60px rgba(0, 173, 221, 0.2)',
    },
  },
  
  // Border radius
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    full: '9999px',
  },
  
  // Blur values for glassmorphism
  blur: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
  },
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  below: -1,
  base: 0,
  elevated: 10,
  dropdown: 20,
  sticky: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  notification: 80,
  maximum: 99,
} as const;

// ============================================================================
// COMPONENT VARIANTS
// ============================================================================

export const variants = {
  // Button variants
  button: {
    primary: {
      background: colors.gradients.primary,
      color: '#FFFFFF',
      border: 'none',
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: effects.shadows.glow.green,
      },
    },
    secondary: {
      background: 'transparent',
      color: colors.primary.green.DEFAULT,
      border: `2px solid ${colors.primary.green.DEFAULT}`,
      hover: {
        background: colors.primary.green.DEFAULT,
        color: '#FFFFFF',
      },
    },
    ghost: {
      background: 'transparent',
      color: colors.secondary.gray[700],
      border: 'none',
      hover: {
        background: colors.glass.light,
      },
    },
  },
  
  // Card variants
  card: {
    glass: {
      background: colors.glass.light,
      backdropFilter: `blur(${colors.glass.blur})`,
      border: `1px solid ${colors.glass.border}`,
    },
    solid: {
      background: '#FFFFFF',
      border: `1px solid ${colors.secondary.gray[200]}`,
    },
    gradient: {
      background: colors.gradients.subtle,
      border: 'none',
    },
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert Pantone/CMYK to RGB/HEX
 * Note: These are approximate conversions
 */
export const colorUtils = {
  // Get CSS custom properties from design tokens
  getCSSVariables: () => {
    const cssVars: Record<string, string> = {};
    
    // Primary colors
    Object.entries(colors.primary.green).forEach(([key, value]) => {
      if (key !== 'DEFAULT') {
        cssVars[`--color-green-${key}`] = value;
      }
    });
    
    Object.entries(colors.primary.blue).forEach(([key, value]) => {
      if (key !== 'DEFAULT') {
        cssVars[`--color-blue-${key}`] = value;
      }
    });
    
    // Secondary colors
    Object.entries(colors.secondary.gray).forEach(([key, value]) => {
      if (key !== 'DEFAULT') {
        cssVars[`--color-gray-${key}`] = value;
      }
    });
    
    return cssVars;
  },
  
  // Get gradient with opacity
  getGradientWithOpacity: (gradient: string, opacity: number) => {
    return gradient.replace(/rgb/g, 'rgba').replace(/\)/g, `, ${opacity})`);
  },
};

// Export type definitions
export type ColorScheme = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Animations = typeof animations;
export type Effects = typeof effects;

// Default export for convenience
const designSystem = {
  colors,
  typography,
  spacing,
  animations,
  effects,
  breakpoints,
  zIndex,
  variants,
  colorUtils,
};

export default designSystem;
