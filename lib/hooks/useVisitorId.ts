"use client";

import { useState, useEffect } from 'react';
import { getVisitorId } from '@/lib/utils/visitorId';

/**
 * React hook for accessing visitor ID in components
 * Ensures client-side only execution and provides loading state
 * 
 * @returns {Object} Object containing visitorId and isLoading state
 * 
 * @example
 * ```tsx
 * function ChatComponent() {
 *   const { visitorId, isLoading } = useVisitorId();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   
 *   return <div>User ID: {visitorId}</div>;
 * }
 * ```
 */
export function useVisitorId() {
  const [visitorId, setVisitorId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get visitor ID on mount (client-side only)
    try {
      const id = getVisitorId();
      setVisitorId(id);
    } catch (error) {
      console.error('Failed to get visitor ID:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { visitorId, isLoading };
}

/**
 * Simplified hook that returns just the visitor ID
 * Use when you don't need loading state
 * 
 * @returns {string} The visitor ID (empty string during SSR)
 * 
 * @example
 * ```tsx
 * function MessageComponent() {
 *   const userId = useVisitorIdValue();
 *   
 *   return <div>Sending as: {userId}</div>;
 * }
 * ```
 */
export function useVisitorIdValue(): string {
  const { visitorId } = useVisitorId();
  return visitorId;
}
