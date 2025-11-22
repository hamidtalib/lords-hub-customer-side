"use client";

import { X } from "lucide-react";

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl border-2 border-amber-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 hover:bg-slate-100 rounded-lg transition-all duration-300"
        >
          <X className="h-6 w-6 text-slate-700 font-bold" />
        </button>
        <img
          src={imageUrl}
          alt="Full view"
          className="w-full rounded-xl"
        />
      </div>
    </div>
  );
}

