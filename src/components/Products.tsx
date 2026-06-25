"use client";

import Link from "next/link";
import Image from "next/image";
import { Sun, Zap, Battery, Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";
import type { ProductItem } from "@/lib/content-types";
import { getProductCover } from "@/lib/products";

const categoryIcons = {
  panels: Sun,
  inverters: Zap,
  batteries: Battery,
};

function ProductCard({ item, categorySlug }: { item: ProductItem; categorySlug: string }) {
  const cover = getProductCover(item);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
      <Link href={`/products/${item.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
          {cover ? (
            <Image
              src={cover}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:640px) 50vw, 25vw"
              unoptimized={cover.startsWith("/uploads/")}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">No image</div>
          )}
          <span className="absolute top-3 left-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700 shadow-sm">
            {item.brand}
          </span>
          {item.availability.toLowerCase().includes("stock") && (
            <span className="absolute top-3 right-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white">
              In Stock
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">{categorySlug}</p>
        <Link href={`/products/${item.id}`} className="mt-1 block">
          <h4 className="font-heading text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors sm:text-base">
            {item.name}
          </h4>
        </Link>

        <div className="mt-2 flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={10} fill="currentColor" />
          ))}
        </div>

        <p className="mt-2 text-xs text-gray-500 line-clamp-1">{item.specs}</p>

        <div className="mt-auto pt-4">
          <Link
            href={`/products/${item.id}`}
            className="flex w-full items-center justify-center rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-semibold text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors sm:text-sm"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const { products } = useContent();

  return (
    <section className="section-pad relative bg-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#0056b3 1px,transparent 1px),linear-gradient(90deg,#0056b3 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-600">
            {products.badge}
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            {products.heading}{" "}
            <span className="shimmer-text">{products.headingHighlight}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">{products.subtitle}</p>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {products.categories.map((cat) => {
            const Icon = categoryIcons[cat.slug as keyof typeof categoryIcons] ?? Sun;
            return (
              <a
                key={cat.id}
                href={`#${cat.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                <Icon size={16} />
                {cat.title}
              </a>
            );
          })}
        </div>

        <div className="space-y-14">
          {products.categories.map((category, catIndex) => {
            const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] ?? Sun;
            return (
              <div key={category.id} id={category.slug} className="scroll-mt-28">
                <AnimatedSection delay={catIndex * 0.05}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.subtitle}</p>
                    </div>
                  </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.items.map((item, i) => (
                    <AnimatedSection key={item.id} delay={i * 0.04} className="h-full">
                      <ProductCard item={item} categorySlug={category.title} />
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
