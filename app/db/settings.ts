'use server';

import { sql } from './postgres';
import {
  unstable_noStore as noStore,
} from 'next/cache';

export interface SiteSetting {
  key: string;
  value: string;
  updated_at: Date;
}

export interface SiteSettings {
  site_title: string;
  site_description: string;
  site_url: string;
  social_github?: string;
  social_twitter?: string;
  social_linkedin?: string;
  seo_default_title?: string;
  seo_default_description?: string;
  feature_analytics_enabled: boolean;
  feature_contact_enabled: boolean;
}

// Get all settings as an object
export async function getSettings(): Promise<SiteSettings> {
  if (!process.env.POSTGRES_URL) {
    return getDefaultSettings();
  }

  noStore();
  
  try {
    const result = await sql`SELECT key, value FROM site_settings`;
    const settings: any = {};
    
    result.forEach((row: any) => {
      let value = row.value;
      // Parse boolean values
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      settings[row.key] = value;
    });

    // Merge with defaults to ensure all keys exist
    return { ...getDefaultSettings(), ...settings };
  } catch (error) {
    console.error('Error getting settings:', error);
    return getDefaultSettings();
  }
}

// Get a single setting by key
export async function getSetting(key: string): Promise<string | null> {
  if (!process.env.POSTGRES_URL) {
    return null;
  }

  noStore();
  
  try {
    const result = await sql`SELECT value FROM site_settings WHERE key = ${key}`;
    return result.length > 0 ? result[0].value : null;
  } catch (error) {
    return null;
  }
}

// Update or create a setting
export async function updateSetting(key: string, value: string): Promise<void> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  await sql`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (${key}, ${value}, NOW())
    ON CONFLICT (key) 
    DO UPDATE SET value = ${value}, updated_at = NOW()
  `;
}

// Update multiple settings at once
export async function updateSettings(settings: Partial<SiteSettings>): Promise<void> {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured');
  }

  const entries = Object.entries(settings);
  for (const [key, value] of entries) {
    await updateSetting(key, String(value));
  }
}

// Default settings
function getDefaultSettings(): SiteSettings {
  return {
    site_title: 'Liam Reckziegel',
    site_description: 'Product Designer & Developer',
    site_url: 'https://liamreckziegel.io',
    social_github: 'https://github.com/liamreckziegel',
    social_twitter: '',
    social_linkedin: '',
    seo_default_title: 'Liam Reckziegel - Product Designer & Developer',
    seo_default_description: 'Product designer and developer creating beautiful, functional digital experiences.',
    feature_analytics_enabled: true,
    feature_contact_enabled: true,
  };
}

