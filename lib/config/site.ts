/**
 * Site Configuration
 * 
 * Central configuration for site-wide constants used across
 * metadata, JSON-LD structured data, and SEO components.
 */

export const siteConfig = {
  // Core identity
  name: 'Jersey Proper',
  legalName: 'Jersey Proper',
  url: 'https://jerseyproper.com',
  email: 'michael@jerseyproper.com',
  
  // Descriptions
  tagline: 'Premium digital experiences for businesses that refuse to blend in.',
  description: 'Jersey Proper is a boutique creative studio building premium digital experiences, websites, and growth systems for brands that refuse to blend in.',
  
  // Founder / Author
  founder: {
    name: 'Michael Ehrlich',
    role: 'Founder',
  },
  
  // Location / Service area
  address: {
    addressRegion: 'New Jersey',
    addressCountry: 'US',
  },
  areaServed: [
    { type: 'State', name: 'New Jersey' },
    { type: 'Country', name: 'United States' },
  ],
  
  // Brand assets
  logo: 'https://jerseyproper.com/og-image.jpg', // Use OG image as logo for now
  image: 'https://jerseyproper.com/og-image.jpg',
  
  // Social profiles
  sameAs: [
    'https://www.instagram.com/jerseyproper',
    'https://www.linkedin.com/company/jerseyproper',
    'https://www.pinterest.com/jerseyproper/',
    'https://www.tiktok.com/@jerseyproper',
    'https://x.com/jerseyproper',
    'https://www.youtube.com/@JerseyProper',
    'https://www.facebook.com/JerseyProper',
  ],
  
  // Services offered
  services: [
    {
      name: 'Brand Identity',
      description: 'Strategic brand development that establishes your unique market position and visual identity.',
    },
    {
      name: 'Web Design',
      description: 'Premium website design and development that converts visitors into customers.',
    },
    {
      name: 'Lead Generation',
      description: 'Data-driven lead generation systems that attract and nurture qualified prospects.',
    },
    {
      name: 'Digital Strategy',
      description: 'Comprehensive digital strategy consulting to guide your business growth.',
    },
    {
      name: 'Conversion Optimization',
      description: 'Evidence-based optimization to improve conversion rates and maximize ROI.',
    },
    {
      name: 'Automation',
      description: 'Smart automation solutions to streamline workflows and scale operations.',
    },
  ],
  
  // Keywords for SEO
  keywords: [
    'creative studio',
    'brand identity',
    'web design',
    'lead generation',
    'digital strategy',
    'conversion optimization',
    'boutique agency',
    'New Jersey',
    'premium',
  ],
} as const

/**
 * Generate absolute URL from pathname
 */
export function getAbsoluteUrl(pathname: string = ''): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${siteConfig.url}${cleanPath}`
}

/**
 * Default author for content when none specified
 */
export const defaultAuthor = {
  name: 'Michael Ehrlich',
  url: siteConfig.url,
}

/**
 * Publisher information for articles
 */
export const publisher = {
  name: siteConfig.name,
  url: siteConfig.url,
  logo: siteConfig.logo,
}
