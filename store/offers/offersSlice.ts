import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
  validUntil?: Date;
}

interface OffersState {
  offers: Offer[];
  hasSeenOffers: boolean;
  showModal: boolean;
}

const initialState: OffersState = {
  offers: [
    // Dummy offers - replace with admin-managed offers later
    {
      id: "welcome-offer",
      title: "Welcome to Lords Hub! 🎉",
      description: "Get 10% off your first purchase of any premium account. Use code: WELCOME10",
      ctaText: "Browse Accounts",
      ctaLink: "/accounts/selling",
    },
    {
      id: "gem-special",
      title: "Special Gem Package Deal",
      description: "Buy gems in bulk and save up to 25%! Limited time offer.",
      ctaText: "View Gems",
      ctaLink: "/gems",
    },
  ],
  hasSeenOffers: false,
  showModal: false,
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    showOffersModal: (state) => {
      state.showModal = true;
    },
    hideOffersModal: (state) => {
      state.showModal = false;
      state.hasSeenOffers = true;
      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("hasSeenOffers", "true");
      }
    },
    checkIfSeenOffers: (state) => {
      if (typeof window !== "undefined") {
        const hasSeen = localStorage.getItem("hasSeenOffers") === "true";
        state.hasSeenOffers = hasSeen;
        // Show modal if user hasn't seen offers
        if (!hasSeen && state.offers.length > 0) {
          state.showModal = true;
        }
      }
    },
  },
});

export const { setOffers, showOffersModal, hideOffersModal, checkIfSeenOffers } = offersSlice.actions;
export default offersSlice.reducer;
