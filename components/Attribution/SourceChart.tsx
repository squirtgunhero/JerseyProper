'use client';

import { SourceBreakdown } from '@/lib/attribution/types';

interface SourceChartProps {
  sources: SourceBreakdown[];
}

const SOURCE_COLORS: Record<string, string> = {
  ChatGPT: 'bg-emerald-500',
  Claude: 'bg-orange-500',
  Perplexity: 'bg-blue-500',
  'Bing Chat': 'bg-cyan-500',
  'You.com': 'bg-purple-500',
  'Google Bard': 'bg-red-500',
  'Google Gemini': 'bg-indigo-500',
  Poe: 'bg-pink-500',
  Cohere: 'bg-teal-500',
  'AI-Likely': 'bg-zinc-400',
};

export default function SourceChart({ sources }: SourceChartProps) {
  const maxCount = Math.max(...sources.map((s) => s.count), 1);

  if (sources.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">Traffic by AI Source</h3>
        <div className="flex items-center justify-center h-48 text-zinc-500">
          No data yet. Install the tracking script to start collecting data.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h3 className="text-lg font-semibold text-zinc-900 mb-6">Traffic by AI Source</h3>
      
      <div className="space-y-4">
        {sources.map((source) => (
          <div key={source.source}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-zinc-700">{source.source}</span>
              <span className="text-sm text-zinc-500">
                {source.count.toLocaleString()} ({source.percentage}%)
              </span>
            </div>
            <div className="h-6 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${SOURCE_COLORS[source.source] || 'bg-zinc-400'}`}
                style={{ width: `${(source.count / maxCount) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Confirmed: {source.confirmed}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Probable: {source.probable}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                Possible: {source.possible}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
