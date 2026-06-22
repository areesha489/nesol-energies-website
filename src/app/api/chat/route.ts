import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/content-store";
import { buildChatSystemPrompt } from "@/lib/chat-context";
import { getFallbackReply, getGeminiReply } from "@/lib/chat-fallback";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = (body.messages ?? []) as ChatMessage[];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    if (messages.length > 20) {
      return NextResponse.json({ error: "Too many messages in conversation" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user" || !lastMessage.content.trim()) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const content = await getSiteContent();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = buildChatSystemPrompt(content);
        const reply = await getGeminiReply(apiKey, messages, systemPrompt);
        return NextResponse.json({ reply });
      } catch (error) {
        console.error("Gemini error, using fallback:", error);
      }
    }

    const reply = await getFallbackReply(lastMessage.content, content);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Sorry, I could not process your question. Please try again." },
      { status: 500 }
    );
  }
}
