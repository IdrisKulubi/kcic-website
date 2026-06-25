import { Metadata } from 'next';
import { ImpactTheoryContent } from '@/components/impact/ImpactTheoryContent';

export const metadata: Metadata = {
  title: 'Theory of Change - KCIC Impact',
  description: 'How KCIC creates lasting climate impact through enterprise support, finance, scale, and measurement.',
};

export default function ImpactTheoryPage() {
  return <ImpactTheoryContent />;
}
