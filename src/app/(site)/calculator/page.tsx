import DynamicPageHeader from "@/components/DynamicPageHeader";
import PricingCalculator from "@/components/PricingCalculator";
import CTABanner from "@/components/CTABanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Price Calculator | Nesol Energies",
  description: "Calculate your solar installation budget — enter kW size and get instant min–max price estimates.",
};

export default function CalculatorPage() {
  return (
    <>
      <DynamicPageHeader pageKey="calculator" />
      <PricingCalculator />
      <CTABanner />
    </>
  );
}
