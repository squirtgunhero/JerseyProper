'use client'

import { useState, useEffect, useCallback } from 'react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleClose = useCallback(() => {
    onClose()
    if (status === 'success') {
      setTimeout(() => {
        setName('')
        setEmail('')
        setStatus('idle')
        setErrorMessage('')
      }, 300)
    }
  }, [onClose, status])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[440px] rounded-2xl bg-[#141416] border border-white/[0.06] shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#5A5A5E] hover:text-[#8A8A8E] transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#34C759]/10 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-instrument text-2xl font-normal text-[#F2F0ED] mb-2">
                You&apos;re on the list
              </h3>
              <p className="text-sm text-[#8A8A8E] leading-relaxed mb-6">
                We&apos;ll be in touch when Colony is ready. Founding members get priority access and a rate that never goes up.
              </p>
              <button
                onClick={handleClose}
                className="text-sm text-[#8A8A8E] hover:text-[#F2F0ED] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="colony-rings" />
                <span className="text-sm font-normal tracking-[0.25em] uppercase text-[#F2F0ED]">
                  Colony
                </span>
              </div>
              <h3 className="font-instrument text-[28px] font-normal text-[#F2F0ED] mb-2 leading-tight">
                Join the Waitlist
              </h3>
              <p className="text-sm text-[#8A8A8E] leading-relaxed mb-6">
                Be first in line when Colony launches. No credit card. No commitment.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="waitlist-name" className="block text-xs text-[#5A5A5E] uppercase tracking-[0.08em] font-medium mb-2">
                    Name
                  </label>
                  <input
                    id="waitlist-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-white/[0.06] text-[#F2F0ED] text-sm placeholder:text-[#5A5A5E] focus:outline-none focus:border-[#E8993E]/40 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="waitlist-email" className="block text-xs text-[#5A5A5E] uppercase tracking-[0.08em] font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-white/[0.06] text-[#F2F0ED] text-sm placeholder:text-[#5A5A5E] focus:outline-none focus:border-[#E8993E]/40 transition-colors"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-400">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-2 py-3.5 rounded-xl bg-[#E8993E] text-[#0C0C0E] text-sm font-semibold hover:translate-y-[-1px] hover:shadow-[0_8px_24px_rgba(232,153,62,0.3)] transition-all duration-200 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === 'loading' ? 'Joining...' : 'Join the Waitlist'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
