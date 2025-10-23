CREATE TABLE "admins" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "cta_banner" (
	"id" text PRIMARY KEY DEFAULT 'default' NOT NULL,
	"headline" text NOT NULL,
	"subtext" text,
	"button_text" text NOT NULL,
	"button_href" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer_links" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"href" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer_section" (
	"id" text PRIMARY KEY DEFAULT 'default' NOT NULL,
	"contact_address" text NOT NULL,
	"contact_phone" text NOT NULL,
	"contact_email" text NOT NULL,
	"newsletter_title" text NOT NULL,
	"newsletter_description" text NOT NULL,
	"newsletter_placeholder" text NOT NULL,
	"copyright" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer_social_media" (
	"id" text PRIMARY KEY NOT NULL,
	"platform" text NOT NULL,
	"href" text NOT NULL,
	"icon" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_buttons" (
	"id" text PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"href" text NOT NULL,
	"variant" text NOT NULL,
	"order" integer NOT NULL,
	"hero_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_section" (
	"id" text PRIMARY KEY DEFAULT 'default' NOT NULL,
	"headline" text NOT NULL,
	"subtext" text NOT NULL,
	"background_video" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"content" text,
	"thumbnail" text NOT NULL,
	"category" text NOT NULL,
	"slug" text NOT NULL,
	"read_time" text,
	"featured" boolean DEFAULT false NOT NULL,
	"published_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "news_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"website" text,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programmes" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"href" text NOT NULL,
	"color" text NOT NULL,
	"order" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "statistics" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"value" integer NOT NULL,
	"suffix" text,
	"icon" text NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"bio" text,
	"photo" text NOT NULL,
	"email" text,
	"linkedin" text,
	"twitter" text,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hero_buttons" ADD CONSTRAINT "hero_buttons_hero_id_hero_section_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."hero_section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "footer_links_order_idx" ON "footer_links" USING btree ("order");--> statement-breakpoint
CREATE INDEX "footer_social_media_order_idx" ON "footer_social_media" USING btree ("order");--> statement-breakpoint
CREATE INDEX "hero_buttons_order_idx" ON "hero_buttons" USING btree ("order");--> statement-breakpoint
CREATE INDEX "news_slug_idx" ON "news" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "news_published_at_idx" ON "news" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "partners_order_idx" ON "partners" USING btree ("order");--> statement-breakpoint
CREATE INDEX "programmes_order_idx" ON "programmes" USING btree ("order");--> statement-breakpoint
CREATE INDEX "statistics_order_idx" ON "statistics" USING btree ("order");--> statement-breakpoint
CREATE INDEX "team_members_order_idx" ON "team_members" USING btree ("order");