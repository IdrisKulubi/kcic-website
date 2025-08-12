# KCIC Landing Page – Requirements

## Purpose
The landing page is the first point of contact for visitors.  
It should quickly communicate:
- Who KCIC is
- What they do
- Key impact stats
- Current news/events
- How to get involved

It must be **fast**, **mobile-friendly**, **accessible**, and **SEO optimized**.

---

## Sections

### 1. **Header / Navigation**
- Logo (top-left, clickable → home)
- Menu items:
  - About
  - Programmes
  - Media Centre
  - Clients Centre
  - Join Our Programs
  - Contacts
- "Apply Now" button (highlighted)
- Mobile: collapsible hamburger menu

---

### 2. **Hero Section**
- Full-width image or background video
- Text overlay:
  - Headline: *"Empowering Climate Innovation in Kenya"*
  - Subtext: 1–2 sentence description of KCIC
  - CTA buttons: "Join Our Programs" + "Learn More"
- Optional: fade-in animation

---

### 3. **Impact Stats**
- 3–4 key figures with icons:
  - Jobs Created
  - SMEs Supported
  - Climate Solutions Implemented
  - Investment Mobilized
- Animated counter effect when in view

---

### 4. **Programmes Overview**
- 3 cards (KCIC, Agribiz, KCV)
- Each card:
  - Title
  - Short description
  - Image/icon
  - "Learn More" link

---

### 5. **Latest News**
- Section title: "Latest Updates"
- 3 recent news articles:
  - Thumbnail
  - Title
  - Short excerpt
  - "Read More" link
- "View All News" button

---

### 6. **Partners & Donors**
- Grid or horizontal carousel of partner logos
- Optional hover tooltip with partner name

---

### 7. **Call-to-Action Banner**
- Background image with overlay color
- Text: "Join us in building a sustainable future."
- Button: "Apply Now"

---

### 8. **Footer**
- Quick links (About, Programmes, News, Contact)
- Social media icons
- Contact info
- Newsletter signup form
- Copyright notice

---

## Technical Requirements
- Built in **Next.js 14 (App Router)** + **Tailwind CSS**
- Responsive (mobile-first)
- Accessibility (WCAG 2.1 AA)
- Optimized images (Next.js `<Image />`)
- SEO-ready (title, meta description, Open Graph)
- Minimal animations (Framer Motion or Tailwind transitions)
- All content hardcoded for now (later connected to DB)

---

## Deliverables
- `app/page.tsx` → Home page layout
- Components:
  - `Navbar`
  - `HeroSection`
  - `StatsSection`
  - `ProgrammesSection`
  - `LatestNewsSection`
  - `PartnersSection`
  - `CTABanner`
  - `Footer`
- Static placeholder data in `data/home.ts`
- Fully styled and deployed on Vercel (staging)

---
