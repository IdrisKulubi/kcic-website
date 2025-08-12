'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FooterData } from '@/data/home';
import { 
  touchTargetUtils, 
  colorUtils, 
  motionUtils,
  formUtils,
  screenReaderUtils,
  KEYBOARD_KEYS
} from '@/lib/accessibility';

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
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [easterEggActive, setEasterEggActive] = useState(false);

  // Generate unique IDs for form elements
  const emailFieldId = formUtils.generateId('newsletter-email');
  const errorId = formUtils.generateId('newsletter-error');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      const message = 'Please enter your email address';
      setSubmitMessage(message);
      screenReaderUtils.announce(message, 'assertive');
      return;
    }

    if (!validateEmail(email)) {
      const message = 'Please enter a valid email address';
      setSubmitMessage(message);
      screenReaderUtils.announce(message, 'assertive');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    
    // Simulate API call
    setTimeout(() => {
      const message = 'Thank you for subscribing!';
      setSubmitMessage(message);
      setEmail('');
      setIsSubmitting(false);
      screenReaderUtils.announce(message, 'polite');
    }, 1000);
  };

  const handleSocialClick = (href: string, platform: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
    screenReaderUtils.announce(`Opening ${platform} in new tab`, 'polite');
  };

  const handleSocialKeyDown = (e: React.KeyboardEvent, href: string, platform: string) => {
    if (e.key === KEYBOARD_KEYS.ENTER || e.key === KEYBOARD_KEYS.SPACE) {
      e.preventDefault();
      handleSocialClick(href, platform);
    }
  };

  // Easter egg: Multiple clicks on logo area
  const handleLogoClick = () => {
    setEasterEggActive(true);
    setTimeout(() => setEasterEggActive(false), 3000);
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-10 left-10 w-32 h-32 bg-climate-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-climate-blue rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-climate-yellow rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          
          {/* Brand and Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              className={`mb-6 cursor-pointer ${colorUtils.getFocusRingClasses()} rounded-md p-2`}
              onClick={handleLogoClick}
              onKeyDown={(e) => {
                if (e.key === KEYBOARD_KEYS.ENTER || e.key === KEYBOARD_KEYS.SPACE) {
                  e.preventDefault();
                  handleLogoClick();
                }
              }}
              whileHover={motionUtils.prefersReducedMotion() ? {} : { scale: 1.05 }}
              whileTap={motionUtils.prefersReducedMotion() ? {} : { scale: 0.95 }}
              tabIndex={0}
              role="button"
              aria-label="KCIC logo - Click for surprise"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <Leaf className="h-8 w-8 text-climate-green" aria-hidden="true" />
                  {easterEggActive && (
                    <motion.div
                      initial={motionUtils.prefersReducedMotion() ? {} : { scale: 0, opacity: 0 }}
                      animate={motionUtils.prefersReducedMotion() ? {} : { scale: 1, opacity: 1 }}
                      exit={motionUtils.prefersReducedMotion() ? {} : { scale: 0, opacity: 0 }}
                      className="absolute -top-2 -right-2"
                      aria-hidden="true"
                    >
                      <Sparkles className="h-4 w-4 text-climate-yellow animate-pulse" />
                    </motion.div>
                  )}
                </div>
                <span className="text-xl font-bold">KCIC</span>
              </div>
            </motion.div>

            <address className="space-y-3 text-slate-300 not-italic">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-climate-green mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm leading-relaxed">{data.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-climate-blue flex-shrink-0" aria-hidden="true" />
                <a 
                  href={`tel:${data.contact.phone}`}
                  className={`text-sm hover:text-climate-blue transition-colors ${colorUtils.getFocusRingClasses()} rounded px-1`}
                  aria-label={`Call KCIC at ${data.contact.phone}`}
                >
                  {data.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-climate-yellow flex-shrink-0" aria-hidden="true" />
                <a 
                  href={`mailto:${data.contact.email}`}
                  className={`text-sm hover:text-climate-yellow transition-colors ${colorUtils.getFocusRingClasses()} rounded px-1`}
                  aria-label={`Email KCIC at ${data.contact.email}`}
                >
                  {data.contact.email}
                </a>
              </div>
            </address>
          </div>

          {/* Quick Links */}
          <nav className="lg:col-span-1" aria-labelledby="footer-quick-links">
            <h3 id="footer-quick-links" className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {data.quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, x: -20 }}
                  animate={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
                  transition={motionUtils.prefersReducedMotion() ? {} : { delay: index * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className={`text-slate-300 hover:text-climate-green transition-colors duration-300 text-sm block py-1 ${colorUtils.getFocusRingClasses()} rounded px-2 ${touchTargetUtils.getTouchClasses()}`}
                    aria-label={`Navigate to ${link.label} page`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Social Media */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-white">Follow Us</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Social media links">
              {data.socialMedia.map((social, index) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <motion.button
                    key={social.platform}
                    onClick={() => handleSocialClick(social.href, social.platform)}
                    onKeyDown={(e) => handleSocialKeyDown(e, social.href, social.platform)}
                    className={`p-2 sm:p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 group flex items-center justify-center ${touchTargetUtils.getTouchClasses()} ${colorUtils.getFocusRingClasses()}`}
                    whileHover={motionUtils.prefersReducedMotion() ? {} : { scale: 1.1, y: -2 }}
                    whileTap={motionUtils.prefersReducedMotion() ? {} : { scale: 0.95 }}
                    initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, y: 20 }}
                    animate={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                    transition={motionUtils.prefersReducedMotion() ? {} : { delay: index * 0.1 }}
                    aria-label={`Follow KCIC on ${social.platform} - Opens in new tab`}
                    role="listitem"
                  >
                    <IconComponent className="h-5 w-5 text-slate-300 group-hover:text-climate-green transition-colors duration-300" aria-hidden="true" />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-white">{data.newsletter.title}</h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              {data.newsletter.description}
            </p>
            
            <form 
              onSubmit={handleNewsletterSubmit} 
              className="space-y-3"
              role="form"
              aria-labelledby="newsletter-title"
            >
              <div className="relative">
                <Input
                  id={emailFieldId}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.newsletter.placeholder}
                  className={`bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-climate-green focus:ring-climate-green pr-12 ${colorUtils.getFocusRingClasses()}`}
                  disabled={isSubmitting}
                  aria-label="Email address for newsletter subscription"
                  aria-required="true"
                  aria-describedby={submitMessage ? errorId : undefined}
                  aria-invalid={submitMessage && !submitMessage.includes('Thank you') ? 'true' : 'false'}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className={`absolute right-1 top-1 h-8 w-8 p-0 bg-climate-green hover:bg-climate-green/80 min-h-[32px] min-w-[32px] ${colorUtils.getFocusRingClasses()}`}
                  aria-label={isSubmitting ? 'Subscribing...' : 'Subscribe to newsletter'}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              
              {submitMessage && (
                <motion.div
                  initial={motionUtils.prefersReducedMotion() ? {} : { opacity: 0, y: -10 }}
                  animate={motionUtils.prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                  {...formUtils.getErrorProps(emailFieldId, errorId)}
                  className={`text-xs ${
                    submitMessage.includes('Thank you') 
                      ? 'text-climate-green' 
                      : 'text-red-400'
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-slate-400 text-xs sm:text-sm text-center sm:text-left">
              {data.copyright}
            </p>
            
            {/* Easter egg: Hidden climate stats */}
            {easterEggActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-xs text-climate-green font-mono"
              >
                🌱 CO₂ Reduced: 15,000 tons | 🌍 Trees Planted: 50,000 | ⚡ Clean Energy: 25MW
              </motion.div>
            )}
            
            <div className="flex items-center space-x-2 sm:space-x-4 text-slate-400 text-xs sm:text-sm">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              >
                <Leaf className="h-3 w-3 sm:h-4 sm:w-4 text-climate-green" />
              </motion.div>
              <span className="hidden sm:inline">for a sustainable future</span>
              <span className="sm:hidden">for sustainability</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}