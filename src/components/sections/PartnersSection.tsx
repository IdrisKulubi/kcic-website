"use client";

import { useState, useMemo, useCallback } from "react";
import { colors, typography } from "@/lib/design-system";
import { Badge } from "@/components/ui/badge";
import {
  Sparkle as Sparkles,
  ArrowRight,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface PartnerData {
  id: string;
  name: string;
  logo: string;
  category?: "donor" | "partner" | "supporter" | "collaborator";
  description?: string;
  website?: string;
  featured?: boolean;
}

interface PartnersSectionProps {
  partners: PartnerData[];
  title?: string;
  subtitle?: string;
}

export function PartnersSection({
  partners,
  title = "Our Partners",
  subtitle = "Collaborating with world-class organizations to accelerate climate innovation",
}: PartnersSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Split partners into two rows for dual marquee
  const { topRow, bottomRow } = useMemo(() => {
    const mid = Math.ceil(partners.length / 2);
    return {
      topRow: [...partners.slice(0, mid), ...partners.slice(0, mid), ...partners.slice(0, mid)],
      bottomRow: [...partners.slice(mid), ...partners.slice(mid), ...partners.slice(mid)],
    };
  }, [partners]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge
              className="mb-4 px-4 py-1.5 border rounded-full inline-flex items-center gap-1.5"
              style={{
                backgroundColor: colors.primary.green[50],
                borderColor: colors.primary.green[200],
                color: colors.primary.green[700],
              }}
            >
              <Sparkles className="h-3.5 w-3.5" weight="fill" />
              Trusted by Industry Leaders
            </Badge>
            <h2
              className="font-bold mb-3"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
                lineHeight: typography.lineHeights.tight,
              }}
            >
              {title}
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[500],
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Dual Marquee Container */}
          <div className="relative">
            {/* Edge Gradients */}
            <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-gray-50/80 via-gray-50/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50/80 via-gray-50/50 to-transparent z-10 pointer-events-none" />

            {/* Top Row - Scrolls Left */}
            <div className="relative overflow-hidden py-4">
              <div className="flex animate-marquee-left">
                {topRow.map((partner, index) => (
                  <div
                    key={`top-${partner.id}-${index}`}
                    className="flex-shrink-0 mx-6 sm:mx-8"
                  >
                    <div className="relative h-12 sm:h-14 w-24 sm:w-32 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <Image
                        src={partner.logo || "/images/placeholder-logo.png"}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                        width={120}
                        height={56}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row - Scrolls Right */}
            <div className="relative overflow-hidden py-4">
              <div className="flex animate-marquee-right">
                {bottomRow.map((partner, index) => (
                  <div
                    key={`bottom-${partner.id}-${index}`}
                    className="flex-shrink-0 mx-6 sm:mx-8"
                  >
                    <div className="relative h-12 sm:h-14 w-24 sm:w-32 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <Image
                        src={partner.logo || "/images/placeholder-logo.png"}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                        width={120}
                        height={56}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <button
              onClick={openModal}
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:border-[#80c738] hover:text-[#80c738] transition-all duration-300 hover:shadow-md"
            >
              View All {partners.length} Partners
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes marquee-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          @keyframes marquee-right {
            0% {
              transform: translateX(-33.333%);
            }
            100% {
              transform: translateX(0);
            }
          }
          .animate-marquee-left {
            animation: marquee-left 35s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 35s linear infinite;
          }
          .animate-marquee-left:hover,
          .animate-marquee-right:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Full Partners Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">All Partners</h3>
                  <p className="text-sm text-gray-500">{partners.length} organizations</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {partners.map((partner) => (
                    <a
                      key={partner.id}
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center p-4 bg-gray-50 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300 aspect-square"
                    >
                      <Image
                        src={partner.logo || "/images/placeholder-logo.png"}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        width={100}
                        height={100}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
