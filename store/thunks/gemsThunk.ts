import { firestore } from "@/src/config/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

export interface GemItem {
  id: string;
  itemName: string; // This is what shows in the UI
  name: string; // Computed from itemName for compatibility
  quantity: number; // This is the gem cost
  gemCost: number; // Computed from quantity for compatibility
  tabName: string; // The tab this item belongs to
  tab: string; // Computed from tabName for compatibility
  imageUrl?: string; // Image URL for the item icon
  createdAt?: any;
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
      const items: GemItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          itemName: data.itemName || "",
          name: data.itemName || "", // Use itemName as name
          quantity: data.quantity || 0,
          gemCost: data.quantity || 0, // quantity is the gem cost
          tabName: data.tabName || "",
          tab: data.tabName || "", // Use tabName as tab
          imageUrl: data.imageUrl || "", // Include image URL from database
          createdAt: data.createdAt,
          order: data.order,
        };
      }) as GemItem[];

      return items;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
