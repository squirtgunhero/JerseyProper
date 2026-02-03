'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const categories = [
  {
    name: "Real Estate",
    brands: ["Coldwell Banker", "RE/MAX", "Keller Williams", "Century 21", "Compass", "Zillow", "Redfin"]
  },
  {
    name: "Fitness",
    brands: ["Planet Fitness", "Orangetheory", "CrossFit", "Equinox", "LA Fitness", "F45 Training"]
  },
  {
    name: "Restaurants",
    brands: ["Dominos", "Chipotle", "Sweetgreen", "Shake Shack", "Panera"]
  },
  {
    name: "Beauty",
    brands: ["Supercuts", "Great Clips", "Massage Envy", "European Wax Center", "Drybar"]
  },
  {
    name: "Home Services",
    brands: ["ServiceMaster", "Stanley Steemer", "Mr. Rooter", "Two Men and a Truck"]
  },
  {
    name: "Dental",
    brands: ["Aspen Dental", "Heartland Dental", "ClearChoice", "SmileDirectClub"]
  },
]

export default function IntelPage() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const trackActivity = (type: 'search' | 'brand_click', value: string, category?: string) => {
    // Fire and forget - don't block the user
    fetch('/api/intel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, value, category }),
    }).catch(() => {}) // Silently ignore errors
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    trackActivity('search', query.trim())
    const url = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=${encodeURIComponent(query.trim())}&search_type=keyword_unordered`
    window.open(url, '_blank')
  }

  const handleBrandClick = (brand: string) => {
    trackActivity('brand_click', brand, selectedCategory || undefined)
    const url = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=${encodeURIComponent(brand)}&search_type=keyword_unordered`
    window.open(url, '_blank')
  }

  return (
    <main className="min-h-screen bg-jp-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.5em] uppercase text-gold mb-4">
              Jersey Proper
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4">
              Competitor Intel
            </h1>
            <p className="text-base text-white/50">
              Enter a business name to see all their Facebook & Instagram ads
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSearch}
            className="mb-10"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter competitor name..."
                className="flex-1 px-5 py-4 text-base bg-white/[0.04] border border-gold/20 rounded-xl text-cream placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className={`px-7 py-4 text-sm font-semibold rounded-xl transition-all ${
                  query.trim()
                    ? 'bg-gradient-to-br from-gold to-gold-shadow text-jp-black hover:from-gold-light hover:to-gold cursor-pointer'
                    : 'bg-gold/15 text-white/30 cursor-not-allowed'
                }`}
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* Industry Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-[11px] tracking-[0.12em] uppercase text-white/50 mb-3">
              Browse by industry
            </p>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  className={`px-3.5 py-2 text-[13px] rounded-lg transition-all cursor-pointer ${
                    selectedCategory === cat.name
                      ? 'bg-gold/15 border border-gold/40 text-gold'
                      : 'bg-white/[0.02] border border-white/[0.08] text-white/60 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Selected Category Brands */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-8"
            >
              <p className="text-xs text-white/50 mb-4">
                View ads from <span className="text-gold">{selectedCategory}</span> brands:
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.find(c => c.name === selectedCategory)?.brands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => handleBrandClick(brand)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] bg-gold/[0.08] border border-gold/20 rounded-lg text-gold hover:bg-gold/15 hover:border-gold/30 transition-all cursor-pointer"
                  >
                    {brand}
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* How to Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-6"
          >
            <h2 className="text-xs font-semibold text-white mb-4">
              How to use this
            </h2>
            <div className="text-[13px] text-white/50 leading-relaxed space-y-2.5">
              <p>
                <span className="text-gold font-medium">1.</span> Search your competitor&apos;s exact business name
              </p>
              <p>
                <span className="text-gold font-medium">2.</span> See every ad they&apos;re currently running
              </p>
              <p>
                <span className="text-gold font-medium">3.</span> Ads running 30+ days = proven winners
              </p>
            </div>
          </motion.div>

          {/* Pro Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gold/[0.04] border border-gold/10 rounded-xl p-5 mb-10"
          >
            <h2 className="text-xs font-semibold text-gold mb-3">
              Pro tips
            </h2>
            <ul className="list-disc list-inside text-[13px] text-white/50 leading-relaxed space-y-1">
              <li>Search the exact business name for best results</li>
              <li>Click &quot;See ad details&quot; to view all variations</li>
              <li>Note their offers, CTAs, and creative styles</li>
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-white/40 mb-3">
              Need ads that outperform your competition?
            </p>
            <a
              href="/#contact"
              className="inline-block text-[13px] text-gold border-b border-gold/30 hover:border-gold/60 transition-colors"
            >
              Work with Jersey Proper
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
