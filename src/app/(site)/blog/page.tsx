import type { Metadata } from "next";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import Blog from "@/components/Blog";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Blog | Nesol Energies",
  description: "Solar insights, news, and energy saving tips from Nesol Energies Pakistan.",
};

export default function BlogPage() {
  return (
    <>
      <DynamicPageHeader pageKey="blog" />
      <Blog />
      <CTABanner />
    </>
  );
}
