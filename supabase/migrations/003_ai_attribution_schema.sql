-- AI Attribution Tracker Schema
-- Tracks AI-driven traffic and citations

-- =============================================================================
-- Users Table (AI Attribution specific)
-- =============================================================================
CREATE TABLE IF NOT EXISTS attribution_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    website_url TEXT NOT NULL,
    api_key TEXT UNIQUE NOT NULL,
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    alerts_enabled BOOLEAN DEFAULT true,
    daily_summary_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- AI Visits Table
-- =============================================================================
CREATE TABLE IF NOT EXISTS ai_visits (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES attribution_users(id) ON DELETE CASCADE,
    source TEXT NOT NULL,  -- 'ChatGPT', 'Claude', 'Perplexity', 'AI-Likely', etc.
    confidence TEXT NOT NULL CHECK (confidence IN ('confirmed', 'probable', 'possible')),
    page TEXT NOT NULL,
    full_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    session_id TEXT,
    citation_context TEXT,  -- What the AI said when referring
    detection_method TEXT,  -- 'user_agent', 'referrer', 'url_param', 'behavioral'
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- Conversions Table
-- =============================================================================
CREATE TABLE IF NOT EXISTS conversions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES attribution_users(id) ON DELETE CASCADE,
    visit_id INTEGER REFERENCES ai_visits(id) ON DELETE SET NULL,
    ai_source TEXT,
    session_id TEXT NOT NULL,
    value DECIMAL(10,2) DEFAULT 0,
    event_type TEXT NOT NULL,  -- 'signup', 'purchase', 'contact', 'download', etc.
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- Citation Alerts Table
-- =============================================================================
CREATE TABLE IF NOT EXISTS citation_alerts (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES attribution_users(id) ON DELETE CASCADE,
    ai_source TEXT NOT NULL,
    page TEXT NOT NULL,
    count INTEGER NOT NULL,
    time_window_start TIMESTAMPTZ NOT NULL,
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    alert_sent BOOLEAN DEFAULT false,
    alert_sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, ai_source, page, count)
);

-- =============================================================================
-- Daily Summary Tracking
-- =============================================================================
CREATE TABLE IF NOT EXISTS daily_summaries (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES attribution_users(id) ON DELETE CASCADE,
    summary_date DATE NOT NULL,
    total_visits INTEGER DEFAULT 0,
    confirmed_citations INTEGER DEFAULT 0,
    breakdown JSONB DEFAULT '{}',  -- {ChatGPT: 50, Claude: 30, ...}
    top_pages JSONB DEFAULT '[]',  -- [{page: '/pricing', count: 100}, ...]
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, summary_date)
);

-- =============================================================================
-- Indexes for Performance
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_ai_visits_user_id ON ai_visits(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_visits_timestamp ON ai_visits(timestamp);
CREATE INDEX IF NOT EXISTS idx_ai_visits_source ON ai_visits(source);
CREATE INDEX IF NOT EXISTS idx_ai_visits_confidence ON ai_visits(confidence);
CREATE INDEX IF NOT EXISTS idx_ai_visits_session ON ai_visits(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_visits_user_timestamp ON ai_visits(user_id, timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_conversions_user_id ON conversions(user_id);
CREATE INDEX IF NOT EXISTS idx_conversions_session ON conversions(session_id);
CREATE INDEX IF NOT EXISTS idx_conversions_timestamp ON conversions(timestamp);

CREATE INDEX IF NOT EXISTS idx_citation_alerts_user ON citation_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_citation_alerts_unsent ON citation_alerts(user_id, alert_sent) WHERE alert_sent = false;

CREATE INDEX IF NOT EXISTS idx_attribution_users_api_key ON attribution_users(api_key);
CREATE INDEX IF NOT EXISTS idx_attribution_users_email ON attribution_users(email);

-- =============================================================================
-- Function to check citation thresholds
-- =============================================================================
CREATE OR REPLACE FUNCTION check_citation_threshold()
RETURNS TRIGGER AS $$
DECLARE
    visit_count INTEGER;
    threshold INTEGER;
    thresholds INTEGER[] := ARRAY[5, 10, 25, 50, 100];
    user_alerts_enabled BOOLEAN;
    window_start TIMESTAMPTZ;
BEGIN
    -- Only process confirmed visits
    IF NEW.confidence != 'confirmed' THEN
        RETURN NEW;
    END IF;

    -- Check if user has alerts enabled
    SELECT alerts_enabled INTO user_alerts_enabled
    FROM attribution_users
    WHERE id = NEW.user_id;

    IF NOT user_alerts_enabled THEN
        RETURN NEW;
    END IF;

    -- Calculate time window (last hour)
    window_start := NOW() - INTERVAL '1 hour';

    -- Count visits in the last hour for this source and page
    SELECT COUNT(*) INTO visit_count
    FROM ai_visits
    WHERE user_id = NEW.user_id
      AND source = NEW.source
      AND page = NEW.page
      AND timestamp >= window_start
      AND confidence = 'confirmed';

    -- Check each threshold
    FOREACH threshold IN ARRAY thresholds LOOP
        IF visit_count = threshold THEN
            -- Insert alert record (or update if exists)
            INSERT INTO citation_alerts (user_id, ai_source, page, count, time_window_start)
            VALUES (NEW.user_id, NEW.source, NEW.page, threshold, window_start)
            ON CONFLICT (user_id, ai_source, page, count) 
            DO UPDATE SET last_seen = NOW();
            EXIT;
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_check_citation_threshold ON ai_visits;
CREATE TRIGGER trigger_check_citation_threshold
    AFTER INSERT ON ai_visits
    FOR EACH ROW
    EXECUTE FUNCTION check_citation_threshold();

-- =============================================================================
-- Function to clean up old data for free tier users (7-day retention)
-- =============================================================================
CREATE OR REPLACE FUNCTION cleanup_free_tier_data()
RETURNS void AS $$
BEGIN
    -- Delete visits older than 7 days for free users
    DELETE FROM ai_visits
    WHERE user_id IN (
        SELECT id FROM attribution_users WHERE plan = 'free'
    )
    AND timestamp < NOW() - INTERVAL '7 days';

    -- Delete conversions older than 7 days for free users
    DELETE FROM conversions
    WHERE user_id IN (
        SELECT id FROM attribution_users WHERE plan = 'free'
    )
    AND timestamp < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- Row Level Security Policies
-- =============================================================================
ALTER TABLE attribution_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE citation_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_summaries ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY "Service role full access on attribution_users" ON attribution_users
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on ai_visits" ON ai_visits
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on conversions" ON conversions
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on citation_alerts" ON citation_alerts
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on daily_summaries" ON daily_summaries
    FOR ALL USING (true) WITH CHECK (true);
