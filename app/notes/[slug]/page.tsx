import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, relatedPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import PortableText from '@/components/PortableText'
import BlogCard from '@/components/BlogCard'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const post = await client.fetch(postBySlugQuery, { slug })
  return post
}

async function getRelatedPosts(currentId: string, categoryIds: string[]) {
  if (!categoryIds || categoryIds.length === 0) return []
  const posts = await client.fetch(relatedPostsQuery, { currentId, categoryIds })
  return posts
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Jersey Proper',
    }
  }

  return {
    title: `${post.title} | Jersey Proper Notes`,
    description: post.excerpt || `Read ${post.title} on Jersey Proper Notes.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const categoryIds = post.categories?.map((cat: any) => cat._id) || []
  const relatedPosts = await getRelatedPosts(post._id, categoryIds)

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-jp-black">
      <Navigation />

      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-cream/60 hover:text-gold-primary transition-colors duration-300 mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm uppercase tracking-wider">Back to Notes</span>
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {post.categories.map((category: any) => (
                  <span
                    key={category._id}
                    className="text-xs font-heading uppercase tracking-widest text-gold-primary px-3 py-1 border border-gold-primary/30 rounded-sm"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl uppercase tracking-wider leading-tight">
              <span className="gold-text">{post.title}</span>
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gold-primary/20">
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold-primary/30">
                      <Image
                        src={urlFor(post.author.image).width(80).height(80).url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-cream text-sm">{post.author.name}</p>
                    <p className="text-cream/50 text-xs">Author</p>
                  </div>
                </div>
              )}

              {/* Date */}
              <div className="text-cream/60 text-sm">
                <span className="text-cream/40 mr-2">Published</span>
                {formattedDate}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="relative aspect-[16/9] mb-12 overflow-hidden rounded-sm border border-gold-primary/20">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold-primary/40" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold-primary/40" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold-primary/40" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold-primary/40" />
            </div>
          )}

          {/* Body Content */}
          <div className="prose-custom">
            {post.body && <PortableText value={post.body} />}
          </div>

          {/* Author Bio */}
          {post.author && post.author.bio && (
            <div className="mt-16 p-8 bg-jp-deep border border-gold-primary/20 rounded-sm relative">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-primary/30" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-primary/30" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-primary/30" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-primary/30" />

              <div className="flex flex-col md:flex-row gap-6 items-start">
                {post.author.image && (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold-primary/30 flex-shrink-0">
                    <Image
                      src={urlFor(post.author.image).width(160).height(160).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-heading text-lg uppercase tracking-wider text-gold-primary mb-2">
                    About the Author
                  </p>
                  <p className="font-heading text-xl text-cream mb-3">{post.author.name}</p>
                  <p className="text-cream/70 leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-20 bg-jp-deep">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-primary/30" />
              <h2 className="font-heading text-2xl uppercase tracking-wider text-cream">
                Related Articles
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-primary/30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post: any, index: number) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
