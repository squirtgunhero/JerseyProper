'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/Button'

const services = [
  {
    title: 'Brand and Website',
    slug: 'brand-website',
    intro: 'Your brand is not a logo. It is the sum total of every interaction, every impression, every moment of trust earned or lost.',
    description: 'We build visual systems and digital experiences that communicate who you are before a single word is read.',
    deliverables: [
      'Visual identity and logo system',
      'Brand guidelines and design standards',
      'Custom website design and development',
      'Responsive, performant, accessible',
      'Content strategy and copywriting support',
    ],
    outcomes: [
      'Increased perceived value and trust',
      'Consistent brand presence across touchpoints',
      'Higher conversion rates',
      'Reduced customer acquisition costs',
    ],
  },
  {
    title: 'UI and Product Design',
    slug: 'ui-product-design',
    intro: 'Good design is invisible. Great design earns trust, reduces friction, and generates revenue.',
    description: 'We design interfaces that feel intuitive, look refined, and serve your business objectives without compromise.',
    deliverables: [
      'User research and competitive analysis',
      'Information architecture and user flows',
      'High-fidelity interface designs',
      'Interactive prototypes',
      'Design system and component library',
    ],
    outcomes: [
      'Reduced support costs through better UX',
      'Higher user engagement and retention',
      'Faster feature development',
      'Scalable design operations',
    ],
  },
  {
    title: 'Lead Generation Systems',
    slug: 'lead-generation',
    intro: 'Most businesses leave money on the table because their lead generation is reactive, manual, or nonexistent.',
    description: 'We build automated systems that qualify prospects, nurture relationships, and fill your pipeline while you focus on closing deals.',
    deliverables: [
      'Custom lead capture and qualification systems',
      'CRM integration and workflow automation',
      'Email nurture sequences',
      'Landing page design and optimization',
      'Analytics and reporting dashboards',
    ],
    outcomes: [
      'Predictable, qualified pipeline',
      'Reduced sales cycle length',
      'Higher close rates',
      'Improved ROI on marketing spend',
    ],
  },
  {
    title: 'Custom App Builds',
    slug: 'custom-apps',
    intro: 'Off-the-shelf software is designed for everyone. Which means it serves no one particularly well.',
    description: 'We build internal tools and customer-facing applications tailored to your specific processes, constraints, and goals.',
    deliverables: [
      'Full-stack web application development',
      'API design and backend infrastructure',
      'Database architecture and optimization',
      'Third-party integrations',
      'Ongoing maintenance and support',
    ],
    outcomes: [
      'Streamlined operations and reduced overhead',
      'Competitive advantage through custom tooling',
      'Better data insights and decision-making',
      'Scalable infrastructure as you grow',
    ],
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl md:text-5xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
              Services
            </h1>
            <p className="text-lg md:text-xl text-cream/70 font-light leading-relaxed max-w-2xl mx-auto">
              Comprehensive design, development, and growth services for businesses that refuse to settle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: index * 0.1 }}
              className="border-t border-gold-primary/20 pt-12"
            >
              <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-2">
                  <h2 className="text-2xl md:text-3xl font-bodoni font-medium text-gold-primary mb-4 tracking-wide">
                    {service.title}
                  </h2>
                  <p className="text-cream/60 font-light italic leading-relaxed">
                    {service.intro}
                  </p>
                </div>

                <div className="md:col-span-3 space-y-8">
                  <div>
                    <p className="text-cream/80 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bodoni tracking-wider uppercase text-gold-primary mb-3">
                      What You Get
                    </h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-cream/70 font-light">
                          <div className="h-1 w-1 rotate-45 bg-gold-primary/60 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bodoni tracking-wider uppercase text-gold-primary mb-3">
                      Business Impact
                    </h3>
                    <ul className="space-y-2">
                      {service.outcomes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-cream/70 font-light">
                          <div className="h-1 w-1 rotate-45 bg-gold-primary/60 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
            Let&apos;s Discuss Your Project
          </h2>
          <p className="text-cream/70 font-light mb-8 leading-relaxed">
            Schedule a call to discuss how we can help you achieve your goals.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">Get Started</Button>
          </Link>
        </motion.div>
      </section>
    </>
  )
}
