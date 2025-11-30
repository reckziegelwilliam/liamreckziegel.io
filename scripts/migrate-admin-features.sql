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

-- Redirects
CREATE TABLE IF NOT EXISTS redirects (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL UNIQUE,
  destination TEXT NOT NULL,
  permanent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_redirects_source ON redirects(source);

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

