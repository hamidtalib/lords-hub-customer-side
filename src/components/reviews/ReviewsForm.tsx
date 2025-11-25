"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { StarRating } from "./StarRating";
import { Send } from "lucide-react";

interface ReviewsFormProps {
  onSubmit: (review: {
    name: string;
    rating: number;
    message: string;
  }) => void;
}

export function ReviewsForm({ onSubmit }: ReviewsFormProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || rating === 0 || !message) {
      alert("Please fill in all fields and select a rating");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({ name, rating, message });
      
      // Reset form
      setName("");
      setRating(0);
      setMessage("");
      
      alert("Thank you for your review!");
    } catch (error) {
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-black text-white flex items-center gap-2">
          <span className="text-amber-400">⭐</span>
          Write a Review
        </CardTitle>
        <p className="text-slate-400 text-sm">
          Share your experience with Lords Hub
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-bold text-slate-200 mb-2">
              Your Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-bold text-slate-200 mb-2">
              Rating
            </label>
            <div className="flex items-center gap-3">
              <StarRating rating={rating} onRatingChange={setRating} size="lg" />
              <span className="text-slate-400 text-sm">
                {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
              </span>
            </div>
          </div>

          {/* Review Message */}
          <div>
            <label className="block text-sm font-bold text-slate-200 mb-2">
              Your Review
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={5}
              className="w-full px-3 py-2 bg-slate-700/50 border-2 border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:border-amber-500 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-3"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
