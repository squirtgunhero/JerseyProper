'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/Button'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    projectType: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl md:text-5xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
              Contact
            </h1>
            <p className="text-lg md:text-xl text-cream/70 font-light leading-relaxed max-w-2xl mx-auto">
              We work with businesses that value quality, clarity, and lasting results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? (
            <motion.div {...fadeIn}>
              <div className="border border-gold-primary/20 bg-rich-green/10 p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bodoni tracking-wider uppercase text-gold-primary mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black-green/50 border border-gold-primary/20 text-cream placeholder-cream/30 focus:border-gold-primary/60 focus:outline-none transition-colors font-light"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-bodoni tracking-wider uppercase text-gold-primary mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black-green/50 border border-gold-primary/20 text-cream placeholder-cream/30 focus:border-gold-primary/60 focus:outline-none transition-colors font-light"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bodoni tracking-wider uppercase text-gold-primary mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black-green/50 border border-gold-primary/20 text-cream placeholder-cream/30 focus:border-gold-primary/60 focus:outline-none transition-colors font-light"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-bodoni tracking-wider uppercase text-gold-primary mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formState.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black-green/50 border border-gold-primary/20 text-cream focus:border-gold-primary/60 focus:outline-none transition-colors font-light"
                    >
                      <option value="">Select a service</option>
                      <option value="brand-website">Brand and Website</option>
                      <option value="ui-design">UI and Product Design</option>
                      <option value="lead-gen">Lead Generation Systems</option>
                      <option value="custom-app">Custom App Build</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bodoni tracking-wider uppercase text-gold-primary mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black-green/50 border border-gold-primary/20 text-cream placeholder-cream/30 focus:border-gold-primary/60 focus:outline-none transition-colors font-light resize-none"
                      placeholder="Tell us about your project"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-gold-primary/10">
                  <p className="text-sm text-cream/50 font-light text-center">
                    We typically respond within 1-2 business days. If your project requires immediate attention or you are not a good fit for our services, we will let you know.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="border border-gold-primary/20 bg-rich-green/10 p-8 md:p-12 text-center"
            >
              <div className="h-2 w-2 rotate-45 bg-gold-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                Message Received
              </h2>
              <p className="text-cream/70 font-light leading-relaxed">
                Thank you for reaching out. We will review your message and respond within 1-2 business days.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Additional Info */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeIn}
            className="text-center"
          >
            <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-6 tracking-wide uppercase">
              What to Expect
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="text-xs font-bodoni tracking-wider uppercase text-gold-primary mb-2">
                  Response Time
                </h3>
                <p className="text-cream/60 font-light">
                  1-2 business days
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bodoni tracking-wider uppercase text-gold-primary mb-2">
                  Discovery Call
                </h3>
                <p className="text-cream/60 font-light">
                  30-45 minutes
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bodoni tracking-wider uppercase text-gold-primary mb-2">
                  Proposal
                </h3>
                <p className="text-cream/60 font-light">
                  Within one week
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
