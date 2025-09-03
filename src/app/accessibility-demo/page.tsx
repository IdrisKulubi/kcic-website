import { AccessibilityDemo } from '@/components/examples/accessibility-demo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Features Demo',
  description: 'Demonstration of the accessibility features available on the KCIC website, including font scaling, high contrast mode, and motion controls.',
};

export default function AccessibilityDemoPage() {
  return <AccessibilityDemo />;
}