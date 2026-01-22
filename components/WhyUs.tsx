'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Crown, Users, Clock, Shield } from 'lucide-react'

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

export default function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="why" className="py-32 bg-jp-rich texture-overlay relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      {/* Corner decorations */}
      <div className="absolute top-16 left-16 w-20 h-20 border-l border-t border-gold/10" />
      <div className="absolute bottom-16 right-16 w-20 h-20 border-r border-b border-gold/10" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-6"
          >
            <span>Why Jersey Proper</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury uppercase text-cream font-medium mb-6"
          >
            The <span className="gold-text-static">Proper</span> Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cream/50 max-w-2xl mx-auto font-light"
          >
            In a sea of agencies and freelancers, here&apos;s why discerning businesses choose to work with us.
          </motion.p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group"
            >
              <div className="flex gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 border border-gold/30 flex items-center justify-center group-hover:border-gold/60 transition-colors duration-300">
                    <reason.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-xl tracking-wide uppercase text-cream mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-cream/50 font-light leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-12 h-px bg-gold/30" />
            <div className="diamond" />
            <span className="w-12 h-px bg-gold/30" />
          </div>
          <p className="font-display text-xl md:text-2xl tracking-wide text-cream/80 mb-8 italic">
            &ldquo;Ready to build something you&apos;re proud of?&rdquo;
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline inline-block"
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
