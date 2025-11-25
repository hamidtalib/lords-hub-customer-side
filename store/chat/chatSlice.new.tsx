import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChatSession,
  ChatMessage,
  createOrGetChatSession,
  loadMessages,
  sendMessage,
  subscribeToMessages,
} from "@/store/lib/firebaseChat";

interface ChatState {
  session: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
}

const initialState: ChatState = {
  session: null,
  messages: [],
  isLoading: false,
  isSending: false,
  error: null,
};

// Async thunks
export const initializeChat = createAsyncThunk(
  "chat/initialize",
  async () => {
    const session = await createOrGetChatSession();
    const messages = await loadMessages();
    return { session, messages };
  }
);

export const sendChatMessage = createAsyncThunk(
  "chat/sendMessage",
  async (text: string) => {
    const message = await sendMessage(text);
    return message;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Initialize chat
    builder.addCase(initializeChat.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(initializeChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.session = action.payload.session;
      state.messages = action.payload.messages;
    });
    builder.addCase(initializeChat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to initialize chat";
    });

    // Send message
    builder.addCase(sendChatMessage.pending, (state) => {
      state.isSending = true;
      state.error = null;
    });
    builder.addCase(sendChatMessage.fulfilled, (state) => {
      state.isSending = false;
    });
    builder.addCase(sendChatMessage.rejected, (state, action) => {
      state.isSending = false;
      state.error = action.error.message || "Failed to send message";
    });
  },
});

export const { setMessages, addMessage, clearError } = chatSlice.actions;
export default chatSlice.reducer;
