"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { StarRating } from "./StarRating";
import { User, Calendar } from "lucide-react";

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <Card className="border-2 border-slate-600 bg-slate-800/50">
        <CardContent className="p-8 sm:p-12 text-center">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">⭐</div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-400 mb-2">
            No reviews yet
          </h3>
          <p className="text-slate-500 text-sm sm:text-base">
            Be the first to share your experience!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6">
        Customer Reviews ({reviews.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="border-2 border-amber-500/20 bg-slate-800/50 hover:border-amber-500/40 transition-all duration-300"
          >
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">{review.name}</h3>
                    <StarRating rating={review.rating} readonly size="sm" />
                  </div>
                </div>
              </div>

              {/* Review Message */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {review.message}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400">
                <Calendar className="w-3 h-3" />
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
