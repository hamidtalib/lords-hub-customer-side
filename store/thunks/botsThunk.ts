import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../src/config/firebase";

export type BotType = "rein" | "war" | "kvk" | "farm";

export interface Bot {
  id: string;
  name: string;
  description: string;
  price: number;
  productId: string;
  type: BotType;
  features: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const BOTS_PER_PAGE = 10;

export const fetchBotsByType = createAsyncThunk<
  {
    bots: Bot[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
    hasMore: boolean;
  },
  { type: BotType; lastDoc?: QueryDocumentSnapshot<DocumentData> | null },
  { rejectValue: string }
>("bots/fetchByType", async ({ type, lastDoc }, { rejectWithValue }) => {
  try {
    const botsRef = collection(firestore, "bots");
    let q = query(
      botsRef,
      where("type", "==", type),
      orderBy("createdAt", "desc"),
      limit(BOTS_PER_PAGE)
    );

    if (lastDoc) {
      q = query(
        botsRef,
        where("type", "==", type),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(BOTS_PER_PAGE)
      );
    }

    const snapshot = await getDocs(q);
    const bots = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Bot[];
    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
    const hasMore = snapshot.docs.length === BOTS_PER_PAGE;

    return { bots, lastDoc: newLastDoc, hasMore };
  } catch (error: any) {
    return rejectWithValue(error.message || `Failed to fetch ${type} bots`);
  }
});

export const fetchAllBots = createAsyncThunk<
  Bot[],
  void,
  { rejectValue: string }
>("bots/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const botsRef = collection(firestore, "bots");
    const snapshot = await getDocs(botsRef);
    const bots = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Bot[];
    return bots;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch all bots");
  }
});
