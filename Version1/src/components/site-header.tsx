"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site-config";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-gold/20 bg-black text-[#f9f6ef]">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
          aria-label="Go to homepage"
        >
          {!logoError ? (
            <Image
              src={IMAGES.logo}
              alt={`${siteConfig.brandName} logo`}
              width={164}
              height={40}
              className="h-8 w-auto sm:h-10"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-xl font-light uppercase tracking-[0.2em] text-brand-gold [text-shadow:0_0_12px_rgba(250,212,7,0.4)]">
              {siteConfig.brandName}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-4 md:flex lg:gap-7" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "rounded-sm py-2 text-xs font-light uppercase tracking-[0.16em] transition-colors hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold",
                pathname === link.href ? "text-brand-gold" : "text-[#f9f6ef]/80",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="rounded-full p-2.5 transition-colors hover:bg-white/10 hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2.5 transition-colors hover:bg-white/10 hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] font-semibold text-black ring-2 ring-black">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-full p-2.5 transition-colors hover:bg-white/10 hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold md:hidden"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-brand-gold/20 bg-black md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={cn(
                    "border-b border-brand-gold/10 py-3 text-xs font-light uppercase tracking-[0.16em] transition-colors last:border-b-0 hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold",
                    pathname === link.href ? "text-brand-gold" : "text-[#f9f6ef]/80",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
