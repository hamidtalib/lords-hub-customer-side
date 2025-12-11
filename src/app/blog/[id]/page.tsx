"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadBlogPost } from "@/store/thunks/blogThunk";
import { clearCurrentPost } from "@/store/slices/blogSlice";
import { useParams, useRouter } from "next/navigation";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Button } from "@/src/components/ui/button";
import { Calendar, User, ArrowLeft, Share2, BookOpen } from "lucide-react";
import { toast } from "react-toastify";
import { BlogArticleSkeleton } from "@/src/components/loaders";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, loading, error } = useSelector((state: RootState) => state.blog);
  
  const postId = params.id as string;

  useEffect(() => {
    if (postId) {
      dispatch(loadBlogPost(postId));
    }

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, postId]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Recent";
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Recent";
    }
  };

  const handleShare = async () => {
    if (navigator.share && currentPost) {
      try {
        await navigator.share({
          title: currentPost.title,
          text: currentPost.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <BlogArticleSkeleton />
        <Footer />
      </>
    );
  }

  if (error || !currentPost) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-400 mb-4">Article Not Found</h1>
            <p className="text-slate-500 mb-6">
              {error || "The article you're looking for doesn't exist or has been removed."}
            </p>
            <Button
              onClick={() => router.push("/blog")}
              className="btn-game font-bold cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <ScrollAnimation />

      {/* Navigation Bar */}
      <section className="px-4 py-6 border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto">
          <Button
            onClick={() => router.push("/blog")}
            variant="ghost"
            className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </section>

      {/* Hero Section with Featured Image */}
      <section className="relative px-4 py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="order-2 lg:order-1">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  📖 {currentPost.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text mb-6 leading-tight">
                {currentPost.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-slate-300 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500/30 to-amber-600/30 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="font-semibold">{currentPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-400" />
                  </div>
                  <span>{formatDate(currentPost.createdAt)}</span>
                </div>
              </div>

              {/* Share Button */}
              <Button
                onClick={handleShare}
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>

            {/* Image Side */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 group">
                <img
                  src={currentPost.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"}
                  alt={currentPost.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                
                {/* Floating Elements */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-blue-500/20 rounded-full blur-lg animate-pulse delay-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative px-4 py-16 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 overflow-hidden">
        {/* Decorative Side Images */}
        <div className="absolute left-0 top-20 w-32 h-64 opacity-10 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80"
            alt="Gaming decoration"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
        <div className="absolute right-0 top-40 w-32 h-64 opacity-10 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&q=80"
            alt="Gaming decoration"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>
        <div className="absolute left-0 bottom-20 w-28 h-48 opacity-8 hidden xl:block">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80"
            alt="Gaming decoration"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
        <div className="absolute right-0 bottom-40 w-28 h-48 opacity-8 hidden xl:block">
          <img
            src="https://images.unsplash.com/photo-1604079628040-94301bb21b46?w=400&q=80"
            alt="Gaming decoration"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-20 w-20 h-20 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-green-500/5 rounded-full blur-2xl animate-pulse delay-700" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Content Container */}
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-amber-500/30 shadow-2xl backdrop-blur-lg overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-full" />
            
            {/* Content Wrapper */}
            <div className="relative z-10">
              <article className="max-w-none">
                <div 
                  className="blog-content text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentPost.description }}
                />
              </article>
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-12 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-xl p-6 border border-slate-600/50 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500/30 to-amber-600/30 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-300 font-semibold">Last Updated</p>
                  <p className="text-slate-400 text-sm">{formatDate(currentPost.updatedAt)}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  onClick={() => router.push("/blog")}
                  variant="outline"
                  className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 font-bold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  More Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="px-4 py-16 border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-black gradient-text mb-4">
            📚 Explore More
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover more gaming tips, strategies, and insights from Lords Hub
          </p>
          <Button
            onClick={() => router.push("/blog")}
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300 text-lg"
          >
            🔥 View All Articles
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}