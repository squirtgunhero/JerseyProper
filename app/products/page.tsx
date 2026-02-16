import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Products and free tools built by Jersey Proper. Colony AI-powered CRM, AEO Analyzer, Competitor Intel, and more.',
}

const tools = [
  {
    name: 'AEO Analyzer',
    status: 'live' as const,
    description:
      'Drop in a URL and see how well your content is optimized for AI citation. Find out if ChatGPT, Claude, and Perplexity can actually find you.',
    href: '/analyzer',
  },
  {
    name: 'Competitor Intel',
    status: 'live' as const,
    description:
      "See any business's Facebook and Instagram ads. Find out what your competitors are running, how long they've been running it, and which ads are proven winners.",
    href: '/intel',
  },
  {
    name: 'Second Sight',
    status: 'coming' as const,
    description:
      'One URL, one click, full diagnosis. Site performance, AI visibility, competitor activity, and the number one thing killing your growth. The front door to everything else.',
    href: null,
  },
]

const flagshipTags = [
  'Large Action Model',
  'Orchestration Layer',
  'Invisibleware',
  'Text + Voice',
]

const previewActions = ['Contact created', 'Deal opened', 'Follow-up set']

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] font-dm-sans text-[#1A1A1A]">
      <Navigation />

      {/* Hero */}
      <section className="pt-[140px] pb-20 px-6 max-w-[900px] mx-auto text-center animate-fade-up">
        <div className="text-[13px] uppercase tracking-[0.12em] text-[#9A9A9A] font-semibold mb-4">
          Products
        </div>
        <h1 className="font-instrument text-[clamp(40px,6vw,64px)] font-normal leading-[1.1] tracking-[-0.03em] mb-5">
          We don&apos;t just build
          <br />
          for clients. We build.
        </h1>
        <p className="text-lg text-[#6B6B6B] max-w-[540px] mx-auto leading-relaxed">
          Tools and products created by Jersey Proper. Some are free. Some will
          change how you run your business.
        </p>
      </section>

      {/* Colony Flagship Card */}
      <section className="px-6 pb-[100px] max-w-[1100px] mx-auto">
        <div className="bg-[#0C0C0E] rounded-3xl p-[60px] flex gap-[60px] items-center relative overflow-hidden max-md:flex-col max-md:p-9 max-md:gap-9">
          <div className="colony-flagship-glow" />

          {/* Content */}
          <div className="flex-1 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-[#C9A84C] font-semibold uppercase tracking-[0.08em] mb-6">
              Flagship Product
            </div>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="colony-rings-lg" />
              <span className="text-xl font-normal tracking-[0.25em] uppercase text-[#F2F0ED]">
                Colony
              </span>
            </div>

            <h2 className="font-instrument text-[32px] font-normal text-[#F2F0ED] tracking-[-0.01em] mb-4 leading-[1.2]">
              The AI-powered CRM that
              <br />
              does it for you
            </h2>

            <p className="text-[15px] text-[#8A8A8E] leading-[1.7] mb-7 max-w-[480px]">
              Built on Jersey Proper&apos;s proprietary LAM (Large Action
              Model). Colony doesn&apos;t explain what you need to do. It just
              does it. Talk to it by text or voice and it handles your contacts,
              deals, follow-ups, and pipeline. Put it on autopilot and it only
              reaches out when there&apos;s real business ready.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {flagshipTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#8A8A8E] bg-white/[0.04] border border-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/colony"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#C9A84C] text-[#0C0C0E] text-[15px] font-semibold hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(201,168,76,0.25)] transition-all duration-200"
            >
              Learn More
            </Link>
          </div>

          {/* Preview Window */}
          <div className="shrink-0 w-[340px] relative max-md:w-full">
            <div className="bg-[#141416] border border-white/[0.06] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              {/* Title bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              </div>
              <div className="p-5">
                {/* User message */}
                <div className="flex gap-2.5 items-start mb-4">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-xs text-[#8A8A8E] shrink-0">
                    M
                  </div>
                  <div className="text-xs leading-[1.5] text-[#C8C8CC] bg-white/[0.04] px-3.5 py-2.5 rounded-xl">
                    Add Sarah Chen as a lead, she called about a kitchen remodel
                  </div>
                </div>
                {/* AI response */}
                <div className="flex gap-2.5 items-start mb-4">
                  <div className="w-7 h-7 rounded-lg bg-[#C9A84C] flex items-center justify-center text-xs text-[#0C0C0E] font-bold shrink-0">
                    C
                  </div>
                  <div className="text-xs leading-[1.5] text-[#8A8A8E]">
                    Done.
                    <div className="flex gap-1.5 mt-2.5 flex-wrap">
                      {previewActions.map((action) => (
                        <div
                          key={action}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-[#34C759] flex items-center gap-1"
                        >
                          &#10003; {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Input placeholder */}
                <div className="mt-4 px-3.5 py-2.5 rounded-[10px] border border-white/[0.06] bg-white/[0.02] text-[11px] text-white/20">
                  Type or talk to Colony...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="py-[100px] px-6 max-w-[1100px] mx-auto">
        <div className="mb-12">
          <div className="text-[13px] uppercase tracking-[0.12em] text-[#9A9A9A] font-semibold mb-3">
            Free Tools
          </div>
          <h2 className="font-instrument text-[clamp(28px,4vw,40px)] font-normal tracking-[-0.02em] mb-3">
            Intelligence that others charge for
          </h2>
          <p className="text-base text-[#6B6B6B] max-w-[480px] leading-relaxed">
            No signups. No credit cards. Just useful tools that give you a real
            edge.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="p-8 rounded-2xl border border-[#E8E6E1] bg-white flex flex-col hover:border-[#D0CCC4] hover:translate-y-[-4px] transition-all duration-300"
            >
              <div
                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] mb-5 ${
                  tool.status === 'live' ? 'text-[#34C759]' : 'text-[#9A9A9A]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    tool.status === 'live' ? 'bg-[#34C759]' : 'bg-[#9A9A9A]'
                  }`}
                />
                {tool.status === 'live' ? 'Live' : 'Coming Soon'}
              </div>
              <h3 className="text-lg font-semibold mb-2.5 tracking-[-0.01em]">
                {tool.name}
              </h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6 flex-1">
                {tool.description}
              </p>
              {tool.href ? (
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] hover:gap-2.5 transition-all duration-200"
                >
                  Try it free <span>&rarr;</span>
                </Link>
              ) : (
                <span className="text-sm font-semibold text-[#9A9A9A]">
                  Coming soon
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 pb-[120px] px-6 text-center max-w-[600px] mx-auto">
        <p className="text-base text-[#6B6B6B] mb-2 leading-relaxed">
          Need something custom built for your business?
        </p>
        <p>
          <Link
            href="/#contact"
            className="text-[#1A1A1A] font-semibold border-b border-[#E8E6E1] pb-0.5 hover:border-[#1A1A1A] transition-colors duration-200"
          >
            Talk to Jersey Proper
          </Link>
        </p>
      </section>

      {/* Footer */}
      <footer className="px-10 py-10 border-t border-[#F0EDE8] flex items-center justify-between max-w-[1100px] mx-auto max-md:flex-col max-md:gap-3 max-md:text-center">
        <span className="text-[13px] text-[#9A9A9A]">
          &copy; 2026{' '}
          <Link
            href="/"
            className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            Jersey Proper
          </Link>
          . All rights reserved.
        </span>
        <span className="text-[13px] text-[#9A9A9A]">
          <a
            href="mailto:michael@jerseyproper.com"
            className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            michael@jerseyproper.com
          </a>
        </span>
      </footer>
    </div>
  )
}
