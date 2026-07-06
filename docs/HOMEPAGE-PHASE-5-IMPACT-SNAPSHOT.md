# KCIC Homepage Redesign: Phase 5 Impact Snapshot

Created: 2026-07-06

Related plan: `docs/HOMEPAGE-REDESIGN-PHASED-IMPLEMENTATION-PLAN.md`

## Phase 5 Status

Phase 5 implementation is complete for the Impact Snapshot section.

This phase rebuilds the former poster-style impact area into a board-report-inspired proof section with clear metrics, a regional map panel, and a deterministic toggle between current impact and 2030 targets.

## Image Generation Direction

An image-generation concept pass was used before implementation to explore a more corporate impact layout.

Prompt direction:

```text
Reimagine the Kenya Climate Innovation Centre homepage Impact Snapshot section for a corporate NGO website. Use a polished desktop web UI section with two modes, "13 Years On" and "2030 Targets", credible metrics, a regional map/photo panel, and a concise impact narrative. Use a dark green institutional background, KCIC green #80c738 for key numbers and controls, cyan #00addd as a small data accent, warm off-white, and muted gray. Avoid thick black borders, poster/brutalist style, childish cards, gradient text, huge rounded cards, decorative blobs, fake logos, unreadable tiny text, and generic SaaS dashboard clichés.
```

The generated concept was used as direction only. The implemented section uses local data and code-native UI.

## Files Updated

| File | Change |
|---|---|
| `src/components/sections/MinimalStatsSection.tsx` | Rebuilt the impact section with a corporate metric grid, map/proof panel, and custom segmented control. |
| `docs/HOMEPAGE-REDESIGN-PHASED-IMPLEMENTATION-PLAN.md` | Linked this Phase 5 output back into the master plan. |

## Design Changes

Removed:

1. Radix Tabs in the homepage impact section.
2. Thick black borders and heavy offset shadows.
3. Text stroke and poster-style headline treatment.
4. Decorative SVG background lines.
5. Counter animation tied to the old card system.

Added:

1. Dark institutional impact background.
2. Deterministic segmented control for `13 Years On` and `2030 Targets`.
3. Regional map/proof panel using the existing KCIC map asset.
4. Primary metric grid with clear number hierarchy.
5. Supporting metric row for secondary proof points.
6. Context strip that explains the selected dataset.

## Hydration Fix

The previous local dev issue badge was traced to the impact section's Radix Tabs rendering. This phase removes that dependency from the homepage impact section and replaces it with a simple React state-based segmented control.

Browser verification no longer found the issue text after the change.

## Verification

| Check | Result |
|---|---|
| TypeScript | Passed with `.\node_modules\.bin\tsc.cmd --noEmit`. |
| Desktop layout | Passed. Impact section renders with heading, segmented control, map panel, and eight metrics. |
| Toggle behavior | Passed. `13 Years On` and `2030 Targets` switch correctly. |
| Map image | Passed. Existing KCIC map image loads in browser. |
| Mobile layout | Passed. Eight metric cards stack and no horizontal overflow was detected. |
| Dev issue badge | Passed. Browser check did not find the previous issue text. |

## Known Issues Outside Phase 5

1. The following `FoundingBeliefs` section still uses the older poster/brutalist style.
2. Awards, News, Partners, and Footer still need later-phase refinement.
3. Public numbers should still be confirmed by management before launch.

## Phase 5 Sign-Off

```text
Phase: 5 - Impact Snapshot
Date reviewed: 2026-07-06
Reviewer:
Desktop approved: Pending management review
Mobile approved: Pending management review
Content approved: Pending management review
Issues to fix before Phase 6: Confirm all public impact and 2030 target numbers.
Approved to continue to next phase: Pending management review
```
