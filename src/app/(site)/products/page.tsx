import type { Metadata } from "next";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import Products from "@/components/Products";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Products | Nesol Energies",
  description: "Solar panels, inverters, and batteries — premium equipment for residential and commercial solar systems.",
};

export default function ProductsPage() {
  return (
    <>
      <DynamicPageHeader pageKey="products" />
      <Products />
      <CTABanner />
    </>
  );
}
