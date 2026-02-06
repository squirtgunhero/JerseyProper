/**
 * AI Attribution Tracker - Citation Alerts API
 * POST /api/citations - Send instant citation alert
 * GET /api/citations - Send daily summaries (called by cron)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { sendCitationAlert, sendDailySummary } from '@/lib/attribution/email';

/**
 * POST - Send a citation alert email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { alert_id, user_id, source, page, count } = body;

    if (!user_id || !source || !page || !count) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('attribution_users')
      .select('email, website_url, alerts_enabled')
      .eq('id', user_id)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.alerts_enabled) {
      return NextResponse.json(
        { success: true, message: 'Alerts disabled for this user' }
      );
    }

    // Send the alert email
    const sent = await sendCitationAlert({
      userEmail: user.email,
      aiSource: source,
      page,
      count,
      websiteUrl: user.website_url,
    });

    // Mark alert as sent
    if (sent && alert_id) {
      await supabase
        .from('citation_alerts')
        .update({
          alert_sent: true,
          alert_sent_at: new Date().toISOString(),
        })
        .eq('id', alert_id);
    }

    return NextResponse.json({
      success: true,
      sent,
    });

  } catch (error) {
    console.error('[Citations API] POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET - Send daily summaries (called by Vercel Cron)
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (optional security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET?.trim();

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Get all users with daily summaries enabled
    const { data: users, error: usersError } = await supabase
      .from('attribution_users')
      .select('id, email, website_url')
      .eq('daily_summary_enabled', true);

    if (usersError) {
      console.error('[Citations API] Failed to fetch users:', usersError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const results = {
      total: users?.length || 0,
      sent: 0,
      skipped: 0,
      failed: 0,
    };

    // Process each user
    for (const user of users || []) {
      try {
        // Get visits from the last 24 hours
        const { data: visits } = await supabase
          .from('ai_visits')
          .select('source, page, confidence')
          .eq('user_id', user.id)
          .gte('timestamp', yesterday.toISOString())
          .lt('timestamp', today.toISOString());

        if (!visits || visits.length === 0) {
          results.skipped++;
          continue;
        }

        // Calculate breakdown by source
        const breakdown: Record<string, number> = {};
        const pageCount: Record<string, number> = {};
        let confirmedCount = 0;

        for (const visit of visits) {
          breakdown[visit.source] = (breakdown[visit.source] || 0) + 1;
          pageCount[visit.page] = (pageCount[visit.page] || 0) + 1;
          if (visit.confidence === 'confirmed') {
            confirmedCount++;
          }
        }

        // Get top pages
        const topPages = Object.entries(pageCount)
          .map(([page, count]) => ({ page, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        // Check if we already sent a summary for this date
        const summaryDate = yesterday.toISOString().split('T')[0];
        
        const { data: existingSummary } = await supabase
          .from('daily_summaries')
          .select('id, sent_at')
          .eq('user_id', user.id)
          .eq('summary_date', summaryDate)
          .single();

        if (existingSummary?.sent_at) {
          results.skipped++;
          continue;
        }

        // Send the summary email
        const sent = await sendDailySummary({
          userEmail: user.email,
          websiteUrl: user.website_url,
          totalVisits: visits.length,
          confirmedCitations: confirmedCount,
          breakdown,
          topPages,
          date: new Date(yesterday).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        });

        // Record the summary
        await supabase
          .from('daily_summaries')
          .upsert({
            user_id: user.id,
            summary_date: summaryDate,
            total_visits: visits.length,
            confirmed_citations: confirmedCount,
            breakdown,
            top_pages: topPages,
            sent_at: sent ? new Date().toISOString() : null,
          });

        if (sent) {
          results.sent++;
        } else {
          results.failed++;
        }

      } catch (userError) {
        console.error(`[Citations API] Error processing user ${user.id}:`, userError);
        results.failed++;
      }
    }

    return NextResponse.json({
      success: true,
      results,
    });

  } catch (error) {
    console.error('[Citations API] GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
