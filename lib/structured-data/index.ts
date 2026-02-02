/**
 * JSON-LD Structured Data Components
 * 
 * Generates Schema.org compliant JSON-LD for improved
 * search engine understanding and AEO (Answer Engine Optimization).
 */

import { siteConfig, getAbsoluteUrl, publisher } from '@/lib/config/site'

/**
 * Person Schema for Founder
 * Represents Michael Ehrlich as the founder
 */
export function generateFounderSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#founder`,
    name: siteConfig.founder.name,
    jobTitle: 'Founder & Creative Director',
    worksFor: {
      '@id': `${siteConfig.url}/#organization`,
    },
    description: 'Founder of Jersey Proper with 10+ years experience in digital strategy, brand design, and web development.',
    knowsAbout: [
      'Brand Identity Design',
      'Web Design',
      'Web Development',
      'Digital Strategy',
      'Lead Generation',
      'Conversion Optimization',
      'Marketing Automation',
    ],
  }
}

/**
 * Organization Schema
 * Represents Jersey Proper as a business entity
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.logo,
      width: 1024,
      height: 535,
    },
    image: siteConfig.image,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    founder: {
      '@id': `${siteConfig.url}/#founder`,
    },
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
    },
    areaServed: siteConfig.areaServed.map((area) => ({
      '@type': area.type,
      name: area.name,
    })),
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Credit Card, Bank Transfer',
    sameAs: siteConfig.sameAs,
    knowsAbout: [
      'Brand Identity',
      'Web Design',
      'Web Development',
      'Lead Generation',
      'Digital Strategy',
      'Conversion Optimization',
      'Marketing Automation',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Creative Services',
      itemListElement: siteConfig.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
      })),
    },
  }
}

/**
 * WebSite Schema
 * Represents the website with search action potential
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'en-US',
  }
}

/**
 * WebPage Schema
 * Represents individual pages
 */
export interface WebPageSchemaOptions {
  name: string
  description: string
  pathname: string
  datePublished?: string
  dateModified?: string
}

export function generateWebPageSchema(options: WebPageSchemaOptions) {
  const url = getAbsoluteUrl(options.pathname)
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    about: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'en-US',
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
  }
}

/**
 * Service Schema
 * Represents individual services offered
 */
export interface ServiceSchemaOptions {
  name: string
  description: string
}

export function generateServiceSchema(service: ServiceSchemaOptions) {
  return {
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${siteConfig.url}/#organization`,
    },
    areaServed: siteConfig.areaServed.map((area) => ({
      '@type': area.type,
      name: area.name,
    })),
  }
}

/**
 * All Services Schema (wrapper)
 * Combines all service offerings
 */
export function generateAllServicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': siteConfig.services.map((service) => generateServiceSchema(service)),
  }
}

/**
 * BlogPosting Schema
 * For individual blog/notes articles
 */
export interface BlogPostingSchemaOptions {
  headline: string
  description: string
  pathname: string
  datePublished: string
  dateModified?: string
  author?: {
    name: string
    url?: string
  }
  image?: string
  categories?: string[]
}

export function generateBlogPostingSchema(options: BlogPostingSchemaOptions) {
  const url = getAbsoluteUrl(options.pathname)
  const author = options.author || { name: siteConfig.founder.name, url: siteConfig.url }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
    },
    headline: options.headline,
    description: options.description,
    url,
    datePublished: options.datePublished,
    ...(options.dateModified && { dateModified: options.dateModified }),
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    ...(options.image && {
      image: {
        '@type': 'ImageObject',
        url: options.image,
      },
    }),
    ...(options.categories && options.categories.length > 0 && {
      articleSection: options.categories.join(', '),
      keywords: options.categories.join(', '),
    }),
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    inLanguage: 'en-US',
  }
}

/**
 * Blog Collection Schema
 * For the /notes listing page
 */
export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteConfig.url}/notes#blog`,
    name: 'The Journal - Jersey Proper Notes',
    description: 'Insights on branding, web design, and growing your business with premium digital experiences.',
    url: getAbsoluteUrl('/notes'),
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'en-US',
  }
}

/**
 * SoftwareApplication Schema
 * For the AEO Analyzer tool
 */
export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteConfig.url}/analyzer#software`,
    name: 'AEO Analyzer',
    description: 'Audit your content for Answer Engine Optimization. Get actionable insights to make your pages more likely to be cited by AI systems.',
    url: getAbsoluteUrl('/analyzer'),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@id': `${siteConfig.url}/#organization`,
    },
  }
}

/**
 * FAQ Schema
 * For frequently asked questions (helps with AEO)
 */
export interface FAQItem {
  question: string
  answer: string
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Default FAQs for the homepage
 */
export const homepageFAQs: FAQItem[] = [
  {
    question: 'What services does Jersey Proper offer?',
    answer: 'Jersey Proper offers brand identity design, web design and development, lead generation systems, digital strategy consulting, conversion optimization, and marketing automation for businesses that want premium digital experiences.',
  },
  {
    question: 'Who is the founder of Jersey Proper?',
    answer: 'Jersey Proper was founded by Michael Ehrlich, a creative director with over 10 years of experience in digital strategy, brand design, and web development.',
  },
  {
    question: 'Where is Jersey Proper located?',
    answer: 'Jersey Proper is a boutique creative studio based in New Jersey, serving clients throughout New Jersey and the United States.',
  },
  {
    question: 'What makes Jersey Proper different from other agencies?',
    answer: 'Jersey Proper offers direct founder access, premium quality work at fair pricing, dedicated attention through limited client rosters, and custom solutions built from scratch rather than templates.',
  },
  {
    question: 'How do I contact Jersey Proper?',
    answer: 'You can contact Jersey Proper by emailing hello@jerseyproper.com or through the contact form on the website. Every inquiry is personally reviewed by founder Michael Ehrlich.',
  },
]

/**
 * JSON-LD Script Component Generator
 * Returns the script tag content for embedding in pages
 */
export function jsonLdScript(data: object | object[]): string {
  return JSON.stringify(data, null, 0)
}

/**
 * Combine multiple schemas into a graph
 */
export function combineSchemas(...schemas: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      // Remove @context from individual schemas when combining
      const { '@context': _, ...rest } = schema as { '@context'?: string; [key: string]: unknown }
      return rest
    }),
  }
}
