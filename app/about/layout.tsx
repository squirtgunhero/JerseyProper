import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Jersey Proper',
  description: 'A boutique studio for businesses that value quality over speed, clarity over complexity.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
