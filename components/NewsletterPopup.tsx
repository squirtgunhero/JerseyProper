'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const STORAGE_KEY = 'jp_newsletter_dismissed'
const SHOW_DELAY_MS = 5000

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Allow ?show_newsletter=1 to bypass localStorage for testing
    const params = new URLSearchParams(window.location.search)
    const forceShow = params.get('show_newsletter') === '1'

    if (!forceShow) {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (dismissed) return
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, SHOW_DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus('success')
      localStorage.setItem(STORAGE_KEY, 'true')

      // Auto-close after showing success
      setTimeout(() => setIsVisible(false), 3000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000000] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1000001] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="newsletter-popup relative w-full max-w-lg pointer-events-auto shadow-2xl overflow-hidden"
              style={{
                backgroundColor: '#1B4332',
                backgroundImage: `
                  linear-gradient(45deg, rgba(0,0,0,0.12) 25%, transparent 25%),
                  linear-gradient(-45deg, rgba(0,0,0,0.12) 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.12) 75%),
                  linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.12) 75%)
                `,
                backgroundSize: '30px 30px',
                backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 text-white/60 hover:text-white transition-colors"
                aria-label="Close newsletter popup"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center px-8 py-10 md:px-12 md:py-14">
                {/* JP Logo Circle */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-8 border-2 border-white/20"
                  style={{ backgroundColor: '#2D6A4F' }}
                >
                  <span className="text-white font-display text-2xl font-bold tracking-wide">JP</span>
                </div>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">
                      You&apos;re In!
                    </h3>
                    <p className="text-white/60 text-sm">Welcome to the Jersey Proper newsletter.</p>
                  </motion.div>
                ) : (
                  <>
                    {/* Headline */}
                    <h2 className="text-white text-center text-2xl md:text-3xl font-bold uppercase tracking-wide leading-tight mb-3">
                      Stay In The Know
                    </h2>

                    <p className="text-white/60 text-center text-sm mb-8 max-w-xs">
                      Get exclusive insights on branding, design, and digital strategy delivered to your inbox.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="newsletter-input-green w-full bg-white text-gray-900 placeholder:text-gray-400 px-5 py-3.5 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
                      />

                      {status === 'error' && (
                        <p className="text-red-300 text-xs text-center">{errorMessage}</p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                        whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                        className="w-full text-white text-sm font-bold uppercase tracking-wider py-3.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#40916C' }}
                        onMouseEnter={(e) => {
                          if (status !== 'loading') e.currentTarget.style.backgroundColor = '#52B788'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#40916C'
                        }}
                      >
                        {status === 'loading' ? 'Subscribing...' : 'Sign Up Now  \u203A'}
                      </motion.button>

                      <p className="text-white/40 text-xs text-center">
                        No spam, ever. Unsubscribe anytime.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
