import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchSocialMediaLinks } from "../lib/firebaseSocialMedia";

export interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  order?: number;
  isActive?: boolean;
}

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

// Async thunk to fetch social media links
export const loadSocialMediaLinks = createAsyncThunk(
  "socialMedia/load",
  async (_, { rejectWithValue }) => {
    try {
      const links = await fetchSocialMediaLinks();
      return links;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load social media links";
      return rejectWithValue(message);
    }
  }
);

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
        state.error = (action.payload as string) || action.error.message || "Failed to load social media links";
      });
  },
});

export const { setSocialMediaLinks, clearError } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;