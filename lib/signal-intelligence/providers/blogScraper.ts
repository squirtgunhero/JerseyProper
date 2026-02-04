/**
 * Blog/Content Scraper Provider
 * Crawls competitor websites to extract content signals
 * 
 * This provider:
 * 1. Fetches sitemap.xml to discover content URLs
 * 2. Extracts blog posts and landing pages
 * 3. Normalizes content data for analysis
 * 
 * No API key required - uses public web scraping
 */

import * as cheerio from 'cheerio';
import type { ContentRecord, NormalizedSignal } from '../types';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

/**
 * Fetch and parse a sitemap.xml
 */
export async function fetchSitemap(baseUrl: string): Promise<SitemapUrl[]> {
  const sitemapUrls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap_index.xml`,
    `${baseUrl}/blog/sitemap.xml`,
    `${baseUrl}/post-sitemap.xml`,
  ];

  for (const sitemapUrl of sitemapUrls) {
    try {
      const response = await fetch(sitemapUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SignalIntelligence/1.0)',
        },
      });

      if (!response.ok) continue;

      const xml = await response.text();
      const $ = cheerio.load(xml, { xmlMode: true });
      
      const urls: SitemapUrl[] = [];
      
      // Check if it's a sitemap index
      const sitemapRefs = $('sitemap loc');
      if (sitemapRefs.length > 0) {
        // It's an index, fetch child sitemaps
        for (const ref of sitemapRefs.toArray().slice(0, 3)) {
          const childUrl = $(ref).text();
          const childUrls = await fetchSitemapDirect(childUrl);
          urls.push(...childUrls);
        }
      } else {
        // It's a regular sitemap
        $('url').each((_, el) => {
          const loc = $(el).find('loc').text();
          const lastmod = $(el).find('lastmod').text() || undefined;
          const changefreq = $(el).find('changefreq').text() || undefined;
          const priority = $(el).find('priority').text() || undefined;
          
          if (loc) {
            urls.push({ loc, lastmod, changefreq, priority });
          }
        });
      }

      if (urls.length > 0) {
        console.log(`[BlogScraper] Found ${urls.length} URLs in sitemap for ${baseUrl}`);
        return urls;
      }
    } catch (error) {
      // Try next sitemap URL
      continue;
    }
  }

  console.log(`[BlogScraper] No sitemap found for ${baseUrl}`);
  return [];
}

/**
 * Fetch a single sitemap directly
 */
async function fetchSitemapDirect(url: string): Promise<SitemapUrl[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SignalIntelligence/1.0)',
      },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });
    
    const urls: SitemapUrl[] = [];
    $('url').each((_, el) => {
      const loc = $(el).find('loc').text();
      const lastmod = $(el).find('lastmod').text() || undefined;
      
      if (loc) {
        urls.push({ loc, lastmod });
      }
    });

    return urls;
  } catch {
    return [];
  }
}

/**
 * Filter URLs to only content pages (blogs, news, etc.)
 */
function filterContentUrls(urls: SitemapUrl[]): SitemapUrl[] {
  const contentPatterns = [
    /\/blog\//i,
    /\/news\//i,
    /\/article/i,
    /\/post\//i,
    /\/insights\//i,
    /\/resources\//i,
    /\/learn\//i,
    /\/guides?\//i,
    /\/case-stud/i,
    /\/stories?\//i,
  ];

  const excludePatterns = [
    /\/tag\//i,
    /\/category\//i,
    /\/author\//i,
    /\/page\/\d+/i,
    /\.(jpg|png|gif|pdf|css|js)$/i,
  ];

  return urls.filter(url => {
    const matchesContent = contentPatterns.some(p => p.test(url.loc));
    const isExcluded = excludePatterns.some(p => p.test(url.loc));
    return matchesContent && !isExcluded;
  });
}

/**
 * Scrape a single page for content metadata
 */
export async function scrapePage(url: string): Promise<ContentRecord | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SignalIntelligence/1.0)',
      },
    });

    if (!response.ok) return null;

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract title
    const title = $('h1').first().text().trim() ||
                  $('meta[property="og:title"]').attr('content') ||
                  $('title').text().trim() ||
                  'Untitled';

    // Extract published date
    const publishedDate = 
      $('meta[property="article:published_time"]').attr('content') ||
      $('time[datetime]').attr('datetime') ||
      $('meta[name="date"]').attr('content') ||
      $('[class*="date"]').first().text().trim() ||
      new Date().toISOString();

    // Extract main content and count words
    const mainContent = $('article').text() ||
                       $('[class*="content"]').first().text() ||
                       $('main').text() ||
                       $('body').text();
    
    const wordCount = mainContent.split(/\s+/).filter(w => w.length > 0).length;

    // Extract topics/tags
    const topics: string[] = [];
    $('meta[property="article:tag"]').each((_, el) => {
      const tag = $(el).attr('content');
      if (tag) topics.push(tag);
    });
    $('[class*="tag"] a, [class*="category"] a').each((_, el) => {
      const tag = $(el).text().trim();
      if (tag && tag.length < 50) topics.push(tag);
    });

    // Determine content type
    const contentType = inferContentType(url, title);

    // If word count is too low, skip (probably not real content)
    if (wordCount < 100) {
      return null;
    }

    return {
      url,
      title: title.substring(0, 200),
      published_date: publishedDate,
      word_count: wordCount,
      topics: [...new Set(topics)].slice(0, 10),
      content_type: contentType,
    };
  } catch (error) {
    console.log(`[BlogScraper] Error scraping ${url}:`, error);
    return null;
  }
}

/**
 * Infer content type from URL and title
 */
function inferContentType(url: string, title: string): ContentRecord['content_type'] {
  const lowerUrl = url.toLowerCase();
  const lowerTitle = title.toLowerCase();

  if (lowerUrl.includes('case-study') || lowerUrl.includes('case_study') || lowerTitle.includes('case study')) {
    return 'case-study';
  }
  if (lowerUrl.includes('/news/') || lowerUrl.includes('/press/') || lowerTitle.includes('announces')) {
    return 'press-release';
  }
  if (lowerUrl.includes('/landing/') || lowerUrl.includes('/lp/')) {
    return 'landing';
  }
  if (lowerUrl.includes('/blog/') || lowerUrl.includes('/post/') || lowerUrl.includes('/article')) {
    return 'blog';
  }

  return 'other';
}

/**
 * Scrape content from a competitor's website
 */
export async function scrapeCompetitorContent(
  websiteUrl: string,
  options: {
    maxPages?: number;
    includeAll?: boolean;
  } = {}
): Promise<NormalizedSignal[]> {
  const maxPages = options.maxPages || 20;
  
  // Normalize URL
  const baseUrl = websiteUrl.replace(/\/$/, '');
  
  // Fetch sitemap
  let urls = await fetchSitemap(baseUrl);
  
  // Filter to content URLs unless includeAll is set
  if (!options.includeAll) {
    urls = filterContentUrls(urls);
  }
  
  // Limit pages
  urls = urls.slice(0, maxPages);
  
  console.log(`[BlogScraper] Scraping ${urls.length} pages from ${baseUrl}`);
  
  const signals: NormalizedSignal[] = [];
  
  for (const url of urls) {
    const content = await scrapePage(url.loc);
    
    if (content) {
      // Use sitemap lastmod if available and page didn't provide date
      if (url.lastmod && content.published_date === new Date().toISOString()) {
        content.published_date = url.lastmod;
      }
      
      signals.push({
        category: 'content',
        source: 'blog_scrape',
        payload: content,
      });
    }
    
    // Be polite - don't hammer the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`[BlogScraper] Extracted ${signals.length} content signals from ${baseUrl}`);
  return signals;
}

/**
 * Collect content from multiple competitor websites
 */
export async function collectRealContentData(
  competitors: Array<{ name: string; website?: string }>
): Promise<NormalizedSignal[]> {
  const allSignals: NormalizedSignal[] = [];
  
  for (const competitor of competitors) {
    if (!competitor.website) {
      console.log(`[BlogScraper] No website for ${competitor.name}, skipping`);
      continue;
    }
    
    const signals = await scrapeCompetitorContent(competitor.website, {
      maxPages: 15,
    });
    
    allSignals.push(...signals);
  }
  
  console.log(`[BlogScraper] Total content signals collected: ${allSignals.length}`);
  return allSignals;
}
