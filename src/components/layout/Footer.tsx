"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Envelope,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  PaperPlaneTilt,
  Phone,
  ShieldCheck,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { FooterData } from "@/data/home";
import { WhistleblowerModal } from "@/components/whistleblower/WhistleblowerModal";
import { useAccessibilityClasses } from "@/hooks/use-accessibility-classes";
import { gsap, prefersReducedMotion, registerGsapFoundation } from "@/lib/gsap-foundation";

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

  useLayoutEffect(() => {
    if (!footerRef.current || prefersReducedMotion() || shouldDisableAnimations?.()) return;

    registerGsapFoundation();
    const ctx = gsap.context(() => {
      gsap.from("[data-footer-item]", {
        y: 14,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.04,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, [shouldDisableAnimations]);

  const handleNewsletterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitMessage("Subscribed");
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 3000);
    }, 700);
  };

  return (
    <footer ref={footerRef} className="border-t border-[#101010]/10 bg-[#fff7df] text-[#101010]">
      <style jsx>{`
        .kcic-footer-grid {
          display: grid;
          grid-template-columns: minmax(180px, 1fr) 128px minmax(280px, 1.25fr) 280px;
          gap: 24px;
          align-items: start;
        }

        .kcic-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 980px) {
          .kcic-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .kcic-footer-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }
      `}</style>

      <div className="h-[3px] bg-[#80c738]" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px] px-4 py-4 sm:px-5">
        <div className="kcic-footer-grid">
          <section data-footer-item aria-label="KCIC footer summary">
            <Link
              href="/"
              aria-label="KCIC home"
              className="inline-flex items-center overflow-hidden"
              style={{ width: 96, height: 34 }}
            >
              <img
                src="/images/hero/KCIC logo.png"
                alt="KCIC"
                className="block object-contain"
                style={{ width: 96, maxWidth: 96, height: "auto", maxHeight: 34 }}
              />
            </Link>
            <p className="mt-2 max-w-[260px] text-[13px] font-semibold leading-5 text-[#3d3a2f]">
              Climate entrepreneurship and green growth across the world.
            </p>
          </section>

          <nav data-footer-item aria-label="Footer links">
            <p className="text-[11px] font-black uppercase text-[#4f8618]">Pages</p>
            <div className="mt-2 grid gap-1">
              {data.quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-bold leading-5 text-[#28261d] transition hover:text-[#4f8618]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <address data-footer-item className="not-italic">
            <p className="text-[11px] font-black uppercase text-[#4f8618]">Contact</p>
            <div className="mt-2 grid gap-1.5 text-[13px] font-semibold leading-5 text-[#4d4a3d]">
              <p className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4f8618]" weight="bold" />
                <span className="max-w-[52ch]">{data.contact.address}</span>
              </p>
              <a href={`tel:${data.contact.phone}`} className="flex gap-2 transition hover:text-[#4f8618]">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#4f8618]" weight="bold" />
                <span>{data.contact.phone}</span>
              </a>
              <a href={`mailto:${data.contact.email}`} className="flex gap-2 transition hover:text-[#4f8618]">
                <Envelope className="mt-0.5 h-4 w-4 shrink-0 text-[#4f8618]" weight="bold" />
                <span>{data.contact.email}</span>
              </a>
            </div>
          </address>

          <section data-footer-item aria-label="Newsletter and social links">
            <p className="text-[11px] font-black uppercase text-[#4f8618]">Stay Updated</p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-2 flex h-9 max-w-[280px]"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={data.newsletter.placeholder}
                disabled={isSubmitting}
                className="min-w-0 flex-1 border border-[#101010]/15 bg-[#fffdf3] px-3 text-[13px] font-semibold text-[#101010] outline-none transition placeholder:text-[#706b59] focus:border-[#80c738]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="grid w-10 place-items-center bg-[#80c738] text-[#101010] transition hover:bg-[#6fb52d] disabled:opacity-60"
                aria-label="Subscribe"
              >
                <PaperPlaneTilt className="h-4 w-4" weight="bold" />
              </button>
            </form>
            {submitMessage && <p className="mt-2 text-[11px] font-black uppercase text-[#4f8618]">{submitMessage}</p>}

            <div className="mt-3 flex flex-wrap gap-2">
              {data.socialMedia.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons] || XLogo;
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`KCIC on ${social.platform}`}
                    className="grid h-8 w-8 place-items-center border border-[#101010]/15 bg-[#fffdf3] text-[#4d4a3d] transition hover:border-[#80c738] hover:bg-[#e5f7c9] hover:text-[#4f8618]"
                  >
                    <Icon className="h-4 w-4" weight="bold" />
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <div className="kcic-footer-bottom mt-4 border-t border-[#101010]/10 pt-3">
          <p className="text-[12px] font-semibold leading-5 text-[#706b59]">{data.copyright}</p>
          <button
            type="button"
            onClick={() => setIsWhistleblowerOpen(true)}
            className="inline-flex items-center gap-2 border border-[#101010]/15 bg-[#fffdf3] px-3 py-2 text-[12px] font-black uppercase text-[#4d4a3d] transition hover:border-[#80c738] hover:bg-[#e5f7c9] hover:text-[#4f8618]"
          >
            <ShieldCheck className="h-4 w-4" weight="bold" />
            Whistleblower
          </button>
        </div>
      </div>

      <WhistleblowerModal isOpen={isWhistleblowerOpen} onClose={() => setIsWhistleblowerOpen(false)} />
    </footer>
  );
}
