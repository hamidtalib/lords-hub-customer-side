"use client";

interface MessageSkeletonProps {
  count?: number;
}

export function MessageSkeleton({ count = 4 }: MessageSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => {
        const isUser = i % 2 === 0;
        return (
          <div
            key={i}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div
              className={`max-w-sm rounded-xl p-4 shadow-md animate-pulse ${
                isUser
                  ? "bg-gradient-to-r from-amber-600/50 to-amber-500/50"
                  : "bg-slate-700/50 border-2 border-amber-500/30"
              }`}
            >
              {/* Message content skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-slate-500/50 via-slate-400/50 to-slate-500/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
                <div className="h-4 bg-gradient-to-r from-slate-500/50 via-slate-400/50 to-slate-500/50 bg-[length:200%_100%] animate-shimmer rounded-md w-3/4" />
              </div>
              
              {/* Timestamp skeleton */}
              <div className="mt-2">
                <div className="h-3 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-16" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}