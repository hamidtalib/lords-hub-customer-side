import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, ChatSession, createOrGetChatSession, loadMessages, sendMessage, sendMediaMessage } from "../thunks/chatThunk";

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

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<ChatSession>) {
      state.session = action.payload;
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSending(state, action: PayloadAction<boolean>) {
      state.isSending = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    // Create or get chat session
    builder
      .addCase(createOrGetChatSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrGetChatSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.session = action.payload;
      })
      .addCase(createOrGetChatSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Load messages
    builder
      .addCase(loadMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(loadMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Send message
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isSending = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload as string;
      });

    // Send media message
    builder
      .addCase(sendMediaMessage.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(sendMediaMessage.fulfilled, (state) => {
        state.isSending = false;
      })
      .addCase(sendMediaMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSession,
  setMessages,
  addMessage,
  setLoading,
  setSending,
  setError,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
