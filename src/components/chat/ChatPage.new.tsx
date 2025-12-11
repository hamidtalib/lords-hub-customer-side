"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Send, Paperclip, X } from "lucide-react";
import { useChat } from "@/store/lib/hooks/useChat";
import { Card, CardHeader, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { SocialButtons } from "./SocialButtons";
import { ChatSkeleton } from "@/src/components/loaders";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

export default function ChatPage() {
  const {
    session,
    messages,
    isLoading,
    isSending,
    sendMessage,
    sendMediaMessage,
  } = useChat();
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change - scroll the container, not the page
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset errors
    setFileError(null);

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be less than 2MB");
      return;
    }

    // Check file type
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setFileError("Only images and videos are allowed");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = async () => {
    if ((!inputText.trim() && !selectedFile) || isSending) return;

    if (selectedFile) {
      await sendMediaMessage(inputText || "", selectedFile);
      handleRemoveFile();
    } else {
      await sendMessage(inputText);
    }
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
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
        <Card className="flex flex-col h-[500px] sm:h-[600px] border-2 border-amber-500/30 bg-gradient-to-br from-slate-800/90 to-slate-700/90">
          <ChatSkeleton />
        </Card>
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
              <h2 className="text-base sm:text-xl font-bold text-white truncate">
                Customer Support
              </h2>
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
        <CardContent
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4"
        >
          {!messages || messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-400 text-xs sm:text-sm text-center px-4">
                No messages yet. Start the conversation!
              </p>
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
                    } ${msg.status === "sending" ? "opacity-60" : ""}`}
                  >
                    {msg.mediaUrl && (
                      <div className="mb-2 relative">
                        {msg.mediaType === "image" ? (
                          <img
                            src={msg.mediaUrl}
                            alt="Shared media"
                            className="rounded max-w-full h-auto max-h-64 object-contain"
                          />
                        ) : msg.mediaType === "video" ? (
                          <video
                            src={msg.mediaUrl}
                            controls
                            className="rounded max-w-full h-auto max-h-64"
                          />
                        ) : null}
                        {msg.status === "sending" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                            <Loader2 className="h-6 w-6 animate-spin text-white" />
                          </div>
                        )}
                      </div>
                    )}
                    {msg.text && (
                      <div className="flex items-center gap-2">
                        <div className="text-xs sm:text-sm flex-1 whitespace-pre-wrap">
                          {msg.text.split('\n').map((line, i) => {
                            // Check if line contains a URL
                            const urlRegex = /(https?:\/\/[^\s]+)/g;
                            const parts = line.split(urlRegex);
                            
                            return (
                              <div key={i}>
                                {parts.map((part, j) => {
                                  if (part.match(urlRegex)) {
                                    return (
                                      <a
                                        key={j}
                                        href={part}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-300 hover:text-blue-200 underline break-all"
                                      >
                                        {part}
                                      </a>
                                    );
                                  }
                                  return <span key={j}>{part}</span>;
                                })}
                              </div>
                            );
                          })}
                        </div>
                        {msg.status === "sending" && !msg.mediaUrl && (
                          <Loader2 className="h-3 w-3 animate-spin flex-shrink-0" />
                        )}
                      </div>
                    )}
                    {msg.buttons && msg.buttons.length > 0 && (
                      <SocialButtons buttons={msg.buttons} />
                    )}
                    <p className="text-[10px] sm:text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                      {msg.status === "sending" && (
                        <span className="ml-1">• Sending...</span>
                      )}
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
          {/* File Preview */}
          {filePreview && (
            <div className="mb-2 relative inline-block">
              <div className="relative bg-slate-700 rounded-lg p-2">
                {selectedFile?.type.startsWith("image/") ? (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="max-h-20 rounded"
                  />
                ) : (
                  <video src={filePreview} className="max-h-20 rounded" />
                )}
                <button
                  onClick={handleRemoveFile}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {fileError && (
            <div className="mb-2 text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded">
              {fileError}
            </div>
          )}

          <div className="flex space-x-1.5 sm:space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isSending}
              variant="outline"
              className="bg-slate-700 hover:bg-slate-600 border-slate-600 px-3 sm:px-4"
            >
              <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
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
              disabled={isSending || (!inputText.trim() && !selectedFile)}
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
