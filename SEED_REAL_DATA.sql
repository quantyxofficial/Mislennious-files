-- Seed real announcements and competitions into Supabase
-- Run this in Supabase SQL Editor (pdqytkydmbvepwiddwzb)

-- Clear existing data first
DELETE FROM competition_registrations;
DELETE FROM competitions;
DELETE FROM announcements;

-- ─── INSERT ANNOUNCEMENTS ─────────────────────────────────

INSERT INTO announcements (type, title, date, content, is_published)
VALUES (
  'info',
  'Welcome to KaizenStat Member Dashboard',
  '2026-06-12',
  'Welcome to your personalized member dashboard! Here you can manage your profile, view upcoming competitions, stay updated with announcements, and generate your unique virtual ID card. Let''s build something amazing together.',
  true
);

-- ─── INSERT COMPETITIONS ──────────────────────────────────

-- Logo Design Competition (CLOSED)
INSERT INTO competitions (title, description, prize, deadline, participants, status, color)
VALUES (
  'Logo Designing Competition',
  'Completed Oct 2025. A competitive platform where designers showcased creative logos for KaizenStat. Selected designs represented our community''s spirit of continuous improvement and innovation.',
  'Recognition + Design Features',
  'Oct 2025 (Closed)',
  100,
  'closed',
  'purple'
);

-- Tech Blog Writing Internship (CLOSED)
INSERT INTO competitions (title, description, prize, deadline, participants, status, color)
VALUES (
  'Tech Blog Internship',
  'Completed May 2026. Technical writing internship focused on ML, data science, and software engineering articles for the KaizenStat platform. Selected writers received internship offers and publication credits.',
  'Internship + Stipend',
  'May 2026 (Closed)',
  182,
  'closed',
  'cyan'
);

-- Verify data was inserted
SELECT 'Announcements:' as section, COUNT(*) as count FROM announcements
UNION ALL
SELECT 'Competitions:', COUNT(*) FROM competitions;
