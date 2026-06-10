import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ SUPABASE CREDENTIALS MISSING!');
  console.error('URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
  console.error('Key:', supabaseAnonKey ? '✓ Set' : '✗ Missing');
  console.error('Expected VITE_SUPABASE_URL =', import.meta.env.VITE_SUPABASE_URL);
  console.error('Expected VITE_SUPABASE_PUBLISHABLE_KEY =', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
} else {
  console.log('✅ Supabase connected:', supabaseUrl.split('.')[0]);
}

// Export the Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
