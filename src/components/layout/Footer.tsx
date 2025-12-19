"use client";

import React, { useState } from "react";
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
    <footer className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand and Contact Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 inline-block" aria-label="Kenya Climate Innovation Centre home">
              <Image
                src="/images/hero/KCIC logo.png"
                alt="Kenya Climate Innovation Centre logo"
                width={160}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>

            <address className="space-y-3 text-gray-600 not-italic">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed">
                  {data.contact.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <a
                  href={`tel:${data.contact.phone}`}
                  className="text-sm hover:text-blue-600 transition-colors"
                >
                  {data.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Envelope className="h-5 w-5 text-yellow-400 shrink-0" />
                <a
                  href={`mailto:${data.contact.email}`}
                  className="text-sm hover:text-yellow-600 transition-colors"
                >
                  {data.contact.email}
                </a>
              </div>
            </address>
          </div>

          {/* Quick Links */}
          <nav className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {data.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300 text-sm block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {data.socialMedia.map((social) => {
                const IconComponent =
                  socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 group flex items-center justify-center"
                    aria-label={`Follow KCIC on ${social.platform}`}
                  >
                    <IconComponent className="h-5 w-5 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">
              {data.newsletter.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {data.newsletter.description}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.newsletter.placeholder}
                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-500 pr-12"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 p-0 text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-200"
                  style={{ backgroundColor: colors.primary.green.DEFAULT }}
                >
                  <PaperPlaneTilt className="h-4 w-4" />
                </Button>
              </div>

              {submitMessage && (
                <div
                  className={`text-xs ${submitMessage.includes("Thank you")
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              {data.copyright}
            </p>

            {/* Whistleblower Button */}
            <button
              onClick={() => setIsWhistleblowerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-200 rounded-lg transition-all duration-200"
              style={{ backgroundColor: colors.primary.green.DEFAULT }}
            >
              <ShieldCheck className="w-4 h-4" />
              Whistleblower
            </button>
          </div>
        </div>
      </div>

      {/* Whistleblower Modal */}
      <WhistleblowerModal
        isOpen={isWhistleblowerOpen}
        onClose={() => setIsWhistleblowerOpen(false)}
      />
    </footer>
  );
}
