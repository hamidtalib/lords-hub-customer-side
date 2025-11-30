import { createSlice } from "@reduxjs/toolkit";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Bot, fetchAllBots, fetchBotsByType } from "../thunks/botsThunk";

interface BotsState {
  botsByType: { [key in BotType]?: Bot[] };
  allBots: Bot[];
  lastDocs: { [key in BotType]?: QueryDocumentSnapshot<DocumentData> | null };
  hasMore: { [key in BotType]?: boolean };
  loading: boolean;
  error: string | null;
}

type BotType = "rein" | "war" | "kvk" | "farm";

const initialState: BotsState = {
  botsByType: {},
  allBots: [],
  lastDocs: {},
  hasMore: {},
  loading: false,
  error: null,
};

const botsSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchBotsByType
    builder.addCase(fetchBotsByType.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBotsByType.fulfilled, (state, action) => {
      state.loading = false;
      const { bots, lastDoc, hasMore } = action.payload;
      const type = action.meta.arg.type;
      // If this is the first load (no lastDoc in the request), replace the array
      // Otherwise, append to existing data for pagination
      if (!action.meta.arg.lastDoc) {
        state.botsByType[type] = bots;
      } else {
        state.botsByType[type] = [...(state.botsByType[type] || []), ...bots];
      }
      state.lastDocs[type] = lastDoc;
      state.hasMore[type] = hasMore;
    });
    builder.addCase(fetchBotsByType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch bots";
    });

    // fetchAllBots
    builder.addCase(fetchAllBots.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllBots.fulfilled, (state, action) => {
      state.loading = false;
      state.allBots = action.payload;
    });
    builder.addCase(fetchAllBots.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch all bots";
    });
  },
});

export const { clearError } = botsSlice.actions;
export default botsSlice.reducer;
