"use client";

import { useEffect, useState } from "react";
import { PageOrigin } from "@/store/types/products";
import {
  getStoredPageOriginContext,
  getCurrentPageOrigin,
} from "@/store/lib/utils/pageOrigin";

/**
 * Hook to get page origin context
 * Returns stored context if available, otherwise current page
 */
export function usePageOrigin(): PageOrigin {
  const [origin, setOrigin] = useState<PageOrigin>("direct");

  useEffect(() => {
    // Try to get stored context first
    const stored = getStoredPageOriginContext();
    if (stored) {
      setOrigin(stored.origin);
    } else {
      // Fallback to current page detection
      setOrigin(getCurrentPageOrigin());
    }
  }, []);

  return origin;
}
