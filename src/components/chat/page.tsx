"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  sendMessage,
  loadUserChats,
  getOrCreateChatSession,
  selectChats,
  selectActiveChat,
  selectActiveMessages,
  selectActiveChatId,
  setActiveChat,
} from "@/store/chat";
import { useChatListener } from "@/lib/hooks/useChatListener";
import { usePageOrigin } from "@/lib/hooks/usePageOrigin";
import { Card, CardHeader, CardContent } from "@/src/components/ui/card";
import { ChatSidebar } from "@/src/components/chat/ChatSidebar";
import { ChatHeader } from "@/src/components/chat/ChatHeader";
import { MessageList } from "@/src/components/chat/MessageList";
import { ChatInput } from "@/src/components/chat/ChatInput";
import { ImageModal } from "@/src/components/chat/ImageModal";
import { ScrollAnimation } from "@/src/components/scroll-animation";

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const pageOrigin = usePageOrigin();

  // Redux state
  const chats = useAppSelector(selectChats);
  const activeChat = useAppSelector(selectActiveChat);
  const messages = useAppSelector(selectActiveMessages);
  const activeChatId = useAppSelector(selectActiveChatId);

  // Local UI state
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const messagesEndRef = useRef<HTMLDivElement>(null);



  // Set up real-time listener for active chat
  useChatListener(activeChatId);

  // Initialize chat - ensure default chat exists immediately
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeChat = async () => {
      try {
        await dispatch(
          getOrCreateChatSession({
            productId: "admin-support",
            productTitle: "Customer Support",
            pageOrigin,
          })
        ).unwrap();
        
        setLoadingChats(false);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setLoadingChats(false);
      }
    };

    initializeChat();
  }, [dispatch, pageOrigin]);

  // Safety fallback: Stop loading if chats exist or after 2 seconds
  useEffect(() => {
    if (chats.length > 0) {
      setLoadingChats(false);
    }
    
    // Absolute maximum wait time
    const timeout = setTimeout(() => {
      setLoadingChats(false);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [chats.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup is handled by useChatListener hook
    };
  }, []);

  const handleSendMessage = async () => {
    if (!activeChatId) return;
    if (!message.trim() && !selectedFile) return;

    setIsLoading(true);

    try {
      await dispatch(
        sendMessage({
          chatId: activeChatId,
          message: message.trim(),
          mediaUrl: previewImage || undefined,
        })
      ).unwrap();

      // Clear input
      setMessage("");
      setSelectedFile(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleRemovePreview = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChatSelect = (chatId: string) => {
    dispatch(setActiveChat(chatId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-amber-200/40 text-amber-700 border-amber-400";
      case "verified":
        return "bg-green-200/40 text-green-700 border-green-400";
      default:
        return "bg-slate-200/40 text-slate-700 border-slate-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new":
        return "🆕 New Chat";
      case "verified":
        return "✅ Verified";
      default:
        return status;
    }
  };

  return (
    <>
      <ScrollAnimation />

      <section className="px-4 py-8 sm:px-6 lg:px-8 fade-up">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 lg:grid-cols-4">
          <ChatSidebar
            chats={chats}
            activeChat={activeChat}
            loadingChats={loadingChats}
            onChatSelect={(chat) => handleChatSelect(chat.id)}
            getStatusColor={getStatusColor}
            getStatusLabel={getStatusLabel}
          />

          <div className="lg:col-span-3">
            {loadingChats ? (
              <Card className="flex items-center justify-center h-96 border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                  <p className="text-slate-200 text-lg font-semibold">Initializing chat...</p>
                </div>
              </Card>
            ) : activeChat ? (
              <Card className="flex flex-col h-full border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90 shadow-2xl">
                <CardHeader>
                  <ChatHeader
                    activeChat={activeChat}
                    getStatusColor={getStatusColor}
                    getStatusLabel={getStatusLabel}
                  />
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 max-h-[500px] space-y-4">
                  <MessageList
                    messages={messages}
                    userId="customer"
                    onImageClick={(url) => {
                      setModalImageUrl(url);
                    }}
                  />
                  <div ref={messagesEndRef} />
                </CardContent>

                <ChatInput
                  message={message}
                  setMessage={setMessage}
                  selectedFile={selectedFile}
                  previewImage={previewImage}
                  isLoading={isLoading}
                  fileInputRef={fileInputRef}
                  onFileSelect={handleFileSelect}
                  onRemovePreview={handleRemovePreview}
                  onSendMessage={handleSendMessage}
                />
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-96 border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90">
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-slate-200 text-lg font-semibold">
                    No chat available
                  </p>
                  <p className="text-slate-400 text-sm">
                    Please refresh the page
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      <ImageModal
        imageUrl={modalImageUrl}
        onClose={() => {
          setModalImageUrl(null);
        }}
      />
    </>
  );
}
