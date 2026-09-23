"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const payments = ["JazzCash", "EasyPaisa", "Cash on Delivery"] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [customer, setCustomer] = useState({ fullName: "", email: "", phone: "", city: "", address: "" });
  const [payment, setPayment] = useState<(typeof payments)[number]>("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const shippingFee = useMemo(() => (subtotal > 100000 ? 0 : 2500), [subtotal]);
  const total = subtotal + shippingFee;

  const canSubmit = items.length > 0 && Object.values(customer).every(Boolean);

  const submitOrder = () => {
    if (!canSubmit) return;
    setLoading(true);
    const orderNumber = `BTH-${Date.now().toString().slice(-8)}`;

    const mockOrder = {
      orderNumber,
      items,
      customer,
      payment,
      subtotal,
      shippingFee,
      total,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("bathae-last-order", JSON.stringify(mockOrder));
    clearCart();

    setTimeout(() => {
      router.push(`/checkout/success?order=${orderNumber}`);
    }, 700);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
      <h1 className="mb-8 text-4xl">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <section className="space-y-6">
          <div className="border border-black/10 p-5">
            <h2 className="text-lg">Customer Information</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input className="border border-black/20 px-3 py-2 text-sm" placeholder="Full name" onChange={(e) => setCustomer((s) => ({ ...s, fullName: e.target.value }))} />
              <input className="border border-black/20 px-3 py-2 text-sm" placeholder="Email" type="email" onChange={(e) => setCustomer((s) => ({ ...s, email: e.target.value }))} />
              <input className="border border-black/20 px-3 py-2 text-sm" placeholder="Phone" onChange={(e) => setCustomer((s) => ({ ...s, phone: e.target.value }))} />
              <input className="border border-black/20 px-3 py-2 text-sm" placeholder="City" onChange={(e) => setCustomer((s) => ({ ...s, city: e.target.value }))} />
              <input className="border border-black/20 px-3 py-2 text-sm sm:col-span-2" placeholder="Address" onChange={(e) => setCustomer((s) => ({ ...s, address: e.target.value }))} />
            </div>
          </div>

          <div className="border border-black/10 p-5">
            <h2 className="text-lg">Payment Method</h2>
            <div className="mt-4 space-y-3">
              {payments.map((item) => (
                <label key={item} className="flex items-start gap-3 border border-black/10 p-3 text-sm">
                  <input type="radio" name="payment" checked={payment === item} onChange={() => setPayment(item)} />
                  <span>
                    <strong>{item}</strong>
                    {item !== "Cash on Delivery" && (
                      <span className="block text-black/60">
                        Demo flow enabled — connect real API later with secure backend route.
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <aside className="h-fit border border-black/10 p-5">
          <h3 className="text-lg">Order Review</h3>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <p key={item.productId} className="flex justify-between gap-3">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.product.price * item.quantity, siteConfig.currency)}</span>
              </p>
            ))}
          </div>
          <div className="mt-4 border-t border-black/10 pt-4 text-sm">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal, siteConfig.currency)}</span>
            </p>
            <p className="mt-2 flex justify-between">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "Free" : formatPrice(shippingFee, siteConfig.currency)}</span>
            </p>
            <p className="mt-3 flex justify-between text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(total, siteConfig.currency)}</span>
            </p>
          </div>
          <button
            onClick={submitOrder}
            disabled={!canSubmit || loading}
            className="mt-6 w-full bg-black px-4 py-3 text-sm text-white disabled:opacity-40"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </aside>
      </div>
    </main>
  );
}
