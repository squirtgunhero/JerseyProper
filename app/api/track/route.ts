/**
 * AI Attribution Tracker - Main Tracking API
 * POST /api/track - Records AI-driven visits
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { TrackRequest, TrackResponse, ALERT_THRESHOLDS } from '@/lib/attribution/types';

// CORS headers for cross-origin tracking
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body: TrackRequest = await request.json();

    // Validate required fields
    if (!body.api_key) {
      return NextResponse.json(
        { success: false, error: 'Missing api_key' } as TrackResponse,
        { status: 400, headers: corsHeaders }
      );
    }

    if (!body.source || !body.confidence || !body.page) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: source, confidence, page' } as TrackResponse,
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate confidence level
    if (!['confirmed', 'probable', 'possible'].includes(body.confidence)) {
      return NextResponse.json(
        { success: false, error: 'Invalid confidence level' } as TrackResponse,
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = getSupabaseAdmin();

    // Validate API key and get user
    const { data: user, error: userError } = await supabase
      .from('attribution_users')
      .select('id, alerts_enabled, plan')
      .eq('api_key', body.api_key)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid API key' } as TrackResponse,
        { status: 401, headers: corsHeaders }
      );
    }

    // Extract IP address from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip_address = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

    // Insert visit record
    const { data: visit, error: visitError } = await supabase
      .from('ai_visits')
      .insert({
        user_id: user.id,
        source: body.source,
        confidence: body.confidence,
        page: body.page,
        full_url: body.full_url || null,
        referrer: body.referrer || null,
        user_agent: body.user_agent || null,
        ip_address: ip_address,
        session_id: body.session_id || null,
        citation_context: body.citation_context || null,
        detection_method: body.detection_method || null,
        timestamp: body.timestamp || new Date().toISOString(),
      })
      .select('id')
      .single();

    if (visitError) {
      console.error('[Track API] Insert error:', visitError);
      return NextResponse.json(
        { success: false, error: 'Failed to record visit' } as TrackResponse,
        { status: 500, headers: corsHeaders }
      );
    }

    // Check if we need to send citation alerts
    // The database trigger handles creating alert records,
    // but we need to check for unsent alerts and trigger emails
    if (user.alerts_enabled && body.confidence === 'confirmed') {
      // Fire and forget - don't block the response
      triggerAlertCheck(user.id, body.source, body.page).catch(err => {
        console.error('[Track API] Alert check error:', err);
      });
    }

    return NextResponse.json(
      { success: true, visit_id: visit.id } as TrackResponse,
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('[Track API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' } as TrackResponse,
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * Check for pending citation alerts and trigger email sending
 */
async function triggerAlertCheck(userId: string, source: string, page: string) {
  const supabase = getSupabaseAdmin();

  // Check for unsent alerts for this user/source/page
  const { data: alerts } = await supabase
    .from('citation_alerts')
    .select('*')
    .eq('user_id', userId)
    .eq('ai_source', source)
    .eq('page', page)
    .eq('alert_sent', false)
    .order('count', { ascending: false })
    .limit(1);

  if (alerts && alerts.length > 0) {
    const alert = alerts[0];
    
    // Call the citations API to send the alert
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    try {
      await fetch(`${baseUrl}/api/citations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alert_id: alert.id,
          user_id: userId,
          source: source,
          page: page,
          count: alert.count,
        }),
      });
    } catch (err) {
      console.error('[Track API] Failed to trigger citation alert:', err);
    }
  }
}
