import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { postsQuery, categoriesQuery } from '@/sanity/lib/queries'
import BlogCard from '@/components/BlogCard'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | Jersey Proper',
  description: 'Insights on branding, web design, and growing your business with premium digital experiences.',
  openGraph: {
    title: 'Blog | Jersey Proper',
    description: 'Insights on branding, web design, and growing your business with premium digital experiences.',
  },
}

async function getPosts() {
  const posts = await client.fetch(postsQuery)
  return posts
}

async function getCategories() {
  const categories = await client.fetch(categoriesQuery)
  return categories
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  return (
    <main className="min-h-screen bg-jp-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/texture.png')] bg-repeat" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-primary" />
            <span className="section-label">Insights</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-primary" />
          </div>
          
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider text-center">
            <span className="gold-text">The Journal</span>
          </h1>
          
          <p className="mt-6 text-center text-cream/70 max-w-2xl mx-auto text-lg">
            Thoughts on building premium brands, designing websites that convert, and growing businesses that stand out.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, index: number) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="relative inline-block">
                {/* Corner ornaments */}
                <div className="absolute -top-4 -left-4 w-6 h-6 border-t border-l border-gold-primary/40" />
                <div className="absolute -top-4 -right-4 w-6 h-6 border-t border-r border-gold-primary/40" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b border-l border-gold-primary/40" />
                <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r border-gold-primary/40" />
                
                <div className="px-12 py-8">
                  <p className="font-heading text-2xl uppercase tracking-wider text-cream/60 mb-4">
                    Coming Soon
                  </p>
                  <p className="text-cream/50">
                    We're crafting our first articles. Check back soon for insights on branding and digital strategy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
