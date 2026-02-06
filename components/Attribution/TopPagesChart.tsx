'use client';

import { PageStats } from '@/lib/attribution/types';

interface TopPagesChartProps {
  pages: PageStats[];
}

export default function TopPagesChart({ pages }: TopPagesChartProps) {
  const maxCount = Math.max(...pages.map((p) => p.count), 1);

  if (pages.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">Most Cited Pages</h3>
        <div className="flex items-center justify-center h-48 text-zinc-500">
          No pages cited yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h3 className="text-lg font-semibold text-zinc-900 mb-6">Most Cited Pages</h3>
      
      <div className="space-y-4">
        {pages.slice(0, 8).map((page, index) => (
          <div key={page.page}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-zinc-700 truncate max-w-[200px]" title={page.page}>
                {index + 1}. {page.page}
              </span>
              <span className="text-sm text-zinc-500 ml-2">
                {page.count.toLocaleString()}
              </span>
            </div>
            <div className="h-4 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-zinc-900 transition-all"
                style={{ width: `${(page.count / maxCount) * 100}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {page.sources.slice(0, 3).map((source) => (
                <span
                  key={source}
                  className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600"
                >
                  {source}
                </span>
              ))}
              {page.sources.length > 3 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                  +{page.sources.length - 3} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
