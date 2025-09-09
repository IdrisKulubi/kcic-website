"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FooterData } from "@/data/home";

interface FooterProps {
  data: FooterData;
}

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

export default function Footer({ data }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand and Contact Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold">KCIC</span>
            </div>

            <address className="space-y-3 text-gray-300 not-italic">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  {data.contact.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a
                  href={`tel:${data.contact.phone}`}
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {data.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <a
                  href={`mailto:${data.contact.email}`}
                  className="text-sm hover:text-yellow-400 transition-colors"
                >
                  {data.contact.email}
                </a>
              </div>
            </address>
          </div>

          {/* Quick Links */}
          <nav className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {data.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">Follow Us</h3>
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
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 group flex items-center justify-center"
                    aria-label={`Follow KCIC on ${social.platform}`}
                  >
                    <IconComponent className="h-5 w-5 text-gray-300 group-hover:text-green-400 transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              {data.newsletter.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {data.newsletter.description}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.newsletter.placeholder}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 pr-12"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="absolute right-1 top-1 h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {submitMessage && (
                <div
                  className={`text-xs ${
                    submitMessage.includes("Thank you")
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
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              {data.copyright}
            </p>

            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>Made with</span>
              <Leaf className="h-4 w-4 text-green-500" />
              <span>for a sustainable future</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
