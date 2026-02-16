'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const SHOW_DELAY_MS = 1500
const ANIMATION_DURATION_MS = 240
const DISMISSAL_COOLDOWN_DAYS = 7
const STORAGE_SUBSCRIBED = 'jp_downlink_subscribed'
const STORAGE_DISMISSED_AT = 'jp_downlink_dismissed_at'

function shouldShowPopup(): boolean {
  if (typeof window === 'undefined') return false
  if (localStorage.getItem(STORAGE_SUBSCRIBED) === 'true') return false
  const dismissedAt = localStorage.getItem(STORAGE_DISMISSED_AT)
  if (!dismissedAt) return true
  const timestamp = parseInt(dismissedAt, 10)
  if (Number.isNaN(timestamp)) return true
  const cooldownEnd = timestamp + DISMISSAL_COOLDOWN_DAYS * 24 * 60 * 60 * 1000
  return Date.now() > cooldownEnd
}

export default function SatelliteDownlinkPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const handleClose = useCallback(() => {
    if (status === 'loading') return

    setHasEntered(false)
    setIsVisible(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_DISMISSED_AT, String(Date.now()))
    }
    previousActiveElement.current?.focus()
  }, [status])

  useEffect(() => {
    if (!shouldShowPopup()) return

    const timer = setTimeout(() => {
      previousActiveElement.current = document.activeElement as HTMLElement | null
      setIsVisible(true)
    }, SHOW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setHasEntered(true))
      })
      return () => cancelAnimationFrame(id)
    } else {
      setHasEntered(false)
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible && hasEntered) {
      inputRef.current?.focus()
    }
  }, [isVisible, hasEntered])

  useEffect(() => {
    if (!isVisible) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (status === 'loading') return
        e.preventDefault()
        handleClose()
        return
      }

      if (e.key !== 'Tab') return

      const container = containerRef.current
      if (!container) return

      const focusable = container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, status, handleClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return
    if (status === 'loading') return
    handleClose()
  }

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
        throw new Error(data.error || 'Transmission failed')
      }

      setStatus('success')
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_SUBSCRIBED, 'true')
      }
      setIsVisible(false)
      previousActiveElement.current?.focus()
    } catch {
      setStatus('error')
      setErrorMessage('Transmission failed. Try again.')
    }
  }

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="satellite-downlink-heading"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        className={`
          relative jp-surface jp-surface-border rounded-lg p-10 w-full max-w-[520px]
          transition-all ease-out
          ${hasEntered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.98]'}
        `}
        style={{ transitionDuration: `${ANIMATION_DURATION_MS}ms` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={status === 'loading'}
          className="absolute top-4 right-4 z-10 text-[#e7e4dc]/50 hover:text-[#e7e4dc] transition-colors text-xl leading-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-[#e7e4dc]/50"
          aria-label="Close"
        >
          ×
        </button>

        <div className="relative z-10">
          {/* System label */}
          <p className="text-[11px] tracking-[0.25em] text-[#6f7f75] uppercase text-center mb-6">
            SATELLITE DOWNLINK ESTABLISHED
          </p>

          {/* Crest logo */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center border border-[#8b7a4a]/40"
              style={{ backgroundColor: 'rgba(13,26,20,0.9)' }}
              aria-hidden
            >
              <span className="font-display text-2xl font-medium tracking-wider text-[#e7e4dc]">
                JP
              </span>
            </div>
          </div>

          {/* Headline */}
          <h2
            id="satellite-downlink-heading"
            className="font-display text-[28px] md:text-[32px] text-[#e7e4dc] font-normal tracking-tight text-center mb-2"
          >
            Subscribe to the Downlink
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mt-6">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter email"
                required
                disabled={status === 'loading' || status === 'success'}
                className="downlink-input flex-1 min-w-0 h-12 px-4 bg-transparent border border-[#8b7a4a]/60 text-[#e7e4dc] placeholder:text-[#5f6b63] focus:border-[#b59a5a] outline-none transition rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="h-12 px-5 border border-[#8b7a4a]/60 text-[#c6b47a] hover:bg-[#8b7a4a]/10 transition rounded-md shrink-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                {status === 'loading' && 'TRANSMITTING…'}
                {status === 'success' && 'LINK ESTABLISHED'}
                {status !== 'loading' && status !== 'success' && 'TRANSMIT →'}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-red-400/90 text-xs mt-3">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
