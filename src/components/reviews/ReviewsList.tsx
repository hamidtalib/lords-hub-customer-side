"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { StarRating } from "./StarRating";
import { User, Calendar } from "lucide-react";
import { ReviewCardSkeleton } from "@/src/components/loaders";

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
  loading?: boolean;
}

export function ReviewsList({ reviews, loading = false }: ReviewsListProps) {
  if (loading) {
    return <ReviewCardSkeleton count={6} />;
  }

  if (reviews.length === 0) {
    return (
      <Card className="relative border-2 border-slate-600 bg-gradient-to-br from-slate-800/50 to-slate-700/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000" />
        
        <CardContent className="relative p-12 sm:p-16 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative text-6xl sm:text-8xl animate-bounce">⭐</div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                No Reviews Yet
              </h3>
              <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto">
                🚀 Be the first to share your Lords Hub experience and help other gamers!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-black gradient-text mb-4">
          🎮 What Gamers Say
        </h2>
        <p className="text-slate-300 text-lg">
          {reviews.length} happy customers and counting! 🔥
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <Card
            key={review.id}
            className="group relative border-2 border-amber-500/20 bg-gradient-to-br from-slate-800/80 to-slate-700/80 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Floating Background Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all duration-500" />
            
            <CardContent className="relative p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg group-hover:bg-amber-400/30 transition-all duration-300" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/30 flex items-center justify-center border-2 border-amber-500/30 backdrop-blur-sm">
                      <User className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base mb-1 group-hover:text-amber-100 transition-colors">
                      {review.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} readonly size="sm" />
                      <span className="text-xs text-amber-400 font-bold">
                        {review.rating === 5 ? "🔥" : 
                         review.rating === 4 ? "😊" : 
                         review.rating === 3 ? "👍" : 
                         review.rating === 2 ? "😐" : "👎"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Message */}
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 group-hover:border-amber-500/30 transition-all duration-300">
                <p className="text-slate-200 text-sm leading-relaxed font-medium">
                  "{review.message}"
                </p>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-4 h-4" />
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="text-xs text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Verified ✓
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
