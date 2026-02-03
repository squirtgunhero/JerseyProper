'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import MagneticButton from './MagneticButton'

/**
 * CINEMATIC HERO COMPONENT
 * 
 * Premium boutique hero with:
 * 1. Text-reveal animation for typography
 * 2. Magnetic CTA button with follow effect
 * 3. Spring-based animations throughout
 * 4. Layered cinematic background effects
 */

// Text reveal animation variants with configurable delay
const createTitleVariants = (delay: number = 0.3) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: delay,
    },
  },
})

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
}

// Split text into characters for reveal animation
function TextReveal({ text, delay = 0.3, isGold = false }: { text: string; delay?: number; isGold?: boolean }) {
  const titleVariants = createTitleVariants(delay)
  
  return (
    <motion.span
      variants={titleVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block whitespace-nowrap ${isGold ? 'gold-text' : ''}`}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end md:items-center overflow-hidden bg-jp-black">
      {/* 
        LAYER 1: Base Background Image
        - Mobile: show statue face at top, content at bottom
        - Desktop: full composition with content on right
      */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 hero-drift"
      >
        <Image
          src="/hero-bg.webp"
          alt="Jersey Proper - Premium digital experiences"
          fill
          priority
          quality={75}
          className="object-cover object-[35%_50%] md:object-[40%_50%] lg:object-[45%_50%]"
          sizes="100vw"
          fetchPriority="high"
        />
      </motion.div>

      {/* 
        LAYER 2: Film Grain
        - Very subtle noise texture
        - Creates analog/cinematic feel
      */}
      <div className="film-grain z-[1]" aria-hidden="true" />

      {/* 
        LAYER 3: Vignette
        - Darkens edges for focus
        - Cinematic framing
      */}
      <div className="hero-vignette z-[2]" aria-hidden="true" />

      {/* 
        LAYER 4: Gradient Overlays
        - Fade edges to black for seamless blending
      */}
      {/* Left edge fade to black */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-jp-black via-jp-black/60 to-transparent z-[3]" />
      {/* Mobile: bottom-heavy gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:hidden z-[3]" />
      {/* Desktop: right-side gradient for text contrast */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 z-[3]" />
      {/* Top fade for navigation */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-jp-black/80 to-transparent z-[3]" />
      {/* Bottom blend into green sections */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 hero-blend z-[3]" />

      {/* LAYER 5: Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-20 md:pt-24 pb-24 md:pb-0 md:min-h-screen md:flex md:items-center md:justify-end">
        <div className="w-full md:w-[55%] lg:w-1/2 text-center md:text-left">
          {/* Logo Lockup with text reveal */}
          <div className="mb-6 md:mb-8 overflow-hidden">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.06em] sm:tracking-[0.08em] uppercase font-medium leading-[0.85]">
              <span className="text-cream block">
                <TextReveal text="Jersey" delay={0.3} />
              </span>
              <span className="block">
                <TextReveal text="Proper" delay={0.8} isGold />
              </span>
              <span className="sr-only"> - Boutique Creative Studio</span>
            </h1>
          </div>

          {/* Tagline with fade-in */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 100,
              delay: 0.8 
            }}
            className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-cream/80 max-w-sm sm:max-w-md lg:max-w-lg mx-auto md:mx-0 mb-8 md:mb-10 font-light leading-relaxed"
          >
            Premium digital experiences for businesses that refuse to blend in
          </motion.p>

          {/* Magnetic CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 100,
              delay: 1.0 
            }}
          >
            <MagneticButton
              href="#contact"
              className="btn-gold inline-block text-sm sm:text-base px-8 py-4 sm:px-10 sm:py-5"
              strength={0.25}
            >
              Start a Project
            </MagneticButton>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
