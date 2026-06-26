"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Cpu, Wallet, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";
import { defaultSiteContent } from "@/lib/default-content";

const iconMap = { shield: Shield, cpu: Cpu, wallet: Wallet };

export default function About({ preview = false }: { preview?: boolean }) {
  const { about } = useContent();
  const [imageSrc, setImageSrc] = useState(about.image);

  return (
    <section className="section-pad relative bg-gray-50 overflow-hidden">
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <AnimatedSection>
            <div className="relative group">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-orange-400 p-[2px] shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                  <Image
                    src={imageSrc}
                    alt="Solar panels on a residential rooftop"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={75}
                    onError={() => setImageSrc(defaultSiteContent.about.image)}
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3.5 shadow-xl shadow-orange-500/30">
                <div className="font-heading text-3xl font-bold text-white">{about.yearsBadge.value}</div>
                <div className="text-xs text-white/90">{about.yearsBadge.label}</div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-orange-600">{about.badge}</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              {about.heading}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{about.headingHighlight}</span>
            </h2>
            <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">{about.paragraph}</p>
            <div className="mt-6 space-y-3">
              {about.features.map((f) => {
                const Icon = iconMap[f.icon as keyof typeof iconMap] ?? Shield;
                return (
                  <div key={f.id} className="flex gap-3 rounded-xl bg-white p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{f.title}</h4>
                      <p className="text-xs text-gray-600 mt-0.5 sm:text-sm">{f.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {preview && (
              <Link href="/about" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:gap-2.5 transition-all">
                Learn More <ArrowRight size={15} />
              </Link>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
