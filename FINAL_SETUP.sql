-- ============================================================
-- KaizenStat FINAL SETUP — Run this ONCE in Supabase SQL Editor
-- Project: pdqytkydmbvepwiddwzb
-- Drops and recreates all tables cleanly
-- ============================================================

-- ─── DROP EVERYTHING FIRST ─────────────────────────────────

DROP TABLE IF EXISTS competition_registrations CASCADE;
DROP TABLE IF EXISTS student_id_cards CASCADE;
DROP TABLE IF EXISTS student_profiles CASCADE;
DROP TABLE IF EXISTS announcements CASCADE;
DROP TABLE IF EXISTS competitions CASCADE;
DROP TABLE IF EXISTS admin_logs CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- ─── CREATE TABLES ─────────────────────────────────────────

CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  action TEXT,
  resource TEXT,
  details JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE student_profiles (
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

CREATE TABLE student_id_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  id_number TEXT,
  status TEXT DEFAULT 'ACTIVE',
  valid_thru TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE competitions (
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

CREATE TABLE competition_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  registered_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, competition_id)
);

CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT DEFAULT 'info',
  title TEXT NOT NULL,
  date TEXT,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- ─── INDEXES ───────────────────────────────────────────────

CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX idx_student_id_cards_user_id ON student_id_cards(user_id);
CREATE INDEX idx_competitions_status ON competitions(status);
CREATE INDEX idx_competition_reg_user ON competition_registrations(user_id);
CREATE INDEX idx_announcements_published ON announcements(is_published);

-- ─── ROW LEVEL SECURITY ────────────────────────────────────

ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs DISABLE ROW LEVEL SECURITY;

-- ─── RLS POLICIES ──────────────────────────────────────────

-- student_profiles
CREATE POLICY "student_own_profile" ON student_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "profile_public_read" ON student_profiles
  FOR SELECT USING (true);

CREATE POLICY "admin_delete_student_profiles" ON student_profiles
  FOR DELETE TO anon USING (true);

-- student_id_cards
CREATE POLICY "student_own_idcard" ON student_id_cards
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "idcard_public_read" ON student_id_cards
  FOR SELECT USING (true);

-- competitions
CREATE POLICY "competitions_public_read" ON competitions
  FOR SELECT USING (true);

CREATE POLICY "admin_full_access_competitions" ON competitions
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- competition_registrations
CREATE POLICY "competition_reg_own" ON competition_registrations
  FOR ALL USING (auth.uid() = user_id);

-- announcements
CREATE POLICY "announcements_public_read" ON announcements
  FOR SELECT USING (is_published = true);

CREATE POLICY "admin_full_access_announcements" ON announcements
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- ─── ADMIN SEED ────────────────────────────────────────────

INSERT INTO admins (email, password_hash, full_name, is_active)
VALUES ('admin@kaizenstat.com', 'KaizenAdmin@2026', 'KaizenStat Admin', true)
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- SUCCESS! All tables created fresh with correct schema.
-- ============================================================
