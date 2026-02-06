/**
 * AI Attribution Tracker - Email Service
 */

import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.FROM_EMAIL || 'AI Attribution <onboarding@resend.dev>';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface CitationAlertData {
  userEmail: string;
  aiSource: string;
  page: string;
  count: number;
  websiteUrl: string;
}

interface DailySummaryData {
  userEmail: string;
  websiteUrl: string;
  totalVisits: number;
  confirmedCitations: number;
  breakdown: Record<string, number>;
  topPages: Array<{ page: string; count: number }>;
  date: string;
}

/**
 * Send a citation alert email
 */
export async function sendCitationAlert(data: CitationAlertData): Promise<boolean> {
  if (!resend) {
    console.log('[Email] Skipping citation alert - RESEND_API_KEY not configured');
    return false;
  }

  const { userEmail, aiSource, page, count, websiteUrl } = data;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #000 0%, #333 100%); padding: 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
          🎯 AI Citation Alert
        </h1>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 32px;">
        
        <!-- Alert Box -->
        <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-left: 4px solid #10b981; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h2 style="margin: 0 0 8px 0; color: #065f46; font-size: 20px;">
            ${aiSource} cited your page ${count} times!
          </h2>
          <p style="margin: 0; color: #047857; font-size: 14px;">
            In the last 60 minutes
          </p>
        </div>
        
        <!-- Details -->
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Page:</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">
                <a href="${websiteUrl}${page}" style="color: #2563eb; text-decoration: none;">${page}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">AI System:</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${aiSource}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Citation Count:</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${count}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Website:</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">
                <a href="${websiteUrl}" style="color: #2563eb; text-decoration: none;">${websiteUrl}</a>
              </td>
            </tr>
          </table>
        </div>
        
        <!-- What This Means -->
        <div style="margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px 0; color: #111827; font-size: 16px;">What this means:</h3>
          <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
            <li>${aiSource} is actively recommending your content to users</li>
            <li>Your AEO (AI Engine Optimization) is working</li>
            <li>You're capturing "dark traffic" that Google Analytics misses</li>
          </ul>
        </div>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin-bottom: 16px;">
          <a href="${BASE_URL}/attribution/dashboard" style="display: inline-block; background: #000; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px;">
            View Full Analytics →
          </a>
        </div>
        
      </div>
      
      <!-- Footer -->
      <div style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
          You're receiving this because you have citation alerts enabled.
        </p>
        <a href="${BASE_URL}/attribution/dashboard/settings" style="color: #6b7280; font-size: 12px;">
          Manage alert preferences
        </a>
      </div>
      
    </div>
  </div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `🚨 ${aiSource} cited your page ${count} times in the last hour!`,
      html,
    });
    console.log(`[Email] Citation alert sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send citation alert:', error);
    return false;
  }
}

/**
 * Send a daily summary email
 */
export async function sendDailySummary(data: DailySummaryData): Promise<boolean> {
  if (!resend) {
    console.log('[Email] Skipping daily summary - RESEND_API_KEY not configured');
    return false;
  }

  const { userEmail, websiteUrl, totalVisits, confirmedCitations, breakdown, topPages, date } = data;

  // Build source breakdown rows
  const sourceRows = Object.entries(breakdown)
    .sort(([, a], [, b]) => b - a)
    .map(([source, count]) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;">${source}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px; text-align: right; font-weight: 500;">${count}</td>
      </tr>
    `)
    .join('');

  // Build top pages rows
  const pagesRows = topPages
    .slice(0, 5)
    .map(({ page, count }) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;">
          <a href="${websiteUrl}${page}" style="color: #2563eb; text-decoration: none;">${page}</a>
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px; text-align: right; font-weight: 500;">${count}</td>
      </tr>
    `)
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #000 0%, #333 100%); padding: 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
          📊 Your Daily AI Traffic Summary
        </h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">
          ${date}
        </p>
      </div>
      
      <!-- Stats Overview -->
      <div style="padding: 32px;">
        <div style="display: flex; gap: 16px; margin-bottom: 32px;">
          <div style="flex: 1; background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center;">
            <div style="font-size: 32px; font-weight: 700; color: #111827;">${totalVisits}</div>
            <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Total AI Visits</div>
          </div>
          <div style="flex: 1; background: #ecfdf5; padding: 20px; border-radius: 8px; text-align: center;">
            <div style="font-size: 32px; font-weight: 700; color: #065f46;">${confirmedCitations}</div>
            <div style="font-size: 12px; color: #047857; text-transform: uppercase; letter-spacing: 0.5px;">Confirmed</div>
          </div>
        </div>
        
        <!-- By AI System -->
        <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 16px;">Traffic by AI System</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; background: #f9fafb; border-radius: 8px; overflow: hidden;">
          <thead>
            <tr style="background: #e5e7eb;">
              <th style="padding: 12px 16px; text-align: left; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Source</th>
              <th style="padding: 12px 16px; text-align: right; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Visits</th>
            </tr>
          </thead>
          <tbody>
            ${sourceRows || '<tr><td colspan="2" style="padding: 20px; text-align: center; color: #6b7280;">No visits recorded</td></tr>'}
          </tbody>
        </table>
        
        <!-- Top Pages -->
        <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 16px;">Most Cited Pages</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; background: #f9fafb; border-radius: 8px; overflow: hidden;">
          <thead>
            <tr style="background: #e5e7eb;">
              <th style="padding: 12px 16px; text-align: left; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Page</th>
              <th style="padding: 12px 16px; text-align: right; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Visits</th>
            </tr>
          </thead>
          <tbody>
            ${pagesRows || '<tr><td colspan="2" style="padding: 20px; text-align: center; color: #6b7280;">No pages recorded</td></tr>'}
          </tbody>
        </table>
        
        <!-- CTA Button -->
        <div style="text-align: center;">
          <a href="${BASE_URL}/attribution/dashboard" style="display: inline-block; background: #000; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px;">
            View Full Dashboard →
          </a>
        </div>
        
      </div>
      
      <!-- Footer -->
      <div style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
          You're receiving this daily summary because you have it enabled.
        </p>
        <a href="${BASE_URL}/attribution/dashboard/settings" style="color: #6b7280; font-size: 12px;">
          Manage email preferences
        </a>
      </div>
      
    </div>
  </div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `📊 Your daily AI citation summary: ${totalVisits} visits`,
      html,
    });
    console.log(`[Email] Daily summary sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send daily summary:', error);
    return false;
  }
}
