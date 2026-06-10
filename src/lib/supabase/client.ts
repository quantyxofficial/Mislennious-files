import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null;

// Certificate Supabase Project — lmjvkfyabdcainqkmmwt
// Used for: certificates, verification, allowed_emails, email
export function createClient() {
  if (supabaseInstance) return supabaseInstance;

  const url = import.meta.env.VITE_CERT_SUPABASE_URL;
  const key = import.meta.env.VITE_CERT_SUPABASE_KEY;

  if (!url || !key) {
    console.error('CERT SUPABASE ERROR: Missing VITE_CERT_SUPABASE_URL or VITE_CERT_SUPABASE_KEY');
  }

  supabaseInstance = createSupabaseClient(url || '', key || '');
  return supabaseInstance;
}
