import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process - Jersey Proper',
  description: 'A calm, deliberate approach to building digital systems that last.',
}

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
