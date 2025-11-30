'use server';

import { sql } from './postgres';
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';

export interface Post {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  summary?: string;
  content: string;
  type: string;
  cover_image_url?: string;
  status: 'draft' | 'published';
  reading_time_minutes?: number;
  author_id?: number;
  created_at: Date;
  updated_at: Date;
  published_at?: Date;
}

export interface PostTag {
  id: number;
  post_id: number;
  tag: string;
  created_at: Date;
}

export interface PostWithTags extends Post {
  tags: string[];
}

// Get all posts with optional filters
export async function getPosts(filters?: {
  status?: 'draft' | 'published';
  type?: string;
  limit?: number;
}): Promise<PostWithTags[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  
  let query = `
    SELECT DISTINCT p.*, 
           COALESCE(
             array_agg(DISTINCT pt.tag) FILTER (WHERE pt.tag IS NOT NULL), 
             '{}'
           ) as tags
    FROM posts p
    LEFT JOIN post_tags pt ON p.id = pt.post_id
  `;
  
  const conditions: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (filters?.status) {
    conditions.push(`p.status = $${paramIndex++}`);
    params.push(filters.status);
  }

  if (filters?.type) {
    conditions.push(`p.type = $${paramIndex++}`);
    params.push(filters.type);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ` GROUP BY p.id ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC`;

  if (filters?.limit) {
    query += ` LIMIT $${paramIndex}`;
    params.push(filters.limit);
  }

  const result = await sql.unsafe(query, params);
  return result as any[];
}

// Get published posts (cached for public view)
export const getPublishedPosts = cache(
  async (limit?: number): Promise<PostWithTags[]> => {
    return getPosts({ status: 'published', limit });
  },
  ['published-posts'],
  {
    revalidate: 300, // 5 minutes
  }
);

// Get single post by slug (for public view)
export async function getPostBySlug(slug: string): Promise<PostWithTags | null> {
  if (!process.env.POSTGRES_URL) {
    return null;
  }

  noStore();
  
  const result = await sql`
    SELECT p.*, 
           COALESCE(
             array_agg(DISTINCT pt.tag) FILTER (WHERE pt.tag IS NOT NULL), 
             '{}'
           ) as tags
    FROM posts p
    LEFT JOIN post_tags pt ON p.id = pt.post_id
    WHERE p.slug = ${slug} AND p.status = 'published'
    GROUP BY p.id
  `;

  return result.length > 0 ? (result[0] as any) : null;
}

// Get post by ID (for admin edit)
export async function getPostById(id: number): Promise<PostWithTags | null> {
  if (!process.env.POSTGRES_URL) {
    return null;
  }

  noStore();
  
  const result = await sql`
    SELECT p.*, 
           COALESCE(
             array_agg(DISTINCT pt.tag) FILTER (WHERE pt.tag IS NOT NULL), 
             '{}'
           ) as tags
    FROM posts p
    LEFT JOIN post_tags pt ON p.id = pt.post_id
    WHERE p.id = ${id}
    GROUP BY p.id
  `;

  return result.length > 0 ? (result[0] as any) : null;
}

// Create new post
export async function createPost(data: {
  slug: string;
  title: string;
  subtitle?: string;
  summary?: string;
  content: string;
  type?: string;
  cover_image_url?: string;
  status?: 'draft' | 'published';
  reading_time_minutes?: number;
  tags?: string[];
}): Promise<Post> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  const result = await sql`
    INSERT INTO posts (
      slug, title, subtitle, summary, content, type, 
      cover_image_url, status, reading_time_minutes, 
      published_at
    ) VALUES (
      ${data.slug},
      ${data.title},
      ${data.subtitle || null},
      ${data.summary || null},
      ${data.content},
      ${data.type || 'playbook'},
      ${data.cover_image_url || null},
      ${data.status || 'draft'},
      ${data.reading_time_minutes || null},
      ${data.status === 'published' ? new Date() : null}
    )
    RETURNING *
  `;

  const post = result[0] as any;

  // Add tags if provided
  if (data.tags && data.tags.length > 0) {
    await setPostTags(post.id, data.tags);
  }

  return post;
}

// Update existing post
export async function updatePost(
  id: number,
  data: Partial<{
    slug: string;
    title: string;
    subtitle: string;
    summary: string;
    content: string;
    type: string;
    cover_image_url: string;
    status: 'draft' | 'published';
    reading_time_minutes: number;
    tags: string[];
  }>
): Promise<Post> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  // Build update query dynamically
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'tags' && value !== undefined) {
      updates.push(`${key} = $${paramIndex++}`);
      values.push(value);
    }
  });

  // Always update updated_at
  updates.push(`updated_at = $${paramIndex++}`);
  values.push(new Date());

  // If publishing for first time, set published_at
  if (data.status === 'published') {
    updates.push(`published_at = COALESCE(published_at, $${paramIndex++})`);
    values.push(new Date());
  }

  values.push(id);
  const result = await sql.unsafe(
    `UPDATE posts SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );

  const post = result[0] as any;

  // Update tags if provided
  if (data.tags !== undefined) {
    await setPostTags(id, data.tags);
  }

  return post;
}

// Delete post (soft delete by setting status)
export async function deletePost(id: number): Promise<void> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  // Hard delete for now - could be changed to soft delete
  await sql`DELETE FROM posts WHERE id = ${id}`;
}

// Get tags for a post
export async function getPostTags(postId: number): Promise<string[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  const result = await sql`
    SELECT tag FROM post_tags WHERE post_id = ${postId}
  `;

  return result.map((r: any) => r.tag);
}

// Set tags for a post (replaces all existing tags)
export async function setPostTags(postId: number, tags: string[]): Promise<void> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  // Delete existing tags
  await sql`DELETE FROM post_tags WHERE post_id = ${postId}`;

  // Insert new tags
  if (tags.length > 0) {
    const values = tags.map((tag) => [postId, tag.trim().toLowerCase()]);
    await sql`
      INSERT INTO post_tags (post_id, tag)
      SELECT * FROM ${sql(values)}
    `;
  }
}

