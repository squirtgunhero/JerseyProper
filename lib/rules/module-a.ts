// Module A: Answer-ability (0-25 points)
import type { PageExtraction } from '../extract/types'
import type { RuleResult } from './types'
import { 
  isDefinitionalSentence, 
  containsBoilerplate, 
  countWords,
  getSentences 
} from './utils'

// A1: Direct answer near top (10 points)
export function ruleA1(extraction: PageExtraction): RuleResult {
  const first500Words = extraction.topText.split(/\s+/).slice(0, 500).join(' ')
  const sentences = getSentences(first500Words)
  
  const definitionalSentences = sentences.filter(s => {
    const wordCount = countWords(s)
    return wordCount <= 30 && 
           isDefinitionalSentence(s) && 
           !containsBoilerplate(s)
  })

  const found = definitionalSentences.length > 0
  
  return {
    id: 'A1',
    module: 'A',
    title: 'Direct answer near top',
    whyItMatters: 'AI systems extract answers from the first few paragraphs. A clear, concise definition or answer early helps your content get selected.',
    maxPoints: 10,
    earnedPoints: found ? 10 : 0,
    status: found ? 'pass' : 'fail',
    evidence: found 
      ? [`Found definitional sentence: "${definitionalSentences[0].slice(0, 100)}..."`]
      : ['No clear definitional sentence found in first 500 words'],
    recommendation: found
      ? 'Good! You have a clear answer near the top.'
      : 'Add a 1-2 sentence definition or direct answer in your opening paragraph using "is", "means", or "refers to".',
  }
}

// A2: Question headings (5 points, scaled)
export function ruleA2(extraction: PageExtraction): RuleResult {
  const questionPattern = /^(what|how|why|when|where|can|should|does|do|is|are|will|which)\b|\?$/i
  
  const questionHeadings = extraction.headings.filter(h => 
    (h.level === 2 || h.level === 3) && questionPattern.test(h.text.trim())
  )

  const count = questionHeadings.length
  const points = Math.min(5, count * 1.25) // 4 questions = full points

  return {
    id: 'A2',
    module: 'A',
    title: 'Question-style headings',
    whyItMatters: 'Question headings (What is X? How to Y?) signal to AI that specific queries are answered below.',
    maxPoints: 5,
    earnedPoints: Math.round(points),
    status: count >= 3 ? 'pass' : count >= 1 ? 'warn' : 'fail',
    evidence: count > 0
      ? questionHeadings.slice(0, 3).map(h => `H${h.level}: "${h.text}"`)
      : ['No question-style headings found'],
    recommendation: count >= 3
      ? `Great! Found ${count} question headings.`
      : 'Add H2/H3 headings that start with What, How, Why, etc. or end with a question mark.',
  }
}

// A3: Lists/tables present (5 points)
export function ruleA3(extraction: PageExtraction): RuleResult {
  const total = extraction.listsCount + extraction.tablesCount
  const found = total >= 1

  return {
    id: 'A3',
    module: 'A',
    title: 'Lists or tables present',
    whyItMatters: 'Structured content like lists and tables is easier for AI to parse and quote accurately.',
    maxPoints: 5,
    earnedPoints: found ? 5 : 0,
    status: found ? 'pass' : 'fail',
    evidence: [`Found ${extraction.listsCount} lists and ${extraction.tablesCount} tables`],
    recommendation: found
      ? 'Good! Your page uses structured elements.'
      : 'Add bullet lists, numbered steps, or comparison tables to structure your content.',
  }
}

// A4: Snippet cleanliness (5 points)
export function ruleA4(extraction: PageExtraction): RuleResult {
  const avgSentenceLength = extraction.sentenceStats.avgLength
  const linkDensity = extraction.linkDensity
  
  const goodLength = avgSentenceLength > 0 && avgSentenceLength < 25
  const goodDensity = linkDensity < 0.25
  const passes = goodLength && goodDensity

  const evidence: string[] = []
  if (!goodLength) {
    evidence.push(`Average sentence length is ${avgSentenceLength} words (should be < 25)`)
  } else {
    evidence.push(`Average sentence length: ${avgSentenceLength} words`)
  }
  if (!goodDensity) {
    evidence.push(`Link density is ${(linkDensity * 100).toFixed(1)}% (should be < 25%)`)
  } else {
    evidence.push(`Link density: ${(linkDensity * 100).toFixed(1)}%`)
  }

  return {
    id: 'A4',
    module: 'A',
    title: 'Snippet cleanliness',
    whyItMatters: 'Clean, readable text with moderate sentence length and few inline links creates better snippets.',
    maxPoints: 5,
    earnedPoints: passes ? 5 : goodLength || goodDensity ? 2 : 0,
    status: passes ? 'pass' : goodLength || goodDensity ? 'warn' : 'fail',
    evidence,
    recommendation: passes
      ? 'Good! Your content is clean and readable.'
      : 'Shorten sentences and reduce inline links for better snippet extraction.',
  }
}

export function evaluateModuleA(extraction: PageExtraction): RuleResult[] {
  return [
    ruleA1(extraction),
    ruleA2(extraction),
    ruleA3(extraction),
    ruleA4(extraction),
  ]
}
