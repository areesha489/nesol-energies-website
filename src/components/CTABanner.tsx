"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";

export default function CTABanner() {
  const { cta } = useContent();

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 p-7 lg:p-11">
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-5">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">{cta.heading}</h2>
                <p className="mt-2 text-sm text-white/85 sm:text-base">{cta.subtitle}</p>
              </div>
              <Link href="/contact" className="group inline-flex items-center gap-2 shrink-0 rounded-full bg-white px-6 py-3.5 font-bold text-blue-600 shadow-xl hover:scale-105 transition-transform text-sm sm:text-base">
                {cta.buttonText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
