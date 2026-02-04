"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Twitter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { colors, typography } from "@/lib/design-system";
import { motion, AnimatePresence } from "framer-motion";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category?: string;
  bio?: string;
  photo: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
}

interface TeamSectionProps {
  members: TeamMember[];
  title?: string;
  subtitle?: string;
  preferredOrder?: string[];
  showViewAll?: boolean;
  viewAllHref?: string;
}

const DECORATION_COLORS = [
  "from-sky-200 to-sky-300",
  "from-emerald-200 to-emerald-300", 
  "from-amber-200 to-amber-300",
  "from-violet-200 to-violet-300",
  "from-rose-200 to-rose-300",
  "from-cyan-200 to-cyan-300",
];

export function TeamSection({
  members,
  title = "Meet Our Team",
  subtitle = "Connect with our team to learn more about the work that we do",
  preferredOrder = ["Management", "Board"],
  showViewAll = false,
  viewAllHref = "/about/staff",
}: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Group members by category
  const { categories, groupedMembers } = useMemo(() => {
    const groups = members.reduce<Record<string, TeamMember[]>>((acc, member) => {
      const key = (member.category || "Team").trim() || "Team";
      if (!acc[key]) acc[key] = [];
      acc[key].push(member);
      return acc;
    }, {});

    const sortedCategories = [
      ...preferredOrder.filter((cat) => groups[cat]),
      ...Object.keys(groups)
        .filter((cat) => !preferredOrder.includes(cat))
        .sort((a, b) => a.localeCompare(b)),
    ];

    return { categories: sortedCategories, groupedMembers: groups };
  }, [members, preferredOrder]);

  // GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation with split text effect feel
      const titleContainer = titleRef.current;
      if (titleContainer) {
        gsap.fromTo(
          titleContainer,
          { 
            opacity: 0, 
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleContainer,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Enhanced stagger cards animation with 3D feel
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Calculate row and column for stagger effect
        const col = index % 4;
        const row = Math.floor(index / 4);
        
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.9,
            rotateX: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: (row * 0.15) + (col * 0.08),
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Parallax effect on scroll for decoration circles
        const decoration = card.querySelector(".decoration-circle");
        if (decoration) {
          gsap.to(decoration, {
            y: -20,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        // Hover animation setup
        const image = card.querySelector(".team-image");
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -12,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(image, {
            scale: 1.08,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(decoration, {
            scale: 1.15,
            rotate: 15,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(decoration, {
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [members]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  let globalIndex = 0;

  return (
    <>
      <section
        ref={sectionRef}
        className="py-20 sm:py-28 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
              }}
            >
              {title}
            </h2>
            <p
              className="text-lg text-gray-500 max-w-2xl mx-auto"
              style={{ fontFamily: typography.fonts.body }}
            >
              {subtitle}
            </p>
          </div>

          {/* Team Categories */}
          {categories.map((category) => {
            const categoryMembers = groupedMembers[category] ?? [];
            return (
              <div key={category} className="mb-16 last:mb-0">
                {/* Category Title */}
                <div className="text-center mb-10">
                  <span
                    className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-gray-500 border-b-2 border-gray-200 pb-2"
                  >
                    {category}
                  </span>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {categoryMembers.map((member) => {
                    const cardIndex = globalIndex++;
                    const colorClass = DECORATION_COLORS[cardIndex % DECORATION_COLORS.length];

                    return (
                      <div
                        key={member.id}
                        ref={(el) => { cardsRef.current[cardIndex] = el; }}
                        className="group cursor-pointer"
                        onClick={() => setSelectedMember(member)}
                      >
                        {/* Card */}
                        <div className="relative bg-sky-50/70 rounded-3xl p-6 pb-8 transition-shadow duration-300 hover:shadow-xl h-full flex flex-col">
                          {/* Image Container */}
                          <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 mb-6">
                            {/* Decorative Half Circle */}
                            <div
                              className={cn(
                                "decoration-circle absolute bottom-0 right-0 w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br opacity-60",
                                colorClass
                              )}
                              style={{ transform: "translate(20%, 20%)" }}
                            />
                            
                            {/* Profile Image */}
                            <div className="team-image relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                              {member.photo ? (
                                <Image
                                  src={member.photo}
                                  alt={member.name}
                                  fill
                                  className="object-cover object-top"
                                  sizes="(max-width: 640px) 208px, 240px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#80c738] to-[#00aeef]">
                                  <span className="text-white text-4xl font-bold">
                                    {getInitials(member.name)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Name & Role */}
                          <div className="text-left flex-1 flex flex-col min-h-[72px]">
                            <h3
                              className="text-xl font-bold text-gray-900 mb-1 line-clamp-1"
                              style={{ fontFamily: typography.fonts.heading }}
                              title={member.name}
                            >
                              {member.name}
                            </h3>
                            <p className="text-sm text-gray-500 font-medium line-clamp-2" title={member.role}>
                              {member.role}
                            </p>
                          </div>

                          {/* Hover Indicator */}
                          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* View All Team Button */}
          {showViewAll && (
            <div className="text-center mt-12">
              <a
                href={viewAllHref}
                className="group inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#80c738] to-[#6ab02e] rounded-full hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
              >
                View Full Team
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header with Image */}
              <div className="relative bg-gradient-to-br from-sky-100 to-sky-50 pt-8 pb-16 px-6">
                <div className="relative mx-auto w-32 h-32">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                    {selectedMember.photo ? (
                      <Image
                        src={selectedMember.photo}
                        alt={selectedMember.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#80c738] to-[#00aeef]">
                        <span className="text-white text-3xl font-bold">
                          {getInitials(selectedMember.name)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-8 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-[#80c738] font-semibold mb-4">
                    {selectedMember.role}
                  </p>
                  
                  {selectedMember.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 text-left">
                      {selectedMember.bio}
                    </p>
                  )}

                  {/* Social Links */}
                  {(selectedMember.email || selectedMember.linkedin || selectedMember.twitter) && (
                    <div className="flex justify-center gap-3 pt-4 border-t border-gray-100">
                      {selectedMember.email && (
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#80c738] hover:text-white transition-all duration-300"
                          aria-label={`Email ${selectedMember.name}`}
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                      {selectedMember.linkedin && (
                        <a
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                          aria-label={`${selectedMember.name}'s LinkedIn`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {selectedMember.twitter && (
                        <a
                          href={selectedMember.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1da1f2] hover:text-white transition-all duration-300"
                          aria-label={`${selectedMember.name}'s Twitter`}
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TeamSection;
