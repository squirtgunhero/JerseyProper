// Load environment variables from .env.local
import { config } from "dotenv";
config({ path: ".env.local", quiet: true });

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // Use non-pooling URL for migrations
    url: env("POSTGRES_URL_NON_POOLING"),
  },
});
