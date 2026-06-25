"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[5.25rem] right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-xl shadow-orange-500/30 transition-all hover:scale-110 animate-fade-in"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
