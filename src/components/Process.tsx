"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";

export default function Process() {
  const { process } = useContent();

  return (
    <section className="section-pad relative bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#0d2137] p-6 lg:p-9 shadow-2xl">
            <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-xs text-orange-300 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" /> {process.badge}
              </span>
              <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">{process.heading}</h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {process.items.map((s) => (
                  <div key={s.id} className="group rounded-xl glass p-5 hover:bg-white/12 hover:-translate-y-0.5 transition-all duration-300">
                    <span className="font-heading text-2xl font-bold shimmer-text">{s.step}</span>
                    <h4 className="mt-2 font-semibold text-white text-sm">{s.title}</h4>
                    <p className="mt-1 text-xs text-gray-400 leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-white/10">
                <span className="text-xs text-gray-400">{process.footerText}</span>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-2.5 text-sm font-bold text-white hover:scale-105 transition-transform">
                  Start Now <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
