/**
 * AI Attribution Tracker - Dashboard Stats API
 * GET /api/attribution/stats - Get dashboard analytics data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { verifySessionToken } from '@/lib/attribution/auth';
import {
  DashboardStats,
  SourceBreakdown,
  PageStats,
  TimeSeriesData,
  ConversionStats,
} from '@/lib/attribution/types';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const sessionToken = request.cookies.get('attribution_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const session = verifySessionToken(sessionToken);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session expired' },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7', 10);
    const type = searchParams.get('type') || 'all';

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Previous period for comparison
    const prevEndDate = new Date(startDate);
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(prevStartDate.getDate() - days);

    // Fetch all visits in the current period
    const { data: visits, error: visitsError } = await supabase
      .from('ai_visits')
      .select('id, source, confidence, page, timestamp')
      .eq('user_id', session.userId)
      .gte('timestamp', startDate.toISOString())
      .lte('timestamp', endDate.toISOString())
      .order('timestamp', { ascending: false });

    if (visitsError) {
      console.error('[Stats API] Visits error:', visitsError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch visits' },
        { status: 500 }
      );
    }

    // Fetch previous period for trend calculation
    const { data: prevVisits } = await supabase
      .from('ai_visits')
      .select('id')
      .eq('user_id', session.userId)
      .gte('timestamp', prevStartDate.toISOString())
      .lt('timestamp', prevEndDate.toISOString());

    const prevCount = prevVisits?.length || 0;
    const currentCount = visits?.length || 0;

    // Calculate stats
    const stats: DashboardStats = {
      totalVisits: currentCount,
      confirmedCitations: visits?.filter((v) => v.confidence === 'confirmed').length || 0,
      uniqueSources: new Set(visits?.map((v) => v.source) || []).size,
      uniquePages: new Set(visits?.map((v) => v.page) || []).size,
      visitsTrend: prevCount > 0 ? Math.round(((currentCount - prevCount) / prevCount) * 100) : 0,
    };

    // Calculate source breakdown
    const sourceMap = new Map<string, { total: number; confirmed: number; probable: number; possible: number }>();
    for (const visit of visits || []) {
      const current = sourceMap.get(visit.source) || { total: 0, confirmed: 0, probable: 0, possible: 0 };
      current.total++;
      current[visit.confidence as 'confirmed' | 'probable' | 'possible']++;
      sourceMap.set(visit.source, current);
    }

    const sources: SourceBreakdown[] = Array.from(sourceMap.entries())
      .map(([source, data]) => ({
        source,
        count: data.total,
        percentage: Math.round((data.total / (currentCount || 1)) * 100),
        confirmed: data.confirmed,
        probable: data.probable,
        possible: data.possible,
      }))
      .sort((a, b) => b.count - a.count);

    // Calculate top pages
    const pageMap = new Map<string, { count: number; sources: Set<string> }>();
    for (const visit of visits || []) {
      const current = pageMap.get(visit.page) || { count: 0, sources: new Set() };
      current.count++;
      current.sources.add(visit.source);
      pageMap.set(visit.page, current);
    }

    const pages: PageStats[] = Array.from(pageMap.entries())
      .map(([page, data]) => ({
        page,
        count: data.count,
        sources: Array.from(data.sources),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate time series data
    const timeMap = new Map<string, { total: number; bySource: Record<string, number> }>();
    
    // Initialize all days in the range
    for (let i = 0; i <= days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      timeMap.set(dateStr, { total: 0, bySource: {} });
    }

    // Fill in actual data
    for (const visit of visits || []) {
      const dateStr = visit.timestamp.split('T')[0];
      const current = timeMap.get(dateStr) || { total: 0, bySource: {} };
      current.total++;
      current.bySource[visit.source] = (current.bySource[visit.source] || 0) + 1;
      timeMap.set(dateStr, current);
    }

    const timeSeries: TimeSeriesData[] = Array.from(timeMap.entries())
      .map(([date, data]) => ({
        date,
        total: data.total,
        bySource: data.bySource,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Get recent visits for the table
    const recentVisits = (visits || []).slice(0, 50).map((v) => ({
      id: v.id,
      source: v.source,
      confidence: v.confidence,
      page: v.page,
      timestamp: v.timestamp,
    }));

    // Fetch conversion stats (if available)
    let conversionStats: ConversionStats | null = null;

    const { data: conversions } = await supabase
      .from('conversions')
      .select('id, ai_source, value')
      .eq('user_id', session.userId)
      .gte('timestamp', startDate.toISOString())
      .lte('timestamp', endDate.toISOString());

    if (conversions && conversions.length > 0) {
      const conversionsBySource = new Map<string, { count: number; value: number }>();
      
      for (const conv of conversions) {
        const source = conv.ai_source || 'Direct';
        const current = conversionsBySource.get(source) || { count: 0, value: 0 };
        current.count++;
        current.value += Number(conv.value) || 0;
        conversionsBySource.set(source, current);
      }

      conversionStats = {
        total: conversions.length,
        totalValue: conversions.reduce((sum, c) => sum + (Number(c.value) || 0), 0),
        bySource: Array.from(conversionsBySource.entries())
          .map(([source, data]) => {
            const sourceVisits = sources.find((s) => s.source === source)?.count || 1;
            return {
              source,
              conversions: data.count,
              value: data.value,
              conversionRate: Math.round((data.count / sourceVisits) * 100 * 10) / 10,
            };
          })
          .sort((a, b) => b.conversions - a.conversions),
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        stats,
        sources,
        pages,
        timeSeries,
        recentVisits,
        conversionStats,
        period: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          days,
        },
      },
    });

  } catch (error) {
    console.error('[Stats API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
