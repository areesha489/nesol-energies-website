"use client";

import { useContent } from "./ContentProvider";

export default function PageHeadersPreload() {
  const { pageHeaders } = useContent();

  const urls = [
    ...new Set(
      Object.values(pageHeaders)
        .map((header) => header.image)
        .filter((url): url is string => Boolean(url)),
    ),
  ];

  return (
    <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
      {urls.map((url) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={url} src={url} alt="" loading="eager" decoding="async" />
      ))}
    </div>
  );
}
