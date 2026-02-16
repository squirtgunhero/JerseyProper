import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-jp-black">
      {/* Background: very faint warm glow behind text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201, 168, 76, 0.03) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 px-6">
        {/* Big name */}
        <div className="hero-v2-fadein mb-7" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-cormorant text-[clamp(72px,11vw,150px)] font-light leading-[0.92] tracking-[-0.01em] uppercase">
            Jersey
            <br />
            <span className="text-[#C9A84C]">Proper</span>
          </h1>
        </div>

        {/* Tagline row */}
        <div
          className="hero-v2-fadein flex flex-row items-center justify-center gap-4 mb-10"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="font-dm-sans text-[13px] font-normal tracking-[0.2em] uppercase text-cream/35">
            Creative Studio
          </span>
          <span className="text-cream/15 tracking-normal">/</span>
          <span className="font-dm-sans text-[13px] font-normal tracking-[0.2em] uppercase text-[#C9A84C]/50">
            Product Lab
          </span>
          <span className="text-cream/15 tracking-normal">/</span>
          <span className="font-dm-sans text-[13px] font-normal tracking-[0.2em] uppercase text-cream/35">
            Growth Engine
          </span>
        </div>

        {/* Subtext */}
        <p
          className="hero-v2-fadein font-dm-sans text-[15px] font-light text-cream/45 max-w-[440px] mx-auto mb-[52px] leading-[1.7] tracking-[0.01em]"
          style={{ animationDelay: '0.7s' }}
        >
          We build products, tools, and digital experiences for businesses that
          move fast and refuse to settle.
        </p>

        {/* CTAs */}
        <div
          className="hero-v2-fadein flex gap-6 justify-center items-center max-md:flex-col max-md:w-full max-md:px-12"
          style={{ animationDelay: '0.9s' }}
        >
          <Link
            href="/products"
            className="px-11 py-[18px] border border-[#C9A84C]/45 text-[#C9A84C] bg-transparent font-dm-sans text-xs font-medium tracking-[0.18em] uppercase no-underline hover:bg-[#C9A84C]/[0.06] hover:border-[#C9A84C]/70 transition-all duration-300 max-md:w-full max-md:text-center"
          >
            See Our Products
          </Link>
          <a
            href="#contact"
            className="px-6 py-[18px] text-cream/35 font-dm-sans text-xs font-medium tracking-[0.18em] uppercase no-underline hover:text-cream/70 transition-colors duration-200"
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  )
}
