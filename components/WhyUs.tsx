'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Crown, Users, Clock, Shield } from 'lucide-react'
import MagneticButton from './MagneticButton'

/**
 * WHY US SECTION
 * 
 * Premium boutique animations:
 * - Spring-based staggered reveals
 * - Enhanced icon hover effects
 * - Magnetic CTA button
 */

const reasons = [
  {
    icon: Crown,
    title: 'Premium Quality, Fair Pricing',
    description: 'Fortune 500-level creative work at rates that make sense for growing businesses. No bloated agency overhead. Just exceptional results.',
  },
  {
    icon: Users,
    title: 'Direct Founder Access',
    description: 'Work directly with the person who cares most about your success. No account managers, no telephone game. Real conversations with real expertise.',
  },
  {
    icon: Clock,
    title: 'Dedicated Attention',
    description: 'We limit our client roster intentionally. When you work with us, you\'re not one of fifty projects. You\'re one of our focused few.',
  },
  {
    icon: Shield,
    title: 'No Templates, No Shortcuts',
    description: 'Every project is built from scratch, tailored to your unique brand and goals. Your business deserves better than a theme with your logo slapped on.',
  },
]

// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

// Header animation
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

// Card animation
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    x: -20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
    },
  },
}

export default function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="why" className="py-40 bg-jp-rich texture-overlay relative overflow-hidden">
      {/* Decorative elements with animation */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" 
      />
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" 
      />
      
      {/* Corner decorations */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.4 }}
        className="absolute top-16 left-16 w-20 h-20 border-l border-t border-gold/10" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 }}
        className="absolute bottom-16 right-16 w-20 h-20 border-r border-b border-gold/10" 
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-24"
        >
          <motion.div
            variants={headerVariants}
            className="section-label justify-center mb-6"
          >
            <span>Why Jersey Proper</span>
          </motion.div>
          <motion.h2
            variants={headerVariants}
            className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury uppercase text-cream font-medium mb-6"
          >
            The <span className="gold-text-static">Proper</span> Difference
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-cream/50 max-w-2xl mx-auto font-light"
          >
            In a sea of agencies and freelancers, here&apos;s why discerning businesses choose to work with us.
          </motion.p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-10 lg:gap-14"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={cardVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="group"
            >
              <div className="flex gap-6">
                {/* Icon with enhanced hover */}
                <div className="flex-shrink-0">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                    className="w-14 h-14 border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500"
                  >
                    <reason.icon className="w-6 h-6 text-gold group-hover:text-gold-light transition-colors duration-300" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-xl tracking-wide uppercase text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-cream/50 font-light leading-relaxed group-hover:text-cream/70 transition-colors duration-300">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', damping: 25, stiffness: 100, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="w-12 h-px bg-gold/30" />
            <motion.div 
              initial={{ scale: 0, rotate: 0 }}
              animate={isInView ? { scale: 1, rotate: 45 } : {}}
              transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 1.1 }}
              className="w-2 h-2 bg-gold" 
            />
            <span className="w-12 h-px bg-gold/30" />
          </motion.div>
          <p className="font-display text-xl md:text-2xl tracking-wide text-cream/80 mb-10 italic">
            &ldquo;Ready to build something you&apos;re proud of?&rdquo;
          </p>
          <MagneticButton
            href="#contact"
            className="btn-outline inline-block"
            strength={0.2}
          >
            Let&apos;s Talk
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
