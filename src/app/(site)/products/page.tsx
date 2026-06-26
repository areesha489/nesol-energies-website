import type { Metadata } from "next";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import Products from "@/components/Products";
import CTABanner from "@/components/CTABanner";
import { createPageMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata(
  "/products",
  "Products | Nesol Energies",
  "Solar panels, inverters, and batteries — premium equipment for residential and commercial solar systems.",
);

export default function ProductsPage() {
  return (
    <>
      <DynamicPageHeader pageKey="products" />
      <Products />
      <CTABanner />
    </>
  );
}
