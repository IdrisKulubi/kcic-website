# KCIC Homepage Redesign: Phase 4 Climate Challenge

Created: 2026-07-06

Related plan: `docs/HOMEPAGE-REDESIGN-PHASED-IMPLEMENTATION-PLAN.md`

## Phase 4 Status

Phase 4 implementation is complete for the Climate Challenge / Context section.

This phase reimagines the old poster-style Climate Challenge block into a serious, image-led context section that explains why KCIC's enterprise support matters.

## Image Generation Direction

An image-generation concept pass was used before implementation to explore a calmer corporate NGO layout.

Prompt direction:

```text
Reimagine a corporate NGO homepage section for Kenya Climate Innovation Centre titled Climate Challenge. Use a polished web UI mockup with a serious context-setting section, one large environmental enterprise photo area, a calm dark green content panel, concise metric block, and three climate impact points. Use KCIC green #80c738, cyan #00addd sparingly, deep green charcoal, warm off-white, and muted gray. Avoid thick black borders, poster/brutalist style, cartoon graphics, gradient text, repeated identical icon cards, oversized rounded cards, decorative blobs, and fake logos.
```

The generated concept was used as design direction only. The implemented section uses local project imagery and code-native UI.

## Files Updated

| File | Change |
|---|---|
| `src/components/sections/ClimateChallenge.tsx` | Rebuilt the section into a dark institutional context block with image, metrics, risk areas, and KCIC response. |
| `docs/HOMEPAGE-REDESIGN-PHASED-IMPLEMENTATION-PLAN.md` | Linked this Phase 4 output back into the master plan. |

## Design Changes

Removed:

1. Thick black poster borders.
2. Heavy offset shadows.
3. Animated particles and counter burst effects.
4. Tilt/3D hover card interactions.
5. Chunky uppercase visual language.

Added:

1. Dark green context background.
2. One strong environmental image using `/images/sectors/nature.jpg`.
3. Clear headline and supporting copy.
4. Calm three-part metric row.
5. Three climate risk areas with restrained icons.
6. KCIC response panel linking the climate problem back to enterprise action.
7. CTA to `/impact`.

## Verification

| Check | Result |
|---|---|
| TypeScript | Passed with `.\node_modules\.bin\tsc.cmd --noEmit`. |
| Image path | Passed. `public/images/sectors/nature.jpg` exists and loads in browser. |
| Desktop layout | Passed. Section renders with image, metrics, and three risk areas. |
| Mobile layout | Passed. No horizontal overflow detected. |
| Animation | Passed. Motion is limited to restrained reveal behavior and respects reduced motion checks. |

## Known Issues Outside Phase 4

1. The following `FoundingBeliefs` section still uses the older poster/brutalist visual style and should be addressed in a later polish pass or folded into a cleaner About sequence.
2. The local dev preview still has the existing Impact section Tabs hydration issue, scheduled for Phase 5.

## Phase 4 Sign-Off

```text
Phase: 4 - Climate Challenge / Context
Date reviewed: 2026-07-06
Reviewer:
Desktop approved: Pending management review
Mobile approved: Pending management review
Content approved: Pending management review
Issues to fix before Phase 5: Confirm public use of the 2.6% GDP projection and whether the nature image is the preferred approved visual.
Approved to continue to next phase: Pending management review
```
