import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatSession, ChatMessage } from "@/lib/types/products";

interface ChatState {
  chats: ChatSession[];
  messages: Record<string, ChatMessage[]>; // key = chatId
  activeChatId: string | null;
}

const CHAT_CACHE_KEY = "lords-hub-chat-cache";

const initialState: ChatState = {
  chats: [], // admin conversations only
  messages: {},
  activeChatId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initChats: (state, action: PayloadAction<ChatSession[]>) => {
      state.chats = action.payload;
      if (!state.activeChatId && action.payload.length > 0) {
        state.activeChatId = action.payload[0].id;
      }
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: ChatMessage }>
    ) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) state.messages[chatId] = [];
      state.messages[chatId].push(message);

      localStorage.setItem(CHAT_CACHE_KEY, JSON.stringify(state.messages));
    },
    loadMessagesFromStorage: (state) => {
      if (typeof window === "undefined") return;
      const cached = localStorage.getItem(CHAT_CACHE_KEY);
      if (cached) state.messages = JSON.parse(cached);
    },
  },
});

export const { initChats, setActiveChat, addMessage, loadMessagesFromStorage } =
  chatSlice.actions;
export default chatSlice.reducer;
