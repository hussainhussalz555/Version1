import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/site-config";
import { GlobalWhatsApp } from "@/components/global-whatsapp";

const manrope = Manrope({ subsets: ["latin"] });

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
