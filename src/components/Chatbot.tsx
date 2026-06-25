"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useContent } from "./ContentProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function getWelcomeMessage(phone: string) {
  return `Assalam-o-Alaikum! Nesol Energies se rabta karne ka shukriya. Main aapki kya help kar sakta hoon? Aap solar, hamari services, prices ya koi bhi general sawal pooch sakte hain.\n\nNesol se direct rabta: ${phone}`;
}

const quickQuestions = [
  "Solar panel kitne ka parta hai?",
  "5 kW system ki price kya hai?",
  "Nesol Energies kya services deti hai?",
  "Karachi mein office kahan hai?",
];

export default function Chatbot() {
  const { contact } = useContent();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "assistant", content: getWelcomeMessage(contact.phone) },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function closeChat() {
    setOpen(false);
    setInput("");
    setLoading(false);
    setMessages([{ role: "assistant", content: getWelcomeMessage(contact.phone) }]);
  }

  function toggleChat() {
    if (open) closeChat();
    else setOpen(true);
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Kuch masla ho gaya. Dobara try karein ya humein call karein: " + contact.phone,
          },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again or contact us at " + contact.phone },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Nesol Energies chat support"
          className="fixed bottom-[9rem] right-5 z-50 flex h-[min(520px,calc(100vh-12rem))] w-[min(400px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl shadow-black/40 animate-fade-in"
        >
            <div className="relative shrink-0 bg-gradient-to-r from-[#0d2137] to-[#0a1628] px-4 py-4 border-b border-white/10">
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-sm font-bold text-white">Nesol Energies</h3>
                  <p className="text-[10px] text-gray-400">Online Support</p>
                </div>
                <button
                  type="button"
                  onClick={closeChat}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "ml-auto bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-br-sm"
                      : "mr-auto bg-white/10 text-gray-100 rounded-bl-sm border border-white/5"
                  }`}
                >
                  {msg.content}
                </div>
              ))}

              {loading && (
                <div className="mr-auto rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3 border border-white/5">
                  <span className="text-xs text-gray-400">Jawab tayyar ho raha hai...</span>
                </div>
              )}

              {messages.length <= 1 && !loading && (
                <div className="pt-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Quick questions</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="rounded-full glass px-3 py-1.5 text-[11px] text-gray-300 hover:bg-white/15 hover:text-white transition-all text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="shrink-0 border-t border-white/10 bg-[#0a1628]/95 p-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  id="chatbot-message"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Apna sawal likhein..."
                  disabled={loading}
                  aria-label="Your message"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-400 focus:border-orange-400/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="shrink-0 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  Send
                </button>
              </div>
              <p className="mt-2 text-center text-[9px] text-gray-600">
                Official quote ke liye contact karein: {contact.phone}
              </p>
            </form>
        </div>
      )}

      <button
        type="button"
        onClick={toggleChat}
        className={`fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 ${
          open
            ? "bg-white/10 backdrop-blur-md border border-white/20 text-white"
            : "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-orange-500/30"
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </>
  );
}
