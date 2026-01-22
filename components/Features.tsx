'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Palette, Globe, TrendingUp, Layers, Target, Zap } from 'lucide-react'

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

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-32 bg-jp-deep texture-overlay relative overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-12 left-12 w-16 h-16 border-l border-t border-gold/20" />
      <div className="absolute bottom-12 right-12 w-16 h-16 border-r border-b border-gold/20" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-6"
          >
            <span>Our Services</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl tracking-luxury uppercase text-cream font-medium mb-6"
          >
            What We <span className="gold-text-static">Craft</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cream/50 max-w-2xl mx-auto font-light"
          >
            End-to-end creative solutions for businesses that demand more than templates 
            and cookie-cutter approaches.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 bg-jp-black/50 border border-gold/10 hover:border-gold/30 transition-all duration-500 h-full">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/30" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/30" />

                {/* Icon */}
                <div className="w-12 h-12 mb-6 flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl tracking-luxury uppercase text-cream mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-cream/50 leading-relaxed font-light mb-6 text-sm">
                  {service.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-xs text-cream/40">
                      <span className="w-1 h-1 bg-gold/50 rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
