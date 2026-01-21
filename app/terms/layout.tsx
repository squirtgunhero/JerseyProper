import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Jersey Proper',
  description: 'Terms of service for Jersey Proper.',
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
