import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat/chatSlice.new";
import offersReducer from "./offers/offersSlice";
import socialMediaReducer from "./socialMedia/socialMediaSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    offers: offersReducer,
    socialMedia: socialMediaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for Date objects in messages
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
