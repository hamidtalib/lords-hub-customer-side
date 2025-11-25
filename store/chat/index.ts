// Export all chat-related Redux functionality from new chat system
export { default as chatReducer } from "./chatSlice.new";

// Export actions from new slice
export {
  setMessages,
  addMessage,
  clearError,
} from "./chatSlice.new";

// Export async thunks from new slice
export {
  initializeChat,
  sendChatMessage,
} from "./chatSlice.new";

// Export types from new chat system
export type { ChatSession, ChatMessage } from "@/store/lib/firebaseChat";
