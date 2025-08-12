'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  KEYBOARD_KEYS, 
  ARIA_LABELS, 
  focusUtils, 
  touchTargetUtils, 
  colorUtils,
  landmarkUtils,
  motionUtils
} from '@/lib/accessibility';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Media Centre', href: '/media' },
  { label: 'Clients Centre', href: '/clients' },
  { label: 'Contacts', href: '/contacts' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === KEYBOARD_KEYS.ENTER || event.key === KEYBOARD_KEYS.SPACE) {
      event.preventDefault();
      window.location.href = href;
    }
  };

  // Handle mobile menu keyboard navigation
  const handleMobileMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === KEYBOARD_KEYS.ESCAPE) {
      setIsMobileMenuOpen(false);
      // Restore focus to menu trigger
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    } else if (mobileMenuRef.current) {
      focusUtils.trapFocus(mobileMenuRef.current, event);
    }
  };

  // Close mobile menu when clicking on a link
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    // Restore focus to menu trigger
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  // Handle mobile menu open
  const handleMobileMenuOpen = (open: boolean) => {
    if (open) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
    setIsMobileMenuOpen(open);
  };

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
      initial={motionUtils.prefersReducedMotion() ? {} : { y: -100 }}
      animate={motionUtils.prefersReducedMotion() ? {} : { y: 0 }}
      transition={motionUtils.prefersReducedMotion() ? {} : { duration: 0.6, ease: 'easeOut' }}
    >
      <nav 
        {...landmarkUtils.getNavigationProps('Main navigation')}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "flex items-center space-x-2 rounded-md p-1",
              colorUtils.getFocusRingClasses(),
              touchTargetUtils.getTouchClasses()
            )}
            aria-label="KCIC - Kenya Climate Innovation Centre - Go to homepage"
            onKeyDown={(e) => handleKeyDown(e, '/')}
          >
            <div className="text-2xl font-bold text-gradient-climate">
              KCIC
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8" role="menubar">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200',
                  'hover:text-climate-green focus:text-climate-green',
                  colorUtils.getFocusRingClasses(),
                  'rounded-md px-2 py-1',
                  touchTargetUtils.getTouchClasses(),
                  isScrolled ? 'text-foreground' : 'text-white'
                )}
                onKeyDown={(e) => handleKeyDown(e, item.href)}
                aria-label={`Navigate to ${item.label} page`}
              >
                <motion.span
                  initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, y: -10 }}
                  animate={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                  transition={motionUtils.prefersReducedMotion() ? {} : { delay: index * 0.1, duration: 0.3 }}
                >
                  {item.label}
                </motion.span>
                
                {/* Hover underline effect */}
                {!motionUtils.prefersReducedMotion() && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-climate-green"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <motion.div
              initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, scale: 0.9 }}
              animate={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, scale: 1 }}
              transition={motionUtils.prefersReducedMotion() ? {} : { delay: 0.3, duration: 0.3 }}
            >
              <Button
                asChild
                className={cn(
                  'bg-climate-green hover:bg-climate-green-dark text-white',
                  colorUtils.getFocusRingClasses(),
                  touchTargetUtils.getTouchClasses(),
                  'transition-all duration-200',
                  !motionUtils.prefersReducedMotion() && 'hover:scale-105'
                )}
              >
                <Link 
                  href="/programs"
                  aria-label="Join Our Programs - Apply to participate in KCIC programmes"
                >
                  Join Our Programs
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={handleMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  ref={(el) => {
                    if (el && !isMobileMenuOpen) {
                      previousFocusRef.current = el;
                    }
                  }}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    colorUtils.getFocusRingClasses(),
                    touchTargetUtils.getTouchClasses(),
                    isScrolled ? 'text-foreground' : 'text-white'
                  )}
                  aria-label={isMobileMenuOpen ? ARIA_LABELS.closeMenu : ARIA_LABELS.openMenu}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              
              <SheetContent 
                ref={mobileMenuRef}
                side="right" 
                className="w-[280px] sm:w-[320px] bg-background/95 backdrop-blur-md"
                id="mobile-menu"
                onKeyDown={handleMobileMenuKeyDown}
                aria-label="Mobile navigation menu"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <Link
                      href="/"
                      className={cn(
                        "text-2xl font-bold text-gradient-climate rounded-md p-1",
                        colorUtils.getFocusRingClasses(),
                        touchTargetUtils.getTouchClasses()
                      )}
                      onClick={handleMobileLinkClick}
                      onKeyDown={(e) => handleKeyDown(e, '/')}
                      aria-label="KCIC - Kenya Climate Innovation Centre - Go to homepage"
                    >
                      KCIC
                    </Link>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex-1 py-6" role="menu" aria-label="Mobile navigation">
                    <ul className="space-y-4" role="none">
                      {navItems.map((item, index) => (
                        <motion.li
                          key={item.href}
                          role="none"
                          initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, x: -20 }}
                          animate={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
                          transition={motionUtils.prefersReducedMotion() ? {} : { delay: index * 0.1, duration: 0.3 }}
                        >
                          <Link
                            href={item.href}
                            role="menuitem"
                            className={cn(
                              'block text-lg font-medium py-4 px-4 rounded-lg',
                              touchTargetUtils.getTouchClasses(),
                              'flex items-center',
                              'hover:bg-climate-green/10 hover:text-climate-green',
                              'focus:bg-climate-green/10 focus:text-climate-green',
                              colorUtils.getFocusRingClasses(),
                              'transition-all duration-200'
                            )}
                            onClick={handleMobileLinkClick}
                            onKeyDown={(e) => handleKeyDown(e, item.href)}
                            aria-label={`Navigate to ${item.label} page`}
                          >
                            {item.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile CTA Button */}
                  <div className="pt-6 border-t border-border">
                    <motion.div
                      initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, y: 20 }}
                      animate={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                      transition={motionUtils.prefersReducedMotion() ? {} : { delay: 0.4, duration: 0.3 }}
                    >
                      <Button
                        asChild
                        className={cn(
                          "w-full bg-climate-green hover:bg-climate-green-dark text-white",
                          colorUtils.getFocusRingClasses(),
                          touchTargetUtils.getTouchClasses()
                        )}
                        onClick={handleMobileLinkClick}
                      >
                        <Link 
                          href="/programs"
                          aria-label="Join Our Programs - Apply to participate in KCIC programmes"
                        >
                          Join Our Programs
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}