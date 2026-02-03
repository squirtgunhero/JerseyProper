import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Competitor Intel | See Any Business\'s Facebook & Instagram Ads',
  description: 'Free tool to research your competitors\' Facebook and Instagram ads. See what ads are working in your industry and get inspired for your own campaigns.',
  openGraph: {
    title: 'Competitor Intel | Jersey Proper',
    description: 'Free tool to research your competitors\' Facebook and Instagram ads. See what\'s working in your industry.',
    url: 'https://jerseyproper.com/intel',
    images: [
      {
        url: 'https://jerseyproper.com/og-intel.png',
        width: 1024,
        height: 537,
        alt: 'Competitor Intel - See any business\'s Facebook & Instagram ads',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Competitor Intel | Jersey Proper',
    description: 'Free tool to research your competitors\' Facebook and Instagram ads.',
    images: ['https://jerseyproper.com/og-intel.png'],
  },
}

export default function IntelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
