'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ArrowRight, Leaf, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  KEYBOARD_KEYS, 
  ARIA_LABELS, 
  focusUtils, 
  touchTargetUtils, 
  colorUtils,
  landmarkUtils
} from '@/lib/accessibility';
import Image from 'next/image';

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
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav 
        {...landmarkUtils.getNavigationProps('Main navigation')}
        className="w-full px-4"
      >
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-2">
              <Link 
                href="/"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-lg"
                aria-label="KCIC - Kenya Climate Innovation Centre - Go to homepage"
                onKeyDown={(e) => handleKeyDown(e, '/')}
              >
                <Image
                  src="/images/hero/KCIC logo.png"
                  alt="KCIC logo"
                  className="h-12 sm:h-10 w-auto object-contain"
                  width={120}
                  height={120}
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8" role="menubar">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200',
                  'hover:text-climate-green focus:text-climate-green',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-climate-green',
                  'after:transition-all after:duration-200 hover:after:w-full',
                  colorUtils.getFocusRingClasses(),
                  'rounded-md px-2 py-1',
                  touchTargetUtils.getTouchClasses(),
                  isScrolled ? 'text-foreground' : 'text-white'
                )}
                onKeyDown={(e) => handleKeyDown(e, item.href)}
                aria-label={`Navigate to ${item.label} page`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button
              asChild
              className={cn(
                'bg-climate-green hover:bg-climate-green-dark text-white',
                colorUtils.getFocusRingClasses(),
                touchTargetUtils.getTouchClasses(),
                'transition-all duration-200 hover:scale-105'
              )}
            >
              <Link 
                href="/programs"
                aria-label="Join Our Programs - Apply to participate in KCIC programmes"
              >
                Join Our Programs
              </Link>
            </Button>
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
                    'relative rounded-xl p-3',
                    'bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm',
                    'border border-white/20 dark:border-gray-800/20',
                    'hover:bg-white/20 dark:hover:bg-gray-800/20',
                    'transition-all duration-300 hover:scale-105',
                    colorUtils.getFocusRingClasses(),
                    touchTargetUtils.getTouchClasses(),
                    isScrolled 
                      ? 'text-gray-700 dark:text-gray-200' 
                      : 'text-white'
                  )}
                  aria-label={isMobileMenuOpen ? ARIA_LABELS.closeMenu : ARIA_LABELS.openMenu}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </Button>
              </SheetTrigger>
              
              <SheetContent 
                ref={mobileMenuRef}
                side="right" 
                className="w-[300px] sm:w-[350px] bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-l border-white/20 dark:border-gray-800/20"
                id="mobile-menu"
                onKeyDown={handleMobileMenuKeyDown}
                aria-label="Mobile navigation menu"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/20 dark:border-gray-800/20">
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center space-x-3 rounded-xl p-2 group",
                        "hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors duration-200",
                        colorUtils.getFocusRingClasses(),
                        touchTargetUtils.getTouchClasses()
                      )}
                      onClick={handleMobileLinkClick}
                      onKeyDown={(e) => handleKeyDown(e, '/')}
                      aria-label="KCIC - Kenya Climate Innovation Centre - Go to homepage"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-climate-green to-climate-blue">
                        <Leaf className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-xl font-bold text-climate-green dark:text-climate-green-light">
                          KCIC
                        </div>
                        <div className="text-xs font-medium text-climate-blue dark:text-climate-blue-light">
                          Climate Innovation
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex-1 py-6" role="menu" aria-label="Mobile navigation">
                    <ul className="space-y-3" role="none">
                      {navItems.map((item) => (
                        <li key={item.href} role="none">
                          <Link
                            href={item.href}
                            role="menuitem"
                            className={cn(
                              'group relative block text-lg font-medium py-4 px-6 rounded-xl',
                              'bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm',
                              'border border-white/10 dark:border-gray-800/10',
                              'hover:bg-gradient-to-r hover:from-climate-green/20 hover:to-climate-blue/20',
                              'hover:border-climate-green/30 hover:text-climate-green',
                              'focus:bg-gradient-to-r focus:from-climate-green/20 focus:to-climate-blue/20',
                              'focus:border-climate-green/30 focus:text-climate-green',
                              'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0',
                              'after:bg-gradient-to-r after:from-climate-green after:to-climate-blue',
                              'after:transition-all after:duration-300 hover:after:w-full',
                              'transition-all duration-300',
                              'text-gray-700 dark:text-gray-200',
                              touchTargetUtils.getTouchClasses(),
                              colorUtils.getFocusRingClasses()
                            )}
                            onClick={handleMobileLinkClick}
                            onKeyDown={(e) => handleKeyDown(e, item.href)}
                            aria-label={`Navigate to ${item.label} page`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.label}</span>
                              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile CTA Button */}
                  <div className="pt-6 border-t border-white/20 dark:border-gray-800/20">
                    <Button
                      asChild
                      className={cn(
                        "w-full group relative overflow-hidden",
                        "bg-gradient-to-r from-climate-green to-climate-blue",
                        "hover:from-climate-green-dark hover:to-climate-blue-dark",
                        "text-white font-semibold py-4 rounded-xl",
                        "shadow-lg shadow-climate-green/25",
                        "border border-white/20 backdrop-blur-sm",
                        "transition-all duration-300",
                        colorUtils.getFocusRingClasses(),
                        touchTargetUtils.getTouchClasses()
                      )}
                      onClick={handleMobileLinkClick}
                    >
                      <Link 
                        href="/programs"
                        aria-label="Join Our Programs - Apply to participate in KCIC programmes"
                        className="flex items-center justify-center space-x-2"
                      >
                        <span>Join Our Programs</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}