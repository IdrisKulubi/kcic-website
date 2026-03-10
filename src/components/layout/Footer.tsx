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
import { FooterData } from "@/data/home";
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

// Fixed colour palette so the footer is never affected by page light/dark theme
const C = {
  bg:          "#141922",
  border:      "rgba(255,255,255,0.10)",
  borderHover: "rgba(128,199,56,0.55)",
  label:       "rgba(255,255,255,0.40)",
  body:        "rgba(255,255,255,0.68)",
  muted:       "rgba(255,255,255,0.48)",
  white:       "#ffffff",
  green:       "#80c738",
  blue:        "#00addd",
  orange:      "#e97451",
} as const;

export default function Footer({ data }: FooterProps) {
  const [email, setEmail]               = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isWhistleblowerOpen, setIsWhistleblowerOpen] = useState(false);
  const { shouldDisableAnimations } = useAccessibilityClasses();

  const footerRef = useRef<HTMLElement | null>(null);
  const innerRef  = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (shouldDisableAnimations?.() || !innerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: innerRef.current, start: "top 96%", toggleActions: "play none none reverse" },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitMessage("Subscribed ✓");
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 3500);
    }, 900);
  };

  return (
    <footer
      ref={footerRef}
      style={{ backgroundColor: C.bg, colorScheme: "dark", color: C.white, position: "relative" }}
    >
      {/* top brand line */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, left: 0, height: 2, width: "100%",
          background: "linear-gradient(90deg,#80c738 0%,#00addd 55%,#80c738 100%)",
        }}
      />

      <div ref={innerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── MAIN ROW ── */}
        <div className="flex flex-col gap-8 py-8 lg:flex-row lg:items-start lg:gap-10 lg:py-9">

          {/* 1 · Logo + tagline */}
          <div className="shrink-0 lg:w-44">
            <Link href="/" aria-label="KCIC home">
              <span
                className="mb-3 inline-flex px-2.5 py-1.5"
                style={{ backgroundColor: "rgba(255,255,255,0.96)" }}
              >
                <Image
                  src="/images/hero/KCIC logo.png"
                  alt="KCIC"
                  width={110}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </span>
            </Link>
            <p style={{ fontSize: 11, lineHeight: "18px", letterSpacing: "0.12em", color: C.muted, textTransform: "uppercase", marginTop: 6 }}>
              Climate Innovation<br />Centre — Kenya
            </p>
          </div>

          {/* 2 · Nav links */}
          <div className="flex flex-col gap-1.5 lg:w-28 lg:pt-0.5">
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: C.label, textTransform: "uppercase", marginBottom: 4 }}>
              Pages
            </span>
            {data.quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontSize: 13, lineHeight: "24px", color: C.body, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = C.green)}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = C.body)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 3 · Contact */}
          <div className="flex flex-col gap-2 lg:flex-1 lg:pt-0.5">
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: C.label, textTransform: "uppercase", marginBottom: 4 }}>
              Contact
            </span>
            <address className="not-italic" style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, lineHeight: "22px", color: C.body }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <MapPin style={{ marginTop: 3, width: 14, height: 14, flexShrink: 0, color: C.green }} />
                <span>{data.contact.address}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Phone style={{ width: 14, height: 14, flexShrink: 0, color: C.blue }} />
                <a href={`tel:${data.contact.phone}`} style={{ color: C.body, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = C.white)}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = C.body)}>
                  {data.contact.phone}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Envelope style={{ width: 14, height: 14, flexShrink: 0, color: C.orange }} />
                <a href={`mailto:${data.contact.email}`} style={{ color: C.body, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = C.white)}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = C.body)}>
                  {data.contact.email}
                </a>
              </div>
            </address>
          </div>

          {/* 4 · Newsletter + social */}
          <div className="flex flex-col gap-3 lg:w-72 lg:pt-0.5">
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: C.label, textTransform: "uppercase" }}>
              Stay Updated
            </span>
            <p style={{ fontSize: 13, lineHeight: "22px", color: C.body, margin: 0 }}>
              {data.newsletter.description}
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              style={{ display: "flex", gap: 0, height: 38 }}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={data.newsletter.placeholder}
                disabled={isSubmitting}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: 38,
                  border: `1px solid ${C.border}`,
                  borderRight: "none",
                  background: "rgba(255,255,255,0.06)",
                  color: C.white,
                  fontSize: 13,
                  padding: "0 12px",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = C.green)}
                onBlur={(e)  => (e.target.style.borderColor = C.border)}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  height: 38,
                  padding: "0 14px",
                  background: C.green,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isSubmitting ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                <PaperPlaneTilt style={{ width: 16, height: 16, color: C.white }} />
              </button>
            </form>

            {submitMessage && (
              <span style={{ fontSize: 12, color: C.green }}>{submitMessage}</span>
            )}

            {/* Social icons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
              {data.socialMedia.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons] || XLogo;
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`KCIC on ${social.platform}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 28,
                      height: 28,
                      border: `1px solid ${C.border}`,
                      background: "rgba(255,255,255,0.04)",
                      color: C.muted,
                      transition: "border-color 0.2s, color 0.2s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = C.green;
                      el.style.color = C.green;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = C.border;
                      el.style.color = C.muted;
                    }}
                  >
                    <Icon style={{ width: 13, height: 13 }} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            borderTop: `1px solid ${C.border}`,
            padding: "12px 0",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: 11, color: C.label, margin: 0 }}>
            {data.copyright}
          </p>
          <button
            onClick={() => setIsWhistleblowerOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: `1px solid ${C.border}`,
              background: "transparent",
              padding: "6px 12px",
              fontSize: 11,
              fontWeight: 500,
              color: C.muted,
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = C.borderHover;
              el.style.color = C.white;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = C.border;
              el.style.color = C.muted;
            }}
          >
            <ShieldCheck style={{ width: 13, height: 13, color: C.green }} />
            Whistleblower
          </button>
        </div>
      </div>

      <WhistleblowerModal
        isOpen={isWhistleblowerOpen}
        onClose={() => setIsWhistleblowerOpen(false)}
      />
    </footer>
  );
}
