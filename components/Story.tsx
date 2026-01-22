'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Story() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-32 bg-jp-deep texture-overlay relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] p-4">
              {/* Decorative frame */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40" />
              <div className="absolute inset-6 border border-gold/20" />
              
              {/* Main image placeholder */}
              <div className="relative h-full bg-gradient-to-br from-jp-rich to-jp-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 border border-gold/30 flex items-center justify-center">
                    <span className="font-display text-4xl gold-text-static tracking-luxury">JP</span>
                  </div>
                  <p className="font-display text-sm tracking-[0.3em] uppercase text-cream/40">Boutique Studio</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label mb-6"
            >
              <span>About</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl md:text-4xl tracking-luxury uppercase text-cream font-medium mb-8"
            >
              Built <span className="gold-text-static">Different</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-cream/60 leading-relaxed font-light"
            >
              <p>
                Jersey Proper exists because I got tired of watching talented small businesses 
                settle for mediocre creative work. They&apos;d either hire cheap and get cheap results, 
                or pay agency rates only to become a line item managed by a junior team.
              </p>
              <p>
                I built this studio to offer a third option: senior-level creative expertise 
                with the personal attention of a dedicated partner. When you work with Jersey Proper, 
                you work directly with me. Someone who genuinely cares about your business and 
                treats every project as if my own reputation depends on it.
              </p>
              <p>
                Because it does.
              </p>
              <p>
                No bloated teams. No unnecessary overhead. No templated solutions passed off as 
                custom work. Just thoughtful, strategic, beautifully-executed creative that 
                helps your business stand out.
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 pt-8 border-t border-gold/10"
            >
              <p className="font-display text-lg italic text-gold/80 mb-2">
                Let&apos;s build something proper.
              </p>
              <p className="text-sm text-cream/40">Michael Ehrlich, Founder</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
