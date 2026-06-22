import type { Metadata } from "next";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Services | Nesol Energies",
  description: "Complete renewable energy solutions — solar, wind, storage, EPC, O&M and consulting.",
};

export default function ServicesPage() {
  return (
    <>
      <DynamicPageHeader pageKey="services" />
      <Services />
      <Process />
      <CTABanner />
    </>
  );
}
