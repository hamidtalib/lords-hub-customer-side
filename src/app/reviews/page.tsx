"use client";

import { useState, useEffect } from "react";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { ReviewsForm } from "@/src/components/reviews/ReviewsForm";
import { ReviewsList, Review } from "@/src/components/reviews/ReviewsList";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Star } from "lucide-react";

const STORAGE_KEY = "lords-hub-reviews";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setReviews(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error("Failed to save reviews:", error);
    }
  }, [reviews]);

  const handleSubmitReview = async (reviewData: {
    name: string;
    rating: number;
    message: string;
  }) => {
    const newReview: Review = {
      id: `review_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: reviewData.name,
      rating: reviewData.rating,
      message: reviewData.message,
      date: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <ScrollAnimation />

      {/* Hero Section */}
      <section
        className="px-4 py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(8,10,25,0.92), rgba(8,10,25,0.96)), url('https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star className="h-12 w-12 text-amber-400 fill-amber-400" />
          <h1 className="text-5xl font-black gradient-text">Customer Reviews</h1>
        </div>
        <p className="text-xl text-slate-200 font-semibold max-w-2xl mx-auto">
          See what our customers are saying about Lords Hub
        </p>

        {/* Stats */}
        {reviews.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-amber-400">{averageRating}</div>
              <div className="text-sm text-slate-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-amber-400">{reviews.length}</div>
              <div className="text-sm text-slate-400">Total Reviews</div>
            </div>
          </div>
        )}
      </section>

      {/* Review Form Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-4xl">
          <ReviewsForm onSubmit={handleSubmitReview} />
        </div>
      </section>

      {/* Reviews List Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          <ReviewsList reviews={reviews} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
