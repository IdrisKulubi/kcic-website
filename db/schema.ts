import {
  pgTable,
  index,
  text,
  timestamp,
  boolean,
  integer
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Better Auth tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Legacy admins table (keeping for reference, but Better Auth uses 'user' table)
export const admins = pgTable("admins", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Hero Section table
export const heroSection = pgTable("hero_section", {
  id: text("id").primaryKey().default("default"),
  headline: text("headline").notNull(),
  subtext: text("subtext").notNull(),
  backgroundVideo: text("background_video"),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Hero Buttons table
export const heroButtons = pgTable("hero_buttons", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  href: text("href").notNull(),
  variant: text("variant").notNull(), // 'primary' | 'secondary'
  order: integer("order").notNull(),
  heroId: text("hero_id").references(() => heroSection.id, { onDelete: "cascade" }).notNull()
}, (table) => ({
  orderIdx: index("hero_buttons_order_idx").on(table.order)
}));

// Statistics table
export const statistics = pgTable("statistics", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  value: integer("value").notNull(),
  suffix: text("suffix"),
  icon: text("icon").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => ({
  orderIdx: index("statistics_order_idx").on(table.order)
}));

// News table
export const news = pgTable("news", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content"),
  thumbnail: text("thumbnail").notNull(),
  category: text("category").notNull(),
  slug: text("slug").notNull().unique(),
  readTime: text("read_time"),
  featured: boolean("featured").default(false).notNull(),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => ({
  slugIdx: index("news_slug_idx").on(table.slug),
  publishedAtIdx: index("news_published_at_idx").on(table.publishedAt)
}));

// Team Members table
export const teamMembers = pgTable("team_members", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  category: text("category").notNull().default('Other'),
  bio: text("bio"),
  photo: text("photo").notNull(),
  email: text("email"),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => ({
  orderIdx: index("team_members_order_idx").on(table.order),
  categoryIdx: index("team_members_category_idx").on(table.category)
}));

// Partners table
export const partners = pgTable("partners", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  website: text("website"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => ({
  orderIdx: index("partners_order_idx").on(table.order)
}));

// Programmes table - expanded for full programme pages
export const programmes = pgTable("programmes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  headerImage: text("header_image"),
  color: text("color").notNull(),
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(false).notNull(),
  applicationLink: text("application_link"),
  // Rich text content sections (stored as HTML)
  introduction: text("introduction"),
  applicationProcess: text("application_process"),
  criteria: text("criteria"),
  eligibility: text("eligibility"),
  applicationSelection: text("application_selection"),
  technicalSupport: text("technical_support"),
  definitions: text("definitions"),
  terms: text("terms"),
  scoringSystem: text("scoring_system"),
  fraudPolicy: text("fraud_policy"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => ({
  orderIdx: index("programmes_order_idx").on(table.order),
  slugIdx: index("programmes_slug_idx").on(table.slug)
}));

// Programme Sponsors table
export const programmeSponsors = pgTable("programme_sponsors", {
  id: text("id").primaryKey(),
  programmeId: text("programme_id").references(() => programmes.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) => ({
  programmeIdx: index("programme_sponsors_programme_idx").on(table.programmeId),
  orderIdx: index("programme_sponsors_order_idx").on(table.order)
}));

// Footer Section table
export const footerSection = pgTable("footer_section", {
  id: text("id").primaryKey().default("default"),
  contactAddress: text("contact_address").notNull(),
  contactPhone: text("contact_phone").notNull(),
  contactEmail: text("contact_email").notNull(),
  newsletterTitle: text("newsletter_title").notNull(),
  newsletterDescription: text("newsletter_description").notNull(),
  newsletterPlaceholder: text("newsletter_placeholder").notNull(),
  copyright: text("copyright").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Footer Links table
export const footerLinks = pgTable("footer_links", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  order: integer("order").notNull()
}, (table) => ({
  orderIdx: index("footer_links_order_idx").on(table.order)
}));

// Footer Social Media table
export const footerSocialMedia = pgTable("footer_social_media", {
  id: text("id").primaryKey(),
  platform: text("platform").notNull(),
  href: text("href").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull()
}, (table) => ({
  orderIdx: index("footer_social_media_order_idx").on(table.order)
}));

// CTA Banner table
export const ctaBanner = pgTable("cta_banner", {
  id: text("id").primaryKey().default("default"),
  headline: text("headline").notNull(),
  subtext: text("subtext"),
  buttonText: text("button_text").notNull(),
  buttonHref: text("button_href").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Relations
export const heroSectionRelations = relations(heroSection, ({ many }) => ({
  buttons: many(heroButtons)
}));

export const heroButtonsRelations = relations(heroButtons, ({ one }) => ({
  hero: one(heroSection, {
    fields: [heroButtons.heroId],
    references: [heroSection.id]
  })
}));

// Programme relations
export const programmesRelations = relations(programmes, ({ many }) => ({
  sponsors: many(programmeSponsors)
}));

export const programmeSponsorsRelations = relations(programmeSponsors, ({ one }) => ({
  programme: one(programmes, {
    fields: [programmeSponsors.programmeId],
    references: [programmes.id]
  })
}));

// Opportunities table - supports jobs, consulting, RFPs, tenders
export const opportunities = pgTable("opportunities", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(), // 'job' | 'consulting' | 'rfp' | 'tender'
  referenceNumber: text("reference_number"), // e.g., "RFP: KCIC/2025/202"

  // Core content
  summary: text("summary").notNull(), // Short description for cards
  description: text("description"), // Rich HTML content - full details

  // Categorization
  department: text("department"), // e.g., "Programs", "Finance", "Operations"
  location: text("location"), // e.g., "Nairobi, Kenya", "Remote"
  workMode: text("work_mode"), // 'remote' | 'onsite' | 'hybrid'
  employmentType: text("employment_type"), // 'full-time' | 'part-time' | 'contract' | 'consultancy'

  // Requirements sections (Rich HTML)
  requirements: text("requirements"),
  qualifications: text("qualifications"),
  responsibilities: text("responsibilities"),

  // Application details - either link or email (or both)
  applicationEmail: text("application_email"),
  applicationLink: text("application_link"),
  applicationInstructions: text("application_instructions"), // Rich HTML

  // Dates
  deadline: timestamp("deadline"),
  issuedDate: timestamp("issued_date"),

  // Status
  isActive: boolean("is_active").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  slugIdx: index("opportunities_slug_idx").on(table.slug),
  typeIdx: index("opportunities_type_idx").on(table.type),
  activeIdx: index("opportunities_active_idx").on(table.isActive),
}));

// Attachments for opportunities (RFP docs, ToRs, etc.)
export const opportunityAttachments = pgTable("opportunity_attachments", {
  id: text("id").primaryKey(),
  opportunityId: text("opportunity_id").references(() => opportunities.id, { onDelete: "cascade" }).notNull(),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type"), // 'pdf' | 'doc' | 'docx'
  fileSize: integer("file_size"), // in bytes
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  opportunityIdx: index("opportunity_attachments_opportunity_idx").on(table.opportunityId),
  orderIdx: index("opportunity_attachments_order_idx").on(table.order),
}));

// Opportunity relations
export const opportunitiesRelations = relations(opportunities, ({ many }) => ({
  attachments: many(opportunityAttachments)
}));

export const opportunityAttachmentsRelations = relations(opportunityAttachments, ({ one }) => ({
  opportunity: one(opportunities, {
    fields: [opportunityAttachments.opportunityId],
    references: [opportunities.id]
  })
}));

// Whistleblower Reports table
export const whistleblowerReports = pgTable("whistleblower_reports", {
  id: text("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(), // e.g., WB-2024001

  // Report details
  category: text("category").notNull(), // 'fraud' | 'misconduct' | 'safety' | 'harassment' | 'corruption' | 'other'
  subject: text("subject").notNull(),
  description: text("description").notNull(),

  // Optional context
  incidentDate: timestamp("incident_date"),
  department: text("department"),
  involvedParties: text("involved_parties"), // Names/descriptions of people involved
  evidence: text("evidence"), // Any supporting information or file references

  // Contact (optional for anonymous reports)
  contactEmail: text("contact_email"),
  isAnonymous: boolean("is_anonymous").default(true).notNull(),

  // Status management
  status: text("status").default("new").notNull(), // 'new' | 'reviewing' | 'investigating' | 'resolved' | 'dismissed'
  adminNotes: text("admin_notes"),
  reviewedBy: text("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  statusIdx: index("whistleblower_status_idx").on(table.status),
  categoryIdx: index("whistleblower_category_idx").on(table.category),
  createdAtIdx: index("whistleblower_created_at_idx").on(table.createdAt),
}));
