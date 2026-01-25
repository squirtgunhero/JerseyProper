// Module D: Structured data (0-15 points)
import type { PageExtraction } from '../extract/types'
import type { RuleResult } from './types'

const RECOGNIZED_TYPES = [
  'Article', 'NewsArticle', 'BlogPosting',
  'FAQPage', 'HowTo', 'Product', 
  'Organization', 'LocalBusiness', 'Corporation',
  'BreadcrumbList', 'WebPage', 'WebSite',
  'Person', 'Review', 'Recipe'
]

// D1: JSON-LD present (6 points)
export function ruleD1(extraction: PageExtraction): RuleResult {
  const count = extraction.jsonLd.length
  const found = count > 0

  return {
    id: 'D1',
    module: 'D',
    title: 'JSON-LD present',
    whyItMatters: 'Structured data helps AI understand your content type and extract key information.',
    maxPoints: 6,
    earnedPoints: found ? 6 : 0,
    status: found ? 'pass' : 'fail',
    evidence: found
      ? [`Found ${count} JSON-LD block(s)`]
      : ['No JSON-LD structured data found'],
    recommendation: found
      ? 'Structured data present.'
      : 'Add JSON-LD schema markup for your content type (Article, HowTo, FAQPage, etc.)',
  }
}

// D2: Recognized schema types (6 points, scaled)
export function ruleD2(extraction: PageExtraction): RuleResult {
  const foundTypes: string[] = []

  for (const ld of extraction.jsonLd) {
    if (ld.type && RECOGNIZED_TYPES.includes(ld.type)) {
      foundTypes.push(ld.type)
    }
    // Also check @graph for nested types
    if (ld.parsed && Array.isArray((ld.parsed as Record<string, unknown>)['@graph'])) {
      const graph = (ld.parsed as Record<string, unknown>)['@graph'] as Array<Record<string, unknown>>
      for (const item of graph) {
        const type = item['@type'] as string | undefined
        if (type && RECOGNIZED_TYPES.includes(type)) {
          foundTypes.push(type)
        }
      }
    }
  }

  const uniqueTypes = [...new Set(foundTypes)]
  const points = Math.min(6, uniqueTypes.length * 2)

  return {
    id: 'D2',
    module: 'D',
    title: 'Recognized schema types',
    whyItMatters: 'Using established schema types (Article, FAQPage, HowTo) enables rich results and AI understanding.',
    maxPoints: 6,
    earnedPoints: points,
    status: uniqueTypes.length >= 2 ? 'pass' : uniqueTypes.length >= 1 ? 'warn' : 'fail',
    evidence: uniqueTypes.length > 0
      ? [`Found types: ${uniqueTypes.join(', ')}`]
      : ['No recognized schema types found'],
    recommendation: uniqueTypes.length >= 2
      ? `Good! Using ${uniqueTypes.length} schema types.`
      : 'Add specific schema types like Article, FAQPage, or HowTo markup.',
  }
}

// D3: Basic schema validity (3 points)
export function ruleD3(extraction: PageExtraction): RuleResult {
  let valid = 0
  let invalid = 0
  const issues: string[] = []

  for (const ld of extraction.jsonLd) {
    if (ld.parsed === null) {
      invalid++
      issues.push('Invalid JSON in schema block')
    } else {
      const hasContext = '@context' in (ld.parsed as Record<string, unknown>)
      if (!hasContext) {
        invalid++
        issues.push('Missing @context in schema')
      } else {
        valid++
      }
    }
  }

  const allValid = extraction.jsonLd.length > 0 && invalid === 0

  return {
    id: 'D3',
    module: 'D',
    title: 'Basic schema validity',
    whyItMatters: 'Invalid schema markup is ignored by search engines and AI systems.',
    maxPoints: 3,
    earnedPoints: allValid ? 3 : valid > 0 ? 1 : 0,
    status: allValid ? 'pass' : valid > 0 ? 'warn' : extraction.jsonLd.length === 0 ? 'warn' : 'fail',
    evidence: extraction.jsonLd.length === 0
      ? ['No schema to validate']
      : issues.length > 0 
        ? issues 
        : [`${valid} valid schema block(s)`],
    recommendation: allValid
      ? 'Schema is valid.'
      : 'Ensure all JSON-LD blocks are valid JSON and include @context.',
  }
}

export function evaluateModuleD(extraction: PageExtraction): RuleResult[] {
  return [
    ruleD1(extraction),
    ruleD2(extraction),
    ruleD3(extraction),
  ]
}
