import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL

/**
 * Send an email notification when an audit is run
 */
export async function notifyAuditRun(domain: string, fullUrl: string) {
  if (!resend || !NOTIFICATION_EMAIL) {
    console.log('[Email] Skipping notification - RESEND_API_KEY or NOTIFICATION_EMAIL not configured')
    return
  }

  try {
    await resend.emails.send({
      from: 'AEO Analyzer <onboarding@resend.dev>',
      to: NOTIFICATION_EMAIL,
      subject: `AEO Audit: ${domain}`,
      html: `
        <h2>New AEO Audit</h2>
        <p>A new audit was run on the analyzer.</p>
        <p><strong>Domain:</strong> ${domain}</p>
        <p><strong>Full URL:</strong> <a href="${fullUrl}">${fullUrl}</a></p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    })
    console.log(`[Email] Notification sent for domain: ${domain}`)
  } catch (error) {
    // Don't let email failures break the audit
    console.error('[Email] Failed to send notification:', error)
  }
}
