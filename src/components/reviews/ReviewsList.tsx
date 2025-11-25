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
        <CardContent className="p-12 text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">
            No reviews yet
          </h3>
          <p className="text-slate-500">
            Be the first to share your experience!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-white mb-6">
        Customer Reviews ({reviews.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="border-2 border-amber-500/20 bg-slate-800/50 hover:border-amber-500/40 transition-all duration-300"
          >
            <CardContent className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{review.name}</h3>
                    <StarRating rating={review.rating} readonly size="sm" />
                  </div>
                </div>
              </div>

              {/* Review Message */}
              <p className="text-slate-300 text-sm leading-relaxed">
                {review.message}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
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
