'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'stacked' | 'horizontal' | 'monogram'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className }: LogoProps) {
  const sizes = {
    sm: {
      jersey: 'text-xl md:text-2xl',
      proper: 'text-[0.5rem] md:text-xs',
      monogram: 'text-2xl md:text-3xl',
    },
    md: {
      jersey: 'text-2xl md:text-3xl',
      proper: 'text-xs md:text-sm',
      monogram: 'text-3xl md:text-4xl',
    },
    lg: {
      jersey: 'text-4xl md:text-6xl lg:text-7xl',
      proper: 'text-sm md:text-base lg:text-lg',
      monogram: 'text-5xl md:text-6xl',
    },
  }

  if (variant === 'monogram') {
    return (
      <Link href="/" className={cn('group', className)}>
        <div className="relative">
          <div className="absolute inset-0 rotate-45 border border-gold-primary/40 transition-all group-hover:border-gold-light/60" />
          <div className={cn('relative px-4 py-3 font-bodoni font-medium text-gradient-gold', sizes[size].monogram)}>
            JP
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'stacked') {
    return (
      <Link href="/" className={cn('group flex flex-col items-center gap-2', className)}>
        <div className={cn('font-bodoni font-medium tracking-jersey uppercase text-gradient-gold', sizes[size].jersey)}>
          JERSEY
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px w-6 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
          <div className="h-1 w-1 rotate-45 bg-gold-primary" />
          <div className="h-1 w-1 rotate-45 bg-gold-primary" />
          <div className="h-px w-6 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rotate-45 bg-gold-primary/60" />
          <div className={cn('font-bodoni tracking-proper uppercase text-gold-primary/90', sizes[size].proper)}>
            PROPER
          </div>
          <div className="h-1 w-1 rotate-45 bg-gold-primary/60" />
        </div>
      </Link>
    )
  }

  return (
    <Link href="/" className={cn('group flex items-center gap-3', className)}>
      <div className={cn('font-bodoni font-medium tracking-jersey uppercase text-gradient-gold transition-all', sizes[size].jersey)}>
        JERSEY
      </div>
      <div className="h-4 w-px bg-gold-primary/60" />
      <div className={cn('font-bodoni tracking-proper uppercase text-gold-primary/80', sizes[size].proper)}>
        PROPER
      </div>
    </Link>
  )
}
