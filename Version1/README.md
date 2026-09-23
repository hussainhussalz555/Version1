# Version1

A Next.js storefront for BATHAE.

## Deploying this repository to Vercel

This repository keeps the Next.js application in the `Version1` directory. When importing **this** repository, set Vercel's **Root Directory** to `Version1` so it can find `package.json`.

The storefront currently uses local product data and a demo, browser-only checkout. PostgreSQL is used only by `GET /api/health`. The database connection is initialized on demand, so a missing `DATABASE_URL` no longer prevents `next build` or deployment. The health endpoint returns HTTP `503` until a database is configured and reachable.

To enable the database health check in Vercel:

1. Provision a PostgreSQL database with a connection URL that is reachable from Vercel.
2. In **Project Settings → Environment Variables**, add `DATABASE_URL` for the environments you use (Production, Preview, and/or Development).
3. Redeploy so the setting is applied.

Keep the connection URL private; do not commit it to the repository. The local URL in `drizzle.config.json` is for local tooling and is not a production database URL.
