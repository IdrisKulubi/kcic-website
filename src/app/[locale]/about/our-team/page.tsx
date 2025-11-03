import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Mail, Linkedin, Twitter, Users } from "lucide-react";
import Link from "next/link";
import { listTeamMembers } from "@/lib/actions/team";
import Image from "next/image";

export default async function OurTeamPage() {
  const result = await listTeamMembers();
  const teamMembers = result.success ? result.data || [] : [];

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Profile Header */}
                  <div className="relative h-64 bg-gradient-to-br from-green-400 to-blue-500">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-6xl font-bold opacity-80">
                          {getInitials(member.name)}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 text-white">
                      <Users className="w-6 h-6 opacity-80" />
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-green-600 font-semibold mb-3">
                        {member.role}
                      </p>
                    </div>

                    {member.bio && (
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        {member.bio}
                      </p>
                    )}

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Join Our Team */}
        <div className="bg-green-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join Our Team
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Are you passionate about climate innovation and sustainable
                development? We&apos;re always looking for talented individuals
                to join our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <Link
                  href="/about/careers"
                  className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  View Open Positions
                </Link> */}
                <Link
                  href="mailto:careers@kenyacic.org"
                  className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-50 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Your CV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
