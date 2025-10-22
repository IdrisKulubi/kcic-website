'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguageSwitch } from '@/lib/i18n.client';
import { LOCALES, LocaleCode } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'toggle' | 'inline';
  showFlags?: boolean;
  showLabels?: boolean;
  className?: string;
}

/**
 * Language Switcher Component
 * 
 * Provides UI for users to switch between English and French with three variants:
 * - dropdown: Dropdown menu with all language options (for header/navbar)
 * - toggle: Toggle button switching between languages (for mobile)
 * - inline: Inline buttons side-by-side (for footer)
 * 
 * Features:
 * - Visual indication of current language with flags and labels
 * - Preserves current page path and query parameters when switching
 * - Full keyboard accessibility (Tab, Enter, Arrow keys, Escape)
 * - ARIA attributes for screen readers
 * - Screen reader announcements for language changes
 * - WCAG AA compliant color contrast
 */
export function LanguageSwitcher({ 
  variant = 'dropdown', 
  showFlags = true, 
  showLabels = true,
  className
}: LanguageSwitcherProps) {
  const { currentLocale, availableLocales, switchLanguage, localeConfig } = useLanguageSwitch();
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const inlineRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleLanguageChange = (locale: LocaleCode) => {
    switchLanguage(locale);
    setIsOpen(false);
    
    // Announce language change to screen readers
    const newLanguageName = LOCALES[locale].name;
    setAnnouncement(`Language changed to ${newLanguageName}`);
    
    // Clear announcement after it's been read
    setTimeout(() => setAnnouncement(''), 1000);
  };

  // Keyboard navigation for inline variant
  const handleInlineKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (index + 1) % availableLocales.length;
      inlineRefs.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (index - 1 + availableLocales.length) % availableLocales.length;
      inlineRefs.current[prevIndex]?.focus();
    }
  };

  // Dropdown variant - uses Radix UI dropdown menu for accessibility
  if (variant === 'dropdown') {
    return (
      <>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                className
              )}
              aria-label={`Current language: ${localeConfig.name}. Click to change language`}
              aria-haspopup="menu"
              aria-expanded={isOpen}
            >
              {showFlags && (
                <span className="text-lg" role="img" aria-label={localeConfig.name}>
                  {localeConfig.flag}
                </span>
              )}
              {showLabels && (
                <span className="hidden sm:inline font-medium">{localeConfig.name}</span>
              )}
              <Globe className="h-4 w-4 sm:hidden" aria-hidden="true" />
              <ChevronDown 
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {availableLocales.map((locale) => (
              <DropdownMenuItem
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className="flex items-center justify-between cursor-pointer focus:bg-accent focus:text-accent-foreground"
                aria-current={locale === currentLocale ? 'true' : undefined}
              >
                <div className="flex items-center gap-2">
                  {showFlags && (
                    <span className="text-lg" role="img" aria-label={LOCALES[locale].name}>
                      {LOCALES[locale].flag}
                    </span>
                  )}
                  <span className="font-medium">{LOCALES[locale].name}</span>
                </div>
                {locale === currentLocale && (
                  <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Screen reader live region for announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {announcement}
        </div>
      </>
    );
  }

  // Toggle variant - switches between languages with a single button
  if (variant === 'toggle') {
    // Get the next language in the cycle
    const currentIndex = availableLocales.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % availableLocales.length;
    const nextLocale = availableLocales[nextIndex];
    const nextLocaleConfig = LOCALES[nextLocale];

    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleLanguageChange(nextLocale)}
          className={cn(
            "flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            className
          )}
          aria-label={`Current language: ${localeConfig.name}. Switch to ${nextLocaleConfig.name}`}
        >
          {showFlags && (
            <span className="text-lg" role="img" aria-label={localeConfig.name}>
              {localeConfig.flag}
            </span>
          )}
          {showLabels && (
            <span className="font-medium">{localeConfig.code.toUpperCase()}</span>
          )}
          <span className="text-muted-foreground" aria-hidden="true">→</span>
          {showFlags && (
            <span className="text-lg" role="img" aria-label={nextLocaleConfig.name}>
              {nextLocaleConfig.flag}
            </span>
          )}
          {showLabels && (
            <span className="font-medium">{nextLocale.toUpperCase()}</span>
          )}
        </Button>
        
        {/* Screen reader live region for announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {announcement}
        </div>
      </>
    );
  }

  // Inline variant - displays all languages as separate buttons side-by-side
  return (
    <>
      <div
        role="group"
        aria-label="Language selection"
        className={cn("flex items-center gap-2", className)}
      >
        {availableLocales.map((locale, index) => {
          const isActive = locale === currentLocale;
          const localeInfo = LOCALES[locale];
          
          return (
            <button
              key={locale}
              ref={(el) => {
                inlineRefs.current[index] = el;
              }}
              onClick={() => handleLanguageChange(locale)}
              onKeyDown={(e) => handleInlineKeyDown(e, index)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
              aria-label={`Switch to ${localeInfo.name}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {showFlags && (
                <span className="text-base" role="img" aria-label={localeInfo.name}>
                  {localeInfo.flag}
                </span>
              )}
              {showLabels && (
                <span>{localeInfo.name}</span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Screen reader live region for announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </>
  );
}
