/**
 * Browser-side Supabase client
 * Uses anon key with RLS for secure client-side access
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './server';

let supabaseBrowser: SupabaseClient<Database> | null = null;

/**
 * Get the browser-side Supabase client
 * Uses anon key - all queries are subject to RLS policies
 */
export function getSupabaseBrowser(): SupabaseClient<Database> {
  if (supabaseBrowser) {
    return supabaseBrowser;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }

  if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  }

  supabaseBrowser = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });

  return supabaseBrowser;
}

// Re-export types for convenience
export type { Database, Competitor, SignalRun, RawSignal, DerivedInsight, SignalBrief } from './server';
