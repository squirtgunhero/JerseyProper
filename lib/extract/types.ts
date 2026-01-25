export interface Heading {
  level: number
  text: string
}

export interface SentenceStats {
  count: number
  avgLength: number
  minLength: number
  maxLength: number
}

export interface JsonLdObject {
  raw: string
  parsed: Record<string, unknown> | null
  type: string | null
}

export interface PageExtraction {
  title: string | null
  description: string | null
  canonical: string | null
  h1: string | null
  headings: Heading[]
  mainText: string
  topText: string
  wordCount: number
  listsCount: number
  tablesCount: number
  internalLinksCount: number
  externalLinksCount: number
  externalLinks: string[]
  jsonLd: JsonLdObject[]
  robotsMeta: string | null
  responseHeaders: Record<string, string>
  linkDensity: number
  sentenceStats: SentenceStats
  fetchType: 'raw' | 'rendered'
  isJsShell: boolean
  warnings: string[]
}

export interface FetchResult {
  html: string
  headers: Record<string, string>
  statusCode: number
  url: string
  warnings: string[]
  truncated: boolean
}
