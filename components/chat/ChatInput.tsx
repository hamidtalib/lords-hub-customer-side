"use client";

import { Send, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  message: string;
  setMessage: (value: string) => void;
  selectedFile: File | null;
  previewImage: string | null;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePreview: () => void;
  onSendMessage: () => void;
}

export function ChatInput({
  message,
  setMessage,
  selectedFile,
  previewImage,
  isLoading,
  fileInputRef,
  onFileSelect,
  onRemovePreview,
  onSendMessage,
}: ChatInputProps) {
  return (
    <div className="border-t-2 border-amber-500/30 p-4 space-y-3 bg-gradient-to-t from-slate-800/50 to-slate-700/50">
      {previewImage && selectedFile && (
        <div className="mx-4 mb-4 relative rounded-lg overflow-hidden">
          <img
            src={previewImage}
            alt="Preview"
            className="max-h-32 rounded-lg"
          />
          <button
            onClick={onRemovePreview}
            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-300"
          >
            <X className="h-4 w-4 font-bold" />
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          className="border-2 border-amber-500/50 focus:border-amber-400 bg-slate-700/50 text-white placeholder:text-slate-400 flex-1 h-11 font-semibold transition-all duration-300 rounded-xl"
          disabled={isLoading}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-amber-500/50 hover:border-amber-400 hover:bg-amber-500/20 text-white transition-all duration-300 font-bold rounded-xl"
          disabled={isLoading}
        >
          <Upload className="h-4 w-4" />
        </Button>
        <Button
          onClick={onSendMessage}
          disabled={isLoading || (!message.trim() && !selectedFile)}
          className="btn-game font-bold"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p className="text-xs text-slate-400 font-semibold">
        Max 5MB • Images only
      </p>
    </div>
  );
}

