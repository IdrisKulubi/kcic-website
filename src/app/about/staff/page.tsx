"use client";

import React, { useState, useEffect } from "react";
import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import Footer from "@/components/layout/Footer";
import { homePageData } from "@/data/home";
import { navData } from "@/lib/navigation";
import { TeamSection } from "@/components/sections/TeamSection";
import type { TeamMember } from "@/components/sections/TeamSection";

const PREFERRED_ORDER = ["Management", "Board"];

export default function StaffPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Fetch team members on mount
  useEffect(() => {
    async function fetchTeam() {
      const { listTeamMembers } = await import("@/lib/actions/team");
      const result = await listTeamMembers();
      if (result.success && result.data) {
        setTeamMembers(result.data as TeamMember[]);
      }
    }
    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MinimalNavbar {...navData} />

      <main className="pt-20">
        <TeamSection
          members={teamMembers}
          title="Meet Our Team"
          subtitle="Connect with our team to learn more about the work that we do"
          preferredOrder={PREFERRED_ORDER}
        />
      </main>

      <Footer data={homePageData.footer} />
    </div>
  );
}
