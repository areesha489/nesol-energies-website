import { promises as fs } from "fs";
import path from "path";
import { head, list, put } from "@vercel/blob";

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");
const BLOB_PATHNAME = "cms/site-content.json";

function useBlobStorage() {
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
  if (!useBlobStorage()) return null;

  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
    const blob = blobs.find((item) => item.pathname === BLOB_PATHNAME) ?? blobs[0];
    if (!blob) return null;

    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return null;
    return response.text();
  } catch {
    return null;
  }
}

export async function readContentRaw(): Promise<string | null> {
  const blobContent = await readFromBlob();
  if (blobContent) return blobContent;

  const fileContent = await readFromFilesystem();
  if (fileContent && useBlobStorage()) {
    try {
      await put(BLOB_PATHNAME, fileContent, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
      });
    } catch {
      // Blob seeding is best-effort; filesystem content still works as fallback.
    }
  }

  return fileContent;
}

export async function writeContentRaw(raw: string): Promise<void> {
  if (useBlobStorage()) {
    await put(BLOB_PATHNAME, raw, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
  }

  try {
    await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
    await fs.writeFile(CONTENT_PATH, raw, "utf-8");
  } catch {
    if (!useBlobStorage()) {
      throw new Error("Unable to save content. Configure BLOB_READ_WRITE_TOKEN on Vercel.");
    }
  }
}

export async function uploadPublicFile(filename: string, buffer: Buffer, contentType: string) {
  if (useBlobStorage()) {
    const blob = await put(`uploads/${filename}`, buffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
    });
    return blob.url;
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function blobStorageReady() {
  if (!useBlobStorage()) return false;
  try {
    await head(BLOB_PATHNAME);
    return true;
  } catch {
    return false;
  }
}

export { CONTENT_PATH, useBlobStorage };
