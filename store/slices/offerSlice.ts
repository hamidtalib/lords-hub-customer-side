// slices/offersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadOffers, Offer } from "../thunks/offerThunk";

interface OffersState {
  offers: Offer[];
  hasSeenOffers: boolean;
  showModal: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  offers: [],
  hasSeenOffers: false,
  showModal: false,
  loading: false,
  error: null,
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    showOffersModal: (state) => {
      state.showModal = true;
    },
    hideOffersModal: (state) => {
      state.showModal = false;
      state.hasSeenOffers = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("hasSeenOffers", "true");
      }
    },
    checkIfSeenOffers: (state) => {
      if (typeof window !== "undefined") {
        const hasSeen = localStorage.getItem("hasSeenOffers") === "true";
        state.hasSeenOffers = hasSeen;

        if (!hasSeen && state.offers.length > 0) {
          state.showModal = true;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload as unknown as Offer[];
      })
      .addCase(loadOffers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load offers";
      });
  },
});

export const { showOffersModal, hideOffersModal, checkIfSeenOffers } =
  offersSlice.actions;

export default offersSlice.reducer;
