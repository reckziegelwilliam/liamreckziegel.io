-- Portfolio Reinvention Database Migration
-- This script creates tables for the blog/playbooks system and contact forms

-- Create posts table for blog/playbooks
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  subtitle VARCHAR(500),
  summary TEXT,
  content TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'playbook',
  cover_image_url TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  reading_time_minutes INT,
  author_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Create post_tags table for tagging system
CREATE TABLE IF NOT EXISTS post_tags (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  tag VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contact_submissions table for intake forms
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  project_brief TEXT,
  budget_range VARCHAR(100),
  timeline VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'unread'
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags(tag);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions(created_at DESC);

-- Comments for documentation
COMMENT ON TABLE posts IS 'Blog posts and playbooks content';
COMMENT ON TABLE post_tags IS 'Tags associated with posts';
COMMENT ON TABLE contact_submissions IS 'Contact form submissions from hire/studio intake';

