import { createSlice } from "@reduxjs/toolkit";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import {
  Account,
  fetchAccountById,
  fetchAccountsByType,
  fetchAllAccounts,
} from "../thunks/accountsThunk";

interface AccountsState {
  accountsByType: { [key in "restricted" | "open"]?: Account[] };
  allAccounts: Account[];
  lastDocs: {
    [key in "restricted" | "open"]?: QueryDocumentSnapshot<DocumentData> | null;
  };
  hasMore: { [key in "restricted" | "open"]?: boolean };
  selectedAccount: Account | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountsState = {
  accountsByType: {},
  allAccounts: [],
  lastDocs: {},
  hasMore: {},
  selectedAccount: null,
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedAccount: (state) => {
      state.selectedAccount = null;
    },
  },
  extraReducers: (builder) => {
    // fetchAccountsByType
    builder.addCase(fetchAccountsByType.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAccountsByType.fulfilled, (state, action) => {
      state.loading = false;
      const { accounts, lastDoc, hasMore } = action.payload;
      const type = action.meta.arg.type;
      state.accountsByType[type] = [
        ...(state.accountsByType[type] || []),
        ...accounts,
      ];
      state.lastDocs[type] = lastDoc;
      state.hasMore[type] = hasMore;
    });
    builder.addCase(fetchAccountsByType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch accounts";
    });

    // fetchAllAccounts
    builder.addCase(fetchAllAccounts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllAccounts.fulfilled, (state, action) => {
      state.loading = false;
      state.allAccounts = action.payload;
    });
    builder.addCase(fetchAllAccounts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch all accounts";
    });

    // fetchAccountById
    builder.addCase(fetchAccountById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAccountById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedAccount = action.payload;
    });
    builder.addCase(fetchAccountById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch account";
    });
  },
});

export const { clearError, clearSelectedAccount } = accountsSlice.actions;
export default accountsSlice.reducer;
