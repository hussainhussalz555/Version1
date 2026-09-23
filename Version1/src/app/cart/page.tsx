"use client";

import { SafeImage } from "@/components/safe-image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
      <h1 className="mb-8 text-4xl">Cart</h1>

      {items.length === 0 ? (
        <div className="border border-black/10 bg-white p-8 text-center">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="mt-4 inline-block bg-black px-4 py-2 text-sm text-white">
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <section className="space-y-3">
            {items.map((item) => (
              <article key={item.productId} className="grid grid-cols-[90px_1fr_auto] gap-4 border border-black/10 p-3">
                <div className="relative aspect-square overflow-hidden bg-[#f3efe8]">
                  <SafeImage src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm text-black/60">{item.product.category}</p>
                  <h2 className="text-[15px]">{item.product.name}</h2>
                  <p className="mt-2 text-sm">{formatPrice(item.product.price, siteConfig.currency)}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="border border-black/20 px-2"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="border border-black/20 px-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.productId)} className="text-xs text-black/60 underline">
                    Remove
                  </button>
                  <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity, siteConfig.currency)}</p>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit border border-black/10 bg-white p-5">
            <h3 className="text-lg">Order Summary</h3>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal, siteConfig.currency)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="mt-4 border-t border-black/10 pt-4">
              <Link href="/checkout" className="block bg-black px-4 py-3 text-center text-sm text-white">
                Proceed to Checkout
              </Link>
              <button onClick={clearCart} className="mt-3 w-full border border-black/20 px-4 py-3 text-sm">
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
