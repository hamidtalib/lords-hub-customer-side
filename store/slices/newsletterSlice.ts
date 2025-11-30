import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSubscribers,
  subscribeNewsletter,
} from "../thunks/newsletterThunk";

interface NewsletterState {
  subscribers: NewsletterSubscription[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
export interface NewsletterSubscription {
  id?: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

const initialState: NewsletterState = {
  subscribers: [],
  loading: false,
  error: null,
  successMessage: null,
};

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Subscribe
    builder.addCase(subscribeNewsletter.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(
      subscribeNewsletter.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.successMessage = action.payload;
      }
    );
    builder.addCase(subscribeNewsletter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to subscribe";
    });

    // Fetch subscribers
    builder.addCase(fetchSubscribers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchSubscribers.fulfilled,
      (state, action: PayloadAction<NewsletterSubscription[]>) => {
        state.loading = false;
        state.subscribers = action.payload;
      }
    );
    builder.addCase(fetchSubscribers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch subscribers";
    });
  },
});

export const { clearError, clearSuccess } = newsletterSlice.actions;
export default newsletterSlice.reducer;
