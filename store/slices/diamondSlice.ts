import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadDiamonds } from "../thunks/diamondThunk";

export interface Diamond {
  id: string;
  name: string;
  description: string;
  price: number;
  productId: string;
  createdAt: any;
  updatedAt: any;
}

interface DiamondsState {
  diamonds: Diamond[];
  loading: boolean;
  error: string | null;
  lastDoc: any | null;
  hasMore: boolean;
}

const initialState: DiamondsState = {
  diamonds: [],
  loading: false,
  error: null,
  lastDoc: null,
  hasMore: true,
};

const diamondsSlice = createSlice({
  name: "diamonds",
  initialState,
  reducers: {
    clearDiamonds: (state) => {
      state.diamonds = [];
      state.lastDoc = null;
      state.hasMore = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadDiamonds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDiamonds.fulfilled, (state, action) => {
        state.loading = false;
        const newDiamonds: Diamond[] = (action.payload.diamonds as any[]).map(
          (d: any) => ({
            id: d.id,
            name: d.name ?? "",
            description: d.description ?? "",
            price: d.price ?? 0,
            productId: d.productId ?? "",
            createdAt: d.createdAt ?? null,
            updatedAt: d.updatedAt ?? null,
          })
        );
        state.diamonds.push(...newDiamonds);
        state.lastDoc = action.payload.lastDoc;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(loadDiamonds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Something went wrong";
      });
  },
});

export const { clearDiamonds } = diamondsSlice.actions;
export default diamondsSlice.reducer;
