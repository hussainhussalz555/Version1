"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { QuickViewModal } from "@/components/quick-view-modal";
import { productCategories, products } from "@/data/products";
import type { Product } from "@/lib/types";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name" },
];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const base = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch = `${product.name} ${product.sku}`.toLowerCase().includes(search.toLowerCase());
      const matchesStock = !inStockOnly || product.stock > 0;
      return matchesCategory && matchesSearch && matchesStock;
    });

    if (sort === "price-low") return [...base].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...base].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...base].sort((a, b) => a.name.localeCompare(b.name));
    return base;
  }, [category, inStockOnly, search, sort]);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-7">
        <p className="text-xs uppercase tracking-[0.2em] text-black/50">Shop</p>
        <h1 className="text-4xl">Bathroom Fixtures & Ceramics</h1>
      </div>

      <section className="mb-8 grid gap-3 md:grid-cols-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name or SKU"
          className="border border-black/20 bg-transparent px-3 py-2 text-sm md:col-span-2"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-black/20 bg-transparent px-3 py-2 text-sm">
          <option>All</option>
          {productCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-black/20 bg-transparent px-3 py-2 text-sm">
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      <div className="mb-8 flex items-center gap-2 text-sm">
        <input id="stock-only" type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
        <label htmlFor="stock-only">Show in-stock products only</label>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
        ))}
      </section>

      {filtered.length === 0 && <p className="py-16 text-center text-black/55">No products match your current filters.</p>}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </main>
  );
}
