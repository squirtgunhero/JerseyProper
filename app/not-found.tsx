import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-jp-black"
      style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}
    >
      <div className="text-center px-8">
        <h1 className="text-[6rem] font-light text-cream mb-4">404</h1>
        <p className="text-cream/80 mb-8">This page could not be found.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 border border-gold text-gold no-underline uppercase tracking-widest text-sm hover:bg-gold hover:text-jp-black transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
