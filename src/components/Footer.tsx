"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import { useContent } from "./ContentProvider";

export default function Footer() {
  const { navLinks, contact, footer } = useContent();
  return (
    <footer className="relative bg-[#0a1628] text-gray-400 overflow-hidden">
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-11 lg:px-8">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="footer" />
            <p className="mt-3 text-xs leading-relaxed sm:text-sm">{footer.tagline}</p>
            <SocialIcons className="mt-4" />
          </div>
          <div>
            <h6 className="font-bold text-white mb-3 text-sm">Quick Links</h6>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-orange-400 transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-white mb-3 text-sm">Services</h6>
            <ul className="space-y-2 text-xs sm:text-sm">
              {footer.serviceLinks.map((s) => (
                <li key={s}><Link href="/services" className="hover:text-orange-400 transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-white mb-3 text-sm">For More Details:</h6>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" required className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none sm:text-sm" />
              <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 text-white hover:scale-105 transition-transform"><ArrowRight size={14} /></button>
            </form>
            <div className="mt-5 space-y-2.5 text-xs sm:text-sm leading-relaxed">
              <p>
                <span className="font-semibold text-white">Phone: </span>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-orange-400 transition-colors">
                  {contact.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Email: </span>
                <a href={`mailto:${contact.email}`} className="hover:text-orange-400 transition-colors">
                  {contact.email}
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Address: </span>
                {contact.address.line1}, {contact.address.line2}, {contact.address.line3}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:text-sm">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} {footer.copyright}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
