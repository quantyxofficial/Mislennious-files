-- Clear all demo announcements and competitions
-- Run this in Supabase SQL Editor (pdqytkydmbvepwiddwzb)

-- Delete all announcements
DELETE FROM announcements;

-- Delete all competitions (this will cascade delete competition_registrations)
DELETE FROM competitions;

-- Verify they're empty
SELECT 'Announcements deleted' as status, COUNT(*) as count FROM announcements
UNION ALL
SELECT 'Competitions deleted', COUNT(*) FROM competitions;
