import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/BlogPostDetail";
import CTABanner from "@/components/CTABanner";
import { getSiteContent } from "@/lib/content-store";
import { createPageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const content = await getSiteContent();
  const post = content.blog.posts.find((p) => p.id === id);
  if (!post) return { title: "Blog | Nesol Energies" };
  return createPageMetadata(`/blog/${id}`, post.title, post.excerpt, post.image);
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const content = await getSiteContent();
  const post = content.blog.posts.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <>
      <BlogPostDetail post={post} />
      <CTABanner />
    </>
  );
}
