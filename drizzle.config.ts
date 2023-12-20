import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: "postgresql://user:password@localhost:5432/db",
  },
} satisfies Config;
