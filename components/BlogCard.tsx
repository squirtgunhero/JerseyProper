'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'

interface BlogCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: any
    publishedAt: string
    author?: {
      name: string
      image?: any
    }
    categories?: Array<{
      _id: string
      title: string
      slug: { current: string }
    }>
  }
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug.current}`}>
        <div className="relative overflow-hidden rounded-sm border border-gold-primary/20 bg-jp-deep transition-all duration-500 hover:border-gold-primary/50">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(800).height(500).url()}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-jp-rich">
                <span className="font-heading text-gold-primary/30 text-2xl tracking-widest">
                  JP
                </span>
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-jp-black/80 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="text-xs font-heading uppercase tracking-widest text-gold-primary"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="font-heading text-xl md:text-2xl uppercase tracking-wider text-cream mb-3 group-hover:text-gold-primary transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-cream/70 text-sm leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-gold-primary/10">
              <span className="text-xs text-cream/50">{formattedDate}</span>
              {post.author && (
                <span className="text-xs text-cream/50">
                  By {post.author.name}
                </span>
              )}
            </div>
          </div>

          {/* Corner Ornaments */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-primary/30" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-primary/30" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-primary/30" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-primary/30" />
        </div>
      </Link>
    </motion.article>
  )
}
