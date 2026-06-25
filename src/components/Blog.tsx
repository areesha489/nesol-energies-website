"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function Blog() {
  const { blog } = useContent();

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
            {blog.badge}
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            {blog.heading}{" "}
            <span className="shimmer-text">{blog.headingHighlight}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">{blog.subtitle}</p>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blog.posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 transition-all duration-400 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={i < 3 ? "eager" : "lazy"}
                    unoptimized={post.image.startsWith("/uploads/")}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-500 group-hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
