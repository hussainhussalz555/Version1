"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { IMAGES } from "@/lib/images";

type Props = Omit<ImageProps, "src" | "onError"> & {
  src: string | undefined;
};

/**
 * Same API as next/image, but it never renders a broken image.
 *
 * Every image on this site comes from the `public` folder. If a file is
 * missing (a photo was renamed, deleted, or not uploaded yet), this component
 * swaps in the placeholder from `public/placeholder.png` instead of showing
 * the browser's broken-image icon.
 */
export function SafeImage({ src, alt, ...props }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showPlaceholder = !src || failedSrc === src;

  return (
    <Image
      {...props}
      alt={alt}
      src={showPlaceholder ? IMAGES.placeholder : src}
      onError={() => setFailedSrc(src ?? null)}
    />
  );
}
