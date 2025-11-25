import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatMessage, ChatSession } from "@/store/lib/types/products";
import { getVisitorId } from "@/lib/utils/visitorId";
import {
  setMessages,
  addPendingMessage,
  removePendingMessage,
  updateMessageStatus,
  addChat,
} from "./chatSlice";
import {
  sendMessageToFirebase,
  loadChatMessages,
  loadUserChatSessions,
  saveOrUpdateChatSession,
} from "@/store/lib/firebaseChat";

// Async thunk for loading messages from Firebase
export const loadMessages = createAsyncThunk(
  "chat/loadMessages",
  async (chatId: string, { dispatch }) => {
    try {
      const messages = await loadChatMessages(chatId);
      dispatch(setMessages({ chatId, messages }));
      return { chatId, messages };
    } catch (error) {
      console.error("Failed to load messages:", error);
      throw error;
    }
  }
);

// Async thunk for sending a message
// Strategy: Add to pending immediately for instant UI, Firebase sync will overwrite
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    {
      chatId,
      message,
      mediaUrl,
    }: {
      chatId: string;
      message: string;
      mediaUrl?: string;
    },
    { dispatch }
  ) => {
    const visitorId = getVisitorId();
    const clientRequestId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const pendingMessage: ChatMessage = {
      id: clientRequestId,
      chatId,
      senderId: visitorId,
      senderType: "customer",
      message,
      mediaUrl,
      timestamp: new Date(),
      status: "sending",
      clientRequestId,
    };

    // Add to pending messages for instant UI feedback
    dispatch(addPendingMessage({ chatId, message: pendingMessage }));

    try {
      // Send to Firebase - this will trigger real-time listener
      // Pass clientRequestId for deduplication
      const sentMessage = await sendMessageToFirebase(
        chatId,
        message,
        mediaUrl,
        clientRequestId
      );

      // Don't manually remove from pending - let Firebase sync handle it
      // The real-time listener will call setMessages which removes duplicates
      
      return sentMessage;
    } catch (error) {
      // On error, update pending message status
      dispatch(
        updateMessageStatus({
          chatId,
          messageId: clientRequestId,
          status: "sent", // Mark as failed
        })
      );
      console.error("Failed to send message:", error);
      throw error;
    }
  }
);

// Set conversation context for creating new chats
export const setVisitorConversationContext = createAsyncThunk(
  "chat/setVisitorConversationContext",
  async (
    { productId, productTitle }: { productId: string; productTitle: string },
    { dispatch }
  ) => {
    return { productId, productTitle };
  }
);

// Create or get existing chat session
export const getOrCreateChatSession = createAsyncThunk(
  "chat/getOrCreateChatSession",
  async (
    {
      productId,
      productTitle,
      pageOrigin,
    }: {
      productId: string;
      productTitle: string;
      pageOrigin?: string;
    },
    { getState }
  ) => {
    const visitorId = getVisitorId();

    // First, try to load from Firestore
    try {
      const existingChats = await loadUserChatSessions();
      if (existingChats.length > 0) {
        return existingChats[0];
      }
    } catch (error) {
      console.error("Failed to load existing chats:", error);
    }

    // Check Redux state as fallback
    const state = getState() as any;
    const existingChat = state.chat.chats.find(
      (chat: ChatSession) =>
        chat.userId === visitorId && chat.productId === productId
    );

    if (existingChat) {
      return existingChat;
    }

    // Create metadata
    const metadata = {
      pageOrigin: (pageOrigin || "direct") as any,
      referrerUrl:
        typeof window !== "undefined" ? document.referrer || undefined : undefined,
      entryTimestamp: new Date(),
      userAgent: typeof window !== "undefined" ? navigator.userAgent : undefined,
    };

    // Create new chat session
    const newChat: ChatSession = {
      id: `chat_${Date.now()}_${visitorId.slice(-8)}`,
      title: productTitle,
      userId: visitorId,
      userName: `Visitor ${visitorId.slice(-8)}`,
      productId,
      productTitle,
      status: "new",
      createdAt: new Date(),
      lastMessageAt: new Date(),
      metadata,
    };

    // Save to Firestore
    try {
      await saveOrUpdateChatSession(newChat);
    } catch (error) {
      console.error("Failed to save chat session:", error);
    }

    return newChat;
  }
);

// Load user's chat sessions
export const loadUserChats = createAsyncThunk(
  "chat/loadUserChats",
  async (_, { dispatch }) => {
    try {
      const chats = await loadUserChatSessions();
      return chats;
    } catch (error) {
      console.error("Failed to load user chats:", error);
      return [];
    }
  }
);
