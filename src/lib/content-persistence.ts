import { promises as fs } from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const GITHUB_OWNER = process.env.GITHUB_OWNER || "areesha489";
const GITHUB_REPO = process.env.GITHUB_REPO || "nesol-energies-website";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const GITHUB_CONTENT_PATH = "data/site-content.json";

function isLiveHost() {
  return process.env.VERCEL === "1";
}

function getGithubToken() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "Live upload/save ke liye Vercel env mein GITHUB_TOKEN add karein (repo write access).",
    );
  }
  return token;
}

function getGithubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function rawGithubUrl(filePath: string) {
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filePath}`;
}

async function writeFileToGithub(filePath: string, contentBase64: string, message: string) {
  const token = getGithubToken();
  const apiBase = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
  const headers = getGithubHeaders(token);

  const current = await fetch(apiBase + `?ref=${GITHUB_BRANCH}`, { headers });
  let sha: string | undefined;

  if (current.ok) {
    const data = (await current.json()) as { sha?: string };
    sha = data.sha;
  } else if (current.status !== 404) {
    throw new Error("GitHub se file read nahi ho saki.");
  }

  const response = await fetch(apiBase, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error("GitHub par save failed. GITHUB_TOKEN check karein.");
  }
}

async function readFromFilesystem(): Promise<string | null> {
  try {
    return await fs.readFile(CONTENT_PATH, "utf-8");
  } catch {
    return null;
  }
}

async function readFromGithub(): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${GITHUB_CONTENT_PATH}`;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return null;
    return response.text();
  } catch {
    return null;
  }
}

async function writeToGithub(raw: string) {
  await writeFileToGithub(
    GITHUB_CONTENT_PATH,
    Buffer.from(raw, "utf-8").toString("base64"),
    "CMS content update",
  );
}

export async function readContentRaw(): Promise<string | null> {
  if (isLiveHost()) {
    const remote = await readFromGithub();
    if (remote) return remote;
  }
  return readFromFilesystem();
}

export async function writeContentRaw(raw: string): Promise<void> {
  if (isLiveHost()) {
    await writeToGithub(raw);
    return;
  }

  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
  await fs.writeFile(CONTENT_PATH, raw, "utf-8");
}

export async function uploadPublicFile(filename: string, buffer: Buffer, _contentType: string) {
  if (isLiveHost()) {
    const filePath = `public/uploads/${filename}`;
    await writeFileToGithub(filePath, buffer.toString("base64"), `Upload image ${filename}`);
    return rawGithubUrl(filePath);
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

export { CONTENT_PATH };
