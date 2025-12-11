"use client";

interface DiamondCardSkeletonProps {
  count?: number;
}

export function DiamondCardSkeleton({ count = 8 }: DiamondCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-amber-500/30 p-6 text-center animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Diamond Icon */}
          <div className="mb-4">
            <div className="text-5xl mb-3 w-16 h-16 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-full mx-auto flex items-center justify-center">
              💎
            </div>
            
            {/* Title */}
            <div className="h-6 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md mb-2" />
            
            {/* Description */}
            <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm" />
          </div>
          
          {/* Price and Button */}
          <div className="pt-4 border-t border-slate-700 space-y-4">
            <div className="h-10 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
            <div className="h-8 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}