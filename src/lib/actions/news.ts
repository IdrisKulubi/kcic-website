'use server'

import db from '../../../db/drizzle';
import { news } from '../../../db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq,  desc, like, or } from 'drizzle-orm';
import { newsSchema } from '../validators';

export type NewsData = z.infer<typeof newsSchema>;

type ActionResponse<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Ensure slug is unique by appending a number if necessary
 */
async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = await db.query.news.findFirst({
      where: eq(news.slug, slug)
    });
    
    // If no existing article or it's the same article we're updating, slug is unique
    if (!existing || (excludeId && existing.id === excludeId)) {
      return slug;
    }
    
    // Try next variation
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * List all news articles with optional filtering
 */
export async function listNews(options?: {
  category?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}): Promise<ActionResponse<{ articles: NewsData[]; total: number }>> {
  try {
    // Build query conditions
    const conditions = [];
    
    if (options?.category) {
      conditions.push(eq(news.category, options.category));
    }
    
    if (options?.featured !== undefined) {
      conditions.push(eq(news.featured, options.featured));
    }
    
    if (options?.search) {
      conditions.push(
        or(
          like(news.title, `%${options.search}%`),
          like(news.excerpt, `%${options.search}%`)
        )
      );
    }
    
    // Get total count
    const allArticles = await db.query.news.findMany({
      where: conditions.length > 0 ? conditions[0] : undefined,
      orderBy: [desc(news.publishedAt)]
    });
    
    const total = allArticles.length;
    
    // Apply pagination
    const articles = options?.limit
      ? allArticles.slice(options.offset || 0, (options.offset || 0) + options.limit)
      : allArticles;
    
    const data: NewsData[] = articles.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content || '',
      thumbnail: article.thumbnail,
      category: article.category,
      slug: article.slug,
      readTime: article.readTime || '',
      featured: article.featured,
      publishedAt: article.publishedAt
    }));

    return {
      success: true,
      data: { articles: data, total }
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news'
    };
  }
}

/**
 * Get a single news article by ID
 */
export async function getNewsArticle(id: string): Promise<ActionResponse<NewsData>> {
  try {
    const article = await db.query.news.findFirst({
      where: eq(news.id, id)
    });

    if (!article) {
      return {
        success: false,
        error: 'News article not found'
      };
    }

    const data: NewsData = {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content || '',
      thumbnail: article.thumbnail,
      category: article.category,
      slug: article.slug,
      readTime: article.readTime || '',
      featured: article.featured,
      publishedAt: article.publishedAt
    };

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching news article:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news article'
    };
  }
}

/**
 * Get a single news article by slug
 */
export async function getNewsArticleBySlug(slug: string): Promise<ActionResponse<NewsData>> {
  try {
    const article = await db.query.news.findFirst({
      where: eq(news.slug, slug)
    });

    if (!article) {
      return {
        success: false,
        error: 'News article not found'
      };
    }

    const data: NewsData = {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content || '',
      thumbnail: article.thumbnail,
      category: article.category,
      slug: article.slug,
      readTime: article.readTime || '',
      featured: article.featured,
      publishedAt: article.publishedAt
    };

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching news article:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news article'
    };
  }
}

/**
 * Create a new news article
 */
export async function createNewsArticle(data: Omit<NewsData, 'id' | 'slug'>): Promise<ActionResponse<string>> {
  try {
    // Validate input
    const validated = newsSchema.omit({ id: true, slug: true }).parse(data);
    
    // Generate slug from title
    const baseSlug = generateSlug(validated.title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);
    
    // Generate unique ID
    const id = `news-${Date.now()}`;
    
    // Convert publishedAt to Date if it's a string
    const publishedAt = typeof validated.publishedAt === 'string' 
      ? new Date(validated.publishedAt) 
      : validated.publishedAt;
    
    // Insert new article
    await db.insert(news).values({
      id,
      title: validated.title,
      excerpt: validated.excerpt,
      content: validated.content || null,
      thumbnail: validated.thumbnail,
      category: validated.category,
      slug: uniqueSlug,
      readTime: validated.readTime || null,
      featured: validated.featured,
      publishedAt,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/news');
    revalidatePath(`/news/${uniqueSlug}`);
    
    return { 
      success: true,
      data: id
    };
  } catch (error) {
    console.error('Error creating news article:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create news article'
    };
  }
}

/**
 * Update an existing news article
 */
export async function updateNewsArticle(id: string, data: Omit<NewsData, 'id'>): Promise<ActionResponse> {
  try {
    // Validate input
    const validated = newsSchema.omit({ id: true }).parse(data);
    
    // Check if article exists
    const existing = await db.query.news.findFirst({
      where: eq(news.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'News article not found'
      };
    }
    
    // Generate new slug if title changed
    let slug = validated.slug || existing.slug;
    if (validated.title !== existing.title) {
      const baseSlug = generateSlug(validated.title);
      slug = await ensureUniqueSlug(baseSlug, id);
    }
    
    // Convert publishedAt to Date if it's a string
    const publishedAt = typeof validated.publishedAt === 'string' 
      ? new Date(validated.publishedAt) 
      : validated.publishedAt;
    
    // Update article
    await db.update(news)
      .set({
        title: validated.title,
        excerpt: validated.excerpt,
        content: validated.content || null,
        thumbnail: validated.thumbnail,
        category: validated.category,
        slug,
        readTime: validated.readTime || null,
        featured: validated.featured,
        publishedAt,
        updatedAt: new Date()
      })
      .where(eq(news.id, id));
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/news');
    revalidatePath(`/news/${slug}`);
    if (existing.slug !== slug) {
      revalidatePath(`/news/${existing.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating news article:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update news article'
    };
  }
}

/**
 * Delete a news article
 */
export async function deleteNewsArticle(id: string): Promise<ActionResponse> {
  try {
    // Check if article exists
    const existing = await db.query.news.findFirst({
      where: eq(news.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'News article not found'
      };
    }
    
    // Delete the article
    await db.delete(news)
      .where(eq(news.id, id));
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/news');
    revalidatePath(`/news/${existing.slug}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting news article:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete news article'
    };
  }
}

/**
 * Toggle featured status of a news article
 */
export async function toggleFeaturedNews(id: string): Promise<ActionResponse> {
  try {
    // Check if article exists
    const existing = await db.query.news.findFirst({
      where: eq(news.id, id)
    });
    
    if (!existing) {
      return {
        success: false,
        error: 'News article not found'
      };
    }
    
    // Toggle featured status
    await db.update(news)
      .set({
        featured: !existing.featured,
        updatedAt: new Date()
      })
      .where(eq(news.id, id));
    
    // Revalidate pages
    revalidatePath('/');
    revalidatePath('/admin/news');
    
    return { success: true };
  } catch (error) {
    console.error('Error toggling featured status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to toggle featured status'
    };
  }
}
