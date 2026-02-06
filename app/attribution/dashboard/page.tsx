'use client';

import { useEffect, useState } from 'react';
import StatsOverview from '@/components/Attribution/StatsOverview';
import SourceChart from '@/components/Attribution/SourceChart';
import TopPagesChart from '@/components/Attribution/TopPagesChart';
import TimeSeriesChart from '@/components/Attribution/TimeSeriesChart';
import RecentCitations from '@/components/Attribution/RecentCitations';
import EmbedCode from '@/components/Attribution/EmbedCode';
import {
  DashboardStats,
  SourceBreakdown,
  PageStats,
  TimeSeriesData,
} from '@/lib/attribution/types';

interface DashboardData {
  stats: DashboardStats;
  sources: SourceBreakdown[];
  pages: PageStats[];
  timeSeries: TimeSeriesData[];
  recentVisits: Array<{
    id: number;
    source: string;
    confidence: string;
    page: string;
    timestamp: string;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user for API key
        const userRes = await fetch('/api/auth/attribution/me');
        const userData = await userRes.json();
        if (userData.user?.api_key) {
          setApiKey(userData.user.api_key);
        }

        // Fetch stats
        const statsRes = await fetch(`/api/attribution/stats?days=${days}`);
        const statsData = await statsRes.json();

        if (!statsRes.ok) {
          setError(statsData.error || 'Failed to load dashboard');
          return;
        }

        setData(statsData.data);
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [days]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
          <p className="text-zinc-600">Track your AI-driven traffic and citations</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">Period:</span>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview stats={data.stats} />

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SourceChart sources={data.sources} />
        <TopPagesChart pages={data.pages} />
      </div>

      {/* Time Series Chart */}
      <TimeSeriesChart timeSeries={data.timeSeries} />

      {/* Recent Citations Table */}
      <RecentCitations visits={data.recentVisits} />

      {/* Embed Code Widget */}
      <EmbedCode apiKey={apiKey} />
    </div>
  );
}
