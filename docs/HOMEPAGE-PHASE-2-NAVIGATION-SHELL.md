# KCIC Homepage Redesign: Phase 2 Navigation And Page Shell

Created: 2026-07-06

Related plan: `docs/HOMEPAGE-REDESIGN-PHASED-IMPLEMENTATION-PLAN.md`

## Phase 2 Status

Phase 2 implementation is complete for the homepage navigation and global page shell.

This phase focused on removing the remaining poster-style framing around the site navigation and making the page transitions feel calmer and more corporate.

## Files Updated

| File | Change |
|---|---|
| `src/components/layout/MinimalNavbar.tsx` | Reworked the desktop nav, mobile menu, dropdowns, active states, CTA, and focus treatment into a cleaner institutional style. |
| `src/components/HomePage.tsx` | Replaced the louder section dividers with short, subtle gradient transitions between homepage bands. |
| `src/components/animations/SectionDivider.tsx` | Kept the deterministic divider behavior from Phase 1 so decorative rendering stays stable. |

## Navigation Direction

The previous navigation carried the same heavy visual language as the old hero: thick black borders, hard offset shadows, loud mobile blocks, and high-contrast poster styling.

The new navigation uses:

1. Thin green-tinted borders instead of black poster borders.
2. A warm off-white shell that stays readable on both photography and light sections.
3. Softer shadowing for depth without making the nav feel like a flyer.
4. Slim green underline active states on desktop.
5. A calmer mobile overlay with an institutional menu panel.
6. A simpler green CTA button aligned with the Phase 1 hero button style.

## Page Shell Direction

The homepage section dividers were toned down so the page no longer jumps between highly decorative transitions.

Updated divider rhythm:

| Transition | Treatment |
|---|---|
| Hero to About | Dark green to white short gradient. |
| About to Impact | White to dark green short gradient. |
| Impact to Awards | Dark green to warm cream short gradient. |
| Awards to News | Warm cream to light green-tinted background. |
| News to Partners | Light green-tinted background to warm cream. |

This keeps brand color present while reducing motion and visual noise.

## Verification

| Check | Result |
|---|---|
| TypeScript | Passed with `.\node_modules\.bin\tsc.cmd --noEmit`. |
| Desktop top nav | Passed. Nav is readable and visually calmer over the hero. |
| Desktop scrolled nav | Passed. Nav remains readable over lower homepage sections. |
| Mobile closed nav | Passed. Logo and hamburger fit within a stable 390px viewport. |
| Mobile menu open state | Passed. Menu opens, body locks, and the calmer overlay/panel is rendered. |

## Known Issues Outside Phase 2

1. The local dev preview still shows a Next.js issue badge. This has been traced to the existing Impact section Radix Tabs hydration mismatch, not to the hero or navigation work.
2. The lower homepage sections still include older heavy card and decorative treatments. These should be handled in the upcoming section phases, starting with the "What KCIC Does" and "Climate Challenge" work.
3. ESLint is still blocked by the existing project configuration issue: `TypeError: Converting circular structure to JSON`.

## Phase 2 Sign-Off

```text
Phase: 2 - Navigation and page shell
Date reviewed: 2026-07-06
Reviewer:
Desktop approved: Pending management review
Mobile approved: Pending management review
Content approved: Not applicable
Issues to fix before Phase 3: Existing Impact section hydration issue remains for Phase 5; lower sections still need redesign in later phases.
Approved to continue to next phase: Pending management review
```
