// Module C: Trust & evidence (0-20 points)
import type { PageExtraction } from '../extract/types'
import type { RuleResult } from './types'

// C1: Author/byline present (7 points)
export function ruleC1(extraction: PageExtraction): RuleResult {
  const evidence: string[] = []
  let found = false

  // Check schema for author
  for (const ld of extraction.jsonLd) {
    if (ld.parsed) {
      const author = (ld.parsed as Record<string, unknown>)['author']
      if (author) {
        found = true
        if (typeof author === 'string') {
          evidence.push(`Schema author: "${author}"`)
        } else if (typeof author === 'object' && author !== null) {
          const name = (author as Record<string, unknown>)['name']
          if (typeof name === 'string') {
            evidence.push(`Schema author: "${name}"`)
          }
        }
      }
    }
  }

  // Check for "By [Name]" pattern in content
  const bylinePattern = /\bby\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/g
  const matches = extraction.topText.match(bylinePattern)
  if (matches && matches.length > 0) {
    found = true
    evidence.push(`Byline detected: "${matches[0]}"`)
  }

  return {
    id: 'C1',
    module: 'C',
    title: 'Author/byline present',
    whyItMatters: 'Author attribution builds trust and helps AI evaluate content credibility (E-E-A-T).',
    maxPoints: 7,
    earnedPoints: found ? 7 : 0,
    status: found ? 'pass' : 'fail',
    evidence: found ? evidence : ['No author or byline detected'],
    recommendation: found
      ? 'Author attribution present.'
      : 'Add author name with "By [Name]" and include author schema markup.',
  }
}

// C2: Last updated/date present (5 points)
export function ruleC2(extraction: PageExtraction): RuleResult {
  const evidence: string[] = []
  let found = false

  // Check schema for dates
  for (const ld of extraction.jsonLd) {
    if (ld.parsed) {
      const modified = (ld.parsed as Record<string, unknown>)['dateModified']
      const published = (ld.parsed as Record<string, unknown>)['datePublished']
      if (modified) {
        found = true
        evidence.push(`Schema dateModified: ${modified}`)
      }
      if (published) {
        found = true
        evidence.push(`Schema datePublished: ${published}`)
      }
    }
  }

  // Check for date patterns in content
  const datePatterns = [
    /last updated[:\s]+[\w\s,]+\d{4}/i,
    /updated[:\s]+[\w\s,]+\d{4}/i,
    /modified[:\s]+[\w\s,]+\d{4}/i,
    /published[:\s]+[\w\s,]+\d{4}/i,
  ]

  for (const pattern of datePatterns) {
    const match = extraction.topText.match(pattern)
    if (match) {
      found = true
      evidence.push(`Date text found: "${match[0]}"`)
      break
    }
  }

  return {
    id: 'C2',
    module: 'C',
    title: 'Last updated/date present',
    whyItMatters: 'Fresh content signals relevance. AI prefers recently updated information.',
    maxPoints: 5,
    earnedPoints: found ? 5 : 0,
    status: found ? 'pass' : 'warn',
    evidence: found ? evidence : ['No publication or update date found'],
    recommendation: found
      ? 'Date information present.'
      : 'Add "Last updated: [date]" and include dateModified in schema.',
  }
}

// C3: Outbound citations >= 2 (5 points)
export function ruleC3(extraction: PageExtraction): RuleResult {
  const count = extraction.externalLinksCount
  const passes = count >= 2

  return {
    id: 'C3',
    module: 'C',
    title: 'Outbound citations',
    whyItMatters: 'Linking to authoritative sources demonstrates research and builds credibility.',
    maxPoints: 5,
    earnedPoints: passes ? 5 : count >= 1 ? 2 : 0,
    status: passes ? 'pass' : count >= 1 ? 'warn' : 'fail',
    evidence: [
      `Found ${count} external links`,
      ...extraction.externalLinks.slice(0, 3).map(l => `Link: ${l}`),
    ],
    recommendation: passes
      ? `Good! ${count} outbound citations found.`
      : 'Add 2+ links to authoritative external sources to support your claims.',
  }
}

// C4: About/contact signals (3 points)
export function ruleC4(extraction: PageExtraction): RuleResult {
  const signalPatterns = [
    /about/i,
    /contact/i,
    /editorial/i,
    /privacy/i,
    /terms/i,
    /team/i,
    /company/i,
  ]

  // Check in mainText for these patterns as internal link anchors
  const foundSignals: string[] = []
  for (const pattern of signalPatterns) {
    if (pattern.test(extraction.mainText)) {
      foundSignals.push(pattern.source.replace(/[/\\^$*+?.()|[\]{}]/g, ''))
    }
  }

  const passes = foundSignals.length >= 2

  return {
    id: 'C4',
    module: 'C',
    title: 'About/contact signals',
    whyItMatters: 'Links to About, Contact, and editorial pages signal a legitimate, trustworthy site.',
    maxPoints: 3,
    earnedPoints: passes ? 3 : foundSignals.length >= 1 ? 1 : 0,
    status: passes ? 'pass' : foundSignals.length >= 1 ? 'warn' : 'fail',
    evidence: foundSignals.length > 0
      ? [`Found signals: ${foundSignals.join(', ')}`]
      : ['No about/contact signals detected'],
    recommendation: passes
      ? 'Trust signals present.'
      : 'Include links to About, Contact, and Privacy pages.',
  }
}

export function evaluateModuleC(extraction: PageExtraction): RuleResult[] {
  return [
    ruleC1(extraction),
    ruleC2(extraction),
    ruleC3(extraction),
    ruleC4(extraction),
  ]
}
