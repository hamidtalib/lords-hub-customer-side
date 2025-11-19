"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import { ChatSession } from "@/lib/types/products";

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
          {activeChat.productTitle}
        </CardTitle>
        <CardDescription className="text-base font-semibold text-slate-300">
          Started{" "}
          {activeChat.createdAt?.toLocaleDateString?.() ||
            new Date(activeChat.createdAt as Date).toLocaleDateString()}
        </CardDescription>
      </div>
      <span
        className={`text-xs px-3 py-1 rounded-full font-bold border-2 ${getStatusColor(
          activeChat.status
        )}`}
      >
        {getStatusLabel(activeChat.status)}
      </span>
    </div>
  );
}

