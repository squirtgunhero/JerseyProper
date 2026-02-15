import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { siteConfig } from '@/lib/config/site'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || siteConfig.email

const NewsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = NewsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email } = parsed.data

    // Notify site owner of new subscriber
    if (resend && NOTIFICATION_EMAIL) {
      try {
        await resend.emails.send({
          from: 'Jersey Proper <onboarding@resend.dev>',
          to: NOTIFICATION_EMAIL,
          subject: `New Newsletter Subscriber: ${email}`,
          html: `
            <h2>New Newsletter Subscriber</h2>
            <p>Someone just subscribed to the Jersey Proper newsletter.</p>

            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />

            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>

            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />

            <p style="color: #666; font-size: 14px;">
              Add this subscriber to your newsletter list.
            </p>
          `,
        })
        console.log(`[Newsletter] Notification sent for subscriber: ${email}`)
      } catch (emailError) {
        console.error('[Newsletter] Failed to send notification:', emailError)
      }
    } else {
      console.log('[Newsletter] Email not configured, logging subscription:', { email })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
