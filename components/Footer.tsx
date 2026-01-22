'use client'

export default function Footer() {
  return (
    <footer className="py-12 bg-jp-black border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="font-display text-lg tracking-luxury uppercase text-cream">
              Jersey
            </span>
            <span className="font-display text-lg tracking-luxury uppercase gold-text-static">
              Proper
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a href="#services" className="text-cream/40 hover:text-gold text-sm tracking-wide transition-colors">
              Services
            </a>
            <a href="#process" className="text-cream/40 hover:text-gold text-sm tracking-wide transition-colors">
              Process
            </a>
            <a href="#about" className="text-cream/40 hover:text-gold text-sm tracking-wide transition-colors">
              About
            </a>
            <a href="#contact" className="text-cream/40 hover:text-gold text-sm tracking-wide transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-cream/30 text-sm">
            © 2024 Jersey Proper. All rights reserved.
          </p>
        </div>

        {/* Decorative line */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <div className="w-1.5 h-1.5 bg-gold/50 rotate-45" />
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>
    </footer>
  )
}
