import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicPageHeader from "@/components/DynamicPageHeader";
import BlogPostDetail from "@/components/BlogPostDetail";
import CTABanner from "@/components/CTABanner";
import { getSiteContent } from "@/lib/content-store";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const content = await getSiteContent();
  const post = content.blog.posts.find((p) => p.id === id);
  if (!post) return { title: "Blog | Nesol Energies" };
  return {
    title: `${post.title} | Nesol Energies`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const content = await getSiteContent();
  const post = content.blog.posts.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <>
      <DynamicPageHeader pageKey="blog" />
      <BlogPostDetail post={post} />
      <CTABanner />
    </>
  );
}
