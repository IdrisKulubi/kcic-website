# KCIC Homepage Revamp Plan

> **Created:** February 12, 2026  
> **Goal:** Eliminate the "too white" feel, infuse KCIC brand identity throughout, restructure navigation per new IA, and add rich GSAP animations.

---

## Brand Colors

| Color | Hex | Usage |
|---|---|---|
| **KCIC Green** | `#80c738` | Primary — CTAs, headings, highlights, stat numbers |
| **KCIC Cyan** | `#00addd` | Secondary — accents, links, info elements |
| **KCIC Gray** | `#8b8d90` | Neutral — body text, borders, subtle UI |
| **KCIC White** | `#ffffff` | Clean backgrounds, contrast text on dark |
| **KCIC Orange** | `#E97451` | Tertiary — warmth, energy, alerts, events |

---

## Current Problems (Audit Summary)

| Problem | Affected Sections |
|---|---|
| **White/transparent backgrounds** — sections blend together | ClimateChallenge, FoundingBeliefs, StatsSection, NewsSection, PartnersSection, ProgramsShowcase, Footer |
| **`rgba(255,255,255,...)` glass styles invisible on white** | ClimateChallenge icon cards, HistoryTimeline cards |
| **No GSAP animations** | HeroVideo, Footer, Navbar, PartnersSection |
| **Brand colors only as faint 5–15% opacity tints** | Nearly all sections |
| **No bold brand-colored section backgrounds** | Entire page reads as monochrome white |
| **Footer is fully transparent** | No visual delineation from page content |
| **Navigation doesn't match new IA** | Missing tabs: Impact, Newsroom; "How We Work" needs rename |

---

## Foundation: Color System & Global Styles

Before touching any component, establish the design tokens.

| # | Task | Files | Details |
|---|---|---|---|
| F.1 | Add `--brand-orange` and variants | `globals.css` | `--brand-orange: #E97451`, `--brand-orange-light: #F0906F`, `--brand-orange-dark: #D05A35` |
| F.2 | Add section background tokens | `globals.css` | `--section-bg-dark: #1a1f2e`, `--section-bg-green: #1b3a1a`, `--section-bg-teal: #0a2a33`, `--section-bg-warm: #faf6f0`, `--section-bg-green-tint: #f0f9e8`, `--section-bg-cyan-tint: #e8f8fd` |
| F.3 | Update Tailwind config | `tailwind.config.ts` | Add `brand.orange`, section bg color utilities |
| F.4 | Change global page background | `globals.css` | From pure white to warm cream `#faf8f5` with higher-opacity brand radial gradients (20-30%) |

---

---

# 1. HOME PAGE — Top Navigation Menu

> **Requirement:** Implement sticky navigation that changes background contrast when scrolling to maintain visibility and accessibility.

### Files: `navigation.ts`, `MinimalNavbar.tsx`

### 1.0 Sticky Navigation Behavior

| Task | Details |
|---|---|
| **Sticky scroll with contrast** | When at top: transparent with `backdrop-blur`. When scrolled: dark charcoal `bg-[#1a1f2e]/95` with white text for visibility against all section backgrounds |
| **GSAP scroll-linked color** | GSAP tweens navbar bg smoothly as user scrolls between dark↔light sections |
| **GSAP nav entrance** | Stagger nav items on initial load via GSAP `timeline` |
| **Active section indicator** | Green underline animates to current section using GSAP `ScrollTrigger` |

---

### Tab 1: About Us

> Include well defined contrast on the backgrounds as you scroll through the different parts for better readability.

| Slide | Page/Section | Details | Implementation |
|---|---|---|---|
| **Slide 1** | **Who We Are** | Vision/Mission cards should be equal sized. Add icons and consistent visuals for Vision/Mission. Below values include "Our Strategy" | Modify `WhatWeDo.tsx` — enforce equal card heights with CSS Grid, add Lucide icons to Vision/Mission cards, add new "Our Strategy" subsection below values |
| **Slide 2** | **Our Team** | At the top section have "The Board" then "The Staff" | Modify `TeamSection.tsx` — restructure layout: Board members first (grid/carousel), divider, then Staff grid below |
| **Slide 3** | **Policies & Disclosures** | Compiling the relevant documents | New page/section — list of downloadable policy documents with icons, category grouping |
| **Slide 4** | **Procurement** | Procurement information | New page/section — procurement notices, tender documents, guidelines |
| **Slide 5** | **Careers** | Career opportunities | Modify existing career page — job listings with status badges, application CTAs |
| **Slide 6** | **Contact Us** | Contact information | Contact page with map, address, phone, email, contact form |

**Background rhythm for About Us pages:** Alternate between warm cream (`#faf6f0`) and white with green tints (`#f0f9e8`) for defined contrast between sections.

---

### Tab 2: Our Work (renamed from "How We Work")

| Slide | Page/Section | Details | Implementation |
|---|---|---|---|
| **Slide 1** | **Our Approach** | Content as shared | Modify `HowWeDoIt.tsx` — green-tinted background `bg-[#f0f9e8]`, service cards with brand gradient accent bars |
| **Slide 2** | **Key Sectors** | Use sector-specific photos or meaningful icons | Modify `KeySectorsParallax.tsx` — dark teal bg `bg-[#0a2a33]`, real sector photos, enhanced GSAP parallax |
| **Slide 3** | **Cross Cutting Issues** | Cross-cutting themes | New section — card grid with icons for gender, youth, environment, etc. |
| **Slide 4** | **Our Partners** | Partner organizations | Modify `PartnersSection.tsx` — cyan tint bg `bg-gradient-to-b from-[#e8f8fd] to-white`, GSAP marquee replacing CSS animation, grayscale→color logos on hover |

---

### Tab 3: Our Programmes

> Amendments on the visual layout and structure — Use card-based visuals with featured images representing each programme.

| Slide | Page/Section | Details | Implementation |
|---|---|---|---|
| **Slide 1** | **Flagship Programmes** | Card-based visuals with featured images | Modify `ProgramsShowcase.tsx` — warm bg `bg-[#faf6f0]`, large image cards with programme logos, descriptions, key stats |
| **Slide 2** | **Special Projects & Initiatives** | Collapsible section | Add collapsible accordion below Flagship — collapsed by default, expands to show project cards |
| **Slide 3** | **Past Projects** | Collapsible section | Same collapsible pattern — archived project cards with dates and outcomes |

---

### Tab 4: Impact

| Slide | Page/Section | Details | Implementation |
|---|---|---|---|
| **Slide 1** | **Overview** | Use a hero banner image that captures "impact" | New hero banner — full-width image with dark overlay, impact tagline, GSAP fade-in |
| **Slide 2** | **Our Theory Of Change** | Theory of change visualization | New section — visual diagram/infographic with GSAP scroll-driven reveal |
| **Slide 3** | **Our Targets** | Target metrics | Modify `MinimalStatsSection.tsx` (targets tab) — green stat numbers `text-[#80c738]` on dark bg, GSAP counters |
| **Slide 4** | **Impact Reports** | Downloadable reports | New section — report cards with cover images, dates, download CTAs |
| **Slide 5** | **Impact Stories** | Feature story cards with images similar to FSD Africa's Impact section — each story includes image/title/excerpt | New section — story card grid with featured images, titles, excerpts, "Read More" links. Similar to FSD Africa style |

---

### Tab 5: Newsroom

| Slide | Page/Section | Details | Implementation |
|---|---|---|---|
| **Slide 1** | **News** | Latest news articles | Modify `NewsSection.tsx` — warm bg, branded card styling with `border-l-4 border-[#80c738]`, GSAP `clipPath` reveal |
| **Slide 2** | **Blogs** | Blog posts | Blog listing with featured images, author, date, category pill (cyan) |
| **Slide 3** | **Events** | Include event photos with dates highlighted | Event cards with photos, prominent date badges (orange), location, RSVP CTAs |
| **Slide 4** | **Podcast** | Add podcast thumbnails or waveform visuals | Podcast cards with episode thumbnails, waveform visualization, play buttons, duration |
| **Slide 5** | **Media Coverage** | Press mentions and media features | Media coverage cards with source logos, article titles, external links |

---


---

---

# 2. HOMEPAGE — Slide Improvements & Hero Section Visuals

> The homepage scrolling experience. Each "slide" is a full section the user scrolls through.

### Scroll Background Rhythm

No two adjacent sections share the same background. Alternating dark ↔ warm ↔ dark creates visual separation and brand identity.

```
┌─────────────────────────────────────────────────┐
│  Slide 1: HERO SECTION                          │  #1a1f2e + brand gradient overlay
│  (GSAP image carousel, Ken Burns effect)        │
├─────────────────────────────────────────────────┤
│  Slide 2: THE CLIMATE CHALLENGE                 │  #1a1f2e + environmental image
│  (Dark bg, white/green text, visible cards)     │
├─────────────────────────────────────────────────┤
│  Slide 3: WHAT WE BELIEVE                       │  #faf6f0 warm cream + texture
│  (Branded card borders, icons)                  │
├─────────────────────────────────────────────────┤
│  Slide 4: OUR IMPACT JOURNEY                    │  #0f172a → #1a1f2e dark gradient
│  (Green stat numbers, Africa map, counters)     │
├─────────────────────────────────────────────────┤
│  Slide 5: AWARDS & RECOGNITIONS                 │  #1b3a1a → #0f172a dark green
│  (Gold/green glow, balloons, confetti)          │
├─────────────────────────────────────────────────┤
│  Slide 6: NEWS & INSIGHTS                       │  #faf6f0 warm cream
│  (Latest content from Newsroom, branded cards)  │
├─────────────────────────────────────────────────┤
│  FOOTER                                         │  #1a1f2e dark charcoal
│  (Compact, newsletter, social, texture)         │
└─────────────────────────────────────────────────┘
```

---

### Slide 1: Hero Section

> Change to high quality images that reflect our mission instead of the video.

| # | Task | Files | Details |
|---|---|---|---|
| 1.1 | Replace video with image carousel | New: `HeroImageCarousel.tsx` | GSAP-powered slideshow with Ken Burns effect (slow zoom/pan). High-quality images reflecting KCIC's climate innovation mission |
| 1.2 | Brand-colored overlay | `HeroImageCarousel.tsx` | Dark gradient: `linear-gradient(135deg, rgba(26,31,46,0.85), rgba(0,173,221,0.3))` |
| 1.3 | GSAP text animations | `HeroImageCarousel.tsx` | Headline: character-by-character stagger. Subtitle: fade-in with blur. CTAs: scale-in with spring easing |
| 1.4 | Animated scroll indicator | `HeroImageCarousel.tsx` | Bouncing chevron with green glow, GSAP `yoyo` infinite repeat |
| 1.5 | Stats bar at hero bottom | `HeroImageCarousel.tsx` | Frosted glass strip with green counter numbers |
| 1.6 | Update HomePage.tsx | `HomePage.tsx` | Replace `<HeroVideo>` with `<HeroImageCarousel>` |

---

### Slide 2: The Climate Challenge

> Include impactful environmental images (community or landscape).

| Task | Files | Details |
|---|---|---|
| Dark background | `ClimateChallenge.tsx` | Change to `bg-[#1a1f2e]` with white/green text for contrast |
| Environmental imagery | `ClimateChallenge.tsx` | Large background image of Kenyan landscape/community with dark overlay |
| Fix invisible icon cards | `ClimateChallenge.tsx` | Replace `rgba(255,255,255,0.05)` → `bg-white/10 border-white/20` visible on dark |
| Enhanced GSAP counter | `ClimateChallenge.tsx` | Keep "2.6°C" counter animation, add particle effect with green/cyan dots |
| Scroll reveal | `ClimateChallenge.tsx` | `ScrollTrigger.batch` — icons fly in from edges with rotation |

---

### Slide 3: What We Believe

> Add icons to reinforce values.

| Task | Files | Details |
|---|---|---|
| Warm cream background | `FoundingBeliefs.tsx` | `bg-[#faf6f0]` with subtle texture pattern for contrast from dark Slide 2 |
| Brand-colored cards | `FoundingBeliefs.tsx` | Left borders: green (Vision), cyan (Mission), orange (Values). White cards with `shadow-md` |
| Add icons | `FoundingBeliefs.tsx` | Meaningful Lucide icons for each value — reinforcing visuals per spec |
| Enhanced GSAP | `FoundingBeliefs.tsx` | Keep 3D card flip + icon spin, enhance with stagger timing |

---

### Slide 4: Our Impact Journey

| Task | Files | Details |
|---|---|---|
| Hero banner image | `MinimalStatsSection.tsx` | Full-width hero banner at section top capturing "impact" — environmental/community image |
| Dark gradient background | `MinimalStatsSection.tsx` | `bg-gradient-to-b from-[#0f172a] to-[#1a1f2e]` |
| Green stat numbers | `MinimalStatsSection.tsx` | `text-[#80c738]` on dark background for high contrast pop |
| Enhanced GSAP counters | `MinimalStatsSection.tsx` | Staggered counting animation with custom easing, AnimatedCounter component |
| Africa map parallax | `MinimalStatsSection.tsx` | GSAP `ScrollTrigger` parallax on the map image |
| Toggle: 13 Years On ↔ 2030 Targets | `MinimalStatsSection.tsx` | Keep toggle between historical impact and future targets |

---

### Slide 5: Awards & Recognitions

| Task | Files | Details |
|---|---|---|
| Dark green gradient background | `AwardsSection.tsx` | `bg-gradient-to-b from-[#1b3a1a] to-[#0f172a]` — prestigious feel on dark |
| Gold/green card glow | `AwardsSection.tsx` | Green border-glow effect, subtle gold shimmer on hover |
| Award card redesign | `AwardsSection.tsx` | White text on dark, award images with glowing borders |
| Enhanced GSAP | `AwardsSection.tsx` | Keep floating balloons/confetti, enhance card entrance with 3D `rotateX` flip |

---

### Slide 6: News & Insights

> Display latest content from Newsroom.

| Task | Files | Details |
|---|---|---|
| Warm cream background | `NewsSection.tsx` | `bg-[#faf6f0]` instead of transparent — contrast from dark Awards above |
| Branded card styling | `NewsSection.tsx` | `border-l-4 border-[#80c738]`, visible shadows, green overlay on image hover |
| Category pill badges | `NewsSection.tsx` | Green = News, Cyan = Blog, Orange = Events |
| Enhanced GSAP | `NewsSection.tsx` | Keep `clipPath` image reveal, add hover tilt effect |
| "View All" CTA | `NewsSection.tsx` | Green button linking to full Newsroom |
| Content source | `NewsSection.tsx` | Pull latest articles from Newsroom (news, blogs, events mixed) |

---

---

# 3. HOMEPAGE FOOTER

> Quicklinks, Office Address, Social media links, Mailing list subscription.  
> Make it more compact. Add subtle background texture or color block to delineate the footer.

| # | Task | Files | Details |
|---|---|---|---|
| 3.1 | **Dark branded background** | `Footer.tsx` | `bg-[#1a1f2e]` charcoal with green/cyan gradient accent line at top edge to delineate from page |
| 3.2 | **Compact layout** | `Footer.tsx` | 3-column grid: Col 1 (Logo + Quicklinks), Col 2 (Office Address + Social Media), Col 3 (Mailing List Subscription) |
| 3.3 | **Quicklinks** | `Footer.tsx` | About, Programmes, Impact, Newsroom, FAQs, Careers — white text, green on hover |
| 3.4 | **Office Address** | `Footer.tsx` | Physical address, phone, email — with map pin / phone / mail icons |
| 3.5 | **Social media links** | `Footer.tsx` | Circular icons (Twitter/X, LinkedIn, Facebook, YouTube) with brand-colored hover glow |
| 3.6 | **Mailing list subscription** | `Footer.tsx` | Prominent email input with green CTA button "Subscribe", `border-[#80c738]` focus ring |
| 3.7 | **Subtle background texture** | `Footer.tsx` | Dot pattern or topographic lines at 5% opacity for depth |
| 3.8 | **GSAP entrance** | `Footer.tsx` | Elements stagger-reveal on scroll into view |
| 3.9 | **Copyright bar** | `Footer.tsx` | Bottom bar with copyright text + whistleblower button |

---

---

# GSAP Animation System (Cross-Cutting)

These animations apply across all sections and the overall scroll experience.

| # | Task | Files | Details |
|---|---|---|---|
| G.1 | Section transitions | `SectionDivider.tsx` | GSAP-morphing SVG shapes between sections (wave, curve, angle) |
| G.2 | Scroll-linked nav contrast | `MinimalNavbar.tsx` | GSAP tweens navbar bg as user scrolls between dark↔light sections |
| G.3 | Parallax depth layers | Multiple sections | 2-3 decorative parallax layers (shapes/dots/lines) per section at different scroll speeds |
| G.4 | Magnetic cursor on CTAs | New: `MagneticButton.tsx` | CTA buttons subtly pull toward cursor position via GSAP |
| G.5 | Performance optimization | All animated sections | `will-change`, `ScrollTrigger.batch()`, `gsap.matchMedia()` to reduce/disable on mobile |
| G.6 | Page loader | New: `PageLoader.tsx` | Brand-colored loading screen with KCIC logo morph animation |

---

---

# Implementation Order

| Step | What | Covers | Priority | Effort | Status |
|---|---|---|---|---|---|
| **1** | CSS variables + Tailwind config | Foundation F.1–F.4 | 🔴 Critical | Small | ⬜ |
| **2** | Section background rhythm in `HomePage.tsx` | Homepage Slides rhythm | 🔴 Critical | Small | ⬜ |
| **3** | Hero: GSAP image carousel | Slide 1 (1.1–1.6) | 🔴 Critical | Large | ⬜ |
| **4** | Navigation restructure + mega-menu | Nav 1.0, Tabs 1–6 | 🟠 High | Large | ⬜ |
| **5** | Climate Challenge: dark bg + fix cards | Slide 2 | 🟠 High | Medium | ⬜ |
| **6** | Footer: dark bg + compact + GSAP | Footer 3.1–3.9 | 🟠 High | Medium | ⬜ |
| **7** | What We Believe: warm bg + icons | Slide 3 | 🟡 Medium | Medium | ⬜ |
| **8** | Impact Journey: dark bg + counters | Slide 4 | 🟡 Medium | Medium | ⬜ |
| **9** | Awards: dark green bg + glow | Slide 5 | 🟡 Medium | Small | ⬜ |
| **10** | News & Insights: warm bg + branded cards | Slide 6 | 🟡 Medium | Medium | ⬜ |
| **11** | About Us pages: Who We Are + equal cards | Tab 1 Slide 1 | 🟡 Medium | Medium | ⬜ |
| **12** | About Us pages: Team, Policies, etc. | Tab 1 Slides 2–6 | 🟡 Medium | Large | ⬜ |
| **13** | Our Work: Approach, Sectors, Partners | Tab 2 Slides 1–4 | 🟡 Medium | Large | ⬜ |
| **14** | Our Programmes: cards + collapsible | Tab 3 Slides 1–3 | 🟡 Medium | Medium | ⬜ |
| **15** | Impact pages: ToC, Reports, Stories | Tab 4 Slides 1–5 | 🟡 Medium | Large | ⬜ |
| **16** | Newsroom pages: News, Blogs, Events, Podcast | Tab 5 Slides 1–5 | 🟡 Medium | Large | ⬜ |
| **17** | FAQs page | Tab 6 | 🟡 Medium | Small | ⬜ |
| **18** | GSAP animation system | G.1–G.6 | 🟢 Enhancement | Large | ⬜ |

---

# Files Manifest

### Files to Modify

| File | Changes |
|---|---|
| `src/app/globals.css` | Brand orange, section bg tokens, global page bg |
| `tailwind.config.ts` | Brand orange color, section bg utilities |
| `src/components/HomePage.tsx` | Section bg colors per rhythm, restructure order (6 slides), swap Hero |
| `src/lib/navigation.ts` | 6 tabs: About Us, Our Work, Our Programmes, Impact, Newsroom, FAQs |
| `src/components/layout/MinimalNavbar.tsx` | Mega-menu dropdowns, GSAP, scroll contrast, active indicator |
| `src/components/sections/ClimateChallenge.tsx` | Dark bg `#1a1f2e`, fix card visibility, env imagery, GSAP |
| `src/components/sections/FoundingBeliefs.tsx` | Warm bg `#faf6f0`, branded card borders, Lucide icons |
| `src/components/sections/WhatWeDo.tsx` | Green tint bg `#f0f9e8`, equal Vision/Mission cards, "Our Strategy" |
| `src/components/sections/HowWeDoIt.tsx` | Green tint bg, gradient accent bars on service cards |
| `src/components/sections/KeySectorsParallax.tsx` | Dark teal bg `#0a2a33`, sector-specific photos, enhanced parallax |
| `src/components/sections/ProgramsShowcase.tsx` | Warm bg `#faf6f0`, card-based with featured images, collapsible sections |
| `src/components/sections/MinimalStatsSection.tsx` | Hero banner, green stats `#80c738`, GSAP counters, map parallax |
| `src/components/sections/AwardsSection.tsx` | Dark green gradient `#1b3a1a→#0f172a`, gold/green card glow |
| `src/components/sections/NewsSection.tsx` | Warm bg `#faf6f0`, branded cards, category pills, "View All" CTA |
| `src/components/sections/PartnersSection.tsx` | Cyan tint bg `#e8f8fd`, GSAP marquee, grayscale→color logos |
| `src/components/sections/HistoryTimeline.tsx` | Fix invisible cards (rgba white → visible styles) |
| `src/components/layout/Footer.tsx` | Dark bg `#1a1f2e`, compact 3-col, newsletter, social, GSAP |
| `src/components/animations/SectionDivider.tsx` | GSAP-morphing SVG transitions |

### New Files to Create

| File | Purpose |
|---|---|
| `src/components/sections/HeroImageCarousel.tsx` | GSAP image slideshow replacing video hero |
| `src/components/animations/PageLoader.tsx` | Brand-colored page loading animation |
| `src/components/animations/MagneticButton.tsx` | GSAP magnetic cursor effect for CTAs |
