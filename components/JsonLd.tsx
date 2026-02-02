/**
 * JSON-LD Structured Data Component
 * 
 * Renders JSON-LD structured data in a script tag.
 * Safe for SSR and compatible with Next.js App Router.
 */

interface JsonLdProps {
  data: object | object[]
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  )
}
