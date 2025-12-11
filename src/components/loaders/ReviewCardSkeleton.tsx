"use client";

interface ReviewCardSkeletonProps {
  count?: number;
}

export function ReviewCardSkeleton({ count = 3 }: ReviewCardSkeletonProps) {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <div className="h-10 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-lg mx-auto w-80" />
        <div className="h-6 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-md mx-auto w-60" />
      </div>
      
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="relative border-2 border-amber-500/20 bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 space-y-4 overflow-hidden"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Floating Background Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl animate-pulse" />
            
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer border-2 border-amber-500/30" />
                </div>
                
                <div className="space-y-2">
                  {/* Name */}
                  <div className="h-4 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-md w-20" />
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <div
                        key={starIndex}
                        className="w-4 h-4 bg-gradient-to-r from-amber-500/30 via-amber-400/30 to-amber-500/30 bg-[length:200%_100%] animate-shimmer rounded-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Review Message */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 space-y-2">
              <div className="h-3 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-sm" />
              <div className="h-3 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-4/5" />
              <div className="h-3 bg-gradient-to-r from-slate-600/50 via-slate-500/50 to-slate-600/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-3/5" />
            </div>

            {/* Date */}
            <div className="flex items-center justify-between">
              <div className="h-3 bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer rounded-sm w-24" />
              <div className="h-3 bg-gradient-to-r from-amber-500/30 via-amber-400/30 to-amber-500/30 bg-[length:200%_100%] animate-shimmer rounded-sm w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}