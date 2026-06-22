import type { Metadata } from "next";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Projects | Nesol Energies",
  description: "Explore Nesol Energies success stories — solar parks, rooftops, and industrial projects.",
};

export default function ProjectsPage() {
  return (
    <>
      <DynamicPageHeader pageKey="projects" />
      <Projects />
      <Testimonials />
      <CTABanner />
    </>
  );
}
