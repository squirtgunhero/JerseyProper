'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-inter font-light uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-gold-primary/10 text-gold-light border border-gold-primary/40 hover:bg-gold-primary/20 hover:border-gold-light/60 hover:text-gold-highlight',
      secondary:
        'bg-transparent text-cream border border-cream/20 hover:bg-cream/5 hover:border-cream/40',
      ghost: 'text-gold-primary hover:text-gold-light',
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
