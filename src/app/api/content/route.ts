import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getSiteContent, saveSiteContent } from "@/lib/content-store";
import { isAuthenticated } from "@/lib/auth";
import type { SiteContent } from "@/lib/content-types";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = (await request.json()) as SiteContent;
    await saveSiteContent(content);
    revalidateTag("site-content", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }
}
