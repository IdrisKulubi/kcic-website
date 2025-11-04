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
  bio?: string;
  photo: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
}

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

  // Helper function to truncate bio
  const truncateBio = (bio: string, maxLength: number = 100) => {
    if (bio.length <= maxLength) return bio;
    return bio.substring(0, maxLength) + "...";
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

  return (
    <div className="min-h-screen">
      <MinimalNavbar {...navData} />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => {
                const isExpanded = expandedBios.has(member.id);
                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group relative"
                  >
                    {/* Image Section - Fixed aspect ratio */}
                    <div className="relative aspect-square bg-green-100 overflow-hidden">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
                          <span className="text-white text-5xl font-bold opacity-90">
                            {getInitials(member.name)}
                          </span>
                        </div>
                      )}
                      
                      {/* Read More button - appears on hover */}
                      {!isExpanded && (member.bio || member.email || member.linkedin || member.twitter) && (
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
                    <div className="p-6 text-center flex-grow flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-green-600 font-medium text-sm">
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
                            <div className="flex justify-center gap-3 mb-4">
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
                            className="w-full text-green-600 hover:text-green-700 text-sm font-medium py-2 hover:bg-green-50 rounded transition-colors"
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
          )}
        </div>
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
