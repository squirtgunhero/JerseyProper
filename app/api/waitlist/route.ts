import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL

const WaitlistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = WaitlistSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email } = parsed.data

    if (resend && NOTIFICATION_EMAIL) {
      try {
        await resend.emails.send({
          from: 'Colony Waitlist <onboarding@resend.dev>',
          to: NOTIFICATION_EMAIL,
          subject: `Colony Waitlist: ${name}`,
          replyTo: email,
          html: `
            <div style="font-family: -apple-system, sans-serif; max-width: 520px;">
              <h2 style="margin-bottom: 4px;">New Colony Waitlist Signup</h2>
              <p style="color: #666; margin-top: 0;">Someone just joined the Colony waitlist from jerseyproper.com/colony</p>
              
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
              
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
              
              <p style="color: #666; font-size: 14px;">
                Reply directly to this email to reach ${name}.
              </p>
            </div>
          `,
        })
        console.log(`[Waitlist] Email sent for ${name} (${email})`)
      } catch (emailError) {
        console.error('[Waitlist] Failed to send email:', emailError)
      }
    } else {
      console.log('[Waitlist] Email not configured, logging:', { name, email })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Waitlist] Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit' },
      { status: 500 }
    )
  }
}
