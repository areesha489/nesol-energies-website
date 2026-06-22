import type { Metadata } from "next";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About Us | Nesol Energies",
  description: "Learn about Nesol Energies Group of Companies — 15+ years leading Pakistan's green revolution.",
};

export default function AboutPage() {
  return (
    <>
      <DynamicPageHeader pageKey="about" />
      <About />
      <Process />
      <Testimonials />
      <CTABanner />
    </>
  );
}
