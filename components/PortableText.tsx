'use client'

import { PortableText as PortableTextComponent } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <figure className="my-8">
          <div className="relative overflow-hidden rounded-sm border border-gold-primary/20">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || 'Blog image'}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-cream/60 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-wider text-gold-primary mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-heading text-xl md:text-2xl uppercase tracking-wider text-cream mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-heading text-lg uppercase tracking-wider text-cream/90 mt-8 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-cream/80 leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 pl-6 border-l-2 border-gold-primary italic text-cream/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-cream">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => (
      <span className="underline decoration-gold-primary/50">{children}</span>
    ),
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined
      return (
        <Link
          href={value?.href || '#'}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-gold-primary hover:text-gold-light transition-colors duration-300 underline decoration-gold-primary/30 hover:decoration-gold-primary"
        >
          {children}
        </Link>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-6 space-y-2 list-none">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 space-y-2 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-cream/80 pl-4 relative before:content-['◆'] before:absolute before:left-0 before:text-gold-primary before:text-xs">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-cream/80">{children}</li>
    ),
  },
}

interface PortableTextProps {
  value: any[]
}

export default function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />
}
