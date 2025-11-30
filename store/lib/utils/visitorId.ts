"use client";

/**
 * Visitor Identity Persistence System
 * Ensures each visitor maintains the same ID across sessions
 * Uses localStorage for persistence - ID only changes if manually cleared
 */

const VISITOR_ID_KEY = "lords-hub-visitor-id";

// In-memory cache for SSR and performance
let cachedVisitorId: string | null = null;

/**
 * Generates a UUID-like visitor ID
 * Format: visitor_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
function generateVisitorId(): string {
  // Generate UUID v4 format
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return `visitor_${uuid}`;
}

/**
 * Get or create persistent visitor ID
 * This ID persists across page refreshes and browser sessions
 * Only cleared when user manually clears browser storage
 * 
 * @returns {string} Persistent visitor ID
 */
export function getOrCreateVisitorId(): string {
  // Return cached ID if available (performance optimization)
  if (cachedVisitorId) {
    return cachedVisitorId;
  }

  // SSR fallback
  if (typeof window === "undefined") {
    cachedVisitorId = generateVisitorId();
    return cachedVisitorId;
  }

  try {
    // Try to get existing ID from localStorage
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);

    if (!visitorId) {
      // First visit - generate new ID
      visitorId = generateVisitorId();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }

    // Cache for performance
    cachedVisitorId = visitorId;
    return visitorId;
  } catch (error) {
    // localStorage unavailable (private browsing, etc.)
    console.warn("localStorage unavailable, using session-only visitor ID");
    
    if (!cachedVisitorId) {
      cachedVisitorId = generateVisitorId();
    }
    return cachedVisitorId;
  }
}

/**
 * Clear visitor ID (for testing or manual reset)
 * WARNING: This will create a new chat session on next visit
 */
export function clearVisitorId(): void {
  cachedVisitorId = null;
  
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(VISITOR_ID_KEY);
    } catch (error) {
      console.warn("Failed to clear visitor ID");
    }
  }
}

/**
 * Check if visitor ID exists in storage
 */
export function hasVisitorId(): boolean {
  if (typeof window === "undefined") {
    return cachedVisitorId !== null;
  }

  try {
    return localStorage.getItem(VISITOR_ID_KEY) !== null;
  } catch (error) {
    return cachedVisitorId !== null;
  }
}

// Backward compatibility
export const getVisitorId = getOrCreateVisitorId;
