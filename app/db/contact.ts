'use server';

import { sql } from './postgres';
import {
  unstable_noStore as noStore,
} from 'next/cache';

export interface ContactSubmission {
  id: number;
  type: 'hire' | 'studio';
  name: string;
  email: string;
  company?: string;
  project_brief?: string;
  budget_range?: string;
  timeline?: string;
  created_at: Date;
  status: 'unread' | 'read' | 'replied' | 'archived';
}

// Create new contact submission
export async function createContactSubmission(data: {
  type: 'hire' | 'studio';
  name: string;
  email: string;
  company?: string;
  project_brief?: string;
  budget_range?: string;
  timeline?: string;
}): Promise<ContactSubmission> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  const result = await sql`
    INSERT INTO contact_submissions (
      type, name, email, company, project_brief, budget_range, timeline
    ) VALUES (
      ${data.type},
      ${data.name},
      ${data.email},
      ${data.company || null},
      ${data.project_brief || null},
      ${data.budget_range || null},
      ${data.timeline || null}
    )
    RETURNING *
  `;

  return result[0] as any;
}

// Get all contact submissions with optional filters
export async function getContactSubmissions(filters?: {
  status?: string;
  type?: string;
  limit?: number;
}): Promise<ContactSubmission[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  
  let query = 'SELECT * FROM contact_submissions';
  const conditions: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (filters?.status) {
    conditions.push(`status = $${paramIndex++}`);
    params.push(filters.status);
  }

  if (filters?.type) {
    conditions.push(`type = $${paramIndex++}`);
    params.push(filters.type);
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

// Get single contact submission by ID
export async function getContactSubmissionById(id: number): Promise<ContactSubmission | null> {
  if (!process.env.POSTGRES_URL) {
    return null;
  }

  noStore();
  const result = await sql`
    SELECT * FROM contact_submissions WHERE id = ${id}
  `;

  return result.length > 0 ? (result[0] as any) : null;
}

// Update submission status
export async function updateSubmissionStatus(
  id: number,
  status: 'unread' | 'read' | 'replied' | 'archived'
): Promise<void> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  await sql`
    UPDATE contact_submissions 
    SET status = ${status}
    WHERE id = ${id}
  `;
}

// Get unread count
export async function getUnreadCount(): Promise<number> {
  if (!process.env.POSTGRES_URL) {
    return 0;
  }

  noStore();
  const result = await sql`
    SELECT COUNT(*) as count FROM contact_submissions WHERE status = 'unread'
  `;

  return Number(result[0]?.count || 0);
}

