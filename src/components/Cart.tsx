"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "./CartProvider";
import { useContent } from "./ContentProvider";
import { formatPrice } from "@/lib/products";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { contact } = useContent();

  const whatsappMessage = encodeURIComponent(
    `Hello Nesol Energies, I would like to order:\n\n${items
      .map((item) => `• ${item.name} x${item.quantity}${item.price > 0 ? ` — ${formatPrice(item.price * item.quantity)}` : ""}`)
      .join("\n")}\n\nTotal: ${subtotal > 0 ? formatPrice(subtotal) : "Please share quote"}`,
  );
  const whatsappHref = `${contact.whatsapp}${contact.whatsapp.includes("?") ? "&" : "?"}text=${whatsappMessage}`;
  const quoteHref = `/contact?product=${encodeURIComponent(items.map((item) => `${item.name} x${item.quantity}`).join(", "))}`;

  if (items.length === 0) {
    return (
      <section className="section-pad bg-gray-50">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <ShoppingBag size={28} />
          </div>
          <h1 className="mt-5 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-600">Browse our solar panels, inverters, and batteries to get started.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:brightness-105 transition-all"
          >
            Shop Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad bg-gray-50">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 sm:text-3xl">Shopping Cart</h1>
            <p className="mt-1 text-sm text-gray-600">{items.length} product{items.length === 1 ? "" : "s"} in your cart</p>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            Clear cart
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.productId}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">No image</div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/products/${item.productId}`}
                        className="font-heading text-base font-bold text-gray-900 hover:text-orange-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      {item.price > 0 && (
                        <p className="mt-1 text-sm font-semibold text-orange-600">{formatPrice(item.price)}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <div className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center text-gray-600 hover:text-orange-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center text-gray-600 hover:text-orange-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    {item.price > 0 && (
                      <p className="text-sm font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-heading text-lg font-bold text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {subtotal > 0 ? formatPrice(subtotal) : "On request"}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-semibold text-emerald-600">Calculated at checkout</span>
              </div>
            </div>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-heading text-xl font-bold text-orange-600">
                  {subtotal > 0 ? formatPrice(subtotal) : "On request"}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:brightness-105 transition-all"
              >
                Order via WhatsApp
              </a>
              <Link
                href={quoteHref}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:brightness-105 transition-all"
              >
                Request Quote
              </Link>
              <Link
                href="/products"
                className="flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-orange-200 hover:bg-orange-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
