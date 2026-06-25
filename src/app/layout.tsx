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
  return (
    <html lang="en" className={`${rajdhani.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
