/**
 * Abuse Prevention Guards for AEO Analyzer
 * 
 * Provides rate limiting by IP and domain limits per day.
 * All limits are DB-backed for serverless compatibility.
 */

import { createHash } from 'crypto'
import { prisma } from '@/lib/db'
import { AEO_CONFIG, validateConfig } from '@/lib/config/aeo'

// ============================================================================
// Error Types
// ============================================================================

export class AbuseGuardError extends Error {
  constructor(
    public code: 'RATE_LIMITED' | 'DOMAIN_LIMITED' | 'CONFIG_ERROR',
    message: string
  ) {
    super(message)
    this.name = 'AbuseGuardError'
  }
}

// ============================================================================
// IP Hashing
// ============================================================================

/**
 * Hash an IP address with the configured salt.
 * Never store or log raw IPs.
 */
export function hashIP(ip: string): string {
  const salt = AEO_CONFIG.IP_HASH_SALT
  return createHash('sha256')
    .update(ip + salt)
    .digest('hex')
}

// ============================================================================
// Domain Extraction
// ============================================================================

/**
 * Extract domain from a URL, handling punycode safely.
 */
export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url)
    // hostname already handles punycode
    return parsed.hostname.toLowerCase()
  } catch {
    // If URL parsing fails, try to extract domain manually
    const match = url.match(/^(?:https?:\/\/)?([^\/:\?]+)/)
    return match ? match[1].toLowerCase() : 'unknown'
  }
}

/**
 * Extract path from a URL.
 */
export function extractPath(url: string): string | null {
  try {
    const parsed = new URL(url)
    return parsed.pathname || null
  } catch {
    return null
  }
}

// ============================================================================
// Rate Limiting
// ============================================================================

interface CheckLimitsParams {
  ip: string
  url: string
}

interface CheckLimitsResult {
  allowed: boolean
  ipHash: string
  domain: string
  path: string | null
  error?: AbuseGuardError
}

/**
 * Check if the request is within rate limits.
 * This checks both IP-based and domain-based limits.
 */
export async function checkAbuseLimits(
  params: CheckLimitsParams
): Promise<CheckLimitsResult> {
  const { ip, url } = params

  // Validate configuration
  const configValidation = validateConfig()
  if (!configValidation.valid) {
    console.error('[Abuse Guard] Configuration error:', configValidation.error)
    return {
      allowed: false,
      ipHash: '',
      domain: '',
      path: null,
      error: new AbuseGuardError('CONFIG_ERROR', configValidation.error!),
    }
  }

  const ipHash = hashIP(ip)
  const domain = extractDomain(url)
  const path = extractPath(url)

  // Check IP rate limit (per hour)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  const ipUsageCount = await prisma.usageEvent.count({
    where: {
      ipHash,
      createdAt: { gte: oneHourAgo },
    },
  })

  if (ipUsageCount >= AEO_CONFIG.RATE_LIMIT_PER_HOUR) {
    console.log(`[Abuse Guard] Rate limit exceeded for IP hash: ${ipHash.slice(0, 8)}...`)
    return {
      allowed: false,
      ipHash,
      domain,
      path,
      error: new AbuseGuardError(
        'RATE_LIMITED',
        'Too many scans from this IP. Try again later.'
      ),
    }
  }

  // Check domain limit (per day)
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const domainUsageCount = await prisma.usageEvent.count({
    where: {
      domain,
      createdAt: { gte: startOfToday },
    },
  })

  if (domainUsageCount >= AEO_CONFIG.DOMAIN_LIMIT_PER_DAY) {
    console.log(`[Abuse Guard] Domain limit exceeded for: ${domain}`)
    return {
      allowed: false,
      ipHash,
      domain,
      path,
      error: new AbuseGuardError(
        'DOMAIN_LIMITED',
        'Daily scan limit reached for this domain. Try tomorrow.'
      ),
    }
  }

  return {
    allowed: true,
    ipHash,
    domain,
    path,
  }
}

// ============================================================================
// Usage Recording
// ============================================================================

interface RecordUsageParams {
  ipHash: string
  domain: string
  path?: string | null
  auditId?: string | null
}

/**
 * Record a usage event for tracking.
 * Call this BEFORE starting the audit to prevent parallel request abuse.
 */
export async function recordUsageEvent(params: RecordUsageParams): Promise<void> {
  const { ipHash, domain, path, auditId } = params

  await prisma.usageEvent.create({
    data: {
      ipHash,
      domain,
      path: path || null,
      auditId: auditId || null,
    },
  })

  console.log(`[Abuse Guard] Usage recorded for domain: ${domain}`)
}

// ============================================================================
// Cleanup (optional utility for maintenance)
// ============================================================================

/**
 * Delete old usage events (older than specified days).
 * Can be called from a cron job for cleanup.
 */
export async function cleanupOldUsageEvents(daysToKeep: number = 7): Promise<number> {
  const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)
  
  const result = await prisma.usageEvent.deleteMany({
    where: {
      createdAt: { lt: cutoffDate },
    },
  })

  console.log(`[Abuse Guard] Cleaned up ${result.count} old usage events`)
  return result.count
}
