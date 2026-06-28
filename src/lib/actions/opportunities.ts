'use server';

import { opportunities, opportunityAttachments } from '../../../db/schema';
import { eq, desc, and, or } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import db from '../../../db/drizzle';

// Types
export type OpportunityType = 'job' | 'consulting' | 'rfp' | 'tender';
export type WorkMode = 'remote' | 'onsite' | 'hybrid';
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'consultancy';

export interface OpportunityData {
    id: string;
    title: string;
    slug: string;
    type: OpportunityType;
    referenceNumber: string | null;
    summary: string;
    description: string | null;
    department: string | null;
    location: string | null;
    workMode: WorkMode | null;
    employmentType: EmploymentType | null;
    requirements: string | null;
    qualifications: string | null;
    responsibilities: string | null;
    applicationEmail: string | null;
    applicationLink: string | null;
    applicationInstructions: string | null;
    deadline: Date | null;
    issuedDate: Date | null;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface OpportunityWithAttachments extends OpportunityData {
    attachments: AttachmentData[];
}

export interface AttachmentData {
    id: string;
    opportunityId: string;
    fileName: string;
    fileUrl: string;
    fileType: string | null;
    fileSize: number | null;
    order: number;
    createdAt: Date;
}

export interface CreateOpportunityInput {
    title: string;
    type: OpportunityType;
    referenceNumber?: string;
    summary: string;
    description?: string;
    department?: string;
    location?: string;
    workMode?: WorkMode;
    employmentType?: EmploymentType;
    requirements?: string;
    qualifications?: string;
    responsibilities?: string;
    applicationEmail?: string;
    applicationLink?: string;
    applicationInstructions?: string;
    deadline?: Date;
    issuedDate?: Date;
    isActive?: boolean;
    isFeatured?: boolean;
}

// Helper to generate slug
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        + '-' + nanoid(6);
}

// List opportunities with optional filters
export async function listOpportunities(filters?: {
    type?: OpportunityType;
    isActive?: boolean;
    includeInactive?: boolean;
}): Promise<{ success: boolean; data?: OpportunityWithAttachments[]; error?: string }> {
    try {
        const conditions = [];

        if (filters?.type) {
            conditions.push(eq(opportunities.type, filters.type));
        }

        if (filters?.isActive !== undefined) {
            conditions.push(eq(opportunities.isActive, filters.isActive));
        } else if (!filters?.includeInactive) {
            // Default to only active opportunities for public view
            conditions.push(eq(opportunities.isActive, true));
        }

        const result = await db.query.opportunities.findMany({
            where: conditions.length > 0 ? and(...conditions) : undefined,
            with: {
                attachments: {
                    orderBy: (attachments, { asc }) => [asc(attachments.order)],
                },
            },
            orderBy: [desc(opportunities.isFeatured), desc(opportunities.createdAt)],
        });

        return {
            success: true,
            data: result as OpportunityWithAttachments[]
        };
    } catch (error) {
        console.error('Error listing opportunities:', error);
        return { success: false, error: 'Failed to fetch opportunities' };
    }
}

// Get single opportunity by slug
export async function getOpportunityBySlug(
    slug: string
): Promise<{ success: boolean; data?: OpportunityWithAttachments; error?: string }> {
    try {
        const result = await db.query.opportunities.findFirst({
            where: eq(opportunities.slug, slug),
            with: {
                attachments: {
                    orderBy: (attachments, { asc }) => [asc(attachments.order)],
                },
            },
        });

        if (!result) {
            return { success: false, error: 'Opportunity not found' };
        }

        return {
            success: true,
            data: result as OpportunityWithAttachments
        };
    } catch (error) {
        console.error('Error fetching opportunity:', error);
        return { success: false, error: 'Failed to fetch opportunity' };
    }
}

// Create opportunity (Admin)
export async function createOpportunity(
    input: CreateOpportunityInput
): Promise<{ success: boolean; data?: OpportunityData; error?: string }> {
    try {
        const id = nanoid();
        const slug = generateSlug(input.title);
        const now = new Date();

        const [result] = await db.insert(opportunities).values({
            id,
            slug,
            title: input.title,
            type: input.type,
            referenceNumber: input.referenceNumber || null,
            summary: input.summary,
            description: input.description || null,
            department: input.department || null,
            location: input.location || null,
            workMode: input.workMode || null,
            employmentType: input.employmentType || null,
            requirements: input.requirements || null,
            qualifications: input.qualifications || null,
            responsibilities: input.responsibilities || null,
            applicationEmail: input.applicationEmail || null,
            applicationLink: input.applicationLink || null,
            applicationInstructions: input.applicationInstructions || null,
            deadline: input.deadline || null,
            issuedDate: input.issuedDate || now,
            isActive: input.isActive ?? true,
            isFeatured: input.isFeatured ?? false,
            createdAt: now,
            updatedAt: now,
        }).returning();

        revalidatePath('/about/careers');
        revalidatePath('/admin/opportunities');

        return { success: true, data: result as OpportunityData };
    } catch (error) {
        console.error('Error creating opportunity:', error);
        return { success: false, error: 'Failed to create opportunity' };
    }
}

// Update opportunity (Admin)
export async function updateOpportunity(
    id: string,
    input: Partial<CreateOpportunityInput>
): Promise<{ success: boolean; data?: OpportunityData; error?: string }> {
    try {
        const updateData: Record<string, unknown> = {
            updatedAt: new Date(),
        };

        // Only include fields that are provided
        if (input.title !== undefined) updateData.title = input.title;
        if (input.type !== undefined) updateData.type = input.type;
        if (input.referenceNumber !== undefined) updateData.referenceNumber = input.referenceNumber;
        if (input.summary !== undefined) updateData.summary = input.summary;
        if (input.description !== undefined) updateData.description = input.description;
        if (input.department !== undefined) updateData.department = input.department;
        if (input.location !== undefined) updateData.location = input.location;
        if (input.workMode !== undefined) updateData.workMode = input.workMode;
        if (input.employmentType !== undefined) updateData.employmentType = input.employmentType;
        if (input.requirements !== undefined) updateData.requirements = input.requirements;
        if (input.qualifications !== undefined) updateData.qualifications = input.qualifications;
        if (input.responsibilities !== undefined) updateData.responsibilities = input.responsibilities;
        if (input.applicationEmail !== undefined) updateData.applicationEmail = input.applicationEmail;
        if (input.applicationLink !== undefined) updateData.applicationLink = input.applicationLink;
        if (input.applicationInstructions !== undefined) updateData.applicationInstructions = input.applicationInstructions;
        if (input.deadline !== undefined) updateData.deadline = input.deadline;
        if (input.issuedDate !== undefined) updateData.issuedDate = input.issuedDate;
        if (input.isActive !== undefined) updateData.isActive = input.isActive;
        if (input.isFeatured !== undefined) updateData.isFeatured = input.isFeatured;

        const [result] = await db
            .update(opportunities)
            .set(updateData)
            .where(eq(opportunities.id, id))
            .returning();

        if (!result) {
            return { success: false, error: 'Opportunity not found' };
        }

        revalidatePath('/about/careers');
        revalidatePath('/admin/opportunities');

        return { success: true, data: result as OpportunityData };
    } catch (error) {
        console.error('Error updating opportunity:', error);
        return { success: false, error: 'Failed to update opportunity' };
    }
}

// Toggle active status (Admin)
export async function toggleOpportunityStatus(
    id: string
): Promise<{ success: boolean; data?: OpportunityData; error?: string }> {
    try {
        // Get current status
        const current = await db.query.opportunities.findFirst({
            where: eq(opportunities.id, id),
        });

        if (!current) {
            return { success: false, error: 'Opportunity not found' };
        }

        const [result] = await db
            .update(opportunities)
            .set({
                isActive: !current.isActive,
                updatedAt: new Date()
            })
            .where(eq(opportunities.id, id))
            .returning();

        revalidatePath('/about/careers');
        revalidatePath('/admin/opportunities');

        return { success: true, data: result as OpportunityData };
    } catch (error) {
        console.error('Error toggling opportunity status:', error);
        return { success: false, error: 'Failed to toggle status' };
    }
}

// Delete opportunity (Admin)
export async function deleteOpportunity(
    id: string
): Promise<{ success: boolean; error?: string }> {
    try {
        await db.delete(opportunities).where(eq(opportunities.id, id));

        revalidatePath('/about/careers');
        revalidatePath('/admin/opportunities');

        return { success: true };
    } catch (error) {
        console.error('Error deleting opportunity:', error);
        return { success: false, error: 'Failed to delete opportunity' };
    }
}

// Add attachment to opportunity (Admin)
export async function addOpportunityAttachment(
    opportunityId: string,
    attachment: {
        fileName: string;
        fileUrl: string;
        fileType?: string;
        fileSize?: number;
    }
): Promise<{ success: boolean; data?: AttachmentData; error?: string }> {
    try {
        // Get current max order
        const existingAttachments = await db
            .select()
            .from(opportunityAttachments)
            .where(eq(opportunityAttachments.opportunityId, opportunityId));

        const maxOrder = existingAttachments.reduce((max, a) => Math.max(max, a.order), -1);

        const id = nanoid();
        const [result] = await db.insert(opportunityAttachments).values({
            id,
            opportunityId,
            fileName: attachment.fileName,
            fileUrl: attachment.fileUrl,
            fileType: attachment.fileType || null,
            fileSize: attachment.fileSize || null,
            order: maxOrder + 1,
            createdAt: new Date(),
        }).returning();

        revalidatePath('/about/careers');
        revalidatePath('/admin/opportunities');

        return { success: true, data: result as AttachmentData };
    } catch (error) {
        console.error('Error adding attachment:', error);
        return { success: false, error: 'Failed to add attachment' };
    }
}

// Remove attachment (Admin)
export async function removeOpportunityAttachment(
    attachmentId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        await db.delete(opportunityAttachments).where(eq(opportunityAttachments.id, attachmentId));

        revalidatePath('/about/careers');
        revalidatePath('/admin/opportunities');

        return { success: true };
    } catch (error) {
        console.error('Error removing attachment:', error);
        return { success: false, error: 'Failed to remove attachment' };
    }
}
