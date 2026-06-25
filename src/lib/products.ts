import type { ProductItem, ProductCategory, SiteContent } from "./content-types";

export function findProduct(content: SiteContent, id: string) {
  for (const category of content.products.categories) {
    const product = category.items.find((item) => item.id === id);
    if (product) return { product, category };
  }
  return null;
}

export function getProductCover(product: ProductItem) {
  return product.images[0] ?? "";
}

export function formatPrice(amount: number) {
  if (!amount || amount <= 0) return null;
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

export function parseSpecRows(specs: string) {
  return specs
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const colonIndex = part.indexOf(":");
      if (colonIndex > 0) {
        return {
          label: part.slice(0, colonIndex).trim(),
          value: part.slice(colonIndex + 1).trim(),
        };
      }
      return { label: "Spec", value: part };
    });
}

export function getRelatedProducts(
  content: SiteContent,
  category: ProductCategory,
  productId: string,
  limit = 4,
) {
  return category.items.filter((item) => item.id !== productId).slice(0, limit);
}
