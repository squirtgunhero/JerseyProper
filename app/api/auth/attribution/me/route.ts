/**
 * AI Attribution Tracker - Get Current User API
 * GET /api/auth/attribution/me
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { verifySessionToken } from '@/lib/attribution/auth';

export async function GET(request: NextRequest) {
  try {
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

    const { data: user, error: userError } = await supabase
      .from('attribution_users')
      .select('id, email, website_url, api_key, plan, alerts_enabled, daily_summary_enabled, created_at')
      .eq('id', session.userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error('[Me API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/auth/attribution/me - Update user settings
 */
export async function PATCH(request: NextRequest) {
  try {
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

    const body = await request.json();
    const supabase = getSupabaseAdmin();

    // Only allow updating certain fields
    const allowedFields = ['alerts_enabled', 'daily_summary_enabled', 'website_url'];
    const updates: Record<string, unknown> = {};
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    updates['updated_at'] = new Date().toISOString();

    const { data: user, error: updateError } = await supabase
      .from('attribution_users')
      .update(updates)
      .eq('id', session.userId)
      .select('id, email, website_url, api_key, plan, alerts_enabled, daily_summary_enabled')
      .single();

    if (updateError) {
      console.error('[Me API] Update error:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to update settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error('[Me API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
