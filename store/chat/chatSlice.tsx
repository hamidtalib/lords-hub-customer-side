import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatSession, ChatMessage } from "@/store/lib/types/products";
import {
  loadMessages,
  loadUserChats,
  getOrCreateChatSession,
} from "./chatActions";

interface ChatState {
  chats: ChatSession[];
  messages: Record<string, ChatMessage[]>; // key = chatId
  activeChatId: string | null;
  pendingMessages: Record<string, ChatMessage[]>; // Messages being sent
  loadingMessages: Record<string, boolean>; // Loading state per chat
  conversationContext: {
    productId: string | null;
    productTitle: string | null;
  };
}

const CHAT_CACHE_KEY = "lords-hub-chat-cache";

const initialState: ChatState = {
  chats: [],
  messages: {},
  activeChatId: null,
  pendingMessages: {},
  loadingMessages: {},
  conversationContext: {
    productId: null,
    productTitle: null,
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Existing actions
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

      if (typeof window !== "undefined") {
        localStorage.setItem(CHAT_CACHE_KEY, JSON.stringify(state.messages));
      }
    },
    loadMessagesFromStorage: (state) => {
      if (typeof window === "undefined") return;
      const cached = localStorage.getItem(CHAT_CACHE_KEY);
      if (cached) state.messages = JSON.parse(cached);
    },

    // New actions for Firebase sync
    // IMPORTANT: This completely overwrites local messages with Firebase data
    // Firebase is the source of truth
    setMessages: (
      state,
      action: PayloadAction<{ chatId: string; messages: ChatMessage[] }>
    ) => {
      const { chatId, messages } = action.payload;
      
      // Completely overwrite local cache with Firebase messages
      state.messages[chatId] = messages;
      
      // Remove any pending messages that are now in Firebase
      if (state.pendingMessages[chatId]) {
        const firebaseMessageIds = new Set(messages.map((m) => m.id));
        state.pendingMessages[chatId] = state.pendingMessages[chatId].filter(
          (pendingMsg) => {
            // Keep pending if not in Firebase yet
            // Remove if Firebase has it (by ID or clientRequestId)
            const inFirebase = firebaseMessageIds.has(pendingMsg.id) ||
              (pendingMsg.clientRequestId && 
               messages.some(m => m.clientRequestId === pendingMsg.clientRequestId));
            return !inFirebase;
          }
        );
      }
      
      // Update localStorage cache
      if (typeof window !== "undefined") {
        localStorage.setItem(CHAT_CACHE_KEY, JSON.stringify(state.messages));
      }
    },

    setLoadingMessages: (
      state,
      action: PayloadAction<{ chatId: string; loading: boolean }>
    ) => {
      const { chatId, loading } = action.payload;
      state.loadingMessages[chatId] = loading;
    },

    addPendingMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: ChatMessage }>
    ) => {
      const { chatId, message } = action.payload;
      if (!state.pendingMessages[chatId]) state.pendingMessages[chatId] = [];
      state.pendingMessages[chatId].push(message);
    },

    removePendingMessage: (
      state,
      action: PayloadAction<{ chatId: string; messageId: string }>
    ) => {
      const { chatId, messageId } = action.payload;
      if (state.pendingMessages[chatId]) {
        state.pendingMessages[chatId] = state.pendingMessages[chatId].filter(
          (msg) => msg.id !== messageId
        );
      }
    },

    updateMessageStatus: (
      state,
      action: PayloadAction<{
        chatId: string;
        messageId: string;
        status: ChatMessage["status"];
      }>
    ) => {
      const { chatId, messageId, status } = action.payload;
      if (state.messages[chatId]) {
        const message = state.messages[chatId].find((msg) => msg.id === messageId);
        if (message) {
          message.status = status;
        }
      }
    },

    setVisitorConversationContext: (
      state,
      action: PayloadAction<{ productId: string; productTitle: string }>
    ) => {
      state.conversationContext = action.payload;
    },

    clearConversationContext: (state) => {
      state.conversationContext = {
        productId: null,
        productTitle: null,
      };
    },

    addChat: (state, action: PayloadAction<ChatSession>) => {
      const existingIndex = state.chats.findIndex(
        (chat) => chat.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.chats.unshift(action.payload);
      } else {
        state.chats[existingIndex] = action.payload;
      }
    },

    updateChat: (
      state,
      action: PayloadAction<{ chatId: string; updates: Partial<ChatSession> }>
    ) => {
      const { chatId, updates } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        Object.assign(chat, updates);
      }
    },
  },
  extraReducers: (builder) => {
    // Load messages
    builder.addCase(loadMessages.pending, (state, action) => {
      state.loadingMessages[action.meta.arg] = true;
    });
    builder.addCase(loadMessages.fulfilled, (state, action) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
      state.loadingMessages[chatId] = false;
    });
    builder.addCase(loadMessages.rejected, (state, action) => {
      state.loadingMessages[action.meta.arg] = false;
    });

    // Send message - no action needed here
    // Firebase real-time listener will handle adding the message via setMessages

    // Load user chats
    builder.addCase(loadUserChats.fulfilled, (state, action) => {
      state.chats = action.payload;
      if (!state.activeChatId && action.payload.length > 0) {
        state.activeChatId = action.payload[0].id;
      }
    });

    // Get or create chat session
    builder.addCase(getOrCreateChatSession.fulfilled, (state, action) => {
      const chat = action.payload;
      const existingIndex = state.chats.findIndex((c) => c.id === chat.id);
      if (existingIndex === -1) {
        state.chats.unshift(chat);
      } else {
        state.chats[existingIndex] = chat;
      }
      state.activeChatId = chat.id;
    });
  },
});

export const {
  initChats,
  setActiveChat,
  addMessage,
  loadMessagesFromStorage,
  setMessages,
  setLoadingMessages,
  addPendingMessage,
  removePendingMessage,
  updateMessageStatus,
  setVisitorConversationContext,
  clearConversationContext,
  addChat,
  updateChat,
} = chatSlice.actions;

export default chatSlice.reducer;
