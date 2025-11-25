"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import { useChat } from "@/lib/hooks/useChat";
import { Card, CardHeader, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function ChatPage() {
  const { session, messages, isLoading, isSending, sendMessage } = useChat();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isSending) return;
    
    await sendMessage(inputText);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          <p className="text-slate-200">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-200">Failed to load chat session</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
      <Card className="flex flex-col h-[500px] sm:h-[600px] border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90">
        {/* Header */}
        <CardHeader className="border-b border-amber-500/30 p-3 sm:p-6">
          <div className="flex items-start sm:items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-white truncate">Customer Support</h2>
              <p className="text-xs sm:text-sm text-slate-400 truncate">
                Chat with our support team
              </p>
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 flex-shrink-0 bg-slate-700/50 px-2 py-1 rounded">
              ID: {session.visitorId.slice(-8)}
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4">
          {!messages || messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-400 text-xs sm:text-sm text-center px-4">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "visitor" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-3 sm:px-4 py-2 break-words ${
                      msg.sender === "visitor"
                        ? "bg-amber-600 text-white"
                        : "bg-slate-700 text-slate-100"
                    }`}
                  >
                    <p className="text-xs sm:text-sm">{msg.text}</p>
                    <p className="text-[10px] sm:text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <div className="border-t border-amber-500/30 p-2 sm:p-4">
          <div className="flex space-x-1.5 sm:space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isSending}
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 text-xs sm:text-sm"
            />
            <Button
              onClick={handleSend}
              disabled={isSending || !inputText.trim()}
              className="bg-amber-600 hover:bg-amber-700 px-3 sm:px-4"
            >
              {isSending ? (
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
