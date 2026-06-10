-- ============================================================
-- KaizenStat Dashboard Database — FINAL PRODUCTION SCHEMA
-- Project: pdqytkydmbvepwiddwzb
-- Safe to run multiple times (idempotent)
-- ============================================================

-- ─── TABLES ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  action TEXT,
  resource TEXT,
  details JSONB,
  created_at TIMESTAMP DEFAULT now()
);

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

CREATE TABLE IF NOT EXISTS competition_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  registered_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, competition_id)
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

-- ─── INDEXES ───────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_student_profiles_university ON student_profiles(university);
CREATE INDEX IF NOT EXISTS idx_student_id_cards_user_id ON student_id_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_competitions_status ON competitions(status);
CREATE INDEX IF NOT EXISTS idx_competition_reg_user ON competition_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(is_published);

-- ─── ROW LEVEL SECURITY ────────────────────────────────────

ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs DISABLE ROW LEVEL SECURITY;

-- ─── DROP EXISTING POLICIES ────────────────────────────────

DROP POLICY IF EXISTS "student_own_profile" ON student_profiles;
DROP POLICY IF EXISTS "profile_public_read" ON student_profiles;
DROP POLICY IF EXISTS "student_own_idcard" ON student_id_cards;
DROP POLICY IF EXISTS "idcard_public_read" ON student_id_cards;
DROP POLICY IF EXISTS "competitions_public_read" ON competitions;
DROP POLICY IF EXISTS "competition_reg_own" ON competition_registrations;
DROP POLICY IF EXISTS "announcements_public_read" ON announcements;
DROP POLICY IF EXISTS "admin_full_access_competitions" ON competitions;
DROP POLICY IF EXISTS "admin_full_access_announcements" ON announcements;
DROP POLICY IF EXISTS "admin_delete_student_profiles" ON student_profiles;

-- ─── CREATE NEW POLICIES ───────────────────────────────────

-- Students can read/write their own profile
CREATE POLICY "student_own_profile" ON student_profiles
  FOR ALL USING (auth.uid() = user_id);

-- Public read for member verification (via QR code scan)
CREATE POLICY "profile_public_read" ON student_profiles
  FOR SELECT USING (true);

-- Students can read/write their own, but anyone can read (for QR verification)
CREATE POLICY "student_own_idcard" ON student_id_cards
  FOR ALL USING (auth.uid() = user_id);

-- Public read for QR code verification (anyone can scan & verify)
CREATE POLICY "idcard_public_read" ON student_id_cards
  FOR SELECT USING (true);

-- Anyone can read competitions
CREATE POLICY "competitions_public_read" ON competitions
  FOR SELECT USING (true);

-- Admin (anon role) can fully manage competitions
CREATE POLICY "admin_full_access_competitions" ON competitions
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- Student can manage their own registrations
CREATE POLICY "competition_reg_own" ON competition_registrations
  FOR ALL USING (auth.uid() = user_id);

-- Anyone can read published announcements
CREATE POLICY "announcements_public_read" ON announcements
  FOR SELECT USING (is_published = true);

-- Admin (anon role) can fully manage announcements
CREATE POLICY "admin_full_access_announcements" ON announcements
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- Admin (anon role) can delete student profiles
CREATE POLICY "admin_delete_student_profiles" ON student_profiles
  FOR DELETE TO anon USING (true);

-- ─── SEED DATA ─────────────────────────────────────────────

-- Admin user (password: [REDACTED - SET YOUR OWN PASSWORD IN SUPABASE])
INSERT INTO admins (email, password_hash, full_name, is_active)
VALUES ('admin@kaizenstat.com', '[REDACTED - SET YOUR OWN PASSWORD IN SUPABASE]', 'KaizenStat Admin', true)
ON CONFLICT (email) DO NOTHING;

-- ─── CLEANUP ────────────────────────────────────────────────

-- Clear seed announcements and competitions (empty state for production)
TRUNCATE announcements RESTART IDENTITY CASCADE;
TRUNCATE competitions RESTART IDENTITY CASCADE;

-- ============================================================
-- Schema is now ready for production
-- ============================================================
