"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { StarRating } from "./StarRating";
import { toast } from "react-toastify";
import { Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { submitReviewThunk } from "@/store/thunks/reviewThunk";

export function ReviewsForm() {
  const dispatch = useDispatch<any>();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || rating === 0 || !message) {
      toast.error("Please fill in all fields and select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(
        submitReviewThunk({ name, rating, message })
      );

      // Check the dispatched action's requestStatus to determine success
      if (resultAction?.meta?.requestStatus === "fulfilled") {
        toast.success("Review submitted successfully! Thank you for your feedback.");
        // Reset form on success
        setName("");
        setRating(0);
        setMessage("");
      } else {
        const errorMessage =
          resultAction?.payload ||
          resultAction?.error?.message ||
          "Failed to submit review";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span className="text-amber-400">⭐</span>
          Write a Review
        </CardTitle>
        <p className="text-slate-400 text-xs sm:text-sm">
          Share your experience with Lords Hub
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
              Your Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 text-sm sm:text-base"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
              Rating
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size="lg"
              />
              <span className="text-slate-400 text-xs sm:text-sm">
                {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
              </span>
            </div>
          </div>

          {/* Review Message */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
              Your Review
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={5}
              className="w-full px-3 py-2 bg-slate-700/50 border-2 border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:border-amber-500 focus:outline-none transition-colors text-sm sm:text-base"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-2.5 sm:py-3 text-sm sm:text-base"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
