"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { getGaMeasurementId } from "@/lib/analytics";

const GA_ID = getGaMeasurementId();

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || !window.gtag) return;
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag("config", GA_ID, { page_path: pagePath });
  }, [pathname, searchParams]);

  return null;
}
