ALTER TABLE "team_members" ADD COLUMN "category" text DEFAULT 'Other' NOT NULL;--> statement-breakpoint
CREATE INDEX "team_members_category_idx" ON "team_members" USING btree ("category");