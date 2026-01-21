# Jersey Proper

Premium boutique studio website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- Premium brand design system with antique gold and deep green color palette
- Fully responsive design optimized for all devices
- Subtle animations using Framer Motion
- SEO optimized with metadata, sitemap, and robots.txt
- Production-ready and Vercel-deployable

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Bodoni Moda (serif), Inter (sans-serif) via Google Fonts

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

### Deployment

This project is optimized for Vercel deployment:

1. Push to your repository
2. Import project in Vercel
3. Deploy with default settings

## Project Structure

```
jersey-proper/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── privacy/           # Privacy policy
│   ├── process/           # Process page
│   ├── services/          # Services page
│   ├── terms/             # Terms of service
│   ├── work/              # Portfolio/work page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.ts          # SEO robots file
│   └── sitemap.ts         # SEO sitemap
├── components/            # Reusable components
│   ├── Button.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   └── Navigation.tsx
├── lib/                   # Utilities
│   └── utils.ts
└── public/                # Static assets

```

## Brand Guidelines

### Colors

- Black Green: `#0A100D` (primary background)
- Deep Green: `#0D1A14`
- Rich Green: `#152E23`
- Gold Primary: `#C4A24D` (accent color)
- Gold Light: `#E2C978`
- Gold Shadow: `#8A7434`
- Cream: `#F5F2EB` (text color)

### Typography

- **Headlines**: Bodoni Moda (serif) with wide letter spacing
- **Body**: Inter (sans-serif) with light weight

### Design Principles

- Old money aesthetic: Louis Vuitton restraint, high-end bourbon label, private members club
- Minimal animations: subtle fades and slides only
- Large negative space
- Premium, confident tone
- No fake testimonials or metrics

## License

© 2026 Jersey Proper. All rights reserved.