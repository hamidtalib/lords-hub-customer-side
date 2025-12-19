import BlogPostClient from "./BlogPostClient";

// Generate static paths for blog posts
export async function generateStaticParams() {
  try {
    // Import Firebase here to avoid build issues
    const { firestore } = await import("@/src/config/firebase");
    const { collection, getDocs } = await import("firebase/firestore");
    
    const snapshot = await getDocs(collection(firestore, "blogs"));
    const paths = snapshot.docs.map((doc) => ({
      id: doc.id,
    }));
    
    return paths;
  } catch (error) {
    console.error("Error generating static params:", error);
    // Fallback to empty array for dynamic rendering
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogPostClient id={id} />;
}