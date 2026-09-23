import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // How long Next.js/Vercel is allowed to keep an optimized copy of an image
    // (in seconds). Photos in `public` keep the same URL when you replace the
    // file, so a lower value means a replaced photo shows up sooner.
    // 3600 = 1 hour.
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
