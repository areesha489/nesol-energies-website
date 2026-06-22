import type { Metadata } from "next";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Nesol Energies",
  description: "Get in touch with Nesol Energies for a free solar assessment and quote.",
};

export default function ContactPage() {
  return (
    <>
      <DynamicPageHeader pageKey="contact" />
      <Contact />
    </>
  );
}
