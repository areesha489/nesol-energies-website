import type { Metadata } from "next";
import dynamic from "next/dynamic";

import HeroSlider from "@/components/HeroSlider";

const About = dynamic(() => import("@/components/About"));
const Services = dynamic(() => import("@/components/Services"));
const Companies = dynamic(() => import("@/components/Companies"));
const Projects = dynamic(() => import("@/components/Projects"));
const Process = dynamic(() => import("@/components/Process"));
const PricingCalculator = dynamic(() => import("@/components/PricingCalculator"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata(
  "/",
  "Nesol Energies | Solar & Renewable Energy Pakistan",
  "Cut electricity bills with premium solar panels, inverters, and batteries. Free site assessment across Pakistan.",
);

export default function Home() {
  return (
    <>
      <HeroSlider />
      <About preview />
      <Services preview />
      <Companies preview />
      <Projects preview />
      <Process />
      <PricingCalculator />
      <Testimonials />
      <CTABanner />
    </>
  );
}
