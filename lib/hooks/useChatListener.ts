"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setMessages } from "@/store/chat";
import { listenToChatMessages } from "@/store/lib/firebaseChat";
import { ChatMessage } from "@/store/lib/types/products";

/**
 * Hook to listen to real-time chat messages
 * Automatically handles cleanup on unmount
 * Prevents duplicate listeners
 * 
 * @param chatId - The chat ID to listen to
 * @param enabled - Whether the listener should be active (default: true)
 * 
 * @example
 * ```tsx
 * function ChatComponent({ chatId }) {
 *   useChatListener(chatId);
 *   // Messages will automatically sync to Redux
 * }
 * ```
 */
export function useChatListener(chatId: string | null, enabled: boolean = true) {
  const dispatch = useAppDispatch();
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const currentChatIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Don't set up listener if disabled or no chatId
    if (!enabled || !chatId) {
      return;
    }

    // Don't set up duplicate listener for same chat
    if (currentChatIdRef.current === chatId && unsubscribeRef.current) {
      return;
    }

    // Cleanup previous listener if switching chats
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    // Set up new listener
    currentChatIdRef.current = chatId;

    const unsubscribe = listenToChatMessages(chatId, (messages: ChatMessage[]) => {
      // Update Redux store with new messages
      dispatch(setMessages({ chatId, messages }));
    });

    unsubscribeRef.current = unsubscribe;

    // Cleanup on unmount or when chatId changes
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      currentChatIdRef.current = null;
    };
  }, [chatId, enabled, dispatch]);
}

/**
 * Hook to listen to multiple chats at once
 * Useful for chat list views where you want real-time updates
 * 
 * @param chatIds - Array of chat IDs to listen to
 * @param enabled - Whether the listeners should be active (default: true)
 * 
 * @example
 * ```tsx
 * function ChatListComponent({ chatIds }) {
 *   useMultipleChatListeners(chatIds);
 * }
 * ```
 */
export function useMultipleChatListeners(
  chatIds: string[],
  enabled: boolean = true
) {
  const dispatch = useAppDispatch();
  const unsubscribersRef = useRef<Map<string, () => void>>(new Map());

  useEffect(() => {
    if (!enabled || chatIds.length === 0) {
      return;
    }

    const currentUnsubscribers = unsubscribersRef.current;

    // Set up listeners for new chats
    chatIds.forEach((chatId) => {
      if (!currentUnsubscribers.has(chatId)) {
        const unsubscribe = listenToChatMessages(
          chatId,
          (messages: ChatMessage[]) => {
            dispatch(setMessages({ chatId, messages }));
          }
        );
        currentUnsubscribers.set(chatId, unsubscribe);
      }
    });

    // Remove listeners for chats no longer in the list
    currentUnsubscribers.forEach((unsubscribe, chatId) => {
      if (!chatIds.includes(chatId)) {
        unsubscribe();
        currentUnsubscribers.delete(chatId);
      }
    });

    // Cleanup all on unmount
    return () => {
      currentUnsubscribers.forEach((unsubscribe) => unsubscribe());
      currentUnsubscribers.clear();
    };
  }, [chatIds, enabled, dispatch]);
}
