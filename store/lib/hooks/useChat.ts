"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setMessages } from "@/store/slices/chatSlice";
import { createOrGetChatSession, sendMessage, sendMediaMessage, subscribeToMessages, sendAdminWelcomeMessage } from "@/store/thunks/chatThunk";

/**
 * Main chat hook - handles initialization and real-time updates
 * 
 * @returns Chat state and actions
 */
export function useChat() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const welcomeSentRef = useRef(false);
  
  const session = useAppSelector((state) => state.chat.session);
  const messages = useAppSelector((state) => state.chat.messages);
  const optimisticMessages = useAppSelector((state) => state.chat.optimisticMessages);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isSending = useAppSelector((state) => state.chat.isSending);
  const error = useAppSelector((state) => state.chat.error);

  // Combine real and optimistic messages
  const allMessages = [...messages, ...optimisticMessages];

  // Initialize chat on mount
  useEffect(() => {
    dispatch(createOrGetChatSession());
  }, [dispatch]);

  // Set up real-time listener
  useEffect(() => {
    if (!session) return;

    const unsubscribe = subscribeToMessages(session.visitorId, (newMessages) => {
      dispatch(setMessages(newMessages));
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [session, dispatch]);

  // Send admin welcome message based on URL parameters
  useEffect(() => {
    if (!session) return;

    const productId = searchParams.get("productId");
    const gems = searchParams.get("gems");
    const wishlist = searchParams.get("wishlist");
    const total = searchParams.get("total");
    const inquiry = searchParams.get("inquiry");
    const formUrl = searchParams.get("formUrl");

    // Only send welcome if there's a context parameter and we haven't sent it yet
    if ((productId || gems || inquiry) && !welcomeSentRef.current) {
      welcomeSentRef.current = true;
      
      console.log("Sending admin welcome message with context:", {
        productId,
        gems,
        wishlist: wishlist ? "present" : "none",
        total,
        inquiry,
        formUrl: formUrl ? "present" : "none",
      });
      
      dispatch(sendAdminWelcomeMessage({
        productId: productId || undefined,
        gems: gems === "true",
        wishlist: wishlist || undefined,
        total: total || undefined,
        inquiry: inquiry || undefined,
        formUrl: formUrl || undefined,
      }));
    }
  }, [session, searchParams, dispatch]);

  // Send message function with optimistic update
  const sendMessageHandler = async (text: string) => {
    if (!text.trim()) return;
    
    // Add optimistic message immediately
    const optimisticMsg: any = {
      id: `temp-${Date.now()}`,
      sender: "visitor",
      text,
      timestamp: new Date(),
      read: false,
      status: "sending",
    };
    dispatch(setMessages([...messages, optimisticMsg]));
    
    await dispatch(sendMessage(text));
  };

  // Send media message function with optimistic update
  const sendMediaMessageHandler = async (text: string, file: File) => {
    // Add optimistic message with preview
    const optimisticMsg: any = {
      id: `temp-${Date.now()}`,
      sender: "visitor",
      text,
      timestamp: new Date(),
      read: false,
      status: "sending",
      mediaUrl: URL.createObjectURL(file),
      mediaType: file.type.startsWith("image/") ? "image" : "video",
    };
    dispatch(setMessages([...messages, optimisticMsg]));
    
    await dispatch(sendMediaMessage({ text, file }));
  };

  return {
    session,
    messages: allMessages,
    isLoading,
    isSending,
    error,
    sendMessage: sendMessageHandler,
    sendMediaMessage: sendMediaMessageHandler,
  };
}
