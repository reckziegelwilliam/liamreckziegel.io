# Database Migration Guide

This document outlines the database migrations needed to support the new admin features.

## Required Tables

### 1. Analytics Tables

#### page_views
Tracks page views for analytics.

```sql
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  post_slug TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_page_views_post_slug ON page_views(post_slug);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
```

### 2. Media Library Table

#### media_items
Stores metadata for uploaded media files.

```sql
CREATE TABLE media_items (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_items_mime_type ON media_items(mime_type);
CREATE INDEX idx_media_items_created_at ON media_items(created_at);
```

### 3. Settings Table

#### site_settings
Stores site-wide configuration settings.

```sql
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Running Migrations

### Option 1: Using psql

```bash
# Connect to your database
psql $POSTGRES_URL

# Run each CREATE TABLE statement above
```

### Option 2: Migration Script

Create a file `scripts/migrate-admin-features.sql`:

```sql
-- Analytics
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  post_slug TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_post_slug ON page_views(post_slug);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);

-- Media Library
CREATE TABLE IF NOT EXISTS media_items (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_items_mime_type ON media_items(mime_type);
CREATE INDEX IF NOT EXISTS idx_media_items_created_at ON media_items(created_at);

-- Settings
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Then run:

```bash
psql $POSTGRES_URL < scripts/migrate-admin-features.sql
```

## Verification

After running migrations, verify the tables exist:

```sql
\dt  -- List all tables
\d page_views  -- Describe page_views table
\d media_items  -- Describe media_items table
\d site_settings  -- Describe site_settings table
```

## Rollback

If you need to remove these tables:

```sql
DROP TABLE IF EXISTS page_views CASCADE;
DROP TABLE IF EXISTS media_items CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
```

**Warning:** This will permanently delete all data in these tables.

