"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredProducts } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { qualityStatements } from "@/lib/site-config";

export function HomeSections() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-black/10 bg-[#f8f5ee]">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-16 md:px-8 lg:grid-cols-2 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">Premium Bathroom & Ceramics</p>
            <h1 className="mt-4 text-5xl leading-[1.05] md:text-7xl">Elevate the Everyday</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-black/70">
              Minimal, architectural fixtures crafted to bring warmth, precision, and lasting quality to modern interiors.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/shop" className="bg-black px-5 py-3 text-sm text-white">
                Explore Collection
              </Link>
              <Link href="/quality" className="border border-black/20 px-5 py-3 text-sm">
                Our Quality
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative aspect-[4/5] overflow-hidden border border-black/10 bg-white">
            <Image src="/products/product1.png" alt="Premium concealed shower set" fill className="object-cover" priority />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">Featured Products</p>
            <h2 className="mt-2 text-3xl">Curated Essentials</h2>
          </div>
          <Link href="/shop" className="text-sm underline">
            View all products
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f5f1e8]">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-black/50">Design Philosophy</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {qualityStatements.slice(0, 3).map((item) => (
              <article key={item.title} className="border border-black/10 bg-white p-6">
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden border border-black/10 bg-[#f2eee5]">
          <Image src="/products/product2.png" alt="Bathroom fixture showcase" fill className="object-cover" />
        </div>
        <div className="self-center">
          <p className="text-xs uppercase tracking-[0.2em] text-black/50">Premium Showcase</p>
          <h2 className="mt-4 text-4xl leading-tight">Built for modern homes, hospitality, and architectural projects.</h2>
          <p className="mt-4 text-black/70">
            From concealed shower systems to coordinated finishing details, each collection balances aesthetics and practical daily use.
          </p>
          <Link href="/contact" className="mt-7 inline-block border border-black/20 px-5 py-3 text-sm">
            Talk to our team
          </Link>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#111] text-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 text-center md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Ready to Upgrade Your Space?</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Create a bathroom that feels truly premium.</h2>
          <Link href="/shop" className="mt-8 inline-block bg-white px-5 py-3 text-sm text-black">
            Shop Collection
          </Link>
        </div>
      </section>
    </>
  );
}
