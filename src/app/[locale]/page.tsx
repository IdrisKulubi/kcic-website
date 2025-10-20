'use client';

import dynamic from 'next/dynamic';

// Reuse the same HomePage used at the root, with SSR disabled for consistency
const HomePage = dynamic(() => import('../../components/HomePage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg font-medium text-gray-600">Loading...</div>
    </div>
  )
});

export default function Page() {
  return <HomePage />;
}
