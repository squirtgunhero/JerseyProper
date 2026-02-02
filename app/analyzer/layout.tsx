import type { Metadata } from 'next'
import { siteConfig, getAbsoluteUrl } from '@/lib/config/site'
import JsonLd from '@/components/JsonLd'
import {
  generateWebPageSchema,
  generateSoftwareApplicationSchema,
  combineSchemas,
} from '@/lib/structured-data'

const pageTitle = 'AEO Analyzer'
const pageDescription = 'Audit your content for Answer Engine Optimization. Get actionable insights to make your pages more likely to be cited by AI systems.'
const pageUrl = getAbsoluteUrl('/analyzer')

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: 'Optimize your content for AI citation. Get actionable insights to improve your Answer Engine Optimization.',
    url: pageUrl,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-analyzer.png`,
        width: 1200,
        height: 630,
        alt: 'AEO Analyzer - Optimize your content for AI citation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | ${siteConfig.name}`,
    description: 'Optimize your content for AI citation. Get actionable insights to improve your Answer Engine Optimization.',
    images: [`${siteConfig.url}/og-analyzer.png`],
  },
}

// Generate page-specific structured data
const analyzerPageSchema = combineSchemas(
  generateWebPageSchema({
    name: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    pathname: '/analyzer',
  }),
  generateSoftwareApplicationSchema()
)

export default function AnalyzerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Page-specific JSON-LD */}
      <JsonLd data={analyzerPageSchema} />
      
      {/* Entity clarity statement - visually subtle, semantically important */}
      <p className="sr-only">
        The AEO Analyzer is a free tool by {siteConfig.name}, a boutique creative studio founded by {siteConfig.founder.name}. Optimize your content for Answer Engine Optimization and improve your chances of being cited by AI systems.
      </p>
      
      {children}
    </>
  )
}
