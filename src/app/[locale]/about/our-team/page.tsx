"use client";

import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Mail, Linkedin, Twitter, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// This will be populated from server
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

export default function OurTeamPage() {
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
  const truncateBio = (bio: string, maxLength: number = 120) => {
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
    <PageLayout
      title="Our Team"
      subtitle="Meet the people driving climate innovation"
      description="Our diverse team of experts, innovators, and leaders is committed to accelerating climate solutions and supporting entrepreneurs across Kenya and Africa."
      breadcrumb={[
        { label: "About Us", href: "/about" },
        { label: "Our team" },
      ]}
    >
      <div className="py-16">
        {/* Team Members */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                No team members available at the moment.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check back soon to meet our team!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => {
                const isExpanded = expandedBios.has(member.id);
                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group relative"
                  >
                    {/* Profile Header - Fixed aspect ratio */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-green-400 to-blue-500 overflow-hidden">
                      {member.photo ? (
                        <>
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </>
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

                    {/* Profile Content - Name and Role only by default */}
                    <div className="p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-green-600 font-semibold text-sm">
                          {member.role}
                        </p>
                      </div>

                      {/* Expanded Content - Shows when clicked */}
                      {isExpanded && (
                        <div className="mt-4 animate-fadeIn">
                          {member.bio && (
                            <div className="mb-4 pb-4 border-b border-gray-200">
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {member.bio}
                              </p>
                            </div>
                          )}

                          {/* Social Links */}
                          {(member.email || member.linkedin || member.twitter) && (
                            <div className="flex justify-center space-x-4 mb-4">
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
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
                                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
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
                                  className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
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

      
      </div>
    </PageLayout>
  );
}
