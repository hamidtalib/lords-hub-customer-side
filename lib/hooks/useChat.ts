"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeChat, sendChatMessage, setMessages } from "@/store/chat/chatSlice.new";
import { subscribeToMessages } from "@/store/lib/firebaseChat";

/**
 * Main chat hook - handles initialization and real-time updates
 * 
 * @returns Chat state and actions
 */
export function useChat() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.chat.session);
  const messages = useAppSelector((state) => state.chat.messages);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isSending = useAppSelector((state) => state.chat.isSending);
  const error = useAppSelector((state) => state.chat.error);

  // Initialize chat on mount
  useEffect(() => {
    dispatch(initializeChat());
  }, [dispatch]);

  // Set up real-time listener
  useEffect(() => {
    if (!session) return;

    const unsubscribe = subscribeToMessages((newMessages) => {
      dispatch(setMessages(newMessages));
    });

    return () => {
      unsubscribe();
    };
  }, [session, dispatch]);

  // Send message function
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    await dispatch(sendChatMessage(text));
  };

  return {
    session,
    messages,
    isLoading,
    isSending,
    error,
    sendMessage,
  };
}
