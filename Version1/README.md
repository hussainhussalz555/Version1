# Version1

A Next.js storefront for BATHAE.

## Uploading product images and the logo

Every image is served from the [`public`](./public) folder, so uploading a file
with the right name is all it takes.

| Upload this file | To replace |
| --- | --- |
| `public/products/product1.png` | Product 1 photo (also the home page hero) |
| `public/products/product2.png` | Product 2 photo (also the home page showcase) |
| `public/products/product3.png` | Product 3 photo |
| `public/logo.png` | Brand logo in the header (falls back to text until uploaded) |
| `public/placeholder.png` | The "Image coming soon" graphic shown for missing photos |

On GitHub: open `Version1/public/products` → **Add file → Upload files** → drag
the photos in (rename them to `product1.png` etc. *before* uploading, because the
browser cannot rename image files) → **Commit changes**. Vercel redeploys
automatically.

Paths are centralised in [`src/lib/images.ts`](./src/lib/images.ts) — change a
value there to use a different file name, extension, or sub-folder. A missing
image never renders as broken; [`src/components/safe-image.tsx`](./src/components/safe-image.tsx)
swaps in `public/placeholder.png`.

**Full step-by-step guide:** [`docs/product-images.md`](./docs/product-images.md)

## Deploying this repository to Vercel

This repository keeps the Next.js application in the `Version1` directory. When importing **this** repository, set Vercel's **Root Directory** to `Version1` so it can find `package.json`.

The storefront currently uses local product data and a demo, browser-only checkout. PostgreSQL is used only by `GET /api/health`. The database connection is initialized on demand, so a missing `DATABASE_URL` no longer prevents `next build` or deployment. The health endpoint returns HTTP `503` until a database is configured and reachable.

To enable the database health check in Vercel:

1. Provision a PostgreSQL database with a connection URL that is reachable from Vercel.
2. In **Project Settings → Environment Variables**, add `DATABASE_URL` for the environments you use (Production, Preview, and/or Development).
3. Redeploy so the setting is applied.

Keep the connection URL private; do not commit it to the repository. The local URL in `drizzle.config.json` is for local tooling and is not a production database URL.
