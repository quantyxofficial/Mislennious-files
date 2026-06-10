# Vercel Deployment Setup Guide

## Critical: Environment Variables Required

Your Vercel deployment shows a black screen because **Supabase environment variables are missing**.

### Step 1: Add Environment Variables to Vercel

1. Go to your project: https://vercel.com/quantyxofficial/mislennious-files
2. Click **Settings** → **Environment Variables**
3. Add these variables for **all environments** (Production, Preview, Development):

```
VITE_SUPABASE_URL = https://pdqytkydmbvepwiddwzb.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = sb_publishable_FR6jRX1iNSVZpsjlNnqugw_MYjkWR3f
VITE_CERT_SUPABASE_URL = https://lmjvkfyabdcainqkmmwt.supabase.co
VITE_CERT_SUPABASE_KEY = sb_publishable_TxR8bWf3klkOiyYyrabIyg_PsxMSspe
```

### Step 2: Redeploy

After adding environment variables:
1. Click **Deployments**
2. Find the latest failed deployment
3. Click **Redeploy** or push a new commit to trigger a rebuild

### Step 3: Verify

Once redeployed:
- Homepage should load with the KaizenStat landing page
- Member Dashboard should be accessible
- Admin panel should be accessible at `/admin/login`

## Security Note

⚠️ **IMPORTANT**: The old admin password (QuantyX@MyAlu.C0m) was exposed in the git history.

**IMMEDIATE ACTION REQUIRED:**
1. Update the admin password in Supabase:
   ```sql
   UPDATE admins 
   SET password_hash = 'YOUR_NEW_SECURE_PASSWORD'
   WHERE email = 'admin@kaizenstat.com';
   ```
2. Rotate any other secrets in your Supabase project
3. Consider using GitHub's secret scanning to detect future leaks

## Troubleshooting

If you still see a black screen after adding env vars:

1. **Check browser console** (F12) for errors
2. **Check Vercel logs**: Deployments → Click deployment → View logs
3. **Force redeploy**: 
   ```bash
   git commit --allow-empty -m "force redeploy"
   git push origin main
   ```

## Development Locally

To run locally with env vars:
```bash
cp .env.example .env.local
# Edit .env.local with your actual Supabase keys
npm run dev
```
