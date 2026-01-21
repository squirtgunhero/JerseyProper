import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work - Jersey Proper',
  description: 'Selected case studies and project highlights from Jersey Proper.',
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
