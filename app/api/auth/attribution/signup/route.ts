/**
 * AI Attribution Tracker - Signup API
 * POST /api/auth/attribution/signup
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { 
  generateApiKey, 
  hashPassword, 
  generateSessionToken,
  isValidEmail,
  isValidPassword,
  normalizeUrl,
} from '@/lib/attribution/auth';

interface SignupRequest {
  email: string;
  password: string;
  website_url: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();

    // Validate required fields
    if (!body.email || !body.password || !body.website_url) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: email, password, website_url' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordCheck = isValidPassword(body.password);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        { success: false, error: passwordCheck.message },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const email = body.email.toLowerCase().trim();
    const websiteUrl = normalizeUrl(body.website_url);

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('attribution_users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password and generate API key
    const passwordHash = await hashPassword(body.password);
    const apiKey = generateApiKey();

    // Create user
    const { data: newUser, error: createError } = await supabase
      .from('attribution_users')
      .insert({
        email,
        password_hash: passwordHash,
        website_url: websiteUrl,
        api_key: apiKey,
        plan: 'free',
        alerts_enabled: true,
        daily_summary_enabled: true,
      })
      .select('id, email, website_url, api_key, plan')
      .single();

    if (createError) {
      console.error('[Signup API] Create error:', createError);
      return NextResponse.json(
        { success: false, error: 'Failed to create account' },
        { status: 500 }
      );
    }

    // Generate session token
    const sessionToken = generateSessionToken(newUser.id);

    // Set cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        website_url: newUser.website_url,
        api_key: newUser.api_key,
        plan: newUser.plan,
      },
    });

    response.cookies.set('attribution_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('[Signup API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
