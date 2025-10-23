"use server";

import db from "../../../db/drizzle";
import { heroSection, heroButtons } from "../../../db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { heroSchema } from "../validators";

// Validation schema for hero section

export type HeroSectionData = z.infer<typeof heroSchema>;

type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Get the current hero section data with buttons
 */
export async function getHeroSection(): Promise<
  ActionResponse<HeroSectionData>
> {
  try {
    // Fetch hero section
    const hero = await db.query.heroSection.findFirst({
      where: eq(heroSection.id, "default"),
      with: {
        buttons: {
          orderBy: (buttons, { asc }) => [asc(buttons.order)],
        },
      },
    });

    if (!hero) {
      return {
        success: false,
        error: "Hero section not found",
      };
    }

    // Transform to match the expected format
    const data: HeroSectionData = {
      headline: hero.headline,
      subtext: hero.subtext,
      backgroundVideo: hero.backgroundVideo || "",
      buttons: hero.buttons.map((btn) => ({
        text: btn.text,
        href: btn.href,
        variant: btn.variant as "primary" | "secondary",
      })),
    };

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch hero section",
    };
  }
}

/**
 * Update the hero section with new data
 */
export async function updateHeroSection(
  data: HeroSectionData
): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = heroSchema.parse(data);

    // Update hero section
    await db
      .update(heroSection)
      .set({
        headline: validated.headline,
        subtext: validated.subtext,
        backgroundVideo: validated.backgroundVideo || null,
        updatedAt: new Date(),
      })
      .where(eq(heroSection.id, "default"));

    // Delete existing buttons
    await db.delete(heroButtons).where(eq(heroButtons.heroId, "default"));

    // Insert new buttons
    if (validated.buttons.length > 0) {
      await db.insert(heroButtons).values(
        validated.buttons.map((btn, idx) => ({
          id: `btn-${Date.now()}-${idx}`,
          text: btn.text,
          href: btn.href,
          variant: btn.variant,
          order: idx,
          heroId: "default",
        }))
      );
    }

    // Revalidate homepage and admin page
    revalidatePath("/");
    revalidatePath("/admin/hero");

    return { success: true };
  } catch (error) {
    console.error("Error updating hero section:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", "),
      };
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update hero section",
    };
  }
}
