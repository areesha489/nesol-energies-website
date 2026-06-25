"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Zap,
  Minus,
  Plus,
  Sparkles,
  Sun,
  BatteryCharging,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";
import { formatPrice, getPriceRange } from "@/lib/pricing-utils";

export default function PricingCalculator({ id = "calculator" }: { id?: string }) {
  const { pricingCalculator } = useContent();
  const [kwInput, setKwInput] = useState("5");

  const kw = parseFloat(kwInput);
  const result = useMemo(
    () => (Number.isFinite(kw) && kw > 0 ? getPriceRange(kw, pricingCalculator.tiers) : null),
    [kw, pricingCalculator.tiers]
  );

  const sortedTiers = [...pricingCalculator.tiers].sort((a, b) => a.kw - b.kw);

  function adjustKw(delta: number) {
    const next = Math.max(0.5, (Number.isFinite(kw) ? kw : 0) + delta);
    setKwInput(String(Number(next.toFixed(1))));
  }

  const rangePercent =
    result && result.max > result.min
      ? Math.min(100, Math.max(8, ((result.max - result.min) / result.max) * 100))
      : 50;

  return (
    <section id={id} className="section-pad relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-orange-50/30" />
      <div className="absolute top-10 left-1/4 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#0056b3 1px,transparent 1px),linear-gradient(90deg,#0056b3 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-400/10 border border-orange-200/60 px-4 py-1.5 text-xs font-bold text-orange-600">
            <Calculator size={14} className="text-orange-500" />
            {pricingCalculator.badge}
          </span>
          <h2 className="mt-4 font-heading text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            {pricingCalculator.heading}{" "}
            <span className="shimmer-text">{pricingCalculator.headingHighlight}</span>
          </h2>
          <p className="mt-3 text-sm text-gray-600 sm:text-base leading-relaxed">{pricingCalculator.subtitle}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#001a33] p-1 shadow-2xl shadow-blue-900/20">
            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />

            <div className="relative rounded-[22px] bg-gradient-to-br from-[#0a1628]/95 to-[#0d2137]/95 p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                {/* Input panel */}
                <div>
                  <div className="flex items-center gap-2 text-orange-300 mb-5">
                    <Sun size={16} className="text-orange-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">System Size</span>
                  </div>

                  <label htmlFor="kw-input" className="sr-only">
                    {pricingCalculator.inputLabel}
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => adjustKw(-0.5)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass text-white hover:bg-orange-500/30 hover:border-orange-400/40 transition-all active:scale-95"
                      aria-label="Decrease kW"
                    >
                      <Minus size={20} />
                    </button>

                    <div className="relative flex-1">
                      <input
                        id="kw-input"
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={kwInput}
                        onChange={(e) => setKwInput(e.target.value)}
                        className="w-full rounded-2xl border-2 border-white/10 bg-white/5 py-4 text-center font-heading text-4xl font-bold text-white placeholder:text-white/20 focus:border-orange-400/60 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all"
                      />
                      <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-300/80">
                        kW
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => adjustKw(0.5)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass text-white hover:bg-orange-500/30 hover:border-orange-400/40 transition-all active:scale-95"
                      aria-label="Increase kW"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <p className="mt-3 text-center text-xs text-gray-500">{pricingCalculator.inputLabel}</p>

                  {sortedTiers.length > 0 && (
                    <div className="mt-6">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Popular sizes</p>
                      <div className="flex flex-wrap gap-2">
                        {sortedTiers.map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setKwInput(String(tier.kw))}
                            className={`group relative overflow-hidden rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                              kw === tier.kw
                                ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/30 scale-105"
                                : "glass text-gray-300 hover:text-white hover:border-orange-400/30"
                            }`}
                          >
                            <span className="relative flex items-center gap-1.5">
                              <Zap size={12} className={kw === tier.kw ? "text-white" : "text-orange-400"} />
                              {tier.kw} kW
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 hidden lg:flex items-center gap-3 rounded-xl glass p-4">
                    <BatteryCharging size={20} className="text-cyan-400 shrink-0" />
                    <p className="text-xs text-gray-400 leading-relaxed">{pricingCalculator.note}</p>
                  </div>
                </div>

                {/* Results panel */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-cyan-300 mb-5">
                    <Sparkles size={16} className="text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">Estimated Budget</span>
                  </div>

                  {result ? (
                    <div key={`${result.kw}-${result.min}-${result.max}`} className="flex-1 flex flex-col gap-4">
                        <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-400/20 p-5 sm:p-6">
                          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300/90">
                            {pricingCalculator.minLabel}
                          </p>
                          <p className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
                            {formatPrice(result.min, pricingCalculator.currency)}
                          </p>
                          <p className="mt-1 text-xs text-cyan-200/60">Starting estimate</p>
                        </div>

                        <div className="relative px-1">
                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-400 transition-all duration-500 ease-out"
                              style={{ width: `${rangePercent}%` }}
                            />
                          </div>
                          <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wide text-gray-300">
                            <span>Low</span>
                            <span className="text-orange-300">{result.kw} kW System</span>
                            <span>High</span>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-orange-500/25 to-amber-400/10 border border-orange-400/25 p-5 sm:p-6">
                          <p className="text-xs font-bold uppercase tracking-wider text-orange-300/90">
                            {pricingCalculator.maxLabel}
                          </p>
                          <p className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
                            {formatPrice(result.max, pricingCalculator.currency)}
                          </p>
                          <p className="mt-1 text-xs text-orange-200/60">Premium estimate</p>
                        </div>

                        {!result.exact && (
                          <p className="text-center text-[11px] text-amber-300/80">
                            * Interpolated from nearest kW rates
                          </p>
                        )}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
                      <Calculator size={40} className="text-white/20 mb-3" aria-hidden="true" />
                      <p className="text-sm text-gray-300">Enter a valid kW value</p>
                      <p className="mt-1 text-xs text-gray-400">e.g. 3, 5, or 10</p>
                    </div>
                  )}

                  <Link
                    href="/contact"
                    className="mt-6 group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/25 hover:scale-[1.02] hover:shadow-orange-500/40 transition-all"
                  >
                    {pricingCalculator.buttonText}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-gray-500 leading-relaxed lg:hidden">{pricingCalculator.note}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
