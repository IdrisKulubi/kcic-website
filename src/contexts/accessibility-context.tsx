'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Font size scale options
export const FONT_SCALES = {
  xs: { scale: 0.8, label: 'Extra Small', value: 'xs' },
  sm: { scale: 0.9, label: 'Small', value: 'sm' },
  base: { scale: 1.0, label: 'Normal', value: 'base' },
  lg: { scale: 1.1, label: 'Large', value: 'lg' },
  xl: { scale: 1.25, label: 'Extra Large', value: 'xl' },
  '2xl': { scale: 1.5, label: 'Double Large', value: '2xl' },
} as const;

// Line height options
export const LINE_HEIGHTS = {
  tight: { scale: 1.2, label: 'Tight', value: 'tight' },
  normal: { scale: 1.4, label: 'Normal', value: 'normal' },
  relaxed: { scale: 1.6, label: 'Relaxed', value: 'relaxed' },
  loose: { scale: 1.8, label: 'Loose', value: 'loose' },
} as const;

// Letter spacing options
export const LETTER_SPACINGS = {
  tight: { scale: -0.025, label: 'Tight', value: 'tight' },
  normal: { scale: 0, label: 'Normal', value: 'normal' },
  wide: { scale: 0.025, label: 'Wide', value: 'wide' },
  wider: { scale: 0.05, label: 'Wider', value: 'wider' },
} as const;

// Text alignment options
export const TEXT_ALIGNMENTS = {
  left: { label: 'Left', value: 'left' },
  center: { label: 'Center', value: 'center' },
  right: { label: 'Right', value: 'right' },
  justify: { label: 'Justify', value: 'justify' },
} as const;

export type FontScale = keyof typeof FONT_SCALES;
export type LineHeight = keyof typeof LINE_HEIGHTS;
export type LetterSpacing = keyof typeof LETTER_SPACINGS;
export type TextAlignment = keyof typeof TEXT_ALIGNMENTS;

interface AccessibilitySettings {
  fontSize: FontScale;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  textAlignment: TextAlignment;
  highContrast: boolean;
  reducedMotion: boolean;
  focusIndicators: boolean;
  readableFont: boolean;
  hideImages: boolean;
  pauseAnimations: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
  getFontSizeClass: () => string;
  getLineHeightClass: () => string;
  getLetterSpacingClass: () => string;
  getTextAlignmentClass: () => string;
  isAccessibilityPanelOpen: boolean;
  setAccessibilityPanelOpen: (open: boolean) => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'base',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  textAlignment: 'left',
  highContrast: false,
  reducedMotion: false,
  focusIndicators: true,
  readableFont: false,
  hideImages: false,
  pauseAnimations: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = 'kcic-accessibility-settings';

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isAccessibilityPanelOpen, setAccessibilityPanelOpen] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.warn('Failed to load accessibility settings:', error);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save accessibility settings:', error);
    }
  }, [settings]);

  // Apply CSS custom properties based on settings
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size scaling
    const fontScale = FONT_SCALES[settings.fontSize].scale;
    root.style.setProperty('--accessibility-font-scale', fontScale.toString());
    
    // Line height
    const lineHeightScale = LINE_HEIGHTS[settings.lineHeight].scale;
    root.style.setProperty('--accessibility-line-height', lineHeightScale.toString());
    
    // Letter spacing
    const letterSpacingScale = LETTER_SPACINGS[settings.letterSpacing].scale;
    root.style.setProperty('--accessibility-letter-spacing', `${letterSpacingScale}em`);
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('accessibility-reduced-motion');
    } else {
      root.classList.remove('accessibility-reduced-motion');
    }
    
    // Enhanced focus indicators
    if (settings.focusIndicators) {
      root.classList.add('accessibility-enhanced-focus');
    } else {
      root.classList.remove('accessibility-enhanced-focus');
    }
    
    // Readable font
    if (settings.readableFont) {
      root.classList.add('accessibility-readable-font');
    } else {
      root.classList.remove('accessibility-readable-font');
    }
    
    // Hide images
    if (settings.hideImages) {
      root.classList.add('accessibility-hide-images');
    } else {
      root.classList.remove('accessibility-hide-images');
    }
    
    // Pause animations
    if (settings.pauseAnimations) {
      root.classList.add('accessibility-pause-animations');
    } else {
      root.classList.remove('accessibility-pause-animations');
    }
    
    // Text alignment
    root.style.setProperty('--accessibility-text-align', settings.textAlignment);
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const getFontSizeClass = useCallback(() => {
    return `accessibility-font-${settings.fontSize}`;
  }, [settings.fontSize]);

  const getLineHeightClass = useCallback(() => {
    return `accessibility-line-height-${settings.lineHeight}`;
  }, [settings.lineHeight]);

  const getLetterSpacingClass = useCallback(() => {
    return `accessibility-letter-spacing-${settings.letterSpacing}`;
  }, [settings.letterSpacing]);

  const getTextAlignmentClass = useCallback(() => {
    return `accessibility-text-${settings.textAlignment}`;
  }, [settings.textAlignment]);

  const value: AccessibilityContextType = {
    settings,
    updateSetting,
    resetSettings,
    getFontSizeClass,
    getLineHeightClass,
    getLetterSpacingClass,
    getTextAlignmentClass,
    isAccessibilityPanelOpen,
    setAccessibilityPanelOpen,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    console.error('useAccessibility must be used within an AccessibilityProvider');
    // Return a default context to prevent crashes
    return {
      settings: defaultSettings,
      updateSetting: () => {},
      resetSettings: () => {},
      getFontSizeClass: () => 'accessibility-font-base',
      getLineHeightClass: () => 'accessibility-line-height-normal',
      getLetterSpacingClass: () => 'accessibility-letter-spacing-normal',
      getTextAlignmentClass: () => 'accessibility-text-left',
      isAccessibilityPanelOpen: false,
      setAccessibilityPanelOpen: () => {},
    };
  }
  return context;
}