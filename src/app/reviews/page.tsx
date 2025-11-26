"use client";

import { useState, useEffect } from "react";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { ReviewsForm } from "@/src/components/reviews/ReviewsForm";
import { ReviewsList, Review } from "@/src/components/reviews/ReviewsList";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Star } from "lucide-react";
import { subscribeToReviews, calculateAverageRating } from "@/store/lib/firebaseReviews";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Subscribe to real-time reviews updates
  useEffect(() => {
    const unsubscribe = subscribeToReviews((fetchedReviews) => {
      setReviews(fetchedReviews);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? calculateAverageRating(reviews).toFixed(1)
    : "0.0";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <ScrollAnimation />

      {/* Hero Section */}
      <section
        className="px-3 sm:px-4 py-12 sm:py-20 lg:py-24 text-center bg-cover bg-center border-b-4 border-amber-500/30 fade-up"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(8,10,25,0.92), rgba(8,10,25,0.96)), url('https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Star className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-amber-400 fill-amber-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text text-center">Customer Reviews</h1>
        </div>
        <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-semibold max-w-2xl mx-auto px-4">
          See what our customers are saying about Lords Hub
        </p>

        {/* Stats */}
        {reviews.length > 0 && (
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">{averageRating}</div>
              <div className="text-xs sm:text-sm text-slate-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">{reviews.length}</div>
              <div className="text-xs sm:text-sm text-slate-400">Total Reviews</div>
            </div>
          </div>
        )}
      </section>

      {/* Review Form Section */}
      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-4xl">
          <ReviewsForm />
        </div>
      </section>

      {/* Reviews List Section */}
      <section className="px-3 sm:px-4 py-8 sm:py-12 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">Loading reviews...</p>
            </div>
          ) : (
            <ReviewsList reviews={reviews} />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
