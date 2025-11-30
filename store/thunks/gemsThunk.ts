import { firestore } from "@/src/config/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

export interface GemItem {
  id: string;
  name: string;
  gemCost: number;
  tab: string;
  order?: number;
}

export interface GemsState {
  tabs: string[];
  itemsByTab: Record<string, GemItem[]>;
  loading: boolean;
  error: string | null;
}

export const loadGems = createAsyncThunk(
  "gems/loadGems",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(firestore, "gems"));
      const items: GemItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GemItem[];

      return items;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
