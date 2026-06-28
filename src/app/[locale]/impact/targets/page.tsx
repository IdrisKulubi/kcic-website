import { Metadata } from 'next';
import { ImpactTargetsContent } from '@/components/impact/ImpactTargetsContent';

export const metadata: Metadata = {
  title: 'Our Targets - KCIC Vision 2030',
  description: 'KCIC performance targets and Vision 2030 goals for enterprises, green jobs, and climate finance.',
};

export default function ImpactTargetsPage() {
  return <ImpactTargetsContent />;
}
