import type { Metadata } from 'next'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  metadataBase: new URL('https://jersey-proper.vercel.app'),
  title: 'Jersey Proper',
  description: 'Premium digital experiences for businesses that refuse to blend in. Brand identity, web design, and lead generation for visionary brands.',
  keywords: ['creative studio', 'brand identity', 'web design', 'lead generation', 'premium', 'boutique agency'],
  openGraph: {
    title: 'Jersey Proper',
    description: 'Premium digital experiences for businesses that refuse to blend in.',
    url: 'https://jersey-proper.vercel.app',
    siteName: 'Jersey Proper',
    type: 'website',
    images: [
      {
        url: 'https://jersey-proper.vercel.app/og-image.jpg',
        width: 1024,
        height: 535,
        alt: 'Jersey Proper',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jersey Proper',
    description: 'Premium digital experiences for businesses that refuse to blend in.',
    images: ['https://jersey-proper.vercel.app/og-image.jpg'],
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
