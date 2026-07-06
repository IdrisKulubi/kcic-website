# KCIC Homepage Redesign: Phase 1 Hero Implementation

Created: 2026-07-05

Related documents:

- `docs/HOMEPAGE-PHASE-0-FOUNDATION-APPROVALS.md`
- `docs/HOMEPAGE-REDESIGN-PHASED-IMPLEMENTATION-PLAN.md`
- `docs/HOMEPAGE-CORPORATE-REDESIGN-BRIEF.md`

## Phase 1 Status

Phase 1 implementation is complete for the homepage hero.

## Files Changed

| File | Change |
|---|---|
| `src/components/sections/HeroImageCarousel.tsx` | Rebuilt the hero into a calmer corporate image-led layout. |
| `src/components/HomePage.tsx` | Added Phase 1 hero copy, CTAs, and proof metrics. Removed global floating decorative elements from the homepage. |
| `src/components/animations/SectionDivider.tsx` | Replaced randomized dotted divider positions with deterministic positions to reduce hydration mismatch risk. |

## What Changed

### Hero Visual Direction

The hero no longer uses the poster/brutalist styling from the screenshot.

Removed:

- heavy `fontWeight: 900`
- text stroke
- hard black text shadow
- thick black bordered hero label
- bright cyan slab
- green decorative square
- public `Live focus` carousel control panel

Added:

- image-led corporate hero with dark green/charcoal overlay
- clean geometric sans stack aligned to the brand book direction
- restrained brand-green accent line
- readable heading, supporting copy, CTAs, and proof metrics
- subtler image zoom timing

### Hero Copy

```text
Catalysing climate entrepreneurship in Africa
```

```text
KCIC supports climate-smart enterprises with incubation, financing readiness, market access, and partnerships that build resilient communities.
```

CTAs:

```text
Explore Our Programmes
See Our Impact
```

### Proof Metrics

The hero now shows:

| Metric | Label |
|---|---|
| `3,500+` | SMEs supported |
| `$63M` | Leveraged for enterprises |
| `57,517` | Jobs created |
| `507,149` | Tonnes CO2 mitigated |

These are pulled from the candidate Phase 0 metric set and should still be confirmed as final public numbers before launch.

## Verification

| Check | Result |
|---|---|
| TypeScript | Passed with `tsc --noEmit`. |
| Desktop browser preview | Passed. Hero is readable, calmer, and no longer poster-like. |
| Mobile browser preview | Passed for first-fold content visibility. Metrics continue below the fold, which is acceptable for mobile. |
| ESLint | Blocked by existing ESLint configuration error: `Converting circular structure to JSON`. |
| Dev overlay issue | Still present, but traced to an existing Impact section Radix Tabs hydration mismatch, not the Phase 1 hero. |

## Known Follow-Up Items

1. Confirm whether Gotham webfont files are available. If not, keep the current corporate fallback stack.
2. Confirm final public metric numbers before launch.
3. Phase 2 should address the existing mobile navbar styling, which still has thick black shadow/border treatment.
4. Phase 5 should address the existing Impact section Radix Tabs hydration mismatch.

## Phase 1 Sign-Off

```text
Phase: 1 - Hero section
Date prepared: 2026-07-05
Prepared by: Codex
Desktop approved: Ready for management review
Mobile approved: Ready for management review
Content approved: Pending final management approval
Issues to fix before Phase 2: Confirm metrics and typography license if needed.
Approved to continue to next phase: Ready after review
```
