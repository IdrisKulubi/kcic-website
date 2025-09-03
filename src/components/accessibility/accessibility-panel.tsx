"use client";

import React from "react";
import {
  X,
  Type,
  AlignLeft,
  Eye,
  Pause,
  RotateCcw,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  useAccessibility,
  FONT_SCALES,
  LINE_HEIGHTS,
  LETTER_SPACINGS,
  TEXT_ALIGNMENTS,
  type FontScale,
  type LineHeight,
  type LetterSpacing,
  type TextAlignment,
} from "@/contexts/accessibility-context";
import { cn } from "@/lib/utils";

interface AccessibilityPanelProps {
  className?: string;
}

export function AccessibilityPanel({ className }: AccessibilityPanelProps) {
  const {
    settings,
    updateSetting,
    resetSettings,
    isAccessibilityPanelOpen,
    setAccessibilityPanelOpen,
  } = useAccessibility();

  console.log("AccessibilityPanel render:", {
    isAccessibilityPanelOpen,
    settings,
  });

  if (!isAccessibilityPanelOpen) return null;

  const fontScaleOptions = Object.entries(FONT_SCALES);
  const lineHeightOptions = Object.entries(LINE_HEIGHTS);
  const letterSpacingOptions = Object.entries(LETTER_SPACINGS);
  const textAlignmentOptions = Object.entries(TEXT_ALIGNMENTS);

  const handleFontSizeChange = (value: number[]) => {
    const scaleIndex = value[0];
    const fontScale = fontScaleOptions[scaleIndex][0] as FontScale;
    updateSetting("fontSize", fontScale);
  };

  const handleLineHeightChange = (value: number[]) => {
    const heightIndex = value[0];
    const lineHeight = lineHeightOptions[heightIndex][0] as LineHeight;
    updateSetting("lineHeight", lineHeight);
  };

  const getCurrentFontSizeIndex = () => {
    return fontScaleOptions.findIndex(([key]) => key === settings.fontSize);
  };

  const getCurrentLineHeightIndex = () => {
    return lineHeightOptions.findIndex(([key]) => key === settings.lineHeight);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setAccessibilityPanelOpen(false);
    }
  };

  return (
    <div
      className={cn("fixed inset-0 z-50", className)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
      onClick={handleBackdropClick}
    >
      <Card
        className="accessibility-panel fixed top-2 right-2 sm:top-4 sm:right-4 w-[calc(100vw-1rem)] sm:w-80 md:w-96 max-h-[95vh] sm:max-h-[90vh] shadow-2xl animate-in slide-in-from-top-4 slide-in-from-right-4 duration-300 bg-white/95 backdrop-blur-md border border-gray-200 overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="accessibility-panel-header flex flex-row items-center justify-between space-y-0 pb-3 px-3 sm:px-4 md:px-6 sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-10">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-climate-green" />
            <CardTitle
              id="accessibility-panel-title"
              className="text-base sm:text-lg md:text-xl"
            >
              Accessibility Settings
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAccessibilityPanelOpen(false)}
            aria-label="Close accessibility panel"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="accessibility-panel-content space-y-4 sm:space-y-5 px-3 sm:px-4 md:px-6 py-4 sm:py-5 pb-6">
          {/* Text Settings */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-climate-green" />
              <h3 className="text-base sm:text-lg font-semibold">
                Text Settings
              </h3>
            </div>

            {/* Font Size */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="font-size-slider"
                  className="text-sm sm:text-base"
                >
                  Font Size
                </Label>
                <Badge variant="secondary" className="text-xs">
                  {FONT_SCALES[settings.fontSize].label}
                </Badge>
              </div>
              <Slider
                id="font-size-slider"
                min={0}
                max={fontScaleOptions.length - 1}
                step={1}
                value={[getCurrentFontSizeIndex()]}
                onValueChange={handleFontSizeChange}
                className="w-full"
                aria-label="Adjust font size"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="text-xs">XS</span>
                <span className="text-xs">2XL</span>
              </div>
            </div>

            {/* Line Height */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="line-height-slider"
                  className="text-sm sm:text-base"
                >
                  Line Height
                </Label>
                <Badge variant="secondary" className="text-xs">
                  {LINE_HEIGHTS[settings.lineHeight].label}
                </Badge>
              </div>
              <Slider
                id="line-height-slider"
                min={0}
                max={lineHeightOptions.length - 1}
                step={1}
                value={[getCurrentLineHeightIndex()]}
                onValueChange={handleLineHeightChange}
                className="w-full"
                aria-label="Adjust line height"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Tight</span>
                <span>Loose</span>
              </div>
            </div>

            {/* Letter Spacing */}
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-sm sm:text-base">Letter Spacing</Label>
              <div className="grid grid-cols-2 gap-1 sm:gap-2">
                {letterSpacingOptions.map(([key, option]) => (
                  <Button
                    key={key}
                    variant={
                      settings.letterSpacing === key ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      updateSetting("letterSpacing", key as LetterSpacing)
                    }
                    className="justify-start text-xs sm:text-sm h-8 sm:h-9"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Text Alignment */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <AlignLeft className="h-4 w-4" />
                <Label className="text-sm sm:text-base">Text Alignment</Label>
              </div>
              <div className="grid grid-cols-2 gap-1 sm:gap-2">
                {textAlignmentOptions.map(([key, option]) => (
                  <Button
                    key={key}
                    variant={
                      settings.textAlignment === key ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      updateSetting("textAlignment", key as TextAlignment)
                    }
                    className="justify-start text-xs sm:text-sm h-8 sm:h-9"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Readable Font */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1 pr-2">
                <Label htmlFor="readable-font" className="text-sm sm:text-base">
                  Readable Font
                </Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Use a more readable font family
                </p>
              </div>
              <Switch
                id="readable-font"
                checked={settings.readableFont}
                onCheckedChange={(checked) =>
                  updateSetting("readableFont", checked)
                }
                aria-describedby="readable-font-description"
              />
            </div>
          </div>

          <Separator />

          {/* Visual Settings */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-climate-green" />
              <h3 className="text-base sm:text-lg font-semibold">
                Visual Settings
              </h3>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1 pr-2">
                <Label htmlFor="high-contrast" className="text-sm sm:text-base">
                  High Contrast
                </Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Increase color contrast for better visibility
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) =>
                  updateSetting("highContrast", checked)
                }
              />
            </div>

            {/* Enhanced Focus Indicators */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="focus-indicators">Enhanced Focus</Label>
                <p className="text-sm text-muted-foreground">
                  Show stronger focus indicators for keyboard navigation
                </p>
              </div>
              <Switch
                id="focus-indicators"
                checked={settings.focusIndicators}
                onCheckedChange={(checked) =>
                  updateSetting("focusIndicators", checked)
                }
              />
            </div>

            {/* Hide Images */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="hide-images">Hide Images</Label>
                <p className="text-sm text-muted-foreground">
                  Hide decorative images to reduce distractions
                </p>
              </div>
              <Switch
                id="hide-images"
                checked={settings.hideImages}
                onCheckedChange={(checked) =>
                  updateSetting("hideImages", checked)
                }
              />
            </div>
          </div>

          <Separator />

          {/* Motion Settings */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Pause className="h-4 w-4 text-climate-green" />
              <h3 className="text-base sm:text-lg font-semibold">
                Motion Settings
              </h3>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reduced-motion">Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </p>
              </div>
              <Switch
                id="reduced-motion"
                checked={settings.reducedMotion}
                onCheckedChange={(checked) =>
                  updateSetting("reducedMotion", checked)
                }
              />
            </div>

            {/* Pause Animations */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pause-animations">Pause Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Pause all auto-playing animations
                </p>
              </div>
              <Switch
                id="pause-animations"
                checked={settings.pauseAnimations}
                onCheckedChange={(checked) =>
                  updateSetting("pauseAnimations", checked)
                }
              />
            </div>
          </div>

          <Separator />

          {/* Reset Button */}
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Reset to Defaults</span>
              <span className="sm:hidden">Reset</span>
            </Button>
          </div>

          {/* Preview Text */}
          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Preview</Label>
            <div className="p-3 sm:p-4 border rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">
                Sample Heading
              </h4>
              <p className="text-xs sm:text-sm">
                This is a sample paragraph to preview your accessibility
                settings. The Kenya Climate Innovation Centre empowers climate
                innovation through sustainable solutions and green technology.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
