"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type Props = {
  productName?: string;
};

export function WhatsAppFloat({ productName }: Props) {
  const message = productName
    ? `Hi, I'm interested in ${productName}. Can you provide more details?`
    : "Hi, I want details about your premium bathroom collections.";

  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-4 py-3 text-sm font-medium shadow-sm transition hover:-translate-y-0.5"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp
    </a>
  );
}
