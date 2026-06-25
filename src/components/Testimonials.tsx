"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";

export default function Testimonials() {
  const { testimonials } = useContent();
  const [cur, setCur] = useState(0);
  const next = () => setCur((c) => (c + 1) % testimonials.items.length);
  const prev = () => setCur((c) => (c - 1 + testimonials.items.length) % testimonials.items.length);
  const item = testimonials.items[cur];

  return (
    <section className="section-pad relative bg-gray-50" aria-label="Customer testimonials">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <AnimatedSection className="text-center mb-7">
          <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-orange-600">{testimonials.badge}</span>
          <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
            {testimonials.heading} <span className="shimmer-text">{testimonials.headingHighlight}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="relative rounded-2xl bg-white p-6 lg:p-9 shadow-md border border-gray-100">
            <Quote className="absolute top-4 left-4 h-7 w-7 text-orange-200" aria-hidden="true" />
            <div className="text-center transition-opacity duration-300" aria-live="polite" aria-atomic="true">
              <div className="flex justify-center gap-0.5 mb-4" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-orange-400 text-orange-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-base italic text-gray-700 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white" aria-hidden="true">
                  {item.initials}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm text-gray-900">{item.author}</div>
                  <div className="text-xs text-gray-500">{item.role}</div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button type="button" onClick={prev} className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all" aria-label="Previous testimonial">
                <ChevronLeft size={15} />
              </button>
              <div className="flex gap-1" role="tablist" aria-label="Testimonials">
                {testimonials.items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === cur}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => setCur(i)}
                    className={`h-1.5 rounded-full transition-all ${i === cur ? "w-6 bg-orange-500" : "w-1.5 bg-gray-300"}`}
                  />
                ))}
              </div>
              <button type="button" onClick={next} className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all" aria-label="Next testimonial">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
