import Link from "next/link";

type Props = {
  searchParams: Promise<{ order?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order } = await searchParams;

  return (
    <main className="mx-auto grid min-h-[70vh] w-full max-w-3xl place-items-center px-5 py-12 md:px-8">
      <section className="w-full border border-black/10 bg-white p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-black/50">Order Confirmed</p>
        <h1 className="mt-3 text-3xl">Thank you for your purchase</h1>
        <p className="mt-3 text-black/70">Your mock order has been recorded successfully.</p>
        <p className="mt-5 text-sm">
          Order Number: <span className="font-medium">{order ?? "BTH-UNKNOWN"}</span>
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/shop" className="border border-black/20 px-4 py-2 text-sm">
            Continue Shopping
          </Link>
          <Link href="/" className="bg-black px-4 py-2 text-sm text-white">
            Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}
