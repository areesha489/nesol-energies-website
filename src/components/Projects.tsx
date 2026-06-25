"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Zap, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "./ContentProvider";
import type { Project } from "@/lib/content-types";

function ProjectCard({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const images = project.images ?? [];
  const hasMultiple = images.length > 1;
  const current = images[index];

  function prevImage(e: React.MouseEvent) {
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function nextImage(e: React.MouseEvent) {
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <div className="group overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-400 hover:shadow-xl hover:-translate-y-1.5">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        {images.length > 0 ? (
          <Image
            src={current}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 text-xs font-medium text-gray-400">
            No image
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight size={14} />
            </button>
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-heading text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{project.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-600">
          <Zap size={14} className="shrink-0 text-orange-500" />
          {project.kw}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin size={14} className="shrink-0 text-blue-500" />
          {project.location}
        </p>
      </div>
    </div>
  );
}

export default function Projects({ preview = false }: { preview?: boolean }) {
  const { projects } = useContent();
  const list = preview ? projects.items.slice(0, 3) : projects.items;

  return (
    <section className="section-pad relative bg-gray-50 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-9">
          <span className="inline-block rounded-full bg-teal-100 px-3.5 py-1 text-xs font-bold text-teal-600">{projects.badge}</span>
          <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            {projects.heading}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{projects.headingHighlight}</span>
          </h2>
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 0.06}>
              <ProjectCard project={p} />
            </AnimatedSection>
          ))}
        </div>

        {preview && (
          <AnimatedSection className="text-center mt-7">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border-2 border-blue-600 px-6 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
              View All Projects <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
