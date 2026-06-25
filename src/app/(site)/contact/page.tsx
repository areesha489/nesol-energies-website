import DynamicPageHeader from "@/components/DynamicPageHeader";
import Contact from "@/components/Contact";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata(
  "/contact",
  "Contact Us | Nesol Energies",
  "Get in touch with Nesol Energies for a free solar assessment and quote.",
);

export default function ContactPage() {
  return (
    <>
      <DynamicPageHeader pageKey="contact" />
      <Contact />
    </>
  );
}
