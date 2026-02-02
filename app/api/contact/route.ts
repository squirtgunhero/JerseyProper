import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(1, 'Message is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, projectType, message } = parsed.data

    // Send email notification
    if (resend && NOTIFICATION_EMAIL) {
      try {
        await resend.emails.send({
          from: 'Jersey Proper <onboarding@resend.dev>',
          to: NOTIFICATION_EMAIL,
          subject: `New Contact: ${name} - ${projectType}`,
          replyTo: email,
          html: `
            <h2>New Contact Form Submission</h2>
            <p>You received a new inquiry from the Jersey Proper website.</p>
            
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
            
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
            
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
            
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
            
            <p style="color: #666; font-size: 14px;">
              You can reply directly to this email to respond to ${name}.
            </p>
          `,
        })
        console.log(`[Contact] Email sent for inquiry from ${name} (${email})`)
      } catch (emailError) {
        console.error('[Contact] Failed to send email:', emailError)
        // Don't fail the request if email fails
      }
    } else {
      console.log('[Contact] Email not configured, logging submission:', { name, email, projectType })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
