import { promises as fs } from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function readContentRaw(): Promise<string | null> {
  try {
    return await fs.readFile(CONTENT_PATH, "utf-8");
  } catch {
    return null;
  }
}

export async function writeContentRaw(raw: string): Promise<void> {
  try {
    await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
    await fs.writeFile(CONTENT_PATH, raw, "utf-8");
  } catch {
    throw new Error(
      "Save failed. Local admin use karein, phir changes git push karke deploy karein.",
    );
  }
}

export async function uploadPublicFile(filename: string, buffer: Buffer, _contentType: string) {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
    return `/uploads/${filename}`;
  } catch {
    throw new Error(
      "Upload failed. Image URL paste karein, ya local admin se upload karke deploy karein.",
    );
  }
}

export { CONTENT_PATH };
