import { cwd } from "node:process";
import { loadEnvConfig } from "@next/env";

// Load environment variables FIRST
loadEnvConfig(cwd());

// Now import database modules after env is loaded
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
import {
  heroSection,
  heroButtons,
  statistics,
  news,
  partners,
  programmes,
  footerSection,
  footerLinks,
  footerSocialMedia,
  ctaBanner,
} from "./schema";
import { homePageData } from "../src/data/home";
import { newsData } from "../src/data/news";

// Create database connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL!,
});
const db = drizzle(pool, { schema });

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Seed Hero Section
    console.log("Seeding hero section...");
    await db.insert(heroSection).values({
      id: "default",
      headline: homePageData.hero.headline,
      subtext: homePageData.hero.subtext,
      backgroundVideo: homePageData.hero.backgroundVideo,
      updatedAt: new Date(),
    });

    // Seed Hero Buttons
    console.log("Seeding hero buttons...");
    await db.insert(heroButtons).values(
      homePageData.hero.ctaButtons.map((btn, idx) => ({
        id: `hero-btn-${idx}`,
        text: btn.text,
        href: btn.href,
        variant: btn.variant,
        order: idx,
        heroId: "default",
      }))
    );

    // Seed Statistics
    console.log("Seeding statistics...");
    await db.insert(statistics).values(
      homePageData.stats.map((stat, idx) => ({
        id: stat.id,
        label: stat.label,
        value: stat.value,
        suffix: stat.suffix,
        icon: stat.icon,
        order: idx,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Seed News
    console.log("Seeding news...");
    await db.insert(news).values(
      newsData.map((article) => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        content: article.excerpt, // Using excerpt as content for now
        thumbnail: article.imageUrl || "/images/news/placeholder.jpg",
        category: article.category,
        slug: article.slug,
        readTime: article.readTime || "5 min",
        featured: article.featured || false,
        publishedAt: new Date(article.publishedAt),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Seed Partners
    console.log("Seeding partners...");
    await db.insert(partners).values(
      homePageData.partners.map((partner, idx) => ({
        id: partner.id,
        name: partner.name,
        logo: partner.logo,
        website: partner.website,
        order: idx,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Seed Programmes
    console.log("Seeding programmes...");
    await db.insert(programmes).values(
      homePageData.programmes.map((programme, idx) => ({
        id: programme.id,
        title: programme.title,
        description: programme.description,
        image: programme.image,
        href: programme.href,
        color: programme.color,
        order: idx,
        updatedAt: new Date(),
      }))
    );

    // Seed Footer Section
    console.log("Seeding footer section...");
    await db.insert(footerSection).values({
      id: "default",
      contactAddress: homePageData.footer.contact.address,
      contactPhone: homePageData.footer.contact.phone,
      contactEmail: homePageData.footer.contact.email,
      newsletterTitle: homePageData.footer.newsletter.title,
      newsletterDescription: homePageData.footer.newsletter.description,
      newsletterPlaceholder: homePageData.footer.newsletter.placeholder,
      copyright: homePageData.footer.copyright,
      updatedAt: new Date(),
    });

    // Seed Footer Links
    console.log("Seeding footer links...");
    await db.insert(footerLinks).values(
      homePageData.footer.quickLinks.map((link, idx) => ({
        id: `footer-link-${idx}`,
        label: link.label,
        href: link.href,
        order: idx,
      }))
    );

    // Seed Footer Social Media
    console.log("Seeding footer social media...");
    await db.insert(footerSocialMedia).values(
      homePageData.footer.socialMedia.map((social, idx) => ({
        id: `social-${idx}`,
        platform: social.platform,
        href: social.href,
        icon: social.icon,
        order: idx,
      }))
    );

    // Seed CTA Banner
    console.log("Seeding CTA banner...");
    await db.insert(ctaBanner).values({
      id: "default",
      headline: homePageData.ctaBanner.headline,
      subtext: homePageData.ctaBanner.subtext,
      buttonText: homePageData.ctaBanner.ctaButton.text,
      buttonHref: homePageData.ctaBanner.ctaButton.href,
      updatedAt: new Date(),
    });

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seed function
seed()
  .then(async () => {
    console.log("Seed completed. Closing connection...");
    await pool.end();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await pool.end();
    process.exit(1);
  });
