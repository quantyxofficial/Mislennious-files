
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (!url || !key) {
    console.error('SUPABASE ERROR: Missing environment variables VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY');
    // Fallback for debugging - but better to fix .env
  }

  return createSupabaseClient(url || '', key || '');
}
