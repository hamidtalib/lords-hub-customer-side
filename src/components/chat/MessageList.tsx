"use client";

import { Loader2, CheckCircle2, CheckCheck } from "lucide-react";
import { ChatMessage } from "@/store/thunks/chatThunk";
import { getVisitorId } from "@/store/lib/utils/visitorId";
import { MessageSkeleton } from "@/src/components/loaders";

interface MessageListProps {
  messages: ChatMessage[];
  userId: string;
  onImageClick: (url: string) => void;
  loading?: boolean;
}

export function MessageList({
  messages,
  userId,
  onImageClick,
  loading = false,
}: MessageListProps) {
  // Use visitor ID to identify user's messages
  const currentUserId = getVisitorId();

  if (loading) {
    return <MessageSkeleton count={5} />;
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-300 font-semibold space-y-2">
        <p className="text-lg">No messages yet</p>
        <p className="text-sm text-slate-400">
          Start chatting with support below
        </p>
      </div>
    );
  }

  return (
    <>
      {messages.map((msg) => {
        const isUser = msg.sender === "visitor" && msg.id === currentUserId;
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
              <p className="text-base">{msg.text}</p>
              <div
                className={`mt-2 text-xs flex items-center gap-1 ${
                  isUser ? "text-white/80" : "text-slate-600"
                }`}
              >
                {msg.timestamp?.toLocaleTimeString?.() ||
                  new Date(msg.timestamp as Date).toLocaleTimeString()}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
