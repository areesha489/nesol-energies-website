import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LazySiteWidgets from "@/components/LazySiteWidgets";
import { ContentProvider } from "@/components/ContentProvider";
import { getSiteContent } from "@/lib/content-store";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();

  return (
    <ContentProvider content={content}>
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <LazySiteWidgets />
    </ContentProvider>
  );
}
