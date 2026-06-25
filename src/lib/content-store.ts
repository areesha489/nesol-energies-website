import { promises as fs } from "fs";
import path from "path";
import type { SiteContent, NavLink, Project, ProductItem } from "./content-types";
import { defaultSiteContent } from "./default-content";

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");

function mergeNavLinks(parsed: NavLink[] | undefined): NavLink[] {
  const defaults = defaultSiteContent.navLinks;
  if (!parsed?.length) return defaults;

  const byHref = new Map(parsed.map((link) => [link.href, link]));
  const merged = defaults.map((link) => byHref.get(link.href) ?? link);
  const defaultHrefs = new Set(defaults.map((link) => link.href));

  for (const link of parsed) {
    if (!defaultHrefs.has(link.href)) merged.push(link);
  }

  return merged;
}

function normalizeProject(item: Partial<Project> & { capacity?: string; image?: string; id?: string }): Project {
  const images = Array.isArray(item.images)
    ? item.images.filter(Boolean)
    : item.image
      ? [item.image]
      : [];

  return {
    id: item.id ?? `project-${Date.now()}`,
    title: item.title ?? "Project",
    kw: item.kw ?? item.capacity ?? "",
    location: item.location ?? "",
    images,
  };
}

function mergeProjects(parsed: SiteContent["projects"] | undefined): SiteContent["projects"] {
  const defaults = defaultSiteContent.projects;
  const items = (parsed?.items ?? defaults.items).map((item) => normalizeProject(item));

  return {
    badge: parsed?.badge ?? defaults.badge,
    heading: parsed?.heading ?? defaults.heading,
    headingHighlight: parsed?.headingHighlight ?? defaults.headingHighlight,
    items,
  };
}

function normalizeProduct(item: Partial<ProductItem> & { image?: string; id?: string }): ProductItem {
  const images = Array.isArray(item.images)
    ? item.images.filter(Boolean)
    : item.image
      ? [item.image]
      : [];

  const features = Array.isArray(item.features) ? item.features.filter(Boolean) : [];

  return {
    id: item.id ?? `product-${Date.now()}`,
    name: item.name ?? "Product",
    brand: item.brand ?? "",
    specs: item.specs ?? "",
    description: item.description ?? "",
    images,
    features,
    availability: item.availability ?? "In Stock",
    price: typeof item.price === "number" && item.price > 0 ? item.price : 0,
    priceNote: item.priceNote ?? "Contact for latest price",
  };
}

function mergeProducts(parsed: SiteContent["products"] | undefined): SiteContent["products"] {
  const defaults = defaultSiteContent.products;
  const categories = (parsed?.categories ?? defaults.categories).map((cat) => ({
    ...cat,
    items: cat.items.map((item) => normalizeProduct(item)),
  }));

  return {
    badge: parsed?.badge ?? defaults.badge,
    heading: parsed?.heading ?? defaults.heading,
    headingHighlight: parsed?.headingHighlight ?? defaults.headingHighlight,
    subtitle: parsed?.subtitle ?? defaults.subtitle,
    categories,
  };
}

function mergeContent(parsed: Partial<SiteContent>): SiteContent {
  return {
    site: { ...defaultSiteContent.site, ...parsed.site },
    contact: {
      ...defaultSiteContent.contact,
      ...parsed.contact,
      address: { ...defaultSiteContent.contact.address, ...parsed.contact?.address },
    },
    navLinks: mergeNavLinks(parsed.navLinks),
    socialLinks: parsed.socialLinks ?? defaultSiteContent.socialLinks,
    stats: parsed.stats ?? defaultSiteContent.stats,
    hero: { ...defaultSiteContent.hero, ...parsed.hero },
    about: { ...defaultSiteContent.about, ...parsed.about },
    services: { ...defaultSiteContent.services, ...parsed.services },
    companies: { ...defaultSiteContent.companies, ...parsed.companies },
    projects: mergeProjects(parsed.projects),
    process: { ...defaultSiteContent.process, ...parsed.process },
    testimonials: { ...defaultSiteContent.testimonials, ...parsed.testimonials },
    cta: { ...defaultSiteContent.cta, ...parsed.cta },
    footer: { ...defaultSiteContent.footer, ...parsed.footer },
    pricingCalculator: {
      ...defaultSiteContent.pricingCalculator,
      ...parsed.pricingCalculator,
      tiers: parsed.pricingCalculator?.tiers ?? defaultSiteContent.pricingCalculator.tiers,
    },
    productsNav: parsed.productsNav ?? defaultSiteContent.productsNav,
    products: mergeProducts(parsed.products),
    blog: {
      ...defaultSiteContent.blog,
      ...parsed.blog,
      posts: parsed.blog?.posts ?? defaultSiteContent.blog.posts,
    },
    pageHeaders: { ...defaultSiteContent.pageHeaders, ...parsed.pageHeaders },
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf-8");
    return mergeContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    await saveSiteContent(defaultSiteContent);
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export { CONTENT_PATH };
