import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadApprovedReviews, submitReviewThunk } from "../thunks/reviewThunk";

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
  isApproved?: boolean;
  createdAt?: Date;
}

interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
  submitting: false,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    // Load reviews
    builder
      .addCase(loadApprovedReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadApprovedReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(loadApprovedReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Submit review
    builder
      .addCase(submitReviewThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitReviewThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.reviews.unshift(action.payload); // add to top
      })
      .addCase(submitReviewThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
