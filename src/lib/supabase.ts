import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
  import.meta.env?.SUPABASE_URL ||
  import.meta.env?.PUBLIC_SUPABASE_URL ||
  '';

const supabaseAnonKey =
  (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
  import.meta.env?.SUPABASE_ANON_KEY ||
  import.meta.env?.PUBLIC_SUPABASE_ANON_KEY ||
  '';

const supabaseServiceKey =
  (typeof process !== 'undefined' && process.env?.SUPABASE_SERVICE_ROLE_KEY) ||
  import.meta.env?.SUPABASE_SERVICE_ROLE_KEY ||
  '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are not fully defined in the environment. Please check your .env file.');
}

// Standard client for public/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations that need to bypass RLS (Row-Level Security)
export const supabaseAdmin = 
  (typeof window === 'undefined' && supabaseServiceKey)
    ? createClient(supabaseUrl, supabaseServiceKey)
    : supabase;
