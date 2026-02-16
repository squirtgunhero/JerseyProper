import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds
        'jp-black': '#0A100D',
        'jp-deep': '#0D1A14',
        'jp-rich': '#152E23',
        'jp-mid': '#1E3F2F',
        // Gold palette
        'gold': '#C4A24D',
        'gold-light': '#E2C978',
        'gold-shadow': '#8A7434',
        'gold-highlight': '#F0DDA0',
        // Light
        'cream': '#F5F2E8',
      },
      fontFamily: {
        display: ['var(--font-bodoni)', 'serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', '-apple-system', 'sans-serif'],
        'instrument': ['var(--font-instrument-serif)', 'serif'],
        'cormorant': ['var(--font-cormorant)', 'serif'],
      },
      letterSpacing: {
        'luxury': '0.15em',
        'wide-luxury': '0.2em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
