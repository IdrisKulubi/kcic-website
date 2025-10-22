# Implementation Plan

- [x] 1. Set up middleware for locale detection and routing

  - Create or update `middleware.ts` to detect user's preferred locale from cookies, Accept-Language header, or default to English
  - Implement redirect logic to route users to appropriate `/[locale]/*` paths
  - Set locale cookie (NEXT_LOCALE) for persistence across sessions
  - Configure middleware matcher to exclude static files and API routes
  - _Requirements: 1.1, 1.2, 1.5_

- [x] 2. Enhance i18n utilities with server-side support

  - Add `getTranslations()` function for server-side translation loading in `src/lib/i18n.ts`
  - Implement `getLocalizedMetadata()` function for generating locale-specific metadata with hreflang tags
  - Add support for loading translations by namespace (common, navigation, pages, forms)

  - Update translation cache to support namespace-based caching
  - _Requirements: 1.3, 1.4, 4.1, 4.4, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 3. Create locale provider context

  - Create `src/contexts/locale-context.tsx` with LocaleProvider component
  - Implement `useLocale()` hook that provides translation function and formatting utilities
  - Integrate LocaleProvider into `src/app/[locale]/layout.tsx`
  - Pass locale from route params to provider
  - _Requirements: 1.3, 5.1, 5.2, 5.3, 5.4_

- [x] 4. Build language switcher component

- [x] 4.1 Create base LanguageSwitcher component

  - Create `src/components/language-switcher.tsx` with dropdown, toggle, and inline variants
  - Implement language switching logic using `useLanguageSwitch()` hook
  - Add visual indicators for current language (flags and labels)
  - Preserve current page path and query parameters when switching languages
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4.2 Add accessibility features to LanguageSwitcher

  - Implement keyboard navigation (Tab, Enter, Arrow keys, Escape)
  - Add ARIA attributes (aria-label, aria-haspopup, aria-expanded, aria-current)
  - Add screen reader announcements for language changes using live regions
  - Ensure sufficient color contrast for WCAG AA compliance
  - Add clear focus indicators for keyboard navigation
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 5. Expand translation files with comprehensive content

- [x] 5.1 Reorganize translation files into namespaces

  - Split existing `common.json` into `common.json`, `navigation.json`, `pages.json`, and `forms.json`
  - Move navigation-related translations to `navigation.json`
  - Move page-specific content to `pages.json`
  - Create structure for both `en` and `fr` locales
  - _Requirements: 3.1, 3.2, 3.3, 4.1, 4.2_

- [x] 5.2 Add missing translations for all pages

  - Audit all pages in `src/app/[locale]/` for translatable content
  - Add English translations for About, Programs, Impact, Contact, Apply pages
  - Add French translations for all pages
  - Include hero sections, feature descriptions, CTAs, and static content

  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 5.3 Add form and validation translations

  - Create translations for all form labels and placeholders
  - Add validation error messages in both languages
  - Include success and error notifications
  - _Requirements: 3.4_

- [x] 6. Integrate language switcher into navigation

  - Add LanguageSwitcher component to main navigation/header
  - Use dropdown variant for desktop navigation
  - Use toggle variant for mobile navigation
  - Add LanguageSwitcher to footer using inline variant
  - _Requirements: 2.1, 2.5_

- [x] 7. Update pages to use translations

- [x] 7.1 Update homepage with translations

  - Replace hardcoded text in hero section with translation keys
  - Update stats section to use translations
  - Update CTA buttons with translated labels
  - Use `useTranslation()` hook or server-side `getTranslations()`
  - _Requirements: 3.1, 3.2, 3.5_

- [x] 7.2 Update About page with translations

  - Replace all static content with translation keys
  - Update page metadata with localized titles and descriptions
  - _Requirements: 3.1, 3.2, 3.5_

- [x] 7.3 Update Programs pages with translations

  - Translate program listings and descriptions
  - Update program detail pages
  - _Requirements: 3.1, 3.2, 3.5_

- [x] 7.4 Update remaining pages (Impact, Contact, Apply)

  - Add translations for Impact page metrics and stories
  - Translate Contact page form and information
  - Translate Apply page form and instructions
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [ ] 8. Implement SEO metadata for localized pages
- [ ] 8.1 Add generateMetadata to all pages

  - Implement `generateMetadata()` function in each page component
  - Use `getLocalizedMetadata()` helper to generate locale-specific metadata
  - Include localized titles, descriptions, and Open Graph data
  - _Requirements: 6.1, 6.3, 6.5_

- [ ] 8.2 Update sitemap with locale support

  - Modify `src/app/sitemap.ts` to generate URLs for both English and French
  - Add language alternates for each page
  - Set appropriate priority and change frequency
  - _Requirements: 6.2, 6.4_

- [ ] 8.3 Update root layout with hreflang tags

  - Add hreflang link tags to `src/app/layout.tsx`
  - Ensure HTML lang attribute is set correctly based on locale
  - Update Open Graph locale metadata
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 9. Add date and number formatting throughout the app

  - Identify all date displays and use `formatDate()` from i18n utilities
  - Identify all number displays and use `formatNumber()` from i18n utilities
  - Add currency formatting where applicable using `formatCurrency()`
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 10. Handle edge cases and error scenarios

  - Implement fallback to English for missing translation keys
  - Add development-mode warnings for missing translations
  - Handle locale detection failures gracefully
  - Test with invalid locale URLs (should return 404)
  - _Requirements: 1.4, 4.5_

- [ ]\* 11. Write tests for i18n functionality
  - Write unit tests for translation key resolution and interpolation
  - Write unit tests for locale detection logic
  - Write unit tests for date/number formatting functions
  - Write component tests for LanguageSwitcher (rendering, interaction, keyboard navigation)
  - Write integration tests for locale routing and language switching
  - Write accessibility tests using axe-core
  - _Requirements: All requirements_
