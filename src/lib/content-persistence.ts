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

  const current = await fetch(apiBase + `?ref=${GITHUB_BRANCH}`, {
    headers,
    cache: "no-store",
  });
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

async function readFromGithubApi(token: string): Promise<string | null> {
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_CONTENT_PATH}?ref=${GITHUB_BRANCH}`;
  const response = await fetch(apiUrl, {
    headers: getGithubHeaders(token),
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as { content?: string; encoding?: string };
  if (data.content && data.encoding === "base64") {
    return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf-8");
  }

  return null;
}

async function readFromGithubRaw(): Promise<string | null> {
  const url = `${rawGithubUrl(GITHUB_CONTENT_PATH)}?t=${Date.now()}`;
  const response = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
  if (!response.ok) return null;

  const text = await response.text();
  return text.trim().startsWith("{") ? text : null;
}

async function readFromGithub(retries = 3): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN;

  for (let attempt = 0; attempt < retries; attempt++) {
    if (token) {
      try {
        const apiContent = await readFromGithubApi(token);
        if (apiContent) return apiContent;
      } catch {
        // retry below
      }
    }

    try {
      const rawContent = await readFromGithubRaw();
      if (rawContent) return rawContent;
    } catch {
      // retry below
    }

    if (attempt < retries - 1) {
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }

  return null;
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
    console.error("[content] GitHub se content read fail — stale bundled JSON use ho sakta hai.");
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
    return `/uploads/${filename}`;
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

export { CONTENT_PATH };
