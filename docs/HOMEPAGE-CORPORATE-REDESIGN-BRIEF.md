# KCIC Homepage Corporate Redesign Brief

Created: 2026-07-05

Purpose: define the homepage design adjustments needed after management feedback that the current font and visual style do not feel corporate enough. This brief is grounded in the KCIC brand book, the current homepage implementation, and reference patterns from established nonprofit, climate, and impact organizations.

## Executive Summary

The current homepage hero is visually energetic, but it leans too far into a bold campaign/poster style. The heavy 900-weight headline, black stroke, hard drop shadow, thick outlined labels, bright cyan block, and "Live focus" control panel make the first screen feel informal and experimental. For KCIC, the first impression should feel institutional, trusted, investor-ready, and climate-impact focused.

The redesign should keep KCIC's green and cyan brand equity, but use them with more discipline. The homepage should move toward a clean corporate climate-organization system: clearer typography, calmer overlays, evidence-led sections, stronger mission context, polished photography, and fewer decorative effects.

## Brand Book Requirements To Follow

Source: `C:\Users\Idris Kulubi\Downloads\KCIC brand book (1) (2).pdf`

Key extracted guidance:

| Brand item | Direction for homepage |
|---|---|
| Brand architecture | KCIC should be treated as a monolithic master brand. The homepage should reinforce one strong KCIC identity instead of a collage of visual treatments. |
| Typography | Brand book lists Gotham Thin, Light, Book, Medium, Bold, Black, and italic variants. It also lists Century Gothic. The page should use a clean geometric corporate sans, not a novelty display treatment. |
| Typography principle | The brand book says clarity and legibility are the drivers. This directly conflicts with the current stroked, shadowed, ultra-heavy headline. |
| Primary colors | Green, cyan/blue, gray, and white. Use these as a disciplined system. Avoid oversized cyan slabs and hard black outlines unless they are part of a controlled campaign asset. |
| Brand promise | The homepage should present KCIC as an innovation and clean-technology catalyst, not as a loud event poster. |

## Reference Scan

These references are not for copying visually. They show how serious organizations create authority on the first screen.

| Organization | Relevant pattern | What KCIC should borrow |
|---|---|---|
| [World Resources Institute](https://www.wri.org/) | Uses clear navigation around Research, Data, Initiatives, Insights, then quickly explains "What We Do" and focus areas. | Put mission and proof near the top. Make sectors, programmes, and impact easy to scan. |
| [ClimateWorks Foundation](https://www.climateworks.org/) | Leads with a concise climate-solutions message, two clear CTAs, and immediate credibility metrics such as funders, grantees, grants, and countries served. | Add a polished hero with one primary message, one secondary CTA, and a small evidence strip. |
| [Acumen](https://acumen.org/) | Uses a restrained but confident headline, strong mission language, and impact/sector structure. | Use human-centered entrepreneurship language, not only abstract climate language. |
| [The Rockefeller Foundation](https://www.rockefellerfoundation.org/) | Uses institutional storytelling, big bets, results, reports, and proof of reach. | Frame KCIC's work as serious, measurable, and partner-ready. |

## Current Homepage Issues

Current implementation reviewed:

- `src/components/sections/HeroImageCarousel.tsx`
- `src/components/HomePage.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/lib/design-system.ts`

### 1. Hero Typography Feels Too Informal

Current hero uses:

- `fontWeight: 900`
- `lineHeight: 0.9`
- `textShadow: "6px 6px 0 #101010"`
- `WebkitTextStroke: "1.5px #101010"`
- very large `clamp(3.5rem, 8vw, 8rem)`

This produces a chunky, poster-like look. It is visually memorable, but not corporate. The brand book points to Gotham and Century Gothic with clarity and legibility as the drivers.

Adjustment:

- Use Gotham if KCIC has a licensed webfont.
- If Gotham is not licensed, use a close geometric fallback stack: `Montserrat`, `Century Gothic`, `Aptos`, `Arial`, `Helvetica`, `sans-serif`.
- Remove text stroke and hard shadow.
- Use headline weight 600 or 700, not 900.
- Use line-height around 1.02 to 1.12.
- Use sentence/title case, not a poster-style stacked display.

Recommended hero headline:

> Catalysing climate entrepreneurship in Africa

Supporting line:

> We support climate-smart enterprises with incubation, financing readiness, market access, and partnerships that build resilient communities.

### 2. Hero Visual Style Is Too Brutalist

Current hero has:

- thick black borders
- black box shadows
- cream headline fill
- bright cyan block covering the lower right
- green square decoration
- "Live focus" panel

These elements make the homepage look experimental. KCIC needs more corporate trust and less visual noise.

Adjustment:

- Remove the "Live focus" panel from the public homepage.
- Remove thick black strokes and box shadows.
- Replace the cyan block with a subtle branded gradient overlay.
- Use brand green and cyan as accents, not as large flat shapes over photography.
- Use a professional photo crop with a calm left or bottom text area.

### 3. The First Screen Lacks Enough Context

The current hero shows only the tagline. There is no supporting description, CTA, or proof point, so users get a visual statement but not a clear institutional proposition.

Adjustment:

- Add one short paragraph under the headline.
- Add two CTAs:
  - Primary: `Explore Our Programmes`
  - Secondary: `See Our Impact`
- Add a compact evidence strip:
  - `3,500+ SMEs supported`
  - `$63M leveraged`
  - `57,517 jobs created`
  - `507,149 tonnes CO2 mitigated`

Use only verified KCIC-approved numbers before publishing.

### 4. Brand Colors Need More Discipline

The repo already defines the official colors:

- Green: `#80c738`
- Cyan: `#00addd`
- Gray: `#8b8d90`
- White: `#ffffff`

The homepage should use them as a hierarchy:

| Role | Color |
|---|---|
| Primary CTA and key emphasis | `#80c738` |
| Secondary accent, links, data highlights | `#00addd` |
| Body text | dark gray, not brand gray at small sizes |
| Background | white, very light gray, or very subtle green/cyan tint |
| Dark section | deep charcoal or deep green, with white text |

Avoid using brand green or cyan for small body text on white, because the existing `BRAND-COLORS.md` notes contrast limitations.

### 5. Existing Motion And Decorations Should Be Reduced

The homepage currently includes global floating decorative elements and several animated section dividers. Motion can stay, but it should feel executive and restrained.

Adjustment:

- Keep slow image fade or subtle zoom in the hero.
- Remove bouncing or playful motion from the hero.
- Use simple fade/translate reveals for content sections.
- Avoid decorative floating shapes on corporate pages.
- Keep motion duration short and consistent.

## Recommended Homepage Direction

### Design Voice

Target voice: credible, climate-smart, African, investor-ready, practical.

Do not target: playful, event-poster, startup hype, brutalist, or overly decorative.

### First Fold Structure

Recommended hero layout:

1. Sticky corporate navbar with clear KCIC logo and concise navigation.
2. Full-width mission photograph or carousel.
3. Dark green/charcoal overlay from left to right.
4. Small brand label: `Kenya Climate Innovation Centre`
5. Headline in clean geometric sans.
6. One supporting paragraph.
7. Two CTAs.
8. Compact evidence strip along the bottom.

### Suggested Hero Copy

Headline:

```text
Catalysing climate entrepreneurship in Africa
```

Supporting copy:

```text
KCIC supports climate-smart enterprises with incubation, financing readiness, market access, and partnerships that build resilient communities.
```

CTA labels:

```text
Explore Our Programmes
See Our Impact
```

### Suggested Section Order

| Order | Section | Purpose | Design treatment |
|---|---|---|---|
| 1 | Hero | Position KCIC clearly | Image-led, calm overlay, corporate type |
| 2 | What KCIC Does | Explain offer quickly | White or light tint, 3-4 concise pillars |
| 3 | Impact Snapshot | Prove credibility | Dark section with verified metrics |
| 4 | Programmes | Route users into services | Image cards, not overdecorated cards |
| 5 | Focus Sectors | Show strategic scope | Clean grid with icons/photos |
| 6 | Stories/News | Show current activity | Editorial but restrained |
| 7 | Partners | Build trust | Logo strip with simple treatment |
| 8 | Footer | Contact and conversion | Compact dark branded footer |

## Detailed Adjustment Checklist

### Priority 1: Hero Redesign

| Task | File | Action |
|---|---|---|
| Replace heavy hero type | `src/components/sections/HeroImageCarousel.tsx` | Remove stroke/shadow. Use 600/700 weight and cleaner line-height. |
| Add hero description | `src/components/HomePage.tsx` | Stop passing an empty description. Use approved KCIC positioning copy. |
| Restore CTAs | `src/components/HomePage.tsx` | Add `Explore Our Programmes` and `See Our Impact`. |
| Remove public carousel controls | `src/components/sections/HeroImageCarousel.tsx` | Remove or hide the "Live focus" box. |
| Reduce graphic blocks | `src/components/sections/HeroImageCarousel.tsx` | Replace cyan slab and green square with a subtle gradient/accent line. |
| Improve image treatment | `src/components/sections/HeroImageCarousel.tsx` | Use a consistent dark overlay and better crop priority. |

### Priority 2: Typography System

| Task | File | Action |
|---|---|---|
| Change font strategy | `src/app/layout.tsx` | Replace Geist with Gotham if licensed, otherwise Montserrat or corporate system fallback. |
| Update design token comments | `src/lib/design-system.ts` | Align typography documentation with brand book. |
| Remove negative/trendy display defaults | `src/app/globals.css` | Use cleaner heading scale and avoid extra-tight display tracking. |
| Standardize heading hierarchy | `src/app/globals.css` | H1 56-72px desktop max for hero, section H2 36-48px, body 16-18px. |

### Priority 3: Corporate Color And Layout

| Task | File | Action |
|---|---|---|
| Reduce large cyan overlay | `HeroImageCarousel.tsx` | Use cyan as a narrow accent or secondary CTA color. |
| Use dark gray/green overlay | `HeroImageCarousel.tsx` | Improve legibility while preserving brand. |
| Make section backgrounds calmer | `HomePage.tsx` | Avoid too many decorative dividers and color jumps. |
| Keep brand green focused | Multiple | Use green for CTAs, metric numbers, active states. |

### Priority 4: Content And Credibility

| Task | File | Action |
|---|---|---|
| Add proof metrics near hero | `HeroImageCarousel.tsx` or new component | Add compact stat strip with verified numbers. |
| Add "What KCIC does" summary | `HomePage.tsx` | Insert a concise pillar section before the challenge section. |
| Clarify programmes route | `HomePage.tsx` | Surface flagship programmes on homepage before news. |
| Make partners visible earlier or cleaner | `HomePartnersLogos.tsx` | Use partner trust strip with simple hover, no heavy effects. |

### Priority 5: Motion And Polish

| Task | File | Action |
|---|---|---|
| Reduce decorative floating elements | `HomePage.tsx` | Remove `FloatingElements` from the homepage or make it very subtle. |
| Simplify section dividers | `HomePage.tsx`, `SectionDivider.tsx` | Use straight bands or subtle transitions, not many wave/angle/dot treatments. |
| Use restrained reveal animations | animation components | Fade and slight translate only. |
| Check mobile hero | `HeroImageCarousel.tsx` | Ensure title wraps cleanly, no text overlaps image or controls. |

## Visual Rules For The Redesign

1. Typography must be legible before it is expressive.
2. No text stroke on corporate homepage headlines.
3. No hard black drop shadows behind primary copy.
4. No thick black bordered labels in the hero.
5. Brand green should lead CTAs and proof points.
6. Brand cyan should support, not dominate, the first viewport.
7. Every section needs a business purpose: explain, prove, route, or convert.
8. Use real KCIC imagery wherever possible.
9. Avoid decorative UI that does not help users understand KCIC.
10. Keep the homepage credible for funders, entrepreneurs, government partners, and ecosystem actors.

## Proposed Implementation Phases

| Phase | Scope | Outcome |
|---|---|---|
| Phase 1 | Hero typography, copy, CTAs, overlay, remove heavy effects | First screen becomes corporate and brand-aligned. |
| Phase 2 | Typography tokens and font loading | Site-wide type becomes consistent with brand book. |
| Phase 3 | Homepage information hierarchy | Users understand what KCIC does, its impact, and where to go next. |
| Phase 4 | Section visual polish | Calmer colors, fewer decorative transitions, stronger imagery. |
| Phase 5 | QA | Desktop/mobile screenshots, contrast checks, image crop checks, manager review. |

## Acceptance Criteria

The redesign is ready for review when:

- The first screen no longer looks like a poster or event banner.
- The font choice follows the brand book direction: Gotham/Century Gothic style, clean geometric corporate sans.
- The headline is readable without stroke or heavy shadow.
- The homepage has clear mission copy, CTAs, and proof metrics above or immediately below the fold.
- Brand green, cyan, gray, and white are used consistently.
- Mobile hero text does not overlap controls or imagery.
- The page feels credible for funders, government stakeholders, entrepreneurs, and partners.

## Immediate Recommendation

Start with `src/components/sections/HeroImageCarousel.tsx`. It is the source of the screenshot issue and the fastest way to address the manager's concern. The first change should be typography and visual restraint, then copy/CTA restoration, then the wider homepage structure.
