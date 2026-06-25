import type { Metadata } from "next";
import dynamic from "next/dynamic";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import About from "@/components/About";
import Process from "@/components/Process";
import CTABanner from "@/components/CTABanner";
import { createPageMetadata } from "@/lib/page-metadata";

const Testimonials = dynamic(() => import("@/components/Testimonials"));

export const metadata = createPageMetadata(
  "/about",
  "About Us | Nesol Energies",
  "Learn about Nesol Energies Group of Companies — 15+ years leading Pakistan's green revolution.",
);

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
