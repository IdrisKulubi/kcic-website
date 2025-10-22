# Multi-Language Support Design Document

## Overview

This design document outlines the architecture and implementation approach for completing the multi-language (i18n) support for the KCIC website. The system currently has foundational i18n infrastructure with English and French translations, a custom i18n utility library, and a locale-based routing structure using Next.js 15's App Router with dynamic `[locale]` segments.

The design focuses on:
1. Completing translation coverage across all pages and components
2. Implementing a user-friendly language switcher component
3. Enhancing locale detection and routing
4. Ensuring SEO optimization with proper metadata
5. Maintaining accessibility standards
6. Providing developer-friendly translation management

### Current State

**Existing Infrastructure:**
- Custom i18n utility library at `src/lib/i18n.ts` with hooks (`useTranslation`, `useLanguageSwitch`)
- Translation files: `src/locales/en/common.json` and `src/locales/fr/common.json`
- Locale-based routing with `[locale]` dynamic segment in `src/app/[locale]/`
- Basic translations for navigation, hero, stats, footer, and common UI elements
- Translation caching and fallback mechanisms
- Date and number formatting utilities

**Gaps to Address:**
- Incomplete translation coverage (many pages and components not translated)
- No visible language switcher UI component
- Locale detection not fully integrated with Next.js routing
- Missing SEO metadata for localized pages
- Need for middleware to handle locale redirects
- Translation files need expansion for all content

## Architecture

### High-Level Architecture

```
User Browser → Language Switcher UI → Next.js App Router (Locale Routing)
                                              ↓
                                    Next.js Middleware
                                    (Locale Detection & Redirect)
                                              ↓
                                    Server-Side Rendering
                                    (Load translations, Generate metadata)
                                              ↓
                                    Client-Side Hydration
                                    (useTranslation hook, Locale context)
                                              ↓
                                    Translation Storage Layer
                                    (JSON files in src/locales/)
```

### Routing Strategy

The application uses Next.js App Router with a `[locale]` dynamic segment:

```
/                          → Redirect to /en (or detected locale)
/en                        → English homepage
/fr                        → French homepage
/en/about                  → English about page
/fr/about                  → French about page
```

**Key Decisions:**
- Use Next.js middleware for locale detection and redirection
- Default locale (English) uses `/en` prefix for consistency
- Preserve query parameters and hash fragments during locale switching
- Generate static params for both locales at build time

## Components and Interfaces

### 1. Language Switcher Component

**Location:** `src/components/language-switcher.tsx`

**Purpose:** Provides UI for users to switch between English and French

**Interface:**
```typescript
interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'toggle' | 'inline';
  showFlags?: boolean;
  showLabels?: boolean;
  className?: string;
}
```

**Variants:**
- **dropdown**: Dropdown menu with both language options (for header/navbar)
- **toggle**: Toggle button switching between EN/FR (for mobile)
- **inline**: Inline buttons side-by-side (for footer)

**Features:**
- Visual indication of current language
- Smooth transition when switching
- Keyboard accessible (Tab, Enter, Arrow keys)
- ARIA labels for screen readers
- Flag emojis or icons for visual recognition

### 2. Enhanced i18n Utilities

**Location:** `src/lib/i18n.ts` (existing file, enhancements needed)

**Enhancements:**
```typescript
// Add server-side translation loading
export async function getTranslations(locale: LocaleCode): Promise<Translations>;

// Enhanced metadata helper
export function getLocalizedMetadata(
  locale: LocaleCode,
  page: string,
  customMetadata?: Partial<Metadata>
): Metadata;
```

### 3. Locale Provider Component

**Location:** `src/contexts/locale-context.tsx` (new file)

**Purpose:** Provides locale context to all components without prop drilling

**Interface:**
```typescript
interface LocaleContextValue {
  locale: LocaleCode;
  t: TranslationFunction;
  formatDate: (date: Date) => string;
  formatNumber: (num: number) => string;
}

export function LocaleProvider({ locale, children }): JSX.Element;
export function useLocale(): LocaleContextValue;
```

### 4. Middleware for Locale Detection

**Location:** `middleware.ts` (update existing or create new)

**Purpose:** Detect user's preferred language and redirect to appropriate locale route

**Logic Flow:**
1. Check if URL already has locale prefix (/en/* or /fr/*)
2. Check for locale cookie (NEXT_LOCALE)
3. Check Accept-Language header
4. Default to English
5. Set locale cookie for future visits

## Data Models

### Translation File Structure

**Organized by namespace for better maintainability:**

```
src/locales/
├── en/
│   ├── common.json          # Shared UI elements
│   ├── navigation.json      # Nav, footer, breadcrumbs
│   ├── pages.json           # Page-specific content
│   └── forms.json           # Form labels, validation
└── fr/
    ├── common.json
    ├── navigation.json
    ├── pages.json
    └── forms.json
```

**Example Structure:**

**common.json:**
```json
{
  "buttons": {
    "submit": "Submit",
    "cancel": "Cancel",
    "save": "Save"
  },
  "status": {
    "loading": "Loading...",
    "success": "Success!",
    "error": "An error occurred"
  }
}
```

## Error Handling

### Missing Translation Keys

**Strategy:**
1. Log warning to console in development mode
2. Return the translation key itself as fallback
3. Optionally highlight missing translations in UI (dev mode only)

### Locale Detection Failures

**Fallback Chain:**
1. Try locale from URL path
2. Try locale from cookie
3. Try locale from Accept-Language header
4. Default to English

## Testing Strategy

### Unit Tests

**Test Coverage:**
1. i18n Utilities - Translation key resolution, interpolation, fallback logic
2. Language Switcher Component - Rendering, interaction, keyboard navigation
3. Locale Context - Provides correct values and functions

### Integration Tests

**Test Scenarios:**
1. Locale Routing - Redirects work correctly
2. Language Switching - Updates URL and content
3. SEO Metadata - Correct lang attributes and hreflang tags

### Accessibility Testing

- Keyboard navigation through language switcher
- Screen reader announces language options
- Color contrast meets WCAG AA standards

## SEO Optimization

### Metadata Generation

**Per-Page Localized Metadata:**
```typescript
export async function generateMetadata({ params }) {
  const locale = params.locale as LocaleCode;
  const translations = await getTranslations(locale);
  
  return getLocalizedMetadata(locale, 'about', {
    title: translations.about.meta.title,
    description: translations.about.meta.description,
  });
}
```

### Sitemap Generation

Update `src/app/sitemap.ts` to include both English and French URLs for all pages with proper alternates.

## Accessibility Considerations

### Keyboard Navigation

- Tab to focus on switcher
- Enter/Space to open dropdown
- Arrow keys to navigate options
- Escape to close

### ARIA Attributes

```tsx
<button
  aria-label="Change language"
  aria-haspopup="menu"
  aria-expanded={isOpen}
>
  {currentLanguage}
</button>
```

### Screen Reader Announcements

Use live regions to announce language changes.

## Performance Considerations

### Translation Loading

**Optimization Strategies:**
1. Code Splitting - Load translation files on-demand
2. Caching - Cache loaded translations in memory
3. Static Generation - Pre-render pages for both locales
4. Lazy Loading - Load non-critical translations after initial render

## Developer Guidelines

### Adding New Translations

1. Add key to English translation file first
2. Add corresponding key to French translation file
3. Use descriptive, hierarchical keys

### Using Translations in Components

**Client Components:**
```tsx
'use client';
import { useTranslation } from '@/lib/i18n';

export function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('pages.about.title')}</h1>;
}
```

### Translation Key Naming Conventions

- Use dot notation for hierarchy
- Use camelCase for keys
- Group related translations together

Examples:
- `common.buttons.submit`
- `pages.home.hero.title`
- `forms.contact.email.label`
