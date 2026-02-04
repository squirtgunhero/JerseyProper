/**
 * Real Meta Ad Library Provider
 * Fetches actual ads from Meta's Ad Library API
 * 
 * Setup:
 * 1. Create a Meta App at developers.facebook.com
 * 2. Get an access token with ads_read permission
 * 3. Set META_ACCESS_TOKEN in .env.local
 * 
 * API Docs: https://www.facebook.com/ads/library/api
 */

import type { MetaAdRecord, NormalizedSignal } from '../types';

const META_AD_LIBRARY_API = 'https://graph.facebook.com/v18.0/ads_archive';

/**
 * Convert params object to URLSearchParams
 */
function toSearchParams(params: Record<string, string | number | undefined>): URLSearchParams {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams;
}

interface MetaAdLibraryParams {
  access_token: string;
  search_terms?: string;
  ad_reached_countries: string;
  ad_active_status?: 'ACTIVE' | 'INACTIVE' | 'ALL';
  search_page_ids?: string;
  ad_delivery_date_min?: string;
  fields: string;
  limit?: number;
  [key: string]: string | number | undefined;
}

interface MetaAdLibraryResponse {
  data: Array<{
    id: string;
    page_id: string;
    page_name: string;
    ad_creative_bodies?: string[];
    ad_creative_link_titles?: string[];
    ad_creative_link_descriptions?: string[];
    ad_delivery_start_time: string;
    ad_delivery_stop_time?: string;
    currency?: string;
    spend?: { lower_bound: string; upper_bound: string };
    impressions?: { lower_bound: string; upper_bound: string };
    publisher_platforms?: string[];
    ad_creative_link_captions?: string[];
  }>;
  paging?: {
    cursors: { after: string };
    next?: string;
  };
}

/**
 * Fetch ads for a specific page/advertiser from Meta Ad Library
 */
export async function fetchMetaAdsForPage(
  pageId: string,
  options: {
    accessToken?: string;
    country?: string;
    activeOnly?: boolean;
    limit?: number;
  } = {}
): Promise<NormalizedSignal[]> {
  const accessToken = options.accessToken || process.env.META_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.warn('[MetaAdsReal] No META_ACCESS_TOKEN configured, skipping real ads fetch');
    return [];
  }

  const params: MetaAdLibraryParams = {
    access_token: accessToken,
    search_page_ids: pageId,
    ad_reached_countries: options.country || 'US',
    ad_active_status: options.activeOnly ? 'ACTIVE' : 'ALL',
    fields: [
      'id',
      'page_id',
      'page_name',
      'ad_creative_bodies',
      'ad_creative_link_titles',
      'ad_creative_link_descriptions',
      'ad_delivery_start_time',
      'ad_delivery_stop_time',
      'currency',
      'spend',
      'impressions',
      'publisher_platforms',
    ].join(','),
    limit: options.limit || 100,
  };

  const url = `${META_AD_LIBRARY_API}?${toSearchParams(params)}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      console.error('[MetaAdsReal] API error:', error);
      return [];
    }

    const data: MetaAdLibraryResponse = await response.json();
    
    return data.data.map(ad => ({
      category: 'ads' as const,
      source: 'meta_ad_library',
      payload: normalizeMetaAd(ad),
    }));
  } catch (error) {
    console.error('[MetaAdsReal] Fetch error:', error);
    return [];
  }
}

/**
 * Search ads by keyword/term
 */
export async function searchMetaAds(
  searchTerm: string,
  options: {
    accessToken?: string;
    country?: string;
    activeOnly?: boolean;
    limit?: number;
  } = {}
): Promise<NormalizedSignal[]> {
  const accessToken = options.accessToken || process.env.META_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.warn('[MetaAdsReal] No META_ACCESS_TOKEN configured');
    return [];
  }

  const params: MetaAdLibraryParams = {
    access_token: accessToken,
    search_terms: searchTerm,
    ad_reached_countries: options.country || 'US',
    ad_active_status: options.activeOnly ? 'ACTIVE' : 'ALL',
    fields: [
      'id',
      'page_id',
      'page_name',
      'ad_creative_bodies',
      'ad_creative_link_titles',
      'ad_creative_link_descriptions',
      'ad_delivery_start_time',
      'ad_delivery_stop_time',
      'publisher_platforms',
    ].join(','),
    limit: options.limit || 100,
  };

  const url = `${META_AD_LIBRARY_API}?${toSearchParams(params)}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      console.error('[MetaAdsReal] Search API error:', error);
      return [];
    }

    const data: MetaAdLibraryResponse = await response.json();
    
    return data.data.map(ad => ({
      category: 'ads' as const,
      source: 'meta_ad_library',
      payload: normalizeMetaAd(ad),
    }));
  } catch (error) {
    console.error('[MetaAdsReal] Search error:', error);
    return [];
  }
}

/**
 * Collect ads for multiple competitors
 */
export async function collectRealMetaAds(
  competitors: Array<{ name: string; metaPageId?: string }>
): Promise<NormalizedSignal[]> {
  const accessToken = process.env.META_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.log('[MetaAdsReal] META_ACCESS_TOKEN not configured, falling back to fixtures');
    return [];
  }

  const allSignals: NormalizedSignal[] = [];

  for (const competitor of competitors) {
    if (competitor.metaPageId) {
      // Fetch by page ID (most accurate)
      const signals = await fetchMetaAdsForPage(competitor.metaPageId, {
        accessToken,
        activeOnly: false,
        limit: 50,
      });
      allSignals.push(...signals);
    } else {
      // Search by name (less accurate but works without page ID)
      const signals = await searchMetaAds(competitor.name, {
        accessToken,
        activeOnly: false,
        limit: 25,
      });
      allSignals.push(...signals);
    }
  }

  console.log(`[MetaAdsReal] Collected ${allSignals.length} real ads`);
  return allSignals;
}

/**
 * Normalize Meta API response to our standard format
 */
function normalizeMetaAd(ad: MetaAdLibraryResponse['data'][0]): MetaAdRecord {
  return {
    ad_id: ad.id,
    page_name: ad.page_name,
    page_id: ad.page_id,
    ad_creative_body: ad.ad_creative_bodies?.[0],
    ad_creative_link_title: ad.ad_creative_link_titles?.[0],
    ad_creative_link_description: ad.ad_creative_link_descriptions?.[0],
    ad_delivery_start_time: ad.ad_delivery_start_time,
    ad_delivery_stop_time: ad.ad_delivery_stop_time,
    currency: ad.currency,
    spend_lower: ad.spend ? parseInt(ad.spend.lower_bound, 10) : undefined,
    spend_upper: ad.spend ? parseInt(ad.spend.upper_bound, 10) : undefined,
    impressions_lower: ad.impressions ? parseInt(ad.impressions.lower_bound, 10) : undefined,
    impressions_upper: ad.impressions ? parseInt(ad.impressions.upper_bound, 10) : undefined,
    publisher_platforms: ad.publisher_platforms,
    creative_type: 'image', // API doesn't always provide this, default to image
  };
}
