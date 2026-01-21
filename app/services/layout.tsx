import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Jersey Proper',
  description: 'Comprehensive design, development, and growth services for businesses that refuse to settle.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
