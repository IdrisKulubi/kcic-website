'use server'

import db from '../../../db/drizzle';
import { partners } from '../../../db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq, asc } from 'drizzle-orm';
import { partnerSchema, reorderPartnersSchema } from '../validators';

export type PartnerData = z.infer<typeof partnerSchema>;
export type ReorderPartnersData = z.infer<typeof reorderPartnersSchema>;

type ActionResponse<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Get all partners ordered by their order field
 */
export async function listPartners(): Promise<ActionResponse<PartnerData[]>> {
  try {
    const partnersList = await db.query.partners.findMany({
      orderBy: [asc(partners.order)]
    });

    const data: PartnerData[] = partnersList.map(partner => ({
      id: partner.id,
      name: partner.name,
      logo: partner.logo,
      website: partner.website || '',
      order: partner.order
    }));

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching partners:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch partners'
    };
  }
}

/**
 * Get a single partner by ID
 */
export async function getPartner(id: string): Promise<ActionResponse<PartnerData>> {
  try {
    const partner = await db.query.partners.findFirst({
      where: eq(partners.id, id)
    });

    if (!partner) {
      return {
        success: false,
        error: 'Partner not found'
      };
    }

    const data: PartnerData = {
      id: partner.id,
      name: partner.name,
      logo: partner.logo,
      website: partner.website || '',
      order: partner.order
    };

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching partner:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch partner'
    };
  }
}

/**
 * Create a new partner
 */
export async function createPartner(data: Omit<PartnerData, 'id' | 'order'>): Promise<ActionResponse<string>> {
  try {
    // Validate input
    const validated = partnerSchema.omit({ id: true, order: true }).parse(data);
    
    // Get the highest order value to append new partner at the end
    const existingPartners = await db.query.partners.findMany({
      orderBy: [asc(partners.order)]
    });
    
    const nextOrder = existingPartners.length > 0 
      ? Math.max(...existingPartners.map(p => p.order)) + 1 
      : 0;
    
    // Generate unique ID
    const id = `partner-${Date.now()}`;
    
    // Insert new partner
    await db.insert(partners).values({
      id,
      name: validated.name,
      logo: validated.logo,
      website: validated.website || null,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/partners');
    
    return { 
      success: true,
      data: id
    };
  } catch (error) {
    console.error('Error creating partner:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create partner'
    };
  }
}

/**
 * Update an existing partner
 */
export async function updatePartner(id: string, data: Omit<PartnerData, 'id' | 'order'>): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = partnerSchema.omit({ id: true, order: true }).parse(data);
    
    // Check if partner exists
    const existing = await db.query.partners.findFirst({
      where: eq(partners.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'Partner not found'
      };
    }
    
    // Update partner
    await db.update(partners)
      .set({
        name: validated.name,
        logo: validated.logo,
        website: validated.website || null,
        updatedAt: new Date()
      })
      .where(eq(partners.id, id));
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/partners');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating partner:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update partner'
    };
  }
}

/**
 * Delete a partner
 */
export async function deletePartner(id: string): Promise<ActionResponse> {
  try {
    // Check if partner exists
    const existing = await db.query.partners.findFirst({
      where: eq(partners.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'Partner not found'
      };
    }
    
    // Delete the partner
    await db.delete(partners)
      .where(eq(partners.id, id));
    
    // Reorder remaining partners to fill the gap
    const remainingPartners = await db.query.partners.findMany({
      orderBy: [asc(partners.order)]
    });
    
    // Update order for remaining items
    for (let i = 0; i < remainingPartners.length; i++) {
      await db.update(partners)
        .set({ order: i })
        .where(eq(partners.id, remainingPartners[i].id));
    }
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/partners');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting partner:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete partner'
    };
  }
}

/**
 * Reorder partners
 */
export async function reorderPartners(data: ReorderPartnersData): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = reorderPartnersSchema.parse(data);
    
    // Update order for each item
    for (const item of validated.items) {
      await db.update(partners)
        .set({ 
          order: item.order,
          updatedAt: new Date()
        })
        .where(eq(partners.id, item.id));
    }
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/partners');
    
    return { success: true };
  } catch (error) {
    console.error('Error reordering partners:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reorder partners'
    };
  }
}
