import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Jersey Proper',
  description: 'Get in touch with Jersey Proper to discuss your project.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
