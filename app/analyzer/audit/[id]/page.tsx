'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Download, CheckCircle, AlertTriangle, XCircle, 
  Copy, Check, ExternalLink, Loader2, Target, FileText, MessageSquare
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface RuleResult {
  id: string
  module: string
  title: string
  whyItMatters: string
  maxPoints: number
  earnedPoints: number
  status: 'pass' | 'warn' | 'fail'
  evidence: string[]
  recommendation: string
}

interface ModuleScore {
  earned: number
  max: number
  grade: string
}

interface AuditData {
  id: string
  url: string
  query: string | null
  createdAt: string
  overallScore: number | null
  moduleScores: Record<string, ModuleScore> | null
  ruleResults: RuleResult[] | null
  queryFitScore: number | null
  answerDraft: string | null
  suggestedFaqs: string[] | null
  status: string
  error: string | null
}

const MODULE_NAMES: Record<string, string> = {
  A: 'Answer-ability',
  B: 'Entity clarity',
  C: 'Trust & evidence',
  D: 'Structured data',
  E: 'Retrieval & accessibility',
  F: 'Citation likelihood',
}

export default function AuditResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [audit, setAudit] = useState<AuditData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pass' | 'warn' | 'fail'>('all')
  const [expandedRule, setExpandedRule] = useState<string | null>(null)

  useEffect(() => {
    fetchAudit()
  }, [resolvedParams.id])

  async function fetchAudit() {
    try {
      const res = await fetch(`/api/audits/${resolvedParams.id}`)
      if (!res.ok) {
        throw new Error('Audit not found')
      }
      const data = await res.json()
      setAudit(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audit')
    } finally {
      setLoading(false)
    }
  }

  async function copyReport() {
    if (!audit) return
    
    // Generate simple markdown report
    let report = `# AEO Audit Report\n\n`
    report += `**URL:** ${audit.url}\n`
    report += `**Score:** ${audit.overallScore}/100\n\n`
    
    if (audit.moduleScores) {
      report += `## Module Scores\n\n`
      Object.entries(audit.moduleScores).forEach(([id, score]) => {
        report += `- ${id}. ${MODULE_NAMES[id]}: ${score.earned}/${score.max} (${score.grade})\n`
      })
    }
    
    await navigator.clipboard.writeText(report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function getScoreColor(score: number) {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  function getScoreBg(score: number) {
    if (score >= 80) return 'bg-green-400/10 border-green-400/20'
    if (score >= 60) return 'bg-yellow-400/10 border-yellow-400/20'
    return 'bg-red-400/10 border-red-400/20'
  }

  function getGradeColor(grade: string) {
    if (grade === 'A') return 'text-green-400 bg-green-400/10'
    if (grade === 'B') return 'text-blue-400 bg-blue-400/10'
    if (grade === 'C') return 'text-yellow-400 bg-yellow-400/10'
    if (grade === 'D') return 'text-orange-400 bg-orange-400/10'
    return 'text-red-400 bg-red-400/10'
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'warn':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return null
    }
  }

  const filteredRules = audit?.ruleResults?.filter(
    (rule) => filter === 'all' || rule.status === filter
  ) || []

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </main>
    )
  }

  if (error || !audit) {
    return (
      <main className="min-h-screen bg-black">
        <Navigation />
        <div className="pt-32 pb-16 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-2xl text-white mb-4">Audit Not Found</h1>
          <p className="text-white/60 mb-8">{error}</p>
          <button
            onClick={() => router.push('/analyzer')}
            className="px-6 py-3 bg-white text-black rounded-lg"
          >
            Back to Analyzer
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <div className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <button
                onClick={() => router.push('/analyzer')}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Analyzer
              </button>
              <h1 className="text-2xl font-light text-white mb-2">Audit Results</h1>
              <a 
                href={audit.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                {audit.url}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <button
              onClick={copyReport}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Copy Report
                </>
              )}
            </button>
          </div>

          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-2xl border mb-8 ${getScoreBg(audit.overallScore || 0)}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Overall Score</p>
                <div className={`text-6xl font-light ${getScoreColor(audit.overallScore || 0)}`}>
                  {audit.overallScore}
                  <span className="text-2xl text-white/40">/100</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm mb-1">
                  {new Date(audit.createdAt).toLocaleString()}
                </p>
                {audit.query && (
                  <p className="text-white/40 text-sm">
                    Query: {audit.query}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Module Scores Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {audit.moduleScores && Object.entries(audit.moduleScores).map(([id, score], i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 bg-white/[0.02] border border-white/5 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 text-sm">{id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getGradeColor(score.grade)}`}>
                    {score.grade}
                  </span>
                </div>
                <p className="text-white text-sm font-medium mb-1">{MODULE_NAMES[id]}</p>
                <p className="text-white/60 text-lg">
                  {score.earned}<span className="text-white/30">/{score.max}</span>
                </p>
              </motion.div>
            ))}
          </div>

          {/* Query Fit Panel */}
          {audit.query && audit.queryFitScore !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white/[0.02] border border-white/5 rounded-xl mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-white/60" />
                <h2 className="text-lg font-medium text-white">Query Fit Analysis</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/40 text-sm mb-2">Query Fit Score</p>
                  <div className={`text-4xl font-light ${getScoreColor(audit.queryFitScore)}`}>
                    {audit.queryFitScore}<span className="text-xl text-white/40">/100</span>
                  </div>
                </div>
                
                {audit.answerDraft && (
                  <div>
                    <p className="text-white/40 text-sm mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Draft Answer
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed bg-black/30 p-3 rounded-lg">
                      {audit.answerDraft}
                    </p>
                  </div>
                )}
              </div>

              {audit.suggestedFaqs && audit.suggestedFaqs.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-white/40 text-sm mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Suggested FAQs to Add
                  </p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {audit.suggestedFaqs.map((faq, i) => (
                      <div key={i} className="text-sm text-white/70 bg-black/30 px-3 py-2 rounded">
                        {faq}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Rules Filter */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-white/40 text-sm">Filter:</span>
            {(['all', 'pass', 'warn', 'fail'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filter === f 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f !== 'all' && audit.ruleResults && (
                  <span className="ml-1.5 text-white/30">
                    ({audit.ruleResults.filter(r => r.status === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Rules List */}
          <div className="space-y-3">
            {filteredRules.map((rule, i) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(rule.status)}
                    <div>
                      <p className="text-white font-medium">
                        {rule.id}: {rule.title}
                      </p>
                      <p className="text-white/40 text-sm">{MODULE_NAMES[rule.module]}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60">
                      {rule.earnedPoints}/{rule.maxPoints}
                    </p>
                  </div>
                </button>
                
                {expandedRule === rule.id && (
                  <div className="px-4 pb-4 border-t border-white/5 pt-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-white/40 text-sm mb-1">Why it matters</p>
                        <p className="text-white/80 text-sm">{rule.whyItMatters}</p>
                      </div>
                      
                      <div>
                        <p className="text-white/40 text-sm mb-2">Evidence</p>
                        <ul className="space-y-1">
                          {rule.evidence.map((ev, j) => (
                            <li key={j} className="text-sm text-white/60 bg-black/30 px-3 py-2 rounded">
                              {ev}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-white/40 text-sm mb-1">Recommendation</p>
                        <p className="text-white/80 text-sm">{rule.recommendation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
