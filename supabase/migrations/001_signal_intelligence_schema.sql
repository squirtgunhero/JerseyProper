-- Signal Intelligence Schema
-- Migration: 001_signal_intelligence_schema.sql
-- Created: 2024

-- =============================================================================
-- Competitors table
-- =============================================================================
CREATE TABLE IF NOT EXISTS competitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    website TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_competitors_name ON competitors(name);

-- =============================================================================
-- Signal Runs table
-- =============================================================================
CREATE TABLE IF NOT EXISTS signal_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    finished_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    triggered_by TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_signal_runs_status ON signal_runs(status);
CREATE INDEX IF NOT EXISTS idx_signal_runs_created_at ON signal_runs(created_at DESC);

-- =============================================================================
-- Raw Signals table
-- =============================================================================
CREATE TABLE IF NOT EXISTS raw_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id UUID NOT NULL REFERENCES signal_runs(id) ON DELETE CASCADE,
    competitor_id UUID REFERENCES competitors(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    source TEXT NOT NULL,
    payload JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_raw_signals_run_id ON raw_signals(run_id);
CREATE INDEX IF NOT EXISTS idx_raw_signals_competitor_id ON raw_signals(competitor_id);
CREATE INDEX IF NOT EXISTS idx_raw_signals_category ON raw_signals(category);
CREATE INDEX IF NOT EXISTS idx_raw_signals_source ON raw_signals(source);

-- =============================================================================
-- Derived Insights table
-- =============================================================================
CREATE TABLE IF NOT EXISTS derived_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id UUID NOT NULL REFERENCES signal_runs(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'low', 'medium', 'high', 'critical')),
    summary TEXT NOT NULL,
    evidence JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_derived_insights_run_id ON derived_insights(run_id);
CREATE INDEX IF NOT EXISTS idx_derived_insights_category ON derived_insights(category);
CREATE INDEX IF NOT EXISTS idx_derived_insights_severity ON derived_insights(severity);

-- =============================================================================
-- Signal Briefs table
-- =============================================================================
CREATE TABLE IF NOT EXISTS signal_briefs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id UUID NOT NULL REFERENCES signal_runs(id) ON DELETE CASCADE,
    audience TEXT DEFAULT 'executive',
    headline TEXT NOT NULL,
    body_md TEXT NOT NULL,
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_signal_briefs_run_id ON signal_briefs(run_id);
CREATE INDEX IF NOT EXISTS idx_signal_briefs_audience ON signal_briefs(audience);

-- =============================================================================
-- Row Level Security (optional - enable when using Supabase Auth)
-- =============================================================================
-- Uncomment these when ready to enable RLS:
-- ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE signal_runs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE raw_signals ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE derived_insights ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE signal_briefs ENABLE ROW LEVEL SECURITY;
