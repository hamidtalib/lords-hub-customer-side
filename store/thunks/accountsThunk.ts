import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../../src/config/firebase";

export interface Account {
  id: string;
  images: string[];
  price: number;
  productId: string;
  title: string;
  type: "restricted" | "open";
  updatedAt: any;
  createdAt: any;
  description: string;
}

const ACCOUNTS_PER_PAGE = 10;

export const fetchAccountsByType = createAsyncThunk<
  {
    accounts: Account[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
    hasMore: boolean;
  },
  {
    type: "restricted" | "open";
    lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
  },
  { rejectValue: string }
>("accounts/fetchByType", async ({ type, lastDoc }, { rejectWithValue }) => {
  try {
    const accountsRef = collection(firestore, "accounts");

    let q = query(
      accountsRef,
      where("type", "==", type),
      orderBy("createdAt", "desc"),
      limit(ACCOUNTS_PER_PAGE)
    );

    if (lastDoc) {
      q = query(
        accountsRef,
        where("type", "==", type),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(ACCOUNTS_PER_PAGE)
      );
    }

    const snapshot = await getDocs(q);
    const accounts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Account[];
    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
    const hasMore = snapshot.docs.length === ACCOUNTS_PER_PAGE;

    return { accounts, lastDoc: newLastDoc, hasMore };
  } catch (error: any) {
    return rejectWithValue(error.message || `Failed to fetch ${type} accounts`);
  }
});

export const fetchAllAccounts = createAsyncThunk<
  Account[],
  void,
  { rejectValue: string }
>("accounts/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const accountsRef = collection(firestore, "accounts");
    const snapshot = await getDocs(accountsRef);
    const accounts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Account[];
    return accounts;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch all accounts");
  }
});

export const fetchAccountById = createAsyncThunk<
  Account | null,
  string,
  { rejectValue: string }
>("accounts/fetchById", async (id, { rejectWithValue }) => {
  try {
    const accountRef = doc(firestore, "accounts", id);
    const snapshot = await getDoc(accountRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Account;
  } catch (error: any) {
    return rejectWithValue(error.message || `Failed to fetch account ${id}`);
  }
});
