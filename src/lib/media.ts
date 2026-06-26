import fs from "fs";
import path from "path";

export const DEFAULT_ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1613665813447-82a78c468028?w=800&q=80";

export const DEFAULT_PROJECT_IMAGES = [
  [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
  ],
  ["https://images.unsplash.com/photo-1497435334941-8c899ee9e9e0?w=800&q=80"],
  [
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=800&q=80",
  ],
  ["https://images.unsplash.com/photo-1613665813447-82a78c468028?w=800&q=80"],
  ["https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80"],
  [
    "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=800&q=80",
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  ],
];

export const DEFAULT_HERO_SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1280&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1280&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1280&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=1280&q=75&auto=format&fit=crop",
];

const GITHUB_OWNER = process.env.GITHUB_OWNER || "areesha489";
const GITHUB_REPO = process.env.GITHUB_REPO || "nesol-energies-website";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

export function githubRawUploadUrl(uploadPath: string) {
  const normalized = uploadPath.replace(/^\//, "");
  const publicPath = normalized.startsWith("public/") ? normalized : `public/${normalized}`;
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${publicPath}`;
}

/** GitHub raw URLs ko local /uploads/ path mein convert karein — live + local dono par same format. */
export function normalizeUploadUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("/uploads/") || url.startsWith("/images/")) return url;

  try {
    const parsed = new URL(url);
    if (parsed.hostname === "raw.githubusercontent.com") {
      const match = parsed.pathname.match(/\/public\/(uploads\/.+)$/);
      if (match) return `/${match[1]}`;
    }
  } catch {
    // not a URL
  }

  return url;
}

export function uploadExists(url: string) {
  if (!url.startsWith("/uploads/") && !url.startsWith("/images/")) return true;
  const filePath = path.join(process.cwd(), "public", url.replace(/^\//, ""));
  return fs.existsSync(filePath);
}

export function resolveUploadUrl(url: string, fallback = "") {
  if (!url) return fallback;

  const normalized = normalizeUploadUrl(url);
  if (normalized.startsWith("/uploads/") || normalized.startsWith("/images/")) {
    if (uploadExists(normalized)) return normalized;
    // Vercel par /uploads/ rewrite se GitHub se serve hota hai
    if (process.env.VERCEL === "1" && normalized.startsWith("/uploads/")) return normalized;
    if (normalized.startsWith("/uploads/")) return githubRawUploadUrl(normalized);
    return fallback;
  }

  return normalized;
}

export function resolveMediaUrl(url: string, fallback: string) {
  if (!url) return fallback;

  const normalized = normalizeUploadUrl(url);
  if (!normalized.startsWith("/uploads/") && !normalized.startsWith("/images/")) return normalized;
  if (uploadExists(normalized)) return normalized;
  if (process.env.VERCEL === "1" && normalized.startsWith("/uploads/")) return normalized;
  if (normalized.startsWith("/uploads/")) return githubRawUploadUrl(normalized);
  return fallback;
}
