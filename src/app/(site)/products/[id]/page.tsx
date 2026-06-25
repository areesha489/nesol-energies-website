import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getSiteContent } from "@/lib/content-store";
import { findProduct, getRelatedProducts } from "@/lib/products";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const content = await getSiteContent();
  const found = findProduct(content, id);
  if (!found) return { title: "Product | Nesol Energies" };
  return {
    title: `${found.product.name} | Nesol Energies`,
    description: found.product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const content = await getSiteContent();
  const found = findProduct(content, id);
  if (!found) notFound();

  const relatedProducts = getRelatedProducts(content, found.category, found.product.id);

  return (
    <ProductDetail
      product={found.product}
      category={found.category}
      relatedProducts={relatedProducts}
    />
  );
}
