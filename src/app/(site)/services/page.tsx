import DynamicPageHeader from "@/components/DynamicPageHeader";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTABanner from "@/components/CTABanner";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata(
  "/services",
  "Services | Nesol Energies",
  "Complete renewable energy solutions — solar, wind, storage, EPC, O&M and consulting.",
);

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
