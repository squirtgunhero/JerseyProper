import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Process from '@/components/Process'
import WhyUs from '@/components/WhyUs'
import Story from '@/components/Story'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import Sources from '@/components/Sources'
import { siteConfig, getAbsoluteUrl } from '@/lib/config/site'
import {
  generateWebPageSchema,
  generateAllServicesSchema,
  generateFAQSchema,
  homepageFAQs,
  combineSchemas,
} from '@/lib/structured-data'

// Page last updated date
const LAST_UPDATED = '2026-02-03'

// Sources/references for credibility
const pageSources = [
  {
    title: 'Google Search Central - SEO Best Practices',
    url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
  },
  {
    title: 'Nielsen Norman Group - UX Research',
    url: 'https://www.nngroup.com/articles/',
  },
  {
    title: 'Web Content Accessibility Guidelines (WCAG)',
    url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
  },
]

export const metadata: Metadata = {
  title: 'Jersey Proper - Boutique Creative Studio',
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
}

// Generate page-specific structured data
const homePageSchema = combineSchemas(
  generateWebPageSchema({
    name: 'Jersey Proper - Boutique Creative Studio',
    description: siteConfig.description,
    pathname: '/',
  }),
  generateAllServicesSchema(),
  generateFAQSchema(homepageFAQs)
)

export default function Home() {
  return (
    <main className="relative">
      {/* Page-specific JSON-LD */}
      <JsonLd data={homePageSchema} />
      
      {/* Entity clarity statement - visually subtle, semantically important */}
      <p className="sr-only">
        {siteConfig.description} Founded by {siteConfig.founder.name}, we serve clients in {siteConfig.address.addressRegion} and across the United States.
      </p>
      
      <Navigation />
      <Hero />
      <Features />
      <Process />
      <WhyUs />
      <Story />
      <FAQ />
      
      {/* Sources & References Section */}
      <section className="py-12 bg-jp-black">
        <div className="max-w-4xl mx-auto px-6">
          {/* Last Updated */}
          <p className="text-cream/40 text-xs mb-6">
            Last updated: <time dateTime={LAST_UPDATED}>{new Date(LAST_UPDATED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </p>
          <Sources sources={pageSources} />
        </div>
      </section>
      
      <Contact />
      <Footer />
    </main>
  )
}
