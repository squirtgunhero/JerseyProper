'use client'

import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

const placeholders = [
  {
    category: 'Brand and Website',
    title: 'Coming Soon',
    description: 'Selected case studies will be published as projects complete.',
  },
  {
    category: 'Lead Generation',
    title: 'Coming Soon',
    description: 'Selected case studies will be published as projects complete.',
  },
  {
    category: 'Custom Application',
    title: 'Coming Soon',
    description: 'Selected case studies will be published as projects complete.',
  },
  {
    category: 'UI Design',
    title: 'Coming Soon',
    description: 'Selected case studies will be published as projects complete.',
  },
]

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl md:text-5xl font-bodoni font-medium text-gradient-gold mb-6 tracking-wide uppercase">
              Work
            </h1>
            <p className="text-lg md:text-xl text-cream/70 font-light leading-relaxed max-w-2xl mx-auto">
              Selected case studies and project highlights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {placeholders.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[4/3] border border-gold-primary/20 bg-rich-green/10 hover:bg-rich-green/20 hover:border-gold-primary/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="text-xs font-bodoni tracking-wider uppercase text-gold-primary/60 mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-bodoni font-medium text-gold-primary/80 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream/50 font-light max-w-xs">
                    {item.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 h-2 w-2 rotate-45 bg-gold-primary/20 group-hover:bg-gold-primary/40 transition-colors" />
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-cream/60 font-light">
              We prioritize client confidentiality. Case studies are published with permission only.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
