"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadBlogPosts } from "@/store/thunks/blogThunk";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { BlogCardSkeleton } from "@/src/components/loaders";

export default function BlogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.blog);
console.log(posts)
  useEffect(() => {
    dispatch(loadBlogPosts(50));
  }, [dispatch]);



  // Format date helper
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Recent";
    
    try {
      // Handle Firestore timestamp
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

  return (
    <>
      <ScrollAnimation />

      {/* Hero Section */}
      <section
        className="px-4 py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,7,15,0.90), rgba(4,7,15,0.98)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <h1 className="text-5xl font-black gradient-text mb-4">
          Lords Hub Blog
        </h1>
        <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
          Tips, strategies, and insights for Lords Mobile players
        </p>
      </section>



      {/* Blog Posts Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Results Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black gradient-text mb-4">
              🔥 Latest Articles
            </h2>
          </div>

          {loading ? (
            <BlogCardSkeleton count={6} />
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-400 mb-2">No Articles Found</h3>
              <p className="text-slate-500">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link href={`/blog/${post.id}`}>
                <Card
                  key={post.id}
                  className="group bg-gradient-to-br from-slate-800/90 to-slate-700/90 border-2 border-amber-500/30 hover:border-amber-400/60 overflow-hidden hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-slate-200 group-hover:text-amber-400 transition-colors leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>

                      <Button
                        variant="ghost"
                        className="w-full text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 font-bold cursor-pointer group-hover:bg-amber-500/20 transition-all duration-300"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                  </CardContent>
                </Card>
                    </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 border-t-4 border-amber-500/30 section-gradient fade-up">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black gradient-text mb-4">
            Stay Updated
          </h2>
          <p className="text-slate-200 mb-6">
            Subscribe to our newsletter for the latest tips, guides, and Lords
            Mobile news.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-slate-700/50 border-2 border-amber-500/50 focus:border-amber-400 text-white placeholder:text-slate-400 outline-none transition-all"
            />
            <Button className="btn-game font-bold cursor-pointer py-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
