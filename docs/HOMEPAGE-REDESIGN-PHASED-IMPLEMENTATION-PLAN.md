# KCIC Homepage Redesign Phased Implementation Plan

Created: 2026-07-05

Related brief: `docs/HOMEPAGE-CORPORATE-REDESIGN-BRIEF.md`

Purpose: break the KCIC homepage redesign into practical build phases so the team can improve the page systematically from the hero through the footer, with review checkpoints after each phase.

## Build Principle

Each phase should be completed, reviewed on desktop and mobile, then accepted before the next phase begins. This avoids changing the whole homepage at once and makes it easier for management to approve direction early.

The order below starts with the visible problem from the screenshot, then moves down the homepage section by section.

## Phase Overview

| Phase | Area | Main outcome |
|---|---|---|
| Phase 0 | Foundation and approvals | Confirm assets, typography, content, metrics, and brand rules before code changes. |
| Phase 1 | Hero section | Replace the current poster/brutalist hero with a corporate, brand-aligned first fold. |
| Phase 2 | Navigation and page shell | Make the top navigation, page spacing, and global homepage rhythm feel institutional. |
| Phase 3 | What KCIC Does | Add a clear section explaining KCIC's offer before asking users to interpret impact or programmes. |
| Phase 4 | Climate Challenge / Context | Rework the existing climate challenge section into a serious context-setting section. |
| Phase 5 | Impact Snapshot | Make KCIC's numbers and 2030 ambition credible, scannable, and visually disciplined. |
| Phase 6 | Programmes and Focus Sectors | Route users into KCIC's work using polished cards and sector structure. |
| Phase 7 | Awards, News, and Stories | Keep proof of activity, but make it more editorial and less decorative. |
| Phase 8 | Partners and Footer | Build trust and conversion with partner logos, contact routes, newsletter, and social links. |
| Phase 9 | QA, accessibility, and management review | Verify responsive behavior, contrast, performance, and manager feedback before final handoff. |

## Phase 0: Foundation And Approval Inputs

### Goal

Prepare the source material and decisions needed before touching the UI.

### Phase 0 output

Detailed Phase 0 preparation has been completed in `docs/HOMEPAGE-PHASE-0-FOUNDATION-APPROVALS.md`. Use that document as the approval checklist before Phase 1 implementation.

### Files to review

| File | Why |
|---|---|
| `docs/HOMEPAGE-CORPORATE-REDESIGN-BRIEF.md` | Main design direction and management rationale. |
| `BRAND-COLORS.md` | Official KCIC colors and contrast notes. |
| `src/lib/design-system.ts` | Existing design tokens. |
| `src/app/layout.tsx` | Current font loading. |
| `src/components/HomePage.tsx` | Homepage section order. |

### Tasks

1. Confirm whether KCIC owns or can legally use Gotham as a webfont.
2. If Gotham is unavailable, approve fallback stack: `Montserrat`, `Century Gothic`, `Aptos`, `Arial`, `Helvetica`, `sans-serif`.
3. Confirm final hero headline and supporting copy.
4. Confirm which impact metrics are approved for public homepage use.
5. Select 3-5 strong KCIC-approved homepage images.
6. Decide whether homepage should use British/Kenyan spelling: `Catalysing` vs `Catalyzing`.

### Deliverable

A short approved content/assets note, or a comment in the task tracker, before Phase 1 begins.

### Acceptance checklist

- Font direction approved.
- Hero copy approved.
- Metrics approved.
- Hero images approved.
- Brand colors confirmed as green `#80c738`, cyan `#00addd`, gray `#8b8d90`, white `#ffffff`.

## Phase 1: Hero Section Redesign

### Goal

Fix the current first-screen problem. The hero should feel corporate, credible, and aligned to the KCIC brand book.

### Phase 1 output

Phase 1 implementation has been completed in `docs/HOMEPAGE-PHASE-1-HERO-IMPLEMENTATION.md`. Use that document for hero review notes and follow-up items before Phase 2.

### Main files

| File | Change |
|---|---|
| `src/components/sections/HeroImageCarousel.tsx` | Redesign hero typography, overlay, controls, CTAs, and metric strip. |
| `src/components/HomePage.tsx` | Pass real description and CTA data into the hero. |
| `src/app/globals.css` | Add any hero typography utility if needed. |

### Tasks

1. Remove `textShadow` and `WebkitTextStroke` from the hero headline.
2. Reduce headline weight from `900` to `600` or `700`.
3. Change line-height from `0.9` to around `1.04-1.12`.
4. Remove the thick black bordered green label style.
5. Remove or hide the `Live focus` panel from the public hero.
6. Replace the large cyan block and green square with a subtle brand gradient or slim accent.
7. Add hero supporting copy.
8. Add two CTAs:
   - `Explore Our Programmes`
   - `See Our Impact`
9. Add a compact proof strip using approved metrics.
10. Keep image carousel movement subtle: fade or very slow zoom only.

### Suggested hero content

```text
Headline:
Catalysing climate entrepreneurship in Africa

Supporting copy:
KCIC supports climate-smart enterprises with incubation, financing readiness, market access, and partnerships that build resilient communities.
```

### Acceptance checklist

- Screenshot no longer resembles a poster/event banner.
- Hero is readable without shadows or stroke.
- CTA buttons are visible and professional.
- Hero text does not collide with image subjects.
- Mobile hero wraps cleanly.
- Brand green is used for primary action or key emphasis.
- Brand cyan is supportive, not dominant.

### Review checkpoint

Stop here and get management approval on the new first fold before redesigning the rest of the homepage.

## Phase 2: Navigation And Page Shell

### Goal

Make the global homepage frame feel stable and corporate, especially when scrolling between sections.

### Phase 2 output

Phase 2 implementation has been completed in `docs/HOMEPAGE-PHASE-2-NAVIGATION-SHELL.md`. Use that document for navigation and page-shell review notes before Phase 3.

### Main files

| File | Change |
|---|---|
| `src/components/layout/MinimalNavbar.tsx` | Improve sticky behavior, contrast, active states, and visual restraint. |
| `src/lib/navigation.ts` | Confirm navigation labels and order. |
| `src/components/HomePage.tsx` | Simplify global decorative elements and section dividers. |
| `src/components/animations/SectionDivider.tsx` | Reduce overly decorative transitions if needed. |

### Tasks

1. Make navbar readable on hero photography and light sections.
2. Use clean active states: underline, dot, or slim brand-green bar.
3. Avoid heavy glassmorphism or overly transparent nav backgrounds.
4. Remove or reduce homepage `FloatingElements`.
5. Reduce the number of wave/angle/dot dividers.
6. Set a calmer section background rhythm.

### Acceptance checklist

- Navigation is readable at top and after scroll.
- The page shell feels more institutional.
- Decorative motion does not distract from content.
- Section transitions feel calm and intentional.

## Phase 3: What KCIC Does Section

### Goal

Add a clear explanation section near the top so visitors quickly understand KCIC's role.

### Phase 3 output

Phase 3 implementation has been completed in `docs/HOMEPAGE-PHASE-3-WHAT-KCIC-DOES.md`. Use that document for the new service-pillar section review before Phase 4.

### Main files

| File | Change |
|---|---|
| `src/components/HomePage.tsx` | Insert the section after the hero. |
| New: `src/components/sections/WhatKcicDoes.tsx` | Create a concise pillar section. |

### Recommended content structure

| Pillar | Description |
|---|---|
| Incubation and acceleration | Support climate enterprises with business development and growth readiness. |
| Access to finance | Prepare enterprises for investment and connect them to financing opportunities. |
| Market access | Help entrepreneurs reach customers, partners, and value chains. |
| Policy and ecosystem building | Strengthen the climate entrepreneurship environment through collaboration and advocacy. |

### Tasks

1. Create a clean white or very light green-tint section.
2. Use four concise pillars with icons.
3. Avoid identical oversized decorative cards.
4. Add a short CTA into programmes or about page.

### Acceptance checklist

- A first-time visitor can explain what KCIC does after this section.
- Copy is concise and not repetitive.
- Icons support scanning, not decoration.
- Section looks corporate on mobile.

## Phase 4: Climate Challenge / Context Section

### Goal

Rework the existing challenge section so it frames the problem KCIC responds to, without feeling dramatic or overly animated.

### Phase 4 output

Phase 4 implementation has been completed in `docs/HOMEPAGE-PHASE-4-CLIMATE-CHALLENGE.md`. Use that document for the new climate context section review before Phase 5.

### Main files

| File | Change |
|---|---|
| `src/components/sections/ClimateChallenge.tsx` | Refine layout, copy hierarchy, imagery, and animation. |
| `src/components/HomePage.tsx` | Position section after "What KCIC Does". |

### Tasks

1. Use one strong environmental or enterprise-related image.
2. Use a dark green or charcoal background with enough contrast.
3. Keep statistics or climate facts readable and sourced/approved.
4. Replace decorative particles or playful effects with restrained reveals.
5. Ensure the section connects back to KCIC's solution, not only the climate problem.

### Acceptance checklist

- Section explains why KCIC exists.
- Visual tone is serious but not gloomy.
- Text contrast passes readability checks.
- Animation is subtle.

## Phase 5: Impact Snapshot

### Goal

Make impact metrics the strongest proof area on the homepage.

### Phase 5 output

Phase 5 implementation has been completed in `docs/HOMEPAGE-PHASE-5-IMPACT-SNAPSHOT.md`. Use that document for impact metric review, toggle behavior, and the hydration-fix note before Phase 6.

### Main files

| File | Change |
|---|---|
| `src/components/sections/MinimalStatsSection.tsx` | Refine impact layout, tabs, map, and metric styling. |
| `src/components/HomePage.tsx` | Keep impact section in a prominent position. |

### Tasks

1. Split metrics clearly between `13 Years On` and `2030 Targets`.
2. Use dark background with green metric numbers.
3. Keep metric labels short.
4. Make map/image supporting, not visually competing.
5. Add a CTA to full impact page.
6. Use approved public metrics only.

### Acceptance checklist

- Metrics are readable at a glance.
- Toggle behavior is clear.
- Numbers do not look exaggerated or decorative.
- The section strengthens trust.

## Phase 6: Programmes And Focus Sectors

### Goal

Make it easy for entrepreneurs, partners, and funders to understand where KCIC works and what programmes exist.

### Main files

| File | Change |
|---|---|
| Existing or new `src/components/sections/ProgrammesSection.tsx` | Homepage programme preview. |
| Existing or new `src/components/sections/FocusSectorsSection.tsx` | Sector overview. |
| `src/components/HomePage.tsx` | Insert both sections after impact. |

### Programme tasks

1. Show flagship programmes using image-led cards.
2. Use consistent card heights and restrained shadows.
3. Include short programme descriptions.
4. Add CTA to all programmes.

### Focus sector tasks

1. Show sectors: renewable energy, circular economy, mobility, nature-based solutions, water, agriculture.
2. Use simple icons or real sector photos.
3. Avoid heavy parallax if it hurts clarity.

### Acceptance checklist

- Users can quickly see how KCIC's work is organized.
- Cards do not feel like generic templates.
- Programme and sector sections are visually related but not repetitive.

## Phase 7: Awards, News, And Stories

### Goal

Show credibility and current activity without making the homepage feel crowded.

### Main files

| File | Change |
|---|---|
| `src/components/sections/AwardsSection.tsx` | Tone down decorative award effects. |
| `src/components/sections/NewsSection.tsx` | Make news presentation more editorial and corporate. |
| Optional new `src/components/sections/ImpactStoriesPreview.tsx` | Add stories if available. |

### Tasks

1. Keep awards concise: 2-3 strongest recognitions only.
2. Remove excessive confetti, glow, or playful celebration effects.
3. Show latest news with clean image cards.
4. Use category tags sparingly.
5. Add CTA to newsroom.
6. If impact stories exist, feature one strong story before the news grid.

### Acceptance checklist

- Awards support trust without dominating the page.
- News feels current and readable.
- The section does not compete with impact metrics.

## Phase 8: Partners And Footer

### Goal

End with trust, contact clarity, and conversion routes.

### Main files

| File | Change |
|---|---|
| `src/components/sections/HomePartnersLogos.tsx` | Refine partner logo strip. |
| `src/components/layout/Footer.tsx` | Create compact corporate footer. |

### Partner tasks

1. Use a clean partner logo band.
2. Keep logo sizing consistent.
3. Avoid heavy hover effects.
4. Add a short heading such as `Trusted by partners across the ecosystem`.

### Footer tasks

1. Use compact dark branded footer.
2. Include quicklinks, office address, email, and social media.
3. Include newsletter signup if backend/process exists.
4. Add whistleblower/procurement/careers links if required by navigation.

### Acceptance checklist

- Footer is compact and complete.
- Partner logos build credibility.
- Contact information is easy to find.
- Footer does not feel detached from the page.

## Phase 9: QA, Accessibility, And Final Review

### Goal

Verify the whole homepage before final management handoff.

### Main checks

| Check | Requirement |
|---|---|
| Desktop screenshot | Review at 1440px or similar. |
| Mobile screenshot | Review around 390px width. |
| Tablet screenshot | Review around 768px width. |
| Contrast | Body text must use accessible dark tones. Brand green/cyan should not be used for small text on white. |
| Image crops | Faces, logos, and important subjects must not be hidden behind text. |
| Navigation | Sticky nav must remain readable over all sections. |
| Performance | Homepage images should be optimized and not oversized. |
| Accessibility | Buttons have labels, focus states are visible, motion is reduced for users who prefer reduced motion. |

### Final acceptance checklist

- Management approves first fold and full homepage flow.
- No mobile overlap issues.
- No unreadable text on image backgrounds.
- No decorative element distracts from institutional credibility.
- Homepage clearly explains KCIC's mission, offer, impact, programmes, partners, and next steps.

## Recommended Build Order In The Codebase

1. `src/components/sections/HeroImageCarousel.tsx`
2. `src/components/HomePage.tsx`
3. `src/app/layout.tsx`
4. `src/lib/design-system.ts`
5. `src/components/layout/MinimalNavbar.tsx`
6. New `src/components/sections/WhatKcicDoes.tsx`
7. `src/components/sections/ClimateChallenge.tsx`
8. `src/components/sections/MinimalStatsSection.tsx`
9. Programme and sector preview components
10. `src/components/sections/AwardsSection.tsx`
11. `src/components/sections/NewsSection.tsx`
12. `src/components/sections/HomePartnersLogos.tsx`
13. `src/components/layout/Footer.tsx`

## Phase Sign-Off Template

Use this after every phase:

```text
Phase:
Date reviewed:
Reviewer:
Desktop approved: Yes/No
Mobile approved: Yes/No
Content approved: Yes/No
Issues to fix:
Approved to continue to next phase: Yes/No
```
