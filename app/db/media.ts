'use server';

import { sql } from './postgres';
import {
  unstable_noStore as noStore,
} from 'next/cache';

export interface MediaItem {
  id: number;
  filename: string;
  url: string;
  size: number;
  mime_type: string;
  width?: number;
  height?: number;
  uploaded_by?: string;
  created_at: Date;
}

// Get all media items
export async function getMediaItems(filters?: {
  type?: string;
  limit?: number;
}): Promise<MediaItem[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  
  let query = 'SELECT * FROM media_items';
  const conditions: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (filters?.type) {
    conditions.push(`mime_type LIKE $${paramIndex++}`);
    params.push(`${filters.type}%`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ' ORDER BY created_at DESC';

  if (filters?.limit) {
    query += ` LIMIT $${paramIndex}`;
    params.push(filters.limit);
  }

  const result = await sql.unsafe(query, params);
  return result as any[];
}

// Get single media item by ID
export async function getMediaItemById(id: number): Promise<MediaItem | null> {
  if (!process.env.POSTGRES_URL) {
    return null;
  }

  noStore();
  const result = await sql`
    SELECT * FROM media_items WHERE id = ${id}
  `;

  return result.length > 0 ? (result[0] as any) : null;
}

// Create media item record
export async function createMediaItem(data: {
  filename: string;
  url: string;
  size: number;
  mime_type: string;
  width?: number;
  height?: number;
  uploaded_by?: string;
}): Promise<MediaItem> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  const result = await sql`
    INSERT INTO media_items (
      filename, url, size, mime_type, width, height, uploaded_by
    ) VALUES (
      ${data.filename},
      ${data.url},
      ${data.size},
      ${data.mime_type},
      ${data.width || null},
      ${data.height || null},
      ${data.uploaded_by || null}
    )
    RETURNING *
  `;

  return result[0] as any;
}

// Delete media item
export async function deleteMediaItem(id: number): Promise<void> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  await sql`DELETE FROM media_items WHERE id = ${id}`;
}

// Get total media size
export async function getTotalMediaSize(): Promise<number> {
  if (!process.env.POSTGRES_URL) {
    return 0;
  }

  noStore();
  const result = await sql`
    SELECT COALESCE(SUM(size), 0) as total FROM media_items
  `;

  return Number(result[0]?.total || 0);
}

// Get media count by type
export async function getMediaCountByType(): Promise<{ type: string; count: number }[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  const result = await sql`
    SELECT 
      CASE 
        WHEN mime_type LIKE 'image/%' THEN 'image'
        WHEN mime_type LIKE 'video/%' THEN 'video'
        WHEN mime_type LIKE 'audio/%' THEN 'audio'
        ELSE 'other'
      END as type,
      COUNT(*) as count
    FROM media_items
    GROUP BY type
    ORDER BY count DESC
  `;

  return result.map((r: any) => ({
    type: r.type,
    count: Number(r.count),
  }));
}

