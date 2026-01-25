import { describe, it, expect } from 'vitest'
import { 
  tokenize, 
  removeStopwords, 
  jaccard, 
  computeGrade,
  isDefinitionalSentence,
  countWords,
  containsBoilerplate
} from '../utils'

describe('tokenize', () => {
  it('splits text into lowercase tokens', () => {
    expect(tokenize('Hello World')).toEqual(['hello', 'world'])
  })

  it('removes punctuation', () => {
    expect(tokenize('Hello, World!')).toEqual(['hello', 'world'])
  })

  it('filters single character tokens', () => {
    expect(tokenize('a b cd ef')).toEqual(['cd', 'ef'])
  })
})

describe('removeStopwords', () => {
  it('removes common stopwords', () => {
    const tokens = ['the', 'quick', 'brown', 'fox', 'is', 'fast']
    expect(removeStopwords(tokens)).toEqual(['quick', 'brown', 'fox', 'fast'])
  })
})

describe('jaccard', () => {
  it('returns 1 for identical sets', () => {
    const set = new Set(['a', 'b', 'c'])
    expect(jaccard(set, set)).toBe(1)
  })

  it('returns 0 for disjoint sets', () => {
    const set1 = new Set(['a', 'b'])
    const set2 = new Set(['c', 'd'])
    expect(jaccard(set1, set2)).toBe(0)
  })

  it('returns correct value for partial overlap', () => {
    const set1 = new Set(['a', 'b', 'c'])
    const set2 = new Set(['b', 'c', 'd'])
    expect(jaccard(set1, set2)).toBe(0.5) // 2 overlap / 4 union
  })

  it('handles empty sets', () => {
    expect(jaccard(new Set(), new Set())).toBe(0)
  })
})

describe('computeGrade', () => {
  it('returns A for 90+', () => {
    expect(computeGrade(90)).toBe('A')
    expect(computeGrade(100)).toBe('A')
  })

  it('returns B for 80-89', () => {
    expect(computeGrade(80)).toBe('B')
    expect(computeGrade(89)).toBe('B')
  })

  it('returns C for 70-79', () => {
    expect(computeGrade(70)).toBe('C')
  })

  it('returns D for 60-69', () => {
    expect(computeGrade(60)).toBe('D')
  })

  it('returns F for below 60', () => {
    expect(computeGrade(59)).toBe('F')
    expect(computeGrade(0)).toBe('F')
  })
})

describe('isDefinitionalSentence', () => {
  it('detects "is" patterns', () => {
    expect(isDefinitionalSentence('AEO is the practice of optimizing content')).toBe(true)
  })

  it('detects "means" patterns', () => {
    expect(isDefinitionalSentence('This means that the content should be clear')).toBe(true)
  })

  it('detects "refers to" patterns', () => {
    expect(isDefinitionalSentence('SEO refers to search engine optimization')).toBe(true)
  })

  it('returns false for non-definitional sentences', () => {
    expect(isDefinitionalSentence('Click here to learn more')).toBe(false)
  })
})

describe('countWords', () => {
  it('counts words correctly', () => {
    expect(countWords('hello world')).toBe(2)
    expect(countWords('one two three four five')).toBe(5)
  })

  it('handles multiple spaces', () => {
    expect(countWords('hello   world')).toBe(2)
  })

  it('handles empty string', () => {
    expect(countWords('')).toBe(0)
  })
})

describe('containsBoilerplate', () => {
  it('detects cookie language', () => {
    expect(containsBoilerplate('We use cookies to improve your experience')).toBe(true)
  })

  it('detects privacy language', () => {
    expect(containsBoilerplate('Read our privacy policy')).toBe(true)
  })

  it('returns false for normal content', () => {
    expect(containsBoilerplate('AEO is a new approach to content optimization')).toBe(false)
  })
})
