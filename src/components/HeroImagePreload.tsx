import { getSiteContent } from "@/lib/content-store";

export default async function HeroImagePreload() {
  const { hero } = await getSiteContent();
  const src = hero.slides[0]?.image;
  if (!src) return null;

  return <link rel="preload" as="image" href={src} fetchPriority="high" />;
}
