import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { ProductDetailClient } from "@/components/product-detail-client";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
