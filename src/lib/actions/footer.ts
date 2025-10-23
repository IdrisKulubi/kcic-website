"use server";

import db from "../../../db/drizzle";
import { footerSection, footerLinks, footerSocialMedia } from "../../../db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import {
  footerSectionSchema,
  footerLinkSchema,
  footerSocialMediaSchema,
  reorderFooterLinksSchema,
  reorderFooterSocialMediaSchema,
} from "../validators";

export type FooterSectionData = z.infer<typeof footerSectionSchema>;
export type FooterLinkData = z.infer<typeof footerLinkSchema>;
export type FooterSocialMediaData = z.infer<typeof footerSocialMediaSchema>;

type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Get the current footer section data with links and social media
 */
export async function getFooterSection(): Promise<
  ActionResponse<{
    section: FooterSectionData;
    links: FooterLinkData[];
    socialMedia: FooterSocialMediaData[];
  }>
> {
  try {
    // Fetch footer section
    const section = await db.query.footerSection.findFirst({
      where: eq(footerSection.id, "default"),
    });

    if (!section) {
      return {
        success: false,
        error: "Footer section not found",
      };
    }

    // Fetch footer links
    const links = await db.query.footerLinks.findMany({
      orderBy: [asc(footerLinks.order)],
    });

    // Fetch social media links
    const socialMedia = await db.query.footerSocialMedia.findMany({
      orderBy: [asc(footerSocialMedia.order)],
    });

    const data = {
      section: {
        contactAddress: section.contactAddress,
        contactPhone: section.contactPhone,
        contactEmail: section.contactEmail,
        newsletterTitle: section.newsletterTitle,
        newsletterDescription: section.newsletterDescription,
        newsletterPlaceholder: section.newsletterPlaceholder,
        copyright: section.copyright,
      },
      links: links.map((link) => ({
        id: link.id,
        label: link.label,
        href: link.href,
        order: link.order,
      })),
      socialMedia: socialMedia.map((sm) => ({
        id: sm.id,
        platform: sm.platform,
        href: sm.href,
        icon: sm.icon,
        order: sm.order,
      })),
    };

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching footer section:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch footer section",
    };
  }
}

/**
 * Update the footer section contact and newsletter information
 */
export async function updateFooterSection(
  data: FooterSectionData
): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = footerSectionSchema.parse(data);

    // Update footer section
    await db
      .update(footerSection)
      .set({
        contactAddress: validated.contactAddress,
        contactPhone: validated.contactPhone,
        contactEmail: validated.contactEmail,
        newsletterTitle: validated.newsletterTitle,
        newsletterDescription: validated.newsletterDescription,
        newsletterPlaceholder: validated.newsletterPlaceholder,
        copyright: validated.copyright,
        updatedAt: new Date(),
      })
      .where(eq(footerSection.id, "default"));

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/admin/footer");

    return { success: true };
  } catch (error) {
    console.error("Error updating footer section:", error);

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
          : "Failed to update footer section",
    };
  }
}

/**
 * Create a new footer link
 */
export async function createFooterLink(
  data: Omit<FooterLinkData, "id" | "order">
): Promise<ActionResponse<{ id: string }>> {
  try {
    // Validate input
    const validated = footerLinkSchema.omit({ id: true, order: true }).parse(data);

    // Get the highest order value
    const existingLinks = await db.query.footerLinks.findMany({
      orderBy: [asc(footerLinks.order)],
    });
    const maxOrder = existingLinks.length > 0
      ? Math.max(...existingLinks.map((l) => l.order))
      : -1;

    // Create new link
    const id = `link-${Date.now()}`;
    await db.insert(footerLinks).values({
      id,
      label: validated.label,
      href: validated.href,
      order: maxOrder + 1,
    });

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/admin/footer");

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Error creating footer link:", error);

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
        error instanceof Error ? error.message : "Failed to create footer link",
    };
  }
}

/**
 * Update an existing footer link
 */
export async function updateFooterLink(
  id: string,
  data: Omit<FooterLinkData, "id" | "order">
): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = footerLinkSchema.omit({ id: true, order: true }).parse(data);

    // Update link
    await db
      .update(footerLinks)
      .set({
        label: validated.label,
        href: validated.href,
      })
      .where(eq(footerLinks.id, id));

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/admin/footer");

    return { success: true };
  } catch (error) {
    console.error("Error updating footer link:", error);

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
        error instanceof Error ? error.message : "Failed to update footer link",
    };
  }
}

/**
 * Delete a footer link
 */
export async function deleteFooterLink(id: string): Promise<ActionResponse> {
  try {
    await db.delete(footerLinks).where(eq(footerLinks.id, id));

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/admin/footer");

    return { success: true };
  } catch (error) {
    console.error("Error deleting footer link:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete footer link",
    };
  }
}

/**
 * Reorder footer links
 */
export async function reorderFooterLinks(
  items: { id: string; order: number }[]
): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = reorderFooterLinksSchema.parse({ items });

    // Update order for each link
    await Promise.all(
      validated.items.map((item) =>
        db
          .update(footerLinks)
          .set({ order: item.order })
          .where(eq(footerLinks.id, item.id))
      )
    );

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/admin/footer");

    return { success: true };
  } catch (error) {
    console.error("Error reordering footer links:", error);

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
          : "Failed to reorder footer links",
    };
  }
}

/**
 * Create a new social media link
 */
export async function createFooterSocialMedia(
  data: Omit<FooterSocialMediaData, "id" | "order">
): Promise<ActionResponse<{ id: string }>> {
  try {
    // Validate input
    const validated = footerSocialMediaSchema.omit({ id: true, order: true }).parse(data);

    // Get the highest order value
    const existingSocialMedia = await db.query.footerSocialMedia.findMany({
      orderBy: [asc(footerSocialMedia.order)],
    });
    const maxOrder = existingSocialMedia.length > 0
      ? Math.max(...existingSocialMedia.map((sm) => sm.order))
      : -1;

    // Create new social media link
    const id = `social-${Date.now()}`;
    await db.insert(footerSocialMedia).values({
      id,
      platform: validated.platform,
      href: validated.href,
      icon: validated.icon,
      order: maxOrder + 1,
    });

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/admin/footer");

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Error creating social media link:", error);

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
          : "Failed to create social media link",
    };
  }
}

/**
 * Update an existing social media link
 */
export async function updateFooterSocialMedia(
  id: string,
  data: Omit<FooterSocialMediaData, "id" | "order">
): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = footerSocialMediaSchema.omit({ id: true, order: true }).parse(data);

    // Update social media link
    await db
      .update(footerSocialMedia)
      .set({
        platform: validated.platform,
        href: validated.href,
        icon: validated.icon,
      })
      .where(eq(footerSocialMedia.id, id));

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/admin/footer");

    return { success: true };
  } catch (error) {
    console.error("Error updating social media link:", error);

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
          : "Failed to update social media link",
    };
  }
}

/**
 * Delete a social media link
 */
export async function deleteFooterSocialMedia(
  id: string
): Promise<ActionResponse> {
  try {
    await db.delete(footerSocialMedia).where(eq(footerSocialMedia.id, id));

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/admin/footer");

    return { success: true };
  } catch (error) {
    console.error("Error deleting social media link:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete social media link",
    };
  }
}

/**
 * Reorder social media links
 */
export async function reorderFooterSocialMedia(
  items: { id: string; order: number }[]
): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = reorderFooterSocialMediaSchema.parse({ items });

    // Update order for each social media link
    await Promise.all(
      validated.items.map((item) =>
        db
          .update(footerSocialMedia)
          .set({ order: item.order })
          .where(eq(footerSocialMedia.id, item.id))
      )
    );

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/admin/footer");

    return { success: true };
  } catch (error) {
    console.error("Error reordering social media links:", error);

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
          : "Failed to reorder social media links",
    };
  }
}
