"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  XLogo,
  LinkedinLogo,
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  Envelope,
  Phone,
  MapPin,
  PaperPlaneTilt,
  ShieldCheck,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FooterData } from "@/data/home";
import { colors } from "@/lib/design-system";
import { WhistleblowerModal } from "@/components/whistleblower/WhistleblowerModal";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FooterProps {
  data: FooterData;
}

const socialIcons = {
  twitter: XLogo,
  linkedin: LinkedinLogo,
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
};

export default function Footer({ data }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isWhistleblowerOpen, setIsWhistleblowerOpen] = useState(false);
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const footerRef = useRef<HTMLElement | null>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations?.() || !footerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      columnRefs.current.forEach((column, index) => {
        if (!column) return;

        gsap.fromTo(
          column,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: column,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      if (bottomBarRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }, footerRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setSubmitMessage("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setSubmitMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    // Simulate API call
    setTimeout(() => {
      setSubmitMessage("Thank you for subscribing!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#1a1f2e] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute top-0 left-0 h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #80c738 0%, #00addd 55%, #80c738 100%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div ref={(el) => { columnRefs.current[0] = el; }}>
            <Link href="/" className="inline-flex items-center rounded-xl bg-white/95 px-3 py-2 mb-6" aria-label="Kenya Climate Innovation Centre home">
              <Image
                src="/images/hero/KCIC logo.png"
                alt="Kenya Climate Innovation Centre logo"
                width={150}
                height={44}
                className="h-10 w-auto"
                priority
              />
            </Link>

            <h3 className="text-base font-semibold text-white mb-4">Quicklinks</h3>
            <ul className="space-y-2">
              {data.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-[#80c738] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div ref={(el) => { columnRefs.current[1] = el; }}>
            <h3 className="text-base font-semibold text-white mb-4">Office Address</h3>

            <address className="space-y-3 not-italic text-sm text-white/80 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#80c738] mt-1 shrink-0" />
                <span>{data.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#00addd] shrink-0" />
                <a href={`tel:${data.contact.phone}`} className="hover:text-white transition-colors">
                  {data.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Envelope className="h-4 w-4 text-[#E97451] shrink-0" />
                <a href={`mailto:${data.contact.email}`} className="hover:text-white transition-colors">
                  {data.contact.email}
                </a>
              </div>
            </address>

            <h3 className="text-base font-semibold text-white mb-3">Social Media</h3>
            <div className="flex flex-wrap gap-2.5">
              {data.socialMedia.map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons] || XLogo;

                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow KCIC on ${social.platform}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition-all hover:border-[#80c738] hover:text-[#80c738] hover:shadow-[0_0_18px_rgba(128,199,56,0.35)]"
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div ref={(el) => { columnRefs.current[2] = el; }}>
            <h3 className="text-base font-semibold text-white mb-3">Mailing List Subscription</h3>
            <p className="text-sm text-white/75 mb-4 leading-relaxed">
              {data.newsletter.description}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3" aria-label="Mailing list subscription">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.newsletter.placeholder}
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-white/25 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-[#80c738] focus-visible:border-[#80c738]"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 rounded-full px-6 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  style={{ backgroundColor: colors.primary.green.DEFAULT }}
                >
                  <PaperPlaneTilt className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>

              {submitMessage && (
                <div className={`text-xs ${submitMessage.includes("Thank you") ? "text-[#80c738]" : "text-[#ffb3a1]"}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        <div ref={bottomBarRef} className="mt-10 pt-6 border-t border-white/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-white/65 text-center sm:text-left">
              {data.copyright}
            </p>

            <button
              onClick={() => setIsWhistleblowerOpen(true)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary.green.DEFAULT }}
            >
              <ShieldCheck className="h-4 w-4" />
              Whistleblower
            </button>
          </div>
        </div>
      </div>

      <WhistleblowerModal
        isOpen={isWhistleblowerOpen}
        onClose={() => setIsWhistleblowerOpen(false)}
      />
    </footer>
  );
}
