'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CaretDown,
  List,
  X,
  ArrowRight,
} from '@phosphor-icons/react';
import { gsap, prefersReducedMotion, registerGsapFoundation } from '@/lib/gsap-foundation';

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

function isActivePath(pathname: string, href: string) {
  const cleanHref = href.split('#')[0] || '/';
  if (cleanHref === '/') return pathname === '/';
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}

export function MinimalNavbar({ logo, navigation, ctaButton }: MinimalNavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(navigation[0]?.label ?? null);
  const navRef = useRef<HTMLElement | null>(null);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logoSrc = logo?.src || '/images/hero/KCIC logo.png';

  useLayoutEffect(() => {
    if (!navRef.current) return;

    registerGsapFoundation();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-nav-shell]', {
        y: -22,
        autoAlpha: 0,
        duration: 0.65,
        ease: 'power4.out',
      });

      gsap.from('[data-nav-item]', {
        y: -10,
        autoAlpha: 0,
        duration: 0.48,
        stagger: 0.045,
        delay: 0.12,
        ease: 'power4.out',
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

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

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const openDropdown = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const queueCloseDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 140);
  };

  const scrollToInPageSection = React.useCallback(
    (href: string): boolean => {
      if (typeof window === 'undefined') return false;
      const hashIdx = href.indexOf('#');
      if (hashIdx === -1) return false;
      const path = href.slice(0, hashIdx) || pathname;
      const hash = href.slice(hashIdx + 1);
      if (!hash || pathname !== path) return false;
      const el = document.getElementById(hash);
      if (!el) return false;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
      return true;
    },
    [pathname]
  );

  const handleNavClick = (event: React.MouseEvent, href: string) => {
    if (scrollToInPageSection(href)) {
      event.preventDefault();
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleKeyNavigation = (event: React.KeyboardEvent, href: string) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (scrollToInPageSection(href)) {
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
      return;
    }
    window.location.href = href;
  };

  return (
    <>
      <nav ref={navRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          data-nav-shell
          className={`mx-auto max-w-[1500px] border border-[#dce5d7]/80 bg-[#fbf7e8]/95 text-[#102016] shadow-[0_18px_45px_rgba(16,32,22,0.16)] backdrop-blur-md transition duration-300 ${
            isScrolled ? 'bg-[#fbf7e8]/98 shadow-[0_12px_34px_rgba(16,32,22,0.18)]' : ''
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-5 lg:h-[72px] lg:px-6">
            <Link
              href="/"
              onClick={(event) => handleNavClick(event, '/')}
              className="group flex shrink-0 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738]"
              aria-label="KCIC, go to homepage"
            >
              <Image
                src={logoSrc}
                alt={logo?.alt || 'KCIC Logo'}
                width={130}
                height={70}
                className="h-10 w-auto object-contain sm:h-11"
                priority
              />
              <span className="hidden leading-none xl:block">
                <span className="block text-xs font-semibold uppercase tracking-[0.04em] text-[#55624f]">Kenya Climate</span>
                <span className="block text-sm font-bold uppercase tracking-[0.02em]">Innovation Centre</span>
              </span>
            </Link>

            <div ref={dropdownRef} className="hidden min-w-0 flex-1 justify-center lg:flex">
              <div ref={desktopNavRef} className="flex items-center gap-1">
                {navigation.map((item) => {
                  const active = isActivePath(pathname, item.href) || item.subItems?.some((subItem) => isActivePath(pathname, subItem.href));
                  return (
                    <div
                      key={item.label}
                      data-nav-item
                      className="relative"
                      onMouseEnter={() => item.subItems && openDropdown(item.label)}
                      onMouseLeave={queueCloseDropdown}
                    >
                      {item.subItems ? (
                        <button
                          type="button"
                          className={`flex items-center gap-1 border-b-2 border-transparent px-3 py-2 text-sm font-semibold transition hover:border-[#80c738] hover:text-[#335016] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738] ${
                            active || activeDropdown === item.label ? 'border-[#80c738] text-[#335016]' : ''
                          }`}
                          aria-expanded={activeDropdown === item.label}
                          aria-haspopup="menu"
                          aria-controls={`nav-panel-${item.label}`}
                          onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                          onKeyDown={(event) => handleKeyNavigation(event, item.href)}
                        >
                          {item.label}
                          <CaretDown className={`h-3.5 w-3.5 transition ${activeDropdown === item.label ? 'rotate-180' : ''}`} weight="bold" />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={(event) => handleNavClick(event, item.href)}
                          className={`block border-b-2 border-transparent px-3 py-2 text-sm font-semibold transition hover:border-[#80c738] hover:text-[#335016] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738] ${
                            active ? 'border-[#80c738] text-[#335016]' : ''
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}

                      {item.subItems && activeDropdown === item.label && (
                        <div
                          id={`nav-panel-${item.label}`}
                          role="menu"
                          className="absolute left-1/2 top-[calc(100%+12px)] min-w-[220px] -translate-x-1/2 border border-[#dce5d7] bg-[#fbf7e8] py-2 shadow-[0_18px_38px_rgba(16,32,22,0.16)]"
                        >
                          {item.subItems.map((subItem) => {
                            const subActive = isActivePath(pathname, subItem.href);
                            return (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                role="menuitem"
                                onClick={(event) => handleNavClick(event, subItem.href)}
                                onKeyDown={(event) => handleKeyNavigation(event, subItem.href)}
                                className={`block px-4 py-2.5 text-sm font-medium transition hover:bg-[#e8f4dc] focus:outline-none focus-visible:bg-[#e8f4dc] ${
                                  subActive ? 'bg-[#e8f4dc] text-[#335016]' : 'text-[#102016]'
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              {ctaButton && (
                <Link
                  href={ctaButton.href}
                  onClick={(event) => handleNavClick(event, ctaButton.href)}
                  className="inline-flex items-center gap-2 bg-[#80c738] px-4 py-3 text-sm font-semibold text-[#102016] transition hover:bg-[#9ddf4b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738]"
                >
                  {ctaButton.text}
                  <ArrowRight className="h-4 w-4" weight="bold" />
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="grid h-12 w-12 place-items-center bg-[#80c738] text-[#102016] transition hover:bg-[#9ddf4b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#80c738] lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" weight="bold" /> : <List className="h-6 w-6" weight="bold" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-[#102016]/45 pt-24 text-[#102016] backdrop-blur-sm lg:hidden">
          <div className="h-full overflow-y-auto px-4 pb-8">
            <div className="border border-[#dce5d7] bg-[#fbf7e8] p-4 shadow-[0_24px_55px_rgba(16,32,22,0.24)]">
              <div className="mb-5 flex items-center justify-between border-b border-[#dce5d7] pb-4">
                <span className="text-lg font-bold uppercase tracking-[0.04em]">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="grid h-11 w-11 place-items-center bg-[#80c738] text-[#102016] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#335016]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" weight="bold" />
                </button>
              </div>

              <div className="space-y-3">
                {navigation.map((item) => {
                  const active = isActivePath(pathname, item.href) || item.subItems?.some((subItem) => isActivePath(pathname, subItem.href));
                  return (
                    <div key={item.label} className="border border-[#dce5d7] bg-[#fffdf5]">
                      {item.subItems ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                            className={`flex w-full items-center justify-between px-4 py-4 text-left text-base font-bold ${
                              active || expandedMobileItem === item.label ? 'bg-[#e8f4dc] text-[#335016]' : 'bg-[#fffdf5]'
                            }`}
                            aria-expanded={expandedMobileItem === item.label}
                          >
                            {item.label}
                            <CaretDown className={`h-5 w-5 transition ${expandedMobileItem === item.label ? 'rotate-180' : ''}`} weight="bold" />
                          </button>
                          {expandedMobileItem === item.label && (
                            <div className="border-t border-[#dce5d7] py-1">
                              {item.subItems.map((subItem) => {
                                const subActive = isActivePath(pathname, subItem.href);
                                return (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    onClick={(event) => handleNavClick(event, subItem.href)}
                                    className={`block px-4 py-2.5 text-sm font-medium ${
                                      subActive ? 'bg-[#e8f4dc] text-[#335016]' : ''
                                    }`}
                                  >
                                    {subItem.label}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={(event) => handleNavClick(event, item.href)}
                          className={`block px-4 py-4 text-base font-bold ${active ? 'bg-[#e8f4dc] text-[#335016]' : ''}`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {ctaButton && (
                <Link
                  href={ctaButton.href}
                  onClick={(event) => handleNavClick(event, ctaButton.href)}
                  className="mt-5 flex items-center justify-between bg-[#80c738] px-5 py-4 text-base font-bold text-[#102016]"
                >
                  {ctaButton.text}
                  <ArrowRight className="h-5 w-5" weight="bold" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
