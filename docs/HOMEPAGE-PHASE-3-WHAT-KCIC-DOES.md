# KCIC Homepage Redesign: Phase 3 What KCIC Does

Created: 2026-07-06

Related plan: `docs/HOMEPAGE-REDESIGN-PHASED-IMPLEMENTATION-PLAN.md`

## Phase 3 Status

Phase 3 implementation is complete for the new "What KCIC does" homepage section.

This phase adds a clear explanation of KCIC's offer immediately after the hero. The goal is to help first-time visitors understand KCIC before they reach the climate context, impact, programmes, awards, and partner sections.

## Files Updated

| File | Change |
|---|---|
| `src/components/sections/WhatKcicDoes.tsx` | Added a new homepage-specific corporate section with four service pillars, proof points, and a programme CTA. |
| `src/components/HomePage.tsx` | Inserted the new section after the hero and updated the transition into the About section. |
| `docs/HOMEPAGE-REDESIGN-PHASED-IMPLEMENTATION-PLAN.md` | Linked this Phase 3 output back into the master plan. |

## Content Structure

The section explains KCIC through four practical support areas:

| Pillar | Purpose |
|---|---|
| Incubation and acceleration | Shows that KCIC supports enterprises from early promise to growth readiness. |
| Access to finance | Makes the financing readiness role clear. |
| Market access | Shows the route from enterprise support to customers, partners, and value chains. |
| Ecosystem building | Positions KCIC as more than a programme operator by showing policy and partnership work. |

The support column adds three concise proof points:

1. Climate-smart enterprise support.
2. Financing and investment readiness.
3. Markets, partners, and policy links.

## Design Direction

The section intentionally avoids the old poster/brutalist treatment.

Applied direction:

1. Light green-tinted institutional background.
2. Dark green corporate headline.
3. Simple grid with thin borders.
4. Phosphor icons used as scan aids, not decoration.
5. Brand green reserved for focus and action.
6. No thick black borders, text strokes, oversized shadows, or loud section controls.

## Verification

| Check | Result |
|---|---|
| TypeScript | Passed with `.\node_modules\.bin\tsc.cmd --noEmit`. |
| Desktop layout | Passed. Section appears after hero with four corporate service pillars. |
| Mobile layout | Passed. Heading uses available width, four cards stack, and no horizontal overflow was detected. |
| CTA route | Present. `Explore programmes` links to `/programmes`. |

## Known Issues Outside Phase 3

1. The local dev preview still has the existing Next.js issue badge from the Impact section Tabs hydration mismatch.
2. The next visible redesign need is the current Climate Challenge / About block, which still uses heavy black borders and poster-like cards.

## Phase 3 Sign-Off

```text
Phase: 3 - What KCIC Does
Date reviewed: 2026-07-06
Reviewer:
Desktop approved: Pending management review
Mobile approved: Pending management review
Content approved: Pending management review
Issues to fix before Phase 4: Management should confirm the four pillar labels and wording.
Approved to continue to next phase: Pending management review
```
