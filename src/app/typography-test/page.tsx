/**
 * Typography System Test Page
 * 
 * Visual verification of all typography styles
 * Access at: /typography-test
 */

import { colors } from '@/lib/design-system';

export default function TypographyTestPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-display-xl font-bold mb-4">
            KCIC Typography System
          </h1>
          <p className="text-body-lg text-gray-600">
            Visual verification of all typography styles and responsive scaling
          </p>
        </div>

        {/* Display Sizes */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary.green.DEFAULT }}>
            Display Sizes
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Display 2XL (40px → 96px)</p>
              <div className="text-display-2xl font-bold">
                Empowering Climate Innovation
              </div>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Display XL (36px → 72px)</p>
              <div className="text-display-xl font-bold">
                Empowering Climate Innovation
              </div>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Display LG (30px → 56px)</p>
              <div className="text-display-lg font-bold">
                Empowering Climate Innovation
              </div>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Display MD (24px → 36px)</p>
              <div className="text-display-md font-bold">
                Empowering Climate Innovation
              </div>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Display SM (20px → 30px)</p>
              <div className="text-display-sm font-bold">
                Empowering Climate Innovation
              </div>
            </div>
          </div>
        </section>

        {/* Heading Sizes */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary.green.DEFAULT }}>
            Heading Sizes (h1-h6)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-gray-500 mb-2">H1 (30px → 48px)</p>
              <h1 className="text-h1">Our Impact on Climate Innovation</h1>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">H2 (24px → 40px)</p>
              <h2 className="text-h2">Our Impact on Climate Innovation</h2>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">H3 (20px → 32px)</p>
              <h3 className="text-h3">Our Impact on Climate Innovation</h3>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">H4 (18px → 28px)</p>
              <h4 className="text-h4">Our Impact on Climate Innovation</h4>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">H5 (16px → 24px)</p>
              <h5 className="text-h5">Our Impact on Climate Innovation</h5>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">H6 (15px → 20px)</p>
              <h6 className="text-h6">Our Impact on Climate Innovation</h6>
            </div>
          </div>
        </section>

        {/* Body Text Sizes */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary.green.DEFAULT }}>
            Body Text Sizes
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Body XL (18px → 20px)</p>
              <p className="text-body-xl">
                Climate change remains one of the world's greatest existential threats, 
                affecting economies, ecosystems, and communities across Africa.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Body LG (16px → 18px)</p>
              <p className="text-body-lg">
                Climate change remains one of the world's greatest existential threats, 
                affecting economies, ecosystems, and communities across Africa.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Body Base (15px → 16px) - Default</p>
              <p className="text-body-base">
                Climate change remains one of the world's greatest existential threats, 
                affecting economies, ecosystems, and communities across Africa.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Body SM (13px → 14px)</p>
              <p className="text-body-sm">
                Climate change remains one of the world's greatest existential threats, 
                affecting economies, ecosystems, and communities across Africa.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Body XS (11px → 12px)</p>
              <p className="text-body-xs">
                Climate change remains one of the world's greatest existential threats, 
                affecting economies, ecosystems, and communities across Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Sizes */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary.green.DEFAULT }}>
            Stats & Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-stat-value text-climate-green">
                57,517
              </div>
              <div className="text-stat-label text-gray-600">
                Jobs Created
              </div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-stat-value text-climate-blue">
                3,500+
              </div>
              <div className="text-stat-label text-gray-600">
                SMEs Supported
              </div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-stat-value text-climate-green">
                $63M
              </div>
              <div className="text-stat-label text-gray-600">
                Capital Leveraged
              </div>
            </div>
          </div>
        </section>

        {/* Font Weights */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary.green.DEFAULT }}>
            Font Weights
          </h2>
          <div className="space-y-2">
            <p className="text-body-base font-light">Light (300) - The quick brown fox</p>
            <p className="text-body-base font-normal">Normal (400) - The quick brown fox</p>
            <p className="text-body-base font-medium">Medium (500) - The quick brown fox</p>
            <p className="text-body-base font-semibold">Semibold (600) - The quick brown fox</p>
            <p className="text-body-base font-bold">Bold (700) - The quick brown fox</p>
            <p className="text-body-base font-extrabold">Extrabold (800) - The quick brown fox</p>
          </div>
        </section>

        {/* Line Heights */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary.green.DEFAULT }}>
            Line Heights
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Tight (1.1) - For display text</p>
              <p className="text-body-lg leading-tight bg-gray-50 p-4">
                Climate change remains one of the world's greatest existential threats, 
                affecting economies, ecosystems, and communities across Africa. We must act now.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Snug (1.2) - For headings</p>
              <p className="text-body-lg leading-snug bg-gray-50 p-4">
                Climate change remains one of the world's greatest existential threats, 
                affecting economies, ecosystems, and communities across Africa. We must act now.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Relaxed (1.6) - For body text (recommended)</p>
              <p className="text-body-lg leading-relaxed bg-gray-50 p-4">
                Climate change remains one of the world's greatest existential threats, 
                affecting economies, ecosystems, and communities across Africa. We must act now.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Loose (1.7) - For long-form content</p>
              <p className="text-body-lg leading-loose bg-gray-50 p-4">
                Climate change remains one of the world's greatest existential threats, 
                affecting economies, ecosystems, and communities across Africa. We must act now.
              </p>
            </div>
          </div>
        </section>

        {/* Letter Spacing */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary.green.DEFAULT }}>
            Letter Spacing
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Tighter (-0.02em) - Display headings</p>
              <p className="text-h2 tracking-tighter">Empowering Climate Innovation</p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Tight (-0.01em) - Large headings</p>
              <p className="text-h2 tracking-tight">Empowering Climate Innovation</p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Normal (0) - Body text</p>
              <p className="text-h2 tracking-normal">Empowering Climate Innovation</p>
            </div>
            <div>
              <p className="text-body-sm text-gray-500 mb-2">Wide (0.025em) - Uppercase labels</p>
              <p className="text-body-base tracking-wide uppercase">Featured Article</p>
            </div>
          </div>
        </section>

        {/* Contrast Examples */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary.green.DEFAULT }}>
            Contrast Examples (WCAG AA)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border-2 border-gray-200 rounded-lg">
              <p className="text-body-sm text-gray-500 mb-4">✓ PASS - Gray 900 on White (16.5:1)</p>
              <h3 className="text-h3 mb-2 text-gray-900">
                Normal Text Example
              </h3>
              <p className="text-body-base text-gray-900">
                This text has excellent contrast and is readable for all users.
              </p>
            </div>
            <div className="p-6 bg-white border-2 border-gray-200 rounded-lg">
              <p className="text-body-sm text-gray-500 mb-4">✓ PASS - Brand Green on White (3.2:1) - Large text only</p>
              <h3 className="text-h3 mb-2 text-climate-green">
                Large Text Example
              </h3>
              <p className="text-body-lg font-semibold text-climate-green">
                Use brand green for headings and large text (18px+ or 14px+ bold).
              </p>
            </div>
          </div>
        </section>

        {/* Responsive Test */}
        <section className="mb-16">
          <h2 className="text-h2 font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary.green.DEFAULT }}>
            Responsive Scaling Test
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-body-sm text-gray-500 mb-4">
              Resize your browser window to see responsive scaling in action.
              All text uses clamp() for fluid scaling between mobile and desktop.
            </p>
            <div className="space-y-4">
              <div className="text-display-lg font-bold text-climate-green">
                This heading scales from 30px to 56px
              </div>
              <p className="text-body-lg">
                This body text scales from 16px to 18px, maintaining readability across all devices.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-gray-200 text-center">
          <p className="text-body-sm text-gray-500">
            Typography System v1.0 | Requirements 4.1-4.7 ✓
          </p>
        </div>
      </div>
    </div>
  );
}
