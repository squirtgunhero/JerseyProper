'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

interface NavLink {
  name: string
  href: string
  isAnchor: boolean
  children?: { name: string; href: string }[]
}

const navLinks: NavLink[] = [
  { name: 'Services', href: '#services', isAnchor: true },
  { name: 'Process', href: '#process', isAnchor: true },
  { name: 'About', href: '#about', isAnchor: true },
  { name: 'Notes', href: '/notes', isAnchor: false },
  { 
    name: 'Products', 
    href: '/products',
    isAnchor: false,
    children: [
      { name: 'Colony', href: '/colony' },
      { name: 'AEO Analyzer', href: '/analyzer' },
      { name: 'Competitor Intel', href: '/intel' },
      { name: 'Signal Intelligence', href: '/signal-intelligence' },
    ]
  },
  { name: 'Contact', href: '#contact', isAnchor: true },
]

interface NavigationProps {
  variant?: 'dark' | 'light'
}

export default function Navigation({ variant = 'dark' }: NavigationProps) {
  const isLight = variant === 'light'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getHref = (link: NavLink) => {
    if (!link.isAnchor) return link.href
    return isHomePage ? link.href : `/${link.href}`
  }

  const isProductsActive = navLinks
    .find(l => l.name === 'Products')
    ?.children?.some(child => pathname?.startsWith(child.href)) || pathname === '/products'

  // Theme tokens
  const t = isLight
    ? {
        headerScrolled: 'bg-white/95 backdrop-blur-sm py-4 border-b border-[#E8E6E1]',
        headerTop: 'bg-transparent py-6',
        logoText: 'text-[#1A1A1A]',
        logoAccent: 'text-[#C9A84C]',
        link: 'text-[#6B6B6B] hover:text-[#1A1A1A]',
        linkActive: 'text-[#1A1A1A]',
        dropdown: 'bg-white border border-[#E8E6E1] shadow-lg',
        dropdownLink: 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F3EF]',
        dropdownLinkActive: 'text-[#1A1A1A] bg-[#F5F3EF]',
        mobileMenu: 'bg-white',
        mobileLink: 'text-[#1A1A1A]',
        mobileLinkMuted: 'text-[#6B6B6B] hover:text-[#1A1A1A]',
        mobileBorder: 'border-[#E8E6E1]',
        iconColor: 'text-[#1A1A1A]',
      }
    : {
        headerScrolled: 'bg-jp-black/95 backdrop-blur-sm py-4',
        headerTop: 'bg-transparent py-6',
        logoText: 'text-cream',
        logoAccent: 'gold-text-static',
        link: 'text-cream/70 hover:text-white',
        linkActive: 'text-white',
        dropdown: 'bg-jp-black/95 backdrop-blur-sm border border-cream/10 shadow-xl',
        dropdownLink: 'text-cream/70 hover:text-white hover:bg-cream/5',
        dropdownLinkActive: 'text-white bg-cream/5',
        mobileMenu: 'bg-jp-black',
        mobileLink: 'text-cream hover:text-white',
        mobileLinkMuted: 'text-cream/70 hover:text-white',
        mobileBorder: 'border-cream/20',
        iconColor: 'text-cream',
      }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? t.headerScrolled : t.headerTop
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 hidden md:flex md:items-center md:justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-1"
            >
              <span className={clsx("font-display text-xl tracking-luxury uppercase", t.logoText)}>
                Jersey
              </span>
              {isLight ? (
                <span className={clsx("font-display text-xl tracking-luxury uppercase", t.logoAccent)}>
                  Proper
                </span>
              ) : (
                <span className="font-display text-xl tracking-luxury uppercase gold-text-static">
                  Proper
                </span>
              )}
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.name} className="relative" ref={productsRef}>
                  <button
                    onClick={() => setProductsOpen(!productsOpen)}
                    className={clsx(
                      "flex items-center gap-1 transition-colors duration-300 text-sm tracking-widest uppercase font-light",
                      t.link,
                      isProductsActive && t.linkActive
                    )}
                  >
                    {link.name}
                    <ChevronDown className={clsx(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      productsOpen && "rotate-180"
                    )} />
                  </button>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className={clsx(
                          "absolute top-full left-0 mt-3 w-52 rounded-lg overflow-hidden",
                          t.dropdown
                        )}
                      >
                        <div className="py-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setProductsOpen(false)}
                              className={clsx(
                                "block px-4 py-2.5 text-sm transition-colors duration-200",
                                t.dropdownLink,
                                pathname?.startsWith(child.href) && t.dropdownLinkActive
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : link.isAnchor ? (
                <a
                  key={link.name}
                  href={getHref(link)}
                  className={clsx(
                    "transition-colors duration-300 text-sm tracking-widest uppercase font-light",
                    t.link
                  )}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "transition-colors duration-300 text-sm tracking-widest uppercase font-light",
                    t.link,
                    pathname?.startsWith(link.href) && t.linkActive
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </nav>

        {/* Mobile Nav */}
        <nav className="md:hidden max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-0.5"
            >
              <span className={clsx("font-display text-base tracking-[0.1em] uppercase", t.logoText)}>
                Jersey
              </span>
              {isLight ? (
                <span className={clsx("font-display text-base tracking-[0.1em] uppercase", t.logoAccent)}>
                  Proper
                </span>
              ) : (
                <span className="font-display text-base tracking-[0.1em] uppercase gold-text-static">
                  Proper
                </span>
              )}
            </motion.div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={clsx("relative z-10 p-2", t.iconColor)}
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={clsx("fixed inset-0 z-40 pt-24 px-6 md:hidden overflow-y-auto", t.mobileMenu)}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                link.children ? (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className={clsx(
                        "flex items-center justify-between w-full font-display text-2xl tracking-luxury uppercase transition-colors duration-300",
                        t.mobileLink
                      )}
                    >
                      {link.name}
                      <ChevronDown className={clsx(
                        "w-5 h-5 transition-transform duration-200",
                        mobileProductsOpen && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={clsx("pl-4 pt-4 flex flex-col gap-4 border-l ml-2 mt-4", t.mobileBorder)}>
                            {link.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={clsx(
                                  "font-display text-lg tracking-wide transition-colors duration-300",
                                  t.mobileLinkMuted,
                                  pathname?.startsWith(child.href) && t.linkActive
                                )}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : link.isAnchor ? (
                  <motion.a
                    key={link.name}
                    href={getHref(link)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "font-display text-2xl tracking-luxury uppercase transition-colors duration-300",
                      t.mobileLink
                    )}
                  >
                    {link.name}
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        "font-display text-2xl tracking-luxury uppercase transition-colors duration-300",
                        t.mobileLink
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
