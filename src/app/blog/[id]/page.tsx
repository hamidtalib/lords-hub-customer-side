import BlogPostClient from "./BlogPostClient";

// Generate static paths for blog posts
export async function generateStaticParams() {
  // For static export, we'll generate some common blog post IDs
  // In a real scenario, you'd fetch these from your CMS or database
  return [
    { id: 'getting-started-lords-mobile' },
    { id: 'best-strategies-2024' },
    { id: 'kingdom-vs-kingdom-guide' },
    { id: 'hero-builds-guide' },
    { id: 'resource-management-tips' },
  ];
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogPostClient id={id} />;
}