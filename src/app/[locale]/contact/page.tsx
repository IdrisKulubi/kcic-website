import { Metadata } from 'next';
import { ContactPageContent } from '@/components/contact/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact KCIC - Get in Touch with Our Team',
  description:
    'Contact Kenya Climate Innovation Centre. Reach out to learn about our programs, partnerships, or climate innovation opportunities.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
