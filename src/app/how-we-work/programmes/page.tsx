'use client';

import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import ProgramsOverviewSection from '@/components/sections/ProgramsOverviewSection';

export default function ProgrammesPage() {
  return (
    <PageLayout
      title="Our Programmes"
      subtitle="A snapshot of KCIC’s flagship initiatives"
      description="Explore the programmes accelerating climate innovation and sustainable enterprise growth across Kenya and East Africa."
      breadcrumb={[
        { label: 'How we work', href: '/how-we-work' },
        { label: 'Our Programmes' }
      ]}
    >
      <div className="py-6">
        <ProgramsOverviewSection />
      </div>
    </PageLayout>
  );
}