'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from '@/components/Logo'
import Button from '@/components/Button'

const services = [
  {
    title: 'Brand and Website',
    description: 'Visual systems and digital experiences that earn trust and generate revenue.',
    features: ['Visual Identity', 'Website Design', 'Brand Guidelines'],
  },
  {
    title: 'UI and Product Design',
    description: 'Interfaces that feel intuitive, look refined, and serve your business objectives.',
    features: ['User Interface Design', 'Product Strategy', 'Design Systems'],
  },
  {
    title: 'Lead Generation Systems',
    description: 'Automated systems that qualify prospects and fill your pipeline while you sleep.',
    features: ['Marketing Automation', 'CRM Integration', 'Conversion Optimization'],
  },
  {
    title: 'Custom App Builds',
    description: 'Internal tools and customer-facing applications built to last.',
    features: ['Web Applications', 'Internal Tools', 'API Development'],
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-radial from-rich-green/20 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <Logo variant="stacked" size="lg" className="mb-12" />
          </motion.div>

          <motion.h1
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl font-inter font-light text-cream/90 mb-8 leading-relaxed"
          >
            Premium digital experiences for businesses that refuse to blend in.
          </motion.h1>

          <motion.p
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.3 }}
            className="text-base md:text-lg text-cream/60 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We design and build digital systems that earn trust. Fewer clients. Better work.
          </motion.p>

          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <Button variant="primary" size="lg">Start a Project</Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" size="lg">View Services</Button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 opacity-40">
            <div className="h-1 w-1 rotate-45 bg-gold-primary" />
            <div className="h-12 w-px bg-gradient-to-b from-gold-primary to-transparent" />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 lg:px-8 border-t border-gold-primary/10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-primary/30" />
              <div className="h-1 w-1 rotate-45 bg-gold-primary" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-primary/30" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bodoni font-medium text-gradient-gold text-center mb-12 tracking-wide uppercase">
              Built Properly, From the Start
            </h2>

            <div className="space-y-6 text-cream/70 font-light leading-relaxed">
              <p>
                Most businesses treat their digital presence as an afterthought. A checkbox. Something to delegate to the lowest bidder.
              </p>
              <p>
                Jersey Proper exists for the ones who understand that your website, your brand, and your systems are not expenses. They are investments in trust, clarity, and growth.
              </p>
              <p>
                We work with fewer clients. We ask better questions. We build things that last.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 lg:px-8 border-t border-gold-primary/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bodoni font-medium text-gradient-gold mb-4 tracking-wide uppercase">
              What We Do
            </h2>
            <p className="text-cream/60 font-light">
              Comprehensive services for businesses that value precision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 border border-gold-primary/20 bg-rich-green/20 hover:bg-rich-green/30 hover:border-gold-primary/40 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 h-2 w-2 rotate-45 bg-gold-primary/40 group-hover:bg-gold-primary transition-colors" />

                <h3 className="text-xl font-bodoni font-medium text-gold-primary mb-3 tracking-wide">
                  {service.title}
                </h3>

                <p className="text-cream/70 font-light mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-cream/60 font-light">
                      <div className="h-1 w-1 rotate-45 bg-gold-primary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/services">
              <Button variant="primary">View All Services</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 border-t border-gold-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
              Ready to Build Something Proper?
            </h2>
            <p className="text-cream/70 font-light mb-8 leading-relaxed">
              We work with businesses that value quality, clarity, and lasting results.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">Start a Conversation</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
