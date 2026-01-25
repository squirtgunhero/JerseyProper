'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2, ExternalLink, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface AuditListItem {
  id: string
  url: string
  query: string | null
  createdAt: string
  overallScore: number | null
  status: string
}

interface ErrorInfo {
  message: string
  code?: 'RATE_LIMITED' | 'DOMAIN_LIMITED' | string
  isRateLimited: boolean
}

export default function AnalyzerPage() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorInfo | null>(null)
  const [recentAudits, setRecentAudits] = useState<AuditListItem[]>([])

  useEffect(() => {
    fetchRecentAudits()
  }, [])

  async function fetchRecentAudits() {
    try {
      const res = await fetch('/api/audits')
      if (res.ok) {
        const data = await res.json()
        setRecentAudits(data)
      }
    } catch {
      // Ignore errors for recent audits
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, query: query || null }),
      })

      const data = await res.json()

      if (!res.ok) {
        // Handle rate limiting errors
        if (res.status === 429) {
          setError({
            message: data.message || 'Rate limit exceeded',
            code: data.code,
            isRateLimited: true,
          })
          setLoading(false)
          return
        }
        throw new Error(data.error || data.message || 'Failed to run audit')
      }

      router.push(`/analyzer/audit/${data.id}`)
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'An error occurred',
        isRateLimited: false,
      })
      setLoading(false)
    }
  }

  function getScoreColor(score: number | null) {
    if (score === null) return 'text-white/40'
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
    }
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
              AEO Analyzer
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Audit your content for Answer Engine Optimization. Get actionable insights 
              to make your pages more likely to be cited by AI systems.
            </p>
          </motion.div>

          {/* Audit Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-8"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-white/80 mb-2">
                  Page URL <span className="text-white/40">*</span>
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="query" className="block text-sm font-medium text-white/80 mb-2">
                  Target Query <span className="text-white/40">(optional)</span>
                </label>
                <input
                  type="text"
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What is [topic]? or How to [action]?"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
                <p className="mt-2 text-sm text-white/40">
                  Provide a query to analyze how well the page answers it
                </p>
              </div>

              {error && (
                <div className={`p-4 rounded-lg ${
                  error.isRateLimited 
                    ? 'bg-yellow-500/10 border border-yellow-500/20' 
                    : 'bg-red-500/10 border border-red-500/20'
                }`}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      error.isRateLimited ? 'text-yellow-400' : 'text-red-400'
                    }`} />
                    <div>
                      <p className={`text-sm font-medium ${
                        error.isRateLimited ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {error.message}
                      </p>
                      {error.isRateLimited && (
                        <p className="text-sm text-white/50 mt-1">
                          {error.code === 'RATE_LIMITED' 
                            ? 'You can try again within an hour.'
                            : error.code === 'DOMAIN_LIMITED'
                            ? 'Try again tomorrow or scan a different domain.'
                            : 'Please wait before trying again.'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !url}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Run Audit
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Recent Audits */}
      {recentAudits.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-light text-white mb-6">Recent Audits</h2>
            
            <div className="space-y-3">
              {recentAudits.slice(0, 10).map((audit) => (
                <motion.a
                  key={audit.id}
                  href={`/analyzer/audit/${audit.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {getStatusIcon(audit.status)}
                    <div className="min-w-0">
                      <p className="text-white/80 truncate group-hover:text-white transition-colors">
                        {audit.url}
                      </p>
                      {audit.query && (
                        <p className="text-sm text-white/40 truncate">
                          Query: {audit.query}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <Clock className="w-4 h-4" />
                      {new Date(audit.createdAt).toLocaleDateString()}
                    </div>
                    
                    {audit.status === 'completed' && (
                      <div className={`text-2xl font-light ${getScoreColor(audit.overallScore)}`}>
                        {audit.overallScore}
                      </div>
                    )}
                    
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
