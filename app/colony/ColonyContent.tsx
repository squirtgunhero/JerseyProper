'use client'

import { useState } from 'react'
import Link from 'next/link'
import WaitlistModal from '@/components/WaitlistModal'

const demoNavItems = [
  'Dashboard',
  'Contacts',
  'Deals',
  'Referrals',
  'Inbox',
  'Reports',
]

const demoActions = [
  { label: 'Contact created' },
  { label: 'Tagged: Kitchen Remodel' },
  { label: 'Deal: $40,000' },
  { label: 'Follow-up: Tomorrow 9am' },
]

const features = [
  {
    icon: '\u2318',
    title: 'Orchestration Layer',
    description:
      "Colony doesn't give you instructions. It takes action. The orchestration layer coordinates every system behind the scenes so one request triggers a chain of real work.",
  },
  {
    icon: '\u2237',
    title: 'Smart Contacts',
    description:
      'Every interaction, note, and deal in one place. Colony automatically organizes and tags your contacts so you never lose track of a lead.',
  },
  {
    icon: '\u21C4',
    title: 'Referral Marketplace',
    description:
      'Share and receive leads with trusted peers. A built-in network that keeps your pipeline full without cold outreach.',
  },
  {
    icon: '\u25CE',
    title: 'Pipeline & Deals',
    description:
      'See where every opportunity stands at a glance. Colony tracks your deals from first contact to closed with no manual updates needed.',
  },
  {
    icon: '\u2199',
    title: 'Unified Inbox',
    description:
      'Email, texts, and notifications in one stream. Stop switching between apps. Colony brings all your conversations together.',
  },
  {
    icon: '\u2197',
    title: 'Instant Reports',
    description:
      'Ask "how did I do this month?" and get the answer. Revenue trends, lead sources, conversion rates. All in plain English.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Sign up',
    description:
      'Create your account in under a minute. No credit card required. No 30-step setup wizard.',
  },
  {
    number: '02',
    title: 'Tell it about your business',
    description:
      'Colony asks a few questions and configures itself. Your pipeline stages, your services, your follow-up preferences. All handled.',
  },
  {
    number: '03',
    title: 'Start talking',
    description:
      'Text it or talk to it. "Add a lead." "Send a follow-up." "Show me this month\'s numbers." Colony handles the rest.',
  },
]

const audiences = [
  {
    icon: '\u2302',
    title: 'Real Estate Agents',
    description:
      'Manage leads, track deals, and stay on top of follow-ups between showings. Your pipeline stays warm even when you\'re on the road.',
  },
  {
    icon: '\u25AA',
    title: 'Contractors',
    description:
      'Track estimates, jobs, and client communication from the job site. No laptop required. Colony works from your phone.',
  },
  {
    icon: '\u223F',
    title: 'Barbers & Stylists',
    description:
      'Keep client preferences, rebooking reminders, and referral tracking in one place. More repeat clients, less mental overhead.',
  },
  {
    icon: '\u25CB',
    title: 'Fitness & Wellness',
    description:
      'Personal trainers, yoga instructors, wellness coaches. Manage your roster, track sessions, and follow up without the admin headache.',
  },
]

export default function ColonyContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  const openWaitlist = () => setWaitlistOpen(true)

  return (
    <div className="min-h-screen bg-[#0C0C0E] font-dm-sans text-[#F2F0ED] overflow-x-hidden">
      {/* ================================================================
          NAV
      ================================================================ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-10 py-5 flex items-center justify-between backdrop-blur-[20px] bg-[rgba(12,12,14,0.8)] border-b border-white/[0.06] max-md:px-5 max-md:py-4">
        <Link href="/colony" className="flex items-center gap-3 no-underline">
          <div className="colony-rings" />
          <span className="text-base font-normal tracking-[0.25em] uppercase text-[#F2F0ED]">
            Colony
          </span>
        </Link>
        <ul className="flex items-center gap-8 list-none max-md:hidden">
          <li>
            <Link
              href="/"
              className="text-[13px] text-[#8A8A8E]/50 hover:text-[#8A8A8E] transition-colors duration-200 no-underline"
            >
              &larr; Jersey Proper
            </Link>
          </li>
          <li>
            <a
              href="#features"
              className="text-sm font-medium text-[#8A8A8E] hover:text-[#F2F0ED] transition-colors duration-200 no-underline"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#8A8A8E] hover:text-[#F2F0ED] transition-colors duration-200 no-underline"
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="text-sm font-medium text-[#8A8A8E] hover:text-[#F2F0ED] transition-colors duration-200 no-underline"
            >
              Pricing
            </a>
          </li>
          <li>
            <button
              onClick={openWaitlist}
              className="bg-[#E8993E] text-[#0C0C0E] px-6 py-2.5 rounded-[10px] text-sm font-semibold hover:translate-y-[-1px] hover:shadow-[0_4px_20px_rgba(232,153,62,0.3)] transition-all duration-200"
            >
              Join Waitlist
            </button>
          </li>
        </ul>
      </nav>

      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[140px] pb-20 relative max-md:pt-[120px] max-md:pb-[60px]">
        <div className="colony-hero-glow" />
        <div className="colony-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-[#141416] text-[13px] text-[#8A8A8E] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] colony-pulse" />
          Powered by Jersey Proper
        </div>
        <h1 className="colony-fade-up-1 font-instrument text-[clamp(48px,8vw,96px)] font-normal leading-[1.05] tracking-[-0.03em] max-w-[800px] mb-6">
          Your business
          <br />
          runs on <em className="italic text-[#E8993E]">conversations</em>
        </h1>
        <p className="colony-fade-up-2 text-[clamp(16px,2vw,20px)] text-[#8A8A8E] max-w-[540px] leading-relaxed mb-12">
          Colony is an AI-powered CRM built on Jersey Proper&apos;s proprietary
          LAM (Large Action Model). It doesn&apos;t tell you what to do. It just
          does it. Talk to it by text or voice, make a request, and Colony
          handles the rest.
        </p>
        <div className="colony-fade-up-3 flex gap-4 items-center max-md:flex-col max-md:w-full">
          <button
            onClick={openWaitlist}
            className="bg-[#E8993E] text-[#0C0C0E] px-9 py-4 rounded-xl text-base font-semibold hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(232,153,62,0.3)] transition-all duration-200 max-md:w-full max-md:text-center"
          >
            Join the Waitlist
          </button>
          <a
            href="#features"
            className="text-[#8A8A8E] px-6 py-4 text-base font-medium no-underline hover:text-[#F2F0ED] transition-colors duration-200 flex items-center gap-2"
          >
            See how it works &darr;
          </a>
        </div>
      </section>

      {/* ================================================================
          DEMO WINDOW
      ================================================================ */}
      <div className="colony-fade-up-4 px-6 pb-[120px] flex justify-center">
        <div className="w-full max-w-[900px] rounded-[20px] border border-white/[0.06] bg-[#141416] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] opacity-80" />
          </div>
          <div className="p-8 min-h-[340px] flex flex-col gap-5 max-md:p-5">
            <div className="flex gap-2 flex-wrap mb-6">
              {demoNavItems.map((item, i) => (
                <div
                  key={item}
                  className={`px-4 py-2 rounded-[10px] text-[13px] border ${
                    i === 0
                      ? 'bg-[rgba(232,153,62,0.15)] text-[#E8993E] border-[rgba(232,153,62,0.2)]'
                      : 'bg-[#1A1A1E] text-[#8A8A8E] border-white/[0.06]'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-[10px] bg-[#1A1A1E] flex items-center justify-center text-sm text-[#8A8A8E] shrink-0">
                  M
                </div>
                <div className="px-4 py-3 rounded-[14px] bg-[#1A1A1E] text-sm leading-[1.5] text-[#F2F0ED] max-w-[480px]">
                  Add John Smith as a new lead &mdash; he called about a kitchen
                  remodel, budget around $40k
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-[10px] bg-[#C9A84C] flex items-center justify-center text-sm text-[#0C0C0E] font-bold shrink-0">
                  C
                </div>
                <div className="text-sm leading-[1.5] text-[#8A8A8E]">
                  Done. I&apos;ve created{' '}
                  <strong className="text-[#F2F0ED] font-medium">
                    John Smith
                  </strong>{' '}
                  as a new lead with the following:
                  <div className="flex gap-2.5 mt-2 flex-wrap">
                    {demoActions.map((action) => (
                      <div
                        key={action.label}
                        className="px-3.5 py-2.5 rounded-[10px] bg-[#1A1A1E] border border-white/[0.06] text-xs flex items-center gap-1.5"
                      >
                        <span className="text-[#34C759] font-bold">
                          &#10003;
                        </span>{' '}
                        {action.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-[18px] py-3.5 rounded-[14px] border border-white/[0.06] bg-[#1A1A1E] mt-auto">
              <span className="text-[#5A5A5E] text-sm flex-1">
                Type or talk to Colony...
              </span>
              <button
                className="w-8 h-8 rounded-lg bg-[#1A1A1E] border border-white/[0.06] flex items-center justify-center"
                aria-label="Voice input"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A8A8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>
              <button
                className="w-8 h-8 rounded-lg bg-[#E8993E] flex items-center justify-center"
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0C0C0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          LAM SECTION
      ================================================================ */}
      <section className="py-[120px] px-6 max-w-[1100px] mx-auto">
        <div className="text-center">
          <div className="text-[13px] uppercase tracking-[0.12em] text-[#E8993E] font-semibold mb-4">
            Powered by Jersey Proper&apos;s Proprietary LAM (Large Action Model)
          </div>
          <h2 className="font-instrument text-[clamp(32px,5vw,52px)] font-normal tracking-[-0.02em] mb-12 leading-[1.1]">
            Other CRMs explain.
            <br />
            Colony <em className="italic text-[#E8993E]">executes.</em>
          </h2>

          <div className="grid grid-cols-2 gap-5 mb-12 text-left max-md:grid-cols-1">
            <div className="rounded-2xl border border-white/[0.06] bg-[#141416] overflow-hidden">
              <div className="px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#5A5A5E] bg-[#1A1A1E] border-b border-white/[0.06]">
                Traditional CRM
              </div>
              <div className="p-7">
                <p className="text-[15px] text-[#8A8A8E] leading-relaxed italic">
                  &ldquo;To add a contact, navigate to Contacts, click New, fill
                  in the required fields, select a pipeline stage, set a
                  follow-up date, then save.&rdquo;
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-[#141416] overflow-hidden">
              <div className="px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#E8993E] bg-[rgba(232,153,62,0.15)] border-b border-white/[0.06]">
                Colony
              </div>
              <div className="p-7">
                <p className="text-[15px] text-[#8A8A8E] leading-relaxed italic">
                  &ldquo;Add Sarah Chen, she called about a bathroom
                  remodel.&rdquo;
                </p>
                <div className="mt-4 px-4 py-3 rounded-[10px] bg-[rgba(52,199,89,0.08)] border border-[rgba(52,199,89,0.15)] text-[13px] text-[#34C759] font-medium not-italic">
                  Done. Contact created. Deal opened. Follow-up scheduled for
                  tomorrow.
                </div>
              </div>
            </div>
          </div>

          <p className="text-base text-[#8A8A8E] max-w-[640px] mx-auto leading-[1.7] text-center">
            Colony&apos;s proprietary Large Action Model doesn&apos;t walk you
            through steps or link you to help docs. It interprets what you need
            and takes action across your entire system. The orchestration layer
            connects contacts, deals, emails, scheduling, and reporting into a
            single chain of execution. You talk. Colony works.
          </p>
        </div>
      </section>

      {/* ================================================================
          FEATURES
      ================================================================ */}
      <section id="features" className="py-[120px] px-6 max-w-[1100px] mx-auto">
        <div className="text-[13px] uppercase tracking-[0.12em] text-[#E8993E] font-semibold mb-4">
          Features
        </div>
        <h2 className="font-instrument text-[clamp(32px,5vw,52px)] font-normal tracking-[-0.02em] mb-5 leading-[1.1]">
          Everything you need.
          <br />
          Nothing you don&apos;t.
        </h2>
        <p className="text-[17px] text-[#8A8A8E] max-w-[520px] mb-16 leading-relaxed">
          Colony replaces the stack of tools you&apos;re paying for but never
          using. One platform, one conversation.
        </p>

        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-9 rounded-2xl border border-white/[0.06] bg-[#141416] hover:border-[rgba(232,153,62,0.2)] hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1A1A1E] flex items-center justify-center text-xl mb-5">
                {feature.icon}
              </div>
              <h3 className="text-[17px] font-semibold mb-2.5 tracking-[-0.01em]">
                {feature.title}
              </h3>
              <p className="text-sm text-[#8A8A8E] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS
      ================================================================ */}
      <section id="how-it-works" className="py-[120px] px-6 max-w-[1100px] mx-auto">
        <div className="text-[13px] uppercase tracking-[0.12em] text-[#E8993E] font-semibold mb-4">
          How It Works
        </div>
        <h2 className="font-instrument text-[clamp(32px,5vw,52px)] font-normal tracking-[-0.02em] mb-5 leading-[1.1]">
          60 seconds to useful
        </h2>
        <p className="text-[17px] text-[#8A8A8E] max-w-[520px] mb-16 leading-relaxed">
          No training videos. No onboarding calls. If you can send a text
          message, you can use Colony.
        </p>

        <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-12">
          {steps.map((step) => (
            <div key={step.number}>
              <div className="font-instrument text-[64px] text-[#E8993E] opacity-30 leading-none mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3 tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-[15px] text-[#8A8A8E] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          INVISIBLEWARE
      ================================================================ */}
      <section className="py-[120px] px-6 max-w-[1100px] mx-auto">
        <div className="p-[60px] rounded-3xl border border-white/[0.06] bg-[#141416] relative overflow-hidden max-md:p-9">
          <div className="colony-iw-glow" />
          <div className="relative max-w-[640px]">
            <div className="text-[13px] uppercase tracking-[0.12em] text-[#E8993E] font-semibold mb-4">
              Invisibleware
            </div>
            <h2 className="font-instrument text-[clamp(32px,5vw,52px)] font-normal tracking-[-0.02em] mb-5 leading-[1.1]">
              Put your CRM
              <br />
              on autopilot
            </h2>
            <p className="text-base text-[#8A8A8E] leading-[1.7] mb-10">
              Not everyone wants to live inside their CRM. Colony gets that. Turn
              on autopilot and Colony runs silently in the background. It
              nurtures leads, sends follow-ups, tracks deals, and manages your
              pipeline without a single login from you. The only time you hear
              from Colony is when there&apos;s actual business ready. A qualified
              lead. A deal that needs your signature. Money on the table.
              Everything else is handled.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              <div className="flex gap-4 items-start p-5 rounded-[14px] bg-[#1A1A1E] border border-white/[0.06]">
                <div className="text-[#34C759] text-lg shrink-0 mt-0.5">&#9673;</div>
                <div>
                  <div className="text-xs uppercase tracking-[0.08em] text-[#34C759] font-semibold mb-1.5">
                    Colony texts you
                  </div>
                  <div className="text-sm text-[#F2F0ED] leading-[1.5] italic">
                    &ldquo;Sarah Chen is ready to move forward on the remodel.
                    She wants to schedule a walkthrough this week.&rdquo;
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start p-5 rounded-[14px] bg-[#1A1A1E] border border-white/[0.06]">
                <div className="text-[#34C759] text-lg shrink-0 mt-0.5">&#9673;</div>
                <div>
                  <div className="text-xs uppercase tracking-[0.08em] text-[#34C759] font-semibold mb-1.5">
                    Colony texts you
                  </div>
                  <div className="text-sm text-[#F2F0ED] leading-[1.5] italic">
                    &ldquo;3 new referrals came in overnight. One is
                    pre-qualified and asking for a callback today.&rdquo;
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[15px] text-[#5A5A5E] font-medium">
              No dashboards. No notifications you have to sort through. Just a
              text or a call when it matters.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          BUILT FOR
      ================================================================ */}
      <section id="audience" className="py-[120px] px-6 max-w-[1100px] mx-auto">
        <div className="text-[13px] uppercase tracking-[0.12em] text-[#E8993E] font-semibold mb-4">
          Built For
        </div>
        <h2 className="font-instrument text-[clamp(32px,5vw,52px)] font-normal tracking-[-0.02em] mb-5 leading-[1.1]">
          Small businesses that
          <br />
          don&apos;t have time for this
        </h2>
        <p className="text-[17px] text-[#8A8A8E] max-w-[520px] mb-16 leading-relaxed">
          You&apos;re too busy doing the actual work to learn another tool.
          Colony gets that.
        </p>

        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-2xl border border-white/[0.06] bg-[#141416] flex gap-5 items-start hover:border-[rgba(232,153,62,0.15)] transition-colors duration-300"
            >
              <div className="text-[28px] shrink-0 w-[52px] h-[52px] flex items-center justify-center bg-[#1A1A1E] rounded-[14px]">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[17px] font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#8A8A8E] leading-[1.5]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          COMING SOON
      ================================================================ */}
      <section className="py-[120px] px-6 max-w-[1100px] mx-auto">
        <div className="p-[60px] rounded-3xl border border-white/[0.06] bg-[#141416] max-md:p-9">
          <div className="text-[13px] uppercase tracking-[0.12em] text-[#E8993E] font-semibold mb-4">
            Coming Soon
          </div>
          <h2 className="font-instrument text-[clamp(32px,5vw,52px)] font-normal tracking-[-0.02em] mb-5 leading-[1.1]">
            Where Colony is headed
          </h2>
          <p className="text-base text-[#8A8A8E] leading-[1.7] max-w-[640px] mb-10">
            Colony already runs your business behind the scenes. These are the
            next layers we&apos;re building.
          </p>

          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            <div className="p-7 rounded-[14px] bg-[#1A1A1E] border border-white/[0.06]">
              <h4 className="text-[15px] font-semibold mb-2.5 text-[#C9A84C]">
                Honeycomb Ad Platform
              </h4>
              <p className="text-sm text-[#8A8A8E] leading-relaxed">
                Local businesses pay to advertise on your website. A plumber on a
                real estate agent&apos;s page. A florist on a
                photographer&apos;s site. You earn revenue from traffic
                you&apos;re already getting.
              </p>
            </div>
            <div className="p-7 rounded-[14px] bg-[#1A1A1E] border border-white/[0.06]">
              <h4 className="text-[15px] font-semibold mb-2.5 text-[#C9A84C]">
                LLM Ads Platform
              </h4>
              <p className="text-sm text-[#8A8A8E] leading-relaxed">
                Get your business recommended by AI. Colony places your services
                directly into large language model responses so when someone asks
                AI for help, you show up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          WAITLIST
      ================================================================ */}
      <section id="pricing" className="py-[120px] px-6 max-w-[1100px] mx-auto text-center">
        <div className="max-w-[560px] mx-auto">
          <div className="text-[13px] uppercase tracking-[0.12em] text-[#E8993E] font-semibold mb-4">
            Early Access
          </div>
          <h2 className="font-instrument text-[clamp(32px,5vw,52px)] font-normal tracking-[-0.02em] mb-5 leading-[1.1]">
            Get in early
          </h2>
          <p className="text-base text-[#8A8A8E] leading-[1.7] mb-10">
            Colony is currently in development. Join the waitlist now and lock in
            founding member pricing when we launch. Founding members get priority
            access, direct input on features, and a rate that never goes up.
          </p>
          <button
            onClick={openWaitlist}
            className="inline-block bg-[#E8993E] text-[#0C0C0E] px-9 py-4 rounded-xl text-base font-semibold hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(232,153,62,0.3)] transition-all duration-200"
          >
            Join the Waitlist
          </button>
          <p className="mt-5 text-[13px] text-[#5A5A5E]">
            No credit card. No commitment. Just a seat saved.
          </p>
        </div>
      </section>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer className="px-10 py-10 border-t border-white/[0.06] flex items-center justify-between max-w-[1100px] mx-auto max-md:flex-col max-md:gap-3 max-md:text-center">
        <div className="text-[13px] text-[#5A5A5E]">
          &copy; 2026 Colony &middot; Built by{' '}
          <Link
            href="/"
            className="text-[#8A8A8E] no-underline hover:text-[#F2F0ED] transition-colors"
          >
            Jersey Proper
          </Link>
        </div>
        <div className="text-[13px] text-[#5A5A5E]">
          <a
            href="mailto:michael@jerseyproper.com"
            className="text-[#5A5A5E] no-underline hover:text-[#8A8A8E] transition-colors"
          >
            michael@jerseyproper.com
          </a>
        </div>
      </footer>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  )
}
