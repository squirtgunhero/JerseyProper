'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start with a deep dive into your business, goals, audience, and competition. Understanding the full picture ensures we build something that actually works.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Before any design work begins, we develop a clear roadmap. Every decision is intentional, from color choices to user flows, all aligned with your objectives.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'This is where vision becomes reality. We craft every element with meticulous attention to detail, ensuring your brand looks as premium as it deserves.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'Clean code, fast load times, seamless functionality. We develop with the same care we design. Execution matters as much as aesthetics.',
  },
  {
    number: '05',
    title: 'Launch & Support',
    description: 'Go-live is just the beginning. We ensure a smooth launch and remain available for questions, updates, and ongoing optimization.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="py-32 bg-jp-black texture-overlay relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-6"
          >
            <span>Our Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury uppercase text-cream font-medium mb-6"
          >
            How We <span className="gold-text-static">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cream/50 max-w-xl mx-auto font-light"
          >
            A refined process honed to deliver exceptional results. 
            No surprises, no scope creep. Just thoughtful, strategic work.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12 md:space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                i % 2 === 1 ? 'md:text-right' : ''
              }`}
            >
              {/* Number side */}
              <div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className={`flex items-center gap-6 ${i % 2 === 1 ? 'md:justify-end' : ''}`}>
                  <span className="font-display text-6xl md:text-7xl gold-text-static opacity-50">
                    {step.number}
                  </span>
                  <div className="w-12 h-px bg-gold/30" />
                </div>
              </div>

              {/* Content side */}
              <div className={`${i % 2 === 1 ? 'md:order-1' : ''} pb-12 md:pb-16 border-b border-gold/10 last:border-0`}>
                <h3 className="font-display text-2xl tracking-wide uppercase text-cream mb-4">
                  {step.title}
                </h3>
                <p className="text-cream/50 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
