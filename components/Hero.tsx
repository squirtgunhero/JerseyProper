'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-jp-black texture-overlay">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-jp-deep/50 via-transparent to-jp-black/80" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Corner lines */}
        <div className="absolute top-8 left-8 w-24 h-px bg-gradient-to-r from-gold/30 to-transparent" />
        <div className="absolute top-8 left-8 w-px h-24 bg-gradient-to-b from-gold/30 to-transparent" />
        <div className="absolute top-8 right-8 w-24 h-px bg-gradient-to-l from-gold/30 to-transparent" />
        <div className="absolute top-8 right-8 w-px h-24 bg-gradient-to-b from-gold/30 to-transparent" />
        <div className="absolute bottom-8 left-8 w-24 h-px bg-gradient-to-r from-gold/30 to-transparent" />
        <div className="absolute bottom-8 left-8 w-px h-24 bg-gradient-to-t from-gold/30 to-transparent" />
        <div className="absolute bottom-8 right-8 w-24 h-px bg-gradient-to-l from-gold/30 to-transparent" />
        <div className="absolute bottom-8 right-8 w-px h-24 bg-gradient-to-t from-gold/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          {/* JERSEY with ornamental line */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-12 h-px bg-gold/50" />
              <div className="diamond" />
              <span className="w-8 h-px bg-gold/50" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] uppercase text-cream font-medium">
              Jersey
            </h1>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-8 h-px bg-gold/50" />
              <div className="diamond" />
              <span className="w-12 h-px bg-gold/50" />
            </div>
          </div>
          
          {/* PROPER with gold gradient */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] uppercase font-medium gold-text">
            Proper
          </h1>
        </motion.div>

        {/* Decorative line with diamonds */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <div className="diamond opacity-60" />
          <span className="w-8 md:w-12 h-px bg-gold/50" />
          <div className="diamond" />
          <span className="w-8 md:w-12 h-px bg-gold/50" />
          <div className="diamond opacity-60" />
          <span className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-sans text-lg md:text-xl text-cream/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Premium digital experiences for businesses
          <br className="hidden md:block" />
          {' '}that refuse to blend in
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gold inline-block"
          >
            Start a Project
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-cream/30">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
