// Module B: Entity clarity (0-20 points)
import type { PageExtraction } from '../extract/types'
import type { RuleResult } from './types'
import { tokenize, removeStopwords, jaccard } from './utils'

// B1: Single clear H1 exists (5 points)
export function ruleB1(extraction: PageExtraction): RuleResult {
  const h1Headings = extraction.headings.filter(h => h.level === 1)
  const hasH1 = extraction.h1 !== null && extraction.h1.length > 0
  const singleH1 = h1Headings.length === 1

  return {
    id: 'B1',
    module: 'B',
    title: 'Single clear H1 exists',
    whyItMatters: 'A single, descriptive H1 helps AI understand the primary topic of the page.',
    maxPoints: 5,
    earnedPoints: hasH1 && singleH1 ? 5 : hasH1 ? 3 : 0,
    status: hasH1 && singleH1 ? 'pass' : hasH1 ? 'warn' : 'fail',
    evidence: hasH1 
      ? [`H1: "${extraction.h1}"${h1Headings.length > 1 ? ` (${h1Headings.length} H1s found)` : ''}`]
      : ['No H1 heading found'],
    recommendation: hasH1 && singleH1
      ? 'Good! You have a clear, single H1.'
      : hasH1 
        ? 'Use only one H1 per page for clarity.'
        : 'Add a descriptive H1 heading that summarizes the page topic.',
  }
}

// B2: Title and H1 alignment (5 points)
export function ruleB2(extraction: PageExtraction): RuleResult {
  if (!extraction.title || !extraction.h1) {
    return {
      id: 'B2',
      module: 'B',
      title: 'Title and H1 alignment',
      whyItMatters: 'Aligned title and H1 reinforce topic focus and help AI understand page intent.',
      maxPoints: 5,
      earnedPoints: 0,
      status: 'fail',
      evidence: ['Missing title or H1'],
      recommendation: 'Ensure both title tag and H1 are present with related keywords.',
    }
  }

  const titleTokens = new Set(removeStopwords(tokenize(extraction.title)))
  const h1Tokens = new Set(removeStopwords(tokenize(extraction.h1)))
  const overlap = jaccard(titleTokens, h1Tokens)

  const passes = overlap >= 0.25
  const warns = overlap >= 0.1

  return {
    id: 'B2',
    module: 'B',
    title: 'Title and H1 alignment',
    whyItMatters: 'Aligned title and H1 reinforce topic focus and help AI understand page intent.',
    maxPoints: 5,
    earnedPoints: passes ? 5 : warns ? 2 : 0,
    status: passes ? 'pass' : warns ? 'warn' : 'fail',
    evidence: [
      `Title: "${extraction.title}"`,
      `H1: "${extraction.h1}"`,
      `Overlap score: ${(overlap * 100).toFixed(0)}%`,
    ],
    recommendation: passes
      ? 'Good alignment between title and H1.'
      : 'Align your title and H1 to share key topic words.',
  }
}

// B3: Organization/brand presence (5 points)
export function ruleB3(extraction: PageExtraction): RuleResult {
  const evidence: string[] = []
  let brandName: string | null = null

  // Check schema for organization
  for (const ld of extraction.jsonLd) {
    if (ld.parsed && ld.type) {
      if (['Organization', 'LocalBusiness', 'Corporation', 'Person'].includes(ld.type)) {
        const name = (ld.parsed as Record<string, unknown>)['name']
        if (typeof name === 'string') {
          brandName = name
          evidence.push(`Schema ${ld.type}: "${name}"`)
        }
      }
    }
  }

  // Check og:site_name (would need to add this to extraction)
  // For now, extract from title pattern "| Brand Name" or "- Brand Name"
  if (!brandName && extraction.title) {
    const match = extraction.title.match(/[|–-]\s*([^|–-]+)$/)
    if (match) {
      brandName = match[1].trim()
      evidence.push(`Title suffix: "${brandName}"`)
    }
  }

  const found = brandName !== null

  return {
    id: 'B3',
    module: 'B',
    title: 'Organization/brand presence',
    whyItMatters: 'Clear brand/organization signals help AI attribute content to authoritative sources.',
    maxPoints: 5,
    earnedPoints: found ? 5 : 0,
    status: found ? 'pass' : 'fail',
    evidence: found ? evidence : ['No clear brand/organization name detected'],
    recommendation: found
      ? `Brand identified: "${brandName}"`
      : 'Add Organization schema markup and include brand name in title.',
  }
}

// B4: Consistent naming signals (5 points)
export function ruleB4(extraction: PageExtraction): RuleResult {
  // Extract brand name from various sources
  const sources: { source: string; name: string }[] = []

  // From title suffix
  if (extraction.title) {
    const match = extraction.title.match(/[|–-]\s*([^|–-]+)$/)
    if (match) {
      sources.push({ source: 'title', name: match[1].trim().toLowerCase() })
    }
  }

  // From H1
  if (extraction.h1) {
    sources.push({ source: 'h1', name: extraction.h1.toLowerCase() })
  }

  // From schema
  for (const ld of extraction.jsonLd) {
    if (ld.parsed) {
      const name = (ld.parsed as Record<string, unknown>)['name']
      if (typeof name === 'string') {
        sources.push({ source: 'schema', name: name.toLowerCase() })
      }
    }
  }

  // Check if any name appears in multiple sources
  const nameCounts = new Map<string, number>()
  sources.forEach(s => {
    const words = s.name.split(/\s+/).filter(w => w.length > 2)
    words.forEach(word => {
      nameCounts.set(word, (nameCounts.get(word) || 0) + 1)
    })
  })

  const consistentWords = [...nameCounts.entries()].filter(([_, count]) => count >= 2)
  const passes = consistentWords.length > 0

  return {
    id: 'B4',
    module: 'B',
    title: 'Consistent naming signals',
    whyItMatters: 'Consistent brand mentions across title, schema, and content reinforce entity recognition.',
    maxPoints: 5,
    earnedPoints: passes ? 5 : 0,
    status: passes ? 'pass' : 'warn',
    evidence: passes
      ? [`Consistent terms found: ${consistentWords.map(([w]) => w).join(', ')}`]
      : ['Brand name not consistently repeated across elements'],
    recommendation: passes
      ? 'Good naming consistency.'
      : 'Use your brand name consistently in title, H1, schema, and footer.',
  }
}

export function evaluateModuleB(extraction: PageExtraction): RuleResult[] {
  return [
    ruleB1(extraction),
    ruleB2(extraction),
    ruleB3(extraction),
    ruleB4(extraction),
  ]
}
