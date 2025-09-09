'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { colors, typography } from '@/lib/design-system';
import { useAccessibilityClasses } from '@/hooks/use-accessibility-classes';
import Image from 'next/image';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

interface MinimalNavbarProps {
  logo: {
    src: string;
    alt: string;
  };
  navigation: NavItem[];
  ctaButton: {
    text: string;
    href: string;
  };
}

export function MinimalNavbar({ logo, navigation, ctaButton }: MinimalNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getMotionSafeClasses } = useAccessibilityClasses();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${getMotionSafeClasses('hover:scale-105')}`}
                  style={{
                    fontFamily: typography.fonts.body,
                    color: colors.secondary.gray[700],
                    fontSize: typography.sizes.body.base,
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA Button */}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md transition-colors duration-200"
                style={{
                  color: colors.secondary.gray[700],
                }}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div 
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${getMotionSafeClasses('animate-in slide-in-from-right')}`}
          >
            <div className="flex flex-col h-full pt-20 pb-6 px-6">
              {/* Mobile Navigation Links */}
              <div className="flex-1 space-y-6">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block font-medium transition-colors duration-200"
                    style={{
                      fontFamily: typography.fonts.body,
                      color: colors.secondary.gray[700],
                      fontSize: typography.sizes.body.lg,
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <Button
                className="w-full py-3 rounded-full font-semibold"
                style={{
                  background: colors.gradients.primary,
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
          </div>
        </div>
      )}
    </>
  );
}