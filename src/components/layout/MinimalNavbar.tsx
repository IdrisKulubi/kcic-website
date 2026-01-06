'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  List,
  X,
  CaretDown,
  Users,
  Buildings,
  FileText,
  Crosshair,
  Phone,
  Lightbulb,
  Shield,
  Briefcase,
  Graph,
  BookOpen,
  TrendUp,
  Calendar,
  Megaphone,
  ClipboardText
} from '@phosphor-icons/react';
import { colors, typography } from '@/lib/design-system';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/language-switcher';

interface SubNavItem {
  label: string;
  href: string;
  description: string;
  icon: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: SubNavItem[];
}

interface MinimalNavbarProps {
  logo: {
    src: string;
    alt: string;
  };
  navigation: NavItem[];
  ctaButton?: {
    text: string;
    href: string;
  };
}

const iconMap = {
  Building2: Buildings,
  Buildings,
  Users,
  FileText,
  Target: Crosshair,
  Crosshair,
  Phone,
  Lightbulb,
  Shield,
  Briefcase,
  Network: Graph,
  Graph,
  BookOpen,
  TrendUp,
  Calendar,
  Megaphone,
  ClipboardList: ClipboardText,
  ClipboardText,
};

export function MinimalNavbar({ navigation, ctaButton }: MinimalNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const { getMotionSafeClasses } = useAccessibilityClasses();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Buildings;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleKeyNavigation = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 backdrop-blur-sm shadow-sm'
          }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/hero/KCIC logo.png"
                  alt="logo"
                  aria-label="KCIC - Kenya Climate Innovation Centre - Go to homepage"
                  className="h-12 sm:h-14 w-auto"
                  width={140}
                  height={140}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.subItems && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${activeDropdown === item.label ? 'bg-gray-50 text-green-600' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    style={{
                      fontFamily: typography.fonts.body,
                      fontSize: typography.sizes.body.base[0],
                    }}
                    aria-expanded={item.subItems ? activeDropdown === item.label : undefined}
                    aria-controls={item.subItems ? `dropdown-${item.label}` : undefined}
                    aria-haspopup={item.subItems ? 'menu' : undefined}
                    onKeyDown={(e) => handleKeyNavigation(e, item.href)}
                    onClick={() => !item.subItems && (window.location.href = item.href)}
                  >
                    {item.label}
                    {item.subItems && (
                      <CaretDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                  </button>

                  {/* Desktop Dropdown Menu */}
                  <AnimatePresence>
                    {item.subItems && activeDropdown === item.label && (
                      <motion.div
                        id={`dropdown-${item.label}`}
                        role="menu"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
                        style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)' }}
                      >
                        {/* Arrow pointer */}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-gray-100 rotate-45"></div>

                        <div className="p-1">
                          {item.subItems.map((subItem, index) => (
                            <motion.a
                              key={subItem.label}
                              href={subItem.href}
                              role="menuitem"
                              tabIndex={0}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="group flex items-center p-2 rounded-md transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                              onKeyDown={(e) => handleKeyNavigation(e, subItem.href)}
                            >
                              <div className="flex-shrink-0 w-6 h-6 bg-green-50 rounded-md flex items-center justify-center group-hover:bg-green-100 transition-colors duration-200">
                                {React.createElement(getIcon(subItem.icon), { className: "w-3 h-3 text-green-600" })}
                              </div>
                              <div className="ml-2 flex-1">
                                <span
                                  className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-200 block"
                                  style={{ fontFamily: typography.fonts.body }}
                                >
                                  {subItem.label}
                                </span>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>



            {/* Desktop CTA Button */}
            {ctaButton && (
              <div className="hidden md:block">
                <Button
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${getMotionSafeClasses('hover:scale-105')}`}
                  style={{
                    background: colors.primary.green.DEFAULT,
                    color: 'white',
                    fontFamily: typography.fonts.body,
                    border: 'none',
                  }}
                  asChild
                >
                  <a href={ctaButton.href}>
                    {ctaButton.text}
                  </a>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                style={{
                  color: colors.secondary.gray[700],
                }}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <List className="h-6 w-6" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Apple-Style Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Content */}
            <motion.div
              className="relative h-full flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/images/hero/KCIC logo.png"
                    alt="KCIC Logo"
                    className="h-8 w-auto"
                    width={80}
                    height={32}
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-gray-600" weight="bold" />
                </button>
              </div>

              {/* Navigation Links - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <nav className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                    >
                      {item.subItems ? (
                        <div className="mb-2">
                          {/* Parent Item with Toggle */}
                          <button
                            onClick={() => setExpandedMobileItem(
                              expandedMobileItem === item.label ? null : item.label
                            )}
                            className="flex items-center justify-between w-full py-4 text-left transition-colors"
                            aria-expanded={expandedMobileItem === item.label}
                          >
                            <span
                              className="text-xl font-semibold"
                              style={{
                                color: expandedMobileItem === item.label
                                  ? colors.primary.green.DEFAULT
                                  : colors.secondary.gray[900],
                              }}
                            >
                              {item.label}
                            </span>
                            <motion.div
                              animate={{ rotate: expandedMobileItem === item.label ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CaretDown
                                className="h-5 w-5"
                                style={{ color: colors.secondary.gray[400] }}
                              />
                            </motion.div>
                          </button>

                          {/* Submenu Items */}
                          <AnimatePresence>
                            {expandedMobileItem === item.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="pb-4 space-y-1">
                                  {item.subItems.map((subItem, subIndex) => (
                                    <motion.a
                                      key={subItem.label}
                                      href={subItem.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.03 }}
                                      className="flex items-center py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm">
                                        {React.createElement(getIcon(subItem.icon), {
                                          className: "w-5 h-5",
                                          style: { color: colors.primary.green.DEFAULT }
                                        })}
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-base font-medium text-gray-900 block">
                                          {subItem.label}
                                        </span>
                                        {subItem.description && (
                                          <span className="text-sm text-gray-500 line-clamp-1">
                                            {subItem.description}
                                          </span>
                                        )}
                                      </div>
                                    </motion.a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          className="flex items-center py-4 text-xl font-semibold transition-colors hover:text-green-600"
                          style={{ color: colors.secondary.gray[900] }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-6 border-t border-gray-100" />


              </div>

              {/* Bottom CTA */}
              {ctaButton && (
                <div className="px-6 py-6 border-t border-gray-100 bg-gray-50">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      className="w-full py-4 rounded-2xl font-semibold text-lg shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary.green.DEFAULT}, ${colors.primary.green[600]})`,
                        color: 'white',
                        border: 'none',
                      }}
                      asChild
                    >
                      <a
                        href={ctaButton.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {ctaButton.text}
                      </a>
                    </Button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}