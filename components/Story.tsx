'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * STORY/ABOUT SECTION
 * 
 * Premium boutique animations:
 * - Fade-in-up with spring physics
 * - Staggered content reveal
 * - Increased whitespace for editorial feel
 */

// Container animation for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

// Individual element fade-in-up
const fadeInUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
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

// Image reveal from left
const imageRevealVariants = {
  hidden: { 
    opacity: 0, 
    x: -80,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 80,
    },
  },
}

export default function Story() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-48 bg-jp-deep texture-overlay relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" 
      />
      
      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <motion.div
            variants={imageRevealVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] p-4">
              {/* Decorative frame with animated reveal */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.3 }}
                className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.4 }}
                className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40" 
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute inset-6 border border-gold/20" 
              />
              
              {/* Main image placeholder */}
              <div className="relative h-full bg-gradient-to-br from-jp-rich to-jp-black flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.6 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-6 border border-gold/30 flex items-center justify-center">
                    <span className="font-display text-4xl gold-text-static tracking-luxury">JP</span>
                  </div>
                  <p className="font-display text-sm tracking-[0.3em] uppercase text-cream/40">Boutique Studio</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="order-1 lg:order-2"
          >
            <motion.div
              variants={fadeInUpVariants}
              className="section-label mb-6"
            >
              <span>About</span>
            </motion.div>

            <motion.h2
              variants={fadeInUpVariants}
              className="font-display text-3xl md:text-4xl tracking-luxury uppercase text-cream font-medium mb-10"
            >
              Who Is <span className="gold-text-static">Jersey Proper?</span>
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="space-y-6 text-cream/60 leading-relaxed font-light"
            >
              <motion.p variants={fadeInUpVariants}>
                Jersey Proper exists because I got tired of watching talented small businesses 
                settle for mediocre creative work. They&apos;d either hire cheap and get cheap results, 
                or pay agency rates only to become a line item managed by a junior team.
              </motion.p>
              <motion.p variants={fadeInUpVariants}>
                I built this studio to offer a third option: senior-level creative expertise 
                with the personal attention of a dedicated partner. When you work with Jersey Proper, 
                you work directly with me. Someone who genuinely cares about your business and 
                treats every project as if my own reputation depends on it.
              </motion.p>
              <motion.p variants={fadeInUpVariants} className="text-gold/70 font-medium">
                Because it does.
              </motion.p>
              <motion.p variants={fadeInUpVariants}>
                No bloated teams. No unnecessary overhead. No templated solutions passed off as 
                custom work. Just thoughtful, strategic, beautifully-executed creative that 
                helps your business stand out.
              </motion.p>
            </motion.div>

            {/* Signature with enhanced trust signals */}
            <motion.div
              variants={fadeInUpVariants}
              className="mt-12 pt-10 border-t border-gold/10"
            >
              <p className="font-display text-lg italic text-gold/80 mb-4">
                Let&apos;s build something proper.
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-cream font-medium">Michael Ehrlich</p>
                <p className="text-sm text-cream/50">Founder & Creative Director</p>
                <p className="text-xs text-cream/30 mt-2">
                  10+ years in digital strategy, brand design, and web development
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
