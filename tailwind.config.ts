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
        'black-green': '#0A100D',
        'deep-green': '#0D1A14',
        'rich-green': '#152E23',
        'mid-green': '#1E3F2F',
        'gold-primary': '#C4A24D',
        'gold-light': '#E2C978',
        'gold-shadow': '#8A7434',
        'gold-highlight': '#F0DDA0',
        'cream': '#F5F2EB',
      },
      fontFamily: {
        'bodoni': ['"Bodoni Moda"', 'Georgia', 'serif'],
        'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'jersey': '0.18em',
        'proper': '0.55em',
      },
    },
  },
  plugins: [],
}

export default config
