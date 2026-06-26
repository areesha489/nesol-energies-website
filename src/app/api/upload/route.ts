import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { uploadPublicFile, useBlobStorage } from "@/lib/content-persistence";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (process.env.VERCEL === "1" && !useBlobStorage()) {
    return NextResponse.json(
      {
        error:
          "Image upload ke liye Vercel Blob storage chahiye. Vercel dashboard se Blob connect karein.",
      },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadPublicFile(filename, buffer, file.type);

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
