import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, ChatSession, createOrGetChatSession, loadMessages, sendMessage, sendMediaMessage, sendAdminWelcomeMessage } from "../thunks/chatThunk";

interface ChatState {
  session: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  optimisticMessages: ChatMessage[];
}

const initialState: ChatState = {
  session: null,
  messages: [],
  isLoading: false,
  isSending: false,
  error: null,
  optimisticMessages: [],
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
    addOptimisticMessage(state, action: PayloadAction<ChatMessage>) {
      state.optimisticMessages.push(action.payload);
    },
    removeOptimisticMessage(state, action: PayloadAction<string>) {
      state.optimisticMessages = state.optimisticMessages.filter(
        (msg) => msg.id !== action.payload
      );
    },
    clearOptimisticMessages(state) {
      state.optimisticMessages = [];
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
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSending = false;
        // Remove optimistic message with matching temp ID
        const tempId = action.meta.arg; // The text we sent
        state.optimisticMessages = state.optimisticMessages.filter(
          (msg) => msg.text !== tempId
        );
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload as string;
        // Remove failed optimistic message
        const tempId = action.meta.arg;
        state.optimisticMessages = state.optimisticMessages.filter(
          (msg) => msg.text !== tempId
        );
      });

    // Send media message
    builder
      .addCase(sendMediaMessage.pending, (state, action) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(sendMediaMessage.fulfilled, (state, action) => {
        state.isSending = false;
        // Remove optimistic message
        state.optimisticMessages = state.optimisticMessages.filter(
          (msg) => msg.status !== "sending"
        );
      })
      .addCase(sendMediaMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload as string;
        // Remove failed optimistic message
        state.optimisticMessages = state.optimisticMessages.filter(
          (msg) => msg.status !== "sending"
        );
      });

    // Send admin welcome message
    builder
      .addCase(sendAdminWelcomeMessage.pending, (state) => {
        // Don't set loading state for welcome message
      })
      .addCase(sendAdminWelcomeMessage.fulfilled, (state, action) => {
        // Message will be picked up by real-time listener
      })
      .addCase(sendAdminWelcomeMessage.rejected, (state, action) => {
        // Silently fail - not critical
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
  addOptimisticMessage,
  removeOptimisticMessage,
  clearOptimisticMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
