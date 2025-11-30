"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import chatReducer from "./slices/chatSlice";
import offersReducer from "./slices/offerSlice";
import socialMediaReducer from "./slices/socialMediaSlice";
import botsReducer from "./slices/botsSlice";
import diamondsReducer from "./slices/diamondSlice";
import accountsReducer from "./slices/accountsSlice";
import gemsReducer from "./slices/gemsSlice";
import reviewsReducer from "./slices/reviewSlice";

// --- STORE ---
export const store = configureStore({
  reducer: {
    chat: chatReducer,
    offers: offersReducer,
    socialMedia: socialMediaReducer,
    bots: botsReducer,
    diamonds: diamondsReducer,
    accounts: accountsReducer,
    gems: gemsReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// --- TYPES ---
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// --- CUSTOM HOOKS ---
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
