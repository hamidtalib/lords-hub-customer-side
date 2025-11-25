"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false,
  size = "md" 
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          disabled={readonly}
          className={`transition-all duration-200 ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          }`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "fill-none text-slate-400"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
