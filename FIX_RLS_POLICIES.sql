-- Fix RLS policies: only show announcements/competitions if admin has explicitly created them
-- Run this in Supabase SQL Editor (pdqytkydmbvepwiddwzb)

-- Drop old overly-permissive policies
DROP POLICY IF EXISTS "competitions_public_read" ON competitions;
DROP POLICY IF EXISTS "announcements_public_read" ON announcements;

-- New policies: only admins can create/edit/delete, authenticated users can only read published ones
-- (but if table is empty, students see nothing)

-- Competitions: authenticated users can only read (admins create via anon key)
CREATE POLICY "competitions_read" ON competitions
  FOR SELECT TO authenticated USING (true);

-- Announcements: authenticated users can only read published (admins create via anon key)
CREATE POLICY "announcements_read" ON announcements
  FOR SELECT TO authenticated USING (is_published = true);

-- Admin (anon role) still has full access to manage both
-- (these already exist, just keeping them)
-- CREATE POLICY "admin_full_access_competitions" ON competitions
--   FOR ALL TO anon USING (true) WITH CHECK (true);
-- CREATE POLICY "admin_full_access_announcements" ON announcements
--   FOR ALL TO anon USING (true) WITH CHECK (true);
