import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, value, category } = body

    // type: 'search' | 'brand_click'
    // value: the search query or brand name
    // category: optional, the industry category for brand clicks

    if (!value) {
      return NextResponse.json({ error: 'Missing value' }, { status: 400 })
    }

    const actionLabel = type === 'search' ? 'Search' : 'Brand Click'
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      dateStyle: 'medium',
      timeStyle: 'short'
    })

    // Send email notification
    if (resend && NOTIFICATION_EMAIL) {
      try {
        await resend.emails.send({
          from: 'Competitor Intel <onboarding@resend.dev>',
          to: NOTIFICATION_EMAIL,
          subject: `Intel ${actionLabel}: ${value}`,
          html: `
            <h2>Competitor Intel Activity</h2>
            <p>Someone used the Competitor Intel tool on your site.</p>
            
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
            
            <p><strong>Action:</strong> ${actionLabel}</p>
            <p><strong>${type === 'search' ? 'Search Query' : 'Brand'}:</strong> ${value}</p>
            ${category ? `<p><strong>Category:</strong> ${category}</p>` : ''}
            <p><strong>Time:</strong> ${timestamp} ET</p>
            
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
            
            <p style="color: #666; font-size: 14px;">
              <a href="https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=${encodeURIComponent(value)}&search_type=keyword_unordered">
                View in Meta Ad Library →
              </a>
            </p>
          `,
        })
        console.log(`[Intel] Email sent for ${type}: ${value}`)
      } catch (emailError) {
        console.error('[Intel] Failed to send email:', emailError)
      }
    } else {
      console.log(`[Intel] ${actionLabel}: ${value}`, category ? `(${category})` : '')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Intel] Track error:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
