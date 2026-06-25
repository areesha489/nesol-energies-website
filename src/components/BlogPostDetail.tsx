"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import type { BlogPost } from "@/lib/content-types";

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

export default function BlogPostDetail({ post }: { post: BlogPost }) {
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <article className="section-pad bg-white">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User size={14} />
            {post.author}
          </span>
        </div>

        <h1 className="mt-4 font-heading text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">{post.title}</h1>

        <div className="relative mt-6 aspect-[16/9] max-h-[420px] overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            unoptimized={post.image.startsWith("/uploads/")}
          />
        </div>

        <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
