// Module F: Citation likelihood (0-10 points)
import type { PageExtraction } from '../extract/types'
import type { RuleResult } from './types'

// F1: Unique value signals (5 points)
export function ruleF1(extraction: PageExtraction): RuleResult {
  const text = extraction.mainText
  const evidence: string[] = []
  let signals = 0

  // Check for statistics/numbers
  const numberPattern = /\d+(?:\.\d+)?(?:\s*(?:%|percent|million|billion|thousand))?/g
  const numbers = text.match(numberPattern)
  if (numbers && numbers.length >= 3) {
    signals++
    evidence.push(`Contains ${numbers.length} numeric values/statistics`)
  }

  // Check for step language
  const stepPattern = /\b(step\s+\d|first[,:]|second[,:]|third[,:]|next[,:]|finally[,:]|then[,:])\b/gi
  const steps = text.match(stepPattern)
  if (steps && steps.length >= 2) {
    signals++
    evidence.push(`Contains step-by-step language: ${steps.slice(0, 3).join(', ')}`)
  }

  // Check for definition patterns
  const defPattern = /\b(is defined as|refers to|means that|in other words)\b/gi
  const definitions = text.match(defPattern)
  if (definitions) {
    signals++
    evidence.push('Contains definitional language')
  }

  const passes = signals >= 1

  return {
    id: 'F1',
    module: 'F',
    title: 'Unique value signals',
    whyItMatters: 'Original data, statistics, and structured explanations make content more citable.',
    maxPoints: 5,
    earnedPoints: passes ? 5 : 0,
    status: passes ? 'pass' : 'warn',
    evidence: evidence.length > 0 ? evidence : ['No unique value signals detected'],
    recommendation: passes
      ? 'Content contains citable elements.'
      : 'Add original statistics, step-by-step instructions, or clear definitions.',
  }
}

// F2: Sources/references section (5 points)
export function ruleF2(extraction: PageExtraction): RuleResult {
  const referenceHeadings = [
    'sources', 'references', 'citations', 'bibliography',
    'further reading', 'related resources', 'learn more',
    'additional resources'
  ]

  const headingTexts = extraction.headings.map(h => h.text.toLowerCase())
  const foundHeadings = referenceHeadings.filter(ref => 
    headingTexts.some(h => h.includes(ref))
  )

  const passes = foundHeadings.length > 0

  return {
    id: 'F2',
    module: 'F',
    title: 'Sources/references section',
    whyItMatters: 'A dedicated references section signals well-researched, authoritative content.',
    maxPoints: 5,
    earnedPoints: passes ? 5 : 0,
    status: passes ? 'pass' : 'warn',
    evidence: passes
      ? [`Found reference section: "${foundHeadings[0]}"`]
      : ['No sources/references section found'],
    recommendation: passes
      ? 'References section present.'
      : 'Add a "Sources" or "References" section with links to supporting materials.',
  }
}

export function evaluateModuleF(extraction: PageExtraction): RuleResult[] {
  return [
    ruleF1(extraction),
    ruleF2(extraction),
  ]
}
