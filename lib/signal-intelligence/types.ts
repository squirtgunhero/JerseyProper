/**
 * Signal Intelligence Type Definitions
 */

// =============================================================================
// Provider Types
// =============================================================================

export interface MetaAdRecord {
  ad_id: string;
  page_name: string;
  page_id: string;
  ad_creative_body?: string;
  ad_creative_link_title?: string;
  ad_creative_link_description?: string;
  ad_delivery_start_time: string;
  ad_delivery_stop_time?: string;
  currency?: string;
  spend_lower?: number;
  spend_upper?: number;
  impressions_lower?: number;
  impressions_upper?: number;
  demographic_distribution?: Array<{
    age: string;
    gender: string;
    percentage: number;
  }>;
  publisher_platforms?: string[];
  creative_type?: 'image' | 'video' | 'carousel' | 'text';
}

export interface VisibilityRecord {
  platform: string;
  business_name: string;
  review_count: number;
  average_rating: number;
  photo_count: number;
  services_listed: string[];
  last_review_date?: string;
  profile_completeness: number; // 0-100
  response_rate?: number; // 0-100
  categories: string[];
}

export interface ContentRecord {
  url: string;
  title: string;
  published_date: string;
  word_count: number;
  topics: string[];
  content_type: 'blog' | 'landing' | 'case-study' | 'press-release' | 'other';
  engagement_signals?: {
    shares?: number;
    comments?: number;
    backlinks?: number;
  };
}

// =============================================================================
// Normalized Signal Record
// =============================================================================

export interface NormalizedSignal {
  category: 'ads' | 'visibility' | 'content';
  source: string;
  competitor_id?: string;
  payload: MetaAdRecord | VisibilityRecord | ContentRecord | Record<string, unknown>;
}

// =============================================================================
// Insight Types
// =============================================================================

export interface InsightCandidate {
  category: string;
  title: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  evidence: Record<string, unknown>;
}

// =============================================================================
// Brief Types
// =============================================================================

export interface BriefSection {
  title: string;
  content: string[];
}

export interface Brief {
  headline: string;
  sections: BriefSection[];
}

// =============================================================================
// Offer Archetype Classification
// =============================================================================

export type OfferArchetype = 'valuation' | 'seller' | 'buyer' | 'brand' | 'other';

export interface OfferClassification {
  archetype: OfferArchetype;
  confidence: number;
  matchedKeywords: string[];
}

// =============================================================================
// Visibility Risk Types
// =============================================================================

export interface VisibilityRisk {
  type: 'low_reviews' | 'low_photos' | 'missing_services' | 'low_completeness' | 'stale_reviews';
  severity: 'low' | 'medium' | 'high';
  details: string;
}

// =============================================================================
// Ad Analysis Types
// =============================================================================

export interface AdSurvivalAnalysis {
  ad_id: string;
  survival_days: number;
  is_long_running: boolean;
  creative_type: string;
  archetype: OfferArchetype;
}

export interface CreativeDistribution {
  type: string;
  count: number;
  percentage: number;
}

// =============================================================================
// Content Analysis Types
// =============================================================================

export interface ContentSurvivalCandidate {
  url: string;
  title: string;
  age_days: number;
  topics: string[];
  is_evergreen: boolean;
}

export interface TopicCluster {
  topic: string;
  frequency: number;
  examples: string[];
}
