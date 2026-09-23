/**
 * Every image on the site is loaded from the `public` folder.
 *
 * How a path works:
 *   file on disk     ->  public/products/product1.png
 *   path used in code ->  "/products/product1.png"
 *
 * So the value is always the file name with the `public` part removed and a
 * leading slash added.
 *
 * Uploading your own photos: drop them into `Version1/public/...` using the
 * file names listed below, and the whole site picks them up automatically.
 * Nothing else has to change. See `docs/product-images.md` for the full guide.
 *
 * Using different file names (or .jpg / .webp): change only the value here,
 * for example:
 *   product1: "/products/my-shower-photo.jpg"
 *   logo: "/brand/my-logo.png"
 */
export const IMAGES = {
  /** Brand logo shown in the site header. The header falls back to text if missing. */
  logo: "/logo.png",

  /** Shown automatically whenever a photo is missing, so visitors never see a broken image. */
  placeholder: "/placeholder.png",

  /** Large photo in the home page hero section. */
  homeHero: "/products/product1.png",

  /** Large photo in the home page "Premium Showcase" section. */
  homeShowcase: "/products/product2.png",

  /** Product photos that live in `public/products/`. */
  products: {
    product1: "/products/product1.png",
    product2: "/products/product2.png",
    product3: "/products/product3.png",
  },
} as const;
