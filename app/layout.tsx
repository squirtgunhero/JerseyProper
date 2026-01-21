import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Note: Google Fonts (Bodoni Moda and Inter) will be loaded via CSS in globals.css
// This provides better fallback handling during build time

export const metadata: Metadata = {
  title: 'Jersey Proper - Premium Digital Studio',
  description: 'Premium website design, development, and lead generation systems for businesses that refuse to blend in.',
  keywords: ['web design', 'brand design', 'lead generation', 'custom development', 'boutique studio'],
  authors: [{ name: 'Jersey Proper' }],
  openGraph: {
    title: 'Jersey Proper - Premium Digital Studio',
    description: 'Premium website design, development, and lead generation systems for businesses that refuse to blend in.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-inter">
        <div className="min-h-screen bg-texture vignette">
          <Navigation />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
