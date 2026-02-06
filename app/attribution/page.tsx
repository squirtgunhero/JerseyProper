import Link from 'next/link';

export default function AttributionLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/attribution" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-semibold text-zinc-900">AI Attribution</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/attribution/login" className="text-zinc-600 hover:text-zinc-900 text-sm font-medium">
                Log in
              </Link>
              <Link
                href="/attribution/signup"
                className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Now tracking AI traffic from 6+ major platforms
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
            Stop Guessing.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-zinc-400">
              Track Your AI Traffic.
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-zinc-600 max-w-2xl mx-auto">
            ChatGPT, Claude, and Perplexity are sending traffic to your site right now.
            You just can&apos;t see it in Google Analytics.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/attribution/signup"
              className="bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/20"
            >
              Start Tracking Free
            </Link>
            <a
              href="#how-it-works"
              className="bg-zinc-100 text-zinc-900 px-8 py-4 rounded-xl text-lg font-medium hover:bg-zinc-200 transition"
            >
              See How It Works
            </a>
          </div>
          
          <p className="mt-4 text-sm text-zinc-500">
            One line of code. No credit card required.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900">The Hidden Traffic Problem</h2>
            <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">
              AI systems don&apos;t send traditional referrer data. Your analytics are lying to you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-zinc-200">
              <div className="text-4xl mb-4">👻</div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">Dark Traffic</h3>
              <p className="text-zinc-600">
                AI-driven visits show up as &quot;Direct&quot; or &quot;None&quot; in Google Analytics,
                making it impossible to measure AI impact.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-zinc-200">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">Mystery ROI</h3>
              <p className="text-zinc-600">
                You&apos;re investing in AI optimization but have no way to measure
                if ChatGPT or Claude are actually recommending you.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-zinc-200">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">Missed Opportunities</h3>
              <p className="text-zinc-600">
                Without visibility into AI traffic, you can&apos;t optimize content
                or capitalize on what&apos;s working.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900">Finally, See Your AI Traffic</h2>
            <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">
              One script. Complete visibility. Real-time alerts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">Real-Time Citation Alerts</h3>
              <p className="text-zinc-600">
                Get instant email notifications when ChatGPT, Claude, or Perplexity cite your pages.
                Know the moment AI starts recommending you.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">Source Attribution</h3>
              <p className="text-zinc-600">
                See exactly which AI systems are driving traffic. Compare ChatGPT vs Claude vs Perplexity
                with detailed breakdowns.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">Conversion Tracking</h3>
              <p className="text-zinc-600">
                Track signups, purchases, and form submissions back to AI sources.
                Calculate the true ROI of your AI visibility.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">Historical Analytics</h3>
              <p className="text-zinc-600">
                Track trends over time. See which pages get cited most, spot patterns,
                and optimize your content for AI visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Sources Section */}
      <section className="py-20 px-4 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Track Traffic From All Major AI Platforms</h2>
          <p className="text-zinc-400 mb-12">
            Our detection engine identifies visitors from these AI systems and more
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            {['ChatGPT', 'Claude', 'Perplexity', 'Bing Chat', 'Google Gemini', 'Poe'].map((name) => (
              <div key={name} className="flex items-center gap-2 text-lg">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-zinc-600">Start free, upgrade when you need more</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-200">
              <h3 className="text-xl font-semibold text-zinc-900">Free</h3>
              <p className="text-zinc-500 mt-1">For getting started</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-zinc-900">$0</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  7-day data retention
                </li>
                <li className="flex items-center gap-3 text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time citation alerts
                </li>
                <li className="flex items-center gap-3 text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1 website
                </li>
              </ul>
              <Link
                href="/attribution/signup"
                className="mt-8 block w-full text-center bg-zinc-100 text-zinc-900 py-3 rounded-lg font-medium hover:bg-zinc-200 transition"
              >
                Get Started Free
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-zinc-900 p-8 rounded-2xl text-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="text-zinc-400 mt-1">For growing businesses</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-zinc-400">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-zinc-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited history
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Conversion tracking
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  5 websites
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <Link
                href="/attribution/signup"
                className="mt-8 block w-full text-center bg-white text-zinc-900 py-3 rounded-lg font-medium hover:bg-zinc-100 transition"
              >
                Start Pro Trial
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-200">
              <h3 className="text-xl font-semibold text-zinc-900">Enterprise</h3>
              <p className="text-zinc-500 mt-1">For large organizations</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-zinc-900">$299</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API access
                </li>
                <li className="flex items-center gap-3 text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited websites
                </li>
                <li className="flex items-center gap-3 text-zinc-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  White-label reports
                </li>
              </ul>
              <Link
                href="/attribution/signup"
                className="mt-8 block w-full text-center bg-zinc-100 text-zinc-900 py-3 rounded-lg font-medium hover:bg-zinc-200 transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Tracking in 60 Seconds
          </h2>
          <p className="text-zinc-400 mb-8">
            One line of code. No credit card required. See your AI traffic today.
          </p>
          <Link
            href="/attribution/signup"
            className="inline-block bg-white text-zinc-900 px-8 py-4 rounded-xl text-lg font-medium hover:bg-zinc-100 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-zinc-900">AI Attribution</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-600">
            <Link href="/privacy" className="hover:text-zinc-900">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-900">Terms</Link>
            <a href="mailto:support@jerseyproper.com" className="hover:text-zinc-900">Support</a>
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Jersey Proper. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
