import { describe, it, expect } from 'vitest';
import {
  classifyOfferArchetype,
  calculateAdSurvivalDays,
  assessVisibilityRisks,
} from '../deriveInsights';
import type { MetaAdRecord, VisibilityRecord } from '../types';

describe('classifyOfferArchetype', () => {
  it('should classify valuation-focused text', () => {
    const result = classifyOfferArchetype('Get your FREE home valuation today! Know what your property is worth.');
    expect(result.archetype).toBe('valuation');
    expect(result.confidence).toBeGreaterThan(0.5);
    expect(result.matchedKeywords.length).toBeGreaterThan(0);
    // Should match keywords like 'free home valuation', 'property value', etc.
    expect(result.matchedKeywords.some(kw => kw.includes('valuation') || kw.includes('property'))).toBe(true);
  });

  it('should classify seller-focused text', () => {
    const result = classifyOfferArchetype('Ready to sell your home? List with us and get top dollar for your property.');
    expect(result.archetype).toBe('seller');
    expect(result.matchedKeywords.length).toBeGreaterThan(0);
  });

  it('should classify buyer-focused text', () => {
    const result = classifyOfferArchetype('Looking for your dream home? First time buyer? We can help you find your perfect place.');
    expect(result.archetype).toBe('buyer');
    expect(result.matchedKeywords).toContain('dream home');
  });

  it('should classify brand-focused text', () => {
    const result = classifyOfferArchetype('Serving our community for 25 years. Award-winning service with a commitment to excellence.');
    expect(result.archetype).toBe('brand');
    expect(result.matchedKeywords).toContain('serving');
  });

  it('should return "other" for unclassifiable text', () => {
    const result = classifyOfferArchetype('Lorem ipsum dolor sit amet.');
    expect(result.archetype).toBe('other');
    expect(result.confidence).toBe(0.5);
    expect(result.matchedKeywords).toHaveLength(0);
  });

  it('should handle mixed content and pick the strongest match', () => {
    const result = classifyOfferArchetype('Free home valuation for sellers ready to list. Know your home worth before you sell.');
    // Should pick valuation as it has more keyword matches
    expect(['valuation', 'seller']).toContain(result.archetype);
  });

  it('should be case insensitive', () => {
    const result = classifyOfferArchetype('FREE HOME VALUATION NOW!');
    expect(result.archetype).toBe('valuation');
  });
});

describe('calculateAdSurvivalDays', () => {
  it('should calculate days for an active ad', () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const ad: MetaAdRecord = {
      ad_id: 'test_001',
      page_name: 'Test Page',
      page_id: 'page_001',
      ad_delivery_start_time: thirtyDaysAgo.toISOString(),
      ad_delivery_stop_time: undefined,
    };

    const days = calculateAdSurvivalDays(ad);
    expect(days).toBe(30);
  });

  it('should calculate days for a completed ad', () => {
    const ad: MetaAdRecord = {
      ad_id: 'test_002',
      page_name: 'Test Page',
      page_id: 'page_001',
      ad_delivery_start_time: '2025-01-01T00:00:00Z',
      ad_delivery_stop_time: '2025-01-15T00:00:00Z',
    };

    const days = calculateAdSurvivalDays(ad);
    expect(days).toBe(14);
  });

  it('should return 0 for same-day ads', () => {
    const now = new Date().toISOString();
    
    const ad: MetaAdRecord = {
      ad_id: 'test_003',
      page_name: 'Test Page',
      page_id: 'page_001',
      ad_delivery_start_time: now,
      ad_delivery_stop_time: now,
    };

    const days = calculateAdSurvivalDays(ad);
    expect(days).toBe(0);
  });

  it('should handle invalid dates gracefully', () => {
    const ad: MetaAdRecord = {
      ad_id: 'test_004',
      page_name: 'Test Page',
      page_id: 'page_001',
      ad_delivery_start_time: 'invalid-date',
    };

    // Should not throw
    const days = calculateAdSurvivalDays(ad);
    expect(typeof days).toBe('number');
  });
});

describe('assessVisibilityRisks', () => {
  it('should flag low review count', () => {
    const profile: VisibilityRecord = {
      platform: 'google_business',
      business_name: 'Test Business',
      review_count: 3,
      average_rating: 4.5,
      photo_count: 20,
      services_listed: ['service1'],
      profile_completeness: 80,
      categories: [],
    };

    const risks = assessVisibilityRisks(profile);
    const lowReviewRisk = risks.find(r => r.type === 'low_reviews');
    
    expect(lowReviewRisk).toBeDefined();
    expect(lowReviewRisk?.severity).toBe('high'); // < 5 reviews
  });

  it('should flag low photo count', () => {
    const profile: VisibilityRecord = {
      platform: 'google_business',
      business_name: 'Test Business',
      review_count: 50,
      average_rating: 4.5,
      photo_count: 0,
      services_listed: ['service1'],
      profile_completeness: 80,
      categories: [],
    };

    const risks = assessVisibilityRisks(profile);
    const lowPhotoRisk = risks.find(r => r.type === 'low_photos');
    
    expect(lowPhotoRisk).toBeDefined();
    expect(lowPhotoRisk?.severity).toBe('high'); // 0 photos
  });

  it('should flag missing services', () => {
    const profile: VisibilityRecord = {
      platform: 'google_business',
      business_name: 'Test Business',
      review_count: 50,
      average_rating: 4.5,
      photo_count: 20,
      services_listed: [],
      profile_completeness: 80,
      categories: [],
    };

    const risks = assessVisibilityRisks(profile);
    const missingServicesRisk = risks.find(r => r.type === 'missing_services');
    
    expect(missingServicesRisk).toBeDefined();
  });

  it('should flag low profile completeness', () => {
    const profile: VisibilityRecord = {
      platform: 'google_business',
      business_name: 'Test Business',
      review_count: 50,
      average_rating: 4.5,
      photo_count: 20,
      services_listed: ['service1'],
      profile_completeness: 40,
      categories: [],
    };

    const risks = assessVisibilityRisks(profile);
    const lowCompletenessRisk = risks.find(r => r.type === 'low_completeness');
    
    expect(lowCompletenessRisk).toBeDefined();
    expect(lowCompletenessRisk?.severity).toBe('high'); // < 50%
  });

  it('should flag stale reviews', () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const profile: VisibilityRecord = {
      platform: 'google_business',
      business_name: 'Test Business',
      review_count: 50,
      average_rating: 4.5,
      photo_count: 20,
      services_listed: ['service1'],
      profile_completeness: 80,
      last_review_date: sixMonthsAgo.toISOString(),
      categories: [],
    };

    const risks = assessVisibilityRisks(profile);
    const staleReviewRisk = risks.find(r => r.type === 'stale_reviews');
    
    expect(staleReviewRisk).toBeDefined();
    expect(staleReviewRisk?.severity).toBe('high'); // > 180 days
  });

  it('should return no risks for healthy profile', () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 7);
    
    const profile: VisibilityRecord = {
      platform: 'google_business',
      business_name: 'Test Business',
      review_count: 100,
      average_rating: 4.8,
      photo_count: 50,
      services_listed: ['service1', 'service2', 'service3'],
      profile_completeness: 95,
      last_review_date: recentDate.toISOString(),
      categories: ['Real Estate'],
    };

    const risks = assessVisibilityRisks(profile);
    expect(risks).toHaveLength(0);
  });
});
