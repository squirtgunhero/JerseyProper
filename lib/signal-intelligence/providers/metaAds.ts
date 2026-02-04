/**
 * Meta Ads Library Provider
 * MVP: Reads from local JSON fixtures
 */

import { promises as fs } from 'fs';
import path from 'path';
import type { MetaAdRecord, NormalizedSignal } from '../types';

const FIXTURES_DIR = path.join(process.cwd(), 'data', 'meta_ad_library');

/**
 * Load Meta ads from fixture files
 */
export async function collectMetaAds(): Promise<NormalizedSignal[]> {
  const signals: NormalizedSignal[] = [];

  try {
    // Check if fixtures directory exists
    const dirExists = await fs.stat(FIXTURES_DIR).catch(() => null);
    if (!dirExists) {
      console.log('[MetaAds] No fixtures directory found at', FIXTURES_DIR);
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
        signals.push({
          category: 'ads',
          source: 'meta_ad_library',
          payload: normalizeMetaAd(record),
        });
      }
    }

    console.log(`[MetaAds] Collected ${signals.length} ad signals from ${jsonFiles.length} files`);
  } catch (error) {
    console.error('[MetaAds] Error collecting ads:', error);
  }

  return signals;
}

/**
 * Normalize raw Meta ad data to our standard format
 */
function normalizeMetaAd(raw: Record<string, unknown>): MetaAdRecord {
  return {
    ad_id: String(raw.ad_id || raw.id || ''),
    page_name: String(raw.page_name || raw.pageName || ''),
    page_id: String(raw.page_id || raw.pageId || ''),
    ad_creative_body: raw.ad_creative_body as string | undefined,
    ad_creative_link_title: raw.ad_creative_link_title as string | undefined,
    ad_creative_link_description: raw.ad_creative_link_description as string | undefined,
    ad_delivery_start_time: String(raw.ad_delivery_start_time || raw.startTime || new Date().toISOString()),
    ad_delivery_stop_time: raw.ad_delivery_stop_time as string | undefined,
    currency: raw.currency as string | undefined,
    spend_lower: raw.spend_lower as number | undefined,
    spend_upper: raw.spend_upper as number | undefined,
    impressions_lower: raw.impressions_lower as number | undefined,
    impressions_upper: raw.impressions_upper as number | undefined,
    publisher_platforms: raw.publisher_platforms as string[] | undefined,
    creative_type: inferCreativeType(raw),
  };
}

/**
 * Infer the creative type from ad data
 */
function inferCreativeType(raw: Record<string, unknown>): 'image' | 'video' | 'carousel' | 'text' {
  if (raw.creative_type) {
    return raw.creative_type as 'image' | 'video' | 'carousel' | 'text';
  }
  
  if (raw.video_url || raw.hasVideo) return 'video';
  if (raw.carousel_cards || raw.isCarousel) return 'carousel';
  if (raw.image_url || raw.hasImage) return 'image';
  
  return 'text';
}
