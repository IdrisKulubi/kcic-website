'use client';

import { useAccessibility } from '@/contexts/accessibility-context';
import { cn } from '@/lib/utils';

/**
 * Hook to get accessibility-aware CSS classes
 * This hook provides classes that automatically adjust based on user accessibility settings
 */
export function useAccessibilityClasses() {
  const {
    getFontSizeClass,
    getLineHeightClass,
    getLetterSpacingClass,
    getTextAlignmentClass,
    settings,
  } = useAccessibility();

  /**
   * Get base accessibility classes that should be applied to text elements
   */
  const getBaseClasses = () => {
    return cn(
      'accessibility-enhanced',
      getFontSizeClass(),
      getLineHeightClass(),
      getLetterSpacingClass(),
      getTextAlignmentClass()
    );
  };

  /**
   * Get classes for headings with proper hierarchy
   */
  const getHeadingClasses = (level: 1 | 2 | 3 | 4 | 5 | 6, additionalClasses?: string) => {
    return cn(
      getBaseClasses(),
      `accessibility-heading-${level}`,
      additionalClasses
    );
  };

  /**
   * Get classes for body text
   */
  const getBodyTextClasses = (additionalClasses?: string) => {
    return cn(
      getBaseClasses(),
      'accessibility-body-text',
      additionalClasses
    );
  };

  /**
   * Get classes for interactive elements (buttons, links)
   */
  const getInteractiveClasses = (additionalClasses?: string) => {
    return cn(
      getBaseClasses(),
      'accessibility-interactive',
      settings.focusIndicators && 'accessibility-enhanced-focus',
      additionalClasses
    );
  };

  /**
   * Get classes for form elements
   */
  const getFormClasses = (additionalClasses?: string) => {
    return cn(
      getBaseClasses(),
      'accessibility-form-element',
      settings.focusIndicators && 'accessibility-enhanced-focus',
      additionalClasses
    );
  };

  /**
   * Get classes for containers that should respect text alignment
   */
  const getContainerClasses = (additionalClasses?: string) => {
    return cn(
      getTextAlignmentClass(),
      additionalClasses
    );
  };

  /**
   * Get classes for images based on accessibility settings
   */
  const getImageClasses = (additionalClasses?: string) => {
    return cn(
      settings.hideImages && 'accessibility-hidden-image',
      additionalClasses
    );
  };

  /**
   * Get classes for animations based on motion preferences
   */
  const getAnimationClasses = (normalClasses: string, reducedClasses?: string) => {
    if (settings.reducedMotion || settings.pauseAnimations) {
      return reducedClasses || '';
    }
    return normalClasses;
  };

  /**
   * Check if animations should be disabled
   */
  const shouldDisableAnimations = () => {
    return settings.reducedMotion || settings.pauseAnimations;
  };

  /**
   * Get motion-safe classes that respect user preferences
   */
  const getMotionSafeClasses = (animationClasses: string, staticClasses?: string) => {
    return shouldDisableAnimations() ? (staticClasses || '') : animationClasses;
  };

  /**
   * Get contrast-aware classes
   */
  const getContrastClasses = (normalClasses: string, highContrastClasses?: string) => {
    return settings.highContrast ? (highContrastClasses || normalClasses) : normalClasses;
  };

  return {
    // Class getters
    getBaseClasses,
    getHeadingClasses,
    getBodyTextClasses,
    getInteractiveClasses,
    getFormClasses,
    getContainerClasses,
    getImageClasses,
    getAnimationClasses,
    getMotionSafeClasses,
    getContrastClasses,
    
    // Utility functions
    shouldDisableAnimations,
    
    // Direct access to individual class functions
    getFontSizeClass,
    getLineHeightClass,
    getLetterSpacingClass,
    getTextAlignmentClass,
    
    // Settings access
    settings,
  };
}