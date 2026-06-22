import type { Metadata } from "next";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import Companies from "@/components/Companies";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Our Companies | Nesol Energies",
  description: "Nesol Group of Companies — Nesol (Next Edge Solutions), Nesol Properties, Nesol Energies & Organo Mart.",
};

export default function CompaniesPage() {
  return (
    <>
      <DynamicPageHeader pageKey="companies" />
      <Companies />
      <CTABanner />
    </>
  );
}
