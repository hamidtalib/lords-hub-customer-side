"use client";

import { Loader2 } from "lucide-react";
import { ChatSession } from "@/lib/types/products";

interface ChatSidebarProps {
  chats: ChatSession[];
  activeChat: ChatSession | null;
  loadingChats: boolean;
  onChatSelect: (chat: ChatSession) => void;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

export function ChatSidebar({
  chats,
  activeChat,
  loadingChats,
  onChatSelect,
  getStatusColor,
  getStatusLabel,
}: ChatSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <h2 className="mb-4 font-black text-base text-slate-200">
        Conversations
      </h2>
      {loadingChats ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
        </div>
      ) : chats.length === 0 ? (
        <div className="text-center py-8 text-slate-300 font-semibold">
          <p>No conversations yet</p>
          <p className="text-sm mt-2">
            Start a chat from a product page
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
                activeChat?.id === chat.id
                  ? "border-amber-500 bg-gradient-to-r from-amber-500/30 to-amber-400/20 shadow-lg text-white"
                  : "border-amber-500/30 hover:border-amber-400 hover:bg-slate-700/50 text-slate-200"
              }`}
            >
              <p className="font-bold text-sm line-clamp-1">
                {chat.productTitle}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-bold border-2 ${getStatusColor(
                    chat.status
                  )}`}
                >
                  {getStatusLabel(chat.status)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

