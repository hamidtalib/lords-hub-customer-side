// thunks/socialMediaThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../src/config/firebase";

export interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  order?: number;
  isActive?: boolean;
}

export const loadSocialMediaLinks = createAsyncThunk(
  "socialMedia/load",
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(firestore, "socialMediaLinks"));
      const snap = await getDocs(q);

      const links: SocialMediaLink[] = snap.docs.map((doc) => ({
        id: doc.id,
        platform: doc.data().platform || "",
        url: doc.data().url || "",
        order: doc.data().order,
        isActive: doc.data().isActive,
      }));

      return links;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to load social media links"
      );
    }
  }
);
