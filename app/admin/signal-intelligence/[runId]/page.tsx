'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface DerivedInsight {
  id: string;
  category: string;
  title: string;
  severity: string;
  summary: string;
  evidence: Record<string, unknown>;
  created_at: string;
}

interface SignalBrief {
  id: string;
  headline: string;
  body_md: string;
  audience: string;
  created_by: string | null;
}

interface SignalRun {
  id: string;
  started_at: string;
  finished_at: string | null;
  status: string;
  triggered_by: string | null;
  created_at: string;
}

interface RunDetails {
  run: SignalRun;
  insights: DerivedInsight[];
  brief: SignalBrief | null;
  signalCount: number;
}

export default function RunDetailPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = use(params);
  const [details, setDetails] = useState<RunDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedInsights, setExpandedInsights] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`/api/admin/signal-intelligence/runs/${runId}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to fetch run details');
        }
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load run details');
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [runId]);

  function toggleInsight(id: string) {
    setExpandedInsights((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function getSeverityColor(severity: string): string {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'high':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'medium':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'low':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default:
        return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
    }
  }

  function getCategoryIcon(category: string): string {
    switch (category) {
      case 'ads':
        return '📢';
      case 'visibility':
        return '👁';
      case 'content':
        return '📝';
      case 'strategy':
        return '🎯';
      default:
        return '📊';
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <svg className="animate-spin h-8 w-8 text-zinc-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-6 py-4">
          <h2 className="text-lg font-medium text-red-400">Error Loading Run</h2>
          <p className="mt-1 text-sm text-red-300">{error || 'Run not found'}</p>
          <Link
            href="/admin/signal-intelligence"
            className="mt-4 inline-block text-sm text-emerald-400 hover:text-emerald-300"
          >
            ← Back to runs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/signal-intelligence"
          className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ← Back to runs
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-white">
          {details.brief?.headline || 'Signal Intelligence Run'}
        </h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-zinc-500">
          <span>
            {new Date(details.run.created_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <span>•</span>
          <span>{details.signalCount} signals collected</span>
          <span>•</span>
          <span>{details.insights.length} insights derived</span>
        </div>
      </div>

      {/* Brief */}
      {details.brief && (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Executive Brief</h2>
          <div className="prose prose-invert prose-sm max-w-none">
            <div 
              className="text-zinc-300 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ 
                __html: details.brief.body_md
                  .replace(/^# .+$/gm, '')
                  .replace(/## (.+)/g, '<h3 class="text-white font-semibold mt-6 mb-2">$1</h3>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                  .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
                  .replace(/^\*(.+)\*$/gm, '<em class="text-zinc-400">$1</em>')
              }}
            />
          </div>
        </div>
      )}

      {/* Insights */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Derived Insights</h2>
        <div className="space-y-3">
          {details.insights.map((insight) => (
            <div
              key={insight.id}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden"
            >
              <button
                onClick={() => toggleInsight(insight.id)}
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-zinc-800/50 transition-colors"
              >
                <span className="text-lg">{getCategoryIcon(insight.category)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-white truncate">
                      {insight.title}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getSeverityColor(insight.severity)}`}>
                      {insight.severity}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 truncate mt-0.5">
                    {insight.summary}
                  </p>
                </div>
                <svg
                  className={`h-5 w-5 text-zinc-500 transition-transform ${
                    expandedInsights.has(insight.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedInsights.has(insight.id) && (
                <div className="px-4 pb-4 border-t border-zinc-800">
                  <p className="text-sm text-zinc-300 mt-3 mb-4">
                    {insight.summary}
                  </p>
                  <div className="rounded-lg bg-zinc-800/50 p-3">
                    <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                      Evidence
                    </h4>
                    <pre className="text-xs text-zinc-400 overflow-x-auto">
                      {JSON.stringify(insight.evidence, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
