'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    _linkedin_partner_id?: string
    _linkedin_data_partner_ids?: string[]
    lintrk?: ((a: string, b: Record<string, unknown>) => void) & { q?: unknown[][] }
  }
}

export default function LinkedInInsight() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window._linkedin_data_partner_ids?.includes('8689282')) return

    const partnerId = '8689282'
    window._linkedin_partner_id = partnerId
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
    window._linkedin_data_partner_ids.push(partnerId)

    if (!window.lintrk) {
      window.lintrk = function (a: string, b: Record<string, unknown>) {
        window.lintrk!.q!.push([a, b])
      }
      window.lintrk.q = []
    }

    const s = document.getElementsByTagName('script')[0]
    const b = document.createElement('script')
    b.type = 'text/javascript'
    b.async = true
    b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
    s.parentNode?.insertBefore(b, s)
  }, [])

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        alt=""
        src="https://px.ads.linkedin.com/collect/?pid=8689282&fmt=gif"
      />
    </noscript>
  )
}
