"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setMessages } from "@/store/slices/chatSlice";
import { createOrGetChatSession, sendMessage, sendMediaMessage, subscribeToMessages } from "@/store/thunks/chatThunk";

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
    dispatch(createOrGetChatSession());
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
  const sendMessageHandler = async (text: string) => {
    if (!text.trim()) return;
    await dispatch(sendMessage(text));
  };

  // Send media message function
  const sendMediaMessageHandler = async (text: string, file: File) => {
    await dispatch(sendMediaMessage({ text, file }));
  };

  return {
    session,
    messages,
    isLoading,
    isSending,
    error,
    sendMessage: sendMessageHandler,
    sendMediaMessage: sendMediaMessageHandler,
  };
}
