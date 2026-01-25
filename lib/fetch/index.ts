import { request } from 'undici'
import type { FetchResult } from '../extract/types'

const USER_AGENT = 'Mozilla/5.0 (compatible; JerseyProperBot/1.0; +https://jerseyproper.com)'

export async function fetchPage(url: string): Promise<FetchResult> {
  const response = await request(url, {
    method: 'GET',
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
    maxRedirections: 5,
  })

  const html = await response.body.text()
  
  const headers: Record<string, string> = {}
  for (const [key, value] of Object.entries(response.headers)) {
    if (typeof value === 'string') {
      headers[key.toLowerCase()] = value
    } else if (Array.isArray(value)) {
      headers[key.toLowerCase()] = value.join(', ')
    }
  }

  return {
    html,
    headers,
    statusCode: response.statusCode,
    url: url,
  }
}
