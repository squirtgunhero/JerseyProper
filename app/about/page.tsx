'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/Button'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

const principles = [
  {
    title: 'Fewer Clients, Better Work',
    description: 'We limit our client roster to ensure every project receives the attention and care it deserves.',
  },
  {
    title: 'No Artificial Urgency',
    description: 'Good work takes the time it takes. We operate on realistic timelines, not arbitrary deadlines.',
  },
  {
    title: 'Direct Communication',
    description: 'You work directly with the person designing and building your project. No account managers. No middlemen.',
  },
  {
    title: 'Built to Last',
    description: 'We build systems that scale with your business. Clean code. Clear documentation. No technical debt.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl md:text-5xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
              About
            </h1>
            <p className="text-lg md:text-xl text-cream/70 font-light leading-relaxed max-w-2xl mx-auto">
              A boutique studio for businesses that value quality over speed, clarity over complexity, and lasting results over quick fixes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="pb-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeIn}
            className="space-y-6 text-cream/70 font-light leading-relaxed"
          >
            <p>
              Jersey Proper exists because most businesses settle for digital experiences that do not reflect the quality of their work.
            </p>
            <p>
              We work with founders, business owners, and operators who understand that their website, their brand, and their systems are not expenses. They are investments in trust, clarity, and growth.
            </p>
            <p>
              We do not work with everyone. We work with businesses that value precision, ask better questions, and understand that quality compounds over time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="pb-24 px-6 lg:px-8 border-t border-gold-primary/10 pt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bodoni font-medium text-gradient-gold mb-4 tracking-wide uppercase">
              How We Work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-gold-primary/20 bg-rich-green/10 p-8"
              >
                <div className="h-1 w-12 bg-gold-primary/60 mb-4" />
                <h3 className="text-xl font-bodoni font-medium text-gold-primary mb-3 tracking-wide">
                  {principle.title}
                </h3>
                <p className="text-cream/70 font-light leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="pb-24 px-6 lg:px-8 border-t border-gold-primary/10 pt-20">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl md:text-3xl font-bodoni font-medium text-gradient-gold mb-8 tracking-wide uppercase text-center">
              Expertise
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="text-xs font-bodoni tracking-wider uppercase text-gold-primary mb-3">
                  Design
                </h3>
                <ul className="space-y-2 text-cream/70 font-light">
                  <li>Brand and Visual Identity</li>
                  <li>UI/UX Design</li>
                  <li>Design Systems</li>
                  <li>Prototyping</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bodoni tracking-wider uppercase text-gold-primary mb-3">
                  Development
                </h3>
                <ul className="space-y-2 text-cream/70 font-light">
                  <li>React, Next.js, TypeScript</li>
                  <li>Node.js, PostgreSQL</li>
                  <li>API Design and Integration</li>
                  <li>Performance Optimization</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bodoni tracking-wider uppercase text-gold-primary mb-3">
                  Strategy
                </h3>
                <ul className="space-y-2 text-cream/70 font-light">
                  <li>Lead Generation Systems</li>
                  <li>Conversion Optimization</li>
                  <li>Marketing Automation</li>
                  <li>Analytics and Reporting</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bodoni tracking-wider uppercase text-gold-primary mb-3">
                  Operations
                </h3>
                <ul className="space-y-2 text-cream/70 font-light">
                  <li>Project Management</li>
                  <li>Technical Documentation</li>
                  <li>Team Training</li>
                  <li>Ongoing Support</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8 border-t border-gold-primary/10">
        <motion.div
          {...fadeIn}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
            Let&apos;s Work Together
          </h2>
          <p className="text-cream/70 font-light mb-8 leading-relaxed">
            If you value quality, clarity, and lasting results, we should talk.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">Start a Conversation</Button>
          </Link>
        </motion.div>
      </section>
    </>
  )
}
