import type { PageExtraction, Heading } from '../extract/types'
import { tokenize, removeStopwords, getSentences, isDefinitionalSentence, countWords } from '../rules/utils'

export interface QueryAnalysis {
  queryFitScore: number
  answerDraft: string | null
  suggestedFaqs: string[]
  coverage: {
    titleMatch: number
    headingsMatch: number
    contentMatch: number
  }
  queryIntent: 'what' | 'how' | 'why' | 'when' | 'where' | 'other'
  missingElements: string[]
}

function detectQueryIntent(query: string): 'what' | 'how' | 'why' | 'when' | 'where' | 'other' {
  const lower = query.toLowerCase().trim()
  if (lower.startsWith('what') || lower.includes('what is') || lower.includes('what are')) {
    return 'what'
  }
  if (lower.startsWith('how') || lower.includes('how to') || lower.includes('how do')) {
    return 'how'
  }
  if (lower.startsWith('why')) {
    return 'why'
  }
  if (lower.startsWith('when')) {
    return 'when'
  }
  if (lower.startsWith('where')) {
    return 'where'
  }
  return 'other'
}

function extractTopic(query: string): string {
  // Remove common question words and extract the main topic
  const cleaned = query
    .toLowerCase()
    .replace(/^(what is|what are|how to|how do you|how does|why is|why do|when is|where is|can you|should i|does|do|is|are)\s*/i, '')
    .replace(/\?$/, '')
    .trim()
  
  return cleaned || query
}

function computeOverlap(queryTokens: Set<string>, textTokens: Set<string>): number {
  const intersection = [...queryTokens].filter(t => textTokens.has(t))
  return queryTokens.size > 0 ? intersection.length / queryTokens.size : 0
}

function findBestDefinitionalSentence(text: string, queryTokens: Set<string>): string | null {
  const sentences = getSentences(text)
  
  // First, try to find a definitional sentence that contains query terms
  for (const sentence of sentences) {
    if (isDefinitionalSentence(sentence) && countWords(sentence) <= 35) {
      const sentenceTokens = new Set(removeStopwords(tokenize(sentence)))
      const overlap = computeOverlap(queryTokens, sentenceTokens)
      if (overlap > 0.2) {
        return sentence
      }
    }
  }
  
  // Fallback to any definitional sentence
  for (const sentence of sentences) {
    if (isDefinitionalSentence(sentence) && countWords(sentence) <= 35) {
      return sentence
    }
  }
  
  return null
}

function findSecondSentence(text: string, queryTokens: Set<string>, firstSentence: string): string | null {
  const sentences = getSentences(text)
  
  for (const sentence of sentences) {
    if (sentence === firstSentence) continue
    if (countWords(sentence) > 40) continue
    
    const sentenceTokens = new Set(removeStopwords(tokenize(sentence)))
    const hasQueryTerm = [...queryTokens].some(t => sentenceTokens.has(t))
    const hasNumber = /\d+/.test(sentence)
    const hasStep = /\b(step|first|then|next)\b/i.test(sentence)
    
    if (hasQueryTerm || hasNumber || hasStep) {
      return sentence
    }
  }
  
  // Fallback to second sentence if exists
  if (sentences.length > 1 && sentences[1] !== firstSentence) {
    return sentences[1]
  }
  
  return null
}

function generateFaqs(topic: string, intent: QueryAnalysis['queryIntent'], headings: Heading[]): string[] {
  const faqs: string[] = []
  const existingHeadings = new Set(headings.map(h => h.text.toLowerCase()))
  
  // Base templates
  const templates = [
    `What is ${topic}?`,
    `How does ${topic} work?`,
    `Why is ${topic} important?`,
    `How to use ${topic}?`,
    `What are the benefits of ${topic}?`,
    `Common mistakes with ${topic}`,
    `${topic} best practices`,
    `How much does ${topic} cost?`,
    `How long does ${topic} take?`,
    `What are the requirements for ${topic}?`,
  ]
  
  // Add templates that aren't already covered by headings
  for (const template of templates) {
    const templateLower = template.toLowerCase()
    const isDuplicate = [...existingHeadings].some(h => 
      h.includes(topic.split(' ')[0]) && 
      (h.includes('what') || h.includes('how') || h.includes('why'))
    )
    
    if (!isDuplicate) {
      faqs.push(template)
    }
    
    if (faqs.length >= 7) break
  }
  
  // Add intent-specific FAQs
  if (intent === 'how' && faqs.length < 10) {
    faqs.push(`Step-by-step guide to ${topic}`)
    faqs.push(`Tips for ${topic}`)
  }
  
  if (intent === 'what' && faqs.length < 10) {
    faqs.push(`Types of ${topic}`)
    faqs.push(`Examples of ${topic}`)
  }
  
  return faqs.slice(0, 10)
}

export function analyzeQuery(query: string, extraction: PageExtraction): QueryAnalysis {
  const queryTokens = new Set(removeStopwords(tokenize(query)))
  const intent = detectQueryIntent(query)
  const topic = extractTopic(query)
  
  // Compute coverage scores
  const titleTokens = new Set(removeStopwords(tokenize(extraction.title || '')))
  const h1Tokens = new Set(removeStopwords(tokenize(extraction.h1 || '')))
  const titleH1Tokens = new Set([...titleTokens, ...h1Tokens])
  
  const headingsText = extraction.headings.map(h => h.text).join(' ')
  const headingsTokens = new Set(removeStopwords(tokenize(headingsText)))
  
  const contentTokens = new Set(removeStopwords(tokenize(extraction.topText)))
  
  const titleMatch = computeOverlap(queryTokens, titleH1Tokens)
  const headingsMatch = computeOverlap(queryTokens, headingsTokens)
  const contentMatch = computeOverlap(queryTokens, contentTokens)
  
  // Compute penalties
  let penalty = 0
  const missingElements: string[] = []
  
  if (intent === 'how') {
    // Check for ordered steps
    const hasSteps = extraction.listsCount > 0 || 
                     /\b(step\s+\d|first|second|third)\b/i.test(extraction.mainText)
    if (!hasSteps) {
      penalty += 15
      missingElements.push('Step-by-step instructions')
    }
  }
  
  if (intent === 'what') {
    // Check for definitional sentence
    const hasDef = findBestDefinitionalSentence(extraction.topText, queryTokens) !== null
    if (!hasDef) {
      penalty += 15
      missingElements.push('Clear definition or explanation')
    }
  }
  
  // Calculate fit score
  const baseScore = (titleMatch * 30) + (headingsMatch * 30) + (contentMatch * 40)
  const queryFitScore = Math.max(0, Math.min(100, Math.round(baseScore * 100) - penalty))
  
  // Generate answer draft
  let answerDraft: string | null = null
  const firstSentence = findBestDefinitionalSentence(extraction.topText, queryTokens) || 
                        getSentences(extraction.topText)[0] || null
  
  if (firstSentence) {
    const secondSentence = findSecondSentence(extraction.topText, queryTokens, firstSentence)
    answerDraft = secondSentence 
      ? `${firstSentence}. ${secondSentence}.`
      : `${firstSentence}.`
    
    // Clean up
    answerDraft = answerDraft.replace(/\.+/g, '.').replace(/\s+/g, ' ').trim()
  }
  
  // Generate FAQ suggestions
  const suggestedFaqs = generateFaqs(topic, intent, extraction.headings)
  
  return {
    queryFitScore,
    answerDraft,
    suggestedFaqs,
    coverage: {
      titleMatch: Math.round(titleMatch * 100),
      headingsMatch: Math.round(headingsMatch * 100),
      contentMatch: Math.round(contentMatch * 100),
    },
    queryIntent: intent,
    missingElements,
  }
}
