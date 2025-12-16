'use server'

import db from '../../../db/drizzle';
import { programmes, programmeSponsors } from '../../../db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq, asc } from 'drizzle-orm';

// Types for the expanded programme data
export type ProgrammeData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  headerImage: string | null;
  color: string;
  order: number;
  isActive: boolean;
  applicationLink: string | null;
  introduction: string | null;
  applicationProcess: string | null;
  criteria: string | null;
  eligibility: string | null;
  applicationSelection: string | null;
  technicalSupport: string | null;
  definitions: string | null;
  terms: string | null;
  scoringSystem: string | null;
  fraudPolicy: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProgrammeSponsorData = {
  id: string;
  programmeId: string;
  name: string;
  logo: string;
  order: number;
};

export type ProgrammeWithSponsors = ProgrammeData & {
  sponsors: ProgrammeSponsorData[];
};

type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

// Validation schemas
const programmeInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  headerImage: z.string().nullable().optional(),
  color: z.string().min(1, "Color is required"),
  order: z.number().int().min(0),
  isActive: z.boolean().default(false),
  applicationLink: z.string().nullable().optional(),
  introduction: z.string().nullable().optional(),
  applicationProcess: z.string().nullable().optional(),
  criteria: z.string().nullable().optional(),
  eligibility: z.string().nullable().optional(),
  applicationSelection: z.string().nullable().optional(),
  technicalSupport: z.string().nullable().optional(),
  definitions: z.string().nullable().optional(),
  terms: z.string().nullable().optional(),
  scoringSystem: z.string().nullable().optional(),
  fraudPolicy: z.string().nullable().optional(),
});

/**
 * Get all programmes ordered by their order field
 */
export async function listProgrammes(): Promise<ActionResponse<ProgrammeData[]>> {
  try {
    const programmesList = await db.query.programmes.findMany({
      orderBy: [asc(programmes.order)]
    });

    return {
      success: true,
      data: programmesList as ProgrammeData[]
    };
  } catch (error) {
    console.error('Error fetching programmes:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch programmes'
    };
  }
}

/**
 * Get a single programme by ID with sponsors
 */
export async function getProgramme(id: string): Promise<ActionResponse<ProgrammeWithSponsors>> {
  try {
    const programme = await db.query.programmes.findFirst({
      where: eq(programmes.id, id)
    });

    if (!programme) {
      return {
        success: false,
        error: 'Programme not found'
      };
    }

    const sponsors = await db.query.programmeSponsors.findMany({
      where: eq(programmeSponsors.programmeId, id),
      orderBy: [asc(programmeSponsors.order)]
    });

    return {
      success: true,
      data: {
        ...(programme as ProgrammeData),
        sponsors: sponsors as ProgrammeSponsorData[]
      }
    };
  } catch (error) {
    console.error('Error fetching programme:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch programme'
    };
  }
}

/**
 * Get a single programme by slug with sponsors
 */
export async function getProgrammeBySlug(slug: string): Promise<ActionResponse<ProgrammeWithSponsors>> {
  try {
    const programme = await db.query.programmes.findFirst({
      where: eq(programmes.slug, slug)
    });

    if (!programme) {
      return {
        success: false,
        error: 'Programme not found'
      };
    }

    const sponsors = await db.query.programmeSponsors.findMany({
      where: eq(programmeSponsors.programmeId, programme.id),
      orderBy: [asc(programmeSponsors.order)]
    });

    return {
      success: true,
      data: {
        ...(programme as ProgrammeData),
        sponsors: sponsors as ProgrammeSponsorData[]
      }
    };
  } catch (error) {
    console.error('Error fetching programme by slug:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch programme'
    };
  }
}

/**
 * Create a new programme
 */
export async function createProgramme(data: z.infer<typeof programmeInputSchema>): Promise<ActionResponse<{ id: string }>> {
  try {
    const validated = programmeInputSchema.parse(data);
    const id = crypto.randomUUID();

    await db.insert(programmes).values({
      id,
      ...validated,
      headerImage: validated.headerImage ?? null,
      applicationLink: validated.applicationLink ?? null,
      introduction: validated.introduction ?? null,
      applicationProcess: validated.applicationProcess ?? null,
      criteria: validated.criteria ?? null,
      eligibility: validated.eligibility ?? null,
      applicationSelection: validated.applicationSelection ?? null,
      technicalSupport: validated.technicalSupport ?? null,
      definitions: validated.definitions ?? null,
      terms: validated.terms ?? null,
      scoringSystem: validated.scoringSystem ?? null,
      fraudPolicy: validated.fraudPolicy ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    revalidatePath('/');
    revalidatePath('/how-we-work/programmes');
    revalidatePath('/admin/programmes');

    return { success: true, data: { id } };
  } catch (error) {
    console.error('Error creating programme:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create programme'
    };
  }
}

/**
 * Update an existing programme
 */
export async function updateProgramme(id: string, data: Partial<z.infer<typeof programmeInputSchema>>): Promise<ActionResponse> {
  try {
    const existing = await db.query.programmes.findFirst({
      where: eq(programmes.id, id)
    });

    if (!existing) {
      return {
        success: false,
        error: 'Programme not found'
      };
    }

    await db.update(programmes)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(programmes.id, id));

    revalidatePath('/');
    revalidatePath('/how-we-work/programmes');
    revalidatePath(`/how-we-work/programmes/${existing.slug}`);
    revalidatePath('/admin/programmes');

    return { success: true };
  } catch (error) {
    console.error('Error updating programme:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update programme'
    };
  }
}

/**
 * Delete a programme
 */
export async function deleteProgramme(id: string): Promise<ActionResponse> {
  try {
    const existing = await db.query.programmes.findFirst({
      where: eq(programmes.id, id)
    });

    if (!existing) {
      return {
        success: false,
        error: 'Programme not found'
      };
    }

    await db.delete(programmes).where(eq(programmes.id, id));

    revalidatePath('/');
    revalidatePath('/how-we-work/programmes');
    revalidatePath('/admin/programmes');

    return { success: true };
  } catch (error) {
    console.error('Error deleting programme:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete programme'
    };
  }
}

// ============= SPONSOR ACTIONS =============

/**
 * Add a sponsor to a programme
 */
export async function addProgrammeSponsor(
  programmeId: string,
  data: { name: string; logo: string; order: number }
): Promise<ActionResponse<{ id: string }>> {
  try {
    const id = crypto.randomUUID();

    await db.insert(programmeSponsors).values({
      id,
      programmeId,
      name: data.name,
      logo: data.logo,
      order: data.order,
      createdAt: new Date()
    });

    revalidatePath('/admin/programmes');

    return { success: true, data: { id } };
  } catch (error) {
    console.error('Error adding sponsor:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add sponsor'
    };
  }
}

/**
 * Remove a sponsor from a programme
 */
export async function removeProgrammeSponsor(sponsorId: string): Promise<ActionResponse> {
  try {
    await db.delete(programmeSponsors).where(eq(programmeSponsors.id, sponsorId));

    revalidatePath('/admin/programmes');

    return { success: true };
  } catch (error) {
    console.error('Error removing sponsor:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove sponsor'
    };
  }
}

/**
 * Get sponsors for a programme
 */
export async function getProgrammeSponsors(programmeId: string): Promise<ActionResponse<ProgrammeSponsorData[]>> {
  try {
    const sponsors = await db.query.programmeSponsors.findMany({
      where: eq(programmeSponsors.programmeId, programmeId),
      orderBy: [asc(programmeSponsors.order)]
    });

    return {
      success: true,
      data: sponsors as ProgrammeSponsorData[]
    };
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch sponsors'
    };
  }
}
