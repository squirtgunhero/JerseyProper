import * as cheerio from 'cheerio'
import type { 
  PageExtraction, 
  Heading, 
  SentenceStats, 
  JsonLdObject,
  FetchResult 
} from './types'

const NOISE_SELECTORS = [
  'header', 'nav', 'footer', 'aside', 'script', 'style', 
  'noscript', 'svg', 'iframe', 'form', '.cookie', '.popup',
  '.modal', '.advertisement', '.ad', '.sidebar', '.menu',
  '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]'
]

const MAIN_CANDIDATES = [
  'article',
  'main',
  '[role="main"]',
  '.content',
  '.post',
  '.article',
  '.entry-content',
  '.post-content',
  '#content',
  '#main',
]

interface CandidateScore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: any
  score: number
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length
}

function getSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10)
}

function computeSentenceStats(text: string): SentenceStats {
  const sentences = getSentences(text)
  if (sentences.length === 0) {
    return { count: 0, avgLength: 0, minLength: 0, maxLength: 0 }
  }
  
  const lengths = sentences.map(s => countWords(s))
  return {
    count: sentences.length,
    avgLength: Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length),
    minLength: Math.min(...lengths),
    maxLength: Math.max(...lengths),
  }
}

function isInternalLink(href: string, baseUrl: string): boolean {
  if (!href || href.startsWith('#') || href.startsWith('javascript:')) return false
  try {
    const linkUrl = new URL(href, baseUrl)
    const base = new URL(baseUrl)
    return linkUrl.hostname === base.hostname
  } catch {
    return href.startsWith('/') && !href.startsWith('//')
  }
}

function isSocialShareDomain(url: string): boolean {
  const socialDomains = [
    'facebook.com', 'twitter.com', 'x.com', 'linkedin.com',
    'pinterest.com', 'instagram.com', 'youtube.com', 'tiktok.com',
    'reddit.com', 'whatsapp.com', 't.me'
  ]
  try {
    const hostname = new URL(url).hostname.toLowerCase()
    return socialDomains.some(d => hostname.includes(d))
  } catch {
    return false
  }
}

export function extractContent(fetchResult: FetchResult): PageExtraction {
  const $ = cheerio.load(fetchResult.html)
  const baseUrl = fetchResult.url

  // Extract metadata first
  const title = $('title').first().text().trim() || null
  const description = $('meta[name="description"]').attr('content')?.trim() || 
                      $('meta[property="og:description"]').attr('content')?.trim() || null
  const canonical = $('link[rel="canonical"]').attr('href') || null
  const h1 = $('h1').first().text().trim() || null

  // Extract headings
  const headings: Heading[] = []
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tagName = (el as any).tagName || (el as any).name || ''
    const level = parseInt(tagName.slice(1), 10) || 0
    const text = $(el).text().trim()
    if (text && level > 0) {
      headings.push({ level, text })
    }
  })

  // Extract JSON-LD
  const jsonLd: JsonLdObject[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $('script[type="application/ld+json"]').each((_: number, el: any) => {
    const raw = $(el).html()?.trim() || ''
    let parsed: Record<string, unknown> | null = null
    let type: string | null = null
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>
      type = (parsed['@type'] as string) || null
    } catch {
      // Invalid JSON
    }
    jsonLd.push({ raw, parsed, type })
  })

  // Extract robots meta
  const robotsMeta = $('meta[name="robots"]').attr('content') || null
  const xRobotsTag = fetchResult.headers['x-robots-tag'] || null
  const combinedRobots = [robotsMeta, xRobotsTag].filter(Boolean).join(', ') || null

  // Remove noise elements for main content extraction
  const $clean = cheerio.load(fetchResult.html)
  NOISE_SELECTORS.forEach(sel => $clean(sel).remove())

  // Score candidates to find main content
  const candidates: CandidateScore[] = []
  
  MAIN_CANDIDATES.forEach(selector => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $clean(selector).each((_: number, el: any) => {
      const $el = $clean(el)
      const text = $el.text()
      const words = countWords(text)
      const headingCount = $el.find('h1, h2, h3, h4, h5, h6').length
      const listCount = $el.find('ul, ol').length
      
      // Calculate link density penalty
      let anchorWords = 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $el.find('a').each((_: number, a: any) => {
        anchorWords += countWords($clean(a).text())
      })
      const linkDensityPenalty = words > 0 ? (anchorWords / words) * 200 : 0
      
      const score = words * 1.0 + headingCount * 30 + listCount * 20 - linkDensityPenalty
      
      if (words > 50) { // Minimum threshold
        candidates.push({ element: $el, score })
      }
    })
  })

  // Fallback to body children if no candidates
  if (candidates.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $clean('body').children().each((_: number, el: any) => {
      const $el = $clean(el)
      const text = $el.text()
      const words = countWords(text)
      if (words > 100) {
        candidates.push({ element: $el, score: words })
      }
    })
  }

  // Sort and pick best
  candidates.sort((a, b) => b.score - a.score)
  const $main = candidates.length > 0 ? candidates[0].element : $clean('body')

  // Extract main text
  const mainText = $main.text().replace(/\s+/g, ' ').trim()
  const wordCount = countWords(mainText)
  
  // Top text (first ~1200 words)
  const words = mainText.split(/\s+/)
  const topText = words.slice(0, 1200).join(' ')

  // Count lists and tables
  const listsCount = $main.find('ul, ol').length
  const tablesCount = $main.find('table').length

  // Extract links from main content
  const internalLinks: string[] = []
  const externalLinks: string[] = []
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $main.find('a[href]').each((_: number, el: any) => {
    const href = $clean(el).attr('href')
    if (!href) return
    
    try {
      const absoluteUrl = new URL(href, baseUrl).href
      if (isInternalLink(href, baseUrl)) {
        internalLinks.push(absoluteUrl)
      } else if (!isSocialShareDomain(absoluteUrl)) {
        externalLinks.push(absoluteUrl)
      }
    } catch {
      // Invalid URL
    }
  })

  // Calculate link density
  let anchorTextWords = 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $main.find('a').each((_: number, a: any) => {
    anchorTextWords += countWords($clean(a).text())
  })
  const linkDensity = wordCount > 0 ? anchorTextWords / wordCount : 0

  // Sentence stats
  const sentenceStats = computeSentenceStats(mainText)

  // Detect JS shell (very low content, many scripts)
  const scriptCount = $('script').length
  const isJsShell = wordCount < 400 && scriptCount > 5

  return {
    title,
    description,
    canonical,
    h1,
    headings,
    mainText,
    topText,
    wordCount,
    listsCount,
    tablesCount,
    internalLinksCount: internalLinks.length,
    externalLinksCount: externalLinks.length,
    externalLinks: [...new Set(externalLinks)],
    jsonLd,
    robotsMeta: combinedRobots,
    responseHeaders: fetchResult.headers,
    linkDensity: Math.round(linkDensity * 1000) / 1000,
    sentenceStats,
    fetchType: 'raw',
    isJsShell,
  }
}

export { type PageExtraction, type Heading, type SentenceStats, type JsonLdObject }
