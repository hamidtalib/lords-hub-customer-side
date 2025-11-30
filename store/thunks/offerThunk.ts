// thunks/offersThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../src/config/firebase";

export interface Offer {
  id: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  createdAt?: any;
  updatedAt?: any;
  productId?: string;
}

export const loadOffers = createAsyncThunk(
  "offers/loadOffers",
  async (_, { rejectWithValue }) => {
    try {
      const offersRef = collection(firestore, "offers");

      const q = query(offersRef, orderBy("createdAt", "desc"));

      const snap = await getDocs(q);

      const offers: Offer[] = [];

      snap.forEach((doc) => {
        const data = doc.data();
        if (!data.validUntil || data.validUntil.toDate() > new Date()) {
          offers.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            mediaUrl: data.imageUrl,
            mediaType: data.mediaType,
          });
        }
      });

      return offers;
    } catch (error) {
      return rejectWithValue("Failed to load offers");
    }
  }
);
