/**
 * Server-side Supabase client
 * Uses service role key for full database access
 * NEVER import this file in client-side code
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseAdmin: SupabaseClient | null = null;

/**
 * Get the server-side Supabase client with service role privileges
 * This client bypasses RLS and has full database access
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdmin) {
    return supabaseAdmin;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL environment variable');
  }

  if (!supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseAdmin;
}

/**
 * Type definitions for Signal Intelligence tables
 */
export interface Competitor {
  id: string;
  name: string;
  website: string | null;
  notes: string | null;
  created_at: string;
}

export interface SignalRun {
  id: string;
  started_at: string;
  finished_at: string | null;
  status: 'pending' | 'running' | 'completed' | 'failed';
  triggered_by: string | null;
  created_at: string;
}

export interface RawSignal {
  id: string;
  run_id: string;
  competitor_id: string | null;
  category: string;
  source: string;
  payload: Record<string, unknown>;
  created_at: string;
}

export interface DerivedInsight {
  id: string;
  run_id: string;
  category: string;
  title: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  evidence: Record<string, unknown>;
  created_at: string;
}

export interface SignalBrief {
  id: string;
  run_id: string;
  audience: string;
  headline: string;
  body_md: string;
  created_by: string | null;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      competitors: {
        Row: Competitor;
        Insert: Omit<Competitor, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Competitor, 'id'>>;
      };
      signal_runs: {
        Row: SignalRun;
        Insert: Omit<SignalRun, 'id' | 'created_at' | 'started_at'> & { id?: string; created_at?: string; started_at?: string };
        Update: Partial<Omit<SignalRun, 'id'>>;
      };
      raw_signals: {
        Row: RawSignal;
        Insert: Omit<RawSignal, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<RawSignal, 'id'>>;
      };
      derived_insights: {
        Row: DerivedInsight;
        Insert: Omit<DerivedInsight, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<DerivedInsight, 'id'>>;
      };
      signal_briefs: {
        Row: SignalBrief;
        Insert: Omit<SignalBrief, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<SignalBrief, 'id'>>;
      };
    };
  };
};
