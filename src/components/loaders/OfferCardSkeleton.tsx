"use client";

interface OfferCardSkeletonProps {
  count?: number;
}

export function OfferCardSkeleton({ count = 6 }: OfferCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-amber-500/30 overflow-hidden flex flex-col animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          {/* Media Section Skeleton */}
          <div className="relative w-full h-56 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer">
            {/* Play button placeholder for videos */}
            {i % 3 === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-500/50 via-slate-400/50 to-slate-500/50 bg-[length:200%_100%] animate-shimmer rounded-full" />
              </div>
            )}
          </div>

          {/* Content Section Skeleton */}
          <div className="p-6 flex-grow flex flex-col space-y-4">
            {/* Title */}
            <div className="h-6 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
            
            {/* Description */}
            <div className="flex-grow space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm" />
              <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-4/5" />
              <div className="h-4 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-3/5" />
            </div>

            {/* CTA Button */}
            <div className="h-10 bg-gradient-to-r from-amber-600/50 via-amber-500/50 to-amber-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}