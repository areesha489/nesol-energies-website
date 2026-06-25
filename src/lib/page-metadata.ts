import type { Metadata } from "next";
import { getSiteUrl } from "./site-url";

const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=75&auto=format&fit=crop";

export function createPageMetadata(
  path: string,
  title: string,
  description: string,
  image?: string,
): Metadata {
  const url = `${getSiteUrl()}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
