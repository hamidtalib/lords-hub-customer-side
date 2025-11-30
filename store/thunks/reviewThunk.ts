import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  orderBy,
  where,
  limit,
  query,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "@/src/config/firebase";
import { Review } from "../slices/reviewSlice";

// SUBMIT REVIEW
export const submitReviewThunk = createAsyncThunk(
  "reviews/submitReview",
  async (
    reviewData: { name: string; rating: number; message: string },
    { rejectWithValue }
  ) => {
    try {
      if (!reviewData.name || !reviewData.message) {
        return rejectWithValue("Please fill in all fields");
      }

      if (reviewData.rating < 1 || reviewData.rating > 5) {
        return rejectWithValue("Rating must be between 1 and 5");
      }

      const reviewsRef = collection(firestore, "reviews");
      const docRef = await addDoc(reviewsRef, {
        name: reviewData.name.trim(),
        rating: reviewData.rating,
        message: reviewData.message.trim(),
        isApproved: true,
        createdAt: Timestamp.now(),
      });

      return { id: docRef.id, ...reviewData, date: new Date().toISOString() };
    } catch (err: any) {
      return rejectWithValue("Failed to submit review");
    }
  }
);

// FETCH APPROVED REVIEWS
export const loadApprovedReviews = createAsyncThunk(
  "reviews/loadApproved",
  async (maxResults: number = 50, { rejectWithValue }) => {
    try {
      const reviewsRef = collection(firestore, "reviews");
      const q = query(
        reviewsRef,
        where("isApproved", "==", true),
        orderBy("createdAt", "desc"),
        limit(maxResults)
      );

      const snapshot = await getDocs(q);

      const reviews: Review[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          rating: data.rating,
          message: data.message,
          date: data.createdAt.toDate().toISOString(),
          isApproved: data.isApproved,
          createdAt: data.createdAt.toDate(),
        };
      });

      return reviews;
    } catch (err) {
      return rejectWithValue("Failed to fetch reviews");
    }
  }
);
