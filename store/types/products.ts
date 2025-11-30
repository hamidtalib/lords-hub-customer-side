"use client";

export type ProductCategory = "accounts" | "gems" | "diamonds" | "bots";

export interface MarketplaceProduct {
  id: string;
  title: string;
  category: ProductCategory;
  description?: string;
  price: number | 0;
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

export type PageOrigin =
  | "gems"
  | "accounts"
  | "diamonds"
  | "bots"
  | "help"
  | "direct";
