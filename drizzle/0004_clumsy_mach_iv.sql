CREATE TABLE "opportunities" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"type" text NOT NULL,
	"reference_number" text,
	"summary" text NOT NULL,
	"description" text,
	"department" text,
	"location" text,
	"work_mode" text,
	"employment_type" text,
	"requirements" text,
	"qualifications" text,
	"responsibilities" text,
	"application_email" text,
	"application_link" text,
	"application_instructions" text,
	"deadline" timestamp,
	"issued_date" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "opportunities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "opportunity_attachments" (
	"id" text PRIMARY KEY NOT NULL,
	"opportunity_id" text NOT NULL,
	"file_name" text NOT NULL,
	"file_url" text NOT NULL,
	"file_type" text,
	"file_size" integer,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "whistleblower_reports" (
	"id" text PRIMARY KEY NOT NULL,
	"reference_number" text NOT NULL,
	"category" text NOT NULL,
	"subject" text NOT NULL,
	"description" text NOT NULL,
	"incident_date" timestamp,
	"department" text,
	"involved_parties" text,
	"evidence" text,
	"contact_email" text,
	"is_anonymous" boolean DEFAULT true NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"admin_notes" text,
	"reviewed_by" text,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "whistleblower_reports_reference_number_unique" UNIQUE("reference_number")
);
--> statement-breakpoint
ALTER TABLE "programmes" ADD COLUMN "category" text DEFAULT 'flagship' NOT NULL;--> statement-breakpoint
ALTER TABLE "opportunity_attachments" ADD CONSTRAINT "opportunity_attachments_opportunity_id_opportunities_id_fk" FOREIGN KEY ("opportunity_id") REFERENCES "public"."opportunities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "opportunities_slug_idx" ON "opportunities" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "opportunities_type_idx" ON "opportunities" USING btree ("type");--> statement-breakpoint
CREATE INDEX "opportunities_active_idx" ON "opportunities" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "opportunity_attachments_opportunity_idx" ON "opportunity_attachments" USING btree ("opportunity_id");--> statement-breakpoint
CREATE INDEX "opportunity_attachments_order_idx" ON "opportunity_attachments" USING btree ("order");--> statement-breakpoint
CREATE INDEX "whistleblower_status_idx" ON "whistleblower_reports" USING btree ("status");--> statement-breakpoint
CREATE INDEX "whistleblower_category_idx" ON "whistleblower_reports" USING btree ("category");--> statement-breakpoint
CREATE INDEX "whistleblower_created_at_idx" ON "whistleblower_reports" USING btree ("created_at");