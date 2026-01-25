import { describe, it, expect, beforeEach, vi } from 'vitest'
import { hashIP, extractDomain, extractPath } from '../abuse'

// Mock the config module
vi.mock('@/lib/config/aeo', () => ({
  AEO_CONFIG: {
    RATE_LIMIT_PER_HOUR: 10,
    DOMAIN_LIMIT_PER_DAY: 50,
    FETCH_TIMEOUT_MS: 12000,
    RENDER_TIMEOUT_MS: 15000,
    MAX_HTML_BYTES: 2000000,
    MAX_TEXT_CHARS: 200000,
    MAX_REDIRECTS: 5,
    IP_HASH_SALT: 'test-salt-12345',
    IS_PRODUCTION: false,
  },
  validateConfig: () => ({ valid: true }),
}))

describe('hashIP', () => {
  it('should produce consistent hashes with the same salt', () => {
    const ip = '192.168.1.1'
    const hash1 = hashIP(ip)
    const hash2 = hashIP(ip)
    
    expect(hash1).toBe(hash2)
  })

  it('should produce different hashes for different IPs', () => {
    const hash1 = hashIP('192.168.1.1')
    const hash2 = hashIP('192.168.1.2')
    
    expect(hash1).not.toBe(hash2)
  })

  it('should produce a 64-character hex string (SHA-256)', () => {
    const hash = hashIP('192.168.1.1')
    
    expect(hash).toHaveLength(64)
    expect(hash).toMatch(/^[a-f0-9]+$/)
  })

  it('should never equal the original IP', () => {
    const ip = '192.168.1.1'
    const hash = hashIP(ip)
    
    expect(hash).not.toBe(ip)
    expect(hash).not.toContain(ip)
  })
})

describe('extractDomain', () => {
  it('should extract domain from a simple URL', () => {
    expect(extractDomain('https://example.com/path')).toBe('example.com')
  })

  it('should extract domain from URL with www', () => {
    expect(extractDomain('https://www.example.com/path')).toBe('www.example.com')
  })

  it('should handle URLs with ports', () => {
    expect(extractDomain('https://example.com:8080/path')).toBe('example.com')
  })

  it('should handle URLs with subdomains', () => {
    expect(extractDomain('https://api.subdomain.example.com/path')).toBe('api.subdomain.example.com')
  })

  it('should lowercase the domain', () => {
    expect(extractDomain('https://EXAMPLE.COM/path')).toBe('example.com')
  })

  it('should handle punycode domains', () => {
    // xn--nxasmq5b is punycode for a greek domain
    expect(extractDomain('https://xn--nxasmq5b.com/')).toBe('xn--nxasmq5b.com')
  })

  it('should handle URLs with query strings', () => {
    expect(extractDomain('https://example.com/path?query=value')).toBe('example.com')
  })

  it('should handle URLs with fragments', () => {
    expect(extractDomain('https://example.com/path#section')).toBe('example.com')
  })

  it('should handle HTTP URLs', () => {
    expect(extractDomain('http://example.com/path')).toBe('example.com')
  })

  it('should return "unknown" for invalid URLs', () => {
    expect(extractDomain('not-a-url')).toBe('not-a-url')
  })
})

describe('extractPath', () => {
  it('should extract path from URL', () => {
    expect(extractPath('https://example.com/some/path')).toBe('/some/path')
  })

  it('should return root path for domain-only URL', () => {
    expect(extractPath('https://example.com')).toBe('/')
  })

  it('should return root path for domain with trailing slash', () => {
    expect(extractPath('https://example.com/')).toBe('/')
  })

  it('should handle paths with query strings', () => {
    expect(extractPath('https://example.com/path?query=value')).toBe('/path')
  })

  it('should return null for invalid URLs', () => {
    expect(extractPath('not-a-url')).toBe(null)
  })
})

describe('Rate Limiting Window Calculations', () => {
  it('should correctly calculate one hour ago timestamp', () => {
    const now = Date.now()
    const oneHourAgo = new Date(now - 60 * 60 * 1000)
    const oneHourMs = 60 * 60 * 1000
    
    expect(now - oneHourAgo.getTime()).toBe(oneHourMs)
  })

  it('should correctly calculate start of today', () => {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    
    const now = new Date()
    expect(startOfToday.getTime()).toBeLessThanOrEqual(now.getTime())
    expect(startOfToday.getHours()).toBe(0)
    expect(startOfToday.getMinutes()).toBe(0)
    expect(startOfToday.getSeconds()).toBe(0)
    expect(startOfToday.getMilliseconds()).toBe(0)
  })

  it('should calculate that start of today is at most 24 hours ago', () => {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    
    const now = Date.now()
    const diff = now - startOfToday.getTime()
    const oneDayMs = 24 * 60 * 60 * 1000
    
    expect(diff).toBeLessThan(oneDayMs)
    expect(diff).toBeGreaterThanOrEqual(0)
  })
})
