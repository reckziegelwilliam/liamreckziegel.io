'use server';

import { sql } from './postgres';
import {
  unstable_noStore as noStore,
} from 'next/cache';

export interface PageView {
  id: number;
  path: string;
  post_slug?: string;
  created_at: Date;
  user_agent?: string;
  referrer?: string;
}

export interface AnalyticsStats {
  totalViews: number;
  totalPosts: number;
  totalContacts: number;
  viewsLast30Days: number;
  contactsLast30Days: number;
}

export interface PopularPost {
  slug: string;
  title: string;
  views: number;
  type: string;
}

// Track a page view
export async function trackPageView(data: {
  path: string;
  post_slug?: string;
  user_agent?: string;
  referrer?: string;
}): Promise<void> {
  if (!process.env.POSTGRES_URL) {
    return;
  }

  try {
    await sql`
      INSERT INTO page_views (path, post_slug, user_agent, referrer)
      VALUES (
        ${data.path},
        ${data.post_slug || null},
        ${data.user_agent || null},
        ${data.referrer || null}
      )
    `;
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Get analytics overview stats
export async function getAnalyticsStats(): Promise<AnalyticsStats> {
  if (!process.env.POSTGRES_URL) {
    return {
      totalViews: 0,
      totalPosts: 0,
      totalContacts: 0,
      viewsLast30Days: 0,
      contactsLast30Days: 0,
    };
  }

  noStore();

  const [viewsResult, postsResult, contactsResult, views30Result, contacts30Result] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM page_views`,
    sql`SELECT COUNT(*) as count FROM posts WHERE status = 'published'`,
    sql`SELECT COUNT(*) as count FROM contact_submissions`,
    sql`SELECT COUNT(*) as count FROM page_views WHERE created_at >= NOW() - INTERVAL '30 days'`,
    sql`SELECT COUNT(*) as count FROM contact_submissions WHERE created_at >= NOW() - INTERVAL '30 days'`,
  ]);

  return {
    totalViews: Number(viewsResult[0]?.count || 0),
    totalPosts: Number(postsResult[0]?.count || 0),
    totalContacts: Number(contactsResult[0]?.count || 0),
    viewsLast30Days: Number(views30Result[0]?.count || 0),
    contactsLast30Days: Number(contacts30Result[0]?.count || 0),
  };
}

// Get most viewed posts
export async function getPopularPosts(limit: number = 10): Promise<PopularPost[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();

  const result = await sql`
    SELECT 
      p.slug,
      p.title,
      p.type,
      COUNT(pv.id) as views
    FROM posts p
    LEFT JOIN page_views pv ON p.slug = pv.post_slug
    WHERE p.status = 'published'
    GROUP BY p.id, p.slug, p.title, p.type
    ORDER BY views DESC
    LIMIT ${limit}
  `;

  return result.map((r: any) => ({
    slug: r.slug,
    title: r.title,
    type: r.type,
    views: Number(r.views),
  }));
}

// Get daily views for the last 30 days
export async function getDailyViews(): Promise<{ date: string; views: number }[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();

  const result = await sql`
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as views
    FROM page_views
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  return result.map((r: any) => ({
    date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    views: Number(r.views),
  }));
}

// Get views by post type
export async function getViewsByType(): Promise<{ type: string; views: number }[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();

  const result = await sql`
    SELECT 
      p.type,
      COUNT(pv.id) as views
    FROM posts p
    LEFT JOIN page_views pv ON p.slug = pv.post_slug
    WHERE p.status = 'published'
    GROUP BY p.type
    ORDER BY views DESC
  `;

  return result.map((r: any) => ({
    type: r.type || 'unknown',
    views: Number(r.views),
  }));
}

// Get daily contacts for the last 30 days
export async function getDailyContacts(): Promise<{ date: string; contacts: number }[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();

  const result = await sql`
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as contacts
    FROM contact_submissions
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  return result.map((r: any) => ({
    date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    contacts: Number(r.contacts),
  }));
}

