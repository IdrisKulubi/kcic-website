'use server'

import db from '../../../db/drizzle';
import { statistics } from '../../../db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq, asc } from 'drizzle-orm';
import { statisticSchema, reorderStatisticsSchema } from '../validators';

export type StatisticData = z.infer<typeof statisticSchema>;
export type ReorderStatisticsData = z.infer<typeof reorderStatisticsSchema>;

type ActionResponse<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Get all statistics ordered by their order field
 */
export async function listStatistics(): Promise<ActionResponse<StatisticData[]>> {
  try {
    const stats = await db.query.statistics.findMany({
      orderBy: [asc(statistics.order)]
    });

    const data: StatisticData[] = stats.map(stat => ({
      id: stat.id,
      label: stat.label,
      value: stat.value,
      suffix: stat.suffix || '',
      icon: stat.icon,
      order: stat.order
    }));

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch statistics'
    };
  }
}

/**
 * Get a single statistic by ID
 */
export async function getStatistic(id: string): Promise<ActionResponse<StatisticData>> {
  try {
    const stat = await db.query.statistics.findFirst({
      where: eq(statistics.id, id)
    });

    if (!stat) {
      return {
        success: false,
        error: 'Statistic not found'
      };
    }

    const data: StatisticData = {
      id: stat.id,
      label: stat.label,
      value: stat.value,
      suffix: stat.suffix || '',
      icon: stat.icon,
      order: stat.order
    };

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching statistic:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch statistic'
    };
  }
}

/**
 * Create a new statistic
 */
export async function createStatistic(data: Omit<StatisticData, 'id' | 'order'>): Promise<ActionResponse<string>> {
  try {
    // Validate input
    const validated = statisticSchema.omit({ id: true, order: true }).parse(data);
    
    // Get the highest order value to append new statistic at the end
    const existingStats = await db.query.statistics.findMany({
      orderBy: [asc(statistics.order)]
    });
    
    const nextOrder = existingStats.length > 0 
      ? Math.max(...existingStats.map(s => s.order)) + 1 
      : 0;
    
    // Generate unique ID
    const id = `stat-${Date.now()}`;
    
    // Insert new statistic
    await db.insert(statistics).values({
      id,
      label: validated.label,
      value: validated.value,
      suffix: validated.suffix || null,
      icon: validated.icon,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/stats');
    
    return { 
      success: true,
      data: id
    };
  } catch (error) {
    console.error('Error creating statistic:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create statistic'
    };
  }
}

/**
 * Update an existing statistic
 */
export async function updateStatistic(id: string, data: Omit<StatisticData, 'id' | 'order'>): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = statisticSchema.omit({ id: true, order: true }).parse(data);
    
    // Check if statistic exists
    const existing = await db.query.statistics.findFirst({
      where: eq(statistics.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'Statistic not found'
      };
    }
    
    // Update statistic
    await db.update(statistics)
      .set({
        label: validated.label,
        value: validated.value,
        suffix: validated.suffix || null,
        icon: validated.icon,
        updatedAt: new Date()
      })
      .where(eq(statistics.id, id));
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/stats');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating statistic:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update statistic'
    };
  }
}

/**
 * Delete a statistic
 */
export async function deleteStatistic(id: string): Promise<ActionResponse> {
  try {
    // Check if statistic exists
    const existing = await db.query.statistics.findFirst({
      where: eq(statistics.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'Statistic not found'
      };
    }
    
    // Delete the statistic
    await db.delete(statistics)
      .where(eq(statistics.id, id));
    
    // Reorder remaining statistics to fill the gap
    const remainingStats = await db.query.statistics.findMany({
      orderBy: [asc(statistics.order)]
    });
    
    // Update order for remaining items
    for (let i = 0; i < remainingStats.length; i++) {
      await db.update(statistics)
        .set({ order: i })
        .where(eq(statistics.id, remainingStats[i].id));
    }
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/stats');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting statistic:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete statistic'
    };
  }
}

/**
 * Reorder statistics
 */
export async function reorderStatistics(data: ReorderStatisticsData): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = reorderStatisticsSchema.parse(data);
    
    // Update order for each item
    for (const item of validated.items) {
      await db.update(statistics)
        .set({ 
          order: item.order,
          updatedAt: new Date()
        })
        .where(eq(statistics.id, item.id));
    }
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/stats');
    
    return { success: true };
  } catch (error) {
    console.error('Error reordering statistics:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reorder statistics'
    };
  }
}
