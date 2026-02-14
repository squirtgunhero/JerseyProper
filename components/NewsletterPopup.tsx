'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const STORAGE_KEY = 'jp_newsletter_dismissed'
const SHOW_DELAY_MS = 8000

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed) return

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
            className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100000] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="newsletter-popup relative w-full max-w-md bg-jp-black border border-gold/20 p-8 md:p-10 pointer-events-auto shadow-2xl">
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gold/40" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-gold/40" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-gold/40" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-gold/40" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-cream/40 hover:text-cream transition-colors"
                aria-label="Close newsletter popup"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="text-center">
                {/* Decorative label */}
                <div className="section-label justify-center mb-6">
                  <span>Stay Updated</span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl tracking-luxury uppercase text-cream font-medium mb-4">
                  Join the <span className="gold-text-static">Inner Circle</span>
                </h2>

                <p className="text-cream/50 text-sm font-light leading-relaxed mb-8 max-w-sm mx-auto">
                  Get exclusive insights on branding, design, and digital strategy delivered straight to your inbox.
                </p>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-6"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-gold/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gold font-medium tracking-wide uppercase text-sm">You&apos;re In</p>
                    <p className="text-cream/40 text-xs mt-2">Welcome to the inner circle.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="newsletter-input w-full bg-jp-deep/80 border border-gold/20 px-5 py-3.5 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors font-light text-sm"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-400 text-xs">{errorMessage}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                      className="btn-gold w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </motion.button>

                    <p className="text-cream/30 text-xs">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>

              {/* Bottom gold line */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
