"use client";

import React, { useState } from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { navData } from "@/lib/navigation";
import Image from "next/image";
import { Mail, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
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

const PREFERRED_ORDER = ["Management", "Board"];

export default function StaffPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [expandedBios, setExpandedBios] = useState<Set<string>>(new Set());

  // Fetch team members on mount
  React.useEffect(() => {
    async function fetchTeam() {
      const { listTeamMembers } = await import("@/lib/actions/team");
      const result = await listTeamMembers();
      if (result.success && result.data) {
        setTeamMembers(result.data as TeamMember[]);
      }
    }
    fetchTeam();
  }, []);

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Toggle bio expansion
  const toggleBio = (memberId: string) => {
    setExpandedBios((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  const { categories, groupedMembers } = React.useMemo(() => {
    const groups = teamMembers.reduce<Record<string, TeamMember[]>>((acc, member) => {
      const key = (member.category || "Other").trim() || "Other";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(member);
      return acc;
    }, {});

    const sortedCategories = [
      ...PREFERRED_ORDER.filter((category) => groups[category]),
      ...Object.keys(groups)
        .filter((category) => !PREFERRED_ORDER.includes(category))
        .sort((a, b) => a.localeCompare(b)),
    ];

    return { categories: sortedCategories, groupedMembers: groups };
  }, [teamMembers]);

  return (
    <div className="min-h-screen">
      <MinimalNavbar {...navData} />

      <main className="pt-20">
        <section className="relative">
          {/* Ambient soft lights */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(28rem 18rem at 15% 20%, rgba(127,209,52,0.12) 0%, rgba(127,209,52,0) 70%),' +
                'radial-gradient(28rem 18rem at 85% 80%, rgba(0,174,239,0.10) 0%, rgba(0,174,239,0) 70%)',
              filter: 'blur(28px)'
            }}
            aria-hidden
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the dedicated professionals driving climate innovation and
                sustainable development across Kenya and Africa.
              </p>
            </div>

            {teamMembers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No team members available at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {categories.map((category) => {
                  const members = groupedMembers[category] ?? [];
                  return (
                    <section key={category}>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                          {category}
                        </h2>
                        <div
                          className="h-px flex-1 ml-6"
                          style={{
                            background:
                              "linear-gradient(90deg, color-mix(in srgb, var(--climate-green) 50%, transparent), color-mix(in srgb, var(--climate-blue) 40%, transparent))",
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
                        {members.map((member) => {
                          const isExpanded = expandedBios.has(member.id);
                          return (
                            <div
                              key={member.id}
                              className="relative rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group will-change-transform hover:-translate-y-0.5"
                            >
                              {/* Glow ring */}
                              <div
                                className="pointer-events-none absolute -inset-px rounded-[0.9rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(127,209,52,0.45), rgba(0,174,239,0.45))",
                                  filter: "blur(6px)",
                                }}
                                aria-hidden
                              />
                              {/* Image Section - Smaller ratio */}
                              <div
                                className="relative bg-green-100 overflow-hidden rounded-t-xl"
                                style={{ aspectRatio: "4 / 5" }}
                              >
                                {member.photo ? (
                                  <Image
                                    src={member.photo}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  />
                                ) : (
                                  <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, var(--climate-green), var(--climate-blue))",
                                    }}
                                  >
                                    <span className="text-white text-5xl font-bold opacity-90">
                                      {getInitials(member.name)}
                                    </span>
                                  </div>
                                )}

                                {/* Read More button - appears on hover */}
                                {!isExpanded &&
                                  (member.bio || member.email || member.linkedin || member.twitter) && (
                                    <button
                                      onClick={() => toggleBio(member.id)}
                                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                      <span className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-green-600 hover:text-white transition-colors">
                                        Read More
                                      </span>
                                    </button>
                                  )}
                              </div>

                              {/* Content Section */}
                              <div className="p-4 text-center grow flex flex-col">
                                <h3 className="text-[0.95rem] font-semibold text-gray-900 mb-0.5 tracking-tight">
                                  {member.name}
                                </h3>
                                <p className="text-green-600 font-medium text-[0.7rem]">
                                  {member.role}
                                </p>

                                {/* Expanded Content - Shows when clicked */}
                                {isExpanded && (
                                  <div className="mt-4 animate-fadeIn">
                                    {member.bio && (
                                      <div className="mb-4 pb-4 border-b border-gray-200">
                                        <p className="text-gray-600 text-sm leading-relaxed text-left">
                                          {member.bio}
                                        </p>
                                      </div>
                                    )}

                                    {/* Social Links */}
                                    {(member.email || member.linkedin || member.twitter) && (
                                      <div className="flex justify-center gap-3 mb-2">
                                        {member.email && (
                                          <a
                                            href={`mailto:${member.email}`}
                                            className="text-gray-400 hover:text-green-600 transition-colors"
                                            aria-label={`Email ${member.name}`}
                                          >
                                            <Mail className="w-5 h-5" />
                                          </a>
                                        )}
                                        {member.linkedin && (
                                          <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-green-600 transition-colors"
                                            aria-label={`${member.name}'s LinkedIn`}
                                          >
                                            <Linkedin className="w-5 h-5" />
                                          </a>
                                        )}
                                        {member.twitter && (
                                          <a
                                            href={member.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-green-600 transition-colors"
                                            aria-label={`${member.name}'s Twitter`}
                                          >
                                            <Twitter className="w-5 h-5" />
                                          </a>
                                        )}
                                      </div>
                                    )}

                                    {/* Show Less button */}
                                    <button
                                      onClick={() => toggleBio(member.id)}
                                      className="w-full text-green-600 hover:text-green-700 text-xs font-medium py-2 hover:bg-green-50 rounded transition-colors"
                                    >
                                      Show Less
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
