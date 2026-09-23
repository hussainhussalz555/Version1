import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#f5f1e9]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-black/50">{siteConfig.brandName}</p>
          <p className="mt-4 max-w-sm text-sm text-black/70">
            Premium ceramics and bathroom fixtures curated for modern living spaces.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-black/50">Navigation</p>
          <div className="mt-4 grid gap-2">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-black/75 hover:text-black">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-black/50">Support</p>
          <div className="mt-4 space-y-2 text-sm text-black/75">
            <p>{siteConfig.supportEmail}</p>
            <p>{siteConfig.supportPhone}</p>
            <p>{siteConfig.address}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
