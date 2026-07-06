# KCIC Homepage Redesign: Phase 0 Foundation And Approvals

Created: 2026-07-05

Related documents:

- `docs/HOMEPAGE-CORPORATE-REDESIGN-BRIEF.md`
- `docs/HOMEPAGE-REDESIGN-PHASED-IMPLEMENTATION-PLAN.md`

## Phase 0 Status

Phase 0 is complete as a preparation step. The team can move to Phase 1 after management confirms the pending approval items listed below.

## What Was Checked

| Area | Source checked | Finding |
|---|---|---|
| Brand typography | KCIC brand book PDF | Brand book lists Gotham Thin, Light, Book, Medium, Bold, Black, and Century Gothic. It emphasizes clarity and legibility. |
| Current site font | `src/app/layout.tsx` | Site currently uses Geist and Geist Mono through `next/font/google`. Gotham is not wired into the site. |
| Brand colors | `BRAND-COLORS.md`, `src/lib/design-system.ts`, `src/app/globals.css` | Official colors are already documented and implemented: green `#80c738`, cyan `#00addd`, gray `#8b8d90`, white `#ffffff`. |
| Current homepage structure | `src/components/HomePage.tsx` | Homepage currently has hero, climate challenge, founding beliefs, impact journey, awards, news, partners, footer. |
| Current hero | `src/components/sections/HeroImageCarousel.tsx` | Current hero uses heavy 900-weight type, text stroke, hard shadow, thick borders, cyan block, and a visible `Live focus` panel. |
| Available images | `public/images/**` | Strong local image candidates exist for the hero, sectors, programmes, map, awards, and partner logos. |
| Impact metrics | `src/components/HomePage.tsx`, `src/data/impact.ts` | `HomePage.tsx` has stronger metrics than `src/data/impact.ts`; final public numbers need approval before use in the hero. |

## Approved Working Direction

These items are ready to guide Phase 1 unless management changes them.

### Brand Position

Use KCIC as a serious master brand: institutional, credible, climate-smart, practical, and partner-ready.

Avoid:

- poster-style hero typography
- thick black borders and shadows
- playful carousel controls on the public hero
- decorative motion that distracts from the mission

### Color System

| Role | Color | Phase 1 usage |
|---|---|---|
| Primary action and key emphasis | `#80c738` | Primary CTA, small highlight, proof metric emphasis. |
| Secondary action and information | `#00addd` | Secondary CTA, link accents, subtle overlay support. |
| Body and UI text | dark gray values | Main readable text, especially on light backgrounds. |
| Background | white, light tint, deep green/charcoal | Clean corporate section rhythm. |

Accessibility note: do not use brand green, brand cyan, or brand gray for small body text on white. Use darker grays for normal text.

### Typography Direction

Preferred:

```text
Gotham, if KCIC can provide licensed webfont files.
```

Working fallback if Gotham files are not available:

```text
Montserrat, Century Gothic, Aptos, Arial, Helvetica, sans-serif
```

Implementation note: Phase 1 can proceed with the fallback stack. If Gotham files are provided later, they can replace the fallback without redesigning the layout.

### Hero Copy Direction

Recommended headline:

```text
Catalysing climate entrepreneurship in Africa
```

Recommended supporting copy:

```text
KCIC supports climate-smart enterprises with incubation, financing readiness, market access, and partnerships that build resilient communities.
```

Recommended CTA labels:

```text
Explore Our Programmes
See Our Impact
```

Recommended spelling:

```text
Use "Catalysing" for the public site, unless management specifically prefers "Catalyzing".
```

Reason: Kenyan and Commonwealth English commonly use `-ise` spellings, and the corporate tone feels more locally appropriate.

## Candidate Public Metrics

These are candidates for the hero proof strip and impact section. They should be confirmed before publishing in the new hero.

| Metric | Source in repo | Proposed usage |
|---|---|---|
| `3,500+` SMEs supported | `src/components/HomePage.tsx` | Hero proof strip and impact section. |
| `$63M` leveraged | `src/components/HomePage.tsx` | Hero proof strip and impact section. |
| `57,517` jobs created | `src/components/HomePage.tsx` | Hero proof strip and impact section. |
| `507,149` tonnes CO2 mitigated | `src/components/HomePage.tsx` | Hero proof strip and impact section. |
| `73` policy initiatives | `src/components/HomePage.tsx` | Impact section, not hero unless space allows. |
| `67%` commercialization rate | `src/components/HomePage.tsx` | Impact section, not hero unless approved. |

Metrics to treat carefully:

- `src/data/impact.ts` contains smaller placeholder-style metrics such as `450+ SMEs supported`, `$25M+ Investment mobilized`, and `2,500+ Green jobs`.
- Do not mix the two metric sets on the same page without confirming the correct public source of truth.

## Candidate Homepage Images

The following local assets can be considered for Phase 1 and later phases.

### Hero Candidates

| Asset | Size | Notes |
|---|---:|---|
| `public/images/news/slide1.jpg` | 6720 x 4480 | Strong large-format image already used in hero carousel. Needs crop review for text placement. |
| `public/images/news/slide2.jpg` | 6061 x 4041 | Strong large-format image already used in hero carousel. Needs crop review for text placement. |
| `public/images/news/slide3.jpeg` | 4000 x 2666 | Good large-format candidate for carousel expansion. |
| `public/images/news/slide4.jpeg` | 4000 x 2666 | Good large-format candidate for carousel expansion. |
| `public/images/sectors/crosscutting.jpg` | 6720 x 4480 | Strong fallback if it represents KCIC work clearly. |

### Supporting Section Candidates

| Asset | Size | Best use |
|---|---:|---|
| `public/images/KCIC-Map.png` | 2430 x 2430 | Impact section map. |
| `public/images/sectors/agriculture.webp` | available | Agriculture sector and AgriBiz programme. |
| `public/images/sectors/nature.jpg` | 1356 x 668 | Nature-based solutions section. |
| `public/images/sectors/water.jpeg` | 768 x 1024 | Water sector section. |
| `public/images/programmes/swift.jpg` | 2560 x 1707 | SWIFT programme card. |
| `public/images/programmes/greenbiz.jpg` | 1024 x 683 | GreenBiz programme card. |

Image decision for Phase 1:

- Use `slide1.jpg` and `slide2.jpg` initially because they are already wired into the current hero.
- Review `slide3.jpeg` and `slide4.jpeg` visually before adding them to the hero carousel.
- Crop must keep people, logos, and important subjects away from the text zone.

## Pending Management Approvals

Before Phase 1 build, confirm these items:

| Item | Recommended decision | Status |
|---|---|---|
| Font license | Use Gotham if licensed files are available; otherwise use the fallback corporate sans stack. | Pending |
| Hero spelling | Use `Catalysing climate entrepreneurship in Africa`. | Pending |
| Hero supporting copy | Use the proposed one-sentence KCIC offer statement. | Pending |
| Hero metrics | Use `3,500+`, `$63M`, `57,517`, `507,149 tonnes`. | Pending |
| Hero images | Start with `slide1.jpg` and `slide2.jpg`; add more after visual review. | Pending |
| Public homepage tone | Corporate, restrained, institutional, climate entrepreneurship focused. | Pending |

## Phase 1 Ready Inputs

Once the pending approvals are confirmed, Phase 1 can begin with these implementation inputs.

### Files To Change First

1. `src/components/sections/HeroImageCarousel.tsx`
2. `src/components/HomePage.tsx`
3. `src/app/layout.tsx`, only if changing font loading immediately
4. `src/app/globals.css`, only if adding global typography variables/utilities

### Phase 1 Starting Decisions

| Decision | Value |
|---|---|
| Hero style | Image-led corporate hero with dark green/charcoal overlay. |
| Typography | Clean geometric sans, 600-700 headline weight, no stroke, no hard shadow. |
| CTA structure | Primary green CTA and secondary restrained CTA. |
| Motion | Subtle fade/slow zoom only. |
| Controls | Remove public `Live focus` panel. |
| Proof strip | Add compact metrics only after metric approval. |

## Phase 0 Sign-Off

```text
Phase: 0 - Foundation and approvals
Date prepared: 2026-07-05
Prepared by: Codex
Desktop approved: Pending management review
Mobile approved: Pending after Phase 1 implementation
Content approved: Pending management review
Issues to fix before Phase 1: Confirm font license, hero copy, public metrics, and hero image choices.
Approved to continue to next phase: Pending
```
