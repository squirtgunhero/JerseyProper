import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Signal Intelligence | Jersey Proper',
  description: 'Cut through the noise. Get market signals that matter, delivered as concise executive briefs.',
  openGraph: {
    title: 'Signal Intelligence | Jersey Proper',
    description: 'Cut through the noise. Get market signals that matter.',
    type: 'website',
  },
};

export default function SignalIntelligencePage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Market Intelligence
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Signal vs. Noise
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Your competitors are advertising, publishing, and positioning every day. 
              Most of it is noise. We find the signals that matter—and tell you what they mean.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                Get Started
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#what-you-get"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section id="what-you-get" className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">What You Get</h2>
            <p className="mt-4 text-zinc-400">
              Intelligence delivered as concise, actionable briefs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Brief Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Executive Briefs</h3>
              </div>
              <p className="text-zinc-400 text-sm">
                One-page summaries that answer the questions that matter: What changed? 
                What&apos;s working for competitors? Where are you invisible? What should you do next?
              </p>
            </div>

            {/* Monitoring Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Ongoing Monitoring</h3>
              </div>
              <p className="text-zinc-400 text-sm">
                Regular scans of competitor ad libraries, review platforms, and content. 
                We track what&apos;s surviving, what&apos;s failing, and what&apos;s changing—so you don&apos;t have to.
              </p>
            </div>

            {/* Insights Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Derived Insights</h3>
              </div>
              <p className="text-zinc-400 text-sm">
                Raw data is useless. We derive patterns: which ad archetypes survive longest, 
                where your visibility gaps are, and which content topics dominate your market.
              </p>
            </div>

            {/* Action Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Next Moves</h3>
              </div>
              <p className="text-zinc-400 text-sm">
                Every brief ends with 3 concrete actions. No vague recommendations—specific 
                moves based on what the market is telling us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What It's Not */}
      <section className="py-24 border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">What It&apos;s Not</h2>
            <p className="mt-4 text-zinc-400">
              We believe in doing less, better.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm font-medium">Not posting for you</span>
              </div>
              <p className="text-xs text-zinc-600">
                We analyze and advise. Execution remains in your hands (or your team&apos;s).
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm font-medium">Not spam or automation</span>
              </div>
              <p className="text-xs text-zinc-600">
                No auto-emails, no drip campaigns, no dark patterns. Just intelligence.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm font-medium">Not a dashboard to check</span>
              </div>
              <p className="text-xs text-zinc-600">
                You have enough tools. We deliver insights—you don&apos;t come to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to see what you&apos;re missing?
          </h2>
          <p className="mt-4 text-zinc-400">
            Start with a single scan. See what your competitors are really doing—and 
            what the market is actually responding to.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              Request Signal Intelligence
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
