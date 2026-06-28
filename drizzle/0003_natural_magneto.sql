CREATE TABLE "programme_sponsors" (
	"id" text PRIMARY KEY NOT NULL,
	"programme_id" text NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "header_image" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "is_active" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "application_link" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "introduction" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "application_process" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "criteria" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "eligibility" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "application_selection" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "technical_support" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "definitions" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "terms" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "scoring_system" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "fraud_policy" text;--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "programme_sponsors" ADD CONSTRAINT "programme_sponsors_programme_id_programmes_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "programme_sponsors_programme_idx" ON "programme_sponsors" USING btree ("programme_id");--> statement-breakpoint
CREATE INDEX "programme_sponsors_order_idx" ON "programme_sponsors" USING btree ("order");--> statement-breakpoint
CREATE INDEX "programmes_slug_idx" ON "programmes" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "programmes" DROP COLUMN "href";--> statement-breakpoint
ALTER TABLE "programmes" ADD CONSTRAINT "programmes_slug_unique" UNIQUE("slug");