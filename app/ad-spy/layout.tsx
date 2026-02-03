import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Competitor Ad Spy | See Any Business\'s Facebook & Instagram Ads',
  description: 'Free tool to spy on your competitors\' Facebook and Instagram ads. See what ads are working in your industry and get inspired for your own campaigns.',
  openGraph: {
    title: 'Competitor Ad Spy | Jersey Proper',
    description: 'Free tool to spy on your competitors\' Facebook and Instagram ads. See what\'s working in your industry.',
  },
}

export default function AdSpyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
