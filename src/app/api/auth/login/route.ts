import { NextResponse } from "next/server";
import { verifyCredentials, createSessionToken, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!verifyCredentials(String(username ?? ""), String(password ?? ""))) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
