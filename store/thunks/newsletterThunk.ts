import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../src/config/firebase";

export interface NewsletterSubscription {
  id?: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

// --- Thunks ---

// Subscribe email
export const subscribeNewsletter = createAsyncThunk<
  string, // success message
  string, // email
  { rejectValue: string }
>("newsletter/subscribe", async (email, { rejectWithValue }) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return rejectWithValue("Invalid email address");

    const subscribersRef = collection(firestore, "newsletter_subscribers");
    const q = query(subscribersRef, where("email", "==", email.toLowerCase()));
    const existing = await getDocs(q);
    if (!existing.empty)
      return rejectWithValue("This email is already subscribed");

    await addDoc(subscribersRef, {
      email: email.toLowerCase(),
      subscribedAt: Timestamp.now(),
      isActive: true,
    });

    return "Successfully subscribed!";
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to subscribe");
  }
});

// Fetch all subscribers
export const fetchSubscribers = createAsyncThunk<
  NewsletterSubscription[],
  void,
  { rejectValue: string }
>("newsletter/fetchSubscribers", async (_, { rejectWithValue }) => {
  try {
    const subscribersRef = collection(firestore, "newsletter_subscribers");
    const q = query(subscribersRef, where("isActive", "==", true));
    const snapshot = await getDocs(q);

    const subscribers: NewsletterSubscription[] = snapshot.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        email: data.email,
        subscribedAt: data.subscribedAt.toDate(),
        isActive: data.isActive,
      };
    });

    return subscribers;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch subscribers");
  }
});
