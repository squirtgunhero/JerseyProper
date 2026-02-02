/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prefer modern formats for smaller file sizes
    formats: ['image/avif', 'image/webp'],
    // Optimize device sizes for common breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize image processing time
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce bundle size by not including source maps in production
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
