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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg">
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <LazySiteWidgets />
    </ContentProvider>
  );
}
