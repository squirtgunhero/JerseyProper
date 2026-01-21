'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/Button'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin by understanding your business, your customers, and your constraints. No assumptions. No templates. Just clarity.',
    details: [
      'Business goals and success metrics',
      'Target audience and user research',
      'Competitive landscape analysis',
      'Technical requirements and constraints',
    ],
  },
  {
    number: '02',
    title: 'Design',
    description: 'We translate insights into visual systems and interfaces that communicate value and build trust.',
    details: [
      'Brand and visual identity development',
      'Information architecture and user flows',
      'High-fidelity design and prototyping',
      'Iterative feedback and refinement',
    ],
  },
  {
    number: '03',
    title: 'Build',
    description: 'We develop using modern, maintainable technologies. Clean code. Thorough testing. No shortcuts.',
    details: [
      'Full-stack development',
      'Responsive, accessible, performant',
      'Third-party integrations',
      'Quality assurance and testing',
    ],
  },
  {
    number: '04',
    title: 'Launch',
    description: 'We deploy to production, monitor performance, and ensure a smooth transition to your team.',
    details: [
      'Deployment and configuration',
      'Performance monitoring',
      'Team training and documentation',
      'Post-launch optimization',
    ],
  },
  {
    number: '05',
    title: 'Support',
    description: 'We remain available for ongoing maintenance, updates, and strategic guidance as your needs evolve.',
    details: [
      'Ongoing maintenance and updates',
      'Performance monitoring',
      'Feature additions',
      'Strategic consulting',
    ],
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl md:text-5xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
              Process
            </h1>
            <p className="text-lg md:text-xl text-cream/70 font-light leading-relaxed max-w-2xl mx-auto">
              A calm, deliberate approach to building digital systems that last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="pb-16 px-6 lg:px-8">
        <motion.div
          {...fadeIn}
          className="max-w-3xl mx-auto"
        >
          <div className="border border-gold-primary/20 bg-rich-green/10 p-8 md:p-12">
            <p className="text-cream/70 font-light leading-relaxed mb-4">
              We do not operate on arbitrary timelines or artificial urgency. Good work takes the time it takes.
            </p>
            <p className="text-cream/70 font-light leading-relaxed">
              Our process is designed to produce clarity, quality, and alignment at every stage. No surprises. No cutting corners.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid md:grid-cols-5 gap-8 border-t border-gold-primary/10 pt-12"
            >
              <div className="md:col-span-2">
                <div className="text-5xl md:text-6xl font-bodoni font-medium text-gold-primary/20 mb-4">
                  {step.number}
                </div>
                <h2 className="text-2xl md:text-3xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                  {step.title}
                </h2>
              </div>

              <div className="md:col-span-3 space-y-6">
                <p className="text-cream/80 font-light leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-cream/70 font-light text-sm">
                      <div className="h-1 w-1 rotate-45 bg-gold-primary/60 mt-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8 border-t border-gold-primary/10">
        <motion.div
          {...fadeIn}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
            Ready to Start?
          </h2>
          <p className="text-cream/70 font-light mb-8 leading-relaxed">
            Schedule a call to discuss your project and see if we are a good fit.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">Get in Touch</Button>
          </Link>
        </motion.div>
      </section>
    </>
  )
}
