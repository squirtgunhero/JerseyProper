import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Attribution Tracker - Track Your AI Traffic',
  description: 'Discover and track your "dark traffic" from AI systems like ChatGPT, Claude, and Perplexity. Get real-time citation alerts and detailed analytics.',
  openGraph: {
    title: 'AI Attribution Tracker',
    description: 'Track your AI-driven traffic. Get alerts when ChatGPT, Claude, or Perplexity cite your content.',
    type: 'website',
  },
};

export default function AttributionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
