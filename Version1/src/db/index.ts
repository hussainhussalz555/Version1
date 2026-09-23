import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

let productionPool: Pool | undefined;

function getPool(databaseUrl: string) {
  if (process.env.NODE_ENV === "production") {
    productionPool ??= new Pool({ connectionString: databaseUrl });
    return productionPool;
  }

  globalForDb.__arenaNextJsPostgresqlPool ??= new Pool({
    connectionString: databaseUrl,
  });

  return globalForDb.__arenaNextJsPostgresqlPool;
}

/**
 * Resolve the database only when a request actually needs it. This keeps
 * Next.js builds and pages that do not use PostgreSQL deployable without a
 * DATABASE_URL, while still failing clearly when a database-backed feature is
 * called without one.
 */
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to use database-backed features.");
  }

  return drizzle(getPool(databaseUrl));
}
