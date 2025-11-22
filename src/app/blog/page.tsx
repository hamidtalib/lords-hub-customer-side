import BlogPage from "@/src/components/blog/page";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default function Blog() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <BlogPage />
      <Footer />
    </main>
  );
}
