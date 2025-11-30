"use client";

import { ChatSession } from "@/store/thunks/chatThunk";
import { Loader2 } from "lucide-react";

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
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.visitorId}
              onClick={() => onChatSelect(chat)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
                activeChat?.visitorId === chat.visitorId
                  ? "border-amber-500 bg-gradient-to-r from-amber-500/30 to-amber-400/20 shadow-lg text-white"
                  : "border-amber-500/30 hover:border-amber-400 hover:bg-slate-700/50 text-slate-200"
              }`}
            >
              <p className="font-bold text-sm line-clamp-1">
                {chat.visitorName || "Guest User"}
              </p>
              <div className="mt-2 flex items-center justify-between"></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
