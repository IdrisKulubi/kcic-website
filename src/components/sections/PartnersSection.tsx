"use client";

import { useState, useMemo, memo } from "react";
import { colors, typography } from "@/lib/design-system";
import { Badge } from "@/components/ui/badge";
import {
  Sparkle as Sparkles,
  Globe as Globe2,
  Users,
  Medal as Award,
  Buildings as Building2,
  type Icon as LucideIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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

const CATEGORY_CONFIG: Record<string, { icon: LucideIcon; label: string }> = {
  donor: { icon: Award, label: "Donors" },
  partner: { icon: Users, label: "Partners" },
  supporter: { icon: Globe2, label: "Supporters" },
  collaborator: { icon: Building2, label: "Collaborators" },
};

export function PartnersSection({
  partners,
  title = "Our Partners",
  subtitle = "Collaborating with world-class organizations to accelerate climate innovation",
}: PartnersSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isPaused, setIsPaused] = useState(false);

  const categorizedPartners = useMemo(() => {
    const result: Record<string, PartnerData[]> = {};
    partners.forEach((partner) => {
      const category = partner.category || "supporter";
      if (!result[category]) result[category] = [];
      result[category].push(partner);
    });
    return result;
  }, [partners]);

  const displayPartners = useMemo(() => {
    if (activeTab === "all") return partners;
    return categorizedPartners[activeTab] || [];
  }, [activeTab, partners, categorizedPartners]);

  const scrollPartners = useMemo(() => {
    return [...partners, ...partners, ...partners];
  }, [partners]);

  const categories = useMemo(() => {
    const cats: Array<{ value: string; label: string; count: number; IconComponent: LucideIcon | null }> = [
      { value: "all", label: "All", count: partners.length, IconComponent: null },
    ];

    Object.entries(categorizedPartners).forEach(([key, items]) => {
      const config = CATEGORY_CONFIG[key];
      if (config) {
        cats.push({
          value: key,
          label: config.label,
          count: items.length,
          IconComponent: config.icon,
        });
      }
    });

    return cats;
  }, [partners.length, categorizedPartners]);

  return (
    <section className="py-20 sm:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            className="mb-4 px-4 py-1.5 border rounded-full"
            style={{
              backgroundColor: colors.primary.green[50],
              borderColor: colors.primary.green[200],
              color: colors.primary.green[700],
            }}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Trusted by Industry Leaders
          </Badge>
          <h2
            className="font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
              lineHeight: typography.lineHeights.tight,
            }}
          >
            {title}
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
              const Icon = category.IconComponent;
              return (
                <button
                  key={category.value}
                  onClick={() => setActiveTab(category.value)}
                  className={cn(
                    "px-5 py-2.5 rounded-full transition-all duration-200 text-sm font-medium",
                    activeTab === category.value
                      ? "bg-[#80c738] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {Icon && <Icon className="h-4 w-4" />}
                    {category.label} ({category.count})
                  </span>
                </button>
              );
            })}
          </div>

          <PartnerGrid partners={displayPartners} />
        </div>

        {/* Infinite Scroll Marquee */}
        <div className="relative mt-20 py-12 border-y border-gray-100">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              All Partners
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

            <div
              className="flex gap-12"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className={cn("flex gap-12", !isPaused && "animate-scroll")}>
                {scrollPartners.map((partner, index) => (
                  <div key={`scroll-${partner.id}-${index}`} className="shrink-0">
                    <Image
                      src={partner.logo || "/images/placeholder-logo.png"}
                      alt={partner.name}
                      className="h-12 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300"
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}

const PartnerGrid = memo(function PartnerGrid({
  partners
}: {
  partners: PartnerData[]
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {partners.map((partner) => (
        <a
          key={partner.id}
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative h-16 flex items-center justify-center">
            <Image
              src={partner.logo || "/images/placeholder-logo.png"}
              alt={partner.name}
              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
              width={100}
              height={100}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </a>
      ))}
    </div>
  );
});
