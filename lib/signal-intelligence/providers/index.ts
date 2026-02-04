/**
 * Signal Intelligence Providers Index
 * Aggregates all signal collection providers
 * 
 * Uses real data providers when API keys are configured,
 * falls back to fixture data otherwise.
 */

import { collectMetaAds } from './metaAds';
import { collectVisibilitySignals } from './visibility';
import { collectContentSignals } from './content';
import { collectRealMetaAds } from './metaAdsReal';
import { collectRealVisibilityData } from './googlePlaces';
import { collectRealContentData } from './blogScraper';
import { getSupabaseAdmin } from '../../supabase/server';
import type { NormalizedSignal } from '../types';

export interface ProviderResult {
  name: string;
  signals: NormalizedSignal[];
  error?: string;
  source: 'real' | 'fixture';
}

interface Competitor {
  id: string;
  name: string;
  website: string | null;
  notes: string | null;
}

/**
 * Fetch competitors from the database
 */
async function getCompetitors(): Promise<Competitor[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('competitors')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('[Providers] Error fetching competitors:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('[Providers] Failed to fetch competitors:', error);
    return [];
  }
}

/**
 * Check if real data providers are configured
 */
function hasRealProviders() {
  return {
    metaAds: !!process.env.META_ACCESS_TOKEN,
    googlePlaces: !!process.env.GOOGLE_PLACES_API_KEY,
    // Blog scraping doesn't need API keys
    blogScraper: true,
  };
}

/**
 * Run all signal collectors and aggregate results
 * Prefers real data when API keys are configured
 */
export async function runAllCollectors(): Promise<ProviderResult[]> {
  const results: ProviderResult[] = [];
  const providers = hasRealProviders();
  const competitors = await getCompetitors();
  
  console.log(`[Providers] Found ${competitors.length} competitors to track`);
  console.log(`[Providers] Real providers: Meta=${providers.metaAds}, Google=${providers.googlePlaces}, Blog=${providers.blogScraper}`);

  // ==========================================================================
  // Meta Ads Collection
  // ==========================================================================
  try {
    let metaSignals: NormalizedSignal[] = [];
    let metaSource: 'real' | 'fixture' = 'fixture';
    
    if (providers.metaAds && competitors.length > 0) {
      // Try real Meta Ads API
      metaSignals = await collectRealMetaAds(
        competitors.map(c => ({ name: c.name }))
      );
      metaSource = 'real';
    }
    
    // Fall back to fixtures if no real data
    if (metaSignals.length === 0) {
      metaSignals = await collectMetaAds();
      metaSource = 'fixture';
    }
    
    results.push({
      name: 'meta_ads',
      signals: metaSignals,
      source: metaSource,
    });
  } catch (error) {
    console.error('[Providers] Meta Ads error:', error);
    results.push({
      name: 'meta_ads',
      signals: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      source: 'fixture',
    });
  }

  // ==========================================================================
  // Visibility/Reviews Collection
  // ==========================================================================
  try {
    let visibilitySignals: NormalizedSignal[] = [];
    let visibilitySource: 'real' | 'fixture' = 'fixture';
    
    if (providers.googlePlaces && competitors.length > 0) {
      // Try real Google Places API
      visibilitySignals = await collectRealVisibilityData(
        competitors.map(c => ({ name: c.name }))
      );
      visibilitySource = 'real';
    }
    
    // Fall back to fixtures if no real data
    if (visibilitySignals.length === 0) {
      visibilitySignals = await collectVisibilitySignals();
      visibilitySource = 'fixture';
    }
    
    results.push({
      name: 'visibility',
      signals: visibilitySignals,
      source: visibilitySource,
    });
  } catch (error) {
    console.error('[Providers] Visibility error:', error);
    results.push({
      name: 'visibility',
      signals: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      source: 'fixture',
    });
  }

  // ==========================================================================
  // Content Collection
  // ==========================================================================
  try {
    let contentSignals: NormalizedSignal[] = [];
    let contentSource: 'real' | 'fixture' = 'fixture';
    
    // Blog scraping doesn't need API keys, but needs competitor websites
    const competitorsWithWebsites = competitors.filter(c => c.website);
    
    if (competitorsWithWebsites.length > 0) {
      // Try real blog scraping
      contentSignals = await collectRealContentData(
        competitorsWithWebsites.map(c => ({ 
          name: c.name, 
          website: c.website || undefined 
        }))
      );
      contentSource = 'real';
    }
    
    // Fall back to fixtures if no real data
    if (contentSignals.length === 0) {
      contentSignals = await collectContentSignals();
      contentSource = 'fixture';
    }
    
    results.push({
      name: 'content',
      signals: contentSignals,
      source: contentSource,
    });
  } catch (error) {
    console.error('[Providers] Content error:', error);
    results.push({
      name: 'content',
      signals: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      source: 'fixture',
    });
  }

  return results;
}

// Export individual collectors
export { collectMetaAds } from './metaAds';
export { collectVisibilitySignals } from './visibility';
export { collectContentSignals } from './content';
export { collectRealMetaAds } from './metaAdsReal';
export { collectRealVisibilityData } from './googlePlaces';
export { collectRealContentData } from './blogScraper';
