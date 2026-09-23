"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: Props) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="grid w-full max-w-3xl gap-6 bg-white p-5 md:grid-cols-2"
          >
            <div className="relative aspect-square overflow-hidden bg-[#f5f3ed]">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div>
              <button onClick={onClose} className="ml-auto block rounded-full p-2 hover:bg-black/5">
                <X className="h-4 w-4" />
              </button>
              <h3 className="mt-2 text-xl">{product.name}</h3>
              <p className="mt-2 text-sm text-black/65">{product.description}</p>
              <p className="mt-4 text-lg font-medium">{formatPrice(product.price, siteConfig.currency)}</p>
              <div className="mt-6 flex gap-3">
                <Link href={`/product/${product.slug}`} className="border border-black/20 px-4 py-2 text-sm">
                  View Details
                </Link>
                <Link href="/shop" className="bg-black px-4 py-2 text-sm text-white" onClick={onClose}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
