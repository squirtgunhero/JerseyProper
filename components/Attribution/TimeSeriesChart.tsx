'use client';

import { TimeSeriesData } from '@/lib/attribution/types';

interface TimeSeriesChartProps {
  timeSeries: TimeSeriesData[];
}

export default function TimeSeriesChart({ timeSeries }: TimeSeriesChartProps) {
  const maxValue = Math.max(...timeSeries.map((d) => d.total), 1);

  if (timeSeries.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200 p-6">
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">AI Traffic Over Time</h3>
        <div className="flex items-center justify-center h-48 text-zinc-500">
          No data yet.
        </div>
      </div>
    );
  }

  // Calculate chart dimensions
  const chartHeight = 200;
  const barWidth = 100 / timeSeries.length;

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-zinc-900">AI Traffic Over Time</h3>
        <div className="text-sm text-zinc-500">
          Total: {timeSeries.reduce((sum, d) => sum + d.total, 0).toLocaleString()} visits
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="relative" style={{ height: chartHeight + 40 }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-10 w-10 flex flex-col justify-between text-xs text-zinc-500">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue / 2)}</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 h-full pb-10">
          {/* Grid lines */}
          <div className="absolute left-12 right-0 top-0 h-[200px]">
            <div className="absolute w-full h-px bg-zinc-100 top-0"></div>
            <div className="absolute w-full h-px bg-zinc-100 top-1/2"></div>
            <div className="absolute w-full h-px bg-zinc-200 bottom-0"></div>
          </div>

          {/* Bars */}
          <div className="flex items-end h-[200px] gap-1 relative">
            {timeSeries.map((data, index) => (
              <div
                key={data.date}
                className="flex-1 flex flex-col items-center"
                style={{ minWidth: `${barWidth}%` }}
              >
                {/* Bar */}
                <div
                  className="w-full max-w-8 bg-zinc-900 rounded-t transition-all hover:bg-zinc-700 cursor-pointer group relative"
                  style={{
                    height: `${(data.total / maxValue) * 100}%`,
                    minHeight: data.total > 0 ? '4px' : '0',
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-zinc-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {data.total} visits
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex mt-2">
            {timeSeries.map((data, index) => (
              <div
                key={data.date}
                className="flex-1 text-center text-xs text-zinc-500"
                style={{ minWidth: `${barWidth}%` }}
              >
                {index % Math.ceil(timeSeries.length / 7) === 0 && formatDate(data.date)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Source breakdown legend */}
      <div className="mt-6 pt-4 border-t border-zinc-100">
        <div className="flex flex-wrap gap-4 text-xs">
          {Object.entries(
            timeSeries.reduce((acc, day) => {
              Object.entries(day.bySource).forEach(([source, count]) => {
                acc[source] = (acc[source] || 0) + count;
              });
              return acc;
            }, {} as Record<string, number>)
          )
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([source, count]) => (
              <div key={source} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                <span className="text-zinc-600">{source}:</span>
                <span className="font-medium text-zinc-900">{count}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
