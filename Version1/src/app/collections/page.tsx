import Link from "next/link";
import { productCategories } from "@/data/products";

export default function CollectionsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-black/50">Collections</p>
      <h1 className="mt-3 text-4xl">Designed for Contemporary Bathrooms</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {productCategories.map((category) => (
          <Link key={category} href={`/shop`} className="border border-black/10 bg-white p-6 transition hover:-translate-y-1">
            <h2 className="text-2xl">{category}</h2>
            <p className="mt-2 text-sm text-black/65">Explore premium options curated for architectural interiors.</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
