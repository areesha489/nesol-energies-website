"use client";

import Link from "next/link";
import { Sun, Wind, Battery, Building2, Wrench, BarChart3, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";

const iconMap = { sun: Sun, wind: Wind, battery: Battery, building: Building2, wrench: Wrench, chart: BarChart3 };

export default function Services({ preview = false }: { preview?: boolean }) {
  const { services } = useContent();
  const list = preview ? services.items.slice(0, 3) : services.items;

  return (
    <section className="section-pad relative bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#0056b3 1px,transparent 1px),linear-gradient(90deg,#0056b3 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-9">
          <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-600">{services.badge}</span>
          <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            {services.heading} <span className="shimmer-text">{services.headingHighlight}</span>
          </h2>
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <AnimatedSection key={s.id} delay={i * 0.06}>
                <div className={`group relative h-full rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1.5 ${s.featured ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25" : "bg-gray-50 border border-gray-100 hover:shadow-lg hover:border-orange-200"}`}>
                  {s.featured && <span className="absolute top-3 right-3 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold">Popular</span>}
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-3 ${s.featured ? "bg-white/20" : "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className={`mt-4 font-heading text-lg font-bold ${s.featured ? "text-white" : "text-gray-900"}`}>{s.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${s.featured ? "text-white/80" : "text-gray-600"}`}>{s.description}</p>
                  <Link href="/contact" className={`mt-4 inline-flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all ${s.featured ? "text-white" : "text-orange-500"}`}>
                    Get Quote <ArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {preview && (
          <AnimatedSection className="text-center mt-7">
            <Link href="/services" className="inline-flex items-center gap-2 rounded-full border-2 border-blue-600 px-6 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
              View All Services <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
