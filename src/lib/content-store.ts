import { unstable_cache, revalidateTag } from "next/cache";
import type { SiteContent, NavLink, Project, ProductItem } from "./content-types";
import { defaultSiteContent } from "./default-content";
import {
  DEFAULT_ABOUT_IMAGE,
  DEFAULT_HERO_SLIDE_IMAGES,
  DEFAULT_PROJECT_IMAGES,
  resolveMediaUrl,
} from "./media";
import { readContentRaw, writeContentRaw } from "./content-persistence";

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
  const items = (parsed?.items ?? defaults.items).map((item, index) => {
    const normalized = normalizeProject(item);
    const defaultImages = DEFAULT_PROJECT_IMAGES[index] ?? DEFAULT_PROJECT_IMAGES[0];

    const images =
      normalized.images.length > 0
        ? normalized.images.map((img, imageIndex) =>
            resolveMediaUrl(img, defaultImages[imageIndex] ?? defaultImages[0]),
          )
        : defaultImages;

    return { ...normalized, images };
  });

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
    priceNote: item.priceNote ?? "",
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
    hero: {
      ...defaultSiteContent.hero,
      ...parsed.hero,
      slides: (parsed.hero?.slides ?? defaultSiteContent.hero.slides).map((slide, index) => ({
        ...slide,
        image: resolveMediaUrl(
          slide.image,
          DEFAULT_HERO_SLIDE_IMAGES[index] ??
            defaultSiteContent.hero.slides[index]?.image ??
            DEFAULT_HERO_SLIDE_IMAGES[0],
        ),
      })),
    },
    about: {
      ...defaultSiteContent.about,
      ...parsed.about,
      image: resolveMediaUrl(
        parsed.about?.image ?? defaultSiteContent.about.image,
        DEFAULT_ABOUT_IMAGE,
      ),
    },
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

async function readSiteContent(): Promise<SiteContent> {
  const raw = await readContentRaw();
  if (raw) {
    return mergeContent(JSON.parse(raw) as Partial<SiteContent>);
  }

  await saveSiteContent(defaultSiteContent);
  return defaultSiteContent;
}

const getCachedSiteContent = unstable_cache(readSiteContent, ["site-content"], {
  revalidate: 60,
  tags: ["site-content"],
});

export async function getSiteContent(): Promise<SiteContent> {
  if (process.env.VERCEL === "1") {
    return readSiteContent();
  }
  return getCachedSiteContent();
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await writeContentRaw(JSON.stringify(content, null, 2));
  revalidateTag("site-content");
}
