"use client";

import { SafeImage } from "@/components/safe-image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className="relative block aspect-square w-full overflow-hidden border border-black/10 bg-[#f4f1ea]" onClick={() => setOpen(true)}>
        <SafeImage src={images[index]} alt={alt} fill className="object-cover" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-white/90 px-2 py-1 text-xs">
          <ZoomIn className="h-3.5 w-3.5" /> Zoom
        </span>
      </button>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((image, i) => (
          <button
            key={`${image}-${i}`}
            onClick={() => setIndex(i)}
            className={`relative aspect-square overflow-hidden border ${i === index ? "border-black" : "border-black/10"}`}
          >
            <SafeImage src={image} alt={`${alt} view ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/85 p-4"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white p-2 text-black"
              aria-label="Close zoom"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative mx-auto mt-12 h-[82vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <SafeImage src={images[index]} alt={alt} fill className="object-contain" sizes="100vw" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
