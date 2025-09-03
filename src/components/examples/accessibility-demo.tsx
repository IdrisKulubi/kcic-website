'use client';

import React from 'react';
import { 
  AccessibleHeading,
  AccessibleText,
  AccessibleButton,
  AccessibleContainer,
} from '@/components/accessibility';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Demo component showing how to use the accessibility system
 * This component demonstrates various accessibility features and best practices
 */
export function AccessibilityDemo() {
  const { 
    settings, 
    getMotionSafeClasses,
    shouldDisableAnimations 
  } = useAccessibilityClasses();

  return (
    <AccessibleContainer className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Demo Header */}
      <div className="text-center space-y-4">
        <AccessibleHeading level={1} className="text-4xl font-bold text-climate-green">
          Accessibility Features Demo
        </AccessibleHeading>
        <AccessibleText className="text-lg text-muted-foreground">
          This page demonstrates the accessibility features available on the KCIC website.
          Try adjusting the accessibility settings using the button in the bottom-right corner.
        </AccessibleText>
      </div>

      {/* Current Settings Display */}
      <Card>
        <CardHeader>
          <CardTitle>Current Accessibility Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <AccessibleText className="font-medium">Font Size</AccessibleText>
              <Badge variant="secondary">{settings.fontSize}</Badge>
            </div>
            <div className="space-y-2">
              <AccessibleText className="font-medium">Line Height</AccessibleText>
              <Badge variant="secondary">{settings.lineHeight}</Badge>
            </div>
            <div className="space-y-2">
              <AccessibleText className="font-medium">Letter Spacing</AccessibleText>
              <Badge variant="secondary">{settings.letterSpacing}</Badge>
            </div>
            <div className="space-y-2">
              <AccessibleText className="font-medium">Text Alignment</AccessibleText>
              <Badge variant="secondary">{settings.textAlignment}</Badge>
            </div>
            <div className="space-y-2">
              <AccessibleText className="font-medium">High Contrast</AccessibleText>
              <Badge variant={settings.highContrast ? "default" : "secondary"}>
                {settings.highContrast ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="space-y-2">
              <AccessibleText className="font-medium">Reduced Motion</AccessibleText>
              <Badge variant={settings.reducedMotion ? "default" : "secondary"}>
                {settings.reducedMotion ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <AccessibleHeading level={1} className="text-3xl font-bold">
              Heading Level 1 - Main Page Title
            </AccessibleHeading>
            <AccessibleHeading level={2} className="text-2xl font-semibold">
              Heading Level 2 - Section Title
            </AccessibleHeading>
            <AccessibleHeading level={3} className="text-xl font-medium">
              Heading Level 3 - Subsection Title
            </AccessibleHeading>
            <AccessibleText className="text-base">
              This is regular body text. The Kenya Climate Innovation Centre (KCIC) 
              empowers climate innovation in Kenya through sustainable solutions and 
              green technology. This text automatically adjusts based on your 
              accessibility preferences.
            </AccessibleText>
            <AccessibleText className="text-sm text-muted-foreground">
              This is smaller text, often used for captions or secondary information.
              It also respects your accessibility settings for optimal readability.
            </AccessibleText>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <AccessibleButton 
              className="bg-climate-green hover:bg-climate-green-dark text-white px-6 py-2 rounded-md"
              onClick={() => alert('Primary button clicked!')}
            >
              Primary Button
            </AccessibleButton>
            <AccessibleButton 
              className="border border-climate-green text-climate-green hover:bg-climate-green hover:text-white px-6 py-2 rounded-md"
              onClick={() => alert('Secondary button clicked!')}
            >
              Secondary Button
            </AccessibleButton>
          </div>
          <AccessibleText className="text-sm text-muted-foreground">
            These buttons automatically adjust their size and focus indicators based on your accessibility settings.
          </AccessibleText>
        </CardContent>
      </Card>

      {/* Animation Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Animation Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 bg-climate-green/10 rounded-lg ${getMotionSafeClasses('hover:scale-105 transition-transform duration-300')}`}>
              <AccessibleText className="font-medium">Hover Animation</AccessibleText>
              <AccessibleText className="text-sm text-muted-foreground">
                {shouldDisableAnimations() ? 'Animation disabled' : 'Hover to see scale effect'}
              </AccessibleText>
            </div>
            <div className={`p-4 bg-climate-blue/10 rounded-lg ${getMotionSafeClasses('animate-pulse')}`}>
              <AccessibleText className="font-medium">Pulse Animation</AccessibleText>
              <AccessibleText className="text-sm text-muted-foreground">
                {shouldDisableAnimations() ? 'Animation disabled' : 'Pulsing effect'}
              </AccessibleText>
            </div>
            <div className={`p-4 bg-climate-yellow/10 rounded-lg ${getMotionSafeClasses('hover:rotate-1 transition-transform duration-300')}`}>
              <AccessibleText className="font-medium">Rotate Animation</AccessibleText>
              <AccessibleText className="text-sm text-muted-foreground">
                {shouldDisableAnimations() ? 'Animation disabled' : 'Hover to see rotation'}
              </AccessibleText>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <AccessibleHeading level={4} className="font-semibold text-climate-green">
                  Font Size
                </AccessibleHeading>
                <AccessibleText className="text-sm">
                  Increase font size if text appears too small. The system maintains 
                  proper heading hierarchy while scaling all text proportionally.
                </AccessibleText>
              </div>
              <div className="space-y-2">
                <AccessibleHeading level={4} className="font-semibold text-climate-green">
                  High Contrast
                </AccessibleHeading>
                <AccessibleText className="text-sm">
                  Enable high contrast mode for better visibility, especially useful 
                  in bright environments or for users with visual impairments.
                </AccessibleText>
              </div>
              <div className="space-y-2">
                <AccessibleHeading level={4} className="font-semibold text-climate-green">
                  Reduced Motion
                </AccessibleHeading>
                <AccessibleText className="text-sm">
                  Turn on reduced motion to minimize animations and transitions, 
                  helpful for users sensitive to motion or using slower devices.
                </AccessibleText>
              </div>
              <div className="space-y-2">
                <AccessibleHeading level={4} className="font-semibold text-climate-green">
                  Keyboard Navigation
                </AccessibleHeading>
                <AccessibleText className="text-sm">
                  Use Tab to navigate between interactive elements. Enhanced focus 
                  indicators make it easier to see which element is currently selected.
                </AccessibleText>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-4 p-6 bg-gradient-to-r from-climate-green/10 to-climate-blue/10 rounded-lg">
        <AccessibleHeading level={2} className="text-2xl font-bold">
          Experience Better Accessibility
        </AccessibleHeading>
        <AccessibleText>
          Try adjusting the accessibility settings to find what works best for you. 
          Your preferences will be saved automatically for future visits.
        </AccessibleText>
        <AccessibleButton 
          className="bg-climate-green hover:bg-climate-green-dark text-white px-8 py-3 rounded-md font-semibold"
          onClick={() => {
            // This would typically scroll to the accessibility panel or open it
            const event = new CustomEvent('openAccessibilityPanel');
            window.dispatchEvent(event);
          }}
        >
          Open Accessibility Settings
        </AccessibleButton>
      </div>
    </AccessibleContainer>
  );
}