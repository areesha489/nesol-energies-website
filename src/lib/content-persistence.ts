import { promises as fs } from "fs";
import path from "path";
import { head, list, put } from "@vercel/blob";

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");
const BLOB_PATHNAME = "cms/site-content.json";

function isVercelRuntime() {
  return process.env.VERCEL === "1";
}

function useBlobStorage() {
  return isVercelRuntime() || Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function canUploadFiles() {
  return true;
}

async function readFromFilesystem(): Promise<string | null> {
  try {
    return await fs.readFile(CONTENT_PATH, "utf-8");
  } catch {
    return null;
  }
}

async function readFromBlob(): Promise<string | null> {
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

async function writeToFilesystem(raw: string): Promise<void> {
  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
  await fs.writeFile(CONTENT_PATH, raw, "utf-8");
}

async function writeToBlob(raw: string): Promise<void> {
  await put(BLOB_PATHNAME, raw, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function readContentRaw(): Promise<string | null> {
  if (isVercelRuntime()) {
    const blobContent = await readFromBlob();
    if (blobContent) return blobContent;
    return readFromFilesystem();
  }

  const fileContent = await readFromFilesystem();
  if (fileContent) return fileContent;

  if (useBlobStorage()) {
    const blobContent = await readFromBlob();
    if (blobContent) {
      try {
        await writeToFilesystem(blobContent);
      } catch {
        // Local filesystem sync is best-effort.
      }
      return blobContent;
    }
  }

  return null;
}

export async function writeContentRaw(raw: string): Promise<void> {
  if (isVercelRuntime()) {
    try {
      await writeToBlob(raw);
      return;
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Blob save failed";
      throw new Error(
        `Save failed: ${detail}. Vercel Dashboard → Storage → Blob connect karein, phir Redeploy karein.`,
      );
    }
  }

  try {
    await writeToFilesystem(raw);
  } catch {
    throw new Error("Local save failed. data/ folder check karein.");
  }

  if (useBlobStorage()) {
    try {
      await writeToBlob(raw);
    } catch {
      // Local save succeeded; blob sync is optional on dev machines.
    }
  }
}

export async function uploadPublicFile(filename: string, buffer: Buffer, contentType: string) {
  if (!isVercelRuntime()) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    return `/uploads/${filename}`;
  }

  try {
    const blob = await put(`uploads/${filename}`, buffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
    });
    return blob.url;
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Blob upload failed";
    throw new Error(`${detail}. Blob store connect karein aur redeploy karein.`);
  }
}

export async function blobStorageReady() {
  if (!isVercelRuntime()) return true;
  try {
    await head(BLOB_PATHNAME);
    return true;
  } catch {
    return false;
  }
}

export { CONTENT_PATH, useBlobStorage, canUploadFiles };
