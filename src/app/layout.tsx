import type { Metadata, Viewport } from "next";
import { Rajdhani, Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nesol Energies | Group of Companies — Renewable Energy Solutions",
    template: "%s | Nesol Energies",
  },
  description:
    "Nesol Energies delivers premium solar, wind, and renewable energy solutions across Pakistan.",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName: "Nesol Energies",
    title: "Nesol Energies | Renewable Energy Solutions",
    description:
      "Premium solar panels, inverters, and renewable energy solutions across Pakistan.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=75&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Nesol Energies solar installation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nesol Energies",
    description: "Premium solar and renewable energy solutions across Pakistan.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0056b3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nesol Energies",
    url: siteUrl,
    logo: `${siteUrl}/company-profile.pdf`,
    description:
      "Premium solar panels, inverters, and renewable energy solutions across Pakistan.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-339-0007944",
      contactType: "customer service",
      areaServed: "PK",
    },
  };

  return (
    <html lang="en" className={`${rajdhani.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
