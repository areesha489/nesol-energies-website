import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getSiteContent, saveSiteContent } from "@/lib/content-store";
import { isAuthenticated } from "@/lib/auth";
import { useBlobStorage } from "@/lib/content-persistence";
import type { SiteContent } from "@/lib/content-types";

const REVALIDATE_PATHS = [
  "/",
  "/about",
  "/services",
  "/companies",
  "/projects",
  "/products",
  "/blog",
  "/contact",
  "/calculator",
];

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (process.env.VERCEL === "1" && !useBlobStorage()) {
    return NextResponse.json(
      {
        error:
          "CMS storage is not configured. Add a Vercel Blob store and set BLOB_READ_WRITE_TOKEN in project settings.",
      },
      { status: 503 },
    );
  }

  try {
    const content = (await request.json()) as SiteContent;
    await saveSiteContent(content);
    revalidateTag("site-content", { expire: 0 });
    for (const route of REVALIDATE_PATHS) {
      revalidatePath(route, "layout");
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid content";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
