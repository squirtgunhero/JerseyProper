/**
 * Content Intelligence Provider
 * MVP: Reads from local JSON fixtures (blog posts, landing pages, etc.)
 */

import { promises as fs } from 'fs';
import path from 'path';
import type { ContentRecord, NormalizedSignal } from '../types';

const FIXTURES_DIR = path.join(process.cwd(), 'data', 'content');

/**
 * Load content data from fixture files
 */
export async function collectContentSignals(): Promise<NormalizedSignal[]> {
  const signals: NormalizedSignal[] = [];

  try {
    // Check if fixtures directory exists
    const dirExists = await fs.stat(FIXTURES_DIR).catch(() => null);
    if (!dirExists) {
      console.log('[Content] No fixtures directory found at', FIXTURES_DIR);
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
          category: 'content',
          source: inferContentSource(file, record),
          payload: normalizeContentRecord(record),
        });
      }
    }

    console.log(`[Content] Collected ${signals.length} content signals from ${jsonFiles.length} files`);
  } catch (error) {
    console.error('[Content] Error collecting content data:', error);
  }

  return signals;
}

/**
 * Infer the content source from filename or data
 */
function inferContentSource(filename: string, record: Record<string, unknown>): string {
  const lowerFilename = filename.toLowerCase();
  
  if (lowerFilename.includes('blog')) return 'blog';
  if (lowerFilename.includes('landing')) return 'landing_pages';
  if (lowerFilename.includes('case') || lowerFilename.includes('study')) return 'case_studies';
  if (lowerFilename.includes('press')) return 'press_releases';
  
  // Try to infer from URL
  const url = String(record.url || '').toLowerCase();
  if (url.includes('/blog/')) return 'blog';
  if (url.includes('/case-study')) return 'case_studies';
  if (url.includes('/press/') || url.includes('/news/')) return 'press_releases';
  
  return record.source as string || 'website';
}

/**
 * Normalize raw content data to our standard format
 */
function normalizeContentRecord(raw: Record<string, unknown>): ContentRecord {
  return {
    url: String(raw.url || ''),
    title: String(raw.title || ''),
    published_date: String(raw.published_date || raw.publishedDate || raw.date || new Date().toISOString()),
    word_count: Number(raw.word_count || raw.wordCount || 0),
    topics: extractTopics(raw),
    content_type: inferContentType(raw),
    engagement_signals: raw.engagement_signals as ContentRecord['engagement_signals'] || undefined,
  };
}

/**
 * Extract topics from raw content data
 */
function extractTopics(raw: Record<string, unknown>): string[] {
  if (Array.isArray(raw.topics)) return raw.topics;
  if (Array.isArray(raw.tags)) return raw.tags;
  if (Array.isArray(raw.keywords)) return raw.keywords;
  if (Array.isArray(raw.categories)) return raw.categories;
  
  return [];
}

/**
 * Infer content type from raw data
 */
function inferContentType(raw: Record<string, unknown>): ContentRecord['content_type'] {
  if (raw.content_type) {
    const type = String(raw.content_type).toLowerCase();
    if (['blog', 'landing', 'case-study', 'press-release'].includes(type)) {
      return type as ContentRecord['content_type'];
    }
  }
  
  const url = String(raw.url || '').toLowerCase();
  const title = String(raw.title || '').toLowerCase();
  
  if (url.includes('/blog/') || raw.type === 'post') return 'blog';
  if (url.includes('/case-study') || title.includes('case study')) return 'case-study';
  if (url.includes('/press/') || url.includes('/news/')) return 'press-release';
  if (url.includes('/landing/') || raw.type === 'landing') return 'landing';
  
  return 'other';
}
