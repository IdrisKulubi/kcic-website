'use server'

import db from '../../../db/drizzle';
import { programmes } from '../../../db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq, asc } from 'drizzle-orm';
import { programmeSchema } from '../validators';

export type ProgrammeData = z.infer<typeof programmeSchema>;

type ActionResponse<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Get all programmes ordered by their order field
 */
export async function listProgrammes(): Promise<ActionResponse<ProgrammeData[]>> {
  try {
    const programmesList = await db.query.programmes.findMany({
      orderBy: [asc(programmes.order)]
    });

    const data: ProgrammeData[] = programmesList.map(programme => ({
      id: programme.id,
      title: programme.title,
      description: programme.description,
      image: programme.image,
      href: programme.href,
      color: programme.color,
      order: programme.order
    }));

    return {
      success: true,
      data
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
 * Get a single programme by ID
 */
export async function getProgramme(id: string): Promise<ActionResponse<ProgrammeData>> {
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

    const data: ProgrammeData = {
      id: programme.id,
      title: programme.title,
      description: programme.description,
      image: programme.image,
      href: programme.href,
      color: programme.color,
      order: programme.order
    };

    return {
      success: true,
      data
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
 * Update an existing programme
 * Note: Programmes are fixed (KCIC, Agribiz, KCV), only content updates allowed
 */
export async function updateProgramme(id: string, data: Omit<ProgrammeData, 'id' | 'order'>): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = programmeSchema.omit({ id: true, order: true }).parse(data);
    
    // Check if programme exists
    const existing = await db.query.programmes.findFirst({
      where: eq(programmes.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'Programme not found'
      };
    }
    
    // Update programme
    await db.update(programmes)
      .set({
        title: validated.title,
        description: validated.description,
        image: validated.image,
        href: validated.href,
        color: validated.color,
        updatedAt: new Date()
      })
      .where(eq(programmes.id, id));
    
    // Revalidate pages
    revalidatePath('/');
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
