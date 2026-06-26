import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getSiteContent, saveSiteContent } from "@/lib/content-store";
import { isAuthenticated } from "@/lib/auth";
import type { SiteContent } from "@/lib/content-types";

export const dynamic = "force-dynamic";

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
    return NextResponse.json({ error: "Session expire ho gayi. Dobara login karein." }, { status: 401 });
  }

  try {
    const content = (await request.json()) as SiteContent;
    await saveSiteContent(content);
    revalidateTag("site-content");
    for (const route of REVALIDATE_PATHS) {
      revalidatePath(route, "layout");
    }
    for (const category of content.products.categories) {
      for (const item of category.items) {
        revalidatePath(`/products/${item.id}`);
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
