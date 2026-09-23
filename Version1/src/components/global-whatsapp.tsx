"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { products } from "@/data/products";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export function GlobalWhatsApp() {
  const pathname = usePathname();

  const productName = useMemo(() => {
    if (!pathname.startsWith("/product/")) return undefined;
    const slug = pathname.split("/product/")[1] ?? "";
    const product = products.find((item) => item.slug === slug);
    return product?.name;
  }, [pathname]);

  return <WhatsAppFloat productName={productName} />;
}
