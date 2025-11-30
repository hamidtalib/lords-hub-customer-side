// slices/socialMediaSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loadSocialMediaLinks,
  SocialMediaLink,
} from "../thunks/socialMediaThunk";

interface SocialMediaState {
  links: SocialMediaLink[];
  loading: boolean;
  error: string | null;
}

const initialState: SocialMediaState = {
  links: [],
  loading: false,
  error: null,
};

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    setSocialMediaLinks: (state, action: PayloadAction<SocialMediaLink[]>) => {
      state.links = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSocialMediaLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSocialMediaLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload;
      })
      .addCase(loadSocialMediaLinks.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to load social media links";
      });
  },
});

export const { setSocialMediaLinks, clearError } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
