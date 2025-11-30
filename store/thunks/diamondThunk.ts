import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../../src/config/firebase";

const DIAMONDS_PER_PAGE = 10;

export const loadDiamonds = createAsyncThunk(
  "diamonds/load",
  async (
    lastDoc: QueryDocumentSnapshot<DocumentData> | null,
    { rejectWithValue }
  ) => {
    try {
      const diamondsRef = collection(firestore, "diamonds");

      let q = query(
        diamondsRef,
        orderBy("createdAt", "desc"),
        limit(DIAMONDS_PER_PAGE)
      );

      if (lastDoc) {
        q = query(
          diamondsRef,
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(DIAMONDS_PER_PAGE)
        );
      }

      const snapshot = await getDocs(q);

      const diamonds = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        diamonds,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
        hasMore: snapshot.docs.length === DIAMONDS_PER_PAGE,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch diamonds");
    }
  }
);
