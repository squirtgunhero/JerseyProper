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
import { siteConfig, getAbsoluteUrl } from '@/lib/config/site'
import {
  generateWebPageSchema,
  generateAllServicesSchema,
  generateFAQSchema,
  homepageFAQs,
  combineSchemas,
} from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Jersey Proper | Boutique Creative Studio',
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
      <Contact />
      <Footer />
    </main>
  )
}
