'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Users, Building2, FileText, Target, Phone, Lightbulb, Shield, Briefcase, Network, BookOpen, TrendingUp, Calendar, Megaphone, ClipboardList } from 'lucide-react';
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
  Building2,
  Users,
  FileText,
  Target,
  Phone,
  Lightbulb,
  Shield,
  Briefcase,
  Network,
  BookOpen,
  TrendingUp,
  Calendar,
  Megaphone,
  ClipboardList,
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
    return iconMap[iconName as keyof typeof iconMap] || Building2;
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-sm shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 -ml-4 sm:-ml-6 lg:-ml-8">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/hero/KCIC logo.png"
                  alt="logo"
                  aria-label="KCIC - Kenya Climate Innovation Centre - Go to homepage"
                  className="h-8 sm:h-10 w-auto"
                  width={100}
                  height={100}
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
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      activeDropdown === item.label ? 'bg-gray-50 text-green-600' : 'text-gray-700 hover:text-gray-900'
                    }`}
                    style={{
                      fontFamily: typography.fonts.body,
                      fontSize: typography.sizes.body.base,
                    }}
                    aria-expanded={item.subItems ? activeDropdown === item.label : undefined}
                    aria-controls={item.subItems ? `dropdown-${item.label}` : undefined}
                    aria-haspopup={item.subItems ? 'menu' : undefined}
                    onKeyDown={(e) => handleKeyNavigation(e, item.href)}
                    onClick={() => !item.subItems && (window.location.href = item.href)}
                  >
                    {item.label}
                    {item.subItems && (
                      <ChevronDown 
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
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

            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher variant="compact" />
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
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <span className="text-lg font-semibold text-gray-900">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6">
                  <div className="space-y-2 px-6">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.subItems ? (
                          <div className="space-y-2">
                            <button
                              onClick={() => setExpandedMobileItem(
                                expandedMobileItem === item.label ? null : item.label
                              )}
                              className="flex items-center justify-between w-full p-3 rounded-lg font-medium text-left transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                              style={{
                                fontFamily: typography.fonts.body,
                                color: colors.secondary.gray[700],
                                fontSize: typography.sizes.body.lg,
                              }}
                              aria-expanded={expandedMobileItem === item.label}
                              aria-controls={`mobile-submenu-${item.label}`}
                            >
                              {item.label}
                              <motion.div
                                animate={{ rotate: expandedMobileItem === item.label ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-5 w-5" />
                              </motion.div>
                            </button>
                            
                            <AnimatePresence>
                              {expandedMobileItem === item.label && (
                                <motion.div
                                  id={`mobile-submenu-${item.label}`}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="ml-4 space-y-1 overflow-hidden"
                                >
                                  {item.subItems.map((subItem, subIndex) => (
                                    <motion.a
                                      key={subItem.label}
                                      href={subItem.href}
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.05 }}
                                      className="flex items-center p-2 rounded-md transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <div className="flex-shrink-0 w-6 h-6 bg-green-50 rounded-md flex items-center justify-center mr-2">
                                        {React.createElement(getIcon(subItem.icon), { className: "w-3 h-3 text-green-600" })}
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-gray-900 text-sm">
                                          {subItem.label}
                                        </div>
                                      </div>
                                    </motion.a>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <a
                            href={item.href}
                            className="block p-3 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                            style={{
                              fontFamily: typography.fonts.body,
                              color: colors.secondary.gray[700],
                              fontSize: typography.sizes.body.lg,
                            }}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.label}
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Mobile Language Switcher */}
                  <div className="mt-6 px-6 pt-6 border-t border-gray-100">
                    <LanguageSwitcher variant="mobile" />
                  </div>
                </div>

                {/* Mobile CTA Button */}
                {ctaButton && (
                  <div className="p-6 border-t border-gray-100">
                    <Button
                      className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      style={{
                        background: colors.primary.green.DEFAULT,
                        color: 'white',
                        fontFamily: typography.fonts.body,
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
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}