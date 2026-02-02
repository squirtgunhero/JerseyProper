'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, ReactNode } from 'react'

/**
 * MAGNETIC BUTTON COMPONENT
 * 
 * Creates a premium 'follow' effect where the button subtly moves
 * toward the cursor position when hovering. Uses spring physics
 * for a natural, high-end feel.
 */

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number // How strongly the button follows cursor (default: 0.3)
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Motion values for x and y translation
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Spring physics for smooth, dampened movement
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate distance from center
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    
    // Apply strength multiplier
    x.set(deltaX * strength)
    y.set(deltaY * strength)
  }

  const handleMouseLeave = () => {
    // Reset to center with spring animation
    x.set(0)
    y.set(0)
  }

  const MotionWrapper = motion.div

  if (href) {
    return (
      <MotionWrapper
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className="inline-block"
      >
        <motion.a
          href={href}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', damping: 15, stiffness: 400 }}
          className={className}
        >
          {children}
        </motion.a>
      </MotionWrapper>
    )
  }

  return (
    <MotionWrapper
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', damping: 15, stiffness: 400 }}
        className={className}
      >
        {children}
      </motion.button>
    </MotionWrapper>
  )
}
