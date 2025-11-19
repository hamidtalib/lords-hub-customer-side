"use client";

export type ProductCategory = "accounts" | "gems" | "diamonds" | "bots";

export interface MarketplaceProduct {
  id: string;
  title: string;
  category: ProductCategory;
  description?: string;
  price?: number;
  originalPrice?: number;
  might?: string;
  troops?: string;
  gems?: number;
  heroes?: string;
  stock?: number;
  tier?: string;
  imageUrl?: string;
  status?: "available" | "sold_out" | "coming_soon";
  highlights?: string[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
  [key: string]: any;
}

export interface ChatSession {
  title: string;
  id: string;
  userId: string;
  userName: string;
  productId: string;
  productTitle: string;
  status: string;
  createdAt: Date | null;
  lastMessageAt: Date | null;
  lastMessagePreview?: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderType: "customer" | "admin";
  message: string;
  mediaUrl?: string;
  mediaType?: "image" | "payment_proof";
  timestamp: Date | null;
  read?: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
  clientRequestId?: string;
}
