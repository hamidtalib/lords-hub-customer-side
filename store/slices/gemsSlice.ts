import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GemItem, GemsState, loadGems } from "../thunks/gemsThunk";

const initialState: GemsState = {
  tabs: [],
  itemsByTab: {},
  loading: false,
  error: null,
};

export const gemsSlice = createSlice({
  name: "gems",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loadGems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        loadGems.fulfilled,
        (state, action: PayloadAction<GemItem[]>) => {
          state.loading = false;

          const items = action.payload;

          const desiredTabOrder = [
            "Speed Ups",
            "War Materials", 
            "Boost",
            "Chests",
            "Familiar",
            "Buildings Material",
            "Energy", 
            "Resources"
          ];

          const uniqueTabs = Array.from(new Set(items.map((i) => i.tab)));
          
          const sortedTabs = desiredTabOrder.filter(tab => uniqueTabs.includes(tab))
            .concat(uniqueTabs.filter(tab => !desiredTabOrder.includes(tab)));
          
          state.tabs = sortedTabs;

          const itemsByTab: Record<string, GemItem[]> = {};

          sortedTabs.forEach((tab) => {
            itemsByTab[tab] = items
              .filter((i) => i.tab === tab)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          });

          state.itemsByTab = itemsByTab;
        }
      )

      .addCase(loadGems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gemsSlice.reducer;
