import { HeroSection, StatsSection, ProgrammesSection, LatestNewsSection, PartnersSection, CTABanner } from "@/components/sections";
import { Footer } from "@/components/layout";
import { ScrollReveal } from "@/components/animations";
import { homePageData } from "@/data/home";
import { landmarkUtils } from "@/lib/accessibility";
import { LazySection } from "@/components/ui/dynamic-loader";
import { Metadata } from "next";

// Enhanced metadata for homepage
export const metadata: Metadata = {
  title: "Empowering Climate Innovation in Kenya",
  description: "Join KCIC in accelerating green growth through innovative climate solutions. We support SMEs, create jobs, and build a sustainable future for Kenya with 2500+ jobs created and $25M investment mobilized.",
  keywords: [
    "climate innovation Kenya",
    "green entrepreneurship",
    "sustainable development Kenya",
    "climate solutions Africa",
    "environmental technology",
    "renewable energy Kenya",
    "climate finance",
    "green startups",
    "sustainability programs"
  ],
  openGraph: {
    title: "Empowering Climate Innovation in Kenya | KCIC",
    description: "Join KCIC in accelerating green growth through innovative climate solutions. 2500+ jobs created, 450+ SMEs supported, $25M investment mobilized.",
    images: [
      {
        url: "/images/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "KCIC - Empowering Climate Innovation in Kenya",
      },
    ],
  },
  twitter: {
    title: "Empowering Climate Innovation in Kenya | KCIC",
    description: "Join KCIC in accelerating green growth through innovative climate solutions. 2500+ jobs created, 450+ SMEs supported, $25M investment mobilized.",
    images: ["/images/twitter-homepage.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Empowering Climate Innovation in Kenya",
            "description": "Join KCIC in accelerating green growth through innovative climate solutions. We support SMEs, create jobs, and build a sustainable future for Kenya.",
            "url": "https://kenyacic.org",
            "mainEntity": {
              "@type": "Organization",
              "name": "Kenya Climate Innovation Centre",
              "description": "Empowering Climate Innovation in Kenya",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Climate Innovation Programs",
                "itemListElement": homePageData.programmes.map((programme, index) => ({
                  "@type": "Offer",
                  "name": programme.title,
                  "description": programme.description,
                  "url": `https://kenyacic.org${programme.href}`,
                  "position": index + 1
                }))
              }
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Climate Innovation"
              },
              {
                "@type": "Thing", 
                "name": "Sustainability"
              },
              {
                "@type": "Thing",
                "name": "Green Technology"
              }
            ],
            "mentions": homePageData.stats.map(stat => ({
              "@type": "QuantitativeValue",
              "name": stat.label,
              "value": stat.value,
              "unitText": stat.suffix || ""
            }))
          })
        }}
      />
      
      {/* Structured Data for News Articles */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Latest Climate Innovation News",
            "itemListElement": homePageData.news.map((article, index) => ({
              "@type": "NewsArticle",
              "position": index + 1,
              "headline": article.title,
              "description": article.excerpt,
              "url": `https://kenyacic.org${article.href}`,
              "datePublished": article.publishedAt,
              "author": {
                "@type": "Organization",
                "name": "Kenya Climate Innovation Centre"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Kenya Climate Innovation Centre",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://kenyacic.org/images/logo.png"
                }
              },
              "image": `https://kenyacic.org${article.thumbnail}`
            }))
          })
        }}
      />
      {/* Main page content with proper spacing and background effects */}
      <main className="relative min-h-screen">
        {/* Background gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-climate-green/5 via-transparent to-climate-blue/5 pointer-events-none" />
        
        {/* Hero Section with split-screen layout and animations */}
        <section 
          {...landmarkUtils.getRegionProps('Hero section')}
          aria-labelledby="hero-heading"
          className="relative overflow-hidden"
        >
          <HeroSection data={homePageData.hero} />
        </section>

        {/* Impact Statistics Section with scroll-based animations */}
        <ScrollReveal direction="up" threshold={0.2} className="relative">
          <div className="relative">
            {/* Section background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/50" />
            <StatsSection stats={homePageData.stats} className="relative z-10" />
          </div>
        </ScrollReveal>

        

        {/* Latest News Section with horizontal scrolling and reveal animation */}
        <ScrollReveal direction="left" threshold={0.1} delay={0.1}>
          <LazySection className="news-section relative">
            <div className="relative py-8 sm:py-12">
              {/* Section background */}
              <div className="absolute inset-0 bg-gradient-to-l from-climate-yellow/5 to-transparent" />
              <section 
                {...landmarkUtils.getRegionProps('Latest news')}
                aria-labelledby="news-heading"
                className="relative z-10"
              >
                <LatestNewsSection news={homePageData.news} />
              </section>
            </div>
          </LazySection>
        </ScrollReveal>

        {/* Partners Section with auto-scrolling marquee and fade-in animation */}
        <ScrollReveal direction="up" threshold={0.2} delay={0.3}>
          <LazySection className="partners-section relative">
            <div className="relative py-8 sm:py-12">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50" />
              <section 
                {...landmarkUtils.getRegionProps('Our partners')}
                aria-labelledby="partners-heading"
                className="relative z-10"
              >
                <PartnersSection partners={homePageData.partners} />
              </section>
            </div>
          </LazySection>
        </ScrollReveal>

        {/* CTA Banner with gradient background and dramatic entrance */}
        <ScrollReveal direction="up" threshold={0.3} delay={0.2}>
          <LazySection className="cta-section relative">
            <div className="relative py-8 sm:py-12">
              {/* Dramatic background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-climate-green/20 via-climate-blue/20 to-climate-yellow/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              <section 
                {...landmarkUtils.getRegionProps('Call to action')}
                aria-labelledby="cta-heading"
                className="relative z-10"
              >
                <CTABanner data={homePageData.ctaBanner} />
              </section>
            </div>
          </LazySection>
        </ScrollReveal>

        {/* Footer with interactive elements and final reveal */}
        <ScrollReveal direction="up" threshold={0.1} delay={0.1}>
          <div className="relative">
            {/* Footer background transition */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-800" />
            <footer {...landmarkUtils.getContentInfoProps()} className="relative z-10">
              <Footer data={homePageData.footer} />
            </footer>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}