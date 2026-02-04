/**
 * Seed script for Signal Intelligence competitors
 * Run with: npx tsx scripts/seed-competitors.ts
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
// Fallback to .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

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

async function seed() {
  console.log('Seeding competitors...');

  const { data, error } = await supabase
    .from('competitors')
    .upsert(competitors, { onConflict: 'name', ignoreDuplicates: true })
    .select();

  if (error) {
    console.error('Error seeding competitors:', error);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data?.length || 0} competitors:`);
  data?.forEach(c => console.log(`  - ${c.name}`));
}

seed();
