// Stopwords for text analysis
export const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
  'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it',
  'we', 'they', 'what', 'which', 'who', 'whom', 'whose', 'when', 'where',
  'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most',
  'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
  'so', 'than', 'too', 'very', 'just', 'also', 'now', 'here', 'there'
])

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1)
}

export function removeStopwords(tokens: string[]): string[] {
  return tokens.filter(t => !STOPWORDS.has(t))
}

export function jaccard(set1: Set<string>, set2: Set<string>): number {
  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])
  return union.size > 0 ? intersection.size / union.size : 0
}

export function computeGrade(percentage: number): string {
  if (percentage >= 90) return 'A'
  if (percentage >= 80) return 'B'
  if (percentage >= 70) return 'C'
  if (percentage >= 60) return 'D'
  return 'F'
}

// Boilerplate detection words
export const BOILERPLATE_WORDS = new Set([
  'cookie', 'cookies', 'privacy', 'policy', 'terms', 'conditions',
  'subscribe', 'newsletter', 'navigation', 'menu', 'skip', 'search',
  'login', 'signup', 'register', 'account', 'cart', 'checkout'
])

export function containsBoilerplate(text: string): boolean {
  const lower = text.toLowerCase()
  return [...BOILERPLATE_WORDS].some(word => lower.includes(word))
}

export function isDefinitionalSentence(sentence: string): boolean {
  const lower = sentence.toLowerCase().trim()
  const patterns = [
    /\bis\b/,
    /\bare\b/,
    /\bmeans\b/,
    /\brefers to\b/,
    /\bdefined as\b/,
    /\bin short[,:]?\b/,
    /\bsimply put\b/,
    /\bessentially\b/,
  ]
  return patterns.some(p => p.test(lower))
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length
}

export function getSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10)
}
