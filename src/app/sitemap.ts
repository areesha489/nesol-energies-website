import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content-store";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const content = await getSiteContent();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/companies",
    "/projects",
    "/products",
    "/blog",
    "/calculator",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = content.products.categories.flatMap((category) =>
    category.items.map((item) => ({
      url: `${siteUrl}/products/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  const blogRoutes = content.blog.posts.map((post) => ({
    url: `${siteUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
