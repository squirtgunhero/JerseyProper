# Jersey Proper

Premium creative studio website with integrated AEO (Answer Engine Optimization) Analyzer.

## Features

- **Marketing Website**: Premium boutique creative studio presence
- **Notes/Blog**: Sanity CMS-powered content management
- **AEO Analyzer**: Deterministic content auditing for AI discoverability

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (local via Docker or Vercel Postgres)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start development server
npm run dev
```

## AEO Analyzer

The AEO Analyzer audits web pages for Answer Engine Optimization, providing actionable insights to improve AI discoverability without using any LLM/OpenAI calls.

### Features

- **Deterministic Analysis**: 100% rule-based scoring
- **Six Module Scoring**: Answer-ability, Entity clarity, Trust & evidence, Structured data, Retrieval & accessibility, Citation likelihood
- **Query Fit Analysis**: Optional query-specific analysis
- **Abuse Prevention**: IP rate limiting and domain limits

### Configuration

All AEO configuration is via environment variables with safe defaults:

| Variable | Default | Description |
|----------|---------|-------------|
| `AEO_RATE_LIMIT_PER_HOUR` | 10 | Max scans per IP per hour |
| `AEO_DOMAIN_LIMIT_PER_DAY` | 50 | Max scans per domain per day |
| `AEO_FETCH_TIMEOUT_MS` | 12000 | Fetch timeout in milliseconds |
| `AEO_RENDER_TIMEOUT_MS` | 15000 | Playwright render timeout |
| `AEO_MAX_HTML_BYTES` | 2000000 | Max HTML size (2MB) |
| `AEO_MAX_TEXT_CHARS` | 200000 | Max extracted text characters |
| `AEO_MAX_REDIRECTS` | 5 | Max redirects to follow |
| `AEO_IP_HASH_SALT` | (required in prod) | Salt for IP hashing |

### Security

- **IP Privacy**: IPs are never stored. Only SHA-256 hashes with a salt are persisted.
- **Rate Limiting**: Prevents abuse via per-IP and per-domain limits.
- **Size Guards**: Protects against large pages and slow fetches.

### Generating the IP Hash Salt

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Database

### Local Development

Use Docker Compose for local PostgreSQL:

```bash
docker compose up -d
```

### Production (Vercel Postgres)

1. Create a Postgres database in Vercel Dashboard
2. Copy the connection strings to your environment variables
3. Run migrations: `npm run db:push`

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (watch mode) |
| `npm run test:run` | Run tests once |
| `npm run db:push` | Push schema to database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:studio` | Open Prisma Studio |

## Environment Variables

See `.env.example` for all available configuration options.

### Required for Production

- `POSTGRES_PRISMA_URL` - Pooled database connection
- `POSTGRES_URL_NON_POOLING` - Direct database connection
- `AEO_IP_HASH_SALT` - Salt for IP hashing (security requirement)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database**: PostgreSQL via Prisma
- **CMS**: Sanity.io
- **Deployment**: Vercel

## License

Private - All rights reserved.
