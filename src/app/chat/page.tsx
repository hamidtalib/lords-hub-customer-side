"use client";

import { Suspense } from "react";
import ChatPage from "@/src/components/chat/ChatPage.new";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { Loader2 } from "lucide-react";

function ChatPageWrapper() {
  return <ChatPage />;
}

export default function Chat() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[500px]">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </div>
        }
      >
        <ChatPageWrapper />
      </Suspense>
      <Footer />
    </main>
  );
}
