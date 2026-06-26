import { promises as fs } from "fs";
import path from "path";
import { list, put } from "@vercel/blob";

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const BLOB_CMS_PATH = "cms/site-content.json";

function useBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readFromFilesystem(): Promise<string | null> {
  try {
    return await fs.readFile(CONTENT_PATH, "utf-8");
  } catch {
    return null;
  }
}

async function readFromBlob(): Promise<string | null> {
  if (!useBlob()) return null;
  try {
    const { blobs } = await list({ prefix: BLOB_CMS_PATH, limit: 1 });
    const blob = blobs.find((item) => item.pathname === BLOB_CMS_PATH) ?? blobs[0];
    if (!blob) return null;
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return null;
    return response.text();
  } catch {
    return null;
  }
}

export async function readContentRaw(): Promise<string | null> {
  if (useBlob()) {
    const blobContent = await readFromBlob();
    if (blobContent) return blobContent;
  }
  return readFromFilesystem();
}

export async function writeContentRaw(raw: string): Promise<void> {
  if (process.env.VERCEL === "1" && !useBlob()) {
    throw new Error(
      "Live save ke liye Vercel → Storage → Blob connect karein, phir Redeploy karein.",
    );
  }

  if (useBlob()) {
    await put(BLOB_CMS_PATH, raw, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    try {
      await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
      await fs.writeFile(CONTENT_PATH, raw, "utf-8");
    } catch {
      // Local sync is optional on Vercel.
    }
    return;
  }

  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
  await fs.writeFile(CONTENT_PATH, raw, "utf-8");
}

export async function uploadPublicFile(filename: string, buffer: Buffer, contentType: string) {
  if (process.env.VERCEL === "1" && !useBlob()) {
    throw new Error(
      "Live upload ke liye Vercel → Storage → Blob connect karein, phir Redeploy karein.",
    );
  }

  if (useBlob()) {
    const blob = await put(`uploads/${filename}`, buffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
    });
    return blob.url;
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

export { CONTENT_PATH, useBlob };
