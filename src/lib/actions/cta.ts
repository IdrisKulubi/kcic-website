"use server";

import db from "../../../db/drizzle";
import { ctaBanner } from "../../../db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { ctaBannerSchema } from "../validators";

export type CTABannerData = z.infer<typeof ctaBannerSchema>;

type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Get the current CTA banner data
 */
export async function getCTABanner(): Promise<ActionResponse<CTABannerData>> {
  try {
    // Fetch CTA banner
    const banner = await db.query.ctaBanner.findFirst({
      where: eq(ctaBanner.id, "default"),
    });

    if (!banner) {
      return {
        success: false,
        error: "CTA banner not found",
      };
    }

    // Transform to match the expected format
    const data: CTABannerData = {
      headline: banner.headline,
      subtext: banner.subtext || "",
      buttonText: banner.buttonText,
      buttonHref: banner.buttonHref,
    };

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching CTA banner:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch CTA banner",
    };
  }
}

/**
 * Update the CTA banner with new data
 */
export async function updateCTABanner(
  data: CTABannerData
): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = ctaBannerSchema.parse(data);

    // Update CTA banner
    await db
      .update(ctaBanner)
      .set({
        headline: validated.headline,
        subtext: validated.subtext || null,
        buttonText: validated.buttonText,
        buttonHref: validated.buttonHref,
        updatedAt: new Date(),
      })
      .where(eq(ctaBanner.id, "default"));

    // Revalidate homepage and admin page
    revalidatePath("/");
    revalidatePath("/admin/cta");

    return { success: true };
  } catch (error) {
    console.error("Error updating CTA banner:", error);

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
        error instanceof Error ? error.message : "Failed to update CTA banner",
    };
  }
}
