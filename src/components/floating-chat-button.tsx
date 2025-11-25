"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { storePageOriginContext, detectPageOrigin } from "@/lib/utils/pageOrigin";

export function FloatingChatButton() {
  const pathname = usePathname();
  
  // Don't show on chat page
  if (pathname === "/chat") {
    return null;
  }

  const handleClick = () => {
    // Store page origin context when user clicks to chat
    const origin = detectPageOrigin(pathname);
    storePageOriginContext(origin);
  };

  return (
    <Link
      href="/chat"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-amber-500/50 pulse-glow"
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}
