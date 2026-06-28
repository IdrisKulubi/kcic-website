'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageSwitch, LOCALES, LocaleCode } from '@/lib/i18n';
import { colors, typography } from '@/lib/design-system';

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'mobile';
  showFlag?: boolean;
  showLabel?: boolean;
}

export function LanguageSwitcher({ 
  variant = 'default', 
  showFlag = true, 
  showLabel = true 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentLocale, availableLocales, switchLanguage, localeConfig } = useLanguageSwitch();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLanguageChange = (locale: LocaleCode) => {
    switchLanguage(locale);
    setIsOpen(false);
  };

  // Filter out current locale from available options
  const otherLocales = availableLocales.filter(locale => locale !== currentLocale);

  if (variant === 'mobile') {
    return (
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-500 px-4">
          Language / Langue
        </div>
        <div className="space-y-1">
          {availableLocales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 ${
                locale === currentLocale
                  ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {showFlag && (
                  <span className="text-lg" role="img" aria-label={LOCALES[locale].name}>
                    {LOCALES[locale].flag}
                  </span>
                )}
                <span className="font-medium">{LOCALES[locale].name}</span>
              </div>
              {locale === currentLocale && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          ${variant === 'compact' ? 'px-2 py-1' : ''}
        `}
        style={{
          fontFamily: typography.fonts.body,
          color: colors.secondary.gray[700],
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Current language: ${localeConfig.name}. Click to change language`}
      >
        {variant === 'compact' ? (
          <Globe className="h-4 w-4" />
        ) : (
          <>
            {showFlag && (
              <span className="text-lg" role="img" aria-label={localeConfig.name}>
                {localeConfig.flag}
              </span>
            )}
            {showLabel && (
              <span className="hidden sm:inline">{localeConfig.name}</span>
            )}
            <Globe className="h-4 w-4 sm:hidden" />
          </>
        )}
        <ChevronDown 
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
            style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)' }}
          >
            {/* Arrow pointer */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-white border-l border-t border-gray-100 rotate-45"></div>
            
            <div className="p-1">
              {otherLocales.map((locale, index) => (
                <motion.button
                  key={locale}
                  role="menuitem"
                  tabIndex={0}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleLanguageChange(locale)}
                  className="w-full flex items-center justify-between p-2 rounded-md transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLanguageChange(locale);
                    }
                  }}
                >
                  <div className="flex items-center space-x-2">
                    {showFlag && (
                      <span className="text-lg" role="img" aria-label={LOCALES[locale].name}>
                        {LOCALES[locale].flag}
                      </span>
                    )}
                    <span 
                      className="text-sm font-medium text-gray-900"
                      style={{ fontFamily: typography.fonts.body }}
                    >
                      {LOCALES[locale].name}
                    </span>
                  </div>
                  {/* RTL indicator for Arabic */}
                  {LOCALES[locale].rtl && (
                    <span className="text-xs text-gray-400 font-mono">RTL</span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Footer with current language indicator */}
            <div className="border-t border-gray-100 p-2 bg-gray-50">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xs text-gray-500">Current:</span>
                <div className="flex items-center space-x-1">
                  {showFlag && (
                    <span className="text-sm" role="img" aria-label={localeConfig.name}>
                      {localeConfig.flag}
                    </span>
                  )}
                  <span className="text-xs font-medium text-gray-700">
                    {localeConfig.name}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}