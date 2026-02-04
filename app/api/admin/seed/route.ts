import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase/server';

/**
 * Seed route to insert sample competitors into the database
 * POST /api/admin/seed
 */
export async function POST() {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Sample competitors to seed
    const competitors = [
      {
        name: 'Competitor Realty Group',
        website: 'https://competitor-realty.com',
        notes: 'Main competitor in the local market. Strong social media presence.',
      },
      {
        name: 'Local Home Experts',
        website: 'https://local-home-experts.com',
        notes: 'Established brand with 25+ years in the area. Focus on luxury segment.',
      },
      {
        name: 'Quick Sell Homes',
        website: 'https://quick-sell-homes.com',
        notes: 'iBuyer model. Aggressive paid ads. Lower review ratings.',
      },
      {
        name: 'Premium Properties Inc',
        website: 'https://premium-properties.com',
        notes: 'High-end luxury focus. Limited digital presence.',
      },
      {
        name: 'First Choice Realtors',
        website: 'https://first-choice-realtors.com',
        notes: 'Strong first-time buyer marketing. Good SEO presence.',
      },
    ];

    // Insert competitors (upsert based on name to avoid duplicates)
    const { data, error } = await supabase
      .from('competitors')
      .upsert(
        competitors.map(c => ({
          ...c,
        })),
        { onConflict: 'name', ignoreDuplicates: true }
      )
      .select();

    if (error) {
      console.error('[Seed] Error inserting competitors:', error);
      return NextResponse.json(
        { error: 'Failed to seed competitors', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${data?.length || 0} competitors`,
      competitors: data,
    });
  } catch (error) {
    console.error('[Seed] Error:', error);
    return NextResponse.json(
      { error: 'Seed failed' },
      { status: 500 }
    );
  }
}
