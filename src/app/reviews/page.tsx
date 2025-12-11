"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadApprovedReviews } from "@/store/thunks/reviewThunk";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { ReviewsForm } from "@/src/components/reviews/ReviewsForm";
import { ReviewsList } from "@/src/components/reviews/ReviewsList";
import { ScrollAnimation } from "@/src/components/scroll-animation";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, loading } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    dispatch(loadApprovedReviews(50));
  }, [dispatch]);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <ScrollAnimation />

      {/* Hero Section */}
      <section className="relative px-3 sm:px-4 py-16 sm:py-24 lg:py-32 text-center overflow-hidden fade-up">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" />
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500" />

        <div className="relative z-10">
          {/* Main Title with Animation */}
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl animate-pulse" />
              <Star className="relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-amber-400 fill-amber-400 animate-bounce" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black gradient-text text-center leading-tight">
              Customer Reviews
            </h1>
          </div>
        
          {/* Enhanced Stats */}
          {reviews.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-6 border-2 border-amber-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-4xl sm:text-5xl font-black text-amber-400 mb-2">
                  {averageRating}
                </div>
                <div className="text-sm text-slate-300 font-semibold">
                  ⭐ Average Rating
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-6 border-2 border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-4xl sm:text-5xl font-black text-blue-400 mb-2">
                  {reviews.length}
                </div>
                <div className="text-sm text-slate-300 font-semibold">
                  📝 Total Reviews
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-6 border-2 border-green-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-4xl sm:text-5xl font-black text-green-400 mb-2">
                  99%
                </div>
                <div className="text-sm text-slate-300 font-semibold">
                  😊 Satisfaction
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-6 border-2 border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-4xl sm:text-5xl font-black text-purple-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-slate-300 font-semibold">
                  🚀 Support
                </div>
              </div>
            </div>
          )}
        </div>
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
          <ReviewsList reviews={reviews} loading={loading} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
