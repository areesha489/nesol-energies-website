import dynamic from "next/dynamic";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import Projects from "@/components/Projects";
import CTABanner from "@/components/CTABanner";
import { createPageMetadata } from "@/lib/page-metadata";

const Testimonials = dynamic(() => import("@/components/Testimonials"));

export const metadata = createPageMetadata(
  "/projects",
  "Projects | Nesol Energies",
  "Explore Nesol Energies success stories — solar parks, rooftops, and industrial projects.",
);

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
