/**
 * Page Fetching with Abuse Prevention Guards
 * 
 * Includes:
 * - Configurable timeout via AbortController
 * - Size limits with streaming
 * - Redirect limits
 * - Proper error handling
 */

import type { FetchResult } from '../extract/types'
import { AEO_CONFIG } from '../config/aeo'

const USER_AGENT = 'Mozilla/5.0 (compatible; JerseyProperBot/1.0; +https://jerseyproper.com)'

// ============================================================================
// Custom Error Types
// ============================================================================

export class FetchError extends Error {
  constructor(
    public code: 'TIMEOUT' | 'TOO_LARGE' | 'TOO_MANY_REDIRECTS' | 'NETWORK_ERROR',
    message: string
  ) {
    super(message)
    this.name = 'FetchError'
  }
}

// ============================================================================
// Fetch with Guards
// ============================================================================

export async function fetchPage(url: string): Promise<FetchResult> {
  const warnings: string[] = []
  let truncated = false

  // Create abort controller for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, AEO_CONFIG.FETCH_TIMEOUT_MS)

  try {
    // Track redirects manually for counting
    let redirectCount = 0
    let currentUrl = url
    let response: Response

    // Manual redirect following to count redirects
    // eslint-disable-next-line no-constant-condition
    while (true) {
      response = await fetch(currentUrl, {
        method: 'GET',
        headers: {
          'User-Agent': USER_AGENT,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        redirect: 'manual', // Handle redirects manually
        signal: controller.signal,
      })

      // Check if it's a redirect
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location')
        if (!location) break

        redirectCount++
        if (redirectCount > AEO_CONFIG.MAX_REDIRECTS) {
          throw new FetchError(
            'TOO_MANY_REDIRECTS',
            `Too many redirects (>${AEO_CONFIG.MAX_REDIRECTS})`
          )
        }

        // Resolve relative URL
        currentUrl = new URL(location, currentUrl).href
        continue
      }

      break
    }

    // Check content-length header if present
    const contentLength = response.headers.get('content-length')
    if (contentLength) {
      const size = parseInt(contentLength, 10)
      if (!isNaN(size) && size > AEO_CONFIG.MAX_HTML_BYTES) {
        throw new FetchError(
          'TOO_LARGE',
          `Response too large: ${size} bytes (max: ${AEO_CONFIG.MAX_HTML_BYTES})`
        )
      }
    }

    // Read body with size limit using streaming
    let html: string
    const body = response.body

    if (body) {
      const reader = body.getReader()
      const decoder = new TextDecoder('utf-8')
      const chunks: string[] = []
      let totalBytes = 0

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        totalBytes += value.length

        if (totalBytes > AEO_CONFIG.MAX_HTML_BYTES) {
          // Cancel the stream and truncate
          await reader.cancel()
          chunks.push(decoder.decode(value, { stream: false }))
          truncated = true
          warnings.push(
            `HTML truncated at ${AEO_CONFIG.MAX_HTML_BYTES} bytes; some content may be missing.`
          )
          console.log(`[Fetch] HTML truncated for ${currentUrl}: ${totalBytes} bytes`)
          break
        }

        chunks.push(decoder.decode(value, { stream: true }))
      }

      html = chunks.join('')
    } else {
      // Fallback: read as text (less safe but works for some environments)
      html = await response.text()
      if (html.length > AEO_CONFIG.MAX_HTML_BYTES) {
        html = html.slice(0, AEO_CONFIG.MAX_HTML_BYTES)
        truncated = true
        warnings.push(
          `HTML truncated at ${AEO_CONFIG.MAX_HTML_BYTES} bytes; some content may be missing.`
        )
      }
    }

    // Build headers map
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value
    })

    return {
      html,
      headers,
      statusCode: response.status,
      url: currentUrl,
      warnings,
      truncated,
    }
  } catch (error) {
    if (error instanceof FetchError) {
      throw error
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new FetchError(
          'TIMEOUT',
          `Request timed out after ${AEO_CONFIG.FETCH_TIMEOUT_MS}ms`
        )
      }

      throw new FetchError('NETWORK_ERROR', error.message)
    }

    throw new FetchError('NETWORK_ERROR', 'Unknown fetch error')
  } finally {
    clearTimeout(timeoutId)
  }
}
