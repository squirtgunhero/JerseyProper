// Module E: Retrieval & accessibility (0-10 points)
import type { PageExtraction } from '../extract/types'
import type { RuleResult } from './types'

// E1: Indexable (5 points)
export function ruleE1(extraction: PageExtraction): RuleResult {
  const robots = extraction.robotsMeta?.toLowerCase() || ''
  const hasNoindex = robots.includes('noindex')

  return {
    id: 'E1',
    module: 'E',
    title: 'Page is indexable',
    whyItMatters: 'Pages blocked from indexing cannot be used by AI systems that rely on search indexes.',
    maxPoints: 5,
    earnedPoints: hasNoindex ? 0 : 5,
    status: hasNoindex ? 'fail' : 'pass',
    evidence: hasNoindex
      ? [`Robots directive includes noindex: "${extraction.robotsMeta}"`]
      : extraction.robotsMeta 
        ? [`Robots: "${extraction.robotsMeta}"`]
        : ['No restrictive robots meta found'],
    recommendation: hasNoindex
      ? 'Remove noindex directive to allow indexing.'
      : 'Page is indexable.',
  }
}

// E2: Canonical present (3 points)
export function ruleE2(extraction: PageExtraction): RuleResult {
  const hasCanonical = extraction.canonical !== null && extraction.canonical.length > 0

  return {
    id: 'E2',
    module: 'E',
    title: 'Canonical URL present',
    whyItMatters: 'Canonical URLs prevent duplicate content issues and consolidate ranking signals.',
    maxPoints: 3,
    earnedPoints: hasCanonical ? 3 : 0,
    status: hasCanonical ? 'pass' : 'warn',
    evidence: hasCanonical
      ? [`Canonical: ${extraction.canonical}`]
      : ['No canonical URL specified'],
    recommendation: hasCanonical
      ? 'Canonical URL is set.'
      : 'Add a canonical link tag to specify the preferred URL.',
  }
}

// E3: Server content present (2 points)
export function ruleE3(extraction: PageExtraction): RuleResult {
  const hasServerContent = extraction.wordCount >= 400
  const isJsHeavy = extraction.isJsShell

  let points = 2
  let status: 'pass' | 'warn' | 'fail' = 'pass'
  const evidence: string[] = []

  if (!hasServerContent) {
    points = 0
    status = 'fail'
    evidence.push(`Only ${extraction.wordCount} words in server response`)
  } else {
    evidence.push(`${extraction.wordCount} words in server response`)
  }

  if (isJsHeavy) {
    points = Math.max(0, points - 1)
    status = status === 'pass' ? 'warn' : status
    evidence.push('Page appears to be JavaScript-heavy')
  }

  return {
    id: 'E3',
    module: 'E',
    title: 'Server-rendered content',
    whyItMatters: 'Content that requires JavaScript may not be accessible to all AI crawlers.',
    maxPoints: 2,
    earnedPoints: points,
    status,
    evidence,
    recommendation: hasServerContent && !isJsHeavy
      ? 'Good server-rendered content.'
      : 'Ensure main content is in the initial HTML response, not loaded via JavaScript.',
  }
}

export function evaluateModuleE(extraction: PageExtraction): RuleResult[] {
  return [
    ruleE1(extraction),
    ruleE2(extraction),
    ruleE3(extraction),
  ]
}
