'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { name: 'Services', href: '#services', isAnchor: true },
  { name: 'Process', href: '#process', isAnchor: true },
  { name: 'About', href: '#about', isAnchor: true },
  { name: 'Notes', href: '/notes', isAnchor: false },
  { name: 'Analyzer', href: '/analyzer', isAnchor: false },
  { name: 'Contact', href: '#contact', isAnchor: true },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getHref = (link: typeof navLinks[0]) => {
    if (!link.isAnchor) return link.href
    return isHomePage ? link.href : `/${link.href}`
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-jp-black/95 backdrop-blur-sm py-4'
            : 'bg-transparent py-6'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-0.5 sm:gap-1"
            >
              <span className="font-display text-base sm:text-xl tracking-[0.1em] sm:tracking-luxury uppercase text-cream">
                Jersey
              </span>
              <span className="font-display text-base sm:text-xl tracking-[0.1em] sm:tracking-luxury uppercase gold-text-static">
                Proper
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.name}
                  href={getHref(link)}
                  className="text-cream/70 hover:text-gold transition-colors text-sm tracking-widest uppercase font-light"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "text-cream/70 hover:text-gold transition-colors text-sm tracking-widest uppercase font-light",
                    pathname?.startsWith(link.href) && "text-gold-primary"
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
            <motion.a
              href={isHomePage ? "#contact" : "/#contact"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-gold text-xs"
            >
              Start a Project
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2 text-cream"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-jp-black pt-24 px-6 md:hidden"
        >
          <div className="flex flex-col gap-8">
            {navLinks.map((link, i) => (
              link.isAnchor ? (
                <motion.a
                  key={link.name}
                  href={getHref(link)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl tracking-luxury uppercase text-cream hover:text-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ) : (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-3xl tracking-luxury uppercase text-cream hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              )
            ))}
            <motion.a
              href={isHomePage ? "#contact" : "/#contact"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-gold inline-block text-center mt-4"
            >
              Start a Project
            </motion.a>
          </div>
        </motion.div>
      )}
    </>
  )
}
