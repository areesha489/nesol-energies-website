export function isUnoptimizedPreview(url: string) {
  return (
    url.startsWith("/uploads/") ||
    url.startsWith("/images/") ||
    url.includes("blob.vercel-storage.com")
  );
}

export function normalizeMediaInput(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }
  return null;
}

export async function uploadImageFile(file: File): Promise<{ url?: string; error?: string }> {
  if (!file.type.startsWith("image/")) {
    return { error: "Sirf image files (JPG, PNG, WebP, GIF) upload ho sakti hain." };
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", credentials: "same-origin", body: formData });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok) {
      return { error: data.error ?? "Upload failed. Dobara try karein." };
    }
    if (!data.url) {
      return { error: "Upload failed. URL nahi mili." };
    }
    return { url: data.url };
  } catch {
    return { error: "Network error during upload." };
  }
}
