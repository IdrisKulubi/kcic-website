import { Metadata } from 'next';
import { ImpactReportsContent } from '@/components/impact/ImpactReportsContent';

export const metadata: Metadata = {
  title: 'Impact Reports - KCIC',
  description: 'Download KCIC annual impact reports and research publications documenting climate innovation outcomes.',
};

export default function ImpactReportsPage() {
  return <ImpactReportsContent />;
}
