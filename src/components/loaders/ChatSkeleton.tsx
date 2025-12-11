"use client";

export function ChatSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      {/* Chat Header Skeleton */}
      <div className="bg-slate-800/90 border-b border-amber-500/30 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-full" />
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md w-32" />
            <div className="h-3 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-20" />
          </div>
        </div>
      </div>

      {/* Messages Area Skeleton */}
      <div className="flex-1 p-4 space-y-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => {
          const isUser = i % 2 === 0;
          return (
            <div
              key={i}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <div
                className={`max-w-sm rounded-xl p-4 shadow-md space-y-2 ${
                  isUser
                    ? "bg-gradient-to-r from-amber-600/50 to-amber-500/50"
                    : "bg-slate-700/50 border-2 border-amber-500/30"
                }`}
              >
                <div className="h-4 bg-gradient-to-r from-slate-500/50 via-slate-400/50 to-slate-500/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
                <div className="h-4 bg-gradient-to-r from-slate-500/50 via-slate-400/50 to-slate-500/50 bg-[length:200%_100%] animate-shimmer rounded-md w-3/4" />
                <div className="h-3 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-16" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area Skeleton */}
      <div className="bg-slate-800/90 border-t border-amber-500/30 p-4">
        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
          <div className="w-12 h-12 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
        </div>
      </div>
    </div>
  );
}