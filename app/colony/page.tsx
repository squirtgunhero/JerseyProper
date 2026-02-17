import { Metadata } from 'next'
import ColonyContent from './ColonyContent'

export const metadata: Metadata = {
  title: 'Colony - AI-Powered CRM for Small Businesses',
  description:
    "Colony is an AI-powered CRM built for small businesses that don't have time to learn software. Just talk to it and it does the work.",
}

export default function ColonyPage() {
  return <ColonyContent />
}
