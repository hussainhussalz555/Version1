import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/site-config";
import { GlobalWhatsApp } from "@/components/global-whatsapp";

// Keep the site's Manrope typography available without a Google Fonts request.
const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Premium Ceramics & Bathroom Fixtures`,
  description:
    "Premium modern ceramics and bathroom fixtures with architectural design language and curated collections.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-[#f9f6ef] text-[#111] antialiased`}>
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
          <GlobalWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
