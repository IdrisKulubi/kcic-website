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
 * Primary Pantone Colors
 * These are the core brand colors used throughout the application
 */
export const colors = {
  primary: {
    // Primary Green - C:50.2 M:0 Y:96.9 K:0
    green: {
      DEFAULT: '#7FD134', // Converted from CMYK
      50: '#F3FBE8',
      100: '#E7F7D1',
      200: '#CEEFA3',
      300: '#B6E774',
      400: '#9DDC4D',
      500: '#7FD134',
      600: '#66B027',
      700: '#4D841D',
      800: '#335714',
      900: '#1A2B0A',
    },
    
    // Primary Cyan - C:100 M:0 Y:0 K:0
    cyan: {
      DEFAULT: '#00FFFF',
      50: '#E6FFFF',
      100: '#CCFFFF',
      200: '#99FFFF',
      300: '#66FFFF',
      400: '#33FFFF',
      500: '#00FFFF',
      600: '#00CCCC',
      700: '#009999',
      800: '#006666',
      900: '#003333',
    },
  },
  
  secondary: {
    // Secondary Gray - C:0 M:0 Y:0 K:50
    gray: {
      DEFAULT: '#808080',
      50: '#F7F7F7',
      100: '#E5E5E5',
      200: '#CCCCCC',
      300: '#B3B3B3',
      400: '#999999',
      500: '#808080',
      600: '#666666',
      700: '#4D4D4D',
      800: '#333333',
      900: '#1A1A1A',
    },
  },
  
  // Gradient combinations for visual interest
  gradients: {
    primary: 'linear-gradient(135deg, #7FD134 0%, #00FFFF 100%)',
    secondary: 'linear-gradient(135deg, #00FFFF 0%, #808080 100%)',
    vibrant: 'linear-gradient(135deg, #7FD134 0%, #00FFFF 50%, #7FD134 100%)',
    subtle: 'linear-gradient(135deg, rgba(127, 209, 52, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)',
    glow: 'radial-gradient(circle, rgba(127, 209, 52, 0.3) 0%, transparent 70%)',
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
    success: '#7FD134',
    info: '#00FFFF',
    warning: '#FFA500',
    error: '#FF4444',
  },
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

/**
 * Typography configuration based on Gotham font family
 * Fallback to Century Gothic as specified
 */
export const typography = {
  // Font families
  fonts: {
    primary: '"Gotham", "Century Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    heading: '"Gotham Bold", "Century Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Gotham Book", "Century Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
  },
  
  // Font weights mapping to Gotham variants
  weights: {
    thin: 100,       // Gotham Thin
    light: 300,      // Gotham Light
    book: 400,       // Gotham Book
    medium: 500,     // Gotham Medium
    bold: 700,       // Gotham Bold
    black: 900,      // Gotham Black
  },
  
  // Font sizes with responsive scaling
  sizes: {
    // Display sizes for hero sections
    display: {
      '2xl': 'clamp(3rem, 8vw, 6rem)',
      xl: 'clamp(2.5rem, 6vw, 4.5rem)',
      lg: 'clamp(2rem, 5vw, 3.5rem)',
    },
    
    // Heading sizes
    heading: {
      h1: 'clamp(2rem, 4vw, 3rem)',
      h2: 'clamp(1.75rem, 3.5vw, 2.5rem)',
      h3: 'clamp(1.5rem, 3vw, 2rem)',
      h4: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      h5: 'clamp(1.125rem, 2vw, 1.5rem)',
      h6: 'clamp(1rem, 1.5vw, 1.25rem)',
    },
    
    // Body text sizes
    body: {
      xl: '1.25rem',
      lg: '1.125rem',
      base: '1rem',
      sm: '0.875rem',
      xs: '0.75rem',
    },
    
    // Special sizes for stats
    stats: {
      value: 'clamp(2.5rem, 5vw, 4rem)',
      label: 'clamp(0.875rem, 1.5vw, 1.125rem)',
      suffix: 'clamp(1.5rem, 3vw, 2.5rem)',
    },
  },
  
  // Line heights
  lineHeights: {
    tight: 1.1,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.7,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
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
      green: '0 0 40px rgba(127, 209, 52, 0.3)',
      cyan: '0 0 40px rgba(0, 255, 255, 0.3)',
      mixed: '0 0 40px rgba(127, 209, 52, 0.2), 0 0 60px rgba(0, 255, 255, 0.2)',
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
    
    Object.entries(colors.primary.cyan).forEach(([key, value]) => {
      if (key !== 'DEFAULT') {
        cssVars[`--color-cyan-${key}`] = value;
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
export default {
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
