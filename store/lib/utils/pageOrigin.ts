"use client";

import { PageOrigin } from "@/store/types/products";

/**
 * Detect page origin from URL path
 */
export function detectPageOrigin(pathname: string): PageOrigin {
  if (pathname.includes("/gems")) return "gems";
  if (pathname.includes("/accounts")) return "accounts";
  if (pathname.includes("/diamonds")) return "diamonds";
  if (pathname.includes("/bots")) return "bots";
  if (pathname.includes("/faq") || pathname.includes("/help")) return "help";
  return "direct";
}

/**
 * Get current page origin
 */
export function getCurrentPageOrigin(): PageOrigin {
  if (typeof window === "undefined") return "direct";
  return detectPageOrigin(window.location.pathname);
}

/**
 * Store page origin in sessionStorage for chat entry tracking
 */
export function storePageOriginContext(origin: PageOrigin): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem("chat-entry-origin", origin);
    sessionStorage.setItem("chat-entry-timestamp", new Date().toISOString());
    sessionStorage.setItem(
      "chat-entry-referrer",
      document.referrer || "direct"
    );
  } catch (error) {
    console.warn("Failed to store page origin:", error);
  }
}

/**
 * Get stored page origin context
 */
export function getStoredPageOriginContext(): {
  origin: PageOrigin;
  timestamp: Date;
  referrer: string;
} | null {
  if (typeof window === "undefined") return null;

  try {
    const origin = sessionStorage.getItem("chat-entry-origin") as PageOrigin;
    const timestamp = sessionStorage.getItem("chat-entry-timestamp");
    const referrer = sessionStorage.getItem("chat-entry-referrer");

    if (!origin) return null;

    return {
      origin,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      referrer: referrer || "direct",
    };
  } catch (error) {
    console.warn("Failed to get page origin:", error);
    return null;
  }
}

/**
 * Clear page origin context
 */
export function clearPageOriginContext(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem("chat-entry-origin");
    sessionStorage.removeItem("chat-entry-timestamp");
    sessionStorage.removeItem("chat-entry-referrer");
  } catch (error) {
    console.warn("Failed to clear page origin:", error);
  }
}
