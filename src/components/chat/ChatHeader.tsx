"use client";

import { CardDescription, CardTitle } from "@/src/components/ui/card";
import { ChatSession } from "@/store/thunks/chatThunk";

interface ChatHeaderProps {
  activeChat: ChatSession;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

export function ChatHeader({
  activeChat,
  getStatusColor,
  getStatusLabel,
}: ChatHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <CardTitle className="text-2xl gradient-text">
          {activeChat.visitorName || "Guest User"}
        </CardTitle>
        <CardDescription className="text-base font-semibold text-slate-300">
          Started{" "}
          {activeChat.createdAt?.toLocaleDateString?.() ||
            new Date(activeChat.createdAt as Date).toLocaleDateString()}
        </CardDescription>
      </div>
    </div>
  );
}
