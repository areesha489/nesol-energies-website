"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useContent } from "./ContentProvider";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar() {
  const { navLinks, contact } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const solid = scrolled || !isHome;

  return (
    <motion.nav
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        solid ? "bg-white/95 backdrop-blur-xl shadow-md py-1.5" : "bg-gradient-to-b from-black/60 to-transparent py-3"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo variant="nav" theme={solid ? "light" : "dark"} />

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  solid
                    ? active ? "text-orange-500" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    : active ? "text-orange-300" : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {l.label}
                {active && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-orange-500" />}
              </Link>
            );
          })}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-green-500/25 hover:scale-105 hover:bg-[#20bd5a] transition-all"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <Link href="/contact" className="ml-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:scale-105 transition-transform">
            Get Free Quote
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg ${solid ? "text-gray-800" : "text-white"}`} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-white border-t shadow-xl overflow-hidden">
            <div className="px-5 py-3 flex flex-col gap-0.5">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className={`px-4 py-2.5 rounded-lg font-medium ${pathname === l.href ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-blue-50"}`}>
                  {l.label}
                </Link>
              ))}
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <Link href="/contact" className="mt-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-center font-bold text-white">Get Free Quote</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
