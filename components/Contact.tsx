'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projectTypes = [
  'Brand Identity',
  'Web Design',
  'Web Development',
  'Lead Generation',
  'Full Service',
  'Other',
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setStatus('success')
      setFormData({ name: '', email: '', projectType: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <section id="contact" className="py-32 bg-jp-deep texture-overlay relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-12 right-12 w-32 h-32 border border-gold/10 rotate-45" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border border-gold/10 rotate-12" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-6"
          >
            <span>Get in Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury uppercase text-cream font-medium mb-6"
          >
            Let&apos;s Build Something <span className="gold-text-static">Proper</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cream/50 max-w-lg mx-auto font-light"
          >
            Ready to elevate your brand? Tell us about your project and we&apos;ll be in touch within 24 hours.
          </motion.p>
        </div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Name */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-cream/50 mb-3">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-jp-black/50 border border-gold/20 px-5 py-4 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors font-light"
                placeholder="Your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-cream/50 mb-3">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-jp-black/50 border border-gold/20 px-5 py-4 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors font-light"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-cream/50 mb-3">
              Project Type
            </label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full bg-jp-black/50 border border-gold/20 px-5 py-4 text-cream focus:outline-none focus:border-gold transition-colors font-light appearance-none cursor-pointer"
              required
            >
              <option value="" disabled className="bg-jp-black">Select a service</option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-jp-black">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-cream/50 mb-3">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full bg-jp-black/50 border border-gold/20 px-5 py-4 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors font-light resize-none"
              placeholder="Tell us about your project..."
              required
            />
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="bg-green-500/10 border border-green-500/20 rounded px-5 py-4 text-center">
              <p className="text-green-400 font-medium">Thank you for reaching out!</p>
              <p className="text-green-400/70 text-sm mt-1">We&apos;ll be in touch within 24 hours.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded px-5 py-4 text-center">
              <p className="text-red-400">{errorMessage}</p>
            </div>
          )}

          {/* Submit */}
          <div className="text-center pt-4">
            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ scale: status === 'loading' || status === 'success' ? 1 : 1.02 }}
              whileTap={{ scale: status === 'loading' || status === 'success' ? 1 : 0.98 }}
              className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
            </motion.button>
          </div>
        </motion.form>

        {/* Alternative contact with trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 pt-12 border-t border-gold/10"
        >
          <p className="text-cream/40 text-sm mb-4">
            Prefer email?{' '}
            <a href="mailto:michael@jerseyproper.com" className="text-gold hover:text-gold-light transition-colors">
              michael@jerseyproper.com
            </a>
          </p>
          {/* Trust signal */}
          <p className="text-cream/30 text-xs">
            Every inquiry is personally reviewed by Michael Ehrlich, Founder & Creative Director.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
