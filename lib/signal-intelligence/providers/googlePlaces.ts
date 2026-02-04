/**
 * Google Places API Provider
 * Fetches real review/visibility data from Google
 * 
 * Setup:
 * 1. Enable Places API in Google Cloud Console
 * 2. Create an API key
 * 3. Set GOOGLE_PLACES_API_KEY in .env.local
 * 
 * API Docs: https://developers.google.com/maps/documentation/places/web-service
 */

import type { VisibilityRecord, NormalizedSignal } from '../types';

const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place';

interface PlaceSearchResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  business_status?: string;
}

interface PlaceDetailsResult {
  place_id: string;
  name: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
    relative_time_description: string;
  }>;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  types?: string[];
  website?: string;
  formatted_phone_number?: string;
  opening_hours?: {
    open_now?: boolean;
    weekday_text?: string[];
  };
  url?: string;
}

/**
 * Search for a business by name and get its place ID
 */
export async function searchPlace(
  businessName: string,
  options: {
    apiKey?: string;
    location?: string; // "lat,lng" format
    radius?: number; // in meters
  } = {}
): Promise<PlaceSearchResult | null> {
  const apiKey = options.apiKey || process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.warn('[GooglePlaces] No GOOGLE_PLACES_API_KEY configured');
    return null;
  }

  const params = new URLSearchParams({
    input: businessName,
    inputtype: 'textquery',
    fields: 'place_id,name,formatted_address,rating,user_ratings_total,types,business_status',
    key: apiKey,
  });

  if (options.location) {
    params.append('locationbias', `circle:${options.radius || 50000}@${options.location}`);
  }

  const url = `${GOOGLE_PLACES_API}/findplacefromtext/json?${params}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || !data.candidates?.length) {
      console.log(`[GooglePlaces] No results for "${businessName}": ${data.status}`);
      return null;
    }

    return data.candidates[0] as PlaceSearchResult;
  } catch (error) {
    console.error('[GooglePlaces] Search error:', error);
    return null;
  }
}

/**
 * Get detailed information about a place
 */
export async function getPlaceDetails(
  placeId: string,
  options: { apiKey?: string } = {}
): Promise<PlaceDetailsResult | null> {
  const apiKey = options.apiKey || process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.warn('[GooglePlaces] No GOOGLE_PLACES_API_KEY configured');
    return null;
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: [
      'place_id',
      'name',
      'rating',
      'user_ratings_total',
      'reviews',
      'photos',
      'types',
      'website',
      'formatted_phone_number',
      'opening_hours',
      'url',
    ].join(','),
    key: apiKey,
  });

  const url = `${GOOGLE_PLACES_API}/details/json?${params}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.log(`[GooglePlaces] Details error for ${placeId}: ${data.status}`);
      return null;
    }

    return data.result as PlaceDetailsResult;
  } catch (error) {
    console.error('[GooglePlaces] Details error:', error);
    return null;
  }
}

/**
 * Fetch visibility data for a single competitor
 */
export async function fetchVisibilityForCompetitor(
  businessName: string,
  options: {
    apiKey?: string;
    location?: string;
  } = {}
): Promise<NormalizedSignal | null> {
  const apiKey = options.apiKey || process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    return null;
  }

  // First, search for the place
  const searchResult = await searchPlace(businessName, { apiKey, location: options.location });
  
  if (!searchResult) {
    return null;
  }

  // Then get detailed info
  const details = await getPlaceDetails(searchResult.place_id, { apiKey });
  
  if (!details) {
    return null;
  }

  // Find the most recent review date
  const lastReviewDate = details.reviews?.length
    ? new Date(Math.max(...details.reviews.map(r => r.time * 1000))).toISOString()
    : undefined;

  const visibility: VisibilityRecord = {
    platform: 'Google Business',
    business_name: details.name,
    review_count: details.user_ratings_total || 0,
    average_rating: details.rating || 0,
    photo_count: details.photos?.length || 0,
    services_listed: [], // Google doesn't provide this directly
    last_review_date: lastReviewDate,
    profile_completeness: calculateGoogleCompleteness(details),
    categories: details.types?.filter(t => !t.startsWith('point_of_interest')) || [],
  };

  return {
    category: 'visibility',
    source: 'google_business',
    payload: visibility,
  };
}

/**
 * Collect visibility data for multiple competitors
 */
export async function collectRealVisibilityData(
  competitors: Array<{ name: string; location?: string }>
): Promise<NormalizedSignal[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.log('[GooglePlaces] GOOGLE_PLACES_API_KEY not configured, falling back to fixtures');
    return [];
  }

  const signals: NormalizedSignal[] = [];

  for (const competitor of competitors) {
    const signal = await fetchVisibilityForCompetitor(competitor.name, {
      apiKey,
      location: competitor.location,
    });
    
    if (signal) {
      signals.push(signal);
    }

    // Rate limiting - Google has strict limits
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log(`[GooglePlaces] Collected ${signals.length} visibility signals`);
  return signals;
}

/**
 * Calculate profile completeness for Google Business
 */
function calculateGoogleCompleteness(details: PlaceDetailsResult): number {
  let score = 0;
  const maxScore = 100;

  // Basic info (40 points)
  if (details.name) score += 10;
  if (details.formatted_phone_number) score += 10;
  if (details.website) score += 10;
  if (details.opening_hours?.weekday_text?.length) score += 10;

  // Reviews (30 points)
  if (details.user_ratings_total && details.user_ratings_total > 0) score += 10;
  if (details.user_ratings_total && details.user_ratings_total > 10) score += 10;
  if (details.rating && details.rating >= 4.0) score += 10;

  // Photos (20 points)
  if (details.photos?.length) score += 10;
  if (details.photos && details.photos.length >= 5) score += 10;

  // Categories (10 points)
  if (details.types?.length && details.types.length > 1) score += 10;

  return Math.min(maxScore, score);
}
