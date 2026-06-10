# 🚨 CRITICAL: Supabase Setup Required

## The Problem
The website is failing because **the database tables don't exist in Supabase**. You deployed the code but didn't create the database schema.

Error: `Could not find the table 'public.student_profiles' in the schema cache`

## The Solution (5 minutes)

### Step 1: Go to Supabase Dashboard
- https://app.supabase.com
- Select project: **pdqytkydmbvepwiddwzb**

### Step 2: Open SQL Editor
- Click **SQL Editor** (left sidebar)
- Click **New Query**

### Step 3: Copy and Paste the SQL
Open this file and copy ALL the content:
```
QUICK_SETUP.sql
```

Or copy from: `/Users/masuddarrahaman/Desktop/files/kaizenstat-agency copy/QUICK_SETUP.sql`

### Step 4: Run the SQL
- Paste the entire SQL into the editor
- Click **Run** (or Cmd+Enter)
- Wait for it to complete (should say "Success")

### Step 5: Verify
Run this quick check in a new query:
```sql
SELECT COUNT(*) FROM student_profiles;
SELECT COUNT(*) FROM student_id_cards;
```

Both should return `0` (empty tables are fine - they'll fill as users sign up).

---

## ✅ After Running the SQL

**Now your website will work:**
1. Users can sign up
2. Users can fill their profile (Name, University, Major required)
3. Users can verify their email
4. Member ID Card is created with unique shortId (KS-ABCD1234)
5. QR code on card works and shows verification page

---

## 🆘 If You're Stuck

**Option A: Ask for help** — Copy the SQL file and send it to someone who can run it in Supabase

**Option B: Do it yourself:**
1. Go to https://app.supabase.com → pdqytkydmbvepwiddwzb
2. SQL Editor → New Query
3. Paste content from QUICK_SETUP.sql
4. Click Run

That's it! Literally 1 minute.

---

## ⚠️ Important Notes

- **Only run ONCE** — SQL has `IF NOT EXISTS` so it's safe to re-run
- **Don't modify anything** — Just copy-paste and run
- **All tables are created** — student_profiles, student_id_cards, competitions, announcements
- **RLS is enabled** — Security policies are in place
- **Public read is allowed** — For QR code verification

---

## After This

- Website will fully work ✅
- Users can generate ID cards ✅
- QR codes will verify ✅
- Admin panel will work ✅
