"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  Headphones,
  Star,
  Zap,
} from "lucide-react";
import type { ProductItem, ProductCategory } from "@/lib/content-types";
import { getProductCover, parseSpecRows } from "@/lib/products";
import { useContent } from "./ContentProvider";

type Tab = "description" | "specifications" | "features";

function RelatedProductCard({ item }: { item: ProductItem }) {
  const cover = getProductCover(item);

  return (
    <Link
      href={`/products/${item.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {cover ? (
          <Image
            src={cover}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">No image</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-orange-500">{item.brand}</p>
        <h3 className="mt-0.5 line-clamp-2 font-heading text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
          {item.name}
        </h3>
      </div>
    </Link>
  );
}

export default function ProductDetail({
  product,
  category,
  relatedProducts,
}: {
  product: ProductItem;
  category: ProductCategory;
  relatedProducts: ProductItem[];
}) {
  const { contact } = useContent();
  const images = product.images.length > 0 ? product.images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const activeImage = images[activeIndex];
  const specRows = parseSpecRows(product.specs);
  const inStock = product.availability.toLowerCase().includes("stock");

  const quoteHref = `/contact?product=${encodeURIComponent(`${product.name} x${quantity}`)}`;
  const whatsappMessage = encodeURIComponent(
    `Hello, I want to buy:\n${product.name}\nQuantity: ${quantity}`,
  );
  const whatsappHref = `${contact.whatsapp}${contact.whatsapp.includes("?") ? "&" : "?"}text=${whatsappMessage}`;

  const tabs: { id: Tab; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "features", label: "Features" },
  ];

  return (
    <>
      <section className="border-b border-gray-100 bg-white pt-24 pb-8 lg:pt-28 lg:pb-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/products" className="hover:text-orange-600 transition-colors">
              Products
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href={`/products#${category.slug}`} className="hover:text-orange-600 transition-colors">
              {category.title}
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="font-medium text-gray-900 line-clamp-1">{product.name}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="space-y-3">
              <div className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-slate-50 to-blue-50 shadow-sm">
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">No image</div>
                )}
                {inStock && (
                  <span className="absolute top-4 left-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    {product.availability}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {images.map((img, i) => (
                    <button
                      key={`${img}-${i}`}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-label={`View ${product.name} image ${i + 1}`}
                      className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                        i === activeIndex
                          ? "border-orange-500 ring-2 ring-orange-200"
                          : "border-gray-100 hover:border-orange-200"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:pt-2">
              <p className="text-sm font-bold uppercase tracking-wider text-orange-500">{product.brand}</p>
              <h1 className="mt-2 font-heading text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl leading-tight">
                {product.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-0.5 text-amber-400" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">Tier-1 verified product</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {specRows.map((row, i) => (
                  <span
                    key={`${row.value}-${i}`}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    <Zap size={11} />
                    {row.value}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700">Quantity</p>
                <div className="mt-2 inline-flex items-center rounded-xl border border-gray-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center text-gray-600 hover:text-orange-600 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-10 text-center text-base font-bold text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-11 w-11 items-center justify-center text-gray-600 hover:text-orange-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] bg-white px-5 py-3 text-sm font-bold text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                >
                  WhatsApp Order
                </a>
                <Link
                  href={quoteHref}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Get a Quote
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Truck, label: "Nationwide Delivery", sub: "Across Pakistan" },
                  { icon: Shield, label: "Official Warranty", sub: "Manufacturer backed" },
                  { icon: Headphones, label: "Expert Support", sub: "Installation help" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-white p-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.label}</p>
                      <p className="text-[11px] text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-gray-50 py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex gap-1 overflow-x-auto border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
            {activeTab === "description" && (
              <p className="text-sm sm:text-base leading-relaxed text-gray-600">{product.description}</p>
            )}

            {activeTab === "specifications" && (
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <tbody>
                    {specRows.map((row, i) => (
                      <tr key={`${row.label}-${i}`} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-3 font-semibold text-gray-700 w-2/5">{row.value}</td>
                        <td className="px-4 py-3 text-gray-600">Verified specification</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-700">Brand</td>
                      <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-gray-700">Availability</td>
                      <td className="px-4 py-3 text-gray-600">{product.availability}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "features" && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check size={12} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-gray-900 sm:text-2xl">Related Products</h2>
            <p className="mt-1 text-sm text-gray-600">More from {category.title}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <RelatedProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
