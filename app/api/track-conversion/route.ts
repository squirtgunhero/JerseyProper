/**
 * AI Attribution Tracker - Conversion Tracking API
 * POST /api/track-conversion - Records conversions and attributes them to AI visits
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { ConversionRequest, ConversionResponse, PLAN_LIMITS } from '@/lib/attribution/types';

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
    const body: ConversionRequest = await request.json();

    // Validate required fields
    if (!body.api_key) {
      return NextResponse.json(
        { success: false, error: 'Missing api_key' } as ConversionResponse,
        { status: 400, headers: corsHeaders }
      );
    }

    if (!body.session_id || !body.event_type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: session_id, event_type' } as ConversionResponse,
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = getSupabaseAdmin();

    // Validate API key and get user
    const { data: user, error: userError } = await supabase
      .from('attribution_users')
      .select('id, plan')
      .eq('api_key', body.api_key)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid API key' } as ConversionResponse,
        { status: 401, headers: corsHeaders }
      );
    }

    // Check if conversion tracking is enabled for this plan
    const planLimits = PLAN_LIMITS[user.plan as keyof typeof PLAN_LIMITS];
    if (!planLimits.conversions) {
      return NextResponse.json(
        { success: false, error: 'Conversion tracking requires Pro or Enterprise plan' } as ConversionResponse,
        { status: 403, headers: corsHeaders }
      );
    }

    // Find the most recent AI visit for this session
    const { data: visits } = await supabase
      .from('ai_visits')
      .select('id, source')
      .eq('user_id', user.id)
      .eq('session_id', body.session_id)
      .order('timestamp', { ascending: false })
      .limit(1);

    const attributedVisit = visits && visits.length > 0 ? visits[0] : null;

    // Insert conversion record
    const { data: conversion, error: conversionError } = await supabase
      .from('conversions')
      .insert({
        user_id: user.id,
        visit_id: attributedVisit?.id || null,
        ai_source: attributedVisit?.source || null,
        session_id: body.session_id,
        value: body.value || 0,
        event_type: body.event_type,
        metadata: body.metadata || {},
        timestamp: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (conversionError) {
      console.error('[Conversion API] Insert error:', conversionError);
      return NextResponse.json(
        { success: false, error: 'Failed to record conversion' } as ConversionResponse,
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        conversion_id: conversion.id,
        attributed_source: attributedVisit?.source || null,
      } as ConversionResponse,
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('[Conversion API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' } as ConversionResponse,
      { status: 500, headers: corsHeaders }
    );
  }
}
