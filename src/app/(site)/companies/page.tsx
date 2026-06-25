import DynamicPageHeader from "@/components/DynamicPageHeader";
import Companies from "@/components/Companies";
import CTABanner from "@/components/CTABanner";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata(
  "/companies",
  "Our Companies | Nesol Energies",
  "Nesol Group of Companies — Nesol (Next Edge Solutions), Nesol Properties, Nesol Energies & Organo Mart.",
);

export default function CompaniesPage() {
  return (
    <>
      <DynamicPageHeader pageKey="companies" />
      <Companies />
      <CTABanner />
    </>
  );
}
