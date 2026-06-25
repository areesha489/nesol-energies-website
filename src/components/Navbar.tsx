"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { useContent } from "./ContentProvider";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const quoteButtonClass =
  "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-105 whitespace-nowrap sm:px-5";

function navLinkClass(active: boolean, solid: boolean) {
  return `relative inline-flex items-center px-3 py-2 text-[13px] xl:px-3.5 xl:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
    solid
      ? active
        ? "text-orange-500"
        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
      : active
        ? "text-orange-300"
        : "text-white/90 hover:text-white hover:bg-white/10"
  }`;
}

export default function Navbar() {
  const { navLinks, productsNav, contact } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const productsActive = pathname === "/products";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  const solid = scrolled || !isHome;

  function renderDesktopLink(href: string, label: string) {
    const active = pathname === href;
    return (
      <Link key={href} href={href} className={navLinkClass(active, solid)}>
        {label}
        {active && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-orange-500" />}
      </Link>
    );
  }

  function renderProductsDropdown() {
    return (
      <div
        key="products-dropdown"
        className="relative"
        onMouseEnter={() => setProductsOpen(true)}
        onMouseLeave={() => setProductsOpen(false)}
      >
        <Link href="/products" className={navLinkClass(productsActive, solid)}>
          {productsNav.label}
          <ChevronDown
            size={13}
            className={`ml-0.5 shrink-0 opacity-70 transition-transform ${productsOpen ? "rotate-180" : ""}`}
          />
          {productsActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-orange-500" />}
        </Link>

        <div className={`absolute left-0 top-full z-50 pt-2 ${productsOpen ? "block" : "hidden"}`}>
          <div className="min-w-[168px] overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
            {productsNav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

        <div className="hidden lg:flex items-center gap-0.5 flex-nowrap">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            if (l.href === "/services") {
              return (
                <span key={l.href} className="contents">
                  {renderDesktopLink(l.href, l.label)}
                  {renderProductsDropdown()}
                </span>
              );
            }
            return (
              <Link key={l.href} href={l.href} className={navLinkClass(active, solid)}>
                {l.label}
                {active && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-orange-500" />}
              </Link>
            );
          })}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-transform hover:scale-105 hover:bg-[#20bd5a] whitespace-nowrap sm:px-5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <Link href="/contact" className={`ml-2 ${quoteButtonClass}`}>
            Get Free Quote
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/contact" className={quoteButtonClass}>
            Get Free Quote
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className={`p-2 rounded-lg ${solid ? "text-gray-800" : "text-white"}`}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t shadow-xl overflow-hidden"
          >
            <div className="px-5 py-3 flex flex-col gap-0.5">
              {navLinks.map((l) => {
                if (l.href === "/services") {
                  return (
                    <div key={l.href}>
                      <Link
                        href={l.href}
                        className={`block px-4 py-2.5 rounded-lg font-medium ${
                          pathname === l.href ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        {l.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className={`mt-0.5 flex w-full items-center justify-between px-4 py-2.5 rounded-lg font-medium ${
                          productsActive ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        {productsNav.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileProductsOpen && (
                        <div className="ml-4 border-l-2 border-orange-100 pl-3 py-0.5">
                          <Link href="/products" className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600">
                            All Products
                          </Link>
                          {productsNav.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`px-4 py-2.5 rounded-lg font-medium ${
                      pathname === l.href ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
