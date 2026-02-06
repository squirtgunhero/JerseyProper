'use client';

import { DashboardStats } from '@/lib/attribution/types';

interface StatsOverviewProps {
  stats: DashboardStats;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const cards = [
    {
      label: 'Total AI Visits',
      value: stats.totalVisits.toLocaleString(),
      trend: stats.visitsTrend,
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Confirmed Citations',
      value: stats.confirmedCitations.toLocaleString(),
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'AI Sources',
      value: stats.uniqueSources.toString(),
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Pages Cited',
      value: stats.uniquePages.toString(),
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-sm transition"
        >
          <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
              </svg>
            </div>
            {card.trend !== undefined && card.trend !== 0 && (
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  card.trend > 0
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {card.trend > 0 ? '+' : ''}{card.trend}%
              </span>
            )}
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-zinc-900">{card.value}</div>
            <div className="text-sm text-zinc-500 mt-1">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
