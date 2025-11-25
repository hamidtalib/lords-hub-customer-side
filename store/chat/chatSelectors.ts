import { RootState } from "../store";
import { ChatMessage } from "@/store/lib/types/products";

// Select all chats
export const selectChats = (state: RootState) => state.chat.chats;

// Select active chat ID
export const selectActiveChatId = (state: RootState) => state.chat.activeChatId;

// Select active chat
export const selectActiveChat = (state: RootState) => {
  const { chats, activeChatId } = state.chat;
  return chats.find((chat) => chat.id === activeChatId) || null;
};

// Select messages for a specific chat (including pending)
// Firebase messages always take precedence, pending messages are appended
export const selectChatMessages = (chatId: string) => (state: RootState) => {
  const firebaseMessages = state.chat.messages[chatId] || [];
  const pendingMessages = state.chat.pendingMessages[chatId] || [];
  
  // Merge: Firebase messages + pending (not yet in Firebase)
  const allMessages = [...firebaseMessages, ...pendingMessages];
  
  // Remove duplicates by ID (Firebase takes precedence)
  const uniqueMessages = allMessages.filter(
    (msg, index, self) => index === self.findIndex((m) => m.id === msg.id)
  );
  
  // Sort by timestamp to ensure consistent ordering
  return uniqueMessages.sort((a, b) => {
    const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return timeA - timeB;
  });
};

// Select messages for active chat
export const selectActiveMessages = (state: RootState) => {
  const { activeChatId, messages, pendingMessages } = state.chat;
  if (!activeChatId) return [];
  
  const firebaseMessages = messages[activeChatId] || [];
  const pending = pendingMessages[activeChatId] || [];
  
  // Merge: Firebase messages + pending (not yet in Firebase)
  const allMessages = [...firebaseMessages, ...pending];
  
  // Remove duplicates by ID (Firebase takes precedence)
  const uniqueMessages = allMessages.filter(
    (msg, index, self) => index === self.findIndex((m) => m.id === msg.id)
  );
  
  // Sort by timestamp to ensure consistent ordering
  return uniqueMessages.sort((a, b) => {
    const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return timeA - timeB;
  });
};

// Select loading state for a chat
export const selectIsLoadingMessages = (chatId: string) => (state: RootState) =>
  state.chat.loadingMessages[chatId] || false;

// Select conversation context
export const selectConversationContext = (state: RootState) =>
  state.chat.conversationContext;

// Select pending messages for a chat
export const selectPendingMessages = (chatId: string) => (state: RootState) =>
  state.chat.pendingMessages[chatId] || [];

// Select if user has any chats
export const selectHasChats = (state: RootState) => state.chat.chats.length > 0;

// Select the primary (only) chat for visitor
export const selectPrimaryChat = (state: RootState) =>
  state.chat.chats.length > 0 ? state.chat.chats[0] : null;
