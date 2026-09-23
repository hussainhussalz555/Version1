"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { useCart } from "@/context/cart-context";

type Props = {
  product: Product;
  onQuickView?: (product: Product) => void;
};

export function ProductCard({ product, onQuickView }: Props) {
  const { addToCart } = useCart();
  const stockLabel = product.stock <= 0 ? "Out of Stock" : product.stock <= 3 ? `Only ${product.stock} left` : "In Stock";

  return (
    <motion.article whileHover={{ y: -4 }} className="group border border-black/10 bg-white">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-[#f7f5f0]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-3 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-black/50">{product.category}</p>
        <Link href={`/product/${product.slug}`} className="block text-[15px] leading-relaxed text-black/90 hover:underline">
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{formatPrice(product.price, siteConfig.currency)}</p>
          <p className="text-xs text-black/60">{stockLabel}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onQuickView?.(product)}
            className="inline-flex items-center justify-center gap-2 border border-black/20 px-3 py-2 text-xs uppercase tracking-wide"
          >
            <Eye className="h-3.5 w-3.5" /> Quick View
          </button>
          <button
            onClick={() => addToCart(product.id, 1)}
            disabled={product.stock <= 0}
            className="inline-flex items-center justify-center gap-2 bg-black px-3 py-2 text-xs uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
