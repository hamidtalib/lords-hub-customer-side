"use client";

import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ScrollAnimation } from "@/src/components/scroll-animation";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Tips for Building a Powerful Lords Mobile Account",
      excerpt:
        "Learn the essential strategies to dominate in Lords Mobile and build an unstoppable kingdom.",
      author: "Alex Crown",
      date: "2025-01-15",
      category: "Strategy",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    },
    {
      id: 2,
      title: "How to Choose the Right Account for Your Playstyle",
      excerpt:
        "Not all accounts are created equal. Discover how to find the perfect match for your gaming style.",
      author: "Jordan Strike",
      date: "2025-01-10",
      category: "Guides",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800",
    },
    {
      id: 3,
      title: "Understanding Bot Services: A Complete Guide",
      excerpt:
        "Everything you need to know about bot services and how they can enhance your gameplay.",
      author: "Morgan Shield",
      date: "2025-01-05",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    },
    {
      id: 4,
      title: "Gems vs Diamonds: Which Should You Invest In?",
      excerpt:
        "A comprehensive comparison to help you make the best investment decision for your account.",
      author: "Casey Valor",
      date: "2024-12-28",
      category: "Economy",
      image:
        "https://images.unsplash.com/photo-1604079628040-94301bb21b46?w=800",
    },
    {
      id: 5,
      title: "KvK War Strategies: Dominate the Battlefield",
      excerpt:
        "Master the art of Kingdom vs Kingdom warfare with these proven tactics and strategies.",
      author: "Alex Crown",
      date: "2024-12-20",
      category: "Strategy",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    },
    {
      id: 6,
      title: "Account Security: Protecting Your Investment",
      excerpt:
        "Essential tips to keep your Lords Mobile account safe and secure from threats.",
      author: "Jordan Strike",
      date: "2024-12-15",
      category: "Security",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    },
  ];

  const categories = [
    "All",
    "Strategy",
    "Guides",
    "Technology",
    "Economy",
    "Security",
  ];

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

      {/* Categories */}
      <section className="px-4 py-8 sm:px-6 lg:px-8 border-b border-amber-500/20 fade-up">
        <div className="mx-auto max-w-6xl flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="border-amber-500/50 hover:bg-amber-500/20 hover:border-amber-400 text-white font-bold cursor-pointer"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-slate-800/80 border-2 border-amber-500/30 hover:border-amber-400 overflow-hidden card-lift fade-up"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                  {post.category}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-slate-200 hover:text-amber-400 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-slate-300 text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <Button
                    variant="ghost"
                    className="w-full text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 font-bold cursor-pointer"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
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
