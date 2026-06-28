'use server';

import db from '../../../db/drizzle';
import { whistleblowerReports } from '../../../db/schema';
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

// Types
export type WhistleblowerCategory = 'fraud' | 'misconduct' | 'safety' | 'harassment' | 'corruption' | 'other';
export type WhistleblowerStatus = 'new' | 'reviewing' | 'investigating' | 'resolved' | 'dismissed';

export interface WhistleblowerReport {
    id: string;
    referenceNumber: string;
    category: WhistleblowerCategory;
    subject: string;
    description: string;
    incidentDate: Date | null;
    department: string | null;
    involvedParties: string | null;
    evidence: string | null;
    contactEmail: string | null;
    isAnonymous: boolean;
    status: WhistleblowerStatus;
    adminNotes: string | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface SubmitReportInput {
    category: WhistleblowerCategory;
    subject: string;
    description: string;
    incidentDate?: string;
    department?: string;
    involvedParties?: string;
    evidence?: string;
    contactEmail?: string;
    isAnonymous?: boolean;
}

// Generate unique reference number
async function generateReferenceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const existing = await db.select({ referenceNumber: whistleblowerReports.referenceNumber })
        .from(whistleblowerReports)
        .where(eq(whistleblowerReports.referenceNumber, `WB-${year}%`));

    const count = existing.length + 1;
    return `WB-${year}${count.toString().padStart(4, '0')}`;
}

// PUBLIC: Submit a new whistleblower report
export async function submitWhistleblowerReport(input: SubmitReportInput): Promise<{ success: boolean; referenceNumber?: string; error?: string }> {
    try {
        const id = nanoid();
        const referenceNumber = await generateReferenceNumber();

        await db.insert(whistleblowerReports).values({
            id,
            referenceNumber,
            category: input.category,
            subject: input.subject,
            description: input.description,
            incidentDate: input.incidentDate ? new Date(input.incidentDate) : null,
            department: input.department || null,
            involvedParties: input.involvedParties || null,
            evidence: input.evidence || null,
            contactEmail: input.contactEmail || null,
            isAnonymous: input.isAnonymous ?? true,
            status: 'new',
        });

        revalidatePath('/admin/whistleblower');

        return { success: true, referenceNumber };
    } catch (error) {
        console.error('Error submitting whistleblower report:', error);
        return { success: false, error: 'Failed to submit report. Please try again.' };
    }
}

// ADMIN: List all reports
export async function listWhistleblowerReports(filters?: { status?: WhistleblowerStatus }): Promise<{ success: boolean; data?: WhistleblowerReport[]; error?: string }> {
    try {
        let reports;

        if (filters?.status) {
            reports = await db.select().from(whistleblowerReports)
                .where(eq(whistleblowerReports.status, filters.status))
                .orderBy(desc(whistleblowerReports.createdAt));
        } else {
            reports = await db.select().from(whistleblowerReports)
                .orderBy(desc(whistleblowerReports.createdAt));
        }

        return {
            success: true,
            data: reports as WhistleblowerReport[]
        };
    } catch (error) {
        console.error('Error listing whistleblower reports:', error);
        return { success: false, error: 'Failed to fetch reports' };
    }
}

// ADMIN: Get single report by ID
export async function getWhistleblowerReport(id: string): Promise<{ success: boolean; data?: WhistleblowerReport; error?: string }> {
    try {
        const [report] = await db.select()
            .from(whistleblowerReports)
            .where(eq(whistleblowerReports.id, id));

        if (!report) {
            return { success: false, error: 'Report not found' };
        }

        return { success: true, data: report as WhistleblowerReport };
    } catch (error) {
        console.error('Error fetching whistleblower report:', error);
        return { success: false, error: 'Failed to fetch report' };
    }
}

// ADMIN: Update report status
export async function updateReportStatus(
    id: string,
    data: { status?: WhistleblowerStatus; adminNotes?: string; reviewedBy?: string }
): Promise<{ success: boolean; error?: string }> {
    try {
        await db.update(whistleblowerReports)
            .set({
                ...data,
                reviewedAt: new Date(),
                updatedAt: new Date(),
            })
            .where(eq(whistleblowerReports.id, id));

        revalidatePath('/admin/whistleblower');
        revalidatePath(`/admin/whistleblower/${id}`);

        return { success: true };
    } catch (error) {
        console.error('Error updating report status:', error);
        return { success: false, error: 'Failed to update report' };
    }
}

// ADMIN: Delete report
export async function deleteWhistleblowerReport(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        await db.delete(whistleblowerReports)
            .where(eq(whistleblowerReports.id, id));

        revalidatePath('/admin/whistleblower');

        return { success: true };
    } catch (error) {
        console.error('Error deleting whistleblower report:', error);
        return { success: false, error: 'Failed to delete report' };
    }
}
