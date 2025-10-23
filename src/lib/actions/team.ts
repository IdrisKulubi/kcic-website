'use server'

import db from '../../../db/drizzle';
import { teamMembers } from '../../../db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq, asc } from 'drizzle-orm';
import { teamMemberSchema, reorderTeamMembersSchema } from '../validators';

export type TeamMemberData = z.infer<typeof teamMemberSchema>;
export type ReorderTeamMembersData = z.infer<typeof reorderTeamMembersSchema>;

type ActionResponse<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Get all team members ordered by their order field
 */
export async function listTeamMembers(): Promise<ActionResponse<TeamMemberData[]>> {
  try {
    const members = await db.query.teamMembers.findMany({
      orderBy: [asc(teamMembers.order)]
    });

    const data: TeamMemberData[] = members.map(member => ({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      photo: member.photo,
      email: member.email || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      order: member.order
    }));

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch team members'
    };
  }
}

/**
 * Get a single team member by ID
 */
export async function getTeamMember(id: string): Promise<ActionResponse<TeamMemberData>> {
  try {
    const member = await db.query.teamMembers.findFirst({
      where: eq(teamMembers.id, id)
    });

    if (!member) {
      return {
        success: false,
        error: 'Team member not found'
      };
    }

    const data: TeamMemberData = {
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      photo: member.photo,
      email: member.email || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      order: member.order
    };

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching team member:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch team member'
    };
  }
}

/**
 * Create a new team member
 */
export async function createTeamMember(data: Omit<TeamMemberData, 'id' | 'order'>): Promise<ActionResponse<string>> {
  try {
    // Validate input
    const validated = teamMemberSchema.omit({ id: true, order: true }).parse(data);
    
    // Get the highest order value to append new team member at the end
    const existingMembers = await db.query.teamMembers.findMany({
      orderBy: [asc(teamMembers.order)]
    });
    
    const nextOrder = existingMembers.length > 0 
      ? Math.max(...existingMembers.map(m => m.order)) + 1 
      : 0;
    
    // Generate unique ID
    const id = `team-${Date.now()}`;
    
    // Insert new team member
    await db.insert(teamMembers).values({
      id,
      name: validated.name,
      role: validated.role,
      bio: validated.bio || null,
      photo: validated.photo,
      email: validated.email || null,
      linkedin: validated.linkedin || null,
      twitter: validated.twitter || null,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/team');
    
    return { 
      success: true,
      data: id
    };
  } catch (error) {
    console.error('Error creating team member:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create team member'
    };
  }
}

/**
 * Update an existing team member
 */
export async function updateTeamMember(id: string, data: Omit<TeamMemberData, 'id' | 'order'>): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = teamMemberSchema.omit({ id: true, order: true }).parse(data);
    
    // Check if team member exists
    const existing = await db.query.teamMembers.findFirst({
      where: eq(teamMembers.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'Team member not found'
      };
    }
    
    // Update team member
    await db.update(teamMembers)
      .set({
        name: validated.name,
        role: validated.role,
        bio: validated.bio || null,
        photo: validated.photo,
        email: validated.email || null,
        linkedin: validated.linkedin || null,
        twitter: validated.twitter || null,
        updatedAt: new Date()
      })
      .where(eq(teamMembers.id, id));
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/team');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating team member:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update team member'
    };
  }
}

/**
 * Delete a team member
 */
export async function deleteTeamMember(id: string): Promise<ActionResponse> {
  try {
    // Check if team member exists
    const existing = await db.query.teamMembers.findFirst({
      where: eq(teamMembers.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'Team member not found'
      };
    }
    
    // Delete the team member
    await db.delete(teamMembers)
      .where(eq(teamMembers.id, id));
    
    // Reorder remaining team members to fill the gap
    const remainingMembers = await db.query.teamMembers.findMany({
      orderBy: [asc(teamMembers.order)]
    });
    
    // Update order for remaining items
    for (let i = 0; i < remainingMembers.length; i++) {
      await db.update(teamMembers)
        .set({ order: i })
        .where(eq(teamMembers.id, remainingMembers[i].id));
    }
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/team');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting team member:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete team member'
    };
  }
}

/**
 * Reorder team members
 */
export async function reorderTeamMembers(data: ReorderTeamMembersData): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = reorderTeamMembersSchema.parse(data);
    
    // Update order for each item
    for (const item of validated.items) {
      await db.update(teamMembers)
        .set({ 
          order: item.order,
          updatedAt: new Date()
        })
        .where(eq(teamMembers.id, item.id));
    }
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/team');
    
    return { success: true };
  } catch (error) {
    console.error('Error reordering team members:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reorder team members'
    };
  }
}
