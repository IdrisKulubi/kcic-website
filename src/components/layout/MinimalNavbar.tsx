'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  ClipboardText,
  Star,
  Rocket,
  Archive,
  Newspaper,
  Article,
  Microphone,
  Handshake,
  TreeStructure
} from '@phosphor-icons/react';
import { colors, typography } from '@/lib/design-system';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  Star,
  Rocket,
  Archive,
  Newspaper,
  Article,
  Microphone,
  Handshake,
  Diagram: TreeStructure,
  TreeStructure,
};

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function MinimalNavbar({ navigation, ctaButton }: MinimalNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const { getMotionSafeClasses } = useAccessibilityClasses();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Buildings;
  };

  // GSAP entrance animation for nav items
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Animate nav items on mount
      const navItems = navItemsRef.current?.children;
      if (navItems && navItems.length > 0) {
        gsap.fromTo(
          navItems,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.3,
          }
        );
      }

      // Smooth navbar background transition on scroll
      ScrollTrigger.create({
        start: 'top top',
        end: '+=100',
        onUpdate: (self) => {
          const progress = self.progress;
          if (navRef.current) {
            const navElement = navRef.current;
            if (progress > 0.5) {
              navElement.classList.add('nav-scrolled');
              navElement.classList.remove('nav-top');
            } else {
              navElement.classList.remove('nav-scrolled');
              navElement.classList.add('nav-top');
            }
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

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

  /** When already on the target path, scroll to #id instead of full navigation (keeps SPA state, fixes hash on /programmes). */
  const scrollToInPageSection = React.useCallback(
    (href: string): boolean => {
      if (typeof window === 'undefined') return false;
      const hashIdx = href.indexOf('#');
      if (hashIdx === -1) return false;
      const path = href.slice(0, hashIdx) || pathname;
      const hash = href.slice(hashIdx + 1);
      if (!hash) return false;
      if (pathname !== path) return false;
      const el = document.getElementById(hash);
      if (!el) return false;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
      return true;
    },
    [pathname]
  );

  const handleKeyNavigation = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (scrollToInPageSection(href)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <>
      {/* CSS for GSAP scroll states */}
      <style jsx global>{`
        .nav-scrolled {
          background: rgba(26, 31, 46, 0.95) !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        }
        .nav-top {
          background: rgba(0, 0, 0, 0.2) !important;
          backdrop-filter: blur(8px) !important;
        }
      `}</style>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#1a1f2e]/95 backdrop-blur-md shadow-xl'
          : 'bg-black/20 backdrop-blur-md'
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
            <div className="hidden md:flex items-center space-x-1" ref={(el) => { dropdownRef.current = el; navItemsRef.current = el; }}>
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.subItems && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#80c738] focus:ring-offset-2 ${
                      isScrolled
                        ? `hover:bg-white/10 ${activeDropdown === item.label ? 'bg-white/15 text-[#80c738]' : 'text-white/90 hover:text-white'}`
                        : `hover:bg-white/10 ${activeDropdown === item.label ? 'bg-white/20 text-white' : 'text-white hover:text-white'}`
                      }`}
                    style={{
                      fontFamily: typography.fonts.body,
                      fontSize: typography.sizes.body.base[0],
                      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
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

                  {/* Desktop Mega Menu - Vimeo Style */}
                  <AnimatePresence>
                    {item.subItems && activeDropdown === item.label && (
                      <motion.div
                        id={`dropdown-${item.label}`}
                        role="menu"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed rounded-2xl overflow-hidden z-50"
                        style={{ 
                          // Keep dropdown close to navbar with tighter vertical spacing
                          top: item.label === 'About Us' ? '64px' : '64px',
                          left: item.label === 'About Us' ? '24px' : 'auto',
                          right: item.label === 'About Us' ? '24px' : '40px',
                          transform: 'none',
                          marginTop: '0',
                          width: 'auto',
                          minWidth: item.subItems.length > 4 ? '580px' : '300px',
                          maxWidth: 'calc(100vw - 80px)',
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)',
                          background: '#ffffff',
                        }}
                      >
                        {/* Header with category label */}
                        <div className="px-4 py-1 border-b border-gray-100 bg-gray-50/80">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {item.label}
                          </span>
                        </div>

                        {/* Menu Items Grid */}
                        <div 
                          className="px-2 pb-2 pt-0"
                          style={{
                            display: 'grid',
                            gridTemplateColumns: item.subItems.length > 4 ? 'repeat(2, 1fr)' : '1fr',
                            gap: '2px',
                          }}
                        >
                          {item.subItems.map((subItem, index) => (
                            <motion.a
                              key={subItem.label}
                              href={subItem.href}
                              role="menuitem"
                              tabIndex={0}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.03 }}
                              className="group flex items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#80c738] focus:ring-inset"
                              onKeyDown={(e) => handleKeyNavigation(e, subItem.href)}
                              onClick={(e) => {
                                if (scrollToInPageSection(subItem.href)) {
                                  e.preventDefault();
                                  setActiveDropdown(null);
                                }
                              }}
                            >
                              <div className="shrink-0 w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#80c738]/10 transition-colors duration-200">
                                {React.createElement(getIcon(subItem.icon), { className: "w-5 h-5 text-gray-600 group-hover:text-[#80c738] transition-colors" })}
                              </div>
                              <div className="ml-3 flex-1 min-w-0">
                                <span
                                  className={`text-sm font-semibold text-gray-900 group-hover:text-[#80c738] transition-colors duration-200 block ${
                                    item.label === 'About Us' ? 'whitespace-normal wrap-break-word' : 'whitespace-nowrap'
                                  }`}
                                  style={{ fontFamily: typography.fonts.body }}
                                >
                                  {subItem.label}
                                </span>
                                {subItem.description && (
                                  <span
                                    className={`text-xs text-gray-500 group-hover:text-gray-600 mt-0.5 block leading-relaxed ${
                                      item.label === 'About Us' ? 'whitespace-normal wrap-break-word' : 'whitespace-nowrap'
                                    }`}
                                  >
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
                className="p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#80c738] focus:ring-offset-2 hover:bg-white/10"
                style={{
                  color: '#FFFFFF',
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

      {/* Mobile Menu - Dark Themed Full-Screen Overlay */}
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
              className="absolute inset-0 bg-[#1a1f2e]"
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
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
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
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-white" weight="bold" />
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
                                  ? '#80c738'
                                  : '#ffffff',
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
                                style={{ color: expandedMobileItem === item.label ? '#80c738' : '#8b8d90' }}
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
                                <div className="pb-4 space-y-2">
                                  {item.subItems.map((subItem, subIndex) => (
                                    <motion.a
                                      key={subItem.label}
                                      href={subItem.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: subIndex * 0.03 }}
                                      className="flex items-center py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                                      onClick={(e) => {
                                        if (scrollToInPageSection(subItem.href)) {
                                          e.preventDefault();
                                        }
                                        setIsMobileMenuOpen(false);
                                      }}
                                    >
                                      <div className="w-10 h-10 rounded-xl bg-[#80c738]/10 flex items-center justify-center mr-4 border border-[#80c738]/20">
                                        {React.createElement(getIcon(subItem.icon), {
                                          className: "w-5 h-5",
                                          style: { color: '#80c738' }
                                        })}
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-base font-medium text-white block">
                                          {subItem.label}
                                        </span>
                                        {subItem.description && (
                                          <span className="text-sm text-gray-400 line-clamp-1">
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
                          className="flex items-center py-4 text-xl font-semibold transition-colors text-white hover:text-[#80c738]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-6 border-t border-white/10" />


              </div>

              {/* Bottom CTA */}
              {ctaButton && (
                <div className="px-6 py-6 border-t border-white/10 bg-white/5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      className="w-full py-4 rounded-2xl font-semibold text-lg shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #80c738, #5da628)',
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