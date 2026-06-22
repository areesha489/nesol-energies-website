import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Chatbot from "@/components/Chatbot";
import PageHeadersPreload from "@/components/PageHeadersPreload";
import ScrollToTop from "@/components/ScrollToTop";
import { ContentProvider } from "@/components/ContentProvider";
import { getSiteContent } from "@/lib/content-store";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();

  const bannerUrls = [
    ...new Set(
      Object.values(content.pageHeaders)
        .map((header) => header.image)
        .filter((url): url is string => Boolean(url)),
    ),
  ];

  return (
    <ContentProvider content={content}>
      {bannerUrls.map((url) => (
        <link key={url} rel="preload" as="image" href={url} />
      ))}
      <PageHeadersPreload />
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <Chatbot />
    </ContentProvider>
  );
}
