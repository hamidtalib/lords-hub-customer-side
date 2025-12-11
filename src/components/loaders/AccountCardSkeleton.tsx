"use client";

interface AccountCardSkeletonProps {
  count?: number;
}

export function AccountCardSkeleton({ count = 6 }: AccountCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-xl border-2 border-amber-500/20 overflow-hidden animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Image Skeleton */}
          <div className="relative h-48 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent" />
          </div>
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-5 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm" />
              <div className="h-3 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-3/4" />
            </div>
            
            {/* Price and Buttons */}
            <div className="pt-2 border-t border-slate-700">
              <div className="h-8 bg-gradient-to-r from-amber-600/30 via-amber-500/30 to-amber-600/30 bg-[length:200%_100%] animate-shimmer rounded-lg mb-3" />
              
              <div className="flex gap-2">
                <div className="flex-1 h-8 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
                <div className="flex-1 h-8 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}