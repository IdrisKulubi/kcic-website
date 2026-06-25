'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Article,
  Archive,
  BookOpen,
  Briefcase,
  Buildings,
  Calendar,
  CaretDown,
  Crosshair,
  FileText,
  Graph,
  Handshake,
  Lightbulb,
  List,
  Megaphone,
  Microphone,
  Newspaper,
  Phone,
  Rocket,
  Shield,
  Star,
  TreeStructure,
  TrendUp,
  Users,
  X,
  ArrowRight,
  ClipboardText,
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

  const getIcon = (iconName: string) => iconMap[iconName as keyof typeof iconMap] || Buildings;

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
          className={`mx-auto max-w-[1500px] border-[4px] border-[#101010] bg-[#fff7df] text-[#101010] shadow-[7px_7px_0_#101010] transition duration-300 ${
            isScrolled ? 'translate-y-0 shadow-[7px_7px_0_#80c738]' : ''
          }`}
        >
          <div className="flex h-[74px] items-center justify-between gap-3 px-3 sm:px-5 lg:h-[82px] lg:px-6">
            <Link
              href="/"
              onClick={(event) => handleNavClick(event, '/')}
              className="group flex shrink-0 items-center gap-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738]"
              aria-label="KCIC, go to homepage"
            >
              <span className="grid h-14 w-20 place-items-center border-[3px] border-[#101010] bg-[#fff7df] shadow-[4px_4px_0_#80c738] sm:w-24">
                <Image
                  src={logoSrc}
                  alt={logo?.alt || 'KCIC Logo'}
                  width={130}
                  height={70}
                  className="max-h-11 w-auto object-contain"
                  priority
                />
              </span>
              <span className="hidden leading-none xl:block">
                <span className="block text-xs font-black uppercase text-[#58523f]">Kenya Climate</span>
                <span className="block text-sm font-black uppercase">Innovation Centre</span>
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
                          className={`flex items-center gap-1 border-[3px] border-transparent px-3 py-2 text-sm font-black uppercase transition hover:border-[#101010] hover:bg-[#80c738] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738] xl:px-4 ${
                            active || activeDropdown === item.label ? 'border-[#101010] bg-[#80c738]' : ''
                          }`}
                          aria-expanded={activeDropdown === item.label}
                          aria-haspopup="menu"
                          aria-controls={`nav-panel-${item.label}`}
                          onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                          onKeyDown={(event) => handleKeyNavigation(event, item.href)}
                        >
                          {item.label}
                          <CaretDown className={`h-4 w-4 transition ${activeDropdown === item.label ? 'rotate-180' : ''}`} weight="bold" />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={(event) => handleNavClick(event, item.href)}
                          className={`block border-[3px] border-transparent px-3 py-2 text-sm font-black uppercase transition hover:border-[#101010] hover:bg-[#80c738] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738] xl:px-4 ${
                            active ? 'border-[#101010] bg-[#80c738]' : ''
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}

                      {item.subItems && activeDropdown === item.label && (
                        <div
                          id={`nav-panel-${item.label}`}
                          role="menu"
                          className="absolute left-1/2 top-[calc(100%+16px)] w-[min(760px,calc(100vw-3rem))] -translate-x-1/2 border-[4px] border-[#101010] bg-[#fff7df] p-3 shadow-[10px_10px_0_#101010]"
                        >
                          <div className="mb-3 flex items-center justify-between border-b-[3px] border-[#101010] pb-3">
                            <span className="bg-[#101010] px-3 py-1 text-xs font-black uppercase text-[#fff7df]">{item.label}</span>
                            <Link
                              href={item.href}
                              onClick={(event) => handleNavClick(event, item.href)}
                              className="inline-flex items-center gap-1 text-xs font-black uppercase hover:text-[#5a8f1d]"
                            >
                              Open section
                              <ArrowRight className="h-3.5 w-3.5" weight="bold" />
                            </Link>
                          </div>
                          <div className={`grid gap-2 ${item.subItems.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {item.subItems.map((subItem) => {
                              const Icon = getIcon(subItem.icon);
                              const subActive = isActivePath(pathname, subItem.href);
                              return (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  role="menuitem"
                                  onClick={(event) => handleNavClick(event, subItem.href)}
                                  onKeyDown={(event) => handleKeyNavigation(event, subItem.href)}
                                  className={`group flex gap-3 border-[3px] border-[#101010] p-3 shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5 hover:bg-[#80c738] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738] ${
                                    subActive ? 'bg-[#80c738]' : 'bg-[#fff7df]'
                                  }`}
                                >
                                  <span className="grid h-11 w-11 shrink-0 place-items-center border-[3px] border-[#101010] bg-[#fff7df]">
                                    <Icon className="h-5 w-5" weight="bold" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-sm font-black uppercase leading-tight">{subItem.label}</span>
                                    {subItem.description && (
                                      <span className="mt-1 line-clamp-2 block text-xs font-bold leading-5 text-[#58523f]">
                                        {subItem.description}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
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
                  className="inline-flex items-center gap-2 border-[3px] border-[#101010] bg-[#80c738] px-4 py-3 text-sm font-black uppercase shadow-[5px_5px_0_#101010] transition hover:-translate-y-1 hover:shadow-[7px_7px_0_#101010] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738]"
                >
                  {ctaButton.text}
                  <ArrowRight className="h-4 w-4" weight="bold" />
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="grid h-12 w-12 place-items-center border-[3px] border-[#101010] bg-[#80c738] shadow-[4px_4px_0_#101010] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#80c738] lg:hidden"
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
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-[#fff7df] pt-28 text-[#101010] lg:hidden">
          <div className="absolute inset-x-0 top-0 h-24 border-b-[5px] border-[#101010] bg-[#80c738]" aria-hidden="true" />
          <div className="h-full overflow-y-auto px-4 pb-8">
            <div className="border-[5px] border-[#101010] bg-[#fff7df] p-4 shadow-[9px_9px_0_#101010]">
              <div className="mb-5 flex items-center justify-between border-b-[4px] border-[#101010] pb-4">
                <span className="text-2xl font-black uppercase">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="grid h-11 w-11 place-items-center border-[3px] border-[#101010] bg-[#80c738] shadow-[4px_4px_0_#101010]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" weight="bold" />
                </button>
              </div>

              <div className="space-y-3">
                {navigation.map((item) => {
                  const active = isActivePath(pathname, item.href) || item.subItems?.some((subItem) => isActivePath(pathname, subItem.href));
                  return (
                    <div key={item.label} className="border-[3px] border-[#101010] bg-[#fff7df]">
                      {item.subItems ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                            className={`flex w-full items-center justify-between px-4 py-4 text-left text-xl font-black uppercase ${
                              active || expandedMobileItem === item.label ? 'bg-[#80c738]' : 'bg-[#fff7df]'
                            }`}
                            aria-expanded={expandedMobileItem === item.label}
                          >
                            {item.label}
                            <CaretDown className={`h-5 w-5 transition ${expandedMobileItem === item.label ? 'rotate-180' : ''}`} weight="bold" />
                          </button>
                          {expandedMobileItem === item.label && (
                            <div className="space-y-2 border-t-[3px] border-[#101010] p-3">
                              <Link
                                href={item.href}
                                onClick={(event) => handleNavClick(event, item.href)}
                                className="flex items-center justify-between bg-[#101010] px-3 py-3 text-sm font-black uppercase text-[#fff7df]"
                              >
                                Open section
                                <ArrowRight className="h-4 w-4" weight="bold" />
                              </Link>
                              {item.subItems.map((subItem) => {
                                const Icon = getIcon(subItem.icon);
                                return (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    onClick={(event) => handleNavClick(event, subItem.href)}
                                    className="flex gap-3 border-[3px] border-[#101010] bg-[#fff7df] p-3 shadow-[4px_4px_0_#101010]"
                                  >
                                    <span className="grid h-10 w-10 shrink-0 place-items-center border-[3px] border-[#101010] bg-[#80c738]">
                                      <Icon className="h-5 w-5" weight="bold" />
                                    </span>
                                    <span>
                                      <span className="block text-base font-black uppercase leading-tight">{subItem.label}</span>
                                      {subItem.description && (
                                        <span className="mt-1 line-clamp-2 block text-sm font-bold leading-5 text-[#58523f]">
                                          {subItem.description}
                                        </span>
                                      )}
                                    </span>
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
                          className={`block px-4 py-4 text-xl font-black uppercase ${active ? 'bg-[#80c738]' : ''}`}
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
                  className="mt-5 flex items-center justify-between border-[4px] border-[#101010] bg-[#80c738] px-5 py-4 text-lg font-black uppercase shadow-[6px_6px_0_#101010]"
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
