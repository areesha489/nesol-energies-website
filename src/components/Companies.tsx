"use client";

import Link from "next/link";
import { Building, Home, Zap, Leaf, Layers, ArrowUpRight, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { BrandSocialIcons, type SocialIconName } from "./SocialIcons";
import { useContent } from "./ContentProvider";

const iconMap = {
  layers: Layers,
  home: Home,
  zap: Zap,
  leaf: Leaf,
  building: Building,
} as const;

export default function Companies({ preview = false }: { preview?: boolean }) {
  const { companies } = useContent();
  const list = preview ? companies.items.slice(0, 2) : companies.items;

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#001a33]" />
      <div className="absolute top-0 left-1/3 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/3 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-9">
          <span className="inline-block rounded-full bg-orange-500/20 px-3.5 py-1 text-xs font-bold text-orange-300">
            {companies.badge}
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {companies.heading} <span className="shimmer-text">{companies.headingHighlight}</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 sm:text-base">{companies.subtitle}</p>
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((c, i) => {
            const Icon = iconMap[c.icon as keyof typeof iconMap] ?? Building;
            return (
              <AnimatedSection key={c.id} delay={i * 0.08}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 transition-all duration-400 hover:-translate-y-1 hover:bg-white/12 ${
                    c.featured ? "ring-1 ring-orange-400/40" : ""
                  }`}
                >
                  <div
                    className={`absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white`}
                    >
                      <Icon size={18} />
                    </div>
                    {c.featured && (
                      <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-300">
                        This Site
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-white sm:text-xl">
                    {c.name}
                  </h3>
                  <p className="text-xs font-semibold text-orange-300 mt-0.5">{c.tagline}</p>
                  <p className="mt-2.5 flex-1 text-sm text-gray-400 leading-relaxed">{c.description}</p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-sm font-bold text-cyan-400 group-hover:gap-2 transition-all"
                    >
                      Learn More <ArrowUpRight size={14} />
                    </Link>
                    {!preview && (
                      <BrandSocialIcons
                        links={c.social.map((s) => ({
                          icon: s.icon as SocialIconName,
                          href: s.href,
                          label: s.label,
                        }))}
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {preview && (
          <AnimatedSection className="text-center mt-7">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-2.5 text-sm font-bold text-white hover:bg-white/15 transition-all"
            >
              View All Companies <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
