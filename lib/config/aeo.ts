/**
 * AEO Analyzer Configuration
 * All values can be overridden via environment variables.
 * Safe defaults are provided for local development.
 */

function getEnvInt(key: string, defaultValue: number): number {
  const value = process.env[key]
  if (!value) return defaultValue
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? defaultValue : parsed
}

function getEnvString(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue
}

export const AEO_CONFIG = {
  // Rate limiting
  RATE_LIMIT_PER_HOUR: getEnvInt('AEO_RATE_LIMIT_PER_HOUR', 10),
  DOMAIN_LIMIT_PER_DAY: getEnvInt('AEO_DOMAIN_LIMIT_PER_DAY', 50),

  // Timeouts (in milliseconds)
  FETCH_TIMEOUT_MS: getEnvInt('AEO_FETCH_TIMEOUT_MS', 12000),
  RENDER_TIMEOUT_MS: getEnvInt('AEO_RENDER_TIMEOUT_MS', 15000),

  // Size limits
  MAX_HTML_BYTES: getEnvInt('AEO_MAX_HTML_BYTES', 2000000), // 2 MB
  MAX_TEXT_CHARS: getEnvInt('AEO_MAX_TEXT_CHARS', 200000),  // 200k chars
  MAX_REDIRECTS: getEnvInt('AEO_MAX_REDIRECTS', 5),

  // Security
  IP_HASH_SALT: getEnvString('AEO_IP_HASH_SALT', ''),

  // Environment detection
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const

/**
 * Validate required configuration for production.
 * In development, we allow missing salt but log a warning.
 */
export function validateConfig(): { valid: boolean; error?: string } {
  if (AEO_CONFIG.IS_PRODUCTION && !AEO_CONFIG.IP_HASH_SALT) {
    return {
      valid: false,
      error: 'AEO_IP_HASH_SALT is required in production for privacy compliance.',
    }
  }

  if (!AEO_CONFIG.IP_HASH_SALT) {
    console.warn('[AEO Config] Warning: AEO_IP_HASH_SALT not set. Using empty salt for development.')
  }

  return { valid: true }
}
