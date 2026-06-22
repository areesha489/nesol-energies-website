import type { PricingTier } from "@/lib/content-types";

export function getPriceRange(kw: number, tiers: PricingTier[]) {
  if (!kw || kw <= 0 || tiers.length === 0) return null;

  const sorted = [...tiers].sort((a, b) => a.kw - b.kw);
  const exact = sorted.find((t) => t.kw === kw);
  if (exact) {
    return { min: exact.minPrice, max: exact.maxPrice, label: exact.label, kw: exact.kw, exact: true };
  }

  if (kw <= sorted[0].kw) {
    const ratio = kw / sorted[0].kw;
    return {
      min: Math.round(sorted[0].minPrice * ratio),
      max: Math.round(sorted[0].maxPrice * ratio),
      label: sorted[0].label,
      kw,
      exact: false,
    };
  }

  const last = sorted[sorted.length - 1];
  if (kw >= last.kw) {
    const ratio = kw / last.kw;
    return {
      min: Math.round(last.minPrice * ratio),
      max: Math.round(last.maxPrice * ratio),
      label: last.label,
      kw,
      exact: false,
    };
  }

  let lower = sorted[0];
  let upper = sorted[sorted.length - 1];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (kw >= sorted[i].kw && kw <= sorted[i + 1].kw) {
      lower = sorted[i];
      upper = sorted[i + 1];
      break;
    }
  }

  const t = (kw - lower.kw) / (upper.kw - lower.kw);
  return {
    min: Math.round(lower.minPrice + t * (upper.minPrice - lower.minPrice)),
    max: Math.round(lower.maxPrice + t * (upper.maxPrice - lower.maxPrice)),
    label: lower.label,
    kw,
    exact: false,
  };
}

export function formatPrice(amount: number, currency: string) {
  const formatted = new Intl.NumberFormat("en-US").format(amount);
  return `${currency} ${formatted}`;
}
