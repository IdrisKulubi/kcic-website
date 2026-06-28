import { Metadata } from 'next';
import { ImpactOverviewContent } from '@/components/impact/ImpactOverviewContent';

export const metadata: Metadata = {
  title: 'Impact - KCIC Climate Innovation Results',
  description:
    "See the measurable impact of KCIC's climate innovation programs: 450+ SMEs supported, $25M+ investment mobilized, 2,500+ jobs created.",
};

export default function ImpactPage() {
  return <ImpactOverviewContent />;
}
