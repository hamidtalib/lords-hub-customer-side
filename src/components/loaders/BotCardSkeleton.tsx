"use client";

interface BotCardSkeletonProps {
  count?: number;
}

export function BotCardSkeleton({ count = 6 }: BotCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-green-500/30 p-6 flex flex-col h-full animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex-grow flex flex-col">
            {/* Title and Description */}
            <div className="mb-4">
              <div className="h-6 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md mb-2" />
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm" />
                <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-3/4" />
              </div>
            </div>

            {/* Features */}
            <div className="mb-4 flex-grow">
              <div className="h-3 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-sm mb-2 w-20" />
              
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500/50 via-green-400/50 to-green-500/50 bg-[length:200%_100%] animate-shimmer rounded-full mt-1.5 flex-shrink-0" />
                    <div className="h-3 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price and Button */}
          <div className="pt-4 border-t border-slate-700 mt-auto space-y-3">
            <div className="h-8 bg-gradient-to-r from-green-600/30 via-green-500/30 to-green-600/30 bg-[length:200%_100%] animate-shimmer rounded-lg" />
            <div className="h-8 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}