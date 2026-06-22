"use client";

import { useContent } from "./ContentProvider";
import PageHeader from "./PageHeader";

export default function DynamicPageHeader({ pageKey }: { pageKey: string }) {
  const { pageHeaders } = useContent();
  const header = pageHeaders[pageKey];
  if (!header) return null;
  return <PageHeader {...header} />;
}
