/**
 * Language Switcher Demo
 * 
 * This file demonstrates how to use the LanguageSwitcher component
 * in different contexts throughout the application.
 */

import { LanguageSwitcher } from './language-switcher';

export function LanguageSwitcherExamples() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Dropdown Variant (for Header/Navbar)</h2>
        <div className="flex justify-end">
          <LanguageSwitcher variant="dropdown" showFlags={true} showLabels={true} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Toggle Variant (for Mobile)</h2>
        <div className="flex justify-center">
          <LanguageSwitcher variant="toggle" showFlags={true} showLabels={true} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Inline Variant (for Footer)</h2>
        <div className="flex justify-center">
          <LanguageSwitcher variant="inline" showFlags={true} showLabels={true} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Compact Versions</h2>
        <div className="flex gap-4 justify-center">
          <LanguageSwitcher variant="dropdown" showFlags={true} showLabels={false} />
          <LanguageSwitcher variant="toggle" showFlags={false} showLabels={true} />
          <LanguageSwitcher variant="inline" showFlags={true} showLabels={false} />
        </div>
      </div>
    </div>
  );
}

/**
 * Usage Examples:
 * 
 * 1. In Header/Navbar:
 * ```tsx
 * <LanguageSwitcher variant="dropdown" showFlags={true} showLabels={true} />
 * ```
 * 
 * 2. In Mobile Menu:
 * ```tsx
 * <LanguageSwitcher variant="toggle" showFlags={true} showLabels={true} />
 * ```
 * 
 * 3. In Footer:
 * ```tsx
 * <LanguageSwitcher variant="inline" showFlags={true} showLabels={true} />
 * ```
 * 
 * Accessibility Features:
 * - Full keyboard navigation (Tab, Enter, Arrow keys, Escape)
 * - ARIA labels and attributes for screen readers
 * - Live region announcements for language changes
 * - WCAG AA compliant color contrast
 * - Clear focus indicators
 * 
 * Props:
 * - variant: 'dropdown' | 'toggle' | 'inline' (default: 'dropdown')
 * - showFlags: boolean (default: true) - Show flag emojis
 * - showLabels: boolean (default: true) - Show language names
 * - className: string (optional) - Additional CSS classes
 */
