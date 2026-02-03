'use client'

import { Mail, MapPin, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react'

// Custom icons for platforms not in lucide-react
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.66.96-2.9 2.16-2.9 1.02 0 1.52.77 1.52 1.68 0 1.02-.66 2.56-1 3.98-.28 1.2.6 2.18 1.78 2.18 2.14 0 3.78-2.26 3.78-5.5 0-2.88-2.06-4.9-5.02-4.9-3.42 0-5.42 2.56-5.42 5.22 0 1.04.4 2.14.9 2.74.1.12.12.22.08.34l-.34 1.36c-.04.18-.16.22-.36.14-1.34-.64-2.18-2.64-2.18-4.26 0-3.48 2.52-6.66 7.28-6.66 3.82 0 6.8 2.72 6.8 6.36 0 3.8-2.4 6.86-5.72 6.86-1.12 0-2.16-.58-2.52-1.26l-.68 2.6c-.24.94-.9 2.12-1.34 2.84A12 12 0 1 0 12 0z" />
  </svg>
)

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/jerseyproper', icon: Instagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/jerseyproper', icon: Linkedin },
  { name: 'X', href: 'https://x.com/jerseyproper', icon: XIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/@JerseyProper', icon: Youtube },
  { name: 'TikTok', href: 'https://www.tiktok.com/@jerseyproper', icon: TikTokIcon },
  { name: 'Pinterest', href: 'https://www.pinterest.com/jerseyproper/', icon: PinterestIcon },
  { name: 'Facebook', href: 'https://www.facebook.com/JerseyProper', icon: Facebook },
]

export default function Footer() {
  return (
    <footer className="py-16 bg-jp-black border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-1 justify-center md:justify-start mb-4">
              <span className="font-display text-lg tracking-luxury uppercase text-cream">
                Jersey
              </span>
              <span className="font-display text-lg tracking-luxury uppercase gold-text-static">
                Proper
              </span>
            </div>
            {/* Entity clarity statement - visible */}
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              A boutique creative studio building premium digital experiences, websites, and growth systems for brands that refuse to blend in.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="text-center">
            <h4 className="font-heading text-xs uppercase tracking-widest text-gold-primary/60 mb-4">
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
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
          </div>

          {/* Contact Column - Entity Clarity */}
          <div className="text-center md:text-right">
            <h4 className="font-heading text-xs uppercase tracking-widest text-gold-primary/60 mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:michael@jerseyproper.com" 
                className="inline-flex items-center gap-2 text-cream/50 hover:text-gold text-sm transition-colors justify-center md:justify-end"
              >
                <Mail className="w-3.5 h-3.5" />
                michael@jerseyproper.com
              </a>
              <div className="inline-flex items-center gap-2 text-cream/40 text-sm justify-center md:justify-end">
                <MapPin className="w-3.5 h-3.5" />
                New Jersey, United States
              </div>
            </div>
            {/* Founder attribution */}
            <p className="mt-6 text-cream/30 text-xs">
              Founded by Michael Ehrlich
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-gold/20 hover:border-gold hover:bg-gold/10 transition-all duration-300 group"
              aria-label={`Follow Jersey Proper on ${social.name}`}
            >
              <social.icon className="w-4 h-4 text-cream/50 group-hover:text-gold transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <div className="w-1.5 h-1.5 bg-gold/50 rotate-45" />
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>

        {/* Copyright & Legal */}
        <div className="text-center">
          <p className="text-cream/30 text-xs mb-2">
            © {new Date().getFullYear()} Jersey Proper. All rights reserved. Boutique creative studio serving New Jersey and nationwide.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <a 
              href="/privacy" 
              className="text-cream/30 hover:text-gold transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-cream/20">|</span>
            <a 
              href="/cookies" 
              className="text-cream/30 hover:text-gold transition-colors"
            >
              Cookie Policy
            </a>
            <span className="text-cream/20">|</span>
            <a 
              href="/terms" 
              className="text-cream/30 hover:text-gold transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
