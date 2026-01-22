import type { Metadata } from 'next'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'Jersey Proper',
  description: 'Premium digital experiences for businesses that refuse to blend in. Brand identity, web design, and lead generation for visionary brands.',
  keywords: ['creative studio', 'brand identity', 'web design', 'lead generation', 'premium', 'boutique agency'],
  openGraph: {
    title: 'Jersey Proper',
    description: 'Premium digital experiences for businesses that refuse to blend in.',
    siteName: 'Jersey Proper',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jersey Proper',
    description: 'Premium digital experiences for businesses that refuse to blend in.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.history.scrollRestoration = 'manual';
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
