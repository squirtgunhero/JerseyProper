'use client'

import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl md:text-5xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
              Terms of Service
            </h1>
            <p className="text-sm text-cream/50 font-light mb-12">
              Last updated: January 2026
            </p>

            <div className="space-y-8 text-cream/70 font-light leading-relaxed">
              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  Services
                </h2>
                <p>
                  Jersey Proper provides design, development, and consulting services as outlined in individual project proposals and agreements.
                </p>
                <p className="mt-4">
                  All services are subject to the terms specified in your project agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  Project Terms
                </h2>
                <p>
                  Specific project terms, timelines, deliverables, and payment schedules will be outlined in individual project proposals and agreements.
                </p>
                <p className="mt-4">
                  We reserve the right to decline or discontinue work on any project at our discretion.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  Intellectual Property
                </h2>
                <p>
                  Upon full payment, clients receive ownership of the final deliverables as specified in the project agreement.
                </p>
                <p className="mt-4">
                  Jersey Proper retains the right to showcase completed work in our portfolio unless otherwise agreed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  Limitation of Liability
                </h2>
                <p>
                  Jersey Proper shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  Contact
                </h2>
                <p>
                  Questions about these terms should be directed to us through our contact form.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
