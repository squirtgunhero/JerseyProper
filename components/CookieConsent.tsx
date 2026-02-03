'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const GA_MEASUREMENT_ID = 'G-3MB1YMCJDR'
const COOKIE_NAME = 'jp_cookie_consent'
const COOKIE_EXPIRY_DAYS = 365

type ConsentStatus = 'accepted' | 'declined' | null

// Helper to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

// Helper to set cookie
function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

// Helper to delete GA cookies
function deleteGACookies() {
  const cookies = document.cookie.split(';')
  cookies.forEach(cookie => {
    const name = cookie.split('=')[0].trim()
    if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
      // Delete for current domain and subdomains
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`
    }
  })
}

// Load Google Analytics
function loadGoogleAnalytics() {
  // Check if already loaded
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    'anonymize_ip': true
  })
}

// Declare global types
declare global {
  interface Window {
    dataLayer: unknown[]
    showCookieConsent?: () => void
  }
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const showBanner = useCallback(() => {
    setIsAnimating(true)
    setIsVisible(true)
  }, [])

  const hideBanner = useCallback(() => {
    setIsAnimating(false)
    setTimeout(() => setIsVisible(false), 300)
  }, [])

  const handleAccept = useCallback(() => {
    setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS)
    loadGoogleAnalytics()
    hideBanner()
  }, [hideBanner])

  const handleDecline = useCallback(() => {
    setCookie(COOKIE_NAME, 'declined', COOKIE_EXPIRY_DAYS)
    deleteGACookies()
    hideBanner()
  }, [hideBanner])

  useEffect(() => {
    // Check existing consent
    const consent = getCookie(COOKIE_NAME) as ConsentStatus

    if (consent === 'accepted') {
      // User previously accepted - load GA
      loadGoogleAnalytics()
    } else if (consent === 'declined') {
      // User previously declined - ensure no GA cookies
      deleteGACookies()
    } else {
      // No consent recorded - show banner
      // Small delay for better UX
      setTimeout(() => {
        setIsAnimating(true)
        setIsVisible(true)
      }, 500)
    }

    // Expose showBanner globally for Cookie Settings link
    window.showCookieConsent = showBanner
  }, [showBanner])

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[999999] transition-transform duration-300 ease-out ${
        isAnimating ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-[#1a1a1a] border-t border-[#333333] px-4 py-4 md:px-6 md:py-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Text */}
          <p className="text-white text-sm md:text-base text-center md:text-left leading-relaxed">
            We use cookies to analyze site traffic and improve your experience. By clicking &quot;Accept,&quot; you consent to our use of analytics cookies.{' '}
            <Link 
              href="/cookies" 
              className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
            >
              Learn more
            </Link>
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-5 py-2.5 text-sm font-medium text-[#a0a0a0] hover:text-white bg-transparent border border-[#444444] hover:border-[#666666] rounded-lg transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 text-sm font-medium text-[#0a100d] bg-gold hover:bg-gold-light rounded-lg transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
