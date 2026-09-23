# Product images & logo — how to upload them

Everything the storefront shows comes from the **`Version1/public/`** folder.
GitHub keeps those files, Vercel serves them, and the site points at them by
name. You never need to touch a database or a CDN: **drop a file in the right
folder with the right name and it appears on the site.**

> Folder to remember: **`Version1/public/`**
> Photos: `Version1/public/products/` · Logo: `Version1/public/logo.png`

---

## 1. The file names the site is expecting right now

Every image has one exact "slot". Keep the name identical and you don't have to
change any code.

| What it shows | File to upload | Appears on |
| --- | --- | --- |
| Brand logo | `public/logo.png` | Header on every page |
| Fallback image | `public/placeholder.png` | Anywhere a photo is missing (already provided) |
| Product photo 1 | `public/products/product1.png` | Product "Full Concealed Bathroom Set … (Matte Black)", home page hero |
| Product photo 2 | `public/products/product2.png` | Product "… (Brushed Gold)", home page showcase section |
| Product photo 3 | `public/products/product3.png` | Product "… (Polished Chrome)" |
| Product photos 4–6 | *(reuse 1–3 for now)* | Vanity Unit, Counter Basin, Angle Valve Set |

Products 4, 5 and 6 currently reuse photos 1–3. To give them their own photos,
see **section 5**.

Home page hero and showcase images point at `product1.png` / `product2.png` as
well — `src/lib/images.ts` explains where to change that if you want different
images there.

---

## 2. Upload the easy way (GitHub website, no tools needed)

1. **Rename the files on your computer first.** GitHub cannot rename or move an
   image file in the browser, so it must be named correctly *before* it is
   uploaded. Rename your photos to exactly:
   `product1.png`, `product2.png`, `product3.png` (lowercase, no spaces),
   and your logo to `logo.png`.
2. Open your repository on GitHub:
   `https://github.com/hussainhussalz555/Version1`
3. Go to the folder `Version1` → `public` → `products`.
4. Click **Add file ▾ → Upload files** (top right of the file list).
5. Drag your renamed photos into the page. If a file with that name already
   exists, your upload **replaces** it — that is exactly how you swap an image.
6. Scroll to **Commit changes**, write a short message such as
   `Add real product photos`, keep **Commit directly to the `main` branch**,
   then click **Commit changes**.
7. Repeat once for the logo: go to `Version1/public`, **Add file → Upload
   files**, upload `logo.png`, commit.
8. Vercel deploys automatically on every commit to `main`. Open your project →
   **Deployments** and wait for the new deployment to show **Ready** (~1 minute),
   then refresh your site.

**Working on a branch instead?** In step 6 choose *Create a new branch for this
commit and start a pull request*. Its preview will show the new images before
you merge.

### Uploading with Git instead (for a developer)

```bash
git clone https://github.com/hussainhussalz555/Version1.git
cd Version1/Version1/public          # the public folder lives inside Version1/
cp ~/my-photos/product1.png products/product1.png
cp ~/my-photos/product2.png products/product2.png
cp ~/my-photos/product3.png products/product3.png
cp ~/my-logo/logo.png       logo.png
cd ../..
git add public
git commit -m "Add real product photos and logo"
git push
```

---

## 3. What your files should look like

**Product photos**

- Square (**1:1**) — the cards and gallery crop to a square, so other shapes get
  trimmed. `1200 × 1200` is ideal.
- **PNG, JPG or WebP**. Prefer `.webp` or `.jpg` for real camera photos —
  they are much smaller than PNG and load faster.
- Keep each file **under about 500 KB** (compress at
  [squoosh.app](https://squoosh.app) if needed). Large files slow the site down.
- Lowercase names, numbers and dashes only — no spaces, no `%`, no `#`.
  `Product 1 (final).PNG` will not work; `product1.png` will.

**Logo**

- Must be named `logo.png` and sit directly in `public/` (`public/logo.png`).
  The header looks for exactly that path.
- **Transparent background**, dark/neutral artwork — the header is light beige.
- Wide format around **3:1** (for example `600 × 200`), at least 120 px tall so
  it stays sharp on retina screens. It is displayed at 40 px tall with
  automatic width.
- Until the file exists, the header automatically shows the brand name as text,
  so the site is never broken in the meantime.

---

## 4. Replaced an image but the old one still shows?

Images in `public/` keep the same URL even after you replace the file, so
caches may hand you the old copy for a while.

1. Hard-refresh the page (`Ctrl + Shift + R`, or `Cmd + Shift + R` on Mac).
2. Check the deployment actually finished: Vercel → **Deployments** → newest is
   **Ready**. If it isn't, your commit may not have reached `main`.
3. Force a clean rebuild: Vercel → **Deployments** → newest → **⋯** →
   **Redeploy** → **uncheck** *Use existing Build Cache* → **Redeploy**.
4. Still stuck? Rename the file to something new (for example
   `product1-v2.png`) and update the path in `src/lib/images.ts` — a brand-new
   URL is never cached.

`next.config.ts` sets `images.minimumCacheTTL` to 1 hour, which limits how long
optimized copies live.

---

## 5. Using your own file names (for example `product4.png`, `.jpg` or `.webp`)

Three small edits. All of them happen in code, never in the images themselves.

1. **Upload the file** to `public/products/`, e.g. `public/products/product4.png`.
2. **Register the path** in `src/lib/images.ts`:

   ```ts
   products: {
     product1: "/products/product1.png",
     product2: "/products/product2.png",
     product3: "/products/product3.png",
     product4: "/products/product4.png", // <- new line
   },
   ```

   The path is the file location with the word `public` removed, always starting
   with `/`. So `public/products/product4.png` → `"/products/product4.png"`.
   Uploaded a `.jpg` or `.webp` instead? Just write that extension here — that is
   the only place the file name is stored.
3. **Use it on a product** in `src/data/products.ts`:

   ```ts
   images: [photo.product4, photo.product1, photo.product3], // first one is the main image
   sequenceFrames: [photo.product4, photo.product2, photo.product3],
   ```

   The first entry of `images` is the photo shown on cards, in the cart and in
   quick view. Add as many others as you like — the product page turns them into
   thumbnails automatically. `sequenceFrames` powers the scroll animation, and
   `Product.images` is the only field that requires images.

Commit, and Vercel redeploys. Add the logo under a different name the same way,
by changing `logo` in `src/lib/images.ts`.

---

## 6. Missing images

If a file is renamed, deleted, or not uploaded yet, no broken image icon is
shown: the component `src/components/safe-image.tsx` automatically displays
`public/placeholder.png` ("Image coming soon") instead. You can drop in your own
placeholder artwork with that exact name at any time.

---

## 7. Troubleshooting

| Problem | Fix |
| --- | --- |
| Image shows "Image coming soon" | File name or extension doesn't match the slot. Check spelling and the `.png`/`.jpg` extension, and that the path starts with `/` in `src/lib/images.ts`. |
| Image appears in the GitHub folder but not on the site | The commit may still be deploying, or the case is wrong: `/products/Product1.png` ≠ `/products/product1.png`. |
| Image is only visible locally | You didn't commit/push the file — `git status` shows untracked images. |
| Logo still shows the brand text | The file isn't at exactly `public/logo.png` yet (the header falls back to text). |
| Upload interrupted with `this exceeds GitHub's file size limit` | Keep files under 100 MB, ideally under 500 KB. |
| Picture is cropped oddly | It isn't square. Re-export it as 1:1. |
| JPEG file on macOS is `.jpeg` or `.JPG` | Rename it to lowercase `.jpg`, or write the exact name in `src/lib/images.ts`. |
| Drag-and-dropping a folder didn't keep `products/` | Drag the folder itself (not its contents) onto the GitHub upload page. |

---

## 8. Where the paths live in code

| File | Purpose |
| --- | --- |
| `src/lib/images.ts` | All image paths in one place (logo, placeholder, product photos). Edit this when you rename a file. |
| `public/` | The actual image files. Nothing else is needed for them to be public. |
| `src/components/safe-image.tsx` | Wraps `next/image`; shows the placeholder when a file is missing. |
| `src/data/products.ts` | Which photos each product uses. |
| `next.config.ts` | Image caching (`minimumCacheTTL`). |
