/**
 * Visibility/Review Platform Provider
 * MVP: Reads from local JSON fixtures (Google Business, Yelp, etc.)
 */

import { promises as fs } from 'fs';
import path from 'path';
import type { VisibilityRecord, NormalizedSignal } from '../types';

const FIXTURES_DIR = path.join(process.cwd(), 'data', 'visibility');

/**
 * Load visibility data from fixture files
 */
export async function collectVisibilitySignals(): Promise<NormalizedSignal[]> {
  const signals: NormalizedSignal[] = [];

  try {
    // Check if fixtures directory exists
    const dirExists = await fs.stat(FIXTURES_DIR).catch(() => null);
    if (!dirExists) {
      console.log('[Visibility] No fixtures directory found at', FIXTURES_DIR);
      return signals;
    }

    // Read all JSON files in the directory
    const files = await fs.readdir(FIXTURES_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    for (const file of jsonFiles) {
      const filePath = path.join(FIXTURES_DIR, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(content);

      // Handle both single records and arrays
      const records: Record<string, unknown>[] = Array.isArray(data) ? data : [data];

      for (const record of records) {
        // Determine source from filename or data
        const source = inferSource(file, record);
        
        signals.push({
          category: 'visibility',
          source,
          payload: normalizeVisibilityRecord(record),
        });
      }
    }

    console.log(`[Visibility] Collected ${signals.length} visibility signals from ${jsonFiles.length} files`);
  } catch (error) {
    console.error('[Visibility] Error collecting visibility data:', error);
  }

  return signals;
}

/**
 * Infer the source platform from filename or data
 */
function inferSource(filename: string, record: Record<string, unknown>): string {
  const lowerFilename = filename.toLowerCase();
  
  if (lowerFilename.includes('google') || lowerFilename.includes('gbp')) {
    return 'google_business';
  }
  if (lowerFilename.includes('yelp')) {
    return 'yelp';
  }
  if (lowerFilename.includes('facebook') || lowerFilename.includes('fb')) {
    return 'facebook';
  }
  if (lowerFilename.includes('bbb')) {
    return 'bbb';
  }
  
  // Try to infer from record data
  if (record.platform) {
    return String(record.platform).toLowerCase().replace(/\s+/g, '_');
  }
  
  return 'unknown';
}

/**
 * Normalize raw visibility data to our standard format
 */
function normalizeVisibilityRecord(raw: Record<string, unknown>): VisibilityRecord {
  return {
    platform: String(raw.platform || 'unknown'),
    business_name: String(raw.business_name || raw.name || ''),
    review_count: Number(raw.review_count || raw.reviewCount || raw.reviews || 0),
    average_rating: Number(raw.average_rating || raw.rating || raw.averageRating || 0),
    photo_count: Number(raw.photo_count || raw.photoCount || raw.photos || 0),
    services_listed: Array.isArray(raw.services_listed) 
      ? raw.services_listed 
      : (Array.isArray(raw.services) ? raw.services : []),
    last_review_date: raw.last_review_date as string | undefined,
    profile_completeness: calculateCompleteness(raw),
    response_rate: raw.response_rate as number | undefined,
    categories: Array.isArray(raw.categories) ? raw.categories : [],
  };
}

/**
 * Calculate profile completeness score (0-100)
 */
function calculateCompleteness(raw: Record<string, unknown>): number {
  if (typeof raw.profile_completeness === 'number') {
    return raw.profile_completeness;
  }

  let score = 0;
  const checks = [
    { field: 'business_name', weight: 15 },
    { field: 'name', weight: 15 },
    { field: 'phone', weight: 10 },
    { field: 'address', weight: 15 },
    { field: 'website', weight: 10 },
    { field: 'hours', weight: 10 },
    { field: 'description', weight: 10 },
    { field: 'categories', weight: 10 },
    { field: 'photos', weight: 10 },
    { field: 'services', weight: 10 },
  ];

  for (const check of checks) {
    const value = raw[check.field];
    if (value && (typeof value !== 'object' || (Array.isArray(value) && value.length > 0))) {
      score += check.weight;
    }
  }

  return Math.min(100, score);
}
