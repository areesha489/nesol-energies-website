import dynamic from "next/dynamic";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import CTABanner from "@/components/CTABanner";
import { createPageMetadata } from "@/lib/page-metadata";

const PricingCalculator = dynamic(() => import("@/components/PricingCalculator"));

export const metadata = createPageMetadata(
  "/calculator",
  "Solar Price Calculator | Nesol Energies",
  "Calculate your solar installation budget — enter kW size and get instant min–max price estimates.",
);

export default function CalculatorPage() {
  return (
    <>
      <DynamicPageHeader pageKey="calculator" />
      <PricingCalculator />
      <CTABanner />
    </>
  );
}
