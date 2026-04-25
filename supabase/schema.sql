-- Supabase SQL Schema for Tech Blogger Certificates

-- Table for authorized individuals (Tech Bloggers, Core Team, etc.)
CREATE TABLE IF NOT EXISTS allowed_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  position TEXT, -- Job Title / Role
  category TEXT, -- Tech Blog, Graphic Design, etc.
  profile TEXT,
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (email, category)
);

-- Table for certificate templates
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT,
  config JSONB, -- Stores layout configuration
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table for issued certificates
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unique_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  position TEXT,
  category TEXT,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  revoked BOOLEAN DEFAULT false,
  template_id TEXT
);

-- Row Level Security (RLS) - Basic Setup
ALTER TABLE allowed_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Clean up existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public read access" ON allowed_emails;
DROP POLICY IF EXISTS "Enable insert for all" ON allowed_emails;
DROP POLICY IF EXISTS "Enable update for all" ON allowed_emails;
DROP POLICY IF EXISTS "Enable delete for all" ON allowed_emails;

DROP POLICY IF EXISTS "Public read access" ON certificates;
DROP POLICY IF EXISTS "Enable insert for all" ON certificates;
DROP POLICY IF EXISTS "Enable update for all" ON certificates;
DROP POLICY IF EXISTS "Enable delete for all" ON certificates;
DROP POLICY IF EXISTS "Public read certificates" ON certificates;

DROP POLICY IF EXISTS "Public read access" ON templates;

-- Policies for allowed_emails
CREATE POLICY "Public read access" ON allowed_emails FOR SELECT USING (true);
CREATE POLICY "Enable insert for all" ON allowed_emails FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all" ON allowed_emails FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all" ON allowed_emails FOR DELETE USING (true);

-- Policies for certificates
CREATE POLICY "Public read access" ON certificates FOR SELECT USING (true);
CREATE POLICY "Enable insert for all" ON certificates FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all" ON certificates FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all" ON certificates FOR DELETE USING (true);

-- Policies for templates
CREATE POLICY "Public read access" ON templates FOR SELECT USING (true);
