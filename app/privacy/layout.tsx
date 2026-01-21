import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Jersey Proper',
  description: 'Privacy policy for Jersey Proper.',
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
