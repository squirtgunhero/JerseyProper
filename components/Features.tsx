'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Palette, Globe, TrendingUp, Layers, Target, Zap } from 'lucide-react'

/**
 * FEATURES/SERVICES SECTION
 * 
 * Premium boutique animations:
 * - Spring-based staggered card reveals
 * - Enhanced hover interactions
 * - Fade-in-up for all elements
 */

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Your brand is more than a logo. It\'s how the world perceives you. We craft complete visual identities that command attention and build trust.',
    details: ['Logo Design & Variations', 'Color & Typography Systems', 'Brand Guidelines', 'Collateral Design'],
  },
  {
    icon: Globe,
    title: 'Web Design',
    description: 'Beautiful websites that actually convert. We blend stunning aesthetics with strategic UX to create sites that turn visitors into clients.',
    details: ['Custom Design', 'Responsive Development', 'Webflow & WordPress', 'E-commerce Solutions'],
  },
  {
    icon: TrendingUp,
    title: 'Lead Generation',
    description: 'Stop chasing leads. Let them come to you. We build intelligent systems and automations that keep your pipeline flowing.',
    details: ['Landing Pages', 'Email Sequences', 'CRM Integration', 'Analytics & Tracking'],
  },
  {
    icon: Layers,
    title: 'Digital Strategy',
    description: 'Every pixel with purpose. We develop comprehensive digital strategies that align your online presence with your business goals.',
    details: ['Competitive Analysis', 'User Research', 'Content Strategy', 'Growth Planning'],
  },
  {
    icon: Target,
    title: 'Conversion Optimization',
    description: 'More results from the same traffic. We analyze, test, and refine to maximize every visitor\'s potential to become a customer.',
    details: ['A/B Testing', 'User Behavior Analysis', 'Funnel Optimization', 'Performance Audits'],
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Work smarter, not harder. We create custom automations that save you hours each week while improving your client experience.',
    details: ['Workflow Automation', 'Client Onboarding', 'Scheduling Systems', 'Custom Integrations'],
  },
]

// Container animation for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    y: 60,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
    },
  },
}

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-40 bg-jp-deep texture-overlay relative overflow-hidden">
      {/* Decorative corner elements with reveal animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 }}
        className="absolute top-12 left-12 w-16 h-16 border-l border-t border-gold/20" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.6 }}
        className="absolute bottom-12 right-12 w-16 h-16 border-r border-b border-gold/20" 
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
            <span>Our Services</span>
          </motion.div>
          <motion.h2
            variants={headerVariants}
            className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury uppercase text-cream font-medium mb-6"
          >
            What Do We <span className="gold-text-static">Offer?</span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-cream/50 max-w-2xl mx-auto font-light"
          >
            End-to-end creative solutions for businesses that demand more than templates 
            and cookie-cutter approaches.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: 'spring', damping: 20, stiffness: 300 }
              }}
              className="group relative"
            >
              <div className="relative p-8 bg-jp-black/50 border border-gold/10 group-hover:border-gold/40 transition-all duration-500 h-full group-hover:bg-jp-black/70">
                {/* Corner accents with hover effect */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/30 group-hover:w-6 group-hover:h-6 group-hover:border-gold/60 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/30 group-hover:w-6 group-hover:h-6 group-hover:border-gold/60 transition-all duration-500" />

                {/* Icon with hover animation */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                  className="w-12 h-12 mb-6 flex items-center justify-center"
                >
                  <service.icon className="w-7 h-7 text-gold group-hover:text-gold-light transition-colors duration-300" strokeWidth={1.5} />
                </motion.div>

                {/* Title */}
                <h3 className="font-display text-xl tracking-luxury uppercase text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-cream/50 leading-relaxed font-light mb-6 text-sm group-hover:text-cream/70 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-xs text-cream/40 group-hover:text-cream/60 transition-colors duration-300">
                      <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold transition-colors duration-300" />
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
