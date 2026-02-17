import { Metadata } from 'next'
import ColonyContent from './ColonyContent'

export const metadata: Metadata = {
  title: 'Colony - AI-Powered CRM for Small Businesses',
  description:
    "Colony is an AI-powered CRM built for small businesses that don't have time to learn software. Just talk to it and it does the work.",
  openGraph: {
    title: 'Colony - AI-Powered CRM for Small Businesses',
    description:
      'Your business runs on conversations. Colony just handles it.',
    url: 'https://jerseyproper.com/colony',
    siteName: 'Jersey Proper',
    images: [
      {
        url: 'https://jerseyproper.com/colony-og.png',
        width: 1200,
        height: 630,
        alt: 'Colony - AI-Powered CRM by Jersey Proper',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colony - AI-Powered CRM for Small Businesses',
    description:
      'Your business runs on conversations. Colony just handles it.',
    images: ['https://jerseyproper.com/colony-og.png'],
  },
}

export default function ColonyPage() {
  return <ColonyContent />
}
