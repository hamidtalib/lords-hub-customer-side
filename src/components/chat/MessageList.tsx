"use client";

import { Loader2, CheckCircle2, CheckCheck } from "lucide-react";
import { ChatMessage } from "@/store/lib/types/products";
import { getVisitorId } from "@/lib/utils/visitorId";

interface MessageListProps {
  messages: ChatMessage[];
  userId: string;
  onImageClick: (url: string) => void;
}

export function MessageList({
  messages,
  userId,
  onImageClick,
}: MessageListProps) {
  // Use visitor ID to identify user's messages
  const currentUserId = getVisitorId();

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-300 font-semibold space-y-2">
        <p className="text-lg">No messages yet</p>
        <p className="text-sm text-slate-400">Start chatting with support below</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((msg) => {
        const isUser = msg.senderType === "customer" && msg.senderId === currentUserId;
        return (
          <div
            key={msg.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-sm rounded-xl p-4 shadow-md font-semibold ${
                isUser
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white"
                  : "bg-slate-700/50 border-2 border-amber-500/30 text-slate-200"
              }`}
            >
              {msg.mediaUrl && (
                <button
                  onClick={() => onImageClick(msg.mediaUrl || "")}
                  className="mb-2 block hover:opacity-80 transition-opacity rounded-lg overflow-hidden"
                >
                  <img
                    src={msg.mediaUrl}
                    alt="Attachment"
                    className="max-h-48 rounded-lg cursor-pointer"
                  />
                </button>
              )}
              <p className="text-base">{msg.message}</p>
              <div
                className={`mt-2 text-xs flex items-center gap-1 ${
                  isUser ? "text-white/80" : "text-slate-600"
                }`}
              >
                {msg.timestamp?.toLocaleTimeString?.() ||
                  new Date(msg.timestamp as Date).toLocaleTimeString()}
                {isUser && (
                  <>
                    {msg.status === "sending" ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : msg.read || msg.status === "read" ? (
                      <CheckCheck className="h-3 w-3 text-emerald-300" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
