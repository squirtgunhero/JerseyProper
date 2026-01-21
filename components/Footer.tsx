import Link from 'next/link'
import Logo from './Logo'

const footerLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gold-primary/20 bg-black-green/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Logo variant="stacked" size="sm" />
            <p className="mt-6 text-sm text-cream/60 font-light leading-relaxed max-w-xs">
              Premium digital experiences for businesses that refuse to blend in.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bodoni tracking-wider uppercase text-gold-primary mb-4">
              Navigate
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-gold-light transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bodoni tracking-wider uppercase text-gold-primary mb-4">
              Connect
            </h3>
            <p className="text-sm text-cream/70 font-light leading-relaxed">
              Ready to build something proper?
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 text-sm text-gold-primary hover:text-gold-light transition-colors font-light"
            >
              Start a conversation
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-cream/50 font-light">
              © {currentYear} Jersey Proper. Built properly, from the start.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-cream/50 hover:text-gold-primary transition-colors font-light"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
