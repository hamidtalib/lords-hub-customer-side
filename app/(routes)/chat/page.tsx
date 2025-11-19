"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ChatSession, ChatMessage } from "@/lib/types/products";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { ImageModal } from "@/components/chat/ImageModal";

export default function ChatPage() {
  // ===== Dummy chat data =====
  const dummyChats: ChatSession[] = [
    {
      id: "admin-1",
      productTitle: "Premium Lords Mobile Account",
      status: "new",
      createdAt: new Date(),
    } as ChatSession,
  ];

  const dummyMessages: Record<string, ChatMessage[]> = {
    "admin-1": [
      {
        id: "1",
        chatId: "admin-1",
        senderId: "admin",
        senderType: "admin",
        message: "Welcome! Please ask your questions here.",
        timestamp: new Date(),
        status: "read",
      },
      {
        id: "2",
        chatId: "admin-1",
        senderId: "customer",
        senderType: "customer",
        message: "Hi, I want to buy this account.",
        timestamp: new Date(),
        status: "read",
      },
    ],
  };

  const [chats] = useState<ChatSession[]>(dummyChats);
  const [messages, setMessages] =
    useState<Record<string, ChatMessage[]>>(dummyMessages);
  const [activeChatId, setActiveChatId] = useState<string>(dummyChats[0].id);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;
  const mergedMessages = useMemo(
    () => (activeChat ? messages[activeChat.id] || [] : []),
    [activeChat, messages]
  );

  // ===== Handlers =====
  const handleSendMessage = () => {
    if (!activeChat) return;
    if (!message.trim() && !selectedFile) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      chatId: activeChat.id,
      message,
      senderId: "customer",
      senderType: "customer",
      timestamp: new Date(),
      status: "sending",
      mediaUrl: previewImage || undefined,
    };

    setIsLoading(true);

    // Add to messages
    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));

    // Reset input
    setMessage("");
    setSelectedFile(null);
    setPreviewImage(null);

    // Simulate sending delay
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [activeChat.id]: prev[activeChat.id].map((msg) =>
          msg.id === newMsg.id ? { ...msg, status: "read" } : msg
        ),
      }));
      setIsLoading(false);
    }, 1000); // 1 second delay to simulate sending
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    setSelectedFile(file);
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 lg:grid-cols-4">
          <ChatSidebar
            chats={chats}
            activeChat={activeChat}
            loadingChats={false}
            onChatSelect={(c) => setActiveChatId(c.id)}
            getStatusColor={getStatusColor}
            getStatusLabel={getStatusLabel}
          />

          <div className="lg:col-span-3">
            {activeChat ? (
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
                    messages={mergedMessages}
                    userId="customer"
                    onImageClick={(url) => {
                      setModalImageUrl(url);
                      setShowImageModal(true);
                    }}
                  />
                </CardContent>

                <ChatInput
                  message={message}
                  setMessage={setMessage}
                  selectedFile={selectedFile}
                  previewImage={previewImage}
                  isLoading={isLoading}
                  fileInputRef={fileInputRef}
                  onFileSelect={handleFileSelect}
                  onRemovePreview={() => {
                    setPreviewImage(null);
                    setSelectedFile(null);
                  }}
                  onSendMessage={handleSendMessage}
                />
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-96 border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90">
                <p className="text-slate-200 text-lg font-semibold">
                  Select a conversation to start chatting
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>

      <ImageModal
        imageUrl={modalImageUrl}
        onClose={() => {
          setShowImageModal(false);
          setModalImageUrl(null);
        }}
      />

      <Footer />
    </main>
  );
}
