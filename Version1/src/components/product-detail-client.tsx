"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductGallery } from "@/components/product-gallery";
import { Product3DViewer } from "@/components/product-3d-viewer";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { useCart } from "@/context/cart-context";

type Props = {
  product: Product;
};

export function ProductDetailClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const related = useMemo(
    () => products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3),
    [product.category, product.id],
  );

  const stockLabel = product.stock <= 0 ? "Out of Stock" : product.stock <= 3 ? `Only ${product.stock} left` : "In Stock";

  const waMessage = `Hi, I'm interested in ${product.name}. Can you provide more details?`;

  return (
    <>
      <main className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <ProductGallery images={product.images} alt={product.name} />
            <Product3DViewer modelUrl={product.modelUrl} sequenceFrames={product.sequenceFrames} />
          </div>

          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">{product.category}</p>
            <h1 className="text-3xl leading-tight md:text-4xl">{product.name}</h1>
            <p className="text-2xl font-medium">{formatPrice(product.price, siteConfig.currency)}</p>
            <div className="space-y-1 text-sm text-black/70">
              <p>SKU: {product.sku}</p>
              <p>Availability: {stockLabel}</p>
              <p>Finish: {product.finish}</p>
              <p>Material: {product.material}</p>
            </div>
            <p className="text-sm leading-relaxed text-black/75">{product.description}</p>

            <div>
              <p className="mb-2 text-sm">Quantity</p>
              <div className="flex max-w-[150px] items-center border border-black/20">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-2 text-lg"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                onClick={() => addToCart(product.id, quantity)}
                disabled={product.stock <= 0}
                className="bg-black px-4 py-3 text-sm text-white disabled:opacity-40"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product.id, quantity);
                  router.push("/checkout");
                }}
                disabled={product.stock <= 0}
                className="border border-black/20 px-4 py-3 text-sm disabled:opacity-40"
              >
                Buy Now
              </button>
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center border border-black/20 px-4 py-3 text-sm"
            >
              Ask on WhatsApp
            </a>

            <div className="space-y-3 border-t border-black/10 pt-6 text-sm text-black/70">
              <p>
                <strong>Dimensions:</strong> {product.dimensions}
              </p>
              <p>
                <strong>Warranty:</strong> {product.warranty}
              </p>
              <p>
                <strong>Shipping:</strong> Major city delivery slots and nationwide dispatch options available.
              </p>
            </div>

            <div className="border border-black/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">Specifications</p>
              <ul className="mt-3 space-y-2 text-sm">
                {product.specifications.map((spec) => (
                  <li key={spec.label} className="flex justify-between gap-3 border-b border-black/5 pb-2">
                    <span className="text-black/60">{spec.label}</span>
                    <span>{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl">Related Products</h2>
            <Link href="/shop" className="text-sm underline">
              View all
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
