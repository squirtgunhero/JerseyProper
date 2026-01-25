import type { FetchResult } from '../extract/types'

const USER_AGENT = 'Mozilla/5.0 (compatible; JerseyProperBot/1.0; +https://jerseyproper.com)'

export async function fetchPage(url: string): Promise<FetchResult> {
  // Use native fetch with redirect following
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
    redirect: 'follow',
  })

  const html = await response.text()
  
  const headers: Record<string, string> = {}
  response.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value
  })

  return {
    html,
    headers,
    statusCode: response.status,
    url: response.url || url,
  }
}
