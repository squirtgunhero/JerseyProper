'use client'

import { motion } from 'framer-motion'

/**
 * PROCESS SECTION
 * 
 * Premium boutique animations:
 * - Staggered card reveals with spring physics
 * - Text reveal for section header
 * - Fade-in-up for each step
 */

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

// Spring-based container animation with staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// Individual step animation with spring physics
const stepVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
    },
  },
}

// Header text animation
const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
    },
  },
}

export default function Process() {
  return (
    <section id="process" className="py-40 bg-jp-black texture-overlay relative overflow-hidden">
      {/* Decorative vertical line */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent origin-top" 
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-24"
        >
          <motion.div
            variants={headerVariants}
            className="section-label justify-center mb-6"
          >
            <span>Our Process</span>
          </motion.div>
          <motion.h2
            variants={headerVariants}
            className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury uppercase text-cream font-medium mb-6"
          >
            How Do We <span className="gold-text-static">Work?</span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-cream/50 max-w-xl mx-auto font-light"
          >
            A refined process honed to deliver exceptional results. 
            No surprises, no scope creep. Just thoughtful, strategic work.
          </motion.p>
        </motion.div>

        {/* Process Steps with staggered animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12 md:space-y-0"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className={`group relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                i % 2 === 1 ? 'md:text-right' : ''
              }`}
            >
              {/* Number side with hover effect */}
              <div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className={`flex items-center gap-6 ${i % 2 === 1 ? 'md:justify-end' : ''}`}>
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                    className="font-display text-6xl md:text-7xl gold-text-static opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                  >
                    {step.number}
                  </motion.span>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      type: 'spring',
                      damping: 25,
                      stiffness: 100,
                      delay: 0.3 + i * 0.15 
                    }}
                    className="w-12 h-px bg-gold/30 origin-left" 
                  />
                </div>
              </div>

              {/* Content side */}
              <div className={`${i % 2 === 1 ? 'md:order-1' : ''} pb-12 md:pb-16 border-b border-gold/10 last:border-0`}>
                <h3 className="font-display text-2xl tracking-wide uppercase text-cream mb-4 group-hover:text-gold transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-cream/50 font-light leading-relaxed group-hover:text-cream/70 transition-colors duration-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
