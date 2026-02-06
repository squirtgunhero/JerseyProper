/**
 * AI Attribution Tracker - Type Definitions
 */

// =============================================================================
// Database Types
// =============================================================================

export interface AttributionUser {
  id: string;
  email: string;
  password_hash: string;
  website_url: string;
  api_key: string;
  plan: 'free' | 'pro' | 'enterprise';
  alerts_enabled: boolean;
  daily_summary_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIVisit {
  id: number;
  user_id: string;
  source: string;
  confidence: 'confirmed' | 'probable' | 'possible';
  page: string;
  full_url: string | null;
  referrer: string | null;
  user_agent: string | null;
  ip_address: string | null;
  session_id: string | null;
  citation_context: string | null;
  detection_method: string | null;
  timestamp: string;
}

export interface Conversion {
  id: number;
  user_id: string;
  visit_id: number | null;
  ai_source: string | null;
  session_id: string;
  value: number;
  event_type: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface CitationAlert {
  id: number;
  user_id: string;
  ai_source: string;
  page: string;
  count: number;
  time_window_start: string;
  last_seen: string;
  alert_sent: boolean;
  alert_sent_at: string | null;
  created_at: string;
}

export interface DailySummary {
  id: number;
  user_id: string;
  summary_date: string;
  total_visits: number;
  confirmed_citations: number;
  breakdown: Record<string, number>;
  top_pages: Array<{ page: string; count: number }>;
  sent_at: string | null;
  created_at: string;
}

// =============================================================================
// API Request/Response Types
// =============================================================================

export interface TrackRequest {
  api_key: string;
  source: string;
  confidence: 'confirmed' | 'probable' | 'possible';
  page: string;
  full_url?: string;
  referrer?: string;
  user_agent?: string;
  session_id?: string;
  citation_context?: string;
  detection_method?: string;
  timestamp?: string;
}

export interface TrackResponse {
  success: boolean;
  visit_id?: number;
  error?: string;
}

export interface ConversionRequest {
  api_key: string;
  session_id: string;
  event_type: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

export interface ConversionResponse {
  success: boolean;
  conversion_id?: number;
  attributed_source?: string;
  error?: string;
}

// =============================================================================
// Dashboard Types
// =============================================================================

export interface DashboardStats {
  totalVisits: number;
  confirmedCitations: number;
  uniqueSources: number;
  uniquePages: number;
  visitsTrend: number; // percentage change from previous period
}

export interface SourceBreakdown {
  source: string;
  count: number;
  percentage: number;
  confirmed: number;
  probable: number;
  possible: number;
}

export interface PageStats {
  page: string;
  count: number;
  sources: string[];
}

export interface TimeSeriesData {
  date: string;
  total: number;
  bySource: Record<string, number>;
}

export interface ConversionStats {
  total: number;
  totalValue: number;
  bySource: Array<{
    source: string;
    conversions: number;
    value: number;
    conversionRate: number;
  }>;
}

// =============================================================================
// Detection Types
// =============================================================================

export interface AIDetectionResult {
  source: string;
  confidence: 'confirmed' | 'probable' | 'possible';
  method: 'user_agent' | 'referrer' | 'url_param' | 'behavioral';
  context?: string;
}

export const AI_SOURCES = {
  CHATGPT: 'ChatGPT',
  CLAUDE: 'Claude',
  PERPLEXITY: 'Perplexity',
  BING_CHAT: 'Bing Chat',
  YOU_COM: 'You.com',
  POE: 'Poe',
  BARD: 'Google Bard',
  COHERE: 'Cohere',
  AI_LIKELY: 'AI-Likely',
  UNKNOWN: 'Unknown AI',
} as const;

export type AISource = typeof AI_SOURCES[keyof typeof AI_SOURCES];

// =============================================================================
// Alert Thresholds
// =============================================================================

export const ALERT_THRESHOLDS = [5, 10, 25, 50, 100] as const;

export type AlertThreshold = typeof ALERT_THRESHOLDS[number];

// =============================================================================
// Plan Limits
// =============================================================================

export const PLAN_LIMITS = {
  free: {
    retention_days: 7,
    conversions: false,
    api_access: false,
    rate_limit_per_hour: 1000,
  },
  pro: {
    retention_days: 365,
    conversions: true,
    api_access: false,
    rate_limit_per_hour: 10000,
  },
  enterprise: {
    retention_days: -1, // unlimited
    conversions: true,
    api_access: true,
    rate_limit_per_hour: 100000,
  },
} as const;
