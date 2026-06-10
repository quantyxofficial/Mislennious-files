-- ============================================================
-- KaizenStat Quick Setup — Run this in Supabase SQL Editor
-- Project: pdqytkydmbvepwiddwzb
-- ============================================================

-- CREATE TABLES
CREATE TABLE IF NOT EXISTS student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  university TEXT,
  major TEXT,
  graduation_year TEXT,
  bio TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  linkedin_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_id_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  id_number TEXT,
  status TEXT DEFAULT 'ACTIVE',
  valid_thru TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  prize TEXT,
  deadline TEXT,
  participants INTEGER DEFAULT 0,
  status TEXT DEFAULT 'open',
  color TEXT DEFAULT 'cyan',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT DEFAULT 'info',
  title TEXT NOT NULL,
  date TEXT,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS competition_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  registered_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, competition_id)
);

-- ENABLE RLS
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- DROP OLD POLICIES
DROP POLICY IF EXISTS "student_own_profile" ON student_profiles;
DROP POLICY IF EXISTS "profile_public_read" ON student_profiles;
DROP POLICY IF EXISTS "student_own_idcard" ON student_id_cards;
DROP POLICY IF EXISTS "idcard_public_read" ON student_id_cards;
DROP POLICY IF EXISTS "competitions_public_read" ON competitions;
DROP POLICY IF EXISTS "admin_full_access_competitions" ON competitions;
DROP POLICY IF EXISTS "competition_reg_own" ON competition_registrations;
DROP POLICY IF EXISTS "announcements_public_read" ON announcements;
DROP POLICY IF EXISTS "admin_full_access_announcements" ON announcements;

-- CREATE RLS POLICIES

-- Student profiles: students can read/write their own, public can read (for verification)
CREATE POLICY "student_own_profile" ON student_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "profile_public_read" ON student_profiles
  FOR SELECT USING (true);

-- Student ID cards: students can read/write their own, public can read (for QR verification)
CREATE POLICY "student_own_idcard" ON student_id_cards
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "idcard_public_read" ON student_id_cards
  FOR SELECT USING (true);

-- Competitions: public read, admin can manage
CREATE POLICY "competitions_public_read" ON competitions
  FOR SELECT USING (true);

CREATE POLICY "admin_full_access_competitions" ON competitions
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- Competition registrations: students manage their own
CREATE POLICY "competition_reg_own" ON competition_registrations
  FOR ALL USING (auth.uid() = user_id);

-- Announcements: public read published, admin can manage
CREATE POLICY "announcements_public_read" ON announcements
  FOR SELECT USING (is_published = true);

CREATE POLICY "admin_full_access_announcements" ON announcements
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_student_id_cards_user_id ON student_id_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_competitions_status ON competitions(status);
CREATE INDEX IF NOT EXISTS idx_competition_reg_user ON competition_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(is_published);

-- ============================================================
-- DONE! Now all tables are created and RLS is properly configured
-- ============================================================
