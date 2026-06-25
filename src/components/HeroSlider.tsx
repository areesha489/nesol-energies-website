"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap, Download } from "lucide-react";
import Counter from "./Counter";
import { useContent } from "./ContentProvider";

const HeroVideo = dynamic(() => import("./HeroVideo"), { ssr: false });

export default function HeroSlider() {
  const { hero, stats, site } = useContent();
  const heroSlides = hero.slides;
  const companyProfilePdf = site.companyProfilePdf;
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const INTERVAL = 5500;

  const goTo = useCallback((idx: number) => setCurrent(idx), []);
  const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo, heroSlides.length]);
  const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo, heroSlides.length]);

  useEffect(() => {
    setProgress(0);
    const step = 50;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + (step / INTERVAL) * 100;
      });
    }, step);
    return () => clearInterval(timer);
  }, [current, next]);

  const slide = heroSlides[current];

  const visibleSlideIndexes = useMemo(() => {
    const nextIndex = (current + 1) % heroSlides.length;
    return new Set([current, nextIndex]);
  }, [current, heroSlides.length]);

  return (
    <section className="relative h-[90vh] min-h-[580px] max-h-[860px] overflow-hidden bg-[#0a1628]" aria-roledescription="carousel" aria-label="Hero slides">
      <div className="absolute inset-0">
        {heroSlides.map((s, i) => {
          if (!visibleSlideIndexes.has(i)) return null;

          return (
            <div key={s.id} className={`absolute inset-0 ${i === current ? "block" : "hidden"}`}>
              <Image
                src={s.image}
                alt={s.title}
                fill
                className={`object-cover ${i === current ? "ken-burns" : ""}`}
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="100vw"
              />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/40" />

      <div className="absolute top-1/4 right-1/4 hidden h-64 w-64 rounded-full bg-orange-500/10 blur-3xl pulse-ring lg:block" />
      <div
        className="absolute bottom-1/4 left-1/3 hidden h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl pulse-ring lg:block"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-start px-5 pt-24 pb-44 sm:justify-center sm:pt-20 sm:pb-36 lg:px-8 lg:pb-32">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="hero-fade-in mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-orange-200 sm:text-sm">
              <Zap size={14} className="text-orange-400" />
              {hero.badge}
            </div>

            <div>
              <h1 className="font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">
                {slide.title}{" "}
                <span className="shimmer-text">{slide.highlight}</span>
              </h1>
              <p className="mt-4 max-w-md text-base text-gray-300 sm:text-lg">{slide.subtitle}</p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={companyProfilePdf}
                download="Nesol-Energies-Company-Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-orange-500/50 sm:text-base"
              >
                {hero.primaryButton}
                <Download size={17} className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15 sm:text-base"
              >
                {hero.secondaryButton}
              </Link>
            </div>
          </div>

          <div className="hero-fade-in-delayed hidden lg:flex items-center justify-center">
            <div className="relative float-anim">
              <div className="absolute -inset-4 rounded-full border border-orange-400/20" />
              <div className="absolute -inset-8 rounded-full border border-dashed border-cyan-400/15" />

              <div className="relative h-[320px] w-[320px] overflow-hidden rounded-2xl border-4 border-white/90 bg-[#0a1628] shadow-2xl shadow-black/50">
                <HeroVideo poster={slide.showcase || slide.image} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>

              <div className="float-anim-reverse absolute -right-10 top-2 flex h-[112px] w-[112px] flex-col items-center justify-center rounded-full border-2 border-orange-400/50 bg-gradient-to-br from-orange-500 to-amber-500 p-3 text-center shadow-xl shadow-orange-500/35">
                <span className="font-heading text-2xl font-bold leading-none text-white">{hero.floatingStats.savings.value}</span>
                <span className="mt-1.5 text-[10px] font-semibold leading-tight text-white/95">{hero.floatingStats.savings.label}</span>
              </div>

              <div className="float-anim absolute -left-12 bottom-2 flex h-[118px] w-[118px] flex-col items-center justify-center rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-blue-600 to-cyan-500 p-3 text-center shadow-xl shadow-cyan-500/30">
                <span className="font-heading text-2xl font-bold leading-none text-white">{hero.floatingStats.customers.value}</span>
                <span className="mt-1.5 text-[10px] font-semibold leading-tight text-white/95">{hero.floatingStats.customers.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mx-5 h-0.5 overflow-hidden rounded-full bg-white/10 sm:mx-8 lg:mx-8">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="border-t border-white/10 glass">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 py-4 sm:grid-cols-4 lg:px-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-xl font-bold text-white sm:text-2xl">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[8.75rem] right-5 z-30 flex items-center gap-2 sm:bottom-[5.5rem] lg:right-8">
        <button onClick={prev} className="flex h-9 w-9 items-center justify-center rounded-full glass text-white hover:bg-orange-500/80 transition-all" aria-label="Previous">
          <ChevronLeft size={18} />
        </button>
        <div className="flex flex-col gap-1.5">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="group flex items-center gap-2" aria-label={`Slide ${i + 1}`}>
              <span className={`block h-1 rounded-full transition-all duration-300 ${i === current ? "w-10 bg-orange-400" : "w-4 bg-white/30 group-hover:bg-white/60"}`} />
            </button>
          ))}
        </div>
        <button onClick={next} className="flex h-9 w-9 items-center justify-center rounded-full glass text-white hover:bg-orange-500/80 transition-all" aria-label="Next">
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
