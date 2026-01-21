'use client'

import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl md:text-5xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
              Privacy Policy
            </h1>
            <p className="text-sm text-cream/50 font-light mb-12">
              Last updated: January 2026
            </p>

            <div className="space-y-8 text-cream/70 font-light leading-relaxed">
              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  Information We Collect
                </h2>
                <p>
                  We collect information you provide directly to us, such as when you fill out our contact form, request information about our services, or communicate with us.
                </p>
                <p className="mt-4">
                  This may include your name, email address, company name, and any other information you choose to provide.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to respond to your inquiries, provide our services, and communicate with you about projects and services that may be of interest.
                </p>
                <p className="mt-4">
                  We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures to protect the security of your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us through our contact form.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
