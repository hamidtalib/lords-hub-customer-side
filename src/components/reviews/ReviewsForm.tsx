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
    <Card className="relative border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl overflow-hidden hover:shadow-amber-500/20 transition-all duration-500">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000" />
      
      <CardHeader className="relative p-6 sm:p-8 text-center">
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">✍️</span>
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-black text-white">
            Share Your Experience
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative px-6 sm:px-8">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Name Input */}
          <div className="group">
            <label className="block text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <span className="text-amber-400">👤</span>
              Your Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your gaming name..."
              className="bg-slate-700/50 border-2 border-slate-600 text-white placeholder:text-slate-400 text-base h-12 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 group-hover:border-slate-500"
              required
            />
          </div>

          {/* Rating */}
          <div className="group">
            <label className="block text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <span className="text-amber-400">⭐</span>
              Rate Your Experience
            </label>
            <div className="bg-slate-700/30 rounded-xl p-4 border-2 border-slate-600 group-hover:border-slate-500 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <StarRating
                  rating={rating}
                  onRatingChange={setRating}
                  size="lg"
                />
                <span className="text-slate-300 text-sm font-medium">
                  {rating > 0 ? (
                    <span className="text-amber-400 font-bold">
                      {rating === 5 ? "🔥 Excellent!" : 
                       rating === 4 ? "😊 Great!" : 
                       rating === 3 ? "👍 Good!" : 
                       rating === 2 ? "😐 Fair" : "👎 Poor"} ({rating}/5)
                    </span>
                  ) : (
                    "Click to rate your experience"
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Review Message */}
          <div className="group">
            <label className="block text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <span className="text-amber-400">💬</span>
              Your Review
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your Lords Hub experience... What did you love? How was the service? Any suggestions?"
              rows={6}
              className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 text-base resize-none group-hover:border-slate-500"
              required
            />
            <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
              <span>💡</span>
              <span>Tip: Mention specific services or features you used!</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:via-amber-600 hover:to-amber-700 text-white font-bold py-4 text-base rounded-xl shadow-lg hover:shadow-amber-500/25 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Your Review...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5" />
                  <span>Submit Review</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
