import type { Metadata } from 'next'
import { Outfit, Bodoni_Moda, DM_Sans, Instrument_Serif, Cormorant_Garamond } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import JsonLd from '@/components/JsonLd'
import CookieConsent from '@/components/CookieConsent'
import SatelliteDownlinkPopup from '@/components/SatelliteDownlinkPopup'
import { siteConfig } from '@/lib/config/site'
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateFounderSchema,
  combineSchemas,
} from '@/lib/structured-data'

/**
 * PERFORMANCE OPTIMIZATIONS:
 * 1. next/font for optimal font loading (no render-blocking)
 * 2. next/script for deferred analytics loading
 * 3. Preload hints for LCP image
 * 4. font-display: swap for faster text rendering
 */

// Load fonts with next/font for optimal performance
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
})

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
  preload: true,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: false,
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
  preload: false,
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.founder.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1024,
        height: 535,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: [`${siteConfig.url}/og-image.jpg`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Generate site-wide structured data
const siteStructuredData = combineSchemas(
  generateOrganizationSchema(),
  generateWebSiteSchema(),
  generateFounderSchema()
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${bodoniModa.variable} ${dmSans.variable} ${instrumentSerif.variable} ${cormorantGaramond.variable}`}>
      <head>
        {/* Site-wide JSON-LD structured data */}
        <JsonLd data={siteStructuredData} />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <ScrollToTop />
        {children}
        <CookieConsent />
        <SatelliteDownlinkPopup />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3MB1YMCJDR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3MB1YMCJDR');
          `}
        </Script>

        {/* AI Attribution Tracker - Track AI-driven traffic */}
        <Script
          src="/track.js"
          data-api-key="9b2affb95134aa450380bb621986368b7f39f45e01fca7bddb87ee339fc6a46c"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
